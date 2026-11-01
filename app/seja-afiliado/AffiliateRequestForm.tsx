"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export default function AffiliateRequestForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/affiliates/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim(), email: email.trim(), whatsapp: whatsapp.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSuccess(true);
        setNome("");
        setEmail("");
        setWhatsapp("");
      } else {
        setError(data.error || "Não foi possível enviar a solicitação.");
      }
    } catch {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
        <p className="text-emerald-400 font-semibold text-lg mb-2">
          Solicitação enviada!
        </p>
        <p className="text-white/60 text-sm">
          Você receberá o link no WhatsApp após a aprovação.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium mb-1.5 text-white/60">Nome</label>
        <input
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={loading}
          placeholder="Seu nome"
          className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 disabled:opacity-70 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5 text-white/60">E-mail</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          placeholder="seu@email.com"
          className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 disabled:opacity-70 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5 text-white/60">WhatsApp</label>
        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          disabled={loading}
          placeholder="(86) 98811-7925"
          className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 disabled:opacity-70 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500"
        />
      </div>
      {error && (
        <div className="p-3 rounded-xl text-sm font-medium border bg-red-500/10 border-red-500/20 text-red-400">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-[#05080C] text-[15px] bg-emerald-500 hover:bg-emerald-400 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Enviando...
          </>
        ) : (
          <>
            Enviar solicitação <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}