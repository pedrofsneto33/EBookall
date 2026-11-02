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

// Definimos o e-mail do admin diretamente aqui para evitar imports que quebram o Client Component
const ADMIN_EMAIL = "pedrofsneto33@gmail.com";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Nunca manda direto pro gerador após login — só /pagamento (ou gerador se já pagou)
  const redirectAfterPay = searchParams.get("redirect") || searchParams.get("next") || "/gerador";

  // Define mensagens do cabeçalho com base no contexto de redirecionamento
  let pageTitle = "Acesse sua conta";
  let pageSubtitle = "Entre para gerar sua petição.";
  if (redirectAfterPay.includes("/afiliados")) {
    pageTitle = "Acesse seu Painel de Afiliado";
    pageSubtitle = "Entre para pegar seu link exclusivo e acompanhar suas comissões.";
  } else if (redirectAfterPay.includes("/admin")) {
    pageTitle = "Acesso Administrativo";
    pageSubtitle = "Entre com seu e-mail de administrador para gerenciar o sistema.";
  } else if (redirectAfterPay.includes("/gerador")) {
    pageTitle = "Acesse sua conta";
    pageSubtitle = "Entre para gerar sua petição.";
  }

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

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const d = await res.json();
        if (d?.status === "active" && d?.user?.email) {
          // Verifica se é admin fazendo a comparação direta
          if (d.user.email === ADMIN_EMAIL) {
            router.replace("/admin/dashboard");
          } else {
            router.replace("/gerador");
          }
        } else {
          const affRes = await fetch("/api/affiliates/me", {
            method: "GET",
            credentials: "include",
          });
          if (affRes.ok) {
            router.replace("/afiliados");
          } else {
            router.replace("/pagamento");
          }
        }
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 429 || res.status === 503) {
        setMessage("Erro: " + (data.error || "Serviço indisponível. Tente novamente mais tarde."));
        setMessageType("error");
        return;
      }

      if (!res.ok) {
        setMessage("Erro: " + (data.error || "Falha ao enviar o link"));
        setMessageType("error");
        return;
      }

      setMessage("Link enviado! Ao clicar nele, você ficará logado por 30 dias. Verifique seu e-mail e o spam.");
      setMessageType("success");
      return;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro de rede";
      setMessage("Erro: " + msg);
      setMessageType("error");
    } finally {
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
          {pageTitle}
        </h1>
        <p className="text-sm mt-1 text-white/60">
          {pageSubtitle}
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
              Entrar <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-center mt-2 text-emerald-400/80"><strong>Dica:</strong> Ao clicar no link enviado por e-mail, você ficará logado por 30 dias neste dispositivo.</p>

      <p className="text-xs text-center mt-6 text-white/60">
        O gerador só abre depois do pagamento.
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