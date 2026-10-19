"use client";

const PROBLEMA = [
  { n: "1,8 mi", d: "brasileiros endividados por bets em 2024" },
  { n: "R$ 143 bi", d: "retirados do varejo pelas bets (2023–2026)" },
  { n: "1,4 mi", d: "pessoas com transtornos ligados a apostas online" },
  { n: "66,8%", d: "dos apostadores com uso problemático" },
];

const SOCIEDADE = [
  { n: "86%", d: "vêem as bets como nocivas" },
  { n: "70%", d: "concordam com proibição total" },
  { n: "76%", d: "defendem limitar a publicidade" },
];

export default function ImpactoSocial() {
  return (
    <section id="impacto" className="relative z-10 px-4 py-16 md:py-24 border-y border-white/8 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400/90 mb-2">
          Impacto
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 max-w-2xl">
          Um problema grave…
        </h2>
        <p className="text-white/50 mb-10 max-w-2xl leading-relaxed">
          As bets deixaram de ser só entretenimento. São dívida, saúde e famílias. Não estamos do
          lado das casas — estamos do lado de quem precisa reagir.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {PROBLEMA.map((s) => (
            <div
              key={s.d}
              className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-5"
            >
              <p className="text-2xl md:text-3xl font-black text-red-300 tracking-tight">{s.n}</p>
              <p className="text-sm text-white/50 mt-2 leading-snug">{s.d}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-6 text-white/90">
          …e a sociedade já enxerga isso.
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {SOCIEDADE.map((s) => (
            <div
              key={s.d}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="text-3xl font-black text-emerald-400">{s.n}</p>
              <p className="text-sm text-white/50 mt-2">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-white/30">
          Fontes citadas em campanhas públicas: CNC / Lenad / Atlas Intel. Números de contexto
          social — não são resultado do seu processo individual.
        </p>
      </div>
    </section>
  );
}
