import React from "react";
import { Scale, Shield, FileText, Calculator, CheckCircle2, AlertTriangle, BookOpen, ArrowRight } from "lucide-react";

// Paleta "Cartório" (Mesma do gerador para manter consistência e autoridade)
const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";

export default function Home() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: PAPER, color: INK }}>
      
      {/* HEADER / NAV */}
      <header className="border-b" style={{ borderColor: "#E4DFD1" }}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale size={24} style={{ color: SEAL }} />
            <span className="text-xl font-semibold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              RecuperaJogo<span style={{ color: SEAL }}>.</span>
            </span>
          </div>
          <a 
            href="/login" 
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: INK, color: "#FFF" }}
          >
            Acessar Sistema
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6" style={{ backgroundColor: AMBER_BG, color: "#5C4A22" }}>
          <Shield size={14} />
          <span>Baseado na regulamentação oficial da SPA/MF</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
          A casa de apostas aceitou seu depósito <br className="hidden md:block" />
          <span style={{ color: SEAL }}>mesmo após sua autoexclusão?</span>
        </h1>
        
        <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
          Use a lei a seu favor. Gere uma petição completa, formatada e com argumentos blindados para o Juizado Especial Cível (até 20 salários mínimos) — sem precisar de advogado.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* BOTÃO PRINCIPAL COM SEU LINK DO STRIPE */}
          <a 
            href="https://buy.stripe.com/test_bJe4gB2E070z2o18jJ9R601" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-lg transition-transform hover:scale-105"
            style={{ backgroundColor: SEAL, color: "#FFF" }}
          >
            Gerar Minha Petição Agora <ArrowRight size={18} />
          </a>
          
          <a 
            href="/guia" 
            className="inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-lg border transition-colors hover:bg-white"
            style={{ borderColor: "#E4DFD1", color: INK }}
          >
            <BookOpen size={18} /> Guia Grátis de Autoexclusão
          </a>
        </div>
        
        {/* ANCORAGEM DE PREÇO */}
        <p className="text-xs mt-4 font-medium" style={{ color: INK_SOFT }}>
          💰 Investimento único de <strong>R$ 137,00</strong> — menos do que você perdeu na última aposta.
        </p>

        <p className="text-xs mt-6 flex items-center justify-center gap-1" style={{ color: INK_SOFT }}>
          <AlertTriangle size={12} /> Ferramenta para jus postulandi (causas de até 20 salários mínimos).
        </p>
      </section>

      {/* PROBLEMA VS SOLUÇÃO */}
      <section className="border-y py-16" style={{ borderColor: "#E4DFD1", backgroundColor: "#F2EFE6" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Georgia, serif" }}>Por que as casas de apostas ganham no "braço"?</h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
              Elas usam respostas automáticas citando um suposto "prazo de adaptação de 90 dias". Mas a própria Secretaria de Prêmios e Apostas (SPA/MF) já desmentiu isso oficialmente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: FileText, 
                title: "Argumentos Oficiais", 
                desc: "Nossa ferramenta usa os textos exatos da IN SPA/MF nº 31/2025 e da Nota Informativa SEI nº 1864/2026." 
              },
              { 
                icon: Calculator, 
                title: "Cálculo Blindado", 
                desc: "Calculadora com trava de 20 salários mínimos, juros de mora e opção de restituição em dobro (art. 42 CDC)." 
              },
              { 
                icon: CheckCircle2, 
                title: "PDF Forense", 
                desc: "Baixe sua petição em PDF com margens, fonte Times New Roman e formatação pronta para o PJe." 
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border bg-white" style={{ borderColor: "#E4DFD1" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: AMBER_BG }}>
                  <item.icon size={20} style={{ color: SEAL }} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: INK_SOFT }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-center mb-12" style={{ fontFamily: "Georgia, serif" }}>Como funciona o Gerador</h2>
        <div className="space-y-8">
          {[
            { n: "01", t: "Roteiro Pré-Processual", d: "O sistema te guia para tentar o estorno administrativo (Chat e Consumidor.gov). Isso gera provas de 'Desvio Produtivo'." },
            { n: "02", t: "Checklist de Provas", d: "Você marca quais documentos tem (Print da autoexclusão, extrato, e-mail de bloqueio). O sistema adapta os argumentos." },
            { n: "03", t: "Calculadora JEC", d: "Informe o valor perdido. O sistema calcula o dobro, juros e dano moral, e avisa se ultrapassar o limite de 20 salários mínimos." },
            { n: "04", t: "Geração do PDF", d: "Sua petição é montada com os argumentos universais e condicionais, pronta para baixar e protocolar." }
          ].map((step, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="text-3xl font-bold shrink-0" style={{ color: SEAL, fontFamily: "Georgia, serif" }}>{step.n}</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{step.t}</h3>
                <p className="text-sm" style={{ color: INK_SOFT }}>{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-12 text-center" style={{ borderColor: "#E4DFD1", backgroundColor: "#F2EFE6" }}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scale size={20} style={{ color: SEAL }} />
            <span className="font-semibold" style={{ fontFamily: "Georgia, serif" }}>RecuperaJogo</span>
          </div>
          <p className="text-xs mb-6 max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
            <strong>Aviso Legal:</strong> Esta plataforma não é um escritório de advocacia e não oferece assessoria jurídica personalizada. 
            Trata-se de uma ferramenta de automação de redação para auxiliar cidadãos no exercício do jus postulandi (Lei 9.099/95). 
            Revise sempre o documento gerado antes de protocolar.
          </p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            © {new Date().getFullYear()} RecuperaJogo. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}