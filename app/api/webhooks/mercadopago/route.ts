import { NextRequest, NextResponse } from "next/server";

const crypto = require("crypto");

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-signature") || "";
    const body = await request.text();

    // Validar assinatura do webhook
    const hmac = crypto.createHmac("sha256", process.env.MERCADOPAGO_WEBHOOK_SECRET!);
    const computedSignature = hmac.update(body).digest("hex");
    const isValid = hmac.compare(computedSignature, signature as string);

    if (!isValid) {
      return NextResponse.json({ error: "assinatura invalida" }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Se for evento de pagamento
    if (event.type === "payment") {
      // Consultar o status real da API do Mercado Pago
      const paymentId = event.data.id;
      const payment = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
          },
        }
      ).then((res) => res.json());

      if (payment.status === "approved") {
        const payerEmail = payment.payer.email;
        // Liberar acesso automático
        // Importar e chamar grantAccessByEmail
        // Nota: Em ambiente server-side, importamos dinamicamente
        try {
          const { grantAccessByEmail } = await import("../../../lib/users");
          await grantAccessByEmail(payerEmail, "mercadopago_pix");
        } catch (err) {
          console.error("Erro ao liberar acesso:", err);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: "erro interno" }, { status: 500 });
  }
}