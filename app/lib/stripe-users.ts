import Stripe from "stripe";
import bcrypt from "bcryptjs";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY não configurada");
  return new Stripe(key);
}

export type AccessStatus = "pending" | "active";

export async function findCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const stripe = getStripe();
  const list = await stripe.customers.list({ email: email.toLowerCase().trim(), limit: 5 });
  return list.data[0] ?? null;
}

export async function createUser(email: string, password: string): Promise<Stripe.Customer> {
  const stripe = getStripe();
  const existing = await findCustomerByEmail(email);
  if (existing) {
    throw new Error("Este e-mail já tem conta. Faça login.");
  }
  const password_hash = await bcrypt.hash(password, 10);
  return stripe.customers.create({
    email: email.toLowerCase().trim(),
    metadata: {
      rj_password_hash: password_hash,
      rj_status: "pending",
      rj_peticoes_usadas: "0",
      product: "recuperajogo",
    },
  });
}

export async function verifyUser(
  email: string,
  password: string
): Promise<Stripe.Customer | null> {
  const customer = await findCustomerByEmail(email);
  if (!customer) return null;
  const hash = customer.metadata?.rj_password_hash;
  if (!hash) return null;
  const ok = await bcrypt.compare(password, hash);
  return ok ? customer : null;
}

export function getAccessStatus(customer: Stripe.Customer): AccessStatus {
  const s = customer.metadata?.rj_status;
  return s === "active" ? "active" : "pending";
}

export function getPeticoesUsadas(customer: Stripe.Customer): number {
  const n = parseInt(customer.metadata?.rj_peticoes_usadas || "0", 10);
  return Number.isFinite(n) ? n : 0;
}

export async function activateAccess(customerId: string, sessionId: string) {
  const stripe = getStripe();
  await stripe.customers.update(customerId, {
    metadata: {
      rj_status: "active",
      rj_payment_session: sessionId,
      rj_activated_at: new Date().toISOString(),
    },
  });
}

export async function setPeticoesUsadas(customerId: string, count: number) {
  const stripe = getStripe();
  await stripe.customers.update(customerId, {
    metadata: { rj_peticoes_usadas: String(count) },
  });
}

export async function getCustomerById(id: string): Promise<Stripe.Customer | null> {
  const stripe = getStripe();
  try {
    const c = await stripe.customers.retrieve(id);
    if (c.deleted) return null;
    return c as Stripe.Customer;
  } catch {
    return null;
  }
}
