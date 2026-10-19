import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";

export const runtime = "nodejs";

/** Contagem de petições: aceita e registra em log (sem banco). Limite enforced no client. */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    const body = await request.json().catch(() => ({}));
    const count = Number(body.count) || 0;
    console.log(`peticoes user=${session.email} count=${count}`);
    return NextResponse.json({ ok: true, peticoes_usadas: count });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
