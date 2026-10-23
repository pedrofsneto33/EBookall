"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { UploadCloud, Cpu, FileCheck } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Envie os dados",
    text: "Faça o upload do documento ou PDF do caso. Nosso sistema lê o que você enviou em segundos.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "A IA processa",
    text: "Nossa inteligência artificial cruza os dados com a jurisprudência e monta a tese automaticamente.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Receba o resultado",
    text: "Documento pronto para assinatura. Rápido, seguro e no formato que o juiz quer ler.",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-zinc-950 py-24 md:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00C853]/10 blur-[140px] rounded-full" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-sora text-4xl md:text-5xl font-bold tracking-tight text-white">
            Da dor de cabeça à petição pronta em 3 passos.
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            Sem burocracia. Sem planilhas. Sem erro humano.
          </p>
        </div>

        <div className="relative">
          {/* Linha conectora */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-green-500/10 -translate-y-1/2" />
          <motion.div
            style={{ width: lineWidth }}
            className="hidden md:block absolute top-1/2 left-0 h-[2px] bg-green-500/40 -translate-y-1/2 origin-left"
          />

          <div className="grid md:grid-cols-3 gap-6 relative">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.18, ease: "easeOut" }}
                  className="clip-custom relative bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(0,200,83,0.10)] transition-all duration-300"
                >
                  <span className="absolute top-2 right-4 text-6xl font-black text-zinc-800 select-none pointer-events-none">
                    {step.number}
                  </span>
                  <Icon className="text-green-500 mb-5" size={40} />
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-[15px] leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
