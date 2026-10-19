import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecuperaJogo — Petição para Juizado Especial",
  description:
    "Monte o rascunho da sua petição de restituição contra casas de apostas. Jus postulandi. Software da Primex Sistemas — não é advocacia.",
  openGraph: {
    title: "RecuperaJogo",
    description: "Rascunho de petição para Juizado Especial. Software da Primex Sistemas.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
