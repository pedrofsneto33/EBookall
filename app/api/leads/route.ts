import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

const resendApiKey = process.env.RESEND_API_KEY ?? "";
const resend = new Resend(resendApiKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim();
    const whatsapp = body.whatsapp ? String(body.whatsapp).trim() : null;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const { error: dbError } = await supabase.from("leads").insert({
      email,
      whatsapp,
      origem: "guia",
    });

    if (dbError) {
      console.error("Erro ao salvar no banco:", dbError);
      return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
    }

    if (resendApiKey) {
      await resend.emails.send({
        from: "RecuperaJogo <onboarding@resend.dev>",
        to: ["pedrofsneto33@gmail.com"], // Seu e-mail real
        subject: `🔔 Novo lead capturado: ${email}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #8A6D3B;">Novo lead no RecuperaJogo!</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail:</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">WhatsApp:</td><td style="padding: 8px; border: 1px solid #ddd;">${whatsapp || "Não informado"}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Data:</td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString("pt-BR")}</td></tr>
            </table>
          </div>
        `,
      });
      console.log("✅ Notificação enviada");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no POST /api/leads:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}