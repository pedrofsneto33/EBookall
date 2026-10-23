"use client";

import { motion } from "motion/react";
import { CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

export default function CourtWinSection() {
  return (
    <section className="relative bg-[#05080C] py-24 px-6 overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -top-4 -right-4 z-10 bg-emerald-400 text-black font-black text-xs px-3 py-1.5 rotate-12 shadow-lg">
            VITÓRIA REAL
          </div>
          <div className="bg-white text-gray-800 rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.6)] p-8 md:p-10 font-serif text-[13px] leading-relaxed max-w-md mx-auto">
            <div className="text-center border-b border-gray-300 pb-3 mb-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-500">
                Poder Judiciário
              </p>
              <p className="text-[11px] font-bold text-gray-700">
                Juizado Especial Cível
              </p>
            </div>

            <p className="mb-2">
              Processo nº:{" "}
              <span className="bg-black text-transparent select-none">
                0000000-00.0000.0.00.0000
              </span>
            </p>
            <p className="mb-2">
              Autor:{" "}
              <span className="bg-black text-transparent select-none">
                █████████
              </span>
            </p>
            <p className="mb-4">
              Réu:{" "}
              <span className="bg-black text-transparent select-none">
                █████████
              </span>
            </p>

            <p className="mb-3">
              <span className="bg-yellow-200/80 px-1">
                A falha, portanto, atingiu diretamente o próprio mecanismo de
                proteção que o consumidor havia utilizado para impedir sua
                exposição à atividade de apostas.
              </span>
            </p>

            <p className="font-bold text-emerald-700">
              JULGO PROCEDENTE... CONDENO{" "}
              <span className="bg-black text-transparent select-none">
                █████████
              </span>{" "}
              a pagar{" "}
              <span className="bg-black text-transparent select-none">
                █████████
              </span>{" "}
              a quantia de R$ 3.000,00 (três mil reais).
            </p>

            <div className="mt-6 flex items-center gap-2 text-[10px] text-gray-400">
              <Lock size={12} />
              Dados sensíveis tarjados
            </div>
          </div>
        </motion.div>

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
            <Link
              href="/login"
              className="clip-custom inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-base px-6 py-3 transition-colors"
            >
              Quero a minha sentença
              <CheckCircle2 size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
