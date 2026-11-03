"use client";

import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { PRECO_INT } from "../../app/lib/config";

const BENEFITS = [
  "Até 3 petições geradas",
  "Checklist de Provas Automatizado",
  "Acesso liberado assim que o Pix é confirmado",
  "Suporte via WhatsApp",
];

export default function OfferSection() {
  return (
    <section id="preco" className="relative bg-[var(--tinta)] py-24 px-6 overflow-hidden">

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          Quanto custa recuperar o seu dinheiro?
        </h2>
        <p className="mt-3 text-zinc-400 text-lg">
          Gere a petição e peça de volta o valor cobrado, mais indenização quando couber.
        </p>



        <div className="mt-10 mx-auto max-w-lg">
          <div className="clip-custom bg-zinc-950 border border-emerald-500/50 p-8 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
            <div className="inline-block border border-[var(--papel)]/40 text-[var(--papel)] font-medium text-xs px-3 py-1 rounded mb-6">
              3 PETIÇÕES INCLUSAS
            </div>
            <p className="text-6xl font-black text-white">
              R$ {PRECO_INT}
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
                  href="https://recuperajogo.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clip-custom block text-center bg-[var(--papel)] hover:bg-white text-[var(--tinta)] font-semibold text-lg px-6 py-4 transition-colors"
                >
                  Gerar Minha Petição Agora
                </a>
              </motion.div>

              <p className="mt-3 text-xs text-white/50 text-center">
                Não é assessoria jurídica. Você é o autor e protocola em seu nome.
              </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
              <ShieldCheck size={14} className="text-emerald-400" />
              Pagamento por Pix. O acesso é liberado quando o pagamento é confirmado.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
