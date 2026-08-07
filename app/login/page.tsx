"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scale, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

// Se o seu arquivo supabase.ts estiver na pasta 'app', mude para "../supabase"
import { supabase } from "./supabase"; 

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const PAPER_LINE = "#E4DFD1";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";

export default function Login() {
  const router = useRouter();
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

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage("Erro: " + error.message);
        setMessageType("error");
        setLoading(false);
      } else {
        setMessage("Login realizado! Redirecionando...");
        setMessageType("success");
        setTimeout(() => router.replace("/gerador"), 500);
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage("Erro: " + error.message);
        setMessageType("error");
        setLoading(false);
      } else {
        setMessage("Conta criada! Verifique seu e-mail.");
        setMessageType("success");
        setIsLogin(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F2EFE6" }}>
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border" style={{ borderColor: PAPER_LINE }}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: AMBER_BG }}>
            <Scale size={24} style={{ color: SEAL }} />
          </div>
          <h1 className="text-2xl font-bold text-center" style={{ color: INK, fontFamily: "Georgia, serif" }}>
            RecuperaJogo
          </h1>
          <p className="text-sm text-center mt-1" style={{ color: INK_SOFT }}>
            {isLogin ? "Acesse sua área para gerar sua petição" : "Crie sua conta para começar"}
          </p>
        </div>
        
        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: INK_SOFT }}>E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => {
                console.log("✅ Tecla pressionada:", e.target.value); // DEBUG
                setEmail(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 transition-all"
              style={{ borderColor: PAPER_LINE, backgroundColor: PAPER }}
              placeholder="seu@email.com"
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: INK_SOFT }}>Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 transition-all"
              style={{ borderColor: PAPER_LINE, backgroundColor: PAPER }}
              placeholder="••••••••"
              required 
            />
          </div>
          
          {message && (
            <div className="p-3 rounded-lg text-sm font-medium flex items-start gap-2"
                 style={messageType === "error" 
                   ? { backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" } 
                   : { backgroundColor: AMBER_BG, borderColor: AMBER_BORDER, color: "#5C4A22" }
                 }>
              {messageType === "error" ? <AlertCircle size={18} className="shrink-0 mt-0.5" /> : <CheckCircle2 size={18} className="shrink-0 mt-0.5" />}
              <span>{message}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90"
            style={{ backgroundColor: SEAL, color: "#FFF" }}
          >
            {loading ? "Processando..." : (isLogin ? "Entrar no Sistema" : "Criar Conta Gratuita")}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t" style={{ borderColor: PAPER_LINE }}>
          <p className="text-sm" style={{ color: INK_SOFT }}>
            {isLogin ? "Ainda não tem uma conta?" : "Já possui uma conta?"}{" "}
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setMessage(""); }}
              className="font-semibold hover:underline transition-colors"
              style={{ color: SEAL }}
            >
              {isLogin ? "Crie agora" : "Faça login"}
            </button>
          </p>
        </div>

        <div className="text-center mt-4">
          <a href="/" className="text-xs flex items-center justify-center gap-1 hover:underline" style={{ color: INK_SOFT }}>
            ← Voltar para a página inicial
          </a>
        </div>
      </div>
    </div>
  );
}