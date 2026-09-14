import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe não configurado (STRIPE_SECRET_KEY)" }, { status: 500 });
    }

    const body = await request.json();
    const userId = String(body.user_id ?? "").trim();
    const email = String(body.email ?? "").trim();

    if (!userId) {
      return NextResponse.json({ error: "user_id obrigatório" }, { status: 400 });
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://recuperajogo.vercel.app";

    const { data: existing } = await supabaseAdmin
      .from("subscriptions")
      .select("id, status")
      .eq("user_id", userId)
      .maybeSingle();

    if (!existing) {
      const { error: insertError } = await supabaseAdmin.from("subscriptions").insert({
        user_id: userId,
        status: "pending",
        peticoes_usadas: 0,
      });
      if (insertError) console.error("Erro ao criar subscription pending:", insertError);
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    const unitAmount = 13700;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      customer_email: email || undefined,
      client_reference_id: userId,
      metadata: { user_id: userId, product: "recuperajogo_acesso_completo" },
      line_items: priceId
        ? [{ price: priceId, quantity: 1 }]
        : [{
            quantity: 1,
            price_data: {
              currency: "brl",
              unit_amount: unitAmount,
              product_data: {
                name: "RecuperaJogo — Acesso Completo",
                description: "3 petições + calculadora + checklist · pagamento único · acesso vitalício",
              },
            },
          }],
      success_url: `${origin}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pagamento?user_id=${userId}&canceled=1`,
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
