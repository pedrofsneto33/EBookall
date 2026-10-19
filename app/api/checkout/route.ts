import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSession } from "../../lib/auth";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY não configurada");
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe não configurado (STRIPE_SECRET_KEY)" },
        { status: 500 }
      );
    }

    const stripe = getStripe();
    const body = await request.json().catch(() => ({}));

    // Prefer session cookie; fallback body for compatibility
    const sessionUser = await getSession();
    const userId = sessionUser?.id || String(body.user_id ?? "").trim();
    const email = sessionUser?.email || String(body.email ?? "").trim();

    if (!userId) {
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
      customer: userId.startsWith("cus_") ? userId : undefined,
      customer_email: userId.startsWith("cus_") ? undefined : email || undefined,
      client_reference_id: userId,
      metadata: {
        user_id: userId,
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
                    "3 petições + calculadora + checklist · pagamento único · acesso vitalício",
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
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Erro /api/checkout:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
