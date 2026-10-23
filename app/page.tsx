"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import { motion } from "motion/react";

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
}: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("pt-BR");

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

const DATA_BLOCKS: {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  label: string;
  tone: "green" | "white";
}[] = [
  { value: 143, prefix: "R$ ", suffix: "bi", decimals: 0, label: "Perdidos em prazos", tone: "green" },
  { value: 39000, prefix: "+", suffix: "", decimals: 0, label: "Processos otimizados", tone: "white" },
  { value: 80, prefix: "", suffix: "%", decimals: 0, label: "Redução de tempo", tone: "green" },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-40 right-0 w-[640px] h-[640px] bg-[#00C853]/20 blur-[140px] rounded-full" />

      <section className="relative mx-auto max-w-7xl px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#00C853] mb-6">
              Automação jurídica com IA
            </p>
            <h1 className="font-sora text-6xl md:text-8xl font-bold tracking-tight leading-[0.95]">
              Recupere o que é{" "}
              <span className="text-[#00C853]">seu</span>.
            </h1>
            <p className="mt-6 text-xl text-zinc-400 max-w-xl leading-relaxed">
              Automação inteligente para petições. Reduza o tempo de análise em 80%
              com nossa IA.
            </p>

            <div className="mt-10 flex flex-wrap gap-6">
              {DATA_BLOCKS.map((block) => (
                <div key={block.label} className="min-w-[120px]">
                  <p
                    className={`text-4xl font-bold tracking-tight ${
                      block.tone === "green" ? "text-green-500" : "text-white"
                    }`}
                  >
                    <CountUp
                      end={block.value}
                      prefix={block.prefix}
                      suffix={block.suffix}
                      decimals={block.decimals}
                    />
                  </p>
                  <p className="text-[12px] text-zinc-500 mt-1 uppercase tracking-wide">
                    {block.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="clip-custom inline-flex items-center justify-center bg-[#00C853] hover:bg-[#00E676] text-black font-semibold text-[15px] px-8 py-4 transition-colors"
              >
                Começar Agora
              </Link>
              <Link
                href="#como-funciona"
                className="inline-flex items-center justify-center border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-medium text-[15px] px-8 py-4 transition-colors"
              >
                Ver como funciona
              </Link>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="clip-custom relative bg-gradient-to-br from-[#00C853]/10 via-zinc-900 to-black border border-[#00C853]/20 p-6 shadow-[0_0_60px_rgba(0,200,83,0.12)]"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[12px] font-mono text-zinc-400">
                dashboard.recuperajogo
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-3 rounded bg-zinc-800 w-3/4" />
              <div className="h-3 rounded bg-zinc-800 w-1/2" />
              <div className="h-3 rounded bg-[#00C853]/40 w-2/3" />
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[40, 72, 58].map((v, i) => (
                <div key={i} className="rounded bg-zinc-900 border border-zinc-800 p-3 text-center">
                  <p className="text-lg font-bold text-[#00C853]">{v}%</p>
                  <p className="text-[10px] text-zinc-500 mt-1">módulo {i + 1}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ProblemSection />
      <HowItWorksSection />
    </div>
  );
}
