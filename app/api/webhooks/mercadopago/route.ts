import { NextRequest, NextResponse } from "next/server";
import { PRECO_CENTAVOS } from "../../../lib/config";
import { grantAccessByEmail } from "../../../lib/users";
import { ensureDb } from "../../../lib/db";
import { assinaturaValida } from "../../../lib/server/mp-assinatura";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const dataId = String(request.nextUrl.searchParams.get("data.id") || body?.data?.id || "");

    if (!assinaturaValida(
      process.env.MERCADOPAGO_WEBHOOK_SECRET || "",
      request.headers.get("x-signature") || "",
      request.headers.get("x-request-id") || "",
      dataId
    )) {
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
      // Idempotência: o MP reenvia o mesmo webhook. Só o primeiro registro do payment_id libera/zera.
      const db = await ensureDb();
      const novo = await db.execute({
        sql: "INSERT OR IGNORE INTO pagamentos (payment_id, email, valor, origem) VALUES (?, ?, ?, ?)",
        args: [String(payment.id ?? dataId), email, Number(payment.transaction_amount), "mercadopago_pix"],
      });
      if (novo.rowsAffected === 1) {
        try {
          await grantAccessByEmail(email, "mercadopago_pix", { novaCompra: true });
        } catch (err) {
          // Falhou ao liberar: desfaz o registro para o reenvio do MP tentar de novo.
          await db.execute({ sql: "DELETE FROM pagamentos WHERE payment_id = ?", args: [String(payment.id ?? dataId)] });
          throw err;
        }
      }
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
