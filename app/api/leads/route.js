import { createClient } from "@supabase/supabase-js";

// Usa a chave anônima (pública) — a segurança fica por conta da política de
// RLS no Supabase, que só permite INSERT, nunca leitura, pra esse papel.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  const { email, nome, whatsapp } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "E-mail inválido" }, { status: 400 });
  }

  const { error } = await supabase.from("leads").insert({
    email: email.trim(),
    nome: nome?.trim() || null,
    whatsapp: whatsapp?.trim() || null,
    origem: "guia",
  });

  if (error) {
    console.error("Erro ao salvar lead:", error);
    return Response.json({ error: "Erro ao salvar" }, { status: 500 });
  }

  return Response.json({ success: true });
}