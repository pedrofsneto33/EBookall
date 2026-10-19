"use client";

import { useState } from "react";

/**
 * Galeria de prova real.
 * Coloque imagens/PDF tarjados em /public/docs e liste abaixo.
 * Enquanto a lista estiver vazia, a seção NÃO é renderizada.
 */
const DOCS: { src: string; label: string; kind: "documento" | "print" }[] = [
  // { src: "/docs/sentenca-pagina-1.webp", label: "Sentença — dispositivo", kind: "documento" },
];

export default function ProvaReal() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (DOCS.length === 0) return null;

  const current = DOCS[active];

  return (
    <section id="prova" className="relative z-10 px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40 mb-3 text-center">
          Documentos e prints · dados omitidos
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center text-white mb-2">
          Prova real
        </h2>
        <p className="text-sm text-white/45 text-center mb-10 max-w-xl mx-auto leading-relaxed">
          Trechos de decisão e prints usados no caso, com identificação tarjada.
        </p>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto pb-2">
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
                  <img src={d.src} alt="" className="w-full h-full object-cover object-top" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-white/35 mb-0.5">
                    {d.kind === "documento" ? "Documento" : "Print"}
                  </p>
                  <p className="text-sm text-white/80 leading-snug line-clamp-2">{d.label}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="w-full rounded-xl border border-white/12 bg-[#0C1014] overflow-hidden text-left"
            >
              <div className="px-4 py-2.5 border-b border-white/8 flex justify-between">
                <p className="text-xs text-white/50 truncate">{current.label}</p>
                <span className="text-[10px] text-white/30 uppercase">Ampliar</span>
              </div>
              <div className="bg-[#1a1814] p-4 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={current.src} alt={current.label} className="w-full max-w-2xl rounded-sm" />
              </div>
            </button>
            <p className="text-[11px] text-white/30 mt-3">
              Dados sensíveis omitidos. Não é cópia oficial do PJe. Não garante resultado em outros
              casos.
            </p>
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.label}
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
