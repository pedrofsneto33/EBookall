import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RecuperaJogo — Contra as bets · petição para o Juizado",
  description:
    "Eu já ganhei petições contra casas de apostas. Monte o rascunho da sua peça, pague no PIX (CNPJ Primex) e protocole no Juizado Especial. Software, não advocacia.",
  openGraph: {
    title: "RecuperaJogo — Contra as bets",
    description:
      "Gerador de petição nascido de processos reais contra casas de apostas. PIX via CNPJ · WhatsApp.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased bg-[#05080C] text-white`}>
        {children}
      </body>
    </html>
  );
}
