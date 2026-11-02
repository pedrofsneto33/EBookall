import { NextRequest, NextResponse } from "next/server";
import {
  verifyMagicToken,
  createSessionToken,
  setSessionCookie,
} from "../../../lib/auth";
import { hasPaidAccess } from "../../../lib/users";
import { ensureDb } from "../../../lib/db";
import { isAdmin } from "../../../lib/admin";
import { emailKey } from "../../../lib/email-key";

export const runtime = "nodejs";

const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://recuperajogo.vercel.app";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";

  if (!token) {
    return NextResponse.redirect(`${ORIGIN}/login?error=link_invalido`);
  }

  // 1. Valida o token mágico
  const result = await verifyMagicToken(token);
  if (!result) {
    return NextResponse.redirect(`${origin}/login?error=link_expirado`);
  }

  const { user, jti } = result;

  // 2. Renderiza página com botão para consumir via POST (JTI não é consumido aqui)
  return verifyPage(token);
}

function verifyPage(token: string) {
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acesse sua conta</title>
  <style>
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #05080C; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background: #0a0f1a; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px 32px; text-align: center; max-width: 400px; width: 90%; }
    h1 { margin: 0 0 12px; font-size: 24px; font-weight: 800; }
    p { margin: 0 0 28px; color: #94a3b8; font-size: 14px; }
    form { display: flex; flex-direction: column; gap: 16px; }
    button { background: #10b981; color: #05080C; border: none; border-radius: 12px; padding: 14px 24px; font-size: 16px; font-weight: 700; cursor: pointer; width: 100%; }
    button:hover { background: #34d399; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Acesse sua conta</h1>
    <p>Clique no botão abaixo para confirmar seu acesso.</p>
    <form method="POST" action="/api/auth/verify">
      <input type="hidden" name="token" value="${token}">
      <button type="submit">Entrar na minha conta</button>
    </form>
  </div>
</body>
</html>`,
    {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    }
  );
}

export async function POST(request: NextRequest) {
  // CSRF: verifica o header Origin
  const originHeader = request.headers.get("origin");
  const expectedOrigin = ORIGIN.replace(/\/$/, "");
  if (!originHeader || originHeader !== expectedOrigin) {
    return NextResponse.json({ error: "Requisição bloqueada (CSRF)." }, { status: 403 });
  }

  const formData = await request.formData();
  const token = (formData.get("token") as string) || "";

  if (!token) {
    return NextResponse.redirect(`${ORIGIN}/login?error=link_invalido`);
  }

  // Valida o token novamente
  const result = await verifyMagicToken(token);
  if (!result) {
    return NextResponse.redirect(`${ORIGIN}/login?error=link_expirado`);
  }

  const { user, jti } = result;

  // Conecta ao banco
  let db;
  try {
    db = await ensureDb();
  } catch (err) {
    console.error("Erro ao conectar no banco no verify:", err);
    return NextResponse.redirect(`${ORIGIN}/login?error=erro_interno`);
  }

  // Consome o JTI com INSERT OR IGNORE (uso único)
  try {
    const rs = await db.execute({
      sql: "INSERT OR IGNORE INTO used_tokens (jti) VALUES (?)",
      args: [jti],
    });
    if (rs.rowsAffected === 0) {
      return NextResponse.redirect(`${ORIGIN}/login?error=link_used`);
    }
  } catch (err) {
    console.error("Erro ao consumir JTI:", err);
    return NextResponse.redirect(`${ORIGIN}/login?error=link_invalido`);
  }

  // Cria o token de sessão
  const sessionToken = await createSessionToken(user);

  // Registra quem indicou o cliente (somente se houver cookie e for o primeiro clique)
  const affiliateCode = request.cookies.get("affiliate_ref")?.value;
  if (affiliateCode) {
    try {
      // 1. Busca o e-mail do afiliado dono desse código
      const affRes = await db.execute({
        sql: "SELECT email FROM affiliates WHERE code = ?",
        args: [affiliateCode],
      });
      const affiliateEmail = affRes.rows[0]?.email as string | undefined;

      // 2. Só registra se o afiliado existir e NÃO for o próprio cliente (anti-fraude)
      if (affiliateEmail && emailKey(affiliateEmail) !== emailKey(user.email)) {
        // 3. INSERT ON CONFLICT: Se o cliente for novo, cria a linha. Se já existir, atualiza apenas se referred_by estiver vazio.
        await db.execute({
          sql: `
            INSERT INTO users (email, status, peticoes_usadas, referred_by) 
            VALUES (?, 'pending', 0, ?) 
            ON CONFLICT(email) DO UPDATE SET 
              referred_by = excluded.referred_by
            WHERE users.referred_by IS NULL AND users.status != 'active'
          `,
          args: [user.email, affiliateCode],
        });
      }
    } catch (err) {
      // Não bloqueia o login em caso de erro no afiliado
      console.error("Erro ao registrar afiliado:", err);
    }
  }

  // Define o destino (Admin, Afiliado, Cliente Pagante ou Pendente)
  let dest = `${ORIGIN}/pagamento`; // Padrão

  if (isAdmin(user.email)) {
    dest = `${ORIGIN}/admin/dashboard`;
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
      dest = `${ORIGIN}/afiliados`;
    } else {
      // Verifica se é pagante
      let paid = false;
      try {
        paid = await hasPaidAccess(user.email);
      } catch (err) {
        console.error("Erro ao verificar pagamento:", err);
      }

      if (paid) {
        dest = `${ORIGIN}/gerador`;
      }
    }
  }

  // Redireciona com o cookie de sessão
  const res = NextResponse.redirect(dest);
  setSessionCookie(res, sessionToken);
  return res;
}