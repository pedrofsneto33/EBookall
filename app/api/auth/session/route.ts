import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  setSessionCookie,
  userIdFromEmail,
} from "../../../lib/auth";
import { hasPaidAccess } from "../../../lib/stripe-users";

export const runtime = "nodejs";

/**
 * Cria sessão só com e-mail (sem Stripe, sem senha, sem e-mail mágico).
 * Acesso ao gerador continua exigindo pagamento confirmado.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const user = { id: userIdFromEmail(email), email };
    const token = await createSessionToken(user);

    let status: "pending" | "active" = "pending";
    try {
      status = (await hasPaidAccess(email)) ? "active" : "pending";
    } catch {
      status = "pending";
    }

    const res = NextResponse.json({
      ok: true,
      user,
      status,
    });
    setSessionCookie(res, token);
    return res;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar sessão";
    console.error("session:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
