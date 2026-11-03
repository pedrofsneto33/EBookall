import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { PRECO_CENTAVOS } from "../../../lib/config";
import { grantAccessByEmail } from "../../../lib/users";

export const runtime = "nodejs";

/**
 * Valida o x-signature do Mercado Pago.
 * Formato do header: "ts=<timestamp>,v1=<hmac>".
 * Manifest assinado: "id:<data.id>;request-id:<x-request-id>;ts:<ts>;"
 */
function assinaturaValida(req: NextRequest, dataId: string): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) return false;

  const header = req.headers.get("x-signature") || "";
  const requestId = req.headers.get("x-request-id") || "";
  let ts = "";
  let v1 = "";
  for (const parte of header.split(",")) {
    const [k, v] = parte.split("=").map((s) => s.trim());
    if (k === "ts") ts = v;
    if (k === "v1") v1 = v;
  }
  if (!ts || !v1 || !dataId) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${ts};`;
  const esperado = createHmac("sha256", secret).update(manifest).digest("hex");

  const a = Buffer.from(esperado, "utf8");
  const b = Buffer.from(v1, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const dataId = String(request.nextUrl.searchParams.get("data.id") || body?.data?.id || "");

    if (!assinaturaValida(request, dataId)) {
      return NextResponse.json({ error: "assinatura invalida" }, { status: 401 });
    }

    const tipo = body?.type || request.nextUrl.searchParams.get("type");
    if (tipo !== "payment") return NextResponse.json({ received: true });

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("[webhook MP] MERCADOPAGO_ACCESS_TOKEN ausente");
      return NextResponse.json({ error: "erro interno" }, { status: 500 });
    }

    // Nunca confie no corpo do webhook: consulta o pagamento real na API do MP.
    const resp = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(dataId)}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!resp.ok) {
      console.error("[webhook MP] consulta falhou:", resp.status);
      return NextResponse.json({ error: "consulta falhou" }, { status: 502 }); // MP tenta de novo
    }
    const payment = await resp.json();

    const valorEsperado = PRECO_CENTAVOS / 100;
    const email = String(payment.external_reference || "").toLowerCase().trim();

    if (
      payment.status === "approved" &&
      payment.payment_method_id === "pix" &&
      payment.currency_id === "BRL" &&
      Number(payment.transaction_amount) >= valorEsperado &&
      email.includes("@")
    ) {
      await grantAccessByEmail(email, "mercadopago_pix");
    } else if (payment.status === "approved") {
      console.error("[webhook MP] pagamento aprovado recusado (valor/forma/email):", {
        id: dataId,
        valor: payment.transaction_amount,
        metodo: payment.payment_method_id,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[webhook MP] erro:", error);
    return NextResponse.json({ error: "erro interno" }, { status: 500 });
  }
}
