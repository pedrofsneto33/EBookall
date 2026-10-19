"use client";

import React, { useState } from "react";
import {
  Shield,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lock,
  Clock,
  MessageCircle,
  ChevronDown,
  Gavel,
  BookOpen,
  ShieldCheck,
  Ban,
  Banknote,
  Stethoscope,
  Smartphone,
} from "lucide-react";

const INK = "#0F1C2E";
const INK_SOFT = "#4A5B6E";
const SEAL = "#1B6B4A";
const SEAL_HOVER = "#155A3E";
const PAPER = "#FAF8F4";
const CARD = "#FFFFFF";
const LINE = "#E6E1D6";
const MUTED_BG = "#F3F0E9";

const CASOS = [
  {
    id: "autoexclusao",
    icon: Ban,
    titulo: "Autoexclusão ignorada",
    texto: "Você pediu para parar (casa ou gov.br) e a plataforma ainda aceitou depósito.",
  },
  {
    id: "saque",
    icon: Banknote,
    titulo: "Saque travado",
    texto: "Tem saldo seu e a casa recusou ou atrasou a transferência para a conta cadastrada.",
  },
  {
    id: "online",
    icon: Smartphone,
    titulo: "Jogo on-line no app",
    texto: "Sessões rápidas, caça-níquel, aviso de perda e RTP — peça fundamentada sem inventar crime.",
  },
  {
    id: "laudo",
    icon: Stethoscope,
    titulo: "Tenho laudo de ludopatia",
    texto: "Com laudo o art. 26 da SPA entra. Sem laudo o gerador trava esse pedido.",
  },
  {
    id: "ilegal",
    icon: AlertTriangle,
    titulo: "Casa ilegal / sem .bet.br",
    texto: "A peça não promete que o decreto da União devolve o dinheiro. Foco em CDC e fatos.",
  },
  {
    id: "saldo",
    icon: Clock,
    titulo: "Ainda tenho saldo autorizado",
    texto: "Primeiro o saque no prazo da MP. A petição cobre o que já recusaram antes.",
  },
];

const PASSOS = [
  {
    n: "1",
    titulo: "Escolha o que aconteceu",
    desc: "O texto da peça muda com o fato. Não é PDF genérico.",
  },
  {
    n: "2",
    titulo: "Pague R$ 137 uma vez",
    desc: "Stripe. Acesso liberado. Até 3 petições + checklist + calculadora.",
  },
  {
    n: "3",
    titulo: "Revise, assine e protocole",
    desc: "Você é o autor (jus postulandi). Hash no rodapé. Sem advogado no meio, se couber no teto.",
  },
];

const INCLUSO = [
  "Até 3 petições em PDF (casas ou fatos diferentes)",
  "Argumentos alinhados à Lei 14.790/2023 + CDC",
  "Checklist de provas obrigatórias",
  "Calculadora de valores estimados",
  "Acesso sem mensalidade",
  "Garantia de 7 dias",
];

const FAQ = [
  {
    q: "Isso é advocacia?",
    a: "Não. É software da Primex Sistemas. Você revisa, assina e protocola em nome próprio no Juizado Especial Cível (jus postulandi, até 20 salários mínimos).",
  },
  {
    q: "O que entra nos R$ 137?",
    a: "Até três rascunhos de petição (ou notificação), checklist de provas, calculadora e acesso às ferramentas. Sem mensalidade.",
  },
  {
    q: "E se a casa era ilegal?",
    a: "A peça não promete que o decreto da União devolve o dinheiro. A luta continua com CDC e os fatos que você prova.",
  },
  {
    q: "Preciso ir ao fórum pessoalmente?",
    a: "Depende da comarca. Muitos tribunais aceitam protocolo digital (PJe, e-Proc). Confira as regras do seu Juizado Especial.",
  },
  {
    q: "Tem reembolso?",
    a: "Sim. Garantia incondicional de 7 dias. Se não ficar satisfeito com o rascunho, devolvemos o valor. Fale pelo WhatsApp.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Seguimos a LGPD. Detalhes na Política de Privacidade. Dados de pagamento passam pelo Stripe, não pelos nossos servidores.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: LINE }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left py-4 gap-4"
      >
        <span className="font-medium text-[15px]" style={{ color: INK }}>
          {q}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform"
          style={{
            color: SEAL,
            transform: open ? "rotate(180deg)" : "none",
          }}
        />
      </button>
      {open && (
        <p className="text-sm leading-relaxed pb-4 pr-6" style={{ color: INK_SOFT }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function LandingPage() {
  const [casoAtivo, setCasoAtivo] = useState(CASOS[0].id);

  return (
    <div className="min-h-screen" style={{ backgroundColor: PAPER, color: INK }}>
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{ backgroundColor: "rgba(250,248,244,0.92)", borderColor: LINE }}
      >
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold tracking-tight"
              style={{ backgroundColor: SEAL }}
            >
              RJ
            </div>
            <span className="font-semibold text-[15px]" style={{ color: INK }}>
              RecuperaJogo
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: INK_SOFT }}>
            <a href="#como-funciona" className="hover:opacity-80">Como funciona</a>
            <a href="#casos" className="hover:opacity-80">Casos</a>
            <a href="#preco" className="hover:opacity-80">Preço</a>
            <a href="#faq" className="hover:opacity-80">FAQ</a>
            <a href="/guia" className="hover:opacity-80">Guia</a>
          </nav>
          <a
            href="/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: SEAL }}
          >
            Entrar
          </a>
        </div>
      </header>

      <section className="px-4 pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: SEAL }}>
              Petição para Juizado · jus postulandi
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] tracking-tight" style={{ color: INK }}>
              Monte a petição do seu prejuízo com as bets. Protocolo em nome próprio.
            </h1>
            <p className="mt-5 text-base md:text-lg leading-relaxed" style={{ color: INK_SOFT }}>
              Escolha o fato, preencha os dados e gere o rascunho em PDF — com fundamentos da SPA e do CDC. Você revisa, assina e protocola. Sem mensalidade.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-[15px] font-semibold shadow-sm"
                style={{ backgroundColor: SEAL }}
              >
                Gerar minha petição · R$ 137
                <ArrowRight size={18} />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-medium border hover:bg-black/[0.03]"
                style={{ borderColor: LINE, color: INK }}
              >
                Ver como funciona
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs" style={{ color: INK_SOFT }}>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} style={{ color: SEAL }} /> Pagamento Stripe</span>
              <span className="inline-flex items-center gap-1.5"><Lock size={14} style={{ color: SEAL }} /> Acesso imediato</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} style={{ color: SEAL }} /> Garantia 7 dias</span>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border overflow-hidden shadow-sm" style={{ backgroundColor: CARD, borderColor: LINE }}>
            <div className="px-4 py-3 border-b flex items-center justify-between gap-3" style={{ borderColor: LINE, backgroundColor: MUTED_BG }}>
              <div className="flex items-center gap-2 text-xs font-medium" style={{ color: INK_SOFT }}>
                <FileText size={14} /> Prévia · rascunho (dados ocultos)
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded" style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}>
                Demonstrativo — não protocolar
              </span>
            </div>
            <div className="p-5 sm:p-8 text-sm leading-relaxed" style={{ color: INK }}>
              <p className="text-[11px] uppercase tracking-wide mb-3" style={{ color: INK_SOFT }}>
                Juizado Especial Cível · rascunho RecuperaJogo
              </p>
              <p className="font-semibold text-[13px] mb-4">
                EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE{" "}
                <span className="inline-block align-middle rounded px-8 py-0.5" style={{ backgroundColor: "#1E2A3A" }} />
              </p>
              <p className="mb-3" style={{ color: INK_SOFT }}>
                <span className="font-semibold" style={{ color: INK }}>Qualificação.</span> Autor(a), brasileiro(a), CPF nº{" "}
                <span className="inline-block align-middle rounded px-10 py-0.5" style={{ backgroundColor: "#1E2A3A" }} />, residente em{" "}
                <span className="inline-block align-middle rounded px-12 py-0.5" style={{ backgroundColor: "#1E2A3A" }} />, vem, por direito próprio (art. 9º da Lei 9.099/95), propor{" "}
                <strong style={{ color: INK }}>AÇÃO DE RESTITUIÇÃO DE VALORES C/C OBRIGAÇÃO DE FAZER</strong> em face de{" "}
                <span className="inline-block align-middle rounded px-14 py-0.5" style={{ backgroundColor: "#1E2A3A" }} />.
              </p>
              <p className="mb-1 font-semibold text-[13px]">I — Dos fatos</p>
              <p style={{ color: INK_SOFT }}>
                A parte autora formalizou autoexclusão (casa e/ou gov.br). Ainda assim a ré aceitou novo aporte. Prints da exclusão e do depósito posterior entram no rascunho pago.
              </p>
              <p className="mt-4 text-xs" style={{ color: INK_SOFT }}>
                Tarjas = nome, CPF, endereço, casa, valores. Artigo de lei é público. Copiar daqui não gera peça protocolável.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="px-4 py-14 md:py-16" style={{ backgroundColor: MUTED_BG }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: SEAL }}>Fluxo</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8" style={{ color: INK }}>Três passos. Sem enrolação.</h2>
          <ol className="grid md:grid-cols-3 gap-4">
            {PASSOS.map((p) => (
              <li key={p.n} className="rounded-2xl border p-6" style={{ backgroundColor: CARD, borderColor: LINE }}>
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full text-sm font-bold text-white mb-4" style={{ backgroundColor: SEAL }}>{p.n}</span>
                <h3 className="font-semibold text-lg mb-1.5" style={{ color: INK }}>{p.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="casos" className="px-4 py-14 md:py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: SEAL }}>Casos</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ color: INK }}>O texto muda com o fato</h2>
          <p className="text-base mb-8 max-w-xl" style={{ color: INK_SOFT }}>
            Escolha o cenário mais próximo do seu. No gerador, o rascunho se adapta — não é um modelo único copiado.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CASOS.map((c) => {
              const Icon = c.icon;
              const ativo = casoAtivo === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCasoAtivo(c.id)}
                  className="text-left rounded-2xl border p-5 transition-all"
                  style={{
                    backgroundColor: ativo ? "#E8F5EF" : CARD,
                    borderColor: ativo ? SEAL : LINE,
                    boxShadow: ativo ? "0 0 0 1px " + SEAL : "none",
                  }}
                >
                  <Icon size={20} style={{ color: SEAL }} className="mb-3" />
                  <h3 className="font-semibold text-[15px] mb-1" style={{ color: INK }}>{c.titulo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>{c.texto}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-8">
            <a href="/login" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white text-[15px] font-semibold" style={{ backgroundColor: SEAL }}>
              Usar este caso no gerador <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section id="preco" className="px-4 py-14 md:py-16" style={{ backgroundColor: MUTED_BG }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: SEAL }}>Oferta</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ color: INK }}>Um pagamento. Sem mensalidade.</h2>
              <p className="text-base mb-6" style={{ color: INK_SOFT }}>
                Software da Primex Sistemas. Você é o autor da peça. Não somos sociedade de advogados e não prometemos resultado judicial.
              </p>
              <ul className="space-y-2.5">
                {INCLUSO.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: INK }}>
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: SEAL }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border p-7 shadow-sm" style={{ backgroundColor: CARD, borderColor: LINE }}>
              <p className="text-sm font-medium mb-1" style={{ color: INK_SOFT }}>Acesso completo</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold tracking-tight" style={{ color: INK }}>R$ 137</span>
                <span className="text-sm" style={{ color: INK_SOFT }}>,00</span>
              </div>
              <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Pagamento único via Stripe · liberação automática</p>
              <a href="/login" className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-white text-[15px] font-semibold mb-4" style={{ backgroundColor: SEAL }}>
                Criar conta e pagar <ArrowRight size={18} />
              </a>
              <div className="flex items-start gap-2 rounded-xl border px-3 py-2.5 text-xs leading-relaxed" style={{ backgroundColor: "#EEF4EF", borderColor: "#B9CFC0", color: "#2F4A3A" }}>
                <ShieldCheck size={14} className="shrink-0 mt-0.5" />
                <span><strong>Garantia de 7 dias.</strong> Não gostou do rascunho? Devolvemos o valor.</span>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed" style={{ color: INK_SOFT }}>
                RecuperaJogo é software da PRIMEX SISTEMAS LTDA (CNPJ 55.536.885/0001-30). Não é advocacia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
          {[
            { icon: Gavel, t: "Jus postulandi", d: "Até 20 salários mínimos você pode protocolar sozinho no Juizado Especial Cível." },
            { icon: BookOpen, t: "Base legal clara", d: "Lei 14.790/2023 (SPA), CDC e art. 9º da Lei 9.099/95 — sem inventar argumento." },
            { icon: Shield, t: "Transparência", d: "Ferramenta de documento. Sem advogado responsável. Sem garantia de ganho de causa." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border p-5" style={{ backgroundColor: CARD, borderColor: LINE }}>
              <b.icon size={20} style={{ color: SEAL }} className="mb-3" />
              <h3 className="font-semibold mb-1" style={{ color: INK }}>{b.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="px-4 py-14 md:py-16" style={{ backgroundColor: MUTED_BG }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-2 text-center" style={{ color: SEAL }}>Antes de pagar</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center" style={{ color: INK }}>Perguntas diretas</h2>
          <div className="rounded-2xl border px-5 sm:px-6" style={{ backgroundColor: CARD, borderColor: LINE }}>
            {FAQ.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ color: INK }}>Pronto para montar o rascunho?</h2>
          <p className="text-base mb-8" style={{ color: INK_SOFT }}>
            Crie a conta, pague uma vez e gere até três petições. Você revisa antes de protocolar.
          </p>
          <a href="/login" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white text-[15px] font-semibold" style={{ backgroundColor: SEAL }}>
            Gerar minha petição · R$ 137 <ArrowRight size={18} />
          </a>
          <div className="mt-6 inline-flex items-start gap-2 max-w-md mx-auto text-left text-xs leading-relaxed rounded-xl border px-3 py-2.5" style={{ backgroundColor: "#FBF1DD", borderColor: "#D8B368", color: "#5C4A22" }}>
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            <span>Ferramenta de automação de documento, não assessoria jurídica. Sem garantia de resultado. Revise antes de protocolar.</span>
          </div>
        </div>
      </section>

      <footer className="border-t px-4 py-10" style={{ borderColor: LINE, backgroundColor: MUTED_BG }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: SEAL }}>RJ</div>
                <span className="font-semibold" style={{ color: INK }}>RecuperaJogo</span>
              </div>
              <p className="text-sm max-w-xs" style={{ color: INK_SOFT }}>Software da Primex Sistemas LTDA · CNPJ 55.536.885/0001-30</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: INK_SOFT }}>
              <a href="/guia" className="hover:underline">Guia</a>
              <a href="/calculadora" className="hover:underline">Calculadora</a>
              <a href="/politica-privacidade" className="hover:underline">Privacidade</a>
              <a href="/login" className="hover:underline">Entrar</a>
              <a href="https://wa.me/5586988117925?text=Ol%C3%A1!%20Vim%20pelo%20site%20RecuperaJogo." target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a>
            </div>
          </div>
          <p className="text-xs" style={{ color: INK_SOFT }}>
            © {new Date().getFullYear()} Primex Sistemas. Não somos sociedade de advogados. Você é o autor da peça. pedrofsneto33@gmail.com · (86) 98811-7925
          </p>
        </div>
      </footer>

      <a
        href="https://wa.me/5586988117925?text=Ol%C3%A1!%20Vim%20pelo%20site%20RecuperaJogo."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-transform"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={26} color="#fff" />
      </a>
    </div>
  );
}
