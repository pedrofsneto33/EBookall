import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Inicializa o Stripe com sua chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Inicializa o Supabase com a Service Role Key (para poder editar o banco)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  
  // 1. Verifica se o aviso veio realmente do Stripe (segurança)
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(` Erro no Webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // 2. Se o evento for de "pagamento concluído"
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    // Pega o user_id que enviamos no link de pagamento
    const userId = session.client_reference_id;

    if (userId) {
      // 3. Atualiza o status para 'active' na tabela subscriptions
      const { error } = await supabase
        .from("subscriptions")
        .update({ 
          status: "active", 
          payment_provider_id: session.id,
          current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 ano de acesso
        })
        .eq("user_id", userId);

      if (error) {
        console.error(" Erro ao atualizar subscription:", error);
      } else {
        console.log(`✅ Usuário ${userId} ativado com sucesso!`);
      }
    }
  }

  return NextResponse.json({ received: true });
}