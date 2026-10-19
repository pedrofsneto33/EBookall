import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { activateAccess, findCustomerByEmail } from "../../lib/stripe-users";

export const runtime = "nodejs";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY não configurada");
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Assinatura ou secret ausente" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "assinatura inválida";
    console.error(`Webhook signature: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("checkout.session.completed:", session.id);

    try {
      let customerId =
        session.metadata?.user_id ||
        session.client_reference_id ||
        (typeof session.customer === "string" ? session.customer : null);

      if (!customerId || !String(customerId).startsWith("cus_")) {
        const email = session.customer_details?.email ?? session.customer_email;
        if (email) {
          const found = await findCustomerByEmail(email);
          customerId = found?.id ?? null;
        }
      }

      if (!customerId) {
        console.error("customer não encontrado", session.id);
        return NextResponse.json({ received: true, warning: "user_not_found" });
      }

      await activateAccess(String(customerId), session.id);
      console.log(`Acesso ativado customer=${customerId}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      console.error("Erro ao ativar acesso:", message);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
