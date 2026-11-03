import Image from "next/image";

const TELAS = [
  { src: "/demo/dados.webp", legenda: "Você preenche os dados do caso", alt: "Tela do gerador com os campos de dados do autor e da empresa" },
  { src: "/demo/argumentos.webp", legenda: "Escolhe os argumentos e as provas que tem", alt: "Tela do gerador com a lista de argumentos e provas" },
  { src: "/demo/resultado.webp", legenda: "Revisa a petição e baixa o PDF", alt: "Tela do gerador com a petição pronta e o botão Baixar PDF" },
];

export default function DemoGerador() {
  return (
    <section id="demo" className="px-5 sm:px-6 py-16 sm:py-24 bg-[var(--tinta)] border-t border-white/10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-4xl leading-tight text-[var(--papel)] max-w-2xl">
          Veja o gerador funcionando, do começo ao fim
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--papel)]/70 max-w-2xl leading-relaxed">
          Gravação da tela com um caso de exemplo: autoexclusão ignorada, em Teresina/PI. Leva uns 40 segundos.
        </p>

        <div className="mt-10 rounded-md overflow-hidden border border-white/10 bg-black">
          <video
            controls
            muted
            playsInline
            preload="metadata"
            poster="/demo/poster.jpg"
            className="w-full h-auto block"
            aria-label="Gravação do gerador de petições montando uma petição de exemplo"
          >
            <source src="/demo/gerador.mp4" type="video/mp4" />
            Seu navegador não toca vídeo. As telas estão logo abaixo.
          </video>
        </div>

        <ol className="mt-10 grid gap-8 md:grid-cols-3 list-none p-0">
          {TELAS.map((t, i) => (
            <li key={t.src}>
              <div className="rounded-md overflow-hidden border border-white/10">
                <Image src={t.src} alt={t.alt} width={1400} height={916} className="w-full h-auto" sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-[var(--papel)]/85 leading-snug">
                <span className="font-semibold">{i + 1}.</span> {t.legenda}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-[var(--papel)]/55 max-w-2xl leading-relaxed">
          Exemplo com dados fictícios (autora, CPF e empresa inventados). A petição do seu caso usa as suas
          informações e as suas provas, e o resultado de um processo depende do juiz. O RecuperaJogo não garante resultado.
        </p>
      </div>
    </section>
  );
}
