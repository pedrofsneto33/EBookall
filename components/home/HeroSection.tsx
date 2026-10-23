"use client";

import { motion } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { LIMITE_JUS_POSTULANDI, formatarMoeda } from "@/app/lib/config";

const WORDS = ["CHEGA", "DE", "PERDER", "PARA", "O", "TIGRINHO."];

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-20 px-6 overflow-hidden bg-[#05080C]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-emerald-500/15 blur-[180px] rounded-full" />

      {/* Tigre de fundo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
      >
        <svg width="600" height="600" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#34D399" strokeWidth="2" />
          <circle cx="100" cy="100" r="70" stroke="#34D399" strokeWidth="1" />
          <path
            d="M100 30 L120 60 L100 50 L80 60 Z"
            fill="#34D399"
          />
          <path
            d="M60 80 Q100 120 140 80"
            stroke="#34D399"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="85" cy="95" r="6" fill="#34D399" />
          <circle cx="115" cy="95" r="6" fill="#34D399" />
        </svg>
      </motion.div>

      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            {WORDS.map((w, i) => (
              <motion.span
                key={w + i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                className={
                  w === "PERDER"
                    ? "text-emerald-400"
                    : w === "TIGRINHO."
                    ? "text-red-500"
                    : "text-white"
                }
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <p className="mt-6 text-xl text-zinc-400 max-w-xl leading-relaxed">
            A gente coloca a Justiça no seu lado. Recupere seu dinheiro das bets
            sem sair de casa.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <a
                href="https://e-bookall.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="clip-custom inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-lg px-8 py-4 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.4)]"
              >
                Recuperar Meu Dinheiro
                <ArrowRight size={20} />
              </a>
            </motion.div>
            <a
              href="#como-funciona"
              className="clip-custom inline-flex items-center gap-2 border border-white/20 text-white font-bold text-lg px-8 py-4 hover:bg-white/5 transition-colors"
            >
              Como Funciona
            </a>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-emerald-400 font-semibold text-sm md:text-base">
            <ShieldCheck size={20} />
            <span>Você pode cobrar até {formatarMoeda(LIMITE_JUS_POSTULANDI)} sem precisar de advogado.</span>
          </div>
        </div>

        <div className="hidden lg:block" />
      </div>

      {/* Marquee */}
      <div className="relative mt-16 border-y border-white/5 py-4 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap text-sm font-bold tracking-widest text-zinc-400"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              R$ 143 BILHÕES RETIRADOS DO VAREJO PELAS BETS • 1.8M DE BRASILEIROS ENDIVIDADOS • R$ 137
              PARA RECUPERAR •
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
