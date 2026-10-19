import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY não configurada");
  if (!key.startsWith("sk_")) {
    throw new Error("STRIPE_SECRET_KEY inválida (deve começar com sk_test_ ou sk_live_)");
  }
  return new Stripe(key, {
    timeout: 20000,
    maxNetworkRetries: 2,
  });
}

export type AccessStatus = "pending" | "active";

/** Verifica se o e-mail já pagou (checkout completo). Não cria Customer. */
export async function hasPaidAccess(email: string): Promise<boolean> {
  try {
    const stripe = getStripe();
    const sessions = await stripe.checkout.sessions.list({
      limit: 20,
      status: "complete",
    });
    const target = email.toLowerCase().trim();
    return sessions.data.some((s) => {
      const e =
        s.customer_details?.email?.toLowerCase() ||
        s.customer_email?.toLowerCase() ||
        "";
      return e === target && s.payment_status === "paid";
    });
  } catch (e) {
    console.error("hasPaidAccess Stripe error:", e);
    return false;
  }
}

/** Marca acesso via metadata do Checkout (já pago). Fallback: busca por e-mail. */
export async function activateBySession(session: Stripe.Checkout.Session) {
  // Só loga — o status ativo é derivado de sessions complete + e-mail.
  console.log("Pagamento confirmado", {
    id: session.id,
    email: session.customer_details?.email ?? session.customer_email,
  });
}

export function mapStripeError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("Invalid API Key") || msg.includes("Invalid API key")) {
    return "Chave Stripe inválida. Confira STRIPE_SECRET_KEY na Vercel (sk_live_ ou sk_test_)."
  }
  if (msg.includes("connection to Stripe") || msg.includes("network")) {
    return "Falha de conexão com o Stripe. Tente de novo em instantes ou confira a chave na Vercel."
  }
  return msg;
}
