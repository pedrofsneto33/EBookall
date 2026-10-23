"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Quote, FileText, TrendingUp, Zap } from "lucide-react";

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, prefix = "", suffix = "", duration = 1600 }: CountUpProps) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);
  return (
    <span>
      {prefix}
      {Math.round(value).toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export default function ResultsSection() {
  return (
    <section className="relative bg-zinc-950 py-24 md:py-32 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <h2 className="font-sora text-4xl md:text-5xl font-bold tracking-tight text-white">
            Quem usa, não volta pro papel.
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            Números reais de escritórios que mudaram a rotina.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Bloco 1 - depoimento */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="clip-custom md:col-span-2 relative bg-gradient-to-br from-zinc-900 to-zinc-800 border border-green-500/40 p-8 md:p-10 overflow-hidden"
          >
            <Quote className="absolute top-4 left-4 text-green-500/20" size={80} />
            <p className="relative font-sora text-2xl md:text-3xl leading-relaxed text-white">
              “A gente levava dois dias pra montar uma petição. Com o sistema, o
              documento sai em 15 minutos. Foi a melhor decisão do escritório este
              ano.”
            </p>
            <p className="relative mt-6 text-zinc-400">Dra. Camila R., Sócia-fundadora</p>
          </motion.div>

          {/* Bloco 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between"
          >
            <FileText className="text-zinc-500" size={28} />
            <div className="mt-6">
              <p className="text-5xl font-bold text-white">
                <CountUp end={10000} prefix="+" />
              </p>
              <p className="text-zinc-400 mt-2">Petições geradas</p>
            </div>
          </motion.div>

          {/* Bloco 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between"
          >
            <TrendingUp className="text-green-500" size={28} />
            <div className="mt-6">
              <p className="text-5xl font-bold text-green-500">
                <CountUp end={98} suffix="%" />
              </p>
              <p className="text-zinc-400 mt-2">Índice de aprovação</p>
            </div>
          </motion.div>

          {/* Bloco 4 - horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="md:col-span-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 flex items-center gap-6"
          >
            <Zap className="text-white shrink-0" size={40} />
            <div>
              <p className="text-5xl font-bold text-white">3x</p>
              <p className="text-zinc-400 mt-1">Mais rápido que o método manual</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
