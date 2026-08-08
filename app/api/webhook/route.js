import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Erro no Webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userEmail = session.customer_details?.email;

    console.log("Pagamento concluído para o e-mail:", userEmail);

    if (userEmail) {
      const { data: { user }, error: userError } = await supabase.auth.admin.getUserByEmail(userEmail);

      if (userError || !user) {
        console.error("Usuário não encontrado no Supabase:", userError);
        return NextResponse.json({ received: true });
      }

      const userId = user.id;

      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({
          status: "active",
          payment_provider_id: session.id,
          current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq("user_id", userId);

      if (updateError) {
        console.error("Erro ao atualizar subscription:", updateError);
      } else {
        console.log(`SUCESSO: Usuário ${userId} ativado com sucesso!`);
      }
    }
  }

  return NextResponse.json({ received: true });
}