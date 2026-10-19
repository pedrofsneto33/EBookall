import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { activateBySession, mapStripeError } from "../../lib/stripe-users";

export const runtime = "nodejs";

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await activateBySession(session);
    } catch (e: unknown) {
      console.error("activateBySession:", mapStripeError(e));
    }
  }

  return NextResponse.json({ received: true });
}
