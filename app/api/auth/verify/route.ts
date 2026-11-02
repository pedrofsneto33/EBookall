import { NextRequest, NextResponse } from "next/server";
import { verifyMagicToken, createSessionToken, setSessionCookie } from "../../../lib/auth";
import { hasPaidAccess } from "../../../lib/users";
import { ensureDb } from "../../../lib/db";
import { isAdmin } from "../../../lib/admin";
import { SITE_URL, REF_CODE_RE } from "../../../lib/config";
import { emailKey } from "../../../lib/email-key";

export const runtime = "nodejs";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * GET: Apenas exibe o botão de confirmação.
 * Não consome o link, para evitar que antivírus de e-mail "gastem" o acesso do cliente.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  if (!token) return NextResponse.redirect(`${SITE_URL}/login?error=link_invalido`);

  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Entrar no RecuperaJogo</title></head>
<body style="font-family:Arial,sans-serif;background:#05080C;color:#fff;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0">
<form method="POST" action="/api/auth/verify" style="max-width:380px;padding:24px;text-align:center">
<h1 style="font-size:20px">Entrar no RecuperaJogo</h1>
<p style="color:#9aa4b2;font-size:14px">Clique para confirmar o seu acesso. Este link só funciona uma vez.</p>
<input type="hidden" name="token" value="${esc(token)}">
<button type="submit" style="margin-top:12px;padding:14px 28px;border:0;border-radius:10px;background:#10b981;color:#05080C;font-weight:700;font-size:16px;cursor:pointer">Entrar na minha conta</button>
</form></body></html>`;
  return new NextResponse(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

/**
 * POST: Consome o link, cria a sessão e registra o afiliado.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  const token = String(form?.get("token") ?? "");
  if (!token) return NextResponse.redirect(`${SITE_URL}/login?error=link_invalido`, 303);

  const user = await verifyMagicToken(token);
  if (!user) return NextResponse.redirect(`${SITE_URL}/login?error=link_expirado`, 303);

  // Uso único: o jti só entra uma vez na tabela.
  try {
    const db = await ensureDb();
    const r = await db.execute({ sql: "INSERT OR IGNORE INTO used_tokens (jti, used_at) VALUES (?, ?) RETURNING jti", args: [user.jti, Date.now()] });
    if (r.rows.length !== 1) return NextResponse.redirect(`${SITE_URL}/login?error=link_expirado`, 303);
  } catch (e) {
    console.error("verify/used_tokens:", e instanceof Error ? e.message : e);
    return NextResponse.redirect(`${SITE_URL}/login?error=link_invalido`, 303);
  }

  const sessionToken = await createSessionToken(user.user);

  // Guarda o código do afiliado no usuário (a indicação só é criada quando o acesso é liberado)
  const affiliateCode = request.cookies.get("affiliate_ref")?.value;
  if (affiliateCode && REF_CODE_RE.test(affiliateCode)) {
    try {
      const db = await ensureDb();
      const affRes = await db.execute({ sql: "SELECT email FROM affiliates WHERE code = ?", args: [affiliateCode] });
      const affiliateEmail = affRes.rows[0]?.email as string | undefined;
      
      if (affiliateEmail && emailKey(affiliateEmail) !== emailKey(user.user.email)) {
        await db.execute({
          sql: `INSERT INTO users (email, status, peticoes_usadas, referred_by) 
                VALUES (?, 'pending', 0, ?) 
                ON CONFLICT(email) DO UPDATE SET referred_by = excluded.referred_by
                WHERE users.referred_by IS NULL AND users.status != 'active'`,
          args: [user.user.email, affiliateCode],
        });
      }
    } catch (err) {
      console.error("registrar afiliado:", err);
    }
  }

  let dest: string;
  if (isAdmin(user.user.email)) {
    dest = `${SITE_URL}/admin/dashboard`;
  } else {
    let isAffiliate = false;
    try {
      const db = await ensureDb();
      const aff = await db.execute({ sql: "SELECT code FROM affiliates WHERE email = ?", args: [user.user.email] });
      isAffiliate = aff.rows.length > 0;
    } catch {}
    
    if (isAffiliate) {
      dest = `${SITE_URL}/afiliados`;
    } else {
      const paid = await hasPaidAccess(user.user.email);
      dest = paid ? `${SITE_URL}/gerador` : `${SITE_URL}/pagamento`;
    }
  }

  const res = NextResponse.redirect(dest, 303);
  setSessionCookie(res, sessionToken);
  return res;
}