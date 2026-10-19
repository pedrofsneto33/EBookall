import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  setSessionCookie,
  userIdFromEmail,
} from "../../../lib/auth";

export const runtime = "nodejs";

/**
 * Cria sessão só com e-mail.
 * NÃO chama Stripe aqui (evita timeout/connection error no cadastro).
 */
export async function POST(request: NextRequest) {
  try {
    if (!process.env.AUTH_SECRET && !process.env.STRIPE_SECRET_KEY) {
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

    const res = NextResponse.json({
      ok: true,
      user,
      status: "pending",
    });
    setSessionCookie(res, token);
    return res;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar sessão";
    console.error("session:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
