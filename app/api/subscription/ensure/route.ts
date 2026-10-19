import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import {
  getCustomerById,
  getAccessStatus,
  getPeticoesUsadas,
} from "../../../lib/stripe-users";

export const runtime = "nodejs";

/** Compat: retorna status do acesso via Stripe Customer metadata. */
export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    const customer = await getCustomerById(session.id);
    if (!customer) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }
    const status = getAccessStatus(customer);
    return NextResponse.json({
      subscription: {
        id: session.id,
        status,
        peticoes_usadas: getPeticoesUsadas(customer),
      },
      created: false,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
