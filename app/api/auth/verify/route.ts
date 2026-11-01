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
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://recuperajogo.vercel.app";

  if (!token) {
    return NextResponse.redirect(`${origin}/login?error=link_invalido`);
  }

  // 1. Valida o token mágico
  const result = await verifyMagicToken(token);
  if (!result) {
    return NextResponse.redirect(`${origin}/login?error=link_expirado`);
  }

  const { user, jti } = result;

  // 2. Conecta ao banco UMA ÚNICA VEZ para toda a operação
  let db;
  try {
    db = await ensureDb();
  } catch (err) {
    console.error("Erro ao conectar no banco no verify:", err);
    return NextResponse.redirect(`${origin}/login?error=erro_interno`);
  }

  // 3. Verifica se o JTI já foi usado (link de uso único)
  try {
    const existing = await db.execute({
      sql: "SELECT jti FROM used_tokens WHERE jti = ?",
      args: [jti],
    });
    if (existing.rows.length > 0) {
      return NextResponse.redirect(`${origin}/login?error=link_used`);
    }
    
    // Marca o token como usado
    await db.execute({
      sql: "INSERT INTO used_tokens (jti) VALUES (?)",
      args: [jti],
    });
  } catch (err) {
    console.error("Erro ao validar JTI:", err);
    return NextResponse.redirect(`${origin}/login?error=link_invalido`);
  }

  // 4. Cria o token de sessão
  const sessionToken = await createSessionToken(user);

  // 5. Registra quem indicou o cliente (somente se houver cookie e for o primeiro clique)
  const affiliateCode = request.cookies.get("affiliate_ref")?.value;
  if (affiliateCode) {
    try {
      await db.execute({
        sql: "UPDATE users SET referred_by = ? WHERE email = ? AND referred_by IS NULL",
        args: [affiliateCode, user.email],
      });
    } catch (err) {
      // Não bloqueia o login se der erro ao salvar o afiliado
      console.error("Erro ao registrar indicacao de afiliado:", err);
    }
  }

  // 6. Define o destino (Admin, Afiliado, Cliente Pagante ou Pendente)
  let dest = `${origin}/pagamento`; // Padrão

  if (isAdmin(user.email)) {
    dest = `${origin}/admin/dashboard`;
  } else {
    // Verifica se é afiliado
    let isAffiliate = false;
    try {
      const aff = await db.execute({
        sql: "SELECT code FROM affiliates WHERE email = ?",
        args: [user.email],
      });
      isAffiliate = aff.rows.length > 0;
    } catch (err) {
      console.error("Erro ao verificar se é afiliado:", err);
    }

    if (isAffiliate) {
      dest = `${origin}/afiliados`;
    } else {
      // Verifica se é pagante
      let paid = false;
      try {
        paid = await hasPaidAccess(user.email);
      } catch (err) {
        console.error("Erro ao verificar pagamento:", err);
      }
      
      if (paid) {
        dest = `${origin}/gerador`;
      }
    }
  }

  // 7. Redireciona com o cookie de sessão
  const res = NextResponse.redirect(dest);
  setSessionCookie(res, sessionToken);
  return res;
}