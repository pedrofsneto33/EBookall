import { NextRequest, NextResponse } from "next/server";
import { createMagicToken } from "../../../lib/auth";
import { rateLimit } from "../../../lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    if (!rateLimit(`login:${ip}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: "Muitas tentativas. Tente novamente mais tarde." }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const brevoKey = process.env.BREVO_API_KEY?.trim();
    if (!brevoKey) {
      return NextResponse.json({ error: "Serviço de e-mail indisponível." }, { status: 503 });
    }

    // 2. Gera o token
    const token = await createMagicToken(email);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const link = `${siteUrl}/api/auth/verify?token=${encodeURIComponent(token)}`;

    // 3. HTML do e-mail
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #0F1C2E;">
        <h2 style="color: #1B6B4A;">Acesse sua conta no RecuperaJogo</h2>
        <p>Clique no botão abaixo para entrar. Este link é único e expira em 30 minutos.</p>
        <a href="${link}" style="display: inline-block; padding: 12px 24px; background-color: #1B6B4A; color: white; text-decoration: none; border-radius: 8px; margin-top: 16px; font-weight: bold;">Entrar na minha conta</a>
        <p style="margin-top: 24px; font-size: 12px; color: #666;">Se você não solicitou este e-mail, pode ignorá-lo. Dica: verifique sua pasta de spam.</p>
      </div>
    `;

    // 4. Envio via API HTTP do Brevo
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "RecuperaJogo", email: "pedrofsneto33@gmail.com" },
        to: [{ email: email }],
        subject: "Seu link de acesso ao RecuperaJogo",
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro Brevo:", errorText);
      return NextResponse.json({ error: "Erro ao enviar e-mail. Tente novamente." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Link enviado com sucesso!" });

  } catch (e) {
    console.error("Erro no request-link:", e);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}