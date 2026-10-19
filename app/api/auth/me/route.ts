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
    try {
      status = (await hasPaidAccess(session.email)) ? "active" : "pending";
    } catch {
      status = "pending";
    }

    return NextResponse.json({
      user: { id: session.id, email: session.email },
      status,
      peticoes_usadas: 0,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
