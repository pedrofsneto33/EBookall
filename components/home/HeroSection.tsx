"use client";

import { motion } from "motion/react";
import Link from "next/link";
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
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full motion-safe:animate-pulse" />

      {/* Tigre de fundo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
      >
        <svg width="600" height="600" viewBox="0 0 200 200" fill="none" aria-hidden="true">
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
              <Link
                href="/login"
                className="clip-custom inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-lg px-8 py-4 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05080C]"
              >
                Recuperar Meu Dinheiro
                <ArrowRight size={20} />
              </Link>
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

        <div className="hidden lg:flex flex-col items-center justify-center relative">
          {/* Brilho verde atrás do celular */}
          <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />

          <div className="relative z-10 border-[8px] border-zinc-800 rounded-[2.5rem] w-[300px] h-[600px] bg-[#0B1018] shadow-2xl overflow-hidden">
            {/* Barra de status fake */}
            <div className="flex justify-between items-center px-6 py-4 text-zinc-400 text-xs font-mono">
              <div className="flex gap-1">
                <div className="w-1 h-4 rounded bg-zinc-500" />
                <div className="w-1 h-3 rounded bg-zinc-500" />
                <div className="w-1 h-2 rounded bg-zinc-500" />
              </div>
              <span className="text-center flex-1">9:41</span>
              <div className="flex gap-1">
                <div className="w-4 h-1 rounded-full bg-zinc-500" />
                <div className="w-2 h-3 rounded bg-zinc-500" />
                <div className="w-3 h-2 rounded bg-zinc-500" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <h3 className="text-2xl font-black text-white mb-2">RecuperaJogo</h3>
              <p className="text-zinc-300 text-sm mb-8">Sua petição está pronta!</p>
              <button className="bg-emerald-500 text-[#05080C] font-bold py-3 px-8 rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                Baixar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}