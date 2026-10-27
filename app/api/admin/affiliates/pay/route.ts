import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../../lib/auth";
import { ensureDb } from "../../../../lib/db";

const ADMIN_EMAIL = "pedrofsneto33@gmail.com";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || session.email.toLowerCase().trim() !== ADMIN_EMAIL) {
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
    await db.execute({
      sql: `UPDATE referrals SET status = 'pago', comissao_valor = ? WHERE id = ?`,
      args: [27.4, id],
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro";
    console.error("admin/affiliates/pay:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}