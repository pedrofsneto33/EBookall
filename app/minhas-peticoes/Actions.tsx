"use client";

import { useState } from "react";
import { Copy, Download } from "lucide-react";
import { Document, Page, Text, StyleSheet, pdf } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Times-Roman", fontSize: 12, lineHeight: 1.5 },
  paragraph: { textAlign: "justify", marginBottom: 10, whiteSpace: "pre-wrap" },
});

function PeticaoPDF({ texto }: { texto: string }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.paragraph}>{texto}</Text>
      </Page>
    </Document>
  );
}

export default function PeticaoActions({ texto }: { texto: string }) {
  const [copied, setCopied] = useState(false);

  async function baixar() {
    const blob = await pdf(<PeticaoPDF texto={texto} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `peticao-${Date.now()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copiar() {
    await navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={baixar}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors"
      >
        <Download size={14} /> Baixar PDF
      </button>
      <button
        type="button"
        onClick={copiar}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
      >
        <Copy size={14} /> {copied ? "Copiado" : "Copiar Texto"}
      </button>
    </div>
  );
}
