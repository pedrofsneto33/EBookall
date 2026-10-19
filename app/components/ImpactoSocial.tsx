"use client";

import Reveal from "./Reveal";

type Stat = {
  n: string;
  d: string;
  source: string;
  year: string;
  source_url: string;
};

/** Só exibe números com fonte primária (source_url preenchida). */
const PROBLEMA: Stat[] = [];
const SOCIEDADE: Stat[] = [];

export default function ImpactoSocial() {
  const problema = PROBLEMA.filter((s) => s.source_url);
  const sociedade = SOCIEDADE.filter((s) => s.source_url);

  if (problema.length === 0 && sociedade.length === 0) return null;

  return (
    <section id="impacto" className="relative z-10 px-4 py-16 md:py-24 border-y border-white/8 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400/90 mb-2">Impacto</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 max-w-2xl">
            Um problema de contexto social
          </h2>
          <p className="text-white/50 mb-10 max-w-2xl leading-relaxed">
            Números de pesquisas públicas — não são resultado do seu processo individual.
          </p>
        </Reveal>

        {problema.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {problema.map((s, i) => (
              <Reveal key={s.d} delay={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}>
                <div className="card-lift rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-5 h-full">
                  <p className="text-2xl md:text-3xl font-black text-red-300 tracking-tight">{s.n}</p>
                  <p className="text-sm text-white/50 mt-2 leading-snug">{s.d}</p>
                  <a
                    href={s.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-white/35 mt-3 inline-block hover:text-emerald-400"
                  >
                    {s.source} · {s.year} ↗
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {sociedade.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {sociedade.map((s, i) => (
              <Reveal key={s.d} delay={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}>
                <div className="card-lift rounded-2xl border border-white/10 bg-white/[0.03] p-5 h-full">
                  <p className="text-3xl font-black text-emerald-400">{s.n}</p>
                  <p className="text-sm text-white/50 mt-2">{s.d}</p>
                  <a
                    href={s.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-white/35 mt-3 inline-block hover:text-emerald-400"
                  >
                    {s.source} · {s.year} ↗
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <p className="text-[11px] text-white/30">
          Cada número leva à fonte primária. Ausência de link = número não exibido.
        </p>
      </div>
    </section>
  );
}
