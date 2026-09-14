import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function findUserId(session: Stripe.Checkout.Session): Promise<string | null> {
  const fromMeta = session.metadata?.user_id || session.client_reference_id || null;
  if (fromMeta) return fromMeta;

  const customerEmail = session.customer_details?.email ?? session.customer_email ?? null;
  if (!customerEmail) return null;

  let page = 1;
  const perPage = 100;
  while (page <= 10) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
    if (error || !data?.users?.length) break;
    const found = data.users.find((u) => u.email?.toLowerCase() === customerEmail.toLowerCase());
    if (found) return found.id;
    if (data.users.length < perPage) break;
    page++;
  }
  return null;
}

async function activateSubscription(userId: string, session: Stripe.Checkout.Session) {
  const periodEnd = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  const payload = {
    user_id: userId,
    status: "active",
    payment_provider_id: session.id,
    current_period_end: periodEnd,
    peticoes_usadas: 0,
  };

  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(payload, { onConflict: "user_id" })
    .select();

  if (error) {
    console.warn("Upsert falhou, tentando update/insert:", error.message);
    const { data: updated, error: upErr } = await supabaseAdmin
      .from("subscriptions")
      .update({
        status: "active",
        payment_provider_id: session.id,
        current_period_end: periodEnd,
      })
      .eq("user_id", userId)
      .select();

    if (upErr || !updated?.length) {
      const { error: insErr } = await supabaseAdmin.from("subscriptions").insert(payload);
      if (insErr) throw insErr;
    }
  }
  return data;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Assinatura ou secret ausente" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "assinatura inválida";
    console.error(`Webhook signature: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("checkout.session.completed:", session.id);
    try {
      const userId = await findUserId(session);
      if (!userId) {
        console.error("user_id não encontrado. email:", session.customer_details?.email ?? session.customer_email);
        return NextResponse.json({ received: true, warning: "user_not_found" });
      }
      await activateSubscription(userId, session);
      console.log(`Subscription ativada user_id=${userId}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      console.error("Erro ao ativar subscription:", message);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
