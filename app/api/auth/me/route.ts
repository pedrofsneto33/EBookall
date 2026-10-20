import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { getPeticoesUsadas, hasPaidAccess } from "../../../lib/stripe-users";

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
      status = (await hasPaidAccess(session.email)) ? "active" : "pending";
      peticoes_usadas = await getPeticoesUsadas(session.email);
    } catch {
      status = "pending";
    }

    return NextResponse.json({
      user: { id: session.id, email: session.email },
      email: session.email,
      status,
      peticoes_usadas,
      peticoes_max: 3,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
