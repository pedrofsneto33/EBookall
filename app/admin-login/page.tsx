"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const res = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao fazer login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05080C] text-white p-4">
      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-[#05080C] text-sm font-black bg-emerald-500">
            RJ
          </div>
          <h1 className="text-2xl font-bold">Acesso Administrativo</h1>
          <p className="text-sm text-white/60 mt-1">Área restrita ao administrador.</p>
        </div>

        {error && (
          <p className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5 text-white/60">E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white outline-none focus:border-emerald-500" 
              placeholder="seu@email.com"
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-white/60">Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white outline-none focus:border-emerald-500" 
              placeholder="••••••••"
              required 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full mt-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#05080C] font-bold transition-colors disabled:opacity-70"
        >
          {loading ? "Verificando..." : "Entrar no Painel"}
        </button>
      </form>
    </div>
  );
}