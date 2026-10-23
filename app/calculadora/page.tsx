"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator, Heart, ArrowRight, CheckCircle2, Home, AlertTriangle } from "lucide-react";
import { LIMITE_JUS_POSTULANDI, formatarMoeda } from "../lib/config";

const INK = "#0F1C2E";
const INK_SOFT = "#4A5B6E";
const SEAL = "#1B6B4A";
const SEAL_DARK = "#155A3E";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";
const PAPER = "#FAF8F4";
const GREEN = "#1B6B4A";
const GREEN_BG = "#E8F5EF";
const LINE = "#E6E1D6";

export default function CalculadoraPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    valorPerdido: "",
    fezAutoexclusao: "",
    dividaUrgente: "outros",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && !formData.valorPerdido) return alert("Informe um valor estimado.");
    if (step === 2 && !formData.fezAutoexclusao) return alert("Selecione uma opção.");
    if (step === 3 && !formData.email.includes("@")) return alert("Informe um e-mail válido.");
    setStep(step + 1);
  };

  const valorNum = Number(formData.valorPerdido || 0);
  const acimaLimite = valorNum > LIMITE_JUS_POSTULANDI;

  const getDicaDivida = () => {
    switch (formData.dividaUrgente) {
      case "aluguel": return "Priorize o aluguel. O valor recuperado pode aliviar essa pressão.";
      case "cartao": return "Juros de cartão corroem a renda. Quite essa dívida primeiro, se possível.";
      case "agiota": return "Segurança em primeiro lugar. Busque apoio e estanque a dívida de alto risco.";
      default: return "Organize prioridades: juros altos e risco à segurança vêm primeiro.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: PAPER, color: INK }}>
      <header className="border-b px-4 py-4" style={{ backgroundColor: "#FFF", borderColor: LINE }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: INK_SOFT }}>
            <Home size={16} /> Início
          </button>
          <div className="flex items-center gap-2">
            <Calculator size={18} style={{ color: SEAL }} />
            <span className="font-semibold text-sm" style={{ color: INK }}>Calculadora</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {step < 4 && (
            <div className="mb-8">
              <div className="flex justify-between text-xs font-semibold mb-2" style={{ color: INK_SOFT }}>
                <span>Passo {step} de 3</span>
                <span>{Math.round((step / 3) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: LINE }}>
                <div className="h-2 rounded-full transition-all" style={{ width: `${(step / 3) * 100}%`, backgroundColor: SEAL }} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="p-8 rounded-2xl border shadow-sm" style={{ backgroundColor: "#FFF", borderColor: LINE }}>
              <h2 className="text-2xl font-bold mb-2" style={{ color: INK }}>Quanto você estima ter perdido?</h2>
              <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Esse número ajuda a traçar a estratégia.</p>
              <label className="block mb-4">
                <span className="text-sm font-medium block mb-2" style={{ color: INK }}>Valor estimado (R$)</span>
                <input type="number" name="valorPerdido" value={formData.valorPerdido} onChange={handleChange} placeholder="Ex: 2500" className="w-full px-4 py-3 rounded-xl border text-lg outline-none" style={{ borderColor: LINE, backgroundColor: PAPER }} />
              </label>
              {acimaLimite && (
                <div className="mb-4 flex gap-2 items-start rounded-xl border px-4 py-3 bg-red-50 border-red-200">
                  <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-600" />
                  <p className="text-sm text-red-700">
                    Atenção: O valor ultrapassou o limite de {formatarMoeda(LIMITE_JUS_POSTULANDI)}. Para causas acima disso, você precisará de um advogado ou da Defensoria Pública.
                  </p>
                </div>
              )}
              <button onClick={handleNext} className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2" style={{ backgroundColor: SEAL }}>
                Próximo <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="p-8 rounded-2xl border shadow-sm" style={{ backgroundColor: "#FFF", borderColor: LINE }}>
              <h2 className="text-2xl font-bold mb-2" style={{ color: INK }}>Fez autoexclusão no Gov.br?</h2>
              <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Importa para saber se a casa descumpriu a regra.</p>
              <div className="space-y-3 mb-6">
                {[
                  ["sim", "Sim, fiz o pedido formal."],
                  ["nao", "Não cheguei a fazer."],
                  ["nao_sabia", "Não sabia que existia."],
                ].map(([opcao, label]) => (
                  <label key={opcao} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer ${formData.fezAutoexclusao === opcao ? "ring-2" : ""}`} style={{ borderColor: formData.fezAutoexclusao === opcao ? SEAL : LINE, backgroundColor: formData.fezAutoexclusao === opcao ? AMBER_BG : "#FFF" }}>
                    <input type="radio" name="fezAutoexclusao" value={opcao} checked={formData.fezAutoexclusao === opcao} onChange={handleChange} className="w-4 h-4" style={{ accentColor: SEAL }} />
                    <span className="text-sm font-medium" style={{ color: INK }}>{label}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-medium border" style={{ borderColor: LINE, color: INK_SOFT }}>Voltar</button>
                <button onClick={handleNext} className="flex-[2] py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2" style={{ backgroundColor: SEAL }}>
                  Próximo <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-8 rounded-2xl border shadow-sm" style={{ backgroundColor: "#FFF", borderColor: LINE }}>
              <h2 className="text-2xl font-bold mb-2" style={{ color: INK }}>Qual dívida é mais urgente?</h2>
              <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Personalizamos o plano com base nisso.</p>
              <label className="block mb-4">
                <span className="text-sm font-medium block mb-2" style={{ color: INK }}>Prioridade</span>
                <select name="dividaUrgente" value={formData.dividaUrgente} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border outline-none" style={{ borderColor: LINE, backgroundColor: PAPER }}>
                  <option value="aluguel">Aluguel / Moradia</option>
                  <option value="cartao">Cartão / Empréstimo</option>
                  <option value="agiota">Agiota / Risco físico</option>
                  <option value="outros">Outros</option>
                </select>
              </label>
              <label className="block mb-6">
                <span className="text-sm font-medium block mb-2" style={{ color: INK }}>E-mail para o plano</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className="w-full px-4 py-3 rounded-xl border outline-none" style={{ borderColor: LINE, backgroundColor: PAPER }} />
              </label>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl font-medium border" style={{ borderColor: LINE, color: INK_SOFT }}>Voltar</button>
                <button onClick={handleNext} className="flex-[2] py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2" style={{ backgroundColor: SEAL }}>
                  Gerar plano <CheckCircle2 size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: GREEN_BG, border: `2px solid ${GREEN}` }}>
                <CheckCircle2 size={40} className="mx-auto mb-3" style={{ color: GREEN }} />
                <h2 className="text-2xl font-bold mb-2" style={{ color: INK }}>Seu plano de ação</h2>
                <p className="text-sm" style={{ color: INK_SOFT }}>Caminho objetivo para retomar o controle.</p>
              </div>

              <div className="p-6 rounded-xl border" style={{ backgroundColor: "#FFF", borderColor: LINE }}>
                <h3 className="font-bold mb-2" style={{ color: SEAL }}>1. Estanque o sangramento</h3>
                <p className="text-sm mb-3" style={{ color: INK_SOFT }}>
                  {formData.fezAutoexclusao === "sim"
                    ? "Você já pediu autoexclusão. Reforce o bloqueio no aparelho."
                    : "Faça a autoexclusão no Gov.br e bloqueie apps/sites."}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a href="https://www.gov.br/autoexclusaoapostas" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-4 rounded-xl text-sm font-semibold text-center border" style={{ borderColor: SEAL, color: SEAL }}>Autoexclusão Gov.br</a>
                  <a href="https://gamban.com" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-4 rounded-xl text-sm font-semibold text-center text-white" style={{ backgroundColor: SEAL }}>Bloqueador Gamban</a>
                </div>
              </div>

              <div className="p-6 rounded-xl border" style={{ backgroundColor: "#FFF", borderColor: LINE }}>
                <h3 className="font-bold mb-2" style={{ color: SEAL }}>2. Dívida urgente</h3>
                <p className="text-sm mb-3 p-3 rounded-xl" style={{ backgroundColor: AMBER_BG, color: SEAL_DARK }}>{getDicaDivida()}</p>
                <p className="text-sm flex items-start gap-2" style={{ color: INK_SOFT }}>
                  <Heart size={16} className="shrink-0 mt-0.5" style={{ color: GREEN }} />
                  CVV 188 ou CAPS — gratuito e sigiloso.
                </p>
              </div>

              {acimaLimite && (
                <div className="flex gap-2 items-start rounded-xl border px-4 py-3 bg-red-50 border-red-200">
                  <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-600" />
                  <p className="text-sm text-red-700">
                    Atenção: O valor ultrapassou o limite de {formatarMoeda(LIMITE_JUS_POSTULANDI)}. Para causas acima disso, você precisará de um advogado ou da Defensoria Pública.
                  </p>
                </div>
              )}

              <div className="p-6 rounded-xl border text-center" style={{ backgroundColor: PAPER, borderColor: AMBER_BORDER }}>
                <h3 className="font-bold mb-3" style={{ color: INK }}>3. Busque o que é seu</h3>
                <p className="text-sm mb-4" style={{ color: INK_SOFT }}>
                  Valor estimado <strong>R$ {Number(formData.valorPerdido || 0).toLocaleString("pt-BR")}</strong>
                  {formData.fezAutoexclusao === "sim" ? " · autoexclusão" : ""}. Perfil para Juizado Especial (jus postulandi).
                </p>
                <a href="/login" className="block w-full py-3.5 rounded-xl text-white text-[15px] font-semibold" style={{ backgroundColor: SEAL }}>
                  Gerar minha petição · R$ 137
                </a>
                <p className="text-xs mt-3" style={{ color: INK_SOFT }}>Plano também em {formData.email || "seu e-mail"}.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
