"use client";

import { useState, useEffect } from "react";
import { supabase } from "../login/supabase";

export default function Dashboard() {
  const [tema, setTema] = useState("");
  const [tom, setTom] = useState("profissional");
  const [capitulos, setCapitulos] = useState(5);
  const [gerando, setGerando] = useState(false);
  const [ebookGerado, setEbookGerado] = useState<any>(null);
  const [erro, setErro] = useState("");
  
  const [userEmail, setUserEmail] = useState("Carregando...");
  const [userId, setUserId] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  
  const [creditos, setCreditos] = useState(0);
  const [plano, setPlano] = useState("Grátis");
  const [ebooksCriados, setEbooksCriados] = useState(0);
  const [statusAssinatura, setStatusAssinatura] = useState("inactive");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = "/login";
        return;
      }

      const email = session.user.email || "Usuário";
      const id = session.user.id;
      setUserEmail(email);
      setUserId(id);
      
      // 1. Buscar créditos
      const { data: creditsData, error: creditsError } = await supabase
        .from('credits')
        .select('balance, total_spent, total_earned')
        .eq('user_id', id)
        .maybeSingle();
      
      if (creditsError) {
        console.error('Erro ao buscar créditos:', creditsError);
      }
      
      if (creditsData) {
        setCreditos(creditsData.balance || 0);
        setEbooksCriados(creditsData.total_spent || 0);
      } else {
        console.log('Criando registro de créditos para o usuário...');
        await supabase
          .from('credits')
          .insert({ user_id: id, balance: 0, total_earned: 0, total_spent: 0 });
        setCreditos(0);
        setEbooksCriados(0);
      }
      
      // 2. Buscar assinatura com JOIN para pegar o nome do plano
      const { data: subscriptionData } = await supabase
        .from('subscriptions')
        .select(`
          status,
          subscription_plans (
            name,
            ebooks_per_month
          )
        `)
        .eq('user_id', id)
        .eq('status', 'active')
        .maybeSingle();
      
      // ✅ CORREÇÃO: subscription_plans vem como ARRAY, usa [0] para acessar
      if (subscriptionData && subscriptionData.subscription_plans?.[0]) {
        setStatusAssinatura(subscriptionData.status);
        setPlano(subscriptionData.subscription_plans[0].name);
      } else {
        setPlano("Grátis");
        setStatusAssinatura("inactive");
      }
      
      setLoadingUser(false);
    };

    checkUser();
  }, []);

  const gerarEbook = async () => {
    if (!tema.trim()) {
      setErro("Por favor, digite um tema para o ebook!");
      return;
    }

    if (creditos <= 0) {
      setErro("Você não tem créditos suficientes! Assine um plano para continuar.");
      return;
    }

    setGerando(true);
    setErro("");
    setEbookGerado(null);

    try {
      const response = await fetch('/api/generate-ebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema, tom, capitulos }),
      });

      const data = await response.json();

      if (data.success) {
        setEbookGerado(data.ebook);
        
        // Atualizar créditos no Supabase
        const novosCreditos = creditos - 1;
        const novosEbooks = ebooksCriados + 1;
        setCreditos(novosCreditos);
        setEbooksCriados(novosEbooks);
        
        const { error } = await supabase
          .from('credits')
          .update({ 
            balance: novosCreditos,
            total_spent: novosEbooks,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);
        
        if (error) {
          console.error('Erro ao atualizar créditos:', error);
        }
      } else {
        setErro(data.error || "Erro ao gerar ebook.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setGerando(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-purple-600 font-semibold text-lg">Carregando painel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            E
          </div>
          <span className="font-bold text-2xl text-gray-900">
            Ebook<span className="text-purple-600">al</span>
          </span>
        </div>

        <nav className="space-y-2">
          {[
            { icon: "", label: "Dashboard", ativo: true },
            { icon: "✨", label: "Criar Ebook", ativo: false },
            { icon: "📚", label: "Meus Ebooks", ativo: false },
            { icon: "💰", label: "Créditos", ativo: false },
            { icon: "⚙️", label: "Configurações", ativo: false },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                item.ativo
                  ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 p-4 bg-gradient-to-br from-purple-100 to-orange-100 rounded-xl">
          <div className="text-sm text-gray-600 mb-1">Créditos disponíveis</div>
          <div className="text-3xl font-bold text-purple-600">{creditos}</div>
          <a href="/precos" className="block mt-3 w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition text-center">
            Comprar mais
          </a>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta! 👋</h1>
            <p className="text-gray-600">O que vamos criar hoje?</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-900 truncate max-w-[200px]" title={userEmail}>
                {userEmail}
              </div>
              <div className="text-sm text-purple-600 font-medium">
                Plano {plano} {statusAssinatura === 'active' && '✓'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Ebooks Criados", valor: ebooksCriados.toString(), cor: "from-purple-500 to-purple-600" },
            { label: "Créditos Restantes", valor: creditos.toString(), cor: "from-orange-500 to-orange-600" },
            { label: "Plano Atual", valor: plano, cor: "from-pink-500 to-pink-600" },
            { label: "Status", valor: statusAssinatura === 'active' ? "Ativo ✓" : "Inativo", cor: statusAssinatura === 'active' ? "from-green-500 to-green-600" : "from-gray-400 to-gray-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.cor} bg-clip-text text-transparent`}>
                {stat.valor}
              </div>
            </div>
          ))}
        </div>

        {/* Criar Novo Ebook */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Criar Novo Ebook</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tema do seu ebook</label>
              <input
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Ex: Como investir em criptomoedas em 2026"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tom de voz</label>
                <select
                  value={tom}
                  onChange={(e) => setTom(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="profissional">Profissional</option>
                  <option value="descontraido">Descontraído</option>
                  <option value="academico">Acadêmico</option>
                  <option value="motivacional">Motivacional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de capítulos</label>
                <input
                  type="number"
                  value={capitulos}
                  onChange={(e) => setCapitulos(Number(e.target.value))}
                  min={3}
                  max={20}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {erro}
              </div>
            )}

            <button
              onClick={gerarEbook}
              disabled={gerando || creditos <= 0}
              className={`w-full font-bold py-4 rounded-lg transition transform ${
                gerando || creditos <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-orange-500 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] text-white"
              }`}
            >
              {gerando ? "⏳ Gerando ebook..." : creditos <= 0 ? "🚫 Sem créditos" : `🚀 Gerar Ebook com IA (1 crédito)`}
            </button>
            
            {creditos <= 0 && (
              <p className="text-center text-red-600 text-sm mt-2">
                Você precisa de créditos para gerar ebooks. <a href="/precos" className="underline font-semibold">Assine um plano →</a>
              </p>
            )}
          </div>
        </div>

        {/* Ebook Gerado */}
        {ebookGerado && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-green-600 mb-6">✅ Ebook Gerado com Sucesso!</h2>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-purple-600 mb-2">{ebookGerado.tema}</h3>
            </div>
            <div className="space-y-6">
              {ebookGerado.capitulos.map((cap: any, index: number) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    Capítulo {index + 1}: {cap.titulo.replace(/^\d+\.\s*/, '')}
                  </h4>
                  <div className="text-gray-700 whitespace-pre-line text-sm">
                    {cap.conteudo}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg transition">
               Baixar em PDF (Em breve)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}