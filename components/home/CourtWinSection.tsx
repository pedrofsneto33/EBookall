"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";


export default function CourtWinSection() {
  return (
    <section id="prova" className="relative bg-[#05080C] py-24 px-6 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Documento */}
        <div className="relative w-full max-w-md mx-auto group mt-10 md:mt-0">
          <div className="absolute -top-4 -right-4 z-20 bg-emerald-400 text-black font-black text-xs px-4 py-2 rounded-full shadow-lg rotate-12 transition-transform duration-300 group-hover:rotate-0">
            SENTENÇA REAL
          </div>
          <div className="bg-white p-3 rounded-sm shadow-2xl shadow-black/50 rotate-[-2deg] transition-all duration-500 group-hover:rotate-0 group-hover:scale-105 border border-zinc-200">
            <Image
              src="/images/sentenca-real.png"
              alt="Sentença real do Juizado Especial"
              width={600}
              height={900}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Dados */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            A Justiça já reconheceu.
          </h2>
          <p className="mt-3 text-zinc-400 text-lg">
            Não é promessa. É sentença com trânsito em julgado.
          </p>

          <div className="mt-8 space-y-4">
            <div className="clip-custom bg-zinc-900 border border-emerald-500/30 p-6">
              <p className="text-5xl font-black text-emerald-400">R$ 3.000,00</p>
              <p className="text-zinc-400 mt-1">Dano moral reconhecido</p>
            </div>
            <div className="clip-custom bg-zinc-900 border border-white/10 p-6">
              <p className="text-5xl font-black text-white">R$ 380,00</p>
              <p className="text-zinc-400 mt-1">Restituição do valor apostado</p>
            </div>
          </div>

          <p className="mt-6 text-zinc-400 leading-relaxed">
            O usuário tinha autoexclusão ativa. A bet ignorou o sistema e permitiu
            novos depósitos. O Juizado Especial deu ganho de causa ao apostador.
          </p>

          <div className="mt-8">
            <a
              href="https://wa.me/5586988117925?text=Ol%C3%A1!%20Quero%20recuperar%20meu%20dinheiro%20das%20bets%20e%20gerar%20minha%20peti%C3%A7%C3%A3o."
              target="_blank"
              rel="noopener noreferrer"
              className="clip-custom inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-base px-6 py-3 transition-colors"
            >
              Quero a minha sentença
              <CheckCircle2 size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
