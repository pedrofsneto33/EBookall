import Link from "next/link";
import { PRECO_INT } from "@/app/lib/config";

const BENEFITS = [
  "3 petições, para casos ou empresas diferentes",
  "Argumentos e lista de provas do seu tipo de caso",
  "Canais do Juizado do seu estado",
  "Acesso liberado assim que o Pix é confirmado",
  "Reembolso em até 7 dias, conforme o Código de Defesa do Consumidor",
  "Suporte por WhatsApp",
];

export default function OfferSection() {
  return (
    <section id="preco" className="px-5 sm:px-6 py-16 sm:py-24 bg-[var(--tinta)] border-t border-white/10">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl sm:text-4xl leading-tight text-[var(--papel)]">Quanto custa</h2>
        <p className="mt-3 text-[var(--papel)]/70 text-lg">Um pagamento, sem mensalidade.</p>

        <div className="mt-8 rounded-md border border-white/15 bg-white/[0.04] p-7 sm:p-9">
          <p className="font-[family-name:var(--font-serif)] text-6xl font-semibold text-[var(--papel)]">R$ {PRECO_INT}</p>
          <p className="mt-1 text-[var(--papel)]/60">via Pix, com direito a 3 petições</p>
          <ul className="mt-7 space-y-3 list-none p-0">
            {BENEFITS.map((b) => (
              <li key={b} className="flex gap-3 text-[var(--papel)]/85 leading-snug">
                <span aria-hidden="true" className="text-[var(--papel)]/50">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <Link href="/login" className="mt-8 clip-custom block text-center bg-[var(--papel)] hover:bg-white text-[var(--tinta)] font-semibold text-lg px-6 py-4 transition-colors">
            Montar minha petição
          </Link>
          <p className="mt-4 text-xs text-[var(--papel)]/55 leading-relaxed">
            O RecuperaJogo não é escritório de advocacia nem garante resultado. Você assina e protocola em seu nome.
          </p>
        </div>
      </div>
    </section>
  );
}
