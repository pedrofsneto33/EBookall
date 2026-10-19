"use client";

import { useState } from "react";

const DOCS = [
  {
    src: "/docs/sentenca-1.svg",
    label: "Sentença — relatório e fundamentação",
    kind: "documento",
  },
  {
    src: "/docs/sentenca-2.svg",
    label: "Sentença — dispositivo (R$ 3.000)",
    kind: "documento",
  },
  {
    src: "/docs/print-autoexclusao.svg",
    label: "Print · autoexclusão centralizada",
    kind: "print",
  },
  {
    src: "/docs/print-deposito.svg",
    label: "Print · depósito após autoexclusão",
    kind: "print",
  },
] as const;

export default function ProvaReal() {
  const [active, setActive] = useState(0);
  const current = DOCS[active];

  return (
    <section id="prova" className="relative z-10 px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40 mb-3 text-center">
          Documentos e prints · dados omitidos
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center text-white mb-2">
          Sentença em Juizado Especial Cível
        </h2>
        <p className="text-sm text-white/45 text-center mb-10 max-w-xl mx-auto leading-relaxed">
          Teresina/PI. Número do processo, CPF e nomes foram tarjados. As imagens abaixo
          reproduzem o teor da decisão e o tipo de prova usada no caso.
        </p>

        <div className="grid lg:grid-cols-12 gap-6 mb-10">
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {DOCS.map((d, i) => (
              <button
                key={d.src}
                type="button"
                onClick={() => setActive(i)}
                className={`shrink-0 flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  active === i
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <div className="w-14 h-16 rounded-md overflow-hidden border border-white/10 bg-[#0C1014] shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.src}
                    alt=""
                    className="w-full h-full object-cover object-top opacity-90"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-white/35 mb-0.5">
                    {d.kind === "documento" ? "Documento" : "Print de tela"}
                  </p>
                  <p className="text-sm text-white/80 leading-snug line-clamp-2">{d.label}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-xl border border-white/12 bg-[#0C1014] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-white/[0.03]">
                <p className="text-xs text-white/50 truncate pr-4">{current.label}</p>
                <span className="text-[10px] uppercase tracking-wider text-white/30 shrink-0">
                  {current.kind === "documento" ? "PDF · ilustração" : "Screenshot · ilustração"}
                </span>
              </div>
              <div className="bg-[#1a1814] p-3 md:p-5 flex justify-center max-h-[min(70vh,720px)] overflow-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.src}
                  alt={current.label}
                  className={`w-full max-w-2xl shadow-xl ${
                    current.kind === "documento" ? "rounded-sm" : "rounded-lg"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/12 bg-[#0C1014] overflow-hidden">
          <div className="border-b border-white/10 px-5 py-4 bg-white/[0.03]">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">
                  Poder Judiciário · Estado do Piauí
                </p>
                <p className="text-sm font-medium text-white/85">
                  Juizado Especial Cível · Comarca de Teresina
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">Processo</p>
                <p className="font-mono text-xs text-white/50 tracking-wide">
                  ████████-██.████.8.18.████
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 md:px-8 py-6 md:py-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">Classe</p>
                <p className="text-white/80">Procedimento do JEC</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">Assunto</p>
                <p className="text-white/80">Repetição do indébito</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">Ré</p>
                <p className="text-white/80">SortenaBet Gaming Brasil S.A.</p>
              </div>
            </div>

            <div className="h-px bg-white/8" />

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400/90 mb-2">
                Dos fatos
              </p>
              <p className="text-[15px] leading-[1.7] text-white/65">
                O autor formalizou{" "}
                <strong className="text-white/90 font-medium">autoexclusão centralizada</strong>. Dias
                depois, a plataforma permitiu novo acesso, depósito e apostas no valor de{" "}
                <strong className="text-white/90 font-medium">R$ 380,00</strong>. A ré reconheceu, em
                contestação, inconsistência na integração de seus sistemas de verificação. Os valores
                materiais foram restituídos no curso do processo; restou o pedido de indenização por
                danos morais.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400/90 mb-2">
                Do dispositivo
              </p>
              <ul className="space-y-2 text-[15px] leading-[1.65] text-white/65 list-none">
                <li className="flex gap-2">
                  <span className="text-white/30 shrink-0">1.</span>
                  <span>
                    Pedido de restituição material extinto sem resolução do mérito — valores já
                    devolvidos (art. 485, VI, CPC).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-white/30 shrink-0">2.</span>
                  <span>
                    <strong className="text-white font-medium">Procedente</strong> o pedido de danos
                    morais. Condenação da ré ao pagamento de{" "}
                    <strong className="text-white font-medium">R$ 3.000,00</strong>, com correção desde
                    a sentença e juros desde o evento danoso.
                  </span>
                </li>
              </ul>
            </div>

            <div className="h-px bg-white/8" />

            <p className="text-[12px] leading-relaxed text-white/35">
              Imagens geradas a partir do teor da decisão, com dados sensíveis omitidos. Não são
              cópias oficiais do PJe. Esta decisão não constitui garantia de resultado em outros
              casos. O RecuperaJogo é software de documento, não sociedade de advogados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
