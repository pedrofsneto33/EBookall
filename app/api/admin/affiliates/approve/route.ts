import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../../lib/auth";
import { ensureDb } from "../../../../lib/db";
import { isAdmin } from "../../../../lib/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || !isAdmin(session.email)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  let body: { id?: string } = {};
  try {
    body = (await request.json()) as { id?: string };
  } catch {
    body = {};
  }

  const id = body.id?.trim();
  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const db = await ensureDb();

    // Buscar o request
    const reqRes = await db.execute({
      sql: "SELECT id, nome, email FROM affiliate_requests WHERE id = ?",
      args: [id],
    });

    if (reqRes.rows.length === 0) {
      return NextResponse.json({ error: "Solicitação não encontrada" }, { status: 404 });
    }

    const reqRow = reqRes.rows[0];
    const nome = String(reqRow.nome ?? "").trim();
    const email = String(reqRow.email ?? "").trim().toLowerCase();

    // Gerar código: 4 primeiras letras do nome + 4 números aleatórios
    const prefix = nome
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 4)
      .toUpperCase()
      .padEnd(4, "X");
    const suffix = String(Math.floor(1000 + Math.random() * 9000));
    const code = `${prefix}${suffix}`;

    // Inserir na tabela affiliates
    await db.execute({
      sql: `INSERT INTO affiliates (id, email, code) VALUES (?, ?, ?)`,
      args: [crypto.randomUUID(), email, code],
    });

    // Deletar o request
    await db.execute({
      sql: `DELETE FROM affiliate_requests WHERE id = ?`,
      args: [id],
    });

    return NextResponse.json({ ok: true, code });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro";
    if (message.toLowerCase().includes("unique")) {
      if (message.toLowerCase().includes("email")) {
        return NextResponse.json({ error: "Este e-mail já está cadastrado como afiliado." }, { status: 409 });
      }
      if (message.toLowerCase().includes("code")) {
        return NextResponse.json({ error: "Código duplicado. Tente novamente." }, { status: 409 });
      }
      return NextResponse.json({ error: "E-mail ou código já cadastrado." }, { status: 409 });
    }
    console.error("admin/affiliates/approve:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}