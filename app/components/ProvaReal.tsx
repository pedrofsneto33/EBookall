"use client";

/**
 * Prova real a partir de processo público no 4º JEC de Teresina/PI.
 * Quando houver imagens/PDF tarjados em /public/docs, adicione em DOCS.
 */

const DOCS: { src: string; label: string; kind: "documento" | "print" }[] = [];

const CASO_PUBLICO = {
  tribunal: "4º Juizado Especial Cível · Teresina/PI",
  processo: "0804781-17.2026.8.18.0140",
  reu: "Sortenabet Gaming Brasil S.A.",
  fato: "Autoexclusão centralizada em 11/12/2025; depósito e apostas permitidos em 04/01/2026 (R$ 380).",
  fundamento:
    "CDC art. 14 · falha na prestação do serviço · fortuito interno (inconsistência de sistemas)",
  dispositivo:
    "Pedido de danos morais procedente. Condenação a R$ 3.000,00. Restituição material já satisfeita no curso do processo.",
  aviso:
    "Sentença pública de um caso concreto. Não garante resultado em outras ações. Dados de identificação omitidos neste site.",
};

export default function ProvaReal() {
  return (
    <section id="prova" className="relative z-10 px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40 mb-3 text-center">
          Processo real · dados sensíveis omitidos
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center text-white mb-2">
          Sentença no Juizado Especial
        </h2>
        <p className="text-sm text-white/45 text-center mb-10 max-w-xl mx-auto leading-relaxed">
          Um caso de autoexclusão furada julgado no 4º JEC de Teresina. O juiz reconheceu falha no
          serviço e fixou danos morais.
        </p>

        <div className="rounded-2xl border border-white/12 bg-[#0C1014] overflow-hidden">
          <div className="px-5 py-3 border-b border-white/8 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/40">
            <span>{CASO_PUBLICO.tribunal}</span>
            <span className="text-white/20">·</span>
            <span className="font-mono text-white/50">{CASO_PUBLICO.processo}</span>
          </div>
          <div className="p-6 md:p-8 space-y-5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-emerald-400/80 mb-1">Ré</p>
              <p className="text-white/90 font-medium">{CASO_PUBLICO.reu}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">Fato</p>
              <p className="text-sm text-white/70 leading-relaxed">{CASO_PUBLICO.fato}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">Fundamento</p>
              <p className="text-sm text-white/70 leading-relaxed">{CASO_PUBLICO.fundamento}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4">
              <p className="text-[10px] uppercase tracking-wider text-emerald-400 mb-1">Dispositivo</p>
              <p className="text-sm text-white font-medium leading-relaxed">{CASO_PUBLICO.dispositivo}</p>
            </div>
            <p className="text-[11px] text-white/30 leading-relaxed">{CASO_PUBLICO.aviso}</p>
          </div>
        </div>

        {DOCS.length > 0 && (
          <p className="text-center text-xs text-white/30 mt-6">
            Anexos tarjados disponíveis na galeria (quando publicados em /public/docs).
          </p>
        )}
      </div>
    </section>
  );
}
