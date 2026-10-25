import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/shared/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["300", "400", "500", "600", "700"] });

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://recuperajogo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL("https://recuperajogo.com.br"),
  title: "RecuperaJogo | Recupere seu dinheiro das bets sem advogado",
  description: "A Inteligência Artificial que gera sua petição para o Juizado Especial em minutos. Sem advogado. Apenas R$ 137.",
  keywords: ["recuperar dinheiro bet", "bet injusta", "petição juizado especial", "autoexclusão bet", "processo contra bet"],
  authors: [{ name: "RecuperaJogo" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://recuperajogo.com.br",
    siteName: "RecuperaJogo",
    title: "RecuperaJogo | Recupere seu dinheiro das bets",
    description: "As bets levaram seu dinheiro? Cobre na Justiça sem precisar de advogado. O RecuperaJogo monta sua petição por R$ 137.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecuperaJogo | Recupere seu dinheiro",
    description: "Gere sua petição contra a bet em minutos. Sem advogado.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};



const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "RecuperaJogo",
      url: "https://recuperajogo.com.br",
      
    },
    {
      "@type": "Product",
      name: "RecuperaJogo — Acesso Completo",
      description:
        "Gerador de rascunho de petição para Juizado Especial Cível contra casas de apostas.",
      brand: { "@type": "Brand", name: "RecuperaJogo" },
      offers: {
        "@type": "Offer",
        price: "137.00",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: SITE,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#05080C] text-white">
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-BXG9L016HJ" />
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
