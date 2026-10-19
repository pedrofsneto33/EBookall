"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "./supabase";

const INK = "#0F1C2E";
const INK_SOFT = "#4A5B6E";
const PAPER_LINE = "#E6E1D6";
const SEAL = "#1B6B4A";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";

function mapAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("failed to fetch") || m.includes("networkerror") || m.includes("fetch")) {
    return "Não foi possível conectar ao servidor de autenticação. Verifique sua internet ou se o Supabase está configurado na Vercel (NEXT_PUBLIC_SUPABASE_URL e ANON_KEY como Plain + Redeploy).";
  }
  if (m.includes("invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }
  if (m.includes("user already registered") || m.includes("already been registered")) {
    return "Este e-mail já tem conta. Faça login.";
  }
  if (m.includes("password") && m.includes("6")) {
    return "A senha precisa ter pelo menos 6 caracteres.";
  }
  if (m.includes("email")) {
    return message;
  }
  return message;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || searchParams.get("next") || "/gerador";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!isSupabaseConfigured) {
      setMessage(
        "Autenticação não configurada: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel como Plain (não Sensitive) e faça Redeploy."
      );
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          setMessage("Erro: " + mapAuthError(error.message));
          setMessageType("error");
          setLoading(false);
          return;
        }

        setMessage("Login realizado! Verificando acesso...");
        setMessageType("success");

        const { data: subscription, error: subError } = await supabase
          .from("subscriptions")
          .select("status")
          .eq("user_id", data.user!.id)
          .maybeSingle();

        if (subError || !subscription || subscription.status !== "active") {
          router.replace(`/pagamento?user_id=${data.user!.id}`);
        } else {
          router.replace(redirect);
        }
      } else {
        if (password.trim().length < 6) {
          setMessage("Erro: a senha precisa ter pelo menos 6 caracteres.");
          setMessageType("error");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          setMessage("Erro: " + mapAuthError(error.message));
          setMessageType("error");
          setLoading(false);
          return;
        }

        // Se confirmação de e-mail estiver desligada no Supabase, já vem session
        if (data.session) {
          setMessage("Conta criada! Redirecionando...");
          setMessageType("success");
          router.replace(`/pagamento?user_id=${data.user!.id}`);
        } else {
          setMessage(
            "Conta criada. Se o projeto exigir confirmação de e-mail, abra o link na caixa de entrada e depois faça login."
          );
          setMessageType("success");
          setIsLogin(true);
          setLoading(false);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro inesperado";
      setMessage("Erro: " + mapAuthError(msg));
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
          {isLogin ? "Entrar" : "Criar conta"}
        </h1>
        <p className="text-sm mt-1" style={{ color: INK_SOFT }}>
          {isLogin ? "Acesse o gerador de petição" : "Cadastro rápido para pagar e gerar"}
        </p>
      </div>

      {!isSupabaseConfigured && (
        <div
          className="mb-4 p-3 rounded-xl text-sm border flex gap-2 items-start"
          style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" }}
        >
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>
            Supabase não está no bundle do site. Na Vercel, as variáveis{" "}
            <code className="text-xs">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
            <code className="text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> precisam ser{" "}
            <strong>Plain</strong> (não Sensitive) e é necessário Redeploy.
          </span>
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
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
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: INK_SOFT }}>
            Senha
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
            style={{ borderColor: PAPER_LINE, color: INK }}
            placeholder="Mínimo 6 caracteres"
            autoComplete={isLogin ? "current-password" : "new-password"}
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
          {loading ? "Processando..." : isLogin ? "Entrar" : "Criar conta"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className="text-center mt-6 pt-5 border-t" style={{ borderColor: PAPER_LINE }}>
        <p className="text-sm" style={{ color: INK_SOFT }}>
          {isLogin ? "Ainda não tem conta?" : "Já tem conta?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            className="font-semibold hover:underline"
            style={{ color: SEAL }}
          >
            {isLogin ? "Criar agora" : "Fazer login"}
          </button>
        </p>
      </div>

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
