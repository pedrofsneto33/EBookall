import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecuperaJogo — Gere sua petição para recuperar dinheiro de casas de apostas",
  description: "Ferramenta que gera petições prontas para o Juizado Especial Cível contra casas de apostas que violaram sua autoexclusão. Baseado na IN 31/2025 e no CDC. Sem advogado para causas até 20 salários-mínimos.",
  keywords: ["recuperar dinheiro bets", "petição casas de apostas", "autoexclusão", "Juizado Especial", "processar bet", "devolução em dobro", "CDC apostas"],
  authors: [{ name: "RecuperaJogo" }],
  openGraph: {
    title: "RecuperaJogo — Recupere seu dinheiro das bets",
    description: "A casa aceitou seu depósito mesmo após sua autoexclusão? Gere uma petição pronta para o Juizado Especial com argumentos blindados pela IN 31/2025.",
    type: "website",
    locale: "pt_BR",
    siteName: "RecuperaJogo",
  },
  twitter: {
    card: "summary_large_image",
    title: "RecuperaJogo — Recupere seu dinheiro das bets",
    description: "Gere sua petição para o Juizado Especial contra casas de apostas. Sem advogado para causas até 20 salários-mínimos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}