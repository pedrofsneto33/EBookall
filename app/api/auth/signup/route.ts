import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../lib/stripe-users";
import { createSessionToken, setSessionCookie } from "../../../lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe não configurado" }, { status: 500 });
    }
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Senha mínima de 6 caracteres" }, { status: 400 });
    }

    const customer = await createUser(email, password);
    const token = await createSessionToken({ id: customer.id, email });
    const res = NextResponse.json({
      ok: true,
      user: { id: customer.id, email },
      status: "pending",
    });
    setSessionCookie(res, token);
    return res;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar conta";
    const status = message.includes("já tem conta") ? 409 : 500;
    console.error("signup:", message);
    return NextResponse.json({ error: message }, { status });
  }
}
