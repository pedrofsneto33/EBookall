import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("[PIX] MERCADOPAGO_ACCESS_TOKEN não configurado");
      return NextResponse.json({ error: "Configuração de pagamento ausente" }, { status: 500 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(client);

    const result = await payment.create({
      body: {
        transaction_amount: 1.00,
        description: "Acesso ao gerador de petições",
        payment_method_id: "pix",
        payer: { email },
        notification_url: "https://recuperajogo.vercel.app/api/webhooks/mercadopago",
      },
    });

    const qrCode = result.point_of_interaction?.transaction_data?.qr_code_base64;
    if (!qrCode) {
      throw new Error("QR Code não retornado pelo Mercado Pago");
    }

    return NextResponse.json({ qr_code_base64: qrCode, id: result.id });
  } catch (error: any) {
    // Pega a mensagem de erro detalhada do Mercado Pago
    const detalhe = error?.cause || error?.message || JSON.stringify(error);
    console.error("[PIX] Erro detalhado:", detalhe);
    
    return NextResponse.json(
      { error: "Falha ao gerar cobrança", detalhe: String(detalhe) }, 
      { status: 500 }
    );
  }
}