"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, MessageCircle, Shield } from "lucide-react";

const WA =
  "https://wa.me/5586988117925?text=" +
  encodeURIComponent("Oi! Preciso de suporte no RecuperaJogo.");
const CNPJ = "55.536.885/0001-30";
const PRECO = "137";
const LOGIN = "/login";

/** Imagens alinhadas ao tema bets / dinheiro / justiça (Unsplash License) */
const IMG = {
  hero: "https://images.unsplash.com/photo-1596838132731-3301c3fd4300?auto=format&fit=crop&w=1800&q=80",
  loss: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1000&q=80",
  chips: "https://images.unsplash.com/photo-1517232115160-ff93364542dd?auto=format&fit=crop&w=1000&q=80",
  justice: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=900&q=80",
  docs: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
  roulette: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1200&q=80",
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070707] text-white antialiased selection:bg-emerald-500/30">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#070707]/80 backdrop-blur-2xl">
        <div className="mx-auto max-w-6xl px-5 h-[3.5rem] flex items-center justify-between">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            Recupera<span className="text-emerald-400">Jogo</span>
          </Link>
          <div className="flex items-center gap-5">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-xs text-white/35 hover:text-white transition"
            >
              Suporte
            </a>
            <Link
              href={LOGIN}
              className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-emerald-400 transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>
      </header>

      <section className="relative min-h-[88vh] flex items-end pb-16 md:pb-24 pt-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMG.hero}
            alt="Mesa de apostas"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/75 to-[#070707]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/90 via-[#070707]/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 w-full">
          <div className="max-w-2xl">
            <p className="text-emerald-400/90 text-[11px] font-semibold tracking-[0.22em] uppercase mb-5">
              Primex Sistemas · campanha contra as bets
            </p>
            <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.1rem] font-bold tracking-[-0.03em] leading-[1.02]">
              As bets te consumiram.
              <br />
              <span className="text-white/35">O Juizado responde.</span>
            </h1>
            <p className="mt-6 text-[15px] md:text-lg text-white/55 max-w-lg leading-relaxed">
              Gerador de petição para o Juizado Especial Cível. Método usado em processo real com
              sentença. Você revisa e protocola em nome próprio.
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">
              O que as bets fazem
            </p>
            <h2 className="text-3xl md:text-[2.5rem] font-bold tracking-tight leading-[1.15] mb-5">
              Você pediu para parar.
              <br />
              <span className="text-white/40">Elas continuaram abertas.</span>
            </h2>
            <p className="text-[15px] text-white/50 leading-relaxed mb-8 max-w-md">
              Autoexclusão ignorada. Depósito aceito depois do bloqueio. Saque enrolado. O CDC chama
              isso de falha na prestação do serviço — e o Juizado existe para quem quer protocolar
              sem advogado, dentro do limite legal.
            </p>
            <ul className="space-y-3.5">
              {[
                "Autoexclusão centralizada furada",
                "Depósito depois do pedido de bloqueio",
                "Saque travado ou respostas evasivas",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-white/70">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-emerald-400" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img src={IMG.chips} alt="Fichas de cassino" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8">
              <img src={IMG.loss} alt="Dinheiro e risco" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-[12px] text-white/80 font-medium leading-snug">
                O dinheiro sai. O app continua.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="prova" className="relative border-y border-white/[0.06]">
        <div className="absolute inset-0 opacity-30">
          <img src={IMG.roulette} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#070707]/92" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400/90 mb-4">
            Prova real
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Sentença no Juizado Especial
          </h2>
          <p className="text-white/40 max-w-xl mb-12 text-[14px] leading-relaxed">
            4º JEC de Teresina/PI · processo público. Identificação omitida neste site. Não garante o
            mesmo resultado no seu caso.
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-7 md:p-9 backdrop-blur-sm">
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
              <img
                src={IMG.justice}
                alt="Balança da justiça"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
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
            {
              n: "01",
              t: "Entre com o e-mail",
              d: "Conta em segundos. Sem senha para decorar.",
            },
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
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
          Perguntas frequentes
        </h2>
        <div>
          {FAQ.map((item) => (
            <FaqRow key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.docs} alt="" className="w-full h-full object-cover opacity-[0.18]" />
          <div className="absolute inset-0 bg-[#070707]/85" />
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
            <p className="text-white/55 font-medium mb-1.5">
              RecuperaJogo · Primex Sistemas LTDA
            </p>
            <p>CNPJ {CNPJ}</p>
            <p className="mt-3 max-w-sm leading-relaxed">
              Software de documento. Não é sociedade de advogados. Não promete resultado judicial.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link href="/politica-privacidade" className="hover:text-white transition">
              Privacidade
            </Link>
            <Link href="/guia" className="hover:text-white transition">
              Guia
            </Link>
            <a
              href="https://www.primexsistemas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Primex
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              WhatsApp
            </a>
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
