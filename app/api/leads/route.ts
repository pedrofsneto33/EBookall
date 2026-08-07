import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// O "!" no final diz ao TypeScript que essas variáveis existem (não são undefined)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

// Tipamos o 'request' como NextRequest para resolver o erro de 'any'
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, whatsapp } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }

  // Salva no Supabase
  const { error: dbError } = await supabase.from("leads").insert({
    email: email.trim(),
    whatsapp: whatsapp?.trim() || null,
    origem: "guia",
  });

  if (dbError) {
    console.error("Erro ao salvar no banco:", dbError);
    return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
  }

  // ✅ Envia notificação por e-mail para o Pedro
  try {
    await resend.emails.send({
      from: "RecuperaJogo <onboarding@resend.dev>",
      to: ["pedrofsneto33@gmail.com"], // Seu e-mail
      subject: `🔔 Novo lead capturado: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #8A6D3B;">Novo lead no RecuperaJogo!</h2>
          <p>Alguém acabou de preencher o formulário do guia:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">WhatsApp:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${whatsapp || "Não informado"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Data:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString("pt-BR")}</td>
            </tr>
          </table>
          <p style="color: #666; font-size: 12px;">Este e-mail foi enviado automaticamente pelo RecuperaJogo.</p>
        </div>
      `,
    });
    console.log("✅ Notificação enviada para o Pedro");
  } catch (emailError) {
    console.error("Erro ao enviar e-mail:", emailError);
  }

  return NextResponse.json({ success: true });
}