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

const IMG = {
  tiger: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1600&q=80",
  tigerClose: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=900&q=80",
  chips: "https://images.unsplash.com/photo-1517232115160-ff93364542dd?auto=format&fit=crop&w=900&q=80",
  stress: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
  justice: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=900&q=80",
  docs: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
};

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
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-[15px] font-medium text-white/90 group-hover:text-white transition">{q}</span>
        <ChevronDown
          size={18}
          className={`text-white/30 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-[14px] leading-relaxed text-white/45 -mt-1 max-w-2xl">{a}</p>
      )}
    </div>
  );
}

function BetAppMock() {
  return (
    <div className="rounded-2xl overflow-hidden border border-red-500/30 bg-[#0d0d0d] shadow-2xl shadow-red-900/20">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-white/5">
        <span className="text-[11px] font-semibold text-white/40 tracking-wide">APP DE APOSTAS</span>
        <span className="text-[10px] font-bold text-red-400 bg-red-500/15 px-2 py-0.5 rounded">NEGATIVA</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="rounded-xl bg-gradient-to-br from-amber-900/40 to-red-950/50 border border-amber-500/20 p-4">
          <p className="text-[10px] text-amber-200/50 uppercase tracking-wider mb-1">Fortune Tiger · rodada</p>
          <p className="text-2xl font-bold text-white/90 tabular-nums">R$ 0,00</p>
          <p className="text-[11px] text-red-400 mt-1 font-medium">Saldo esgotado após a sessão</p>
        </div>
        <div className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5 flex items-center justify-between">
          <span className="text-[12px] text-white/50">Saque PIX</span>
          <span className="text-[11px] font-semibold text-red-400 flex items-center gap-1">
            <X size={12} strokeWidth={3} /> Recusado
          </span>
        </div>
        <div className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5 flex items-center justify-between">
          <span className="text-[12px] text-white/50">Autoexclusão</span>
          <span className="text-[11px] font-semibold text-amber-400">Ignorada pelo sistema</span>
        </div>
        <div className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5 flex items-center justify-between">
          <span className="text-[12px] text-white/50">Suporte</span>
          <span className="text-[11px] font-semibold text-white/30">Sem resposta útil</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070707] text-white antialiased selection:bg-emerald-500/30">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#070707]/85 backdrop-blur-2xl">
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

      <section className="relative min-h-[90vh] flex items-end pb-16 md:pb-24 pt-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.tiger} alt="Tigre — referência ao jogo do tigrinho" className="w-full h-full object-cover object-center scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/70 to-[#070707]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/95 via-[#070707]/55 to-transparent" />
          <div className="absolute inset-0 bg-red-950/20 mix-blend-multiply" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 w-full">
          <div className="max-w-2xl">
            <p className="text-red-400 text-[11px] font-semibold tracking-[0.22em] uppercase mb-5">
              Tigrinho · slots · bets · o jogo acaba no Juizado
            </p>
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-[-0.03em] leading-[1.02]">
              O tigrinho comeu seu dinheiro.
              <br />
              <span className="text-white/35">Agora documente e processa.</span>
            </h1>
            <p className="mt-6 text-[15px] md:text-lg text-white/55 max-w-lg leading-relaxed">
              Autoexclusão furada, saque bloqueado, depósito depois do bloqueio.
              Gerador de petição para o Juizado Especial — método de caso real com sentença.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href={LOGIN}
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-[15px] px-7 py-3.5 rounded-full transition-colors"
              >
                Gerar minha petição <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <a
                href="#prova"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 text-white/85 font-medium text-[15px] px-7 py-3.5 rounded-full transition-colors"
              >
                Ver a sentença real
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[11px] text-white/30 tracking-wide">
              <span className="inline-flex items-center gap-1.5">
                <Shield size={12} className="text-emerald-500" /> Garantia 7 dias
              </span>
              <span>PIX CNPJ {CNPJ}</span>
              <span>Não é advocacia</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-5 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {[
            { v: "R$ 3.000", l: "danos morais na sentença" },
            { v: "JEC", l: "Juizado Especial Cível" },
            { v: `R$ ${PRECO}`, l: "pagamento único" },
            { v: "3", l: "petições no acesso" },
          ].map((s) => (
            <div key={s.l} className="md:border-l md:border-white/[0.06] md:pl-8 first:md:border-0 first:md:pl-0">
              <p className="text-2xl md:text-[1.75rem] font-bold tracking-tight">{s.v}</p>
              <p className="text-[12px] text-white/35 mt-1.5">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-red-400/80 mb-4">
              O que os sites de apostas escondem
            </p>
            <h2 className="text-3xl md:text-[2.5rem] font-bold tracking-tight leading-[1.15] mb-5">
              Você pediu para parar.
              <br />
              <span className="text-white/40">O app continuou aberto.</span>
            </h2>
            <p className="text-[15px] text-white/50 leading-relaxed mb-8 max-w-md">
              Tigrinho, slots, live. Depósito fácil. Saque difícil. Autoexclusão que o sistema
              &quot;não viu&quot;. O CDC chama isso de falha na prestação do serviço — e o Juizado
              existe para quem quer protocolar sem advogado.
            </p>
            <ul className="space-y-3.5">
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

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <BetAppMock />
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                <img src={IMG.tigerClose} alt="Tigre — tigrinho" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-[11px] font-semibold text-white/90">
                  O tigrinho que viralizou nas bets
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                <img src={IMG.stress} alt="Pessoa sob pressão" className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-[11px] font-semibold text-white/90">
                  Depois da perda, a conta não fecha
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.chips} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-[#070707]/85" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="grid sm:grid-cols-3 gap-6 text-center sm:text-left">
            {[
              { t: "Depósito em 1 clique", d: "PIX entra na hora. Sair com o dinheiro é outra história." },
              { t: "Slots 24h no bolso", d: "Tigrinho e similares não param. O saldo, sim." },
              { t: "Suporte que enrola", d: "Protocolo, espera, resposta pronta. A peça formaliza." },
            ].map((x) => (
              <div key={x.t}>
                <p className="text-[15px] font-semibold text-white mb-1.5">{x.t}</p>
                <p className="text-[13px] text-white/40 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prova" className="bg-[#0c0c0c] border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400/90 mb-4">
            Prova real
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Sentença no Juizado Especial
          </h2>
          <p className="text-white/40 max-w-xl mb-12 text-[14px] leading-relaxed">
            4º JEC de Teresina/PI · processo público. Identificação omitida. Não garante o mesmo
            resultado no seu caso.
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-7 md:p-9">
              <p className="text-[11px] text-white/30 mb-5 font-mono tracking-tight">
                0804781-17.2026.8.18.0140 · Sortenabet Gaming Brasil S.A.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white/90 mb-6">
                Autoexclusão em dezembro/2025. Em janeiro/2026 a casa ainda aceitou depósito e
                apostas. Sentença: danos morais procedentes —{" "}
                <span className="text-emerald-400">R$ 3.000,00</span>.
              </p>
              <p className="text-[13px] text-white/35">
                CDC art. 14 · falha na prestação do serviço · fortuito interno
              </p>
            </div>
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[240px]">
              <img src={IMG.justice} alt="Justiça" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-4xl font-bold text-emerald-400 tracking-tight">R$ 3 mil</p>
                <p className="text-sm text-white/55 mt-1">danos morais · procedente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">
          Como funciona
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-14 max-w-md">
          Três passos. Sem juridiquês.
        </h2>
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {[
            { n: "01", t: "Entre com o e-mail", d: "Conta em segundos. Sem senha para decorar." },
            {
              n: "02",
              t: "Pague R$ 137",
              d: `PIX no CNPJ ${CNPJ} ou cartão. Envie o comprovante no WhatsApp.`,
            },
            {
              n: "03",
              t: "Gere a petição",
              d: "Até 3 rascunhos em PDF. Você revisa e protocola no Juizado.",
            },
          ].map((p) => (
            <div key={p.n}>
              <span className="text-[11px] font-mono text-emerald-400/80 tracking-widest">{p.n}</span>
              <h3 className="text-lg font-semibold mt-3 mb-2">{p.t}</h3>
              <p className="text-[14px] text-white/40 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#0c0c0c]">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
          <div className="max-w-md mx-auto">
            <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-10 text-center">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400/80 mb-4">
                Acesso completo
              </p>
              <p className="text-5xl md:text-6xl font-bold tracking-tight">R$ {PRECO}</p>
              <p className="text-[13px] text-white/35 mt-2 mb-8">
                pagamento único · PIX Primex ou cartão
              </p>
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
              <p className="text-[11px] text-white/25 mt-5">
                Primex Sistemas LTDA · não promete resultado judicial
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-24 md:py-28">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">Perguntas frequentes</h2>
        <div>
          {FAQ.map((item) => (
            <FaqRow key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.docs} alt="" className="w-full h-full object-cover opacity-[0.15]" />
          <div className="absolute inset-0 bg-[#070707]/88" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Pronto para montar a peça?
          </h2>
          <p className="text-white/45 mb-9 text-[15px]">
            E-mail → PIX Primex → gerador. Sem enrolação.
          </p>
          <Link
            href={LOGIN}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-400 text-black font-semibold text-[15px] px-8 py-3.5 rounded-full transition-colors"
          >
            Ir para o login <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-12">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-8 text-[12px] text-white/30">
          <div>
            <p className="text-white/55 font-medium mb-1.5">RecuperaJogo · Primex Sistemas LTDA</p>
            <p>CNPJ {CNPJ}</p>
            <p className="mt-3 max-w-sm leading-relaxed">
              Software de documento. Não é sociedade de advogados. Não promete resultado judicial.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
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
