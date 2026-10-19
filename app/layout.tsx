import type { Metadata } from "next";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://recuperajogo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "RecuperaJogo — Petição contra bets no Juizado Especial",
    template: "%s · RecuperaJogo",
  },
  description:
    "Gerador de rascunho de petição para Juizado Especial Cível (jus postulandi) contra casas de apostas. Software da Primex Sistemas. R$ 137 · não é advocacia · não promete resultado.",
  alternates: { canonical: SITE },
  openGraph: {
    title: "RecuperaJogo — Contra as bets",
    description:
      "Rascunho de petição para o Juizado. Método testado em processo real. Stripe · garantia 7 dias.",
    url: SITE,
    siteName: "RecuperaJogo",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RecuperaJogo — Contra as bets",
    description: "Gerador de petição para Juizado Especial. Software, não advocacia.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Primex Sistemas LTDA",
      url: "https://www.primexsistemas.com",
      taxID: "55.536.885/0001-30",
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
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#05080C] text-white">{children}</body>
    </html>
  );
}
