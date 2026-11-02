import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      console.error("[PIX] E-mail inválido ou ausente:", email);
      return NextResponse.json({ error: "E-mail é obrigatório" }, { status: 400 });
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("[PIX] MERCADOPAGO_ACCESS_TOKEN não configurado");
      return NextResponse.json({ error: "Configuração de pagamento ausente" }, { status: 500 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const mp = new (require("mercadopago").default)(client);

    const preference = {
      items: [
        {
          title: "Acesso RecuperaJogo",
          unit_price: 137.00,
          quantity: 1,
          description: "Acesso ao gerador de petições",
        },
      ],
      payer: {
        email: email,
      },
      notification_url: "https://recuperajogo.vercel.app/api/webhooks/mercadopago",
      back_urls: {
        success: "https://recuperajogo.vercel.app/pagamento?status=sucesso",
        failure: "https://recuperajogo.vercel.app/pagamento?status=falha",
      },
      auto_return: "approved",
    };

    const result = await mp.preferences.create({
      body: preference,
    });

    const qrCodeBase64 = result.body.point_of_interaction.transaction_data.qr_code_base64;
    const paymentId = result.body.id;

    return NextResponse.json({
      qr_code_base64: qrCodeBase64,
      id: paymentId,
    });
  } catch (error: any) {
    console.error("[PIX] Erro ao gerar cobrança:", error?.message || error);
    console.error("[PIX] Stack:", error?.stack);
    return NextResponse.json({ error: "Falha ao gerar cobrança" }, { status: 500 });
  }
}