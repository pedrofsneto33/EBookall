import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://recuperajogo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/guia`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/calculadora`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/politica-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/pagamento`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
