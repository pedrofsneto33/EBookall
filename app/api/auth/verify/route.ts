import { NextRequest, NextResponse } from "next/server";
import {
  verifyMagicToken,
  createSessionToken,
  setSessionCookie,
} from "../../../lib/auth";
import { hasPaidAccess } from "../../../lib/users";
import { ensureDb } from "../../../lib/db";
import { isAdmin } from "../../../lib/admin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || "https://recuperajogo.vercel.app";

  if (!token) {
    return NextResponse.redirect(`${origin}/login?error=link_invalido`);
  }

  const user = await verifyMagicToken(token);
  if (!user) {
    return NextResponse.redirect(`${origin}/login?error=link_expirado`);
  }

  const sessionToken = await createSessionToken(user);

  // Registro de afiliado (não bloqueia o login)
  const affiliateCode = request.cookies.get("affiliate_ref")?.value;
  if (affiliateCode) {
    try {
      const db = await ensureDb();
      const exists = await db.execute({
        sql: "SELECT code FROM affiliates WHERE code = ?",
        args: [affiliateCode],
      });
      if (exists.rows.length > 0) {
        await db.execute({
          sql: "INSERT INTO referrals (id, affiliate_code, buyer_email, status) VALUES (?, ?, ?, ?)",
          args: [crypto.randomUUID(), affiliateCode, user.email, "pendente"],
        });
      }
    } catch (err) {
      console.error("Erro ao registrar referral de afiliado:", err);
    }
  }

  let dest: string;

  if (isAdmin(user.email)) {
    dest = `${origin}/admin/dashboard`;
  } else {
    let isAffiliate = false;
    try {
      const db = await ensureDb();
      const aff = await db.execute({
        sql: "SELECT code FROM affiliates WHERE email = ?",
        args: [user.email],
      });
      isAffiliate = aff.rows.length > 0;
    } catch {
      isAffiliate = false;
    }

    if (isAffiliate) {
      dest = `${origin}/afiliados`;
    } else {
      let paid = false;
      try {
        paid = await hasPaidAccess(user.email);
      } catch {
        paid = false;
      }
      dest = paid ? `${origin}/gerador` : `${origin}/pagamento`;
    }
  }

  const res = NextResponse.redirect(dest);
  setSessionCookie(res, sessionToken);
  return res;
}
