import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { ensureDb } from "../../../lib/db";
import { isAdmin } from "../../../lib/admin";
import { grantAccessByEmail } from "../../../lib/users";
import { emailKey } from "../../../lib/email-key";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !isAdmin(session.email)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const action = String(body.action ?? "");
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    if (action === "grant") {
      await grantAccessByEmail(email, "admin");

      try {
        const db = await ensureDb();
        
        // Busca quem indicou este usuário
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
            
            // Verifica auto-indicação usando emailKey (ignora pontos e +tags do Gmail)
            if (affiliateEmail && emailKey(affiliateEmail) !== emailKey(email)) {
              
              // Verifica se este comprador já gerou comissão
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
        console.error("Erro ao registrar referral:", err);
      }
    } else if (action === "revoke") {
      const db = await ensureDb();
      await db.execute({
        sql: "UPDATE users SET status = 'pending', peticoes_usadas = 0 WHERE email = ?",
        args: [email],
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Erro no user-action:", e);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}