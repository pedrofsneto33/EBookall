// app/api/auth/login/route.ts (ou request-link/route.ts)
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createMagicToken } from "../../../lib/auth";
import { rateLimit } from "../../../lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(`login:${ip}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente mais tarde." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    // 1. Gera o token mágico (válido por 30 min, como definido no auth.ts)
    const magicToken = await createMagicToken(email);
    
    // 2. Monta a URL de verificação (que vai criar a sessão de verdade depois)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const verifyUrl = `${siteUrl}/api/auth/verify?token=${magicToken}`;

    // 3. Verifica se tem a chave do Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
       return NextResponse.json({ error: "Serviço de e-mail indisponível." }, { status: 500 });
    }

    // 4. Envia o e-mail para o usuário
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM || "RecuperaJogo <onboarding@resend.dev>",
      to: [email],
      subject: "Seu link de acesso ao RecuperaJogo",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #1B6B4A;">Acesse sua conta</h2>
          <p>Clique no botão abaixo para entrar no RecuperaJogo. Este link é único e expira em 30 minutos.</p>
          <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background-color: #1B6B4A; color: white; text-decoration: none; border-radius: 8px; margin-top: 16px; font-weight: bold;">Entrar na minha conta</a>
          <p style="margin-top: 24px; font-size: 12px; color: #666;">Se você não solicitou este e-mail, pode ignorá-lo.</p>
        </div>
      `
    });

    // Retorna sucesso, MAS NÃO CRIA A SESSÃO AQUI!
    return NextResponse.json({ ok: true, message: "Link enviado para o seu e-mail." });
    
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}