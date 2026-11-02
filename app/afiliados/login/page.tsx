"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AfiliadosLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 429 || res.status === 503) {
        setMessage("Erro: " + (data.error || "Serviço indisponível. Tente novamente mais tarde."));
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setMessage("Link enviado! Verifique seu e-mail.");
        setLoading(false);
        return;
      }

      setMessage("Link enviado! Verifique seu e-mail.");
    } catch (err) {
      setMessage("Erro ao enviar link. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05080C] text-white">
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-black text-center mb-4">Painel do Afiliado</h1>
          <p className="text-white/60 text-center mb-8">Acesse sua conta para pegar seu link de indicação e acompanhar suas comissões.</p>

          {message && (
            <div className="p-3 rounded-xl mb-4 text-sm text-white/80">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-white/60">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500"
                placeholder="seu@email.com"
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-[#05080C] text-[15px] bg-emerald-500 hover:bg-emerald-400 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Entrando...
                </>
              ) : (
                <>
                  <Link href="/login">Entrar</Link>
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-white/60">
            Já tem conta? <Link href="/login" className="hover:underline text-white/60">Entre como cliente</Link>
          </p>

          <p className="mt-4 text-xs text-center text-white/60">
            Ainda não é afiliado? <Link href="/seja-afiliado" className="hover:underline text-white/60">Candidate-se aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
}