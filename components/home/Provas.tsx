import Image from "next/image";
import Link from "next/link";
import { LIMITE_JUS_POSTULANDI, formatarMoeda } from "@/app/lib/config";

const OUTRAS = [
  { orgao: "TJSC · Tubarão", tema: "Falha no dever de jogo responsável", valor: "R$ 217 mil + R$ 10 mil de dano moral", proc: "5005803-28.2025.8.24.0075", fonte: "Migalhas", href: "https://www.migalhas.com.br/quentes/448239/casa-de-aposta-devolve-r-217-mil-por-violar-dever-de-jogo-responsavel", acima: true },
  { orgao: "TJDFT · 3ª Turma Cível", tema: "Ludopatia: apostas anuladas", valor: "R$ 180.963,12 + R$ 4 mil de dano moral", proc: "0707743-74.2025.8.07.0001", fonte: "TJDFT", href: "https://www.tjdft.jus.br/institucional/imprensa/noticias/2026/junho/tjdft-anula-apostas-e-condena-plataforma-a-devolver-r-180-mil-a-consumidor-com-ludopatia", acima: true },
  { orgao: "TJSP", tema: "Autoexclusão não bloqueada no prazo", valor: "R$ 81 mil", proc: "4000778-26.2026.8.26.0248", fonte: "BNL Data", href: "https://bnldata.com.br/justica-condena-plataforma-de-apostas-por-falha-em-autoexclusao-de-apostador/", acima: true, primeiroGrau: true },
  { orgao: "TJDFT · Turma Recursal", tema: "Conta suspensa sem provar irregularidade", valor: "R$ 7 mil", proc: "0759332-60.2025.8.07.0016", fonte: "TJDFT", href: "https://www.tjdft.jus.br/institucional/imprensa/noticias/2026/abril/tjdft-mantem-condenacao-de-plataforma-de-apostas-que-suspendeu-conta-sem-comprovar-irregularidade", acima: false },
];

export default function Provas() {
  return (
    <section id="prova" className="px-5 sm:px-6 py-16 sm:py-24 bg-[var(--tinta)] border-t border-white/10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-4xl leading-tight text-[var(--papel)] max-w-3xl">
          A Justiça já mandou casas de apostas pagarem
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--papel)]/70 max-w-2xl leading-relaxed">
          Decisões reais, com número de processo e fonte. Cada caso depende das provas e do juiz.
        </p>

        <div className="mt-10 grid lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-14 items-start">
          <figure className="mx-auto w-full max-w-[340px]">
            <div className="bg-white p-2 rounded-[3px] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.7)]">
              <Image src="/images/sentenca-real.png" alt="Sentença real do Juizado Especial Cível de Teresina/PI" width={600} height={900} className="w-full h-auto" />
            </div>
            <figcaption className="mt-3 text-xs text-[var(--papel)]/55 text-center">Sentença de 1º grau, Teresina/PI</figcaption>
          </figure>

          <div>
            <p className="text-sm font-semibold text-[var(--papel)]/60">Caso feito com o RecuperaJogo</p>
            <p className="mt-1 font-[family-name:var(--font-serif)] text-5xl sm:text-6xl font-semibold text-[var(--papel)]">R$ 3.000,00</p>
            <p className="mt-1 text-[var(--papel)]/70">de dano moral, por ignorar a autoexclusão do apostador.</p>
            <p className="mt-4 text-[var(--papel)]/70 leading-relaxed">
              O usuário tinha autoexclusão ativa e a casa continuou aceitando depósitos. A petição foi protocolada no
              Juizado Especial de Teresina/PI. A ré devolveu os R$ 380 durante o processo e foi condenada ao dano
              moral. A sentença é de 1º grau e foi apelada em 21/10/2026.
            </p>

            <h3 className="mt-10 text-lg font-[family-name:var(--font-serif)] font-semibold text-[var(--papel)]">
              Outras decisões noticiadas
            </h3>
            <ul className="mt-3 list-none p-0 divide-y divide-white/10 border-y border-white/10">
              {OUTRAS.map((d) => (
                <li key={d.proc} className="py-4">
                  <p className="text-sm text-[var(--papel)]/55">{d.orgao} · proc. {d.proc}</p>
                  <p className="mt-1 font-semibold text-[var(--papel)] leading-snug">{d.tema}: {d.valor}</p>
                  <p className="mt-1 text-sm text-[var(--papel)]/60">
                    {d.primeiroGrau ? "Sentença de 1º grau, sujeita a recurso. " : ""}{d.acima ? `Acima de ${formatarMoeda(LIMITE_JUS_POSTULANDI)}, exige advogado ou Defensoria.` : `Cabe sem advogado (até ${formatarMoeda(LIMITE_JUS_POSTULANDI)}).`}{" "}
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[var(--papel)]">
                      Fonte: {d.fonte}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[var(--papel)]/50 leading-relaxed">
              Decisões noticiadas pela imprensa e pelos tribunais. Não há garantia de resultado em casos futuros.
            </p>
            <Link href="/login" className="mt-6 clip-custom inline-flex bg-[var(--papel)] hover:bg-white text-[var(--tinta)] font-semibold px-6 py-3 transition-colors">
              Montar minha petição
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
