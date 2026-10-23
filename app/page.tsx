"use client";

import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import CourtWinSection from "@/components/home/CourtWinSection";
import Navbar from "@/components/shared/Navbar";
import OfferSection from "@/components/home/OfferSection";
import { Check, X, Upload, Cpu, FileCheck2, HelpCircle } from "lucide-react";

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
      <Navbar />

      {/* HERO */}
      <HeroSection />

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
      <section id="como-funciona" className="py-24 px-6">
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
      </section>

      {/* OFERTA */}
      <OfferSection />

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 border-t border-white/5">
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
