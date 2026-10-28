import { NextResponse } from "next/server";

export async function GET() {
  // Pega todas as chaves de variáveis de ambiente que contenham BREVO ou SMTP
  const variaveisEncontradas = Object.keys(process.env).filter(
    (key) => key.includes("BREVO") || key.includes("SMTP")
  );

  return NextResponse.json({
    variaveisEncontradas: variaveisEncontradas,
    totalVariaveisNoAmbiente: Object.keys(process.env).length,
    valorUser: process.env.BREVO_SMTP_USER ? "Existe" : "Nulo",
    valorPass: process.env.BREVO_SMTP_PASS ? "Existe" : "Nulo",
    databaseUrlExiste: !!process.env.DATABASE_URL // Teste de controle (sabemos que essa funciona)
  });
}