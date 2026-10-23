"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import CourtWinSection from "@/components/home/CourtWinSection";
import OfferSection from "@/components/home/OfferSection";
import { ArrowRight, Check, X, Upload, Cpu, FileCheck2, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Preciso de advogado?",
    a: "Não. O RecuperaJogo gera a petição para o Juizado Especial Cível, onde a presença de advogado não é obrigatória em causas até 20 salários mínimos.",
  },
  {
    q: "E se a bet fechar?",
    a: "A petição é direcionada à pessoa jurídica identificada (CNPJ, razão social). Se a operação for encerrada, o processo segue contra o responsável legal e seus sócios, quando aplicável.",
  },
  {
    q: "Serve para qualquer casa?",
    a: "Priorizamos casas licenciadas no Brasil. Para plataformas ilegais/offshore a cobrança é praticamente inviável — não vendemos recuperação fácil de tarja.",
  },
];

function CountUp({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  useState(() => {
    const start = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    return 0;
  });
  const formatted = Math.round(value).toLocaleString("pt-BR");
  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#05080C] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#05080C]/80 backdrop-blur border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-black tracking-tight text-lg">RecuperaJogo</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-zinc-300 hover:text-white px-3 py-2">
              Entrar
            </Link>
            <Link
              href="/login"
              className="clip-custom bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-sm px-5 py-2.5 transition-colors"
            >
              Gerar Petição
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-500/15 blur-[140px] rounded-full" />
        <div className="pointer-events-none absolute top-20 -left-40 w-[400px] h-[400px] bg-red-500/10 blur-[120px] rounded-full" />

        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400 mb-6">
              Tecnologia jurídica • Sem advogado
            </p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              As bets levaram seu dinheiro?{" "}
              <span className="text-emerald-400">Cobre na Justiça.</span>{" "}
              <span className="text-red-500">Sem advogado.</span>
            </h1>
            <p className="mt-6 text-xl text-zinc-400 max-w-xl leading-relaxed">
              O RecuperaJogo monta sua petição para o Juizado Especial por R$ 137.
              Você só revisa, assina e protocola.
            </p>

            <div className="mt-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                <Link
                  href="/login"
                  className="clip-custom inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-lg px-8 py-4 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                >
                  Recuperar meu Dinheiro Agora
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <p className="mt-3 text-sm text-zinc-500">
                Não é advocacia. É tecnologia jurídica. Sem juridiquês.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="clip-custom bg-gradient-to-br from-red-950/40 to-zinc-900 border border-red-500/30 p-6">
              <p className="text-[11px] uppercase tracking-wider text-red-400 mb-2">
                Perdido em bets no Brasil
              </p>
              <p className="text-5xl md:text-6xl font-black text-red-500">
                R$ 143 Bi
              </p>
            </div>
            <div className="clip-custom bg-zinc-900 border border-white/10 p-6">
              <p className="text-[11px] uppercase tracking-wider text-zinc-400 mb-2">
                Brasileiros endividados
              </p>
              <p className="text-5xl md:text-6xl font-black text-white">
                1,8M
              </p>
            </div>
            <div className="clip-custom col-span-2 bg-gradient-to-br from-emerald-950/40 to-zinc-900 border border-emerald-500/30 p-6">
              <p className="text-[11px] uppercase tracking-wider text-emerald-400 mb-2">
                Valor médio recuperado
              </p>
              <p className="text-6xl md:text-7xl font-black text-emerald-400">
                R$ 3.000
              </p>
            </div>
          </div>
        </div>
      </section>

      <CourtWinSection />

      {/* PROVA */}
      <section className="border-y border-white/5 bg-gradient-to-b from-zinc-950 to-[#05080C] py-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400 mb-4">
            Autoridade
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            A Justiça já reconheceu. Nós já vencemos.
          </h2>
          <div className="mt-12 clip-custom inline-block bg-zinc-900 border border-emerald-500/40 px-10 py-8 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
            <p className="text-7xl md:text-8xl font-black text-emerald-400">
              R$ 3.000
            </p>
            <p className="mt-2 text-zinc-400 max-w-md mx-auto">
              Sentença real de um caso de autoexclusão ignorada. O juiz mandou a
              bet pagar. Você pode ser o próximo.
            </p>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16">
            Como funciona
          </h2>

          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl font-black text-zinc-800">01</span>
                  <Upload className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-3">
                  Escolha seu caso
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Autoexclusão, ludopatia ou saldo retido. Selecione a tese que se
                  encaixa na sua situação.
                </p>
              </div>
              <div className="clip-custom bg-zinc-900 border border-white/10 p-8 h-48 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 w-full">
                  {["Autoexclusão", "Ludopatia", "Saldo retido"].map((t) => (
                    <div
                      key={t}
                      className="rounded bg-zinc-800 border border-zinc-700 p-3 text-center text-xs text-zinc-300"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 clip-custom bg-zinc-900 border border-white/10 p-8 h-48 flex items-center justify-center">
                <div className="space-y-3 w-full">
                  <div className="h-3 rounded bg-zinc-800 w-3/4" />
                  <div className="h-3 rounded bg-emerald-500/40 w-1/2" />
                  <div className="h-3 rounded bg-zinc-800 w-2/3" />
                  <div className="mt-4 text-center text-emerald-400 font-bold">
                    R$ 3.000 calculado
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl font-black text-zinc-800">02</span>
                  <Cpu className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-3">
                  Preencha a história
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  O sistema calcula o valor e gera a peça jurídica automaticamente.
                  Sem juridiquês.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl font-black text-zinc-800">03</span>
                  <FileCheck2 className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-3">
                  Baixe e protocole
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Pelo celular, no site do Juizado. Assine e envie. Pronto.
                </p>
              </div>
              <div className="clip-custom bg-zinc-900 border border-emerald-500/30 p-8 h-48 flex items-center justify-center">
                <div className="text-center">
                  <FileCheck2 className="text-emerald-400 mx-auto mb-3" size={48} />
                  <p className="text-sm text-zinc-400">peticao.pdf pronto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <OfferSection />

      {/* FAQ */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-10">
            <HelpCircle className="text-emerald-400" size={28} />
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Perguntas frequentes
            </h2>
          </div>
          <div className="divide-y divide-white/10">
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left"
                  >
                    <span className={`text-lg font-bold ${open ? "text-emerald-400" : "text-white"}`}>
                      {item.q}
                    </span>
                    {open ? (
                      <X className="text-emerald-400 shrink-0" size={20} />
                    ) : (
                      <span className="text-zinc-500 shrink-0 text-2xl leading-none">+</span>
                    )}
                  </button>
                  {open && (
                    <p className="mt-3 text-zinc-400 leading-relaxed">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-white/5 text-center text-zinc-600 text-sm">
        © {new Date().getFullYear()} RecuperaJogo. Tecnologia jurídica.
      </footer>
    </div>
  );
}
