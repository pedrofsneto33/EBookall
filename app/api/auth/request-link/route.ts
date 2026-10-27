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

    if (!rateLimit(`request-link:${ip}`, 5, 10 * 60 * 1000)) {
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

    const token = await createMagicToken(email);
    const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://recuperajogo.vercel.app").replace(/\/$/, "");
    const link = `${origin}/api/auth/verify?token=${encodeURIComponent(token)}`;

    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (!resendKey) {
      return NextResponse.json({ error: "Serviço de e-mail indisponível." }, { status: 503 });
    }

    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM || "RecuperaJogo <onboarding@resend.dev>";
    await resend.emails.send({
      from,
      to: [email],
      subject: "Seu acesso ao RecuperaJogo",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto">
          <h2 style="color:#1B6B4A">Entrar no RecuperaJogo</h2>
          <p>Clique no botão abaixo. O link vale por 30 minutos.</p>
          <p style="margin:28px 0">
            <a href="${link}" style="background:#1B6B4A;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">
              Entrar agora
            </a>
          </p>
          <p style="color:#666;font-size:12px">Se você não pediu este e-mail, ignore.</p>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: "Enviamos um link de acesso para o seu e-mail. Abra a caixa de entrada (e o spam).",
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao enviar link";
    console.error("request-link:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
