import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSession } from "../../lib/auth";
import { mapStripeError } from "../../lib/stripe-users";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY não configurada");
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY?.trim()) {
      return NextResponse.json(
        { error: "Stripe não configurado (STRIPE_SECRET_KEY)" },
        { status: 500 }
      );
    }

    const stripe = getStripe();
    const body = await request.json().catch(() => ({}));
    const sessionUser = await getSession();
    const email =
      sessionUser?.email || String(body.email ?? "").trim().toLowerCase();
    const userId = sessionUser?.id || String(body.user_id ?? "").trim();

    if (!email) {
      return NextResponse.json({ error: "Faça login antes de pagar" }, { status: 401 });
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://recuperajogo.vercel.app";

    const priceId = process.env.STRIPE_PRICE_ID;
    const unitAmount = 13700;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card", "pix"],
      customer_email: email,
      client_reference_id: userId || email,
      metadata: {
        user_id: userId || email,
        email,
        product: "recuperajogo_acesso_completo",
      },
      line_items: priceId
        ? [{ price: priceId, quantity: 1 }]
        : [
            {
              quantity: 1,
              price_data: {
                currency: "brl",
                unit_amount: unitAmount,
                product_data: {
                  name: "RecuperaJogo — Acesso Completo",
                  description:
                    "3 petições + calculadora + checklist · pagamento único",
                },
              },
            },
          ],
      success_url: `${origin}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pagamento?canceled=1`,
      locale: "pt-BR",
    };

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err: unknown) {
    const message = mapStripeError(err);
    console.error("Erro /api/checkout:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
