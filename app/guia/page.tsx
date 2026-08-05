import React from "react";
import { Shield, CheckCircle2, AlertTriangle, ExternalLink, Scale, ArrowRight, Clock, FileText, Users } from "lucide-react";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const PAPER_LINE = "#E4DFD1";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";
const GREEN_BG = "#F0FDF4";
const GREEN_BORDER = "#BBF7D0";

export default function GuiaAutoexclusao() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: PAPER, color: INK }}>
      
      {/* HEADER */}
      <header className="border-b" style={{ borderColor: PAPER_LINE }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Scale size={24} style={{ color: SEAL }} />
            <span className="text-xl font-semibold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              RecuperaJogo<span style={{ color: SEAL }}>.</span>
            </span>
          </a>
          <a 
            href="/gerador" 
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: INK, color: "#FFF" }}
          >
            Gerar Petição
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6" style={{ backgroundColor: AMBER_BG, color: "#5C4A22" }}>
          <Shield size={14} />
          <span>Guia Oficial · 100% Gratuito</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
          Como se <span style={{ color: SEAL }}>Autoexcluir</span> de Todas as Casas de Apostas do Brasil
        </h1>
        <p className="text-lg mb-8" style={{ color: INK_SOFT }}>
          Passo a passo completo para bloquear seu CPF em todas as plataformas autorizadas pela SPA/MF, usando a ferramenta oficial do Governo Federal.
        </p>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-3xl mx-auto px-4 pb-20 space-y-12">

        {/* O QUE É */}
        <section className="rounded-xl border p-8" style={{ backgroundColor: "#FFF", borderColor: PAPER_LINE }}>
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>O que é a Autoexclusão Centralizada?</h2>
          <p className="text-base mb-4" style={{ color: INK_SOFT }}>
            É uma ferramenta gratuita do Governo Federal (Ministério da Fazenda/SPA-MF) que permite bloquear seu acesso a <strong>TODAS</strong> as casas de apostas autorizadas no Brasil com um único cadastro.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {[
              { icon: Shield, text: "Bloqueio simultâneo em todas as bets reguladas" },
              { icon: CheckCircle2, text: "Impede criação de novas contas" },
              { icon: FileText, text: "Bloqueia acesso a contas antigas" },
              { icon: Users, text: "Suspende propagandas direcionadas" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: GREEN_BG }}>
                <item.icon size={18} className="shrink-0 mt-0.5" style={{ color: "#16A34A" }} />
                <span className="text-sm" style={{ color: INK }}>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* REQUISITOS */}
        <section className="rounded-xl border p-8" style={{ backgroundColor: "#FFF", borderColor: PAPER_LINE }}>
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>Requisitos Antes de Começar</h2>
          <div className="space-y-3">
            {[
              "Conta Gov.br nível PRATA ou OURO (Bronze não funciona)",
              "CPF regular (sem pendências na Receita Federal)",
              "Ser maior de 18 anos",
              "10 a 15 minutos de tempo livre"
            ].map((req, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: SEAL }} />
                <span className="text-sm" style={{ color: INK }}>{req}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg border" style={{ backgroundColor: AMBER_BG, borderColor: AMBER_BORDER }}>
            <p className="text-sm" style={{ color: "#5C4A22" }}>
              <strong>💡 Dica:</strong> Se sua conta Gov.br for Bronze, faça o upgrade antes (reconhecimento facial ou via banco). O processo leva poucos minutos.
            </p>
          </div>
        </section>

        {/* PASSO A PASSO */}
        <section className="rounded-xl border p-8" style={{ backgroundColor: "#FFF", borderColor: PAPER_LINE }}>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>Passo a Passo Completo</h2>
          
          <div className="space-y-8">
            {[
              {
                n: "1",
                t: "Acesse o Portal Oficial",
                d: "Entre no site: gov.br/autoexclusaoapostas",
                link: "https://gov.br/autoexclusaoapostas"
              },
              {
                n: "2",
                t: "Faça Login com Gov.br",
                d: "Clique em 'Entrar com Gov.br' e digite seu CPF e senha. Complete a autenticação (pode ser necessário reconhecimento facial)."
              },
              {
                n: "3",
                t: "Confirme seus Dados",
                d: "Verifique se estão corretos: CPF, nome completo e data de nascimento. Clique em 'Continuar'."
              },
              {
                n: "4",
                t: "Escolha o Prazo de Bloqueio",
                d: "Você tem 5 opções: 1 mês, 3 meses, 6 meses, 12 meses ou Indeterminado.",
                extra: "️ Prazo Indeterminado: Você pode se arrepender em até 30 dias e reverter facilmente. Após 30 dias, a reversão é muito burocrática (só após 12 meses)."
              },
              {
                n: "5",
                t: "Informe o Motivo (Opcional)",
                d: "Você pode escolher: Voluntário, Dificuldades financeiras, Recomendação médica, Perda de controle sobre o jogo (saúde mental), Prevenir uso dos meus dados, ou Não informar.",
                extra: "💡 Se você tem ludopatia ou perda de controle, marque 'Perda de controle sobre o jogo (saúde mental)'. Isso fortalece seu caso se precisar entrar na justiça depois."
              },
              {
                n: "6",
                t: "Aceite os Termos e Confirme",
                d: "Leia o termo de responsabilidade, marque a caixa 'Li e aceito os termos' e clique em 'Confirmar Autoexclusão'."
              },
              {
                n: "7",
                t: "GUARDE O PROTOCOLO!",
                d: "O sistema vai gerar um número de protocolo. FAÇA PRINT DA TELA e ANOTE O NÚMERO. Esse protocolo é sua prova de que você se autoexcluiu.",
                destaque: true
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-lg" style={{ backgroundColor: SEAL, color: "#FFF" }}>
                  {step.n}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: INK }}>{step.t}</h3>
                  <p className="text-sm mb-2" style={{ color: INK_SOFT }}>{step.d}</p>
                  {step.link && (
                    <a href={step.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: SEAL }}>
                      Acessar portal <ExternalLink size={14} />
                    </a>
                  )}
                  {step.extra && (
                    <p className="text-xs mt-2 p-3 rounded-lg" style={{ backgroundColor: AMBER_BG, color: "#5C4A22" }}>
                      {step.extra}
                    </p>
                  )}
                  {step.destaque && (
                    <div className="mt-2 p-3 rounded-lg border" style={{ backgroundColor: "#FEF3C7", borderColor: "#F59E0B" }}>
                      <p className="text-sm font-medium" style={{ color: "#92400E" }}>
                        🚨 Este é o documento mais importante! Sem ele, você não consegue provar que se autoexcluiu.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRAZOS */}
        <section className="rounded-xl border p-8" style={{ backgroundColor: "#FFF", borderColor: PAPER_LINE }}>
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>Prazos Importantes</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border" style={{ backgroundColor: GREEN_BG, borderColor: GREEN_BORDER }}>
              <Clock size={20} className="mb-2" style={{ color: "#16A34A" }} />
              <h3 className="font-semibold mb-1" style={{ color: INK }}>72 horas</h3>
              <p className="text-sm" style={{ color: INK_SOFT }}>Prazo para as empresas bloquearem seu CPF após o pedido.</p>
            </div>
            <div className="p-4 rounded-lg border" style={{ backgroundColor: GREEN_BG, borderColor: GREEN_BORDER }}>
              <Clock size={20} className="mb-2" style={{ color: "#16A34A" }} />
              <h3 className="font-semibold mb-1" style={{ color: INK }}>30 dias</h3>
              <p className="text-sm" style={{ color: INK_SOFT }}>Prazo para integração completa ao sistema SIGAP (IN 31/2025).</p>
            </div>
          </div>
        </section>

        {/* LIMITAÇÕES */}
        <section className="rounded-xl border p-8" style={{ backgroundColor: "#FFF", borderColor: PAPER_LINE }}>
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>Limitações Importantes</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "#16A34A" }} />
              <div>
                <p className="text-sm font-medium" style={{ color: INK }}>Funciona para:</p>
                <p className="text-sm" style={{ color: INK_SOFT }}>Casas de apostas autorizadas pela SPA/MF (domínio .bet.br)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: "#DC2626" }} />
              <div>
                <p className="text-sm font-medium" style={{ color: INK }}>NÃO funciona para:</p>
                <p className="text-sm" style={{ color: INK_SOFT }}>Sites ilegais, plataformas internacionais não fiscalizadas, bets sem domínio .bet.br</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="rounded-xl border-2 p-8 text-center" style={{ borderColor: SEAL, backgroundColor: AMBER_BG }}>
          <Scale size={32} className="mx-auto mb-4" style={{ color: SEAL }} />
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Georgia, serif", color: INK }}>
            A casa de apostas aceitou seu depósito mesmo após a autoexclusão?
          </h2>
          <p className="text-base mb-6" style={{ color: INK_SOFT }}>
            Isso é ilegal. Você tem direito à restituição em dobro + danos morais. Use nosso gerador para criar uma petição profissional para o Juizado Especial Cível.
          </p>
          <a 
            href="/gerador" 
            className="inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-lg transition-transform hover:scale-105"
            style={{ backgroundColor: SEAL, color: "#FFF" }}
          >
            Gerar Minha Petição Agora <ArrowRight size={18} />
          </a>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center" style={{ borderColor: PAPER_LINE, backgroundColor: "#F2EFE6" }}>
        <p className="text-xs" style={{ color: INK_SOFT }}>
          © {new Date().getFullYear()} RecuperaJogo. Guia informativo baseado na regulamentação oficial da SPA/MF.
        </p>
      </footer>

    </div>
  );
}