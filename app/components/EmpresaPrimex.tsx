"use client";

import { Building2, ExternalLink, ShieldCheck, Code2 } from "lucide-react";
import Reveal from "./Reveal";

const CNPJ = "55.536.885/0001-30";
const SITE = "https://www.primexsistemas.com";

export default function EmpresaPrimex() {
  return (
    <section id="empresa" className="relative z-10 px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="rounded-[1.75rem] border border-white/12 bg-gradient-to-br from-white/[0.07] to-transparent overflow-hidden animate-border-glow">
            <div className="grid md:grid-cols-5 gap-0">
              <div className="md:col-span-3 p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">
                  Empresa
                </p>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                  RecuperaJogo é um produto da Primex Sistemas
                </h2>
                <p className="text-white/55 leading-relaxed mb-6 max-w-xl">
                  Somos uma empresa de software — CNPJ ativo, site institucional, desenvolvimento sob
                  medida. Não somos casa de apostas, não somos escritório de advocacia e não vendemos
                  curso de “fique rico”. Entregamos ferramenta de documento com método testado em
                  Juizado.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    { icon: Building2, t: `Primex Sistemas LTDA · CNPJ ${CNPJ}` },
                    { icon: Code2, t: "Desenvolvimento web, sistemas e automação" },
                    { icon: ShieldCheck, t: "Software de documento · não sociedade de advogados" },
                  ].map(({ icon: Icon, t }) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-white/70">
                      <Icon size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href={SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-white/15 hover:bg-white/5 hover:border-emerald-500/40 transition-colors"
                >
                  Conhecer a Primex · primexsistemas.com
                  <ExternalLink size={15} className="text-emerald-400" />
                </a>
              </div>
              <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-white/10 bg-black/30 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
                <div className="ambient-orb w-40 h-40 bg-emerald-500/20 -top-10 -right-10 absolute" />
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-[#05080C] text-lg font-black mb-5 animate-pulse-glow relative z-10">
                  P
                </div>
                <p className="text-lg font-bold mb-1 relative z-10">PRIMEX SISTEMAS</p>
                <p className="text-sm text-white/45 mb-6 relative z-10">
                  Soluções inteligentes · software sob medida
                </p>
                <div className="space-y-2 text-xs text-white/40 relative z-10">
                  <p>
                    Site oficial:{" "}
                    <a
                      href={SITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400/90 hover:underline underline-offset-2"
                    >
                      primexsistemas.com
                    </a>
                  </p>
                  <p>CNPJ {CNPJ}</p>
                  <p>Produto: RecuperaJogo</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
