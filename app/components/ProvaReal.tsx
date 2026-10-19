"use client";

export default function ProvaReal() {
  return (
    <section id="prova" className="relative z-10 px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2 text-center">
          Prova real · não depoimento inventado
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-center">
          Eu processei. O Juizado condenou.
        </h2>
        <p className="text-white/50 text-center mb-10 max-w-2xl mx-auto">
          Sentença do Juizado Especial Cível · Teresina/PI. Número do processo e dados sensíveis
          omitidos de propósito.
        </p>

        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-transparent overflow-hidden">
          <div className="px-5 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 bg-black/30">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              Sentença · danos morais procedentes
            </span>
            <span className="text-[11px] text-white/40 font-mono">
              Processo nº ████████-██.████.8.18.████
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-5 text-sm leading-relaxed">
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Ré</p>
                <p className="font-bold text-white">SortenaBet Gaming Brasil S.A.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Fato</p>
                <p className="font-bold text-white">Autoexclusão furada</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Resultado</p>
                <p className="font-bold text-emerald-400">R$ 3.000 · dano moral</p>
              </div>
            </div>

            <div className="space-y-3 text-white/65">
              <p>
                <strong className="text-white">O que aconteceu:</strong> autoexclusão centralizada
                registrada. Cerca de 24 dias depois, a casa ainda permitiu acesso, depósito e apostas
                (R$ 380,00). A própria ré admitiu inconsistência operacional na integração dos
                sistemas.
              </p>
              <p>
                <strong className="text-white">O que o juiz decidiu:</strong> relação de consumo
                (CDC). Falha na prestação do serviço (art. 14 do CDC). A falha de sistema não exclui
                a responsabilidade da casa. Autoexclusão é mecanismo de proteção — e foi
                descumprido.
              </p>
              <p>
                <strong className="text-white">Dispositivo:</strong> condenação a pagar{" "}
                <strong className="text-emerald-400">R$ 3.000,00</strong> a título de danos morais
                (correção desde a sentença; juros desde o evento danoso). O valor material já havia
                sido restituído no curso do processo.
              </p>
            </div>

            <blockquote className="border-l-2 border-emerald-500 pl-4 text-white/55 italic text-[13px]">
              &ldquo;A falha atingiu diretamente o próprio mecanismo de proteção que o consumidor
              havia utilizado para impedir sua exposição à atividade de apostas.&rdquo;
              <span className="block not-italic text-white/35 mt-2 text-[11px]">
                — trecho da fundamentação · Juizado Especial Cível · Teresina/PI
              </span>
            </blockquote>

            <p className="text-[11px] text-white/35 leading-relaxed">
              Isto não é garantia de resultado no seu caso. Cada processo depende de prova e do
              juiz. É a demonstração de que o caminho do Juizado, com fundamento em CDC e
              autoexclusão, já foi usado — e acolhido.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
