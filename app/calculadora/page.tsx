"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Calculator, Shield, Heart, ArrowRight, CheckCircle2, 
  AlertTriangle, Phone, ExternalLink, Home 
} from "lucide-react";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const SEAL = "#8A6D3B";
const SEAL_DARK = "#6B5429";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";
const PAPER = "#FBF9F4";
const GREEN = "#3F6B4A";
const GREEN_BG = "#E8F5E9";

export default function CalculadoraPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    valorPerdido: "",
    fezAutoexclusao: "",
    dividaUrgente: "outros",
    email: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && !formData.valorPerdido) return alert("Por favor, informe um valor estimado.");
    if (step === 2 && !formData.fezAutoexclusao) return alert("Por favor, selecione uma opção.");
    if (step === 3 && !formData.email.includes("@")) return alert("Por favor, informe um e-mail válido para receber seu plano.");
    setStep(step + 1);
  };

  const getDicaDivida = () => {
    switch (formData.dividaUrgente) {
      case "aluguel": return "Priorize quitar o aluguel para garantir sua moradia. O valor que você busca recuperar pode ser a chave para tirar esse peso das suas costas.";
      case "cartao": return "Juros de cartão de crédito corroem qualquer renda. Usar a restituição para quitar essa dívida é a decisão financeira mais inteligente.";
      case "agiota": return "Sua segurança física e mental vem em primeiro lugar. Busque apoio imediato e use qualquer valor recuperado para estancar essa dívida de alto risco.";
      default: return "Organize suas prioridades. Quite primeiro as dívidas que geram juros altos ou que colocam sua segurança em risco.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: PAPER, color: INK }}>
      {/* Header Simples */}
      <header className="border-b px-4 py-4" style={{ backgroundColor: "#FFF", borderColor: "#E4DFD1" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: INK_SOFT }}>
            <Home size={16} /> Voltar para o Início
          </button>
          <div className="flex items-center gap-2">
            <Calculator size={20} style={{ color: SEAL }} />
            <span className="font-bold" style={{ color: INK }}>Calculadora de Dívida Zero</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          
          {/* Barra de Progresso */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex justify-between text-xs font-semibold mb-2" style={{ color: INK_SOFT }}>
                <span>Passo {step} de 3</span>
                <span>{Math.round((step / 3) * 100)}% concluído</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: "#E4DFD1" }}>
                <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%`, backgroundColor: SEAL }}></div>
              </div>
            </div>
          )}

          {/* PASSO 1: Valor */}
          {step === 1 && (
            <div className="p-8 rounded-2xl border-2 shadow-sm" style={{ backgroundColor: "#FFF", borderColor: AMBER_BORDER }}>
              <h2 className="text-2xl font-bold mb-2" style={{ color: INK, fontFamily: "Georgia, serif" }}>Quanto você estima ter perdido?</h2>
              <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Seja honesto consigo mesmo. Esse número nos ajuda a traçar a melhor estratégia para você.</p>
              <label className="block mb-4">
                <span className="text-sm font-medium block mb-2" style={{ color: INK }}>Valor total estimado (R$)</span>
                <input 
                  type="number" 
                  name="valorPerdido" 
                  value={formData.valorPerdido} 
                  onChange={handleChange} 
                  placeholder="Ex: 2500" 
                  className="w-full px-4 py-3 rounded-lg border text-lg outline-none focus:ring-2" 
                  style={{ borderColor: "#E4DFD1", backgroundColor: PAPER }}
                />
              </label>
              <button onClick={handleNext} className="w-full py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: SEAL }}>
                Próximo <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* PASSO 2: Autoexclusão */}
          {step === 2 && (
            <div className="p-8 rounded-2xl border-2 shadow-sm" style={{ backgroundColor: "#FFF", borderColor: AMBER_BORDER }}>
              <h2 className="text-2xl font-bold mb-2" style={{ color: INK, fontFamily: "Georgia, serif" }}>Você chegou a pedir a Autoexclusão no Gov.br?</h2>
              <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Isso é fundamental para saber se a casa de apostas descumpriu a regulamentação.</p>
              <div className="space-y-3 mb-6">
                {["sim", "nao", "nao_sabia"].map((opcao) => (
                  <label key={opcao} className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${formData.fezAutoexclusao === opcao ? "ring-2" : "hover:bg-gray-50"}`} style={{ borderColor: formData.fezAutoexclusao === opcao ? SEAL : "#E4DFD1", backgroundColor: formData.fezAutoexclusao === opcao ? AMBER_BG : "#FFF" }}>
                    <input type="radio" name="fezAutoexclusao" value={opcao} checked={formData.fezAutoexclusao === opcao} onChange={handleChange} className="w-4 h-4" style={{ accentColor: SEAL }} />
                    <span className="text-sm font-medium" style={{ color: INK }}>
                      {opcao === "sim" ? "Sim, fiz o pedido formal." : opcao === "nao" ? "Não, não cheguei a fazer." : "Não sabia que isso existia."}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-lg font-medium border hover:bg-gray-50" style={{ borderColor: "#E4DFD1", color: INK_SOFT }}>Voltar</button>
                <button onClick={handleNext} className="flex-[2] py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: SEAL }}>
                  Próximo <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* PASSO 3: Dívida e Contato */}
          {step === 3 && (
            <div className="p-8 rounded-2xl border-2 shadow-sm" style={{ backgroundColor: "#FFF", borderColor: AMBER_BORDER }}>
              <h2 className="text-2xl font-bold mb-2" style={{ color: INK, fontFamily: "Georgia, serif" }}>Qual é sua dívida mais urgente hoje?</h2>
              <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Vamos personalizar seu plano de ação com base na sua prioridade.</p>
              
              <label className="block mb-4">
                <span className="text-sm font-medium block mb-2" style={{ color: INK }}>Prioridade de pagamento</span>
                <select name="dividaUrgente" value={formData.dividaUrgente} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2" style={{ borderColor: "#E4DFD1", backgroundColor: PAPER }}>
                  <option value="aluguel">Aluguel / Moradia</option>
                  <option value="cartao">Cartão de Crédito / Empréstimo</option>
                  <option value="agiota">Dívida com agiota / Risco físico</option>
                  <option value="outros">Outros (Nome sujo, contas básicas)</option>
                </select>
              </label>

              <label className="block mb-6">
                <span className="text-sm font-medium block mb-2" style={{ color: INK }}>Seu melhor e-mail (para enviar o plano completo)</span>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="seuemail@exemplo.com" 
                  className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2" 
                  style={{ borderColor: "#E4DFD1", backgroundColor: PAPER }}
                />
              </label>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-lg font-medium border hover:bg-gray-50" style={{ borderColor: "#E4DFD1", color: INK_SOFT }}>Voltar</button>
                <button onClick={handleNext} className="flex-[2] py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: GREEN }}>
                  Gerar Meu Plano de Ação <CheckCircle2 size={18} />
                </button>
              </div>
            </div>
          )}

          {/* PASSO 4: Resultado (Plano de Ação) */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: GREEN_BG, border: `2px solid ${GREEN}` }}>
                <CheckCircle2 size={48} className="mx-auto mb-3" style={{ color: GREEN }} />
                <h2 className="text-2xl font-bold mb-2" style={{ color: INK, fontFamily: "Georgia, serif" }}>Seu Plano de Ação Personalizado</h2>
                <p className="text-sm" style={{ color: INK_SOFT }}>Baseado nas suas respostas, aqui está o caminho mais seguro para você retomar o controle.</p>
              </div>

              <div className="p-6 rounded-xl border-2" style={{ backgroundColor: "#FFF", borderColor: "#E4DFD1" }}>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: SEAL }}>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SEAL }}>1</span>
                  Estanque o sangramento (Imediato)
                </h3>
                <p className="text-sm mb-3" style={{ color: INK_SOFT }}>
                  {formData.fezAutoexclusao === "nao" || formData.fezAutoexclusao === "nao_sabia" 
                    ? "Você ainda não fez a autoexclusão. Antes de pensar em dinheiro, proteja sua mente e seu bolso." 
                    : "Ótimo que você já pediu a autoexclusão. Agora, vamos garantir que nenhum app ou site consiga burlar isso."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="https://www.gov.br/autoexclusaoapostas" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-center border hover:bg-gray-50" style={{ borderColor: SEAL, color: SEAL }}>
                    Fazer Autoexclusão no Gov.br
                  </a>
                  <a href="https://gamban.com" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-center text-white hover:opacity-90" style={{ backgroundColor: SEAL }}>
                    Instalar Bloqueador (Gamban)
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-xl border-2" style={{ backgroundColor: "#FFF", borderColor: "#E4DFD1" }}>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: SEAL }}>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SEAL }}>2</span>
                  Organize a Dívida Urgente
                </h3>
                <p className="text-sm mb-3 p-3 rounded-lg" style={{ backgroundColor: AMBER_BG, color: SEAL_DARK }}>
                  <strong>Sua prioridade ({formData.dividaUrgente === "aluguel" ? "Aluguel" : formData.dividaUrgente === "cartao" ? "Cartão de Crédito" : formData.dividaUrgente === "agiota" ? "Agiota" : "Outras dívidas"}):</strong><br/>
                  {getDicaDivida()}
                </p>
                <div className="flex items-start gap-2 text-sm" style={{ color: INK_SOFT }}>
                  <Heart size={16} className="shrink-0 mt-0.5" style={{ color: GREEN }} />
                  <span>Se o peso estiver grande demais, ligue <strong>188 (CVV)</strong> ou procure o CAPS da sua cidade. É gratuito e sigiloso.</span>
                </div>
              </div>

              <div className="p-6 rounded-xl border-2 text-center" style={{ backgroundColor: PAPER, borderColor: AMBER_BORDER }}>
                <h3 className="text-lg font-bold mb-3 flex items-center justify-center gap-2" style={{ color: INK }}>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ backgroundColor: GREEN }}>3</span>
                  Busque o que é seu por direito
                </h3>
                <p className="text-sm mb-4" style={{ color: INK_SOFT }}>
                  Como você mencionou um valor estimado de <strong>R$ {Number(formData.valorPerdido).toLocaleString("pt-BR")}</strong> e um cenário de {formData.fezAutoexclusao === "sim" ? "autoexclusão ignorada" : "falta de controle"}, você se encaixa no perfil de quem pode buscar a restituição via Juizado Especial, sem precisar de advogado.
                </p>
                <div className="p-4 rounded-lg mb-4 text-left text-xs" style={{ backgroundColor: "#FFF", border: `1px solid ${AMBER_BORDER}` }}>
                  <strong>⚠️ Transparência:</strong> O RecuperaJogo usa tecnologia apenas para formatar sua petição com base em fatos reais e estratégias jurídicas que já funcionaram. Não é uma petição genérica de robô.
                </div>
                <a href="/login" className="block w-full py-4 rounded-xl text-white text-lg font-bold transition-all hover:scale-105 hover:shadow-lg" style={{ backgroundColor: SEAL }}>
                  Quero montar minha petição agora (R$ 137)
                </a>
                <p className="text-xs mt-3" style={{ color: INK_SOFT }}>Enviamos uma cópia deste plano para {formData.email || "seu e-mail"}.</p>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}