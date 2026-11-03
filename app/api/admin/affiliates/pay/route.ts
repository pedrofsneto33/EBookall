import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../../lib/auth";
import { ensureDb } from "../../../../lib/db";
import { isAdmin } from "../../../../lib/admin";
import { COMISSAO_AFILIADO } from "../../../../lib/config";

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
    // Só paga indicação pendente, de comprador com acesso ativo, e uma única vez.
    const rs = await db.execute({
      sql: `UPDATE referrals SET status = 'pago', comissao_valor = ?
            WHERE id = ? 
              AND status = 'pendente'
              AND EXISTS (
                SELECT 1 FROM users u 
                WHERE u.email = referrals.buyer_email 
                AND u.status = 'active'
              )`,
      args: [COMISSAO_AFILIADO, id],
    });

    // Se nenhuma linha foi alterada, a indicação não existe, já foi paga ou o comprador não está ativo
    if (rs.rowsAffected === 0) {
      return NextResponse.json(
        { error: "Indicação não encontrada, já paga, ou o comprador ainda não tem acesso liberado." },
        { status: 409 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin/affiliates/pay:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}