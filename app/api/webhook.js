import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Inicializa o Stripe com sua chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Inicializa o Supabase com a Service Role Key (para ter permissão de admin)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  // 1. Verifica se o aviso veio realmente do Stripe
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`❌ Erro no Webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // 2. Se o evento for de "pagamento concluído"
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    // Pega o e-mail do cliente que fez o pagamento
    const userEmail = session.customer_details?.email;

    console.log("💳 Pagamento concluído para o e-mail:", userEmail);

    if (userEmail) {
      // 3. Busca o user_id no Supabase usando o e-mail (requer Service Role Key)
      const { data: { user }, error: userError } = await supabase.auth.admin.getUserByEmail(userEmail);

      if (userError || !user) {
        console.error("❌ Usuário não encontrado no Supabase:", userError);
        // Retorna 200 para o Stripe saber que recebemos, mesmo com erro interno
        return NextResponse.json({ received: true }); 
      }

      const userId = user.id;

      // 4. Atualiza o status para 'active' na tabela subscriptions
      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({ 
          status: "active", 
          payment_provider_id: session.id,
          current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 ano de acesso
        })
        .eq("user_id", userId);

      if (updateError) {
        console.error("❌ Erro ao atualizar subscription:", updateError);
      } else {
        console.log(`✅ SUCESSO: Usuário ${userId} (${userEmail}) ativado com sucesso!`);
      }
    } else {
      console.warn("⚠️ E-mail do cliente não encontrado na sessão do Stripe.");
    }
  }

  return NextResponse.json({ received: true });
}