import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { getSession } from "../../lib/auth";
import { rateLimit } from "../../lib/rate-limit";
import { validarEntrada, montarPeticao, chaveCaso } from "../../lib/server/peticao";
import { hasPaidAccess, incrementPeticoes, MAX_PETICOES } from "../../lib/users";
import { ensureDb } from "../../lib/db"; // Movido para cá para usar no bloqueio de regeração

export const runtime = "nodejs";

// Funções para gerar e verificar o token de forma segura
function getSecret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET não configurada");
  return new TextEncoder().encode(s.slice(0, 64));
}

async function assinarCaso(email: string, key: string): Promise<string> {
  return await new SignJWT({ email, key })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}

async function verificarCaso(token: string | undefined, email: string, key: string): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.email === email && payload.key === key;
  } catch {
    return false;
  }
}

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

    const key = chaveCaso(valid.data);
    const isRegeneracao = await verificarCaso(body.caso_token, session.email, key);

    let usadas = 0;

    if (isRegeneracao) {
      // Se for regeração, NÃO gasta a petição. Apenas busca o valor atual no banco.
      const db = await ensureDb();
      const res = await db.execute({
        sql: "SELECT peticoes_usadas FROM users WHERE email = ?",
        args: [session.email],
      });
      usadas = Number(res.rows[0]?.peticoes_usadas || 0);
    } else {
      // Se for um caso novo, gasta a petição normalmente.
      const inc = await incrementPeticoes(session.email);
      if (!inc.ok) return NextResponse.json({ error: inc.error || "Erro ao registrar" }, { status: 500 });
      usadas = inc.peticoes_usadas;
    }

    // Salvar a petição no histórico
    try {
      const db = await ensureDb();
      await db.execute({
        sql: `INSERT INTO peticoes (email, perfil, valor_causa, texto) VALUES (?, ?, ?, ?)`,
        args: [session.email, valid.data.perfil, String(resultado.valorCausa), resultado.texto],
      });
    } catch (e) {
      console.error("Falha ao salvar petição no histórico:", e);
    }

    // Gera o NOVO token criptografado para as próximas regerações
    const novoToken = await assinarCaso(session.email, key);

    return NextResponse.json({
      texto: resultado.texto,
      valorCausa: resultado.valorCausa,
      avisos: resultado.avisos,
      usadas: usadas,
      restantes: Math.max(0, MAX_PETICOES - usadas),
      caso_token: novoToken,
    });
  } catch (e) {
    console.error("/api/peticao:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}