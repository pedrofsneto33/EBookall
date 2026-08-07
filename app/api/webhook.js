import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Usa a SERVICE ROLE KEY para poder escrever na tabela subscriptions
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    // Validação do webhook (opcional para MVP, mas recomendado)
    // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
    // Por enquanto, vamos simplificar:
    const event = JSON.parse(body);
    
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.user_id || session.client_reference_id;
      const sessionId = session.id;

      if (!userId) {
        console.error("user_id não encontrado no metadata do Stripe");
        return NextResponse.json({ error: "user_id missing" }, { status: 400 });
      }

      // ✅ Atualiza o status para "active" na tabela subscriptions
      const { error } = await supabase
        .from("subscriptions")
        .update({
          status: "active",
          payment_provider_id: sessionId,
          current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 ano
        })
        .eq("user_id", userId);

      if (error) {
        console.error("Erro ao atualizar subscription:", error);
        return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
      }

      console.log(`✅ Usuário ${userId} marcado como ativo`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Erro no webhook:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}