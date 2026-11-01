import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { getPeticoesUsadas, hasPaidAccess } from "../../../lib/users";
import { MAX_PETICOES } from "../../../lib/config";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const ativo = await hasPaidAccess(session.email);
    const usadas = await getPeticoesUsadas(session.email);

    return NextResponse.json({
      email: session.email,
      status: ativo ? "active" : "pending",
      peticoes_usadas: usadas,
      peticoes_max: MAX_PETICOES,
      restantes: Math.max(0, MAX_PETICOES - usadas),
    });
  } catch (e: unknown) {
    console.error("session:get:", e);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ error: "Use /api/auth/request-link" }, { status: 410 });
}

