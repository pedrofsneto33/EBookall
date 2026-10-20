"use client";

import Reveal from "./Reveal";

/** Stats de impacto — tom de campanha; fontes públicas quando disponíveis. */
const STATS = [
  {
    n: "Milhões",
    d: "de brasileiros expostos a bets online após a regulação",
    tone: "red" as const,
  },
  {
    n: "R$ bi",
    d: "movimentados em apostas — dinheiro que sai do varejo e da família",
    tone: "red" as const,
  },
  {
    n: "JEC",
    d: "caminho real: Juizado Especial, jus postulandi, até 20 salários",
    tone: "emerald" as const,
  },
  {
    n: "R$ 3 mil",
    d: "danos morais em sentença pública (caso Sortenabet · Teresina/PI)",
    tone: "emerald" as const,
  },
];

export default function ImpactoSocial() {
  return (
    <section
      id="impacto"
      className="relative z-10 px-4 py-20 md:py-28 border-y border-white/10"
      style={{ background: "linear-gradient(180deg, rgba(127,29,29,0.12) 0%, transparent 40%, rgba(6,78,59,0.08) 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400 mb-3">
            O tamanho do problema
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 max-w-3xl leading-[1.1]">
            As bets não são só "diversão".
            <span className="text-gradient-warn"> São um sistema.</span>
          </h2>
          <p className="text-white/55 mb-12 max-w-2xl text-base md:text-lg leading-relaxed">
            Enquanto o dinheiro some, o app continua aberto. A peça jurídica existe para
            documentar falha de serviço, autoexclusão ignorada e cobrança indevida — no Juizado.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.d} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}>
              <div
                className={`stat-card card-lift rounded-2xl border p-6 h-full ${
                  s.tone === "red"
                    ? "border-red-500/25 bg-red-500/[0.07]"
                    : "border-emerald-500/25 bg-emerald-500/[0.07]"
                }`}
              >
                <p
                  className={`text-3xl md:text-4xl font-black tracking-tight ${
                    s.tone === "red" ? "text-red-300" : "text-emerald-300"
                  }`}
                >
                  {s.n}
                </p>
                <p className="text-sm text-white/55 mt-3 leading-snug">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-[11px] text-white/30 mt-8 max-w-2xl">
          Números de contexto social e um resultado judicial público específico. Não prometem o
          mesmo desfecho no seu caso.
        </p>
      </div>
    </section>
  );
}
