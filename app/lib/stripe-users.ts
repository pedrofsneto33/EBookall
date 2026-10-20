import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY não configurada");
  if (!key.startsWith("sk_")) {
    throw new Error("STRIPE_SECRET_KEY inválida");
  }
  return new Stripe(key, { timeout: 15000, maxNetworkRetries: 1 });
}

export type AccessStatus = "pending" | "active";

function paidEmailsEnv(): Set<string> {
  const raw = process.env.PAID_EMAILS || "";
  return new Set(
    raw
      .split(/[,;\s]+/)
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
}

/** Acesso pago: lista manual, Customer Stripe com rj_status, ou checkout pago. */
export async function hasPaidAccess(email: string): Promise<boolean> {
  const target = email.toLowerCase().trim();
  if (!target) return false;

  if (paidEmailsEnv().has(target)) return true;

  try {
    const stripe = getStripe();

    const customers = await stripe.customers.list({ email: target, limit: 5 });
    for (const c of customers.data) {
      if (c.metadata?.rj_status === "active") return true;
    }

    const sessions = await stripe.checkout.sessions.list({ limit: 40 });
    return sessions.data.some((s) => {
      if (s.status !== "complete" && s.payment_status !== "paid") return false;
      const e =
        s.customer_details?.email?.toLowerCase() ||
        s.customer_email?.toLowerCase() ||
        s.metadata?.email?.toLowerCase() ||
        "";
      return e === target;
    });
  } catch (e) {
    console.error("hasPaidAccess:", e);
    // Fallback: só lista manual se Stripe falhar
    return paidEmailsEnv().has(target);
  }
}

/** Libera acesso após PIX CNPJ (chamado pelo admin ou webhook). */
export async function grantAccessByEmail(email: string, reason = "manual"): Promise<void> {
  const target = email.toLowerCase().trim();
  const stripe = getStripe();
  const existing = await stripe.customers.list({ email: target, limit: 1 });
  if (existing.data[0]) {
    await stripe.customers.update(existing.data[0].id, {
      metadata: {
        rj_status: "active",
        rj_granted_at: new Date().toISOString(),
        rj_grant_reason: reason,
      },
    });
    return;
  }
  await stripe.customers.create({
    email: target,
    metadata: {
      rj_status: "active",
      rj_granted_at: new Date().toISOString(),
      rj_grant_reason: reason,
      product: "recuperajogo",
    },
  });
}

export async function activateBySession(session: Stripe.Checkout.Session) {
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    session.metadata?.email;
  if (email) {
    try {
      await grantAccessByEmail(email, `stripe_session:${session.id}`);
    } catch (e) {
      console.error("activateBySession grant:", e);
    }
  }
  console.log("Pagamento Stripe confirmado", { id: session.id, email });
}

export function mapStripeError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("Invalid API Key") || msg.includes("Invalid API key")) {
    return "Chave Stripe inválida. Confira STRIPE_SECRET_KEY na Vercel.";
  }
  if (msg.includes("connection to Stripe") || msg.toLowerCase().includes("network")) {
    return "Falha de conexão com o Stripe. Use o PIX CNPJ da Primex abaixo.";
  }
  return msg;
}
