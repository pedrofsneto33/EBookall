"use client";

import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const BENEFITS = [
  "Até 3 petições geradas",
  "Checklist de Provas Automatizado",
  "Acesso imediato ao sistema",
  "Garantia incondicional de 7 dias",
  "Suporte via WhatsApp",
];

export default function OfferSection() {
  return (
    <section id="preco" className="relative bg-[#05080C] py-24 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-emerald-500/15 blur-[160px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          Quanto custa recuperar o seu dinheiro?
        </h2>
        <p className="mt-3 text-zinc-400 text-lg">
          Menos que uma pizza. E pode te devolver milhares de reais.
        </p>

        <p className="mt-6 text-sm text-zinc-500">
          Um advogado cobraria de R$ 1.500 a R$ 3.000. Aqui você resolve por R$ 137.
        </p>

        <div className="mt-10 mx-auto max-w-lg">
          <div className="clip-custom bg-zinc-950 border border-emerald-500/50 p-8 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
            <div className="inline-block bg-emerald-400 text-black font-bold text-xs px-4 py-1.5 mb-6">
              ACESSO VITALÍCIO
            </div>
            <p className="text-6xl font-black text-white">
              R$ 137
            </p>
            <p className="text-zinc-400 mt-1">à vista</p>

            <ul className="mt-8 space-y-3 text-left">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                  {b}
                </li>
              ))}
            </ul>

            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block w-full"
              >
                <a
                  href="https://e-bookall.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clip-custom block text-center bg-emerald-400 hover:bg-emerald-300 text-black font-black text-lg px-6 py-4 transition-colors"
                >
                  Gerar Minha Petição Agora
                </a>
              </motion.div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
              <ShieldCheck size={14} className="text-emerald-400" />
              Pagamento via Pix (CNPJ). O acesso é liberado após o envio do comprovante.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
