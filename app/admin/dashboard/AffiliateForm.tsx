"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AffiliateForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/affiliates/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setFeedback({ type: "success", text: "Afiliado cadastrado com sucesso." });
        setEmail("");
        setCode("");
        router.refresh();
      } else {
        setFeedback({ type: "error", text: data.error || "Não foi possível cadastrar." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Erro de rede. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-8">
      <h2 className="font-semibold text-white mb-4">Cadastrar Novo Afiliado</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5">E-mail do Afiliado</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="afiliado@email.com"
            className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 disabled:opacity-70 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5">Código Exclusivo (ex: JOAO10)</label>
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
            placeholder="JOAO10"
            className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 disabled:opacity-70 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-[#05080C] text-sm bg-emerald-500 hover:bg-emerald-400"
        >
          {loading ? "Cadastrando..." : "Cadastrar Afiliado"}
        </button>
      </form>
      {feedback && (
        <div
          className={`mt-4 p-3 rounded-xl text-sm font-medium border ${
            feedback.type === "error"
              ? "bg-red-500/10 border-red-500/20 text-red-400"
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          }`}
        >
          {feedback.text}
        </div>
      )}
    </div>
  );
}