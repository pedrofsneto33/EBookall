import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY não configurada");
  if (!key.startsWith("sk_")) {
    throw new Error("STRIPE_SECRET_KEY inválida (deve começar com sk_test_ ou sk_live_)");
  }
  return new Stripe(key, {
    timeout: 15000,
    maxNetworkRetries: 1,
  });
}

export type AccessStatus = "pending" | "active";

/** Verifica pagamento. Nunca lança — retorna false se Stripe falhar. */
export async function hasPaidAccess(email: string): Promise<boolean> {
  try {
    const stripe = getStripe();
    const target = email.toLowerCase().trim();

    // Busca sessions recentes complete
    const sessions = await stripe.checkout.sessions.list({
      limit: 30,
    });

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
    console.error("hasPaidAccess Stripe error:", e);
    return false;
  }
}

export async function activateBySession(session: Stripe.Checkout.Session) {
  console.log("Pagamento confirmado", {
    id: session.id,
    email: session.customer_details?.email ?? session.customer_email,
  });
}

export function mapStripeError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("Invalid API Key") || msg.includes("Invalid API key")) {
    return "Chave Stripe inválida. Confira STRIPE_SECRET_KEY na Vercel.";
  }
  if (msg.includes("connection to Stripe") || msg.toLowerCase().includes("network")) {
    return "Falha de conexão com o Stripe. Verifique STRIPE_SECRET_KEY ou tente de novo.";
  }
  return msg;
}
