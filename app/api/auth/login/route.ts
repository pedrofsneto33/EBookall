import { NextRequest, NextResponse } from "next/server";
import { verifyUser, getAccessStatus, getPeticoesUsadas } from "../../../lib/stripe-users";
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

    if (!email || !password) {
      return NextResponse.json({ error: "E-mail e senha obrigatórios" }, { status: 400 });
    }

    const customer = await verifyUser(email, password);
    if (!customer) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    const token = await createSessionToken({ id: customer.id, email: customer.email || email });
    const status = getAccessStatus(customer);
    const res = NextResponse.json({
      ok: true,
      user: { id: customer.id, email: customer.email || email },
      status,
      peticoes_usadas: getPeticoesUsadas(customer),
    });
    setSessionCookie(res, token);
    return res;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro no login";
    console.error("login:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
