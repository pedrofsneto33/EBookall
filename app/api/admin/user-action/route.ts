import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { ensureDb, normalizeEmail } from "../../../lib/db";
import { grantAccessByEmail } from "../../../lib/users";
import { isAdmin } from "../../../lib/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || !isAdmin(session.email)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  let body: { email?: string; action?: string } = {};
  try {
    body = (await req.json()) as { email?: string; action?: string };
  } catch {
    body = {};
  }

  const email = body.email ? normalizeEmail(body.email) : "";
  const action = body.action;

  if (!email || (action !== "grant" && action !== "revoke")) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  if (action === "grant") {
    await grantAccessByEmail(email, "admin");

    try {
      const db = await ensureDb();
      const userRes = await db.execute({
        sql: "SELECT referred_by FROM users WHERE email = ?",
        args: [email],
      });
      const referredBy = userRes.rows[0]?.referred_by as string | undefined;
      if (referredBy) {
        const exists = await db.execute({
          sql: "SELECT code, email FROM affiliates WHERE code = ?",
          args: [referredBy],
        });
        if (exists.rows.length > 0) {
          const affiliateEmail = exists.rows[0]?.email as string | undefined;
          if (
            affiliateEmail &&
            affiliateEmail.toLowerCase().trim() !== email.toLowerCase().trim()
          ) {
            const existing = await db.execute({
              sql: "SELECT id FROM referrals WHERE buyer_email = ?",
              args: [email],
            });
            if (existing.rows.length === 0) {
              await db.execute({
                sql: "INSERT OR IGNORE INTO referrals (id, affiliate_code, buyer_email, status) VALUES (?, ?, ?, ?)",
                args: [crypto.randomUUID(), referredBy, email, "pendente"],
              });
            }
          }
        }
      }
    } catch (err) {
      console.error("Erro ao registrar referral de afiliado no grant:", err);
    }
  } else {
    const db = await ensureDb();
    await db.execute({
      sql: `UPDATE users SET status = 'pending', peticoes_usadas = 0, updated_at = datetime('now') WHERE email = ?`,
      args: [email],
    });
  }

  return NextResponse.json({ ok: true });
}
