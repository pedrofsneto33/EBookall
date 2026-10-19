import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const nome = String(body.nome ?? "").trim();
    const whatsapp = String(body.whatsapp ?? "").trim();
    const origem = String(body.origem ?? "site").trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    // Sem Supabase: notifica por e-mail (Resend). Lead não bloqueia se o mail falhar.
    const resendApiKey = process.env.RESEND_API_KEY ?? "";
    const notifyTo = process.env.LEADS_NOTIFY_EMAIL || "pedrofsneto33@gmail.com";

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const from = process.env.RESEND_FROM || "RecuperaJogo <onboarding@resend.dev>";
        await resend.emails.send({
          from,
          to: [notifyTo],
          subject: `Novo lead (${origem}): ${email}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
              <h2 style="color: #1B6B4A;">Novo lead no RecuperaJogo</h2>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Nome</td><td style="padding: 8px; border: 1px solid #ddd;">${nome || "—"}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">WhatsApp</td><td style="padding: 8px; border: 1px solid #ddd;">${whatsapp || "—"}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Origem</td><td style="padding: 8px; border: 1px solid #ddd;">${origem}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Data</td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString("pt-BR")}</td></tr>
              </table>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("Resend falhou:", mailErr);
      }
    } else {
      console.log("Lead (sem RESEND):", { email, nome, whatsapp, origem });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no POST /api/leads:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
