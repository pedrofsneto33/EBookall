import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  setSessionCookie,
  userIdFromEmail,
} from "../../../lib/auth";

export const runtime = "nodejs";

/** Criar conta = sessão imediata por e-mail (zero Stripe). */
export async function POST(request: NextRequest) {
  try {
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
      message: "Conta pronta. Siga para o pagamento.",
    });
    setSessionCookie(res, token);
    return res;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    console.error("signup:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
