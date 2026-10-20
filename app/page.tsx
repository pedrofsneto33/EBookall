"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, MessageCircle, Shield, X } from "lucide-react";

const WA =
  "https://wa.me/5586988117925?text=" +
  encodeURIComponent("Oi! Preciso de suporte no RecuperaJogo.");
const CNPJ = "55.536.885/0001-30";
const PRECO = "137";
const LOGIN = "/login";

const FAQ = [
  {
    q: "Isso é advocacia?",
    a: "Não. É software da Primex Sistemas LTDA. Você revisa o rascunho e protocola em nome próprio no Juizado Especial.",
  },
  {
    q: "Preciso de advogado?",
    a: "Em causas até 20 salários mínimos no Juizado, a lei permite protocolar sozinho (jus postulandi). Caso maior ou complexo: advogado ou Defensoria.",
  },
  {
    q: "Como pago?",
    a: `R$ ${PRECO} no PIX da Primex (CNPJ ${CNPJ}). Copia a chave, paga e manda o comprovante no WhatsApp. Também aceita cartão.`,
  },
  {
    q: "Tem reembolso?",
    a: "Sim, 7 dias. Não gostou do rascunho? Devolvemos pelo WhatsApp.",
  },
  {
    q: "Funciona sem laudo?",
    a: "Sim, em autoexclusão violada e falha de serviço (CDC). Laudo reforça quando existir, mas não é obrigatório em todo caso.",
  },
];

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.08]">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 py-5 text-left group">
        <span className="text-[15px] font-medium text-white/90 group-hover:text-white transition">{q}</span>
        <ChevronDown size={18} className={`text-white/30 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-5 text-[14px] leading-relaxed text-white/45 -mt-1 max-w-2xl">{a}</p>}
    </div>
  );
}

function TigrinhoSlot({ compact = false }: { compact?: boolean }) {
  const cells = ["🍊", "🧧", "💰", "🧨", "🐯", "💰", "🍊", "🧧", "🐯"];
  return (
    <div
      className="relative rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-[0_0_40px_rgba(234,179,8,0.15)]"
      style={{
        background: "linear-gradient(160deg, #3b1c0a 0%, #1a0a05 40%, #0d0502 100%)",
      }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-amber-500/20 bg-black/40">
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">🐯</span>
          <span className="text-[11px] font-bold text-amber-300 tracking-wide">FORTUNE TIGER</span>
        </div>
        <span className="text-[10px] font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full">SEM SALDO</span>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-black/50 p-2 border border-amber-600/30">
          {cells.map((c, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg flex items-center justify-center text-2xl sm:text-3xl ${
                c === "🐯"
                  ? "bg-gradient-to-b from-amber-600/40 to-amber-900/40 border border-amber-400/40"
                  : "bg-gradient-to-b from-red-950/60 to-black/40 border border-white/5"
              }`}
            >
              {c}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex-1 rounded-lg bg-black/50 border border-white/10 px-3 py-2">
            <p className="text-[9px] text-white/40 uppercase tracking-wider">Saldo</p>
            <p className="text-lg font-bold text-red-400 tabular-nums">R$ 0,00</p>
          </div>
          <div className="flex-1 rounded-lg bg-black/50 border border-white/10 px-3 py-2">
            <p className="text-[9px] text-white/40 uppercase tracking-wider">Última rodada</p>
            <p className="text-lg font-bold text-white/70 tabular-nums">− R$ 50</p>
          </div>
        </div>

        <div className="mt-3 rounded-full bg-gradient-to-r from-amber-700/50 to-amber-600/30 border border-amber-500/30 py-2.5 text-center">
          <span className="text-[12px] font-bold text-amber-200/50 tracking-widest">GIRAR · BLOQUEADO</span>
        </div>
      </div>
    </div>
  );
}

function BetNegatives() {
  return (
    <div className="rounded-2xl overflow-hidden border border-red-500/25 bg-[#0c0c0c]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-white/5">
        <span className="text-[11px] font-semibold text-white/40">APP DE APOSTAS</span>
        <span className="text-[10px] font-bold text-red-400 bg-red-500/15 px-2 py-0.5 rounded">NEGATIVA</span>
      </div>
      <div className="p-4 space-y-2.5">
        {[
          { label: "Saque PIX", value: "Recusado", bad: true },
          { label: "Autoexclusão", value: "Ignorada", bad: true },
          { label: "Depósito pós-bloqueio", value: "Aceito", bad: true },
          { label: "Suporte", value: "Sem solução", bad: false },
        ].map((row) => (
          <div key={row.label} className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5 flex items-center justify-between">
            <span className="text-[12px] text-white/50">{row.label}</span>
            <span className={`text-[11px] font-semibold flex items-center gap-1 ${row.bad ? "text-red-400" : "text-white/35"}`}>
              {row.bad && <X size={12} strokeWidth={3} />}
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070707] text-white antialiased selection:bg-emerald-500/30">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#070707]/90 backdrop-blur-2xl">
        <div className="mx-auto max-w-6xl px-5 h-[3.5rem] flex items-center justify-between">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            Recupera<span className="text-emerald-400">Jogo</span>
          </Link>
          <div className="flex items-center gap-5">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hidden sm:block text-xs text-white/35 hover:text-white transition">
              Suporte
            </a>
            <Link href={LOGIN} className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-emerald-400 transition-colors">
              Entrar
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(180,80,20,0.25)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(120,20,20,0.2)_0%,_transparent_50%)]" />

        <div className="relative mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-amber-400 text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
                Tigrinho · Fortune Tiger · slots nas bets
              </p>
              <h1 className="text-[2.4rem] sm:text-5xl md:text-[3.25rem] font-bold tracking-[-0.03em] leading-[1.05]">
                O tigrinho comeu
                <br />
                seu dinheiro.
                <br />
                <span className="text-white/35">Agora documente e processa.</span>
              </h1>
              <p className="mt-5 text-[15px] md:text-base text-white/50 max-w-md leading-relaxed">
                Autoexclusão furada, saque recusado, depósito depois do bloqueio.
                Gerador de petição pro Juizado — baseado em caso real com sentença.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href={LOGIN}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-[15px] px-7 py-3.5 rounded-full transition-colors"
                >
                  Gerar minha petição <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
                <a
                  href="#prova"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 hover:bg-white/5 text-white/80 font-medium text-[15px] px-7 py-3.5 rounded-full transition-colors"
                >
                  Ver a sentença
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-white/30">
                <span className="inline-flex items-center gap-1.5">
                  <Shield size={12} className="text-emerald-500" /> Garantia 7 dias
                </span>
                <span>PIX CNPJ {CNPJ}</span>
                <span>Não é advocacia</span>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[280px] sm:max-w-[300px]">
                <div className="rounded-[2rem] border-[3px] border-white/15 bg-black p-2 shadow-2xl shadow-amber-900/30">
                  <div className="rounded-[1.5rem] overflow-hidden bg-[#0a0a0a]">
                    <div className="h-6 bg-black flex items-center justify-center">
                      <div className="w-16 h-1 rounded-full bg-white/20" />
                    </div>
                    <TigrinhoSlot />
                    <div className="h-5 bg-black" />
                  </div>
                </div>
                <p className="text-center text-[11px] text-white/30 mt-3">
                  Estilo do jogo · não é arte oficial da PG Soft
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "R$ 3.000", l: "danos morais na sentença" },
            { v: "JEC", l: "Juizado Especial Cível" },
            { v: `R$ ${PRECO}`, l: "pagamento único" },
            { v: "3", l: "petições no acesso" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl md:text-[1.65rem] font-bold tracking-tight">{s.v}</p>
              <p className="text-[12px] text-white/35 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-red-400/90 mb-4">
              O que as bets escondem
            </p>
            <h2 className="text-3xl md:text-[2.4rem] font-bold tracking-tight leading-[1.15] mb-5">
              Você pediu pra parar.
              <br />
              <span className="text-white/40">O tigrinho continuou rodando.</span>
            </h2>
            <p className="text-[15px] text-white/50 leading-relaxed mb-8 max-w-md">
              Fortune Tiger e outros slots: depósito em um clique, saque enrolado,
              autoexclusão que o sistema &quot;não viu&quot;. CDC trata como falha de serviço —
              Juizado Especial permite protocolar sem advogado (até o limite legal).
            </p>
            <ul className="space-y-3">
              {[
                "Autoexclusão centralizada furada",
                "Depósito depois do pedido de bloqueio",
                "Saque travado ou respostas evasivas",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-white/70">
                  <span className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center shrink-0">
                    <X size={11} className="text-red-400" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <BetNegatives />
            <div className="rounded-2xl border border-amber-500/20 overflow-hidden">
              <TigrinhoSlot />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#0c0c0c]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { t: "Depósito em 1 clique", d: "PIX entra na hora. Sair com o dinheiro é outra história." },
              { t: "Tigrinho 24h no bolso", d: "O slot não para. O saldo, sim — e o saque some." },
              { t: "Suporte que enrola", d: "Protocolo, espera, texto pronto. A petição formaliza." },
            ].map((x) => (
              <div key={x.t}>
                <p className="text-[15px] font-semibold mb-1.5">{x.t}</p>
                <p className="text-[13px] text-white/40 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prova" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400/90 mb-4">Prova real</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Sentença no Juizado Especial</h2>
        <p className="text-white/40 max-w-xl mb-10 text-[14px] leading-relaxed">
          4º JEC de Teresina/PI · processo público. Identificação omitida. Não garante o mesmo resultado no seu caso.
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-7 md:p-9 max-w-3xl">
          <p className="text-[11px] text-white/30 mb-4 font-mono">0804781-17.2026.8.18.0140 · Sortenabet Gaming Brasil S.A.</p>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-white/90 mb-4">
            Autoexclusão em dezembro/2025. Em janeiro/2026 a casa ainda aceitou depósito e apostas.
            Sentença: danos morais procedentes — <span className="text-emerald-400">R$ 3.000,00</span>.
          </p>
          <p className="text-[13px] text-white/35">CDC art. 14 · falha na prestação do serviço</p>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#0c0c0c]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">Como funciona</p>
          <h2 className="text-3xl font-bold tracking-tight mb-12">Três passos. Sem juridiquês.</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: "01", t: "Entre com o e-mail", d: "Conta em segundos. Sem senha pra decorar." },
              { n: "02", t: "Pague R$ 137", d: `PIX no CNPJ ${CNPJ} ou cartão. Manda o comprovante no WhatsApp.` },
              { n: "03", t: "Gere a petição", d: "Até 3 rascunhos em PDF. Você revisa e protocola no Juizado." },
            ].map((p) => (
              <div key={p.n}>
                <span className="text-[11px] font-mono text-emerald-400/80 tracking-widest">{p.n}</span>
                <h3 className="text-lg font-semibold mt-2 mb-1.5">{p.t}</h3>
                <p className="text-[14px] text-white/40 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06]">
        <div className="mx-auto max-w-md px-5 py-20 md:py-24 text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400/80 mb-4">Acesso completo</p>
          <p className="text-5xl md:text-6xl font-bold tracking-tight">R$ {PRECO}</p>
          <p className="text-[13px] text-white/35 mt-2 mb-8">pagamento único · PIX Primex ou cartão</p>
          <ul className="text-left space-y-3 mb-9 text-[14px] text-white/60">
            {[
              "Até 3 petições em PDF",
              "Argumentos CDC + regulação SPA",
              "Checklist de provas",
              "Garantia de 7 dias",
              `PIX chave CNPJ ${CNPJ}`,
            ].map((i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check size={15} className="text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                {i}
              </li>
            ))}
          </ul>
          <Link
            href={LOGIN}
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-[15px] px-6 py-3.5 rounded-full transition-colors"
          >
            Começar agora <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
          <p className="text-[11px] text-white/25 mt-5">Primex Sistemas LTDA · não promete resultado judicial</p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-20 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Perguntas frequentes</h2>
        {FAQ.map((item) => (
          <FaqRow key={item.q} q={item.q} a={item.a} />
        ))}
      </section>

      <section className="border-t border-white/[0.06] bg-[#0c0c0c]">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Pronto para montar a peça?</h2>
          <p className="text-white/45 mb-8 text-[15px]">E-mail → PIX Primex → gerador.</p>
          <Link
            href={LOGIN}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-400 text-black font-semibold text-[15px] px-8 py-3.5 rounded-full transition-colors"
          >
            Ir para o login <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-6 text-[12px] text-white/30">
          <div>
            <p className="text-white/55 font-medium mb-1">RecuperaJogo · Primex Sistemas LTDA</p>
            <p>CNPJ {CNPJ}</p>
            <p className="mt-2 max-w-sm leading-relaxed">
              Software de documento. Não é sociedade de advogados. Não promete resultado judicial.
            </p>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/politica-privacidade" className="hover:text-white transition">Privacidade</Link>
            <Link href="/guia" className="hover:text-white transition">Guia</Link>
            <a href="https://www.primexsistemas.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Primex</a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp</a>
          </div>
        </div>
      </footer>

      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} className="text-[#070707]" />
      </a>
    </div>
  );
}
