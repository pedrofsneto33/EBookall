import { NextRequest, NextResponse } from "next/server";
import { createMagicToken } from "../../../lib/auth";
import { dbRateLimit } from "../../../lib/rate-limit-db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    // Pega o IP do cliente (com fallback seguro)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

    // 1. Limite por IP: máximo 10 tentativas a cada 10 minutos
    if (!(await dbRateLimit(`login-ip:${ip}`, 10, 10 * 60 * 1000))) {
      return NextResponse.json({ error: "Muitas tentativas. Tente novamente em 10 minutos." }, { status: 429 });
    }

    // 2. Limite por e-mail: máximo 3 tentativas a cada 10 minutos
    if (!(await dbRateLimit(`login-email:${email}`, 3, 10 * 60 * 1000))) {
      return NextResponse.json({ error: "Muitas tentativas para este e-mail. Tente novamente em 10 minutos." }, { status: 429 });
    }

    // 3. Limite global: protege a cota do Brevo (máximo 500 e-mails por hora)
    if (!(await dbRateLimit("login-global", 500, 60 * 60 * 1000))) {
      return NextResponse.json({ error: "Serviço temporariamente indisponível. Tente novamente mais tarde." }, { status: 429 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (!siteUrl) {
      console.error("ERRO CRÍTICO: NEXT_PUBLIC_SITE_URL não configurada");
      return NextResponse.json({ error: "Erro de configuração do servidor." }, { status: 500 });
    }

    const brevoKey = process.env.BREVO_API_KEY?.trim();
    if (!brevoKey) {
      return NextResponse.json({ error: "Serviço de e-mail indisponível." }, { status: 503 });
    }

    const token = await createMagicToken(email);
    const link = `${siteUrl.replace(/\/$/, "")}/api/auth/verify?token=${encodeURIComponent(token)}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #0F1C2E;">
        <h2 style="color: #1B6B4A;">Acesse sua conta no RecuperaJogo</h2>
        <p>Clique no botão abaixo para entrar. Este link é único e expira em 30 minutos.</p>
        <a href="${link}" style="display: inline-block; padding: 12px 24px; background-color: #1B6B4A; color: white; text-decoration: none; border-radius: 8px; margin-top: 16px; font-weight: bold;">Entrar na minha conta</a>
        <p style="margin-top: 16px; font-size: 13px; color: #555;"><strong>Importante:</strong> Após clicar no botão, você ficará logado por 30 dias no seu dispositivo. Só será necessário pedir um novo link se você clicar em "Sair" ou após esse período.</p>
        <p style="margin-top: 24px; font-size: 12px; color: #666;">Se você não solicitou este e-mail, pode ignorá-lo. Dica: verifique sua pasta de spam.</p>
      </div>
    `;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "RecuperaJogo", email: process.env.MAIL_FROM_EMAIL?.trim() || "pedrofsneto33@gmail.com" },
        to: [{ email }],
        subject: "Seu link de acesso ao RecuperaJogo",
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro Brevo:", errorText);
      return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Link enviado com sucesso!" });
  } catch (e) {
    console.error("Erro no request-link:", e);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}