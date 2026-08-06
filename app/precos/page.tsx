"use client";

import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState<string>("");

  const handleCheckout = async (plano: string) => {
    setLoading(plano);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plano }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erro ao criar checkout. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setLoading("");
    }
  };

  const planos = [
    {
      nome: "Grátis",
      preco: "R$ 0",
      periodo: "/mês",
      descricao: "Para começar a criar",
      beneficios: [
        "3 ebooks por mês",
        "Modelos básicos de IA",
        "Suporte por email",
        "Exportação em PDF",
      ],
      cta: "Começar Grátis",
      destaque: false,
      plano: null,
    },
    {
      nome: "Pro",
      preco: "R$ 29",
      periodo: "/mês",
      descricao: "Para profissionais",
      beneficios: [
        "30 ebooks por mês",
        "Modelos avançados de IA",
        "Suporte prioritário",
        "Exportação em PDF e Word",
        "Templates personalizados",
        "Histórico ilimitado",
      ],
      cta: "Assinar Pro",
      destaque: true,
      plano: "pro",
    },
    {
      nome: "Business",
      preco: "R$ 79",
      periodo: "/mês",
      descricao: "Para empresas e agências",
      beneficios: [
        "100 ebooks por mês",
        "Todos os modelos de IA",
        "Suporte VIP 24/7",
        "API de acesso",
        "White label",
        "Relatórios avançados",
        "Múltiplos usuários",
      ],
      cta: "Assinar Business",
      destaque: false,
      plano: "business",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                E
              </div>
              <span className="font-bold text-2xl text-gray-900">
                Ebook<span className="text-purple-600">al</span>
              </span>
            </div>
            <a
              href="/gerador"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Voltar ao Dashboard →
            </a>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Título */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Escolha o plano{" "}
            <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              perfeito para você
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece grátis e evolua conforme sua necessidade. Todos os planos
            incluem garantia de 7 dias.
          </p>
        </div>

        {/* Cards de Preço */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {planos.map((plano, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 ${
                plano.destaque
                  ? "border-purple-600 bg-white shadow-2xl shadow-purple-500/20 scale-105"
                  : "border-gray-200 bg-white shadow-lg"
              } p-8 transition hover:shadow-xl`}
            >
              {plano.destaque && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plano.nome}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{plano.descricao}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">
                    {plano.preco}
                  </span>
                  <span className="text-gray-500">{plano.periodo}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plano.beneficios.map((beneficio, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>

              {plano.plano ? (
                <button
                  onClick={() => handleCheckout(plano.plano)}
                  disabled={loading === plano.plano}
                  className={`w-full font-bold py-3 rounded-lg transition ${
                    plano.destaque
                      ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:shadow-lg hover:scale-105"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  } ${loading === plano.plano ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading === plano.plano ? "Processando..." : plano.cta}
                </button>
              ) : (
                <a
                  href="/gerador"
                  className="block w-full text-center font-bold py-3 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition"
                >
                  {plano.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Garantia */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="font-medium">
              Garantia de 7 dias ou seu dinheiro de volta
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}