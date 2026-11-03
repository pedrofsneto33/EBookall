import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { getSession } from "../../../lib/auth";
import { dbRateLimit } from "../../../lib/rate-limit-db";
import { PRECO_CENTAVOS, SITE_URL } from "../../../lib/config";

export const runtime = "nodejs";

export async function POST() {
  try {
    // O e-mail vem SEMPRE da sessão (nunca do corpo): o acesso é liberado para quem pagou logado.
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const email = session.email.toLowerCase().trim();

    if (!(await dbRateLimit(`pix:${email}`, 5, 10 * 60 * 1000)))
      return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("[PIX] MERCADOPAGO_ACCESS_TOKEN não configurado");
      return NextResponse.json({ error: "Pagamento indisponível no momento." }, { status: 500 });
    }

    const payment = new Payment(new MercadoPagoConfig({ accessToken }));
    const result = await payment.create({
      body: {
        transaction_amount: PRECO_CENTAVOS / 100,
        description: "Acesso ao gerador de petições RecuperaJogo",
        payment_method_id: "pix",
        payer: { email },
        external_reference: email,
        notification_url: `${SITE_URL}/api/webhooks/mercadopago`,
      },
    });

    const qrCode = result.point_of_interaction?.transaction_data?.qr_code_base64;
    const copiaECola = result.point_of_interaction?.transaction_data?.qr_code;
    if (!qrCode) throw new Error("QR Code não retornado pelo Mercado Pago");

    return NextResponse.json({ qr_code_base64: qrCode, qr_code: copiaECola, id: result.id });
  } catch (error) {
    console.error("[PIX] erro:", error);
    return NextResponse.json({ error: "Falha ao gerar cobrança. Tente novamente." }, { status: 500 });
  }
}
