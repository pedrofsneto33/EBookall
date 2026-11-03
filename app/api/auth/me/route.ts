import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { isAdmin } from "../../../lib/admin";
import { getPeticoesUsadas, hasPaidAccess, MAX_PETICOES } from "../../../lib/users";

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
      isAdmin: isAdmin(session.email),
      status,
      peticoes_usadas,
      peticoes_max: MAX_PETICOES,
    });
  } catch (e: unknown) {
    console.error("auth/me:", e);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
