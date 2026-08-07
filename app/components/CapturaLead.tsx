"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Loader2, Download, Shield } from "lucide-react";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const LINE = "#E4DFD1";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";

/**
 * Bloco de captura de lead. Sugestão de uso no /guia: colocar depois dos
 * primeiros passos do conteúdo gratuito (não antes de entregar valor nenhum
 * — pedir e-mail de cara, sem ter mostrado nada, converte pior).
 * 
 * pdfUrl: se você tiver uma versão em PDF do guia, passa a URL aqui e o
 * botão de download aparece depois do cadastro. Se não tiver ainda, deixa
 * undefined que ele só confirma o cadastro.
 */
export default function CapturaLead({ pdfUrl }: { pdfUrl?: string }) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErro("Digita um e-mail válido pra eu poder te mandar o material.");
      return;
    }

    if (nome.trim().length < 2) {
      setErro("Me diz seu nome pra eu saber com quem tô falando.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nome, whatsapp: whatsapp || null }),
      });

      if (!res.ok) throw new Error();

      // Evento de conversão no Plausible
      if (typeof window !== "undefined" && (window as any).plausible) {
        (window as any).plausible("Lead Capturado - Guia");
      }

      setStatus("done");
    } catch {
      setStatus("error");
      setErro("Não consegui salvar agora. Tenta de novo em instantes.");
    }
  }

  if (status === "done") {
    return (
      <div
        className="max-w-md mx-auto rounded-xl border p-6 text-center"
        style={{ backgroundColor: "#EEF4EF", borderColor: "#B9CFC0" }}
      >
        <CheckCircle2 size={28} className="mx-auto mb-2" style={{ color: "#3F6B4A" }} />
        <p className="text-sm font-medium mb-1" style={{ color: INK }}>
          Prontinho! Guardei seu contato.
        </p>
        <p className="text-sm mb-4" style={{ color: INK_SOFT }}>
          Vou te mandar esse guia por e-mail pra você consultar sempre que precisar.
        </p>
        {pdfUrl && (
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: INK }}
          >
            <Download size={15} /> Baixar guia em PDF agora
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto rounded-xl border p-6" style={{ backgroundColor: PAPER, borderColor: LINE }}>
      <p className="text-sm font-semibold mb-1" style={{ color: INK }}>
        Quer receber esse guia em PDF pra consultar depois?
      </p>
      <p className="text-sm mb-4" style={{ color: INK_SOFT }}>
        Deixa seu e-mail que eu te mando — sem spam, só isso e um lembrete ou outro se fizer sentido pro seu caso.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1" style={{ color: INK_SOFT }}>
            <Mail size={14} /> Seu nome
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
            required
            className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 text-sm"
            style={{ borderColor: LINE }}
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1" style={{ color: INK_SOFT }}>
            <Mail size={14} /> Seu e-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            required
            className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 text-sm"
            style={{ borderColor: LINE }}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: INK_SOFT }}>
            WhatsApp <span className="font-normal">(opcional)</span>
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="(86) 9 9999-9999"
            className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 text-sm"
            style={{ borderColor: LINE }}
          />
        </div>
        {erro && (
          <p className="text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: AMBER_BG, color: "#5C4A22" }}>
            {erro}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-60"
          style={{ backgroundColor: INK }}
        >
          {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : null}
          {status === "loading" ? "Enviando..." : "Quero receber"}
        </button>
        <p className="text-xs text-center" style={{ color: INK_SOFT }}>
          <Shield size={12} className="inline mr-1" />
          Seus dados seguem nossa{" "}
          <a href="/politica-privacidade" className="underline" style={{ color: SEAL }}>
            Política de Privacidade
          </a>
          .
        </p>
      </form>
    </div>
  );
}