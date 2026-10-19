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
  const redirect = searchParams.get("redirect") || searchParams.get("next") || "/gerador";

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

      if (data.status === "active") {
        router.replace(redirect.startsWith("/") ? redirect : "/gerador");
      } else {
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
    <div
      className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full border"
      style={{ borderColor: PAPER_LINE }}
    >
      <div className="text-center mb-6">
        <div
          className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-sm font-black"
          style={{ backgroundColor: SEAL }}
        >
          RJ
        </div>
        <h1 className="text-xl font-bold" style={{ color: INK }}>
          Entrar / Criar conta
        </h1>
        <p className="text-sm mt-1" style={{ color: INK_SOFT }}>
          Só o e-mail — sem senha e sem depender do Stripe no cadastro
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: INK_SOFT }}>
            E-mail
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
            style={{ borderColor: PAPER_LINE, color: INK }}
            placeholder="seu@email.com"
            autoComplete="email"
          />
        </div>

        {message && (
          <div
            className="p-3 rounded-xl text-sm font-medium flex items-start gap-2 border"
            style={
              messageType === "error"
                ? { backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" }
                : { backgroundColor: AMBER_BG, borderColor: AMBER_BORDER, color: "#5C4A22" }
            }
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
          className="w-full font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-white text-[15px]"
          style={{ backgroundColor: SEAL }}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Entrando...
            </>
          ) : (
            <>
              Continuar <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-center mt-6" style={{ color: INK_SOFT }}>
        Depois você paga R$ 137 (Pix/cartão) e o gerador libera automaticamente.
      </p>

      <div className="text-center mt-4">
        <a href="/" className="text-xs hover:underline" style={{ color: INK_SOFT }}>
          ← Voltar ao início
        </a>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F3F0E9" }}>
      <Suspense
        fallback={
          <div
            className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full border text-center"
            style={{ borderColor: PAPER_LINE }}
          >
            <Loader2 size={32} className="mx-auto mb-4 animate-spin" style={{ color: SEAL }} />
            <p className="text-sm" style={{ color: INK_SOFT }}>
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
