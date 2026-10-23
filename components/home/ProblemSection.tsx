"use client";

import { motion } from "motion/react";
import { X, Check, AlertTriangle } from "lucide-react";

const PAIN_POINTS = [
  "Análise manual que leva semanas",
  "Erros humanos em cálculos",
  "Prazos perdidos e processos arquivados",
  "Custo altíssimo com equipe extra",
];

const GAINS = [
  "Análise automática em minutos",
  "Precisão absoluta com IA",
  "Prazos controlados e alertas",
  "Economia de até 80% em custos",
];

export default function ProblemSection() {
  return (
    <section className="relative bg-zinc-900 py-24 md:py-32 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <h2 className="font-sora text-4xl md:text-5xl font-bold tracking-tight text-white">
            Pare de perder dinheiro com o método antigo.
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            O sistema atual está quebrado. Veja a diferença:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Lado esquerdo - método tradicional */}
          <motion.div
            initial={{ opacity: 0.2, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="rounded-2xl bg-zinc-950 border border-red-900/50 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-red-400" size={22} />
              <h3 className="text-xl font-semibold text-red-400">
                O Método Tradicional
              </h3>
            </div>
            <ul className="space-y-4">
              {PAIN_POINTS.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="flex items-start gap-3 text-zinc-500"
                >
                  <X className="text-red-500 mt-0.5 shrink-0" size={18} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Lado direito - nossa solução */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
            className="clip-custom relative bg-gradient-to-br from-zinc-950 to-green-950/20 border border-green-500/50 p-8 shadow-[0_0_40px_rgba(0,200,83,0.10)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Check className="text-green-400" size={22} />
              <h3 className="text-xl font-bold text-green-400">
                Com a Nossa Tecnologia
              </h3>
            </div>
            <ul className="space-y-4">
              {GAINS.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.4 + i * 0.12 }}
                  className="flex items-start gap-3 text-zinc-200"
                >
                  <Check className="text-green-400 mt-0.5 shrink-0" size={18} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
