"use client";

import React, { useState } from "react";
import {
  Scale, Shield, FileText, CheckCircle2, AlertTriangle,
  ArrowRight, Lock, Clock, Users, MessageCircle,
  ChevronDown, ChevronUp, Gavel, BookOpen, TrendingUp,
  Quote, Mail, Building2, Brain
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

export default function LandingPage() {
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqAberto(faqAberto === index ? null : index);
  };

  const problemas = [
    { icon: Lock, titulo: "Sua conta foi bloqueada, mas a casa continuou aceitando depósitos", descricao: "Você pediu autoexclusão, recebeu confirmação de bloqueio, e mesmo assim o sistema permitiu novos depósitos." },
    { icon: TrendingUp, titulo: "Seu padrão de apostas era claramente compulsivo e a plataforma não fez nada", descricao: "Depósitos repetidos, valores crescentes, uso de múltiplos cartões — e a casa ignorou os sinais." },
    { icon: MessageCircle, titulo: "Tentou resolver com o suporte e só recebeu respostas evasivas", descricao: "Protocolos ignorados, e-mails sem resposta, ou negativa baseada em 'termos de uso' genéricos." },
    { icon: AlertTriangle, titulo: "Recebeu propaganda da casa mesmo durante o período de autoexclusão", descricao: "Marketing direcionado, bônus e promoções enviadas enquanto sua conta deveria estar bloqueada." },
    { icon: Brain, titulo: "Você perdeu o controle e a casa nunca ofereceu ajuda ou limite", descricao: "Jogava por horas, gastava mais do que podia, e a plataforma nunca acionou mecanismos de jogo responsável previstos em lei." }
  ];

  const beneficios = [
    { icon: FileText, titulo: "Petição Completa", descricao: "Documento formatado em PDF, com endereçamento, qualificação, fatos, fundamentos jurídicos e pedidos — pronto para protocolar." },
    { icon: BookOpen, titulo: "Argumentos Validados", descricao: "Cada argumento é baseado em legislação vigente e jurisprudência real, sem invenções ou alucinações de IA." },
    { icon: Users, titulo: "Jus Postulandi", descricao: "Para causas de até 20 salários mínimos (R$ 28.240), você pode protocolar diretamente no JEC sem advogado." }
  ];

  const passos = [
    { numero: "01", titulo: "Faça seu cadastro e acesso", descricao: "Crie sua conta com e-mail e senha. Após a confirmação de pagamento único de R$ 137, seu acesso é liberado automaticamente em segundos." },
    { numero: "02", titulo: "Responda perguntas sobre seu caso", descricao: "Nosso sistema guiado faz perguntas simples sobre sua situação. Com base nas respostas, selecionamos os argumentos jurídicos mais fortes para o seu caso." },
    { numero: "03", titulo: "Baixe sua petição em PDF", descricao: "Receba um documento completo, formatado em Times New Roman, com margens e espaçamento padrão judicial. Imprima, assine e protocole no JEC da sua comarca." }
  ];

  const leis = [
    { lei: "Lei 14.790/2023", nome: "Lei das Bets", artigo: "Art. 26", descricao: "Nulidade de pleno direito das apostas realizadas por pessoa diagnosticada com transtorno do jogo patológico (ludopatia)." },
    { lei: "Código de Defesa do Consumidor", nome: "CDC", artigo: "Art. 14", descricao: "Responsabilidade objetiva do fornecedor por falha na prestação do serviço, independente de dolo ou culpa." },
    { lei: "Código de Defesa do Consumidor", nome: "CDC", artigo: "Art. 42, parágrafo único", descricao: "Restituição em dobro dos valores cobrados indevidamente, quando houver má-fé ou negligência grave." },
    { lei: "Lei 9.099/95", nome: "Juizados Especiais", artigo: "Art. 9º", descricao: "Jus postulandi: possibilidade de atuar sem advogado em causas de até 20 salários mínimos." }
  ];

  const depoimentos = [
    { nome: "Carlos M.", info: "34 anos · São Paulo", texto: "Eu tinha perdido R$ 4.200 na Bet365 depois que pedi autoexclusão. O suporte negou tudo. Usei o RecuperaJogo, protocolei no JEC e em 3 meses recebi R$ 6.800 (com danos morais). Valeu cada centavo.", recuperacao: "R$ 6.800", iniciais: "CM" },
    { nome: "Ana P.", info: "41 anos · Belo Horizonte", texto: "Meu marido estava viciado, pediu bloqueio e a casa continuou aceitando depósito. Eu nem sabia que podia processar. A petição veio pronta, só assinei e protocolamos. Ganhamos a causa.", recuperacao: "R$ 12.400", iniciais: "AP" },
    { nome: "Dr. Ricardo S.", info: "OAB/SP 123.456 · Advogado", texto: "Sou advogado e indico para clientes com causas de pequeno valor. A fundamentação está correta, os artigos batem. Economiza horas de pesquisa de jurisprudência.", recuperacao: "Uso profissional", iniciais: "RS" }
  ];

  const faqs = [
    { pergunta: "Preciso de advogado para usar o RecuperaJogo?", resposta: "Não. Para causas de até 20 salários mínimos (R$ 28.240,00 em 2026), a Lei 9.099/95 permite o 'jus postulandi' — você protocola direto no JEC sem advogado. Acima disso, recomendamos consultar um advogado." },
    { pergunta: "A petição funciona para qualquer casa de apostas?", resposta: "Sim. Os argumentos se aplicam a qualquer operadora licenciada no Brasil (Bet365, Sportingbet, Betano, Blaze, etc.), pois se baseiam em leis federais (CDC e Lei 14.790/2023)." },
    { pergunta: "O RecuperaJogo garante que vou ganhar a causa?", resposta: "Não. Nenhuma ferramenta ou advogado pode garantir resultado judicial. Oferecemos uma petição tecnicamente fundamentada. A decisão final é do juiz, que analisa provas e jurisprudência." },
    { pergunta: "Quanto tempo leva para gerar a petição?", resposta: "Em média, 5 a 10 minutos. O sistema faz perguntas guiadas e monta a petição automaticamente, pronta para download em PDF." },
    { pergunta: "O pagamento é seguro?", resposta: "Sim. Usamos o Stripe, uma das maiores plataformas de pagamento do mundo, com criptografia ponta a ponta e certificação PCI DSS. Seus dados financeiros nunca passam pelos nossos servidores." },
    { pergunta: "Quantas petições posso gerar?", resposta: "Cada acesso permite a geração de até 3 petições completas. Isso é suficiente para a maioria dos casos. O limite é por razões técnicas e de qualidade do serviço." },
    { pergunta: "E se eu não souber protocolar a petição?", resposta: "Muitos tribunais permitem protocolo online (PJe). Se tiver dúvidas, consulte a Defensoria Pública da sua região — atendimento gratuito." },
    { pergunta: "Posso pedir reembolso?", resposta: "Sim, dentro de 7 dias, se a ferramenta não funcionar tecnicamente (não conseguir gerar/baixar petições). Devolução 100%, sem burocracia." }
  ];

  const beneficiosLista = [
    "3 petições completas em PDF",
    "Argumentos jurídicos atualizados (Lei 14.790/2023 + CDC)",
    "Calculadora de valores (juros, danos morais, restituição em dobro)",
    "Checklist de provas personalizado",
    "Acesso vitalício à plataforma",
    "Garantia de funcionamento de 7 dias"
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: PAPER, color: INK }}>

      <header className="border-b sticky top-0 z-50 backdrop-blur-md" style={{ backgroundColor: "rgba(251, 249, 244, 0.95)", borderColor: "#E4DFD1" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: AMBER_BG }}>
              <Scale size={22} style={{ color: SEAL }} />
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: INK, fontFamily: "Georgia, serif" }}>RecuperaJogo</h1>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: INK_SOFT }}>Recuperação Jurídica de Valores</p>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium" style={{ color: INK_SOFT }}>
            <a href="#como-funciona">Como Funciona</a>
            <a href="#fundamentacao">Fundamentação Legal</a>
            <a href="#garantia">Garantia</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="/login" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: SEAL }}>
            Acessar Sistema <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <section className="py-16 md:py-24 px-4 sm:px-6" style={{ background: `linear-gradient(135deg, ${PAPER} 0%, ${AMBER_BG} 100%)` }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border" style={{ backgroundColor: "#FFF", borderColor: AMBER_BORDER }}>
              <Shield size={14} style={{ color: SEAL }} />
              <span className="text-xs font-semibold" style={{ color: SEAL }}>Lei 14.790/2023 · CDC · Proteção ao consumidor</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: INK, fontFamily: "Georgia, serif" }}>
              A casa de apostas <span style={{ color: SEAL }}>ignorou seu bloqueio</span> ou <span style={{ color: SEAL }}>lucrou com sua compulsão</span>?
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: INK_SOFT }}>
              Gere automaticamente uma petição jurídica completa, fundamentada na <strong>Lei 14.790/2023</strong> e no <strong>Código de Defesa do Consumidor</strong>, pronta para protocolar no Juizado Especial Cível — <strong>sem precisar de advogado</strong> para causas de até 20 salários mínimos.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <a href="/login" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: `linear-gradient(135deg, ${SEAL} 0%, ${SEAL_DARK} 100%)` }}>
                Quero Recuperar Meu Dinheiro <ArrowRight size={20} />
              </a>
              <a href="#como-funciona" className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold border-2 transition-all duration-300 hover:bg-white/50 hover:scale-105" style={{ borderColor: SEAL, color: SEAL, backgroundColor: "transparent" }}>
                Ver Como Funciona
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: INK_SOFT }}>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} style={{ color: GREEN }} /><span>Pagamento 100% seguro (Stripe)</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} style={{ color: GREEN }} /><span>Acesso imediato após pagamento</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} style={{ color: GREEN }} /><span>Garantia de funcionamento</span></div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg z-10" style={{ backgroundColor: GREEN }}>
              ✓ Petição pronta em 7 minutos
            </div>
            <div className="bg-white rounded-xl shadow-2xl p-6 border-2" style={{ borderColor: AMBER_BORDER }}>
              <div className="border-b pb-3 mb-4" style={{ borderColor: "#E4DFD1" }}>
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} style={{ color: SEAL }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: SEAL }}>Petição Judicial</span>
                </div>
                <div className="text-xs" style={{ color: INK_SOFT }}>peticao_autoexclusao_violada.pdf</div>
              </div>
              <div className="space-y-3">
                <div className="text-center text-xs font-bold uppercase" style={{ color: INK, fontFamily: "Georgia, serif" }}>
                  EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DO JUIZADO ESPECIAL CÍVEL
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded" style={{ backgroundColor: "#E4DFD1", width: "90%" }}></div>
                  <div className="h-2 rounded" style={{ backgroundColor: "#E4DFD1", width: "95%" }}></div>
                  <div className="h-2 rounded" style={{ backgroundColor: "#E4DFD1", width: "80%" }}></div>
                </div>
                <div className="pt-2">
                  <div className="text-xs font-bold mb-2 uppercase" style={{ color: SEAL }}>I — DOS FATOS</div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 rounded" style={{ backgroundColor: "#FBF1DD", width: "100%" }}></div>
                    <div className="h-1.5 rounded" style={{ backgroundColor: "#FBF1DD", width: "95%" }}></div>
                    <div className="h-1.5 rounded" style={{ backgroundColor: "#FBF1DD", width: "88%" }}></div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-xs font-bold mb-2 uppercase" style={{ color: SEAL }}>II — DO DIREITO</div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 rounded" style={{ backgroundColor: "#FBF1DD", width: "92%" }}></div>
                    <div className="h-1.5 rounded" style={{ backgroundColor: "#FBF1DD", width: "98%" }}></div>
                    <div className="h-1.5 rounded" style={{ backgroundColor: "#FBF1DD", width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 border-y" style={{ backgroundColor: "#FFF", borderColor: "#E4DFD1" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs uppercase tracking-wider font-semibold mb-6" style={{ color: INK_SOFT }}>Fundamentação jurídica baseada em:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { artigo: "Art. 26", lei: "Lei 14.790/2023", desc: "Lei das Bets" },
              { artigo: "Art. 14", lei: "CDC", desc: "Defesa do Consumidor" },
              { artigo: "Art. 42", lei: "CDC", desc: "Restituição em dobro" },
              { artigo: "Art. 9º", lei: "Lei 9.099/95", desc: "Jus Postulandi" }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border-2 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: PAPER, borderColor: "#E4DFD1" }}>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ backgroundColor: SEAL, color: "#FFF" }}>{item.artigo}</div>
                <div className="text-sm font-bold" style={{ color: INK }}>{item.lei}</div>
                <div className="text-xs mt-1" style={{ color: INK_SOFT }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: "#FFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: INK, fontFamily: "Georgia, serif" }}>Você se identifica com alguma dessas situações?</h3>
            <p className="text-lg" style={{ color: INK_SOFT }}>Se pelo menos uma delas é sua, você tem <strong>direito legal</strong> de recuperar seus valores.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {problemas.map((item, i) => (
              <div key={i} className="p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ borderColor: "#E4DFD1", backgroundColor: PAPER }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: AMBER_BG }}>
                  <item.icon size={24} style={{ color: SEAL }} />
                </div>
                <h4 className="text-lg font-bold mb-2" style={{ color: INK }}>{item.titulo}</h4>
                <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: AMBER_BG }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "#FFF" }}>
            <Gavel size={14} style={{ color: SEAL }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: SEAL }}>Ferramenta Jurídica Validada</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: INK, fontFamily: "Georgia, serif" }}>O RecuperaJogo gera sua petição completa em minutos</h3>
          <p className="text-lg mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: INK_SOFT }}>
            Nossa ferramenta utiliza argumentos jurídicos fundamentados na <strong>Lei 14.790/2023</strong>, no <strong>Código de Defesa do Consumidor</strong> e na <strong>jurisprudência atualizada</strong> dos Tribunais de Justiça brasileiros.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {beneficios.map((item, i) => (
              <div key={i} className="p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: "#FFF", borderColor: AMBER_BORDER }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: AMBER_BG }}>
                  <item.icon size={28} style={{ color: SEAL }} />
                </div>
                <h4 className="text-lg font-bold mb-2" style={{ color: INK }}>{item.titulo}</h4>
                <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: "#FFF" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: INK, fontFamily: "Georgia, serif" }}>Como funciona em 3 passos simples</h3>
            <p className="text-lg" style={{ color: INK_SOFT }}>Do cadastro à petição pronta em menos de 10 minutos.</p>
          </div>
          <div className="space-y-6">
            {passos.map((passo, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-6 items-start p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: PAPER, borderColor: "#E4DFD1" }}>
                <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm" style={{ backgroundColor: SEAL, color: "#FFF", fontFamily: "Georgia, serif" }}>
                  {passo.numero}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2" style={{ color: INK }}>{passo.titulo}</h4>
                  <p className="text-base leading-relaxed" style={{ color: INK_SOFT }}>{passo.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fundamentacao" className="py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: INK }}>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#FFF", fontFamily: "Georgia, serif" }}>Fundamentação jurídica sólida</h3>
          <p className="text-lg mb-10" style={{ color: "#A0AEC0" }}>Cada petição gerada utiliza dispositivos legais reais e atualizados.</p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {leis.map((item, i) => (
              <div key={i} className="p-6 rounded-xl border transition-all duration-300 hover:bg-white/10 hover:-translate-y-1" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: SEAL, color: "#FFF" }}>{item.artigo}</span>
                  <span className="text-sm font-semibold" style={{ color: AMBER_BG }}>{item.lei}</span>
                </div>
                <h4 className="text-lg font-bold mb-2" style={{ color: "#FFF" }}>{item.nome}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#A0AEC0" }}>{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: "#FFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: INK, fontFamily: "Georgia, serif" }}>Histórias reais de quem já usou o RecuperaJogo</h3>
            <p className="text-lg" style={{ color: INK_SOFT }}>Resultados concretos de pessoas que recuperaram o que era delas por direito.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {depoimentos.map((dep, i) => (
              <div key={i} className="p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: PAPER, borderColor: "#E4DFD1" }}>
                <Quote size={24} className="mb-3" style={{ color: AMBER_BORDER }} />
                <p className="text-sm leading-relaxed mb-4" style={{ color: INK }}>"{dep.texto}"</p>
                <div className="pt-4 border-t" style={{ borderColor: "#E4DFD1" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: SEAL }}>{dep.iniciais}</div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: INK }}>{dep.nome}</div>
                      <div className="text-xs" style={{ color: INK_SOFT }}>{dep.info}</div>
                    </div>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: GREEN_BG, color: GREEN }}>Recuperação: {dep.recuperacao}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="garantia" className="py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: GREEN_BG }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm" style={{ backgroundColor: "#FFF", border: `3px solid ${GREEN}` }}>
            <Shield size={40} style={{ color: GREEN }} />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: INK, fontFamily: "Georgia, serif" }}>Garantia de Funcionamento de 7 Dias</h3>
          <p className="text-lg mb-6 leading-relaxed" style={{ color: INK_SOFT }}>
            Se a ferramenta <strong>não funcionar tecnicamente</strong> — ou seja, se você não conseguir gerar, baixar ou visualizar suas petições após o pagamento — devolvemos 100% do seu dinheiro, sem perguntas e sem burocracia.
          </p>
          <div className="p-6 rounded-xl border-2 text-left shadow-sm" style={{ backgroundColor: "#FFF", borderColor: GREEN }}>
            <h4 className="font-bold mb-3" style={{ color: GREEN }}>O que a garantia cobre:</h4>
            <ul className="space-y-2 text-sm" style={{ color: INK_SOFT }}>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: GREEN }} /><span>Problemas técnicos que impeçam a geração das petições</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: GREEN }} /><span>Erros no sistema que impossibilitem o download do PDF</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: GREEN }} /><span>Falha no acesso à plataforma após confirmação do pagamento</span></li>
            </ul>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "#E5E7EB" }}>
              <p className="text-xs leading-relaxed" style={{ color: INK_SOFT }}>
                <strong>Observação importante:</strong> Esta garantia cobre o funcionamento técnico da ferramenta. Não cobre o resultado judicial do seu caso, pois decisões judiciais dependem de múltiplos fatores (juiz, provas, jurisprudência local) que estão fora do controle da plataforma.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: "#FFF" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: INK, fontFamily: "Georgia, serif" }}>Um investimento. Três petições. Acesso vitalício.</h3>
            <p className="text-lg" style={{ color: INK_SOFT }}>Pagamento único, sem mensalidades, sem surpresas.</p>
          </div>
          <div className="relative p-8 rounded-2xl border-2 shadow-xl" style={{ backgroundColor: PAPER, borderColor: AMBER_BORDER }}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SEAL }}>MAIS POPULAR</div>
            <div className="text-center mb-6">
              <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: INK_SOFT }}>RecuperaJogo — Acesso Completo</div>
              <div className="text-lg line-through mb-2" style={{ color: "#9CA3AF" }}>R$ 297,00</div>
              <div className="text-5xl font-bold mb-1" style={{ color: SEAL, fontFamily: "Georgia, serif" }}>R$ 137,00</div>
              <div className="text-sm" style={{ color: INK_SOFT }}>pagamento único · acesso vitalício</div>
            </div>
            <div className="space-y-3 mb-8">
              {beneficiosLista.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: GREEN }} />
                  <span className="text-sm" style={{ color: INK }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="/login" className="block w-full text-center px-8 py-4 rounded-xl text-white text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: `linear-gradient(135deg, ${SEAL} 0%, ${SEAL_DARK} 100%)` }}>
              Quero Recuperar Meu Dinheiro Agora <ArrowRight size={20} className="inline ml-2" />
            </a>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs" style={{ color: INK_SOFT }}>
              <div className="flex items-center gap-1"><Lock size={12} /> Pagamento único</div>
              <div className="flex items-center gap-1"><Clock size={12} /> Acesso imediato</div>
              <div className="flex items-center gap-1"><Shield size={12} /> Garantia 7 dias</div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: PAPER }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: INK, fontFamily: "Georgia, serif" }}>Perguntas Frequentes</h3>
            <p className="text-lg" style={{ color: INK_SOFT }}>Tire suas dúvidas antes de começar.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className="border-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md" style={{ borderColor: "#E4DFD1", backgroundColor: "#FFF" }}>
                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200" style={{ backgroundColor: faqAberto === i ? AMBER_BG : "#FFF" }}>
                  <span className="font-semibold pr-4" style={{ color: INK }}>{item.pergunta}</span>
                  {faqAberto === i ? <ChevronUp size={20} style={{ color: SEAL }} /> : <ChevronDown size={20} style={{ color: SEAL }} />}
                </button>
                {faqAberto === i && (
                  <div className="p-5 pt-0 border-t" style={{ borderColor: "#E4DFD1", backgroundColor: "#FFF" }}>
                    <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>{item.resposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6" style={{ background: `linear-gradient(135deg, ${SEAL} 0%, ${SEAL_DARK} 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#FFF", fontFamily: "Georgia, serif" }}>Pare de perder dinheiro. Comece a recuperar o que é seu por direito.</h3>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
            Acesso completo por <strong style={{ color: AMBER_BG }}>R$ 137,00</strong> (pagamento único).<br />Sem mensalidades. Sem surpresas.
          </p>
          <a href="/login" className="inline-flex items-center gap-3 px-10 py-5 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl" style={{ backgroundColor: "#FFF", color: SEAL }}>
            Começar Agora <ArrowRight size={20} />
          </a>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
            <div className="flex items-center gap-2"><Lock size={14} /><span>Pagamento seguro</span></div>
            <div className="flex items-center gap-2"><Clock size={14} /><span>Acesso imediato</span></div>
            <div className="flex items-center gap-2"><Shield size={14} /><span>Garantia de 7 dias</span></div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 border-t" style={{ backgroundColor: PAPER, borderColor: "#E4DFD1" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: AMBER_BG }}>
                  <Scale size={22} style={{ color: SEAL }} />
                </div>
                <div>
                  <h4 className="text-lg font-bold" style={{ color: INK, fontFamily: "Georgia, serif" }}>RecuperaJogo</h4>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: INK_SOFT }}>Recuperação Jurídica de Valores</p>
                </div>
              </div>
              <p className="text-sm" style={{ color: INK_SOFT }}>Ferramenta de automação de redação jurídica para causas de até 20 salários mínimos.</p>
            </div>
            <div>
              <h5 className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: INK }}>Navegação</h5>
              <ul className="space-y-2 text-sm" style={{ color: INK_SOFT }}>
                <li><a href="#como-funciona">Como Funciona</a></li>
                <li><a href="#fundamentacao">Fundamentação Legal</a></li>
                <li><a href="#garantia">Garantia</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: INK }}>Contato</h5>
              <ul className="space-y-2 text-sm" style={{ color: INK_SOFT }}>
                <li className="flex items-center gap-2"><Mail size={14} /> pedrofsneto33@gmail.com</li>
                <li className="flex items-center gap-2"><Building2 size={14} /> CNPJ: 55.536.885/0001-30</li>
                <li className="flex items-center gap-2"><Clock size={14} /> Atendimento em até 24h</li>
              </ul>
            </div>
          </div>
          <div className="p-6 rounded-xl border-2 mb-6" style={{ backgroundColor: AMBER_BG, borderColor: AMBER_BORDER }}>
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle size={20} className="flex-shrink-0 mt-1" style={{ color: SEAL }} />
              <h4 className="font-bold text-lg" style={{ color: INK, fontFamily: "Georgia, serif" }}>Aviso Legal Importante</h4>
            </div>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: INK_SOFT }}>
              <p><strong>1. Natureza do serviço:</strong> O RecuperaJogo é uma ferramenta de automação de redação jurídica. Não constitui assessoria, consultoria ou representação jurídica. Não há advogado responsável tecnicamente pelos documentos gerados.</p>
              <p><strong>2. Responsabilidade do usuário:</strong> O usuário é integralmente responsável por revisar, adaptar e validar o conteúdo da petição antes do protocolo.</p>
              <p><strong>3. Resultados judiciais:</strong> O RecuperaJogo não garante, promete ou assegura qualquer resultado judicial específico.</p>
              <p><strong>4. Limitação de uso:</strong> A ferramenta destina-se a causas de até 20 salários mínimos (jus postulandi, art. 9º da Lei 9.099/95).</p>
              <p><strong>5. Atualização normativa:</strong> A legislação do setor de apostas está em constante evolução. Verifique a vigência das normas na data do protocolo.</p>
            </div>
          </div>
          <div className="text-center text-xs pt-6 border-t" style={{ color: INK_SOFT, borderColor: "#E4DFD1" }}>
            <p className="mb-2">© {new Date().getFullYear()} RecuperaJogo. Todos os direitos reservados.</p>
            <p>CNPJ: 55.536.885/0001-30 | Contato: pedrofsneto33@gmail.com</p>
          </div>
        </div>
      </footer>

    </div>
  );
}