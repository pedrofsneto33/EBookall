import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { hasPaidAccess } from "../../../lib/stripe-users";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    let status: "pending" | "active" = "pending";
    let peticoes_usadas = 0;
    try {
      const paid = await hasPaidAccess(session.email);
      status = paid ? "active" : "pending";
    } catch (e) {
      console.error("me/hasPaidAccess:", e);
    }

    // contagem local no cookie não existe — usa 0; gerador incrementa via API opcional
    return NextResponse.json({
      user: { id: session.id, email: session.email },
      status,
      peticoes_usadas,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
