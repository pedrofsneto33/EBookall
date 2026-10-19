"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Copy,
  MessageCircle,
  Play,
  Shield,
  Zap,
  Ban,
  Banknote,
  Scale,
  Flame,
  Eye,
  Gavel,
} from "lucide-react";

const WHATSAPP = "5586988117925";
const WHATSAPP_MSG = encodeURIComponent(
  "Oi! Vi o site do RecuperaJogo e quero gerar minha petição contra as bets."
);
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`;
const CNPJ_DISPLAY = "55.536.885/0001-30";
const CNPJ_PIX = "55536885000130";
const PRECO = "137,00";

const CASOS = [
  {
    icon: Ban,
    title: "Autoexclusão furada",
    text: "Você pediu para parar. A casa ainda aceitou depósito. Isso não é azar — é falha.",
  },
  {
    icon: Banknote,
    title: "Saque travado",
    text: "Saldo seu. Transferência negada ou enrolada. O dinheiro não some no sistema.",
  },
  {
    icon: Flame,
    title: "Jogo que não para",
    text: "App, cassino, sessão sem fim. A peça fala de fato e de CDC — não de moralismo.",
  },
  {
    icon: Scale,
    title: "Laudo / ludopatia",
    text: "Com laudo, o art. 26 da SPA entra. Sem laudo, o gerador não inventa diagnóstico.",
  },
];

const PASSOS = [
  { n: "01", t: "Conta o que aconteceu", d: "O texto muda com o fato. Não é modelo genérico de internet." },
  { n: "02", t: "Paga R$ 137 no PIX", d: "CNPJ da Primex. Acesso liberado. Sem mensalidade." },
  { n: "03", t: "Gera, revisa, protocola", d: "Você é o autor no Juizado (jus postulandi). Hash no rodapé." },
];

const FAQ = [
  {
    q: "Isso é escritório de advocacia?",
    a: "Não. É software da Primex Sistemas. Eu já ganhei petições contra bets — e montei a ferramenta para você montar o rascunho, revisar e protocolar em nome próprio no Juizado Especial.",
  },
  {
    q: "Como pago?",
    a: `PIX para o CNPJ ${CNPJ_DISPLAY} (Primex Sistemas LTDA), valor R$ ${PRECO}. Depois manda o comprovante no WhatsApp para liberarmos o acesso na hora.`,
  },
  {
    q: "Por que acreditar?",
    a: "Porque o produto nasceu de processo real, não de marketing. Eu usei o caminho do Juizado, ganhei, e transformei o método em gerador. Sem garantia de vitória no seu caso — juiz decide. Com método e prova, você não chega de mãos vazias.",
  },
  {
    q: "Preciso de advogado?",
    a: "Em causas até 20 salários mínimos no Juizado Especial Cível, a lei permite protocolar sozinho (jus postulandi). Acima disso, ou caso complexo: advogado ou Defensoria.",
  },
  {
    q: "Tem reembolso?",
    a: "Sim. 7 dias. Não gostou do rascunho? Devolvemos. Fala no WhatsApp.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left py-5 gap-4 group"
      >
        <span className="font-medium text-base text-white/90 group-hover:text-white transition-colors">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-emerald-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="text-sm leading-relaxed pb-5 pr-8 text-white/55">{a}</p>
      )}
    </div>
  );
}

function CopyPix() {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CNPJ_PIX);
      setOk(true);
      setTimeout(() => setOk(false), 2000);
    } catch {
      /* ignore */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="w-full flex items-center justify-between gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3.5 text-left hover:bg-emerald-500/20 transition-colors"
    >
      <div>
        <p className="text-[11px] uppercase tracking-wider text-emerald-400/80 mb-0.5">
          Chave PIX · CNPJ
        </p>
        <p className="font-mono text-sm sm:text-base text-white font-semibold tracking-wide">
          {CNPJ_DISPLAY}
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 shrink-0">
        {ok ? (
          <>
            <CheckCircle2 size={16} /> Copiado
          </>
        ) : (
          <>
            <Copy size={16} /> Copiar
          </>
        )}
      </span>
    </button>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05080C] text-white antialiased overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,0.18), transparent 55%), radial-gradient(ellipse 40% 40% at 100% 50%, rgba(220,38,38,0.08), transparent 50%)",
        }}
      />

      <header className="relative z-50 sticky top-0 border-b border-white/8 bg-[#05080C]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-[#05080C] text-xs font-black tracking-tighter">
              RJ
            </div>
            <span className="font-semibold text-[15px] tracking-tight">RecuperaJogo</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/55">
            <a href="#historia" className="hover:text-white transition-colors">História</a>
            <a href="#como" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#preco" className="hover:text-white transition-colors">Preço</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/10 transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors"
            >
              Entrar
            </a>
          </div>
        </div>
      </header>

      <section className="relative z-10 px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-red-300">
                  Contra as bets · não a favor delas
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-black leading-[1.05] tracking-tight">
                As casas lucram com o seu prejuízo.
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                  Eu montei a ferramenta para você reagir.
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/55 max-w-xl leading-relaxed">
                Não é site de advogado. É o método que usei quando{" "}
                <strong className="text-white/90">ganhei petições contra as bets</strong> —
                transformado em gerador de rascunho para o Juizado Especial. Você preenche, revisa e
                protocola.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#preco"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-[15px] font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.35)]"
                >
                  Quero o gerador · R$ {PRECO}
                  <ArrowRight size={18} />
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-[15px] font-semibold border border-white/15 text-white hover:bg-white/5 transition-colors"
                >
                  <MessageCircle size={18} className="text-emerald-400" />
                  Falar no WhatsApp
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/40">
                <span className="inline-flex items-center gap-1.5">
                  <Zap size={13} className="text-emerald-400" /> PIX via CNPJ
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield size={13} className="text-emerald-400" /> Garantia 7 dias
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Gavel size={13} className="text-emerald-400" /> Jus postulandi
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-1 shadow-2xl">
                <div className="rounded-[1.35rem] overflow-hidden bg-[#0B1018] aspect-[4/5] relative">
                  <div
                    className="absolute inset-0 opacity-90"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1614854262318-831574f15f1f?auto=format&fit=crop&w=900&q=80)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05080C] via-[#05080C]/70 to-transparent" />
                  <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 mb-2">
                      Prova real
                    </p>
                    <p className="text-xl font-bold leading-snug">
                      Eu já processei casas de apostas.
                      <span className="block text-white/60 font-medium text-base mt-1">
                        O site existe porque o caminho funcionou — e eu quis que mais gente tivesse o mapa.
                      </span>
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 rounded-full bg-black/50 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 border border-white/10">
                    Anti-bets · não casino
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs sm:text-sm text-white/45">
          <span>
            Primex Sistemas · CNPJ <strong className="text-white/70">{CNPJ_DISPLAY}</strong>
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
            WhatsApp (86) 98811-7925
          </a>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>Software · não advocacia</span>
        </div>
      </section>

      <section id="historia" className="relative z-10 px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">
              Por que isso existe
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-5">
              Eu não vendi um curso.
              <span className="block text-white/50">Eu ganhei — e construí o gerador.</span>
            </h2>
            <div className="space-y-4 text-white/55 leading-relaxed">
              <p>
                Depósito depois de bloqueio. Resposta de suporte que não resolve. A sensação de que a
                casa sempre ganha no detalhe.
              </p>
              <p>
                Eu usei o Juizado Especial, organizei prova, fundamentei com CDC e com a lógica da
                regulação das bets — e{" "}
                <strong className="text-white">ganhei petições contra casas de apostas</strong>.
              </p>
              <p>
                O RecuperaJogo é a versão em software desse caminho: rascunho de petição, checklist,
                calculadora. Você revisa. Você assina. Você protocola.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "R$ 137", v: "pagamento único" },
              { k: "3", v: "petições no pacote" },
              { k: "7 dias", v: "garantia total" },
              { k: "24h", v: "liberação via WhatsApp" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-emerald-500/40 transition-colors"
              >
                <p className="text-2xl font-black text-emerald-400">{s.k}</p>
                <p className="text-xs text-white/45 mt-1 uppercase tracking-wide">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">Em vídeo</p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              O que as bets não colocam no anúncio
            </h2>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video bg-[#0B1018] group">
            <div
              className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1596838132731-3301c3e12a49?auto=format&fit=crop&w=1200&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05080C] via-transparent to-[#05080C]/40" />
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            >
              <span className="w-16 h-16 rounded-full bg-emerald-500 text-[#05080C] flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform">
                <Play size={28} fill="currentColor" />
              </span>
              <span className="text-sm font-semibold text-white/80">
                Quer o vídeo completo? Chama no WhatsApp
              </span>
            </a>
          </div>
          <p className="text-center text-xs text-white/35 mt-4">
            Quando tiver o vídeo no YouTube, trocamos este bloco pelo embed — a estrutura já está pronta.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-4 py-16 md:py-24 bg-white/[0.02] border-y border-white/8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">Cenários</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            O texto muda com o que te fizeram
          </h2>
          <p className="text-white/50 mb-10 max-w-xl">
            Não é PDF genérico. O gerador ajusta o rascunho ao fato — autoexclusão, saque, laudo, app.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CASOS.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="rounded-2xl border border-white/10 bg-[#0B1018] p-5 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] transition-all"
                >
                  <Icon size={22} className="text-emerald-400 mb-4" />
                  <h3 className="font-bold text-[15px] mb-2">{c.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{c.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="como" className="relative z-10 px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">Fluxo</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12">Três passos. Sem teatro.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PASSOS.map((p) => (
              <div key={p.n} className="relative rounded-2xl border border-white/10 p-7 bg-gradient-to-b from-white/[0.06] to-transparent">
                <span className="text-5xl font-black text-white/10 absolute top-4 right-5">{p.n}</span>
                <p className="text-emerald-400 text-sm font-bold mb-2">{p.n}</p>
                <h3 className="text-xl font-bold mb-2">{p.t}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="preco" className="relative z-10 px-4 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[2rem] border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-[#0B1018] to-[#0B1018] p-8 md:p-12 overflow-hidden relative">
            <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">Acesso completo</p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                  R$ {PRECO}
                  <span className="text-lg font-medium text-white/40 ml-2">uma vez</span>
                </h2>
                <p className="text-white/55 mb-6">
                  Sem mensalidade. Até 3 petições · checklist · calculadora. Liberação pelo WhatsApp após o PIX.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {["Gerador de petição (PDF)", "Argumentos CDC + SPA", "Checklist de provas", "Calculadora de valores", "Garantia de 7 dias"].map((i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                      <CheckCircle2 size={17} className="text-emerald-400 shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors"
                  >
                    <MessageCircle size={18} /> Enviar comprovante no WhatsApp
                  </a>
                  <a
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-white/15 hover:bg-white/5 transition-colors"
                  >
                    Já paguei · entrar
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                  <p className="text-xs text-white/40 mb-3 uppercase tracking-wider">Pagar com PIX</p>
                  <p className="text-sm text-white/70 mb-1">
                    Valor: <strong className="text-white text-lg">R$ {PRECO}</strong>
                  </p>
                  <p className="text-xs text-white/40 mb-4">Beneficiário: Primex Sistemas LTDA</p>
                  <CopyPix />
                  <p className="text-[11px] text-white/35 mt-3 leading-relaxed">
                    Cole a chave no app do banco · PIX CNPJ · depois manda o print no WhatsApp{" "}
                    <a href={WA_LINK} className="text-emerald-400 underline underline-offset-2">
                      (86) 98811-7925
                    </a>
                    .
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 flex items-start gap-3">
                  <Eye size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-white/50 leading-relaxed">
                    Transparência: isto é software de documento, não assessoria jurídica. Sem advogado responsável.
                    Sem garantia de ganho de causa. Você revisa antes de protocolar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2 text-center">Direto</p>
          <h2 className="text-3xl font-black tracking-tight mb-10 text-center">Perguntas sem enrolação</h2>
          <div className="rounded-2xl border border-white/10 px-5 sm:px-6 bg-white/[0.02]">
            {FAQ.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            As bets não vão te explicar o Juizado.
          </h2>
          <p className="text-white/50 mb-8 text-lg">
            Eu já usei o caminho. O gerador é o mapa. O resto é a sua prova e a sua decisão.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#preco"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors"
            >
              Pagar R$ {PRECO} no PIX
              <ArrowRight size={18} />
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border border-white/15 hover:bg-white/5 transition-colors"
            >
              <MessageCircle size={18} className="text-emerald-400" />
              WhatsApp agora
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/8 px-4 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-[#05080C] text-[10px] font-black">
                RJ
              </div>
              <span className="font-semibold">RecuperaJogo</span>
            </div>
            <p className="text-xs text-white/40 max-w-sm leading-relaxed">
              Software da PRIMEX SISTEMAS LTDA · CNPJ {CNPJ_DISPLAY}. Não é sociedade de advogados.
              Não promete resultado judicial.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/45">
            <a href="/guia" className="hover:text-white transition-colors">Guia</a>
            <a href="/calculadora" className="hover:text-white transition-colors">Calculadora</a>
            <a href="/politica-privacidade" className="hover:text-white transition-colors">Privacidade</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp</a>
            <a href="/login" className="hover:text-white transition-colors">Entrar</a>
          </div>
        </div>
        <p className="max-w-6xl mx-auto mt-8 text-[11px] text-white/25">
          © {new Date().getFullYear()} Primex Sistemas · RecuperaJogo
        </p>
      </footer>

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white font-semibold text-sm px-5 py-3.5 shadow-[0_8px_40px_rgba(37,211,102,0.45)] hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
