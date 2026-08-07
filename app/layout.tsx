import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BotaoWhatsApp } from "./components/BlocoConfianca"; // ✅ BotaoWhatsApp adicionado aqui!

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecuperaJogo — Gere sua petição para recuperar dinheiro de casas de apostas",
  description: "Ferramenta que gera petições prontas para o Juizado Especial Cível contra casas de apostas que violaram sua autoexclusão ou dever de cuidado. Baseado na Lei 14.790/2023 e CDC.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* Analytics Plausible (leve e sem banner de cookie) */}
        <script defer data-domain="recuperajogo.vercel.app" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        {/* ✅ Botão de WhatsApp flutuante em todas as páginas */}
        <BotaoWhatsApp floating />
      </body>
    </html>
  );
}