import Stripe from "stripe";
import { activateBySession as activateUserBySession } from "./users";

/**
 * Módulo do Stripe: client, mapeamento de erros e ativação de sessão.
 *
 * O armazenamento de usuários/pagamentos (status, contador de petições)
 * vive em SQLite/libSQL — ver `app/lib/users.ts` e `app/lib/db.ts`.
 */

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY não configurada");
  if (!key.startsWith("sk_")) {
    throw new Error("STRIPE_SECRET_KEY inválida");
  }
  return new Stripe(key, { timeout: 15000, maxNetworkRetries: 1 });
}

/**
 * Libera acesso após pagamento Stripe (escrita no SQLite).
 * Idempotente: a mesma session_id não reprocessa.
 * Lança erro em falha (o webhook decide responder 500 para o Stripe reenviar).
 */
export async function activateBySession(session: Stripe.Checkout.Session) {
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    session.metadata?.email;

  if (!email) {
    throw new Error(`Sessão ${session.id} sem e-mail para ativação`);
  }

  await activateUserBySession(email, session.id);
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
