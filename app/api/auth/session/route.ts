import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getSession,
  setSessionCookie,
  userIdFromEmail,
} from "../../../lib/auth";
import { getPeticoesUsadas, hasPaidAccess } from "../../../lib/users";
import { MAX_PETICOES } from "../../../lib/config";

export const runtime = "nodejs";

/**
 * Estado da sessão atual (fonte de verdade: tabela `users` no SQLite).
 * GET → { email, status, peticoes_usadas, peticoes_max, restantes }
 */
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const ativo = await hasPaidAccess(session.email);
    const usadas = await getPeticoesUsadas(session.email);

    return NextResponse.json({
      email: session.email,
      status: ativo ? "active" : "pending",
      peticoes_usadas: usadas,
      peticoes_max: MAX_PETICOES,
      restantes: Math.max(0, MAX_PETICOES - usadas),
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao ler sessão";
    console.error("session:get:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Cria sessão só com e-mail.
 */
export async function POST(request: NextRequest) {
  try {
    if (!process.env.AUTH_SECRET) {
      return NextResponse.json(
        { error: "AUTH_SECRET não configurada na Vercel" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const user = { id: userIdFromEmail(email), email };
    const token = await createSessionToken(user);

    // Status real vem do SQLite (users).
    let status: "pending" | "active" = "pending";
    let usadas = 0;
    try {
      status = (await hasPaidAccess(email)) ? "active" : "pending";
      usadas = await getPeticoesUsadas(email);
    } catch (e) {
      console.error("session:status:", e);
    }

    const res = NextResponse.json({
      ok: true,
      user,
      email,
      status,
      peticoes_usadas: usadas,
      peticoes_max: MAX_PETICOES,
      restantes: Math.max(0, MAX_PETICOES - usadas),
    });
    setSessionCookie(res, token);
    return res;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar sessão";
    console.error("session:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
