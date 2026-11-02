import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ensureDb } from "../../lib/db";
import { dbRateLimit } from "../../lib/rate-limit-db";

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Rate limit por IP: máximo 10 por hora
    if (!(await dbRateLimit(`leads:${ip}`, 10, 60 * 60 * 1000))) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const whatsapp = String(body.whatsapp ?? "").trim();
    const origem = String(body.origem ?? "guia").trim();

    // Validações de tamanho
    if (!nome || nome.length > 100) {
      return NextResponse.json(
        { error: "Nome deve ter no máximo 100 caracteres." },
        { status: 400 }
      );
    }
    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido ou excede 254 caracteres." },
        { status: 400 }
      );
    }
    if (whatsapp && whatsapp.length > 13) {
      return NextResponse.json(
        { error: "WhatsApp deve ter no máximo 13 caracteres." },
        { status: 400 }
      );
    }

    // Meta: se for objeto, limita o tamanho total para 500 caracteres
    let safeMeta: string | null = null;
    if (body.meta !== undefined && body.meta !== null) {
      const metaStr = typeof body.meta === "string" ? body.meta : JSON.stringify(body.meta);
      if (metaStr.length > 500) {
        return NextResponse.json(
          { error: "Meta excede o limite de 500 caracteres." },
          { status: 400 }
        );
      }
      safeMeta = metaStr;
    }

    const safeNome = escapeHtml(nome);
    const safeEmail = escapeHtml(email);
    const safeWhatsapp = escapeHtml(whatsapp);
    const safeOrigem = escapeHtml(origem);

    // 1. PRIMEIRO: grava o lead no Turso (INSERT OR IGNORE evita duplicar e-mail)
    const db = await ensureDb();
    try {
      await db.execute({
        sql: `INSERT OR IGNORE INTO leads (id, email, nome, whatsapp, origem, meta) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [crypto.randomUUID(), email, nome || null, whatsapp || null, origem || "guia", safeMeta],
      });
    } catch (dbErr) {
      console.error("Erro ao gravar lead no banco:", dbErr);
      return NextResponse.json({ error: "Erro ao salvar lead." }, { status: 500 });
    }

    // 2. DEPOIS: tenta enviar o e-mail via Resend. Sem RESEND_API_KEY, o lead não se perde.
    const resendApiKey = process.env.RESEND_API_KEY ?? "";
    const notifyTo = process.env.LEADS_NOTIFY_EMAIL || "pedrofsneto33@gmail.com";

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const from = process.env.RESEND_FROM || "RecuperaJogo <onboarding@resend.dev>";
        await resend.emails.send({
          from,
          to: [notifyTo],
          subject: `Novo lead (${safeOrigem}): ${safeEmail}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
              <h2 style="color: #1B6B4A;">Novo lead no RecuperaJogo</h2>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Nome</td><td style="padding: 8px; border: 1px solid #ddd;">${safeNome || "—"}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail</td><td style="padding: 8px; border: 1px solid #ddd;">${safeEmail}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">WhatsApp</td><td style="padding: 8px; border: 1px solid #ddd;">${safeWhatsapp || "—"}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Origem</td><td style="padding: 8px; border: 1px solid #ddd;">${safeOrigem}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Data</td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString("pt-BR")}</td></tr>
              </table>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("Resend falhou:", mailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no POST /api/leads:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
