import Link from "next/link";
import { LIMITE_JUS_POSTULANDI, PRECO_INT, formatarMoeda } from "@/app/lib/config";

/**
 * Herói: a própria petição, impressa. O visitante vê o que vai receber antes de ler qualquer promessa.
 * O texto do documento é um modelo (campos entre colchetes), não um caso real.
 */
function FolhaDaPeticao() {
  return (
    <figure className="relative mx-auto w-full max-w-[520px]" aria-label="Exemplo de petição inicial gerada pelo RecuperaJogo">
      <div className="relative rounded-[3px] bg-[var(--papel)] text-[#1b1f27] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] px-7 sm:px-10 py-8 sm:py-10 font-[family-name:var(--font-serif)] text-[13px] sm:text-[14px] leading-[1.75] lg:-rotate-[1.2deg]">
        <p className="text-center text-[11px] sm:text-xs font-semibold tracking-wide leading-snug">
          EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE [CIDADE]
        </p>

        <p className="mt-5 text-left hyphens-auto">
          <strong>[NOME DO AUTOR]</strong>, brasileiro(a), inscrito(a) no CPF nº [CPF], vem propor
          <strong> AÇÃO DE REPARAÇÃO DE DANOS </strong>
          em face de <strong>[NOME DA EMPRESA]</strong>, CNPJ nº [CNPJ], pelos fatos e fundamentos a seguir.
        </p>

        <p className="mt-4 font-semibold">I. Dos fatos</p>
        <p className="text-left hyphens-auto">
          O autor ativou a autoexclusão na plataforma da requerida em [data].{" "}
          <span className="marca">Mesmo assim, a plataforma continuou aceitando depósitos</span> e apostas,
          que somam R$ [valor].
        </p>

        <p className="mt-4 font-semibold">II. Do direito</p>
        <p className="text-left hyphens-auto">
          Aplica-se o Código de Defesa do Consumidor.{" "}
          <span className="marca marca-2">A requerida descumpriu o dever de segurança e de jogo responsável</span>,
          o que gera o dever de reparar.
        </p>

        <p className="mt-4 font-semibold">III. Dos pedidos</p>
        <p className="text-left hyphens-auto">
          a) a restituição dos valores depositados após a autoexclusão; b) a indenização por dano moral.
        </p>

        <div
          className="absolute -bottom-3 -right-2 sm:-right-5 rotate-[-8deg] border-[3px] border-[var(--carimbo)] text-[var(--carimbo)] rounded-[4px] px-3 py-1 font-[family-name:var(--font-sans)] font-semibold text-xs sm:text-sm leading-tight text-center bg-[var(--papel)]/90"
          aria-hidden="true"
        >
          Modelo
          <br />
          <span className="text-[10px] sm:text-[11px] font-medium">preenchido com os seus dados</span>
        </div>
      </div>
    </figure>
  );
}

export default function HeroSection() {
  return (
    <section className="px-5 sm:px-6 pt-28 sm:pt-32 pb-20 sm:pb-28 bg-[var(--tinta)]">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">
        <div>
          <h1 className="text-[2.1rem] sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-[var(--papel)]">
            Perdeu dinheiro para uma bet? Peça de volta no Juizado Especial, sem advogado.
          </h1>

          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[var(--papel)]/75 max-w-xl">
            Você responde às perguntas sobre o seu caso e o RecuperaJogo monta a petição inicial, pronta para
            protocolar. Vale para causas de até {formatarMoeda(LIMITE_JUS_POSTULANDI)}.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/login"
              className="clip-custom inline-flex items-center bg-[var(--papel)] hover:bg-white text-[var(--tinta)] font-semibold text-base sm:text-lg px-7 py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--papel)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tinta)]"
            >
              Montar minha petição
            </Link>
            <a href="#demo" className="text-[var(--papel)]/80 hover:text-[var(--papel)] underline underline-offset-4 decoration-[var(--linha)] text-base">
              Ver como funciona
            </a>
          </div>

          <p className="mt-6 text-sm text-[var(--papel)]/60 max-w-md leading-relaxed">
            R$ {PRECO_INT}, uma vez, com direito a 3 petições. Você assina e protocola em seu próprio nome: o
            RecuperaJogo não é escritório de advocacia.
          </p>
        </div>

        <FolhaDaPeticao />
      </div>
    </section>
  );
}
