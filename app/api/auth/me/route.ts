import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import {
  getCustomerById,
  getAccessStatus,
  getPeticoesUsadas,
} from "../../../lib/stripe-users";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    const customer = await getCustomerById(session.id);
    if (!customer) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    return NextResponse.json({
      user: { id: session.id, email: session.email },
      status: getAccessStatus(customer),
      peticoes_usadas: getPeticoesUsadas(customer),
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    console.error("me:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
