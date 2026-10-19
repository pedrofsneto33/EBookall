import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim();
    const whatsapp = body.whatsapp ? String(body.whatsapp).trim() : null;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: "Supabase não configurado" }, { status: 500 });
    }

    const supabase = createClient(url, key);

    const { error: dbError } = await supabase.from("leads").insert({
      email,
      whatsapp,
      origem: "guia",
    });

    if (dbError) {
      console.error("Erro ao salvar no banco:", dbError);
      return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
    }

    const resendApiKey = process.env.RESEND_API_KEY ?? "";
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "RecuperaJogo <onboarding@resend.dev>",
        to: ["pedrofsneto33@gmail.com"],
        subject: `Novo lead capturado: ${email}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #1B6B4A;">Novo lead no RecuperaJogo!</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail:</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">WhatsApp:</td><td style="padding: 8px; border: 1px solid #ddd;">${whatsapp || "Não informado"}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Data:</td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString("pt-BR")}</td></tr>
            </table>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no POST /api/leads:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
