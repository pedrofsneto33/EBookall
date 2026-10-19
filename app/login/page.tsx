"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "./supabase"; 

const INK = "#0F1C2E";
const INK_SOFT = "#4A5B6E";
const PAPER = "#FAF8F4";
const PAPER_LINE = "#E6E1D6";
const SEAL = "#1B6B4A";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/gerador";
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });
      
      if (error) {
        console.error("Erro no login:", error.message);
        setMessage("Erro: " + (error.message === "Invalid login credentials" ? "E-mail ou senha incorretos." : error.message));
        setMessageType("error");
        setLoading(false);
      } else {
        setMessage("Login realizado! Verificando acesso...");
        setMessageType("success");
        
        console.log("Login OK. User ID:", data.user.id);
        
        const { data: subscription, error: subError } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('user_id', data.user.id)
          .single();

        if (subError || !subscription || subscription.status !== 'active') {
          router.replace(`/pagamento?user_id=${data.user.id}`);
        } else {
          router.replace(redirect);
        }
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
      });
      
      if (error) {
        console.error("Erro no cadastro:", error.message);
        setMessage("Erro: " + error.message);
        setMessageType("error");
        setLoading(false);
      } else {
        setMessage("Conta criada! Confirme o e-mail e faça login.");
        setMessageType("success");
        setIsLogin(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full border" style={{ borderColor: PAPER_LINE }}>
      <div className="flex flex-col items-center mb-8">
        <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 text-white text-sm font-bold tracking-tight" style={{ backgroundColor: SEAL }}>
          RJ
        </div>
        <h1 className="text-xl font-bold text-center" style={{ color: INK }}>
          RecuperaJogo
        </h1>
        <p className="text-sm text-center mt-1" style={{ color: INK_SOFT }}>
          {isLogin ? "Entre e gere sua petição" : "Crie sua conta para começar"}
        </p>
      </div>
      
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: INK_SOFT }}>E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all text-sm"
            style={{ borderColor: PAPER_LINE, backgroundColor: PAPER, color: INK }}
            placeholder="seu@email.com"
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: INK_SOFT }}>Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all text-sm"
            style={{ borderColor: PAPER_LINE, backgroundColor: PAPER, color: INK }}
            placeholder="••••••••"
            required 
          />
        </div>
        
        {message && (
          <div className="p-3 rounded-xl text-sm font-medium flex items-start gap-2 border"
               style={messageType === "error" 
                 ? { backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" } 
                 : { backgroundColor: AMBER_BG, borderColor: AMBER_BORDER, color: "#5C4A22" }
               }>
            {messageType === "error" ? <AlertCircle size={18} className="shrink-0 mt-0.5" /> : <CheckCircle2 size={18} className="shrink-0 mt-0.5" />}
            <span>{message}</span>
            {loading && messageType === "success" && <Loader2 size={16} className="animate-spin ml-1" />}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-white text-[15px]"
          style={{ backgroundColor: SEAL }}
        >
          {loading ? "Processando..." : (isLogin ? "Entrar" : "Criar conta")}
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
      <Suspense fallback={
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full border text-center" style={{ borderColor: PAPER_LINE }}>
          <Loader2 size={32} className="mx-auto mb-4 animate-spin" style={{ color: SEAL }} />
          <p className="text-sm" style={{ color: INK_SOFT }}>Carregando...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
