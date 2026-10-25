"use client";

import { useEffect, useState } from "react";

const CASOS = [
  { v: "R$ 217 mil", t: "Devolução + R$ 10 mil de dano moral", o: "1ª Vara Cível de Tubarão/SC · sentença", sem: false },
  { v: "R$ 180 mil", t: "Apostas anuladas por ludopatia", o: "TJDFT · 3ª Turma Cível · acórdão", sem: false },
  { v: "R$ 81 mil", t: "Autoexclusão não bloqueada", o: "TJSP · sentença", sem: false },
  { v: "R$ 7 mil", t: "Conta suspensa sem provar irregularidade", o: "TJDFT · 3ª Turma Recursal dos Juizados", sem: true },
  { v: "R$ 3 mil", t: "Dano moral por autoexclusão violada", o: "4º JEC Teresina/PI · caso do criador do site", sem: true },
];

export default function DecisoesRotativas() {
  const [i, setI] = useState(0);
  const [pausa, setPausa] = useState(false);

  useEffect(() => {
    if (pausa || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % CASOS.length), 3800);
    return () => clearInterval(id);
  }, [pausa]);

  const c = CASOS[i];
  return (
    <div
      className="rounded-2xl border border-white/10 bg-[#0B1018] px-5 py-4"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2">Decisões reais, noticiadas</p>
      <div key={i} className="animate-fade-up">
        <p className="text-4xl font-black tracking-tight text-emerald-300">{c.v}</p>
        <p className="text-sm text-white/80 mt-1">{c.t}</p>
        <p className="text-xs text-white/45 mt-0.5">{c.o}</p>
        <p className={`text-[11px] mt-2 font-semibold ${c.sem ? "text-emerald-300/90" : "text-amber-300/90"}`}>
          {c.sem ? "Cabe sem advogado (até R$ 32.420)" : "Acima de R$ 32.420: precisa de advogado ou Defensoria"}
        </p>
      </div>
      <div className="flex gap-1.5 mt-3" role="tablist" aria-label="Decisões">
        {CASOS.map((_, k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`Decisão ${k + 1}`} aria-selected={k === i} role="tab"
            className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-emerald-400" : "w-3 bg-white/20 hover:bg-white/40"}`} />
        ))}
        <a href="#decisoes" className="ml-auto text-xs font-semibold text-emerald-300 hover:text-emerald-200">Ver as fontes →</a>
      </div>
    </div>
  );
}