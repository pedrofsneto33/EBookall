import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../lib/auth";
import { rateLimit } from "../../lib/rate-limit";
import { validarEntrada, montarPeticao, chaveCaso } from "../../lib/server/peticao";
import { hasPaidAccess, incrementPeticoes, MAX_PETICOES } from "../../lib/users";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    if (!rateLimit(`peticao:${session.email}`, 40, 60 * 60 * 1000))
      return NextResponse.json({ error: "Muitas tentativas. Aguarde." }, { status: 429 });

    const body = await req.json().catch(() => ({}));
    const valid = validarEntrada(body);
    if (!valid.ok) return NextResponse.json({ error: "Dados incompletos", erros: valid.erros }, { status: 400 });

    if (!(await hasPaidAccess(session.email)))
      return NextResponse.json({ error: "Acesso não pago" }, { status: 402 });

    const resultado = montarPeticao(valid.data);
    if (resultado.avisos.some((a) => a.includes("fora da competência")))
      return NextResponse.json({ error: resultado.avisos[0] }, { status: 422 });

    const inc = await incrementPeticoes(session.email);
    if (!inc.ok) return NextResponse.json({ error: inc.error || "Erro ao registrar" }, { status: 500 });

    // Salvar a petição no histórico
    try {
      const { ensureDb } = await import("../../lib/db");
      const db = await ensureDb();
      await db.execute({
        sql: `INSERT INTO peticoes (email, perfil, valor_causa, texto) VALUES (?, ?, ?, ?)`,
        args: [session.email, valid.data.perfil, String(resultado.valorCausa), resultado.texto],
      });
    } catch (e) {
      console.error("Falha ao salvar petição no histórico:", e);
    }

    const key = chaveCaso(valid.data);
    const token = Buffer.from(JSON.stringify({ u: session.email, k: key, e: Date.now() + 86400000 })).toString("base64url");

    return NextResponse.json({
      texto: resultado.texto,
      valorCausa: resultado.valorCausa,
      avisos: resultado.avisos,
      usadas: inc.peticoes_usadas,
      restantes: Math.max(0, MAX_PETICOES - inc.peticoes_usadas),
      caso_token: token,
    });
  } catch (e) {
    console.error("/api/peticao:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}