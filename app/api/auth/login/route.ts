import { NextRequest, NextResponse } from "next/server";
import { createMagicToken } from "../../../lib/auth";
import { Resend } from "resend";

export const runtime = "nodejs";

/** Login = reenvia magic link (sem senha / sem Stripe). */
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
        subject: "Link de acesso — RecuperaJogo",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto">
            <h2 style="color:#1B6B4A">Entrar no RecuperaJogo</h2>
            <p><a href="${link}" style="background:#1B6B4A;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">Entrar agora</a></p>
          </div>
        `,
      });
      return NextResponse.json({
        ok: true,
        message: "Link enviado. Confira seu e-mail (e o spam).",
      });
    }

    return NextResponse.json({ ok: true, message: "Link gerado.", devLink: link });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
