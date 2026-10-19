"use client";

export default function ProvaReal() {
  return (
    <section id="prova" className="relative z-10 px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40 mb-3 text-center">
          Documento público · trechos
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center text-white mb-2">
          Sentença em Juizado Especial Cível
        </h2>
        <p className="text-sm text-white/45 text-center mb-10 max-w-xl mx-auto leading-relaxed">
          Teresina/PI. Dados de identificação do processo e das partes foram omitidos. O teor abaixo
          resume a decisão publicada.
        </p>

        <div className="rounded-lg border border-white/12 bg-[#0C1014] shadow-2xl overflow-hidden">
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
                Da fundamentação
              </p>
              <p className="text-[15px] leading-[1.7] text-white/65 mb-3">
                Relação de consumo. Responsabilidade objetiva do fornecedor (art. 14 do CDC). A
                autoexclusão é mecanismo de proteção; a falha de sistema integra o risco da atividade e
                não exclui a responsabilidade da operadora.
              </p>
              <blockquote className="border-l-2 border-white/20 pl-4 py-1">
                <p className="text-[14px] leading-[1.65] text-white/55 italic">
                  A falha atingiu diretamente o próprio mecanismo de proteção que o consumidor havia
                  utilizado para impedir sua exposição à atividade de apostas.
                </p>
              </blockquote>
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
              Trechos adaptados para leitura pública. Número do processo e qualificações das partes
              omitidos. Esta decisão não constitui garantia de resultado em outros casos — cada
              demanda depende de prova e do juízo competente. O RecuperaJogo é software de documento,
              não sociedade de advogados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
