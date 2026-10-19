import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { setPeticoesUsadas, getCustomerById, getAccessStatus } from "../../../lib/stripe-users";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const customer = await getCustomerById(session.id);
    if (!customer || getAccessStatus(customer) !== "active") {
      return NextResponse.json({ error: "Acesso inativo" }, { status: 403 });
    }

    const body = await request.json();
    const count = Math.max(0, Math.min(3, Number(body.count) || 0));
    await setPeticoesUsadas(session.id, count);
    return NextResponse.json({ ok: true, peticoes_usadas: count });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
