const PASSOS = [
  { t: "Escolha o que aconteceu", d: "Autoexclusão ignorada, saque retido, conta bloqueada, bônus abusivo e outros casos." },
  { t: "Preencha os dados", d: "Os seus e os da casa de apostas. O CNPJ da empresa é conferido na Receita." },
  { t: "Marque o que aconteceu e as provas que você tem", d: "Os argumentos e as provas entram na petição conforme a sua escolha." },
  { t: "Receba a petição pronta", d: "Com o endereço do Juizado onde protocolar e o PDF para baixar." },
];

export default function DemoGerador() {
  return (
    <section id="demo" className="px-5 sm:px-6 py-16 sm:py-24 bg-[var(--tinta)] border-t border-white/10">
      <div className="mx-auto max-w-5xl grid md:grid-cols-[minmax(0,320px)_1fr] gap-10 md:gap-16 items-center">
        <div className="order-2 md:order-1 mx-auto w-full max-w-[300px] md:max-w-none">
          <div className="rounded-[28px] border-[6px] border-zinc-700 bg-black overflow-hidden shadow-[0_24px_50px_-18px_rgba(0,0,0,0.7)]">
            <video
              controls
              muted
              playsInline
              preload="metadata"
              poster="/demo/poster-mobile.jpg"
              className="w-full h-auto block aspect-[1/2]"
              aria-label="Gravação da tela do celular usando o gerador de petições, em 4 passos"
            >
              <source src="/demo/gerador-mobile.mp4" type="video/mp4" />
              Seu navegador não toca vídeo. Os 4 passos estão descritos ao lado.
            </video>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl sm:text-4xl leading-tight text-[var(--papel)]">
            Veja o gerador funcionando, no celular
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--papel)]/70 leading-relaxed">
            É assim que o seu caso vira petição. A gravação tem pouco mais de um minuto e cada passo aparece
            escrito na tela.
          </p>

          <ol className="mt-8 space-y-5 list-none p-0">
            {PASSOS.map((p, i) => (
              <li key={p.t} className="flex gap-4">
                <span
                  className="shrink-0 w-8 h-8 rounded-full border border-[var(--papel)]/40 text-[var(--papel)] text-sm font-semibold flex items-center justify-center"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-[var(--papel)] leading-snug">{p.t}</p>
                  <p className="mt-1 text-sm sm:text-base text-[var(--papel)]/65 leading-relaxed">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-sm text-[var(--papel)]/55 leading-relaxed">
            Exemplo com dados fictícios (autora, CPF e empresa inventados). A petição do seu caso usa as suas
            informações e as suas provas, e o resultado de um processo depende do juiz. O RecuperaJogo não
            garante resultado.
          </p>
        </div>
      </div>
    </section>
  );
}
