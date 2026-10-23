"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 1,
    question: "A Inteligência Artificial pode errar?",
    answer:
      "Nossa IA foi treinada com milhares de petições vencedoras e passa por revisão humana. A margem de erro é de 0.1%, muito menor que a digitação manual.",
  },
  {
    id: 2,
    question: "Meus dados estão seguros?",
    answer:
      "Sim. Utilizamos criptografia de ponta a ponta. Seus documentos e dados dos clientes nunca são compartilhados e são protegidos pela LGPD.",
  },
  {
    id: 3,
    question: "Quanto tempo leva para implementar no meu escritório?",
    answer:
      "O setup leva menos de 24 horas. Nossa equipe configura o ambiente e treina sua equipe em uma call de 30 minutos.",
  },
  {
    id: 4,
    question: "Preciso instalar algo?",
    answer:
      "Não. O sistema roda 100% na nuvem. Você só precisa de um navegador (Chrome, Edge ou Safari).",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="relative bg-zinc-900 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-start">
        {/* Coluna esquerda */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-sora text-4xl md:text-5xl font-bold tracking-tight text-white">
            Ainda com dúvidas?
          </h2>
          <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
            Nós sabemos que processos judiciais não são brincadeira. Veja as
            respostas para as perguntas mais comuns.
          </p>
          <a
            href="#contato"
            className="mt-8 inline-flex items-center justify-center border border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-medium text-[15px] px-6 py-3 transition-colors"
          >
            Falar com um especialista
          </a>
        </motion.div>

        {/* Coluna direita - accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="divide-y divide-zinc-800"
        >
          {FAQS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <span
                    className={`text-lg font-medium transition-colors ${
                      isOpen ? "text-green-500" : "text-white"
                    }`}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <Plus className={isOpen ? "text-green-500" : "text-zinc-400"} size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-zinc-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
