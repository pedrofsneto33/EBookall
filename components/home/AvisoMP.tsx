import Link from "next/link";
import { MP } from "@/app/lib/config";

export default function AvisoMP() {
  return (
    <section className="px-5 sm:px-6 py-14 sm:py-20 bg-[var(--tinta)] border-t border-white/10">
      <div className="mx-auto max-w-4xl border-l-4 border-[var(--verde-fechado)] bg-white/[0.04] pl-6 sm:pl-8 pr-5 sm:pr-8 py-7 sm:py-9 rounded-r-md">
        <h2 className="text-2xl sm:text-3xl leading-snug text-[var(--papel)]">
          A {MP.numero.replace("Medida Provisória nº ", "MP ")} proibiu as bets. O que você perdeu antes continua
          podendo ser cobrado.
        </h2>
        <p className="mt-4 text-base text-[var(--papel)]/75 leading-relaxed">
          A medida provisória, publicada em {MP.publicacao}, proíbe a exploração de apostas de quota fixa e previu a
          extinção das autorizações das casas em {MP.extincaoTxt}. Ela ainda precisa ser votada pelo Congresso e é
          questionada no STF, então o cenário pode mudar.
        </p>
        <p className="mt-3 text-base text-[var(--papel)]/75 leading-relaxed">
          A proibição vale daqui para frente. Em regra, uma lei nova não apaga fatos que já aconteceram: saque negado,
          autoexclusão ignorada, prêmio não pago. O seu direito de cobrar esses prejuízos na Justiça continua.
        </p>
        <p className="mt-3 text-sm text-[var(--papel)]/55 leading-relaxed">
          Receber de uma empresa que deixou de operar pode ser mais demorado, e ninguém consegue garantir o
          pagamento. Situação conferida em 04/11/2026.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/login"
            className="clip-custom inline-flex bg-[var(--papel)] hover:bg-white text-[var(--tinta)] font-semibold px-6 py-3 transition-colors"
          >
            Montar minha petição
          </Link>
          <a
            href={MP.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--papel)]/70 hover:text-[var(--papel)] underline underline-offset-4"
          >
            Ler o texto da MP no Planalto
          </a>
        </div>
      </div>
    </section>
  );
}
