import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSession } from "../../lib/auth";
import { mapStripeError } from "../../lib/stripe-users";
import { rateLimit } from "../../lib/rate-limit";
import { PRECO_CENTAVOS } from "../../lib/config";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY não configurada");
  return new Stripe(key);
}

/** Checkout só cartão — PIX é pelo CNPJ Primex na página /pagamento. */
export async function POST() {
  try {
    if (!process.env.STRIPE_SECRET_KEY?.trim()) {
      return NextResponse.json(
        { error: "Stripe não configurado" },
        { status: 500 }
      );
    }

    const stripe = getStripe();
    const sessionUser = await getSession();

    // Identidade vem SOMENTE da sessão JWT (nunca do body da requisição).
    if (!sessionUser) {
      return NextResponse.json(
        { error: "Faça login antes de pagar" },
        { status: 401 }
      );
    }
    const email = sessionUser.email.trim().toLowerCase();
    const userId = sessionUser.id;

    // Origin fixo: nunca usar o header Origin (open redirect).
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://recuperajogo.vercel.app";

    const priceId = process.env.STRIPE_PRICE_ID;
    const unitAmount = PRECO_CENTAVOS;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      // Só cartão — PIX é CNPJ Primex na página de pagamento
      payment_method_types: ["card"],
      customer_email: email,
      client_reference_id: userId,
      metadata: {
        user_id: userId,
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
                  description: "3 petições + calculadora + checklist",
                },
              },
            },
          ],
      success_url: `${origin}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pagamento?canceled=1`,
      locale: "pt-BR",
    };

    if (!rateLimit(`checkout:${userId}`, 10, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde" },
        { status: 429 }
      );
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err: unknown) {
    const message = mapStripeError(err);
    console.error("Erro /api/checkout:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
