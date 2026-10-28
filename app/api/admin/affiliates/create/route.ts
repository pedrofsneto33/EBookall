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

  let body: { email?: string; code?: string } = {};
  try {
    body = (await request.json()) as { email?: string; code?: string };
  } catch {
    body = {};
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const code = String(body.code ?? "").trim().toUpperCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json({ error: "Código inválido" }, { status: 400 });
  }

  try {
    const db = await ensureDb();
    await db.execute({
      sql: `INSERT INTO affiliates (id, email, code) VALUES (?, ?, ?)`,
      args: [crypto.randomUUID(), email, code],
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro";
    if (message.toLowerCase().includes("unique")) {
      if (message.toLowerCase().includes("email")) {
        return NextResponse.json({ error: "Este e-mail já está cadastrado como afiliado." }, { status: 409 });
      }
      if (message.toLowerCase().includes("code")) {
        return NextResponse.json({ error: "Este código já está em uso." }, { status: 409 });
      }
      return NextResponse.json({ error: "E-mail ou código já cadastrado." }, { status: 409 });
    }
    console.error("admin/affiliates/create:", message);
    return NextResponse.json({ error: "Erro ao cadastrar afiliado." }, { status: 500 });
  }
}