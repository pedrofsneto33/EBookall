import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { activateBySession, mapStripeError } from "../../lib/stripe-users";

export const runtime = "nodejs";

/** Eventos que liberam acesso (pagamento confirmado, síncrono ou assíncrono). */
const ACTIVATION_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
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
    const message = mapStripeError(err);
    console.error(`Webhook signature: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (!ACTIVATION_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Ainda não foi pago (ex.: pagamento assíncrono em andamento).
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true, pending: true });
  }

  try {
    await activateBySession(session);
  } catch (e: unknown) {
    console.error("activateBySession:", mapStripeError(e));
    // 500 => o Stripe reenvia o evento.
    return NextResponse.json({ error: "Falha ao ativar" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
