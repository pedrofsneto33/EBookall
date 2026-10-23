"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, KeyRound, Loader2, Mail, ShieldCheck } from "lucide-react";

type Feedback = { type: "success" | "error"; text: string } | null;

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const target = email.trim();
    if (!target || !key) {
      setFeedback({ type: "error", text: "Preencha o e-mail do cliente e a chave de administrador." });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/grant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: target, key }),
      });

      let data: { ok?: boolean; email?: string; error?: string } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        data = {};
      }

      if (res.ok) {
        const granted = data.email || target.toLowerCase();
        setFeedback({
          type: "success",
          text: `Acesso liberado para ${granted}. O cliente já pode entrar com esse e-mail.`,
        });
        setEmail("");
        setKey("");
      } else if (res.status === 401) {
        setFeedback({ type: "error", text: "Chave inválida. Confira a ADMIN_SECRET configurada no servidor." });
      } else {
        setFeedback({
          type: "error",
          text: data.error ? `Erro: ${data.error}` : "Não foi possível liberar o acesso. Tente novamente.",
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro de rede";
      setFeedback({ type: "error", text: `Erro: ${msg}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />

      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#05080C]">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-[#05080C] bg-emerald-500">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-xl font-bold text-white">
              Liberação manual de acesso
            </h1>
            <p className="text-sm mt-1 text-white/60">
              Acesso liberado após confirmação de PIX no CNPJ Primex.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-medium mb-1.5 text-white/60">
                E-mail do cliente
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 disabled:opacity-70 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500"
                  placeholder="cliente@email.com"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-key" className="block text-xs font-medium mb-1.5 text-white/60">
                Chave de administrador
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" />
                <input
                  id="admin-key"
                  type="password"
                  required
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  disabled={loading}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 disabled:opacity-70 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500"
                  placeholder="ADMIN_SECRET"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>

            {feedback && (
              <div
                role="status"
                aria-live="polite"
                className={`p-3 rounded-xl text-sm font-medium flex items-start gap-2 border ${
                  feedback.type === "error"
                    ? "bg-red-500/10 border-red-500/20 text-red-400"
                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                }`}
              >
                {feedback.type === "error" ? (
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                )}
                <span className="break-words">{feedback.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-[#05080C] text-[15px] bg-emerald-500 hover:bg-emerald-400 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Liberando...
                </>
              ) : (
                <>Liberar acesso</>
              )}
            </button>
          </form>

          <p className="text-xs text-center mt-6 text-white/60">
            A chave não é salva nem fica no histórico do navegador.
          </p>

        </div>
      </div>
    </>
  );
}
