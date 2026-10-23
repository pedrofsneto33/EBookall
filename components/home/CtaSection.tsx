"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const TITLE_WORDS = ["Pronto", "para", "recuperar", "o", "que", "é", "seu?"];

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-zinc-950 to-black py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-[#00C853]/20 blur-[160px] rounded-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[520px] h-[520px] rounded-full border border-[#00C853]/10" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-sora text-5xl md:text-7xl font-bold leading-tight text-white">
          {TITLE_WORDS.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-6 text-lg text-zinc-300"
        >
          Junte-se aos escritórios que já economizam tempo e dinheiro todos os dias.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-10"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Link
              href="/login"
              className="clip-custom inline-flex items-center gap-2 bg-[#00C853] hover:bg-[#00E676] text-black font-bold text-lg px-10 py-5 transition-colors shadow-[0_0_40px_rgba(0,200,83,0.35)]"
            >
              Testar Agora
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>

        <p className="mt-4 text-sm text-zinc-500">
          Sem cartão de crédito • Configuração em 24h
        </p>
      </div>
    </section>
  );
}
