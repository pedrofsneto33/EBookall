import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { ensureDb } from "../../../lib/db";

function toTextLocal(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (value instanceof Uint8Array) return new TextDecoder().decode(value);
  return String(value);
}

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  console.log("Buscando afiliado para o email:", session.email);

  try {
    const db = await ensureDb();
    const affiliateRes = await db.execute({
      sql: "SELECT code, email FROM affiliates WHERE email = ?",
      args: [session.email],
    });

    const affiliate = affiliateRes.rows[0];
    console.log("Resultado da busca:", affiliate);

    if (!affiliate) {
      return NextResponse.json({ error: "Não é afiliado" }, { status: 404 });
    }

    const code = toTextLocal(affiliate.code);

    const referralsRes = await db.execute({
      sql: "SELECT id, affiliate_code, buyer_email, status, comissao_valor, created_at FROM referrals WHERE affiliate_code = ? ORDER BY created_at DESC",
      args: [code],
    });

    const referrals = referralsRes.rows.map((row) => ({
      id: toTextLocal(row.id),
      affiliateCode: toTextLocal(row.affiliate_code),
      buyerEmail: toTextLocal(row.buyer_email),
      status: toTextLocal(row.status),
      comissaoValor: row.comissao_valor,
      createdAt: toTextLocal(row.created_at),
    }));

    return NextResponse.json({ code, referrals });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro";
    console.error("affiliates/me:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}