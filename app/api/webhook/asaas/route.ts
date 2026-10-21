import { NextRequest, NextResponse } from "next/server";
import { grantAccessByEmail } from "../../../lib/stripe-users";

export const runtime = "nodejs";

/**
 * Set em memória (por processo) para deduplicar eventos reenviados pelo Asaas.
 * Limitação: serverless (cold start zera). Para produção crítica, trocar por
 * Redis/KV. O pior caso (perder dedupe) é grantAccessByEmail rodar 2x — que é
 * idempotente na prática (preserva contador e status).
 */
const processedEvents = new Set<string>();
const MAX_SET_SIZE = 5000;

function rememberEvent(id: string): boolean {
  if (processedEvents.has(id)) return false;
  if (processedEvents.size > MAX_SET_SIZE) {
    // Evita crescimento infinito. Limpa o Set inteiro (raríssimo).
    processedEvents.clear();
  }
  processedEvents.add(id);
  return true;
}

/** Forma mínima do payload do webhook do Asaas (payload plano: id, event, payment). */
type AsaasWebhookPayment = {
  id?: string;
  externalReference?: string;
};

type AsaasWebhookPayload = {
  id?: unknown;
  event?: unknown;
  payment?: AsaasWebhookPayment | null;
};

export async function POST(request: NextRequest) {
  // 1) Validação do token do webhook (header asaas-access-token).
  const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;
  if (!expectedToken) {
    console.error("ASAAS_WEBHOOK_TOKEN não configurado");
    return NextResponse.json({ error: "Webhook não configurado" }, { status: 500 });
  }

  const receivedToken = request.headers.get("asaas-access-token");
  if (!receivedToken || receivedToken !== expectedToken) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // 2) Parse do payload.
  let body: AsaasWebhookPayload;
  try {
    body = (await request.json()) as AsaasWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const eventId = typeof body?.id === "string" ? body.id : null;
  const eventType = typeof body?.event === "string" ? body.event : null;
  const payment = body?.payment;

  if (!eventId || !eventType || !payment) {
    return NextResponse.json({ error: "Payload sem campos obrigatórios" }, { status: 400 });
  }

  // 3) Só PAYMENT_RECEIVED e PAYMENT_CONFIRMED liberam acesso.
  // Outros eventos (REFUNDED, OVERDUE, etc.) são logados e ignorados.
  if (eventType !== "PAYMENT_RECEIVED" && eventType !== "PAYMENT_CONFIRMED") {
    console.log(`[asaas/webhook] ignorado: ${eventType} evt=${eventId}`);
    return NextResponse.json({ received: true });
  }

  // 4) Dedupe por eventId (payload plano: body.id).
  if (!rememberEvent(eventId)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  // 5) Extrair userId|email do externalReference.
  const externalRef = typeof payment.externalReference === "string" ? payment.externalReference : "";
  const [userId, email] = externalRef.split("|");
  if (!userId || !email) {
    console.error(`[asaas/webhook] externalReference inválido evt=${eventId} paymentId=${payment.id}`);
    // Retorna 500 para o Asaas reenviar (talvez chegue com ref corrigida futuramente).
    return NextResponse.json({ error: "externalReference ausente" }, { status: 500 });
  }

  // 6) Libera acesso. Em erro, 500 para o Asaas reenviar.
  try {
    await grantAccessByEmail(email, `asaas_payment:${payment.id}`);
    console.log(`[asaas/webhook] acesso liberado evt=${eventId} paymentId=${payment.id} email=${email}`);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "erro";
    console.error(`[asaas/webhook] grant falhou evt=${eventId}:`, msg);
    return NextResponse.json({ error: "Falha ao liberar acesso" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
