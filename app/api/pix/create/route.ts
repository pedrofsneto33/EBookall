import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { rateLimit } from "../../../lib/rate-limit";
import { PRECO_CENTAVOS } from "../../../lib/config";
import { criarCliente, criarCobrancaPix, obterQrCodePix } from "../../../lib/asaas";

export const runtime = "nodejs";

/** Cache em memória (por processo) de email → customerId do Asaas. */
const customerCache = new Map<string, string>();

async function obterOuCriarCustomer(email: string): Promise<string> {
  const cached = customerCache.get(email);
  if (cached) return cached;

  try {
    const { id } = await criarCliente(email, email.split("@")[0]);
    customerCache.set(email, id);
    return id;
  } catch (e) {
    // Se já existe no Asaas, a API pode reclamar de duplicata.
    // Nesse caso, buscamos o customer existente pela listagem.
    const msg = e instanceof Error ? e.message : "";
    if (!/already|já|duplicat/i.test(msg)) throw e;

    const apiKey = process.env.ASAAS_API_KEY!;
    const base = (process.env.ASAAS_BASE_URL || "https://api-sandbox.asaas.com/v3").replace(/\/$/, "");
    const res = await fetch(`${base}/customers?email=${encodeURIComponent(email)}`, {
      headers: { access_token: apiKey },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Asaas customer lookup ${res.status}`);
    const json = (await res.json()) as { data?: Array<{ id: string; email: string }> };
    const found = json.data?.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (!found) throw new Error("Cliente Asaas não encontrado após duplicata");
    customerCache.set(email, found.id);
    return found.id;
  }
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Faça login antes de pagar" }, { status: 401 });
    }

    if (!rateLimit(`pix:${session.id}`, 10, 10 * 60 * 1000)) {
      return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });
    }

    const customerId = await obterOuCriarCustomer(session.email);
    const externalRef = `${session.id}|${session.email}`;
    const { id: paymentId } = await criarCobrancaPix(
      customerId,
      PRECO_CENTAVOS,
      "RecuperaJogo — Acesso Completo",
      externalRef,
    );

    const qr = await obterQrCodePix(paymentId);

    return NextResponse.json({
      paymentId,
      qrCodeBase64: qr.encodedImage,
      copiaECola: qr.payload,
      expirationDate: qr.expirationDate,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao gerar Pix";
    console.error("POST /api/pix/create:", message);
    return NextResponse.json({ error: "Não foi possível gerar o Pix. Tente novamente." }, { status: 500 });
  }
}
