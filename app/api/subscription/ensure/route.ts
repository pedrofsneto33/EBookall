import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { hasPaidAccess } from "../../../lib/users";

export const runtime = "nodejs";

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    let status: "pending" | "active" = "pending";
    try {
      status = (await hasPaidAccess(session.email)) ? "active" : "pending";
    } catch {
      status = "pending";
    }
    return NextResponse.json({
      subscription: {
        id: session.id,
        status,
        peticoes_usadas: 0,
      },
      created: false,
    });
  } catch (e: unknown) {
    console.error("subscription/ensure:", e);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
