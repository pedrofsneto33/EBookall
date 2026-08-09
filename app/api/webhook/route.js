import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Inicializa o Stripe com a chave secreta (será sk_live_... em produção)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Inicializa o Supabase com a SERVICE ROLE KEY (obrigatório para ignorar o RLS e acessar o auth.admin)
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
  // O Stripe exige o corpo da requisição como texto bruto (raw text) para validar a assinatura
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
    console.error(`❌ Erro no Webhook (Assinatura inválida): ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Quando o pagamento é concluído com sucesso
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    // Pega o e-mail do cliente (com fallback de segurança)
    const customerEmail = session.customer_details?.email ?? session.customer_email;
    console.log("💳 Pagamento concluído para o e-mail:", customerEmail);

    if (customerEmail) {
      // 1. Lista os usuários do Auth para encontrar o ID pelo e-mail
      const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();

      if (authError || !users) {
        console.error("❌ Erro ao listar usuários do Auth:", authError);
        return NextResponse.json({ error: "Erro interno ao buscar usuário" }, { status: 500 });
      }

      // 2. Encontra o usuário específico no array retornado
      const targetUser = users.find(u => u.email === customerEmail);

      if (!targetUser) {
        console.error(`⚠️ Usuário com e-mail ${customerEmail} não encontrado no Auth.`);
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
      }

      const userId = targetUser.id;
      console.log("✅ Usuário encontrado. ID:", userId);

      // 3. Atualiza a tabela subscriptions usando o user_id (compatível com seu schema)
      const { data, error: updateError } = await supabase
        .from("subscriptions")
        .update({ 
          status: "active",
          payment_provider_id: session.id,
          current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // +1 ano de acesso
        })
        .eq("user_id", userId)
        .select();

      if (updateError) {
        console.error("❌ Erro ao atualizar subscription:", updateError);
        return NextResponse.json({ error: "Erro ao atualizar Supabase" }, { status: 500 });
      }

      if (!data || data.length === 0) {
        console.error(`⚠️ Nenhuma linha de subscription encontrada para o user_id: ${userId}`);
      } else {
        console.log(`🎉 SUCESSO: Subscription do usuário ${userId} (${customerEmail}) ativada com sucesso!`);
      }
    }
  }

  // Retorna 200 OK para o Stripe saber que recebemos o evento
  return NextResponse.json({ received: true });
}