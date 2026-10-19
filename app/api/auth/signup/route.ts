import { NextRequest, NextResponse } from "next/server";
import { createMagicToken } from "../../../lib/auth";
import { Resend } from "resend";

export const runtime = "nodejs";

/** Alias: cria conta = envia magic link (sem Stripe/Supabase). */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const token = await createMagicToken(email);
    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://recuperajogo.vercel.app";
    const link = `${origin}/api/auth/verify?token=${encodeURIComponent(token)}`;

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      const from = process.env.RESEND_FROM || "RecuperaJogo <onboarding@resend.dev>";
      await resend.emails.send({
        from,
        to: [email],
        subject: "Confirme seu acesso — RecuperaJogo",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto">
            <h2 style="color:#1B6B4A">Bem-vindo ao RecuperaJogo</h2>
            <p>Clique para confirmar o e-mail e continuar.</p>
            <p style="margin:28px 0">
              <a href="${link}" style="background:#1B6B4A;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">
                Confirmar e entrar
              </a>
            </p>
          </div>
        `,
      });
      return NextResponse.json({
        ok: true,
        message: "Enviamos um link para o seu e-mail. Abra e clique para entrar.",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Link gerado.",
      devLink: link,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
