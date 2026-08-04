"use client";

import { useState } from "react";
// Caminho ajustado: assumindo que a pasta "lib" está dentro da pasta "app"
import { supabase } from "./supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isLogin) {
      // Fazer Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMessage("Erro: " + error.message);
      else window.location.href = "/dashboard";
    } else {
      // Criar Conta
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) setMessage("Erro: " + error.message);
      else setMessage("Conta criada com sucesso! Você já pode fazer login.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          {isLogin ? "Bem-vindo de volta!" : "Criar sua conta"}
        </h1>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="seu@email.com"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="••••••••"
              required 
            />
          </div>
          
          {message && (
            <div className={`p-3 rounded-lg text-sm font-medium ${message.includes("Erro") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors mt-2"
          >
            {loading ? "Aguarde..." : (isLogin ? "Entrar" : "Criar Conta")}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-600">
          {isLogin ? "Ainda não tem conta?" : "Já possui uma conta?"}{" "}
          <button 
            type="button"
            onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
            }}
            className="text-orange-500 font-semibold hover:underline"
          >
            {isLogin ? "Crie agora" : "Faça login"}
          </button>
        </p>
      </div>
    </div>
  );
}