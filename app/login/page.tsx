"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

const INK = "#0F1C2E";
const INK_SOFT = "#4A5B6E";
const PAPER_LINE = "#E6E1D6";
const SEAL = "#1B6B4A";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Nunca manda direto pro gerador após login — só /pagamento (ou gerador se já pagou)
  const redirectAfterPay = searchParams.get("redirect") || searchParams.get("next") || "/gerador";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  useEffect(() => {
    const err = searchParams.get("error");
    if (err) {
      setMessage("Sessão expirada. Entre de novo com seu e-mail.");
      setMessageType("error");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage("Erro: " + (data.error || "Falha ao entrar"));
        setMessageType("error");
        setLoading(false);
        return;
      }

      setMessage("Pronto! Redirecionando...");
      setMessageType("success");

      // Confere pagamento de verdade no servidor
      const meRes = await fetch("/api/auth/me", { credentials: "include" });
      const me = meRes.ok ? await meRes.json() : null;

      if (me?.status === "active") {
        const dest = redirectAfterPay.startsWith("/") ? redirectAfterPay : "/gerador";
        router.replace(dest);
      } else {
        // Sempre pagamento se não pagou
        router.replace("/pagamento");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro de rede";
      setMessage("Erro: " + msg);
      setMessageType("error");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-[#05080C] text-sm font-black bg-emerald-500">
          RJ
        </div>
        <h1 className="text-xl font-bold text-white">
          Entrar / Criar conta
        </h1>
        <p className="text-sm mt-1 text-white/60">
          Informe o e-mail. Depois você paga R$ 137 para liberar o gerador.
        </p>
      </div>

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

        {message && (
          <div
            className={`p-3 rounded-xl text-sm font-medium flex items-start gap-2 border ${
              messageType === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-amber-500/10 border-amber-500/20 text-amber-400"
            }`}
          >
            {messageType === "error" ? (
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            )}
            <span>{message}</span>
            {loading && messageType === "success" && (
              <Loader2 size={16} className="animate-spin ml-1 shrink-0" />
            )}
          </div>
        )}

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
              Continuar para o pagamento <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-center mt-6 text-white/60">
        O gerador só abre depois do pagamento de R$ 137 (Pix ou cartão).
      </p>

      <div className="text-center mt-4">
        <a href="/" className="text-xs hover:underline text-white/60">
          ← Voltar ao início
        </a>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#05080C]">
      <Suspense
        fallback={
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <Loader2 size={32} className="mx-auto mb-4 animate-spin text-emerald-400" />
            <p className="text-sm text-white/60">
              Carregando...
            </p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
