import { PERFIS, PERFIL_LABEL, formatarMoeda, LIMITE_JUS_POSTULANDI } from "@/app/lib/config";

const LINHAS = [
  {
    item: "O texto da petição",
    generico: "Igual para qualquer processo.",
    nosso: "Argumentos do seu tipo de caso: autoexclusão ignorada, dever de segurança, bônus e rollover, conta bloqueada e outros.",
  },
  {
    item: "As provas",
    generico: "Você descobre sozinho o que juntar.",
    nosso: "Lista de provas do seu tipo de caso, que já entra na petição como anexos.",
  },
  {
    item: "O limite sem advogado",
    generico: "Você faz a conta.",
    nosso: `Calcula o limite de ${formatarMoeda(LIMITE_JUS_POSTULANDI)} (20 salários mínimos) e avisa quando o valor passa dele.`,
  },
  {
    item: "Onde protocolar",
    generico: "Você pesquisa no site do tribunal.",
    nosso: "Mostra os canais do Juizado do seu estado, com a data da última conferência.",
  },
  {
    item: "A empresa",
    generico: "Você confere o CNPJ por conta própria.",
    nosso: "Confere o CNPJ da casa de apostas na Receita Federal, para você não processar a empresa errada.",
  },
];

export default function Especializado() {
  return (
    <section id="casos" className="px-5 sm:px-6 py-16 sm:py-24 bg-[var(--tinta)] border-t border-white/10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-4xl leading-tight text-[var(--papel)] max-w-3xl">
          Não é um modelo genérico. É feito só para casos de apostas.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--papel)]/70 max-w-2xl leading-relaxed">
          Um gerador comum entrega o mesmo texto para qualquer processo. Aqui, cada tipo de caso tem os seus
          próprios argumentos, provas e avisos.
        </p>

        <h3 className="mt-12 text-xl text-[var(--papel)] font-[family-name:var(--font-serif)] font-semibold">
          Os {PERFIS.length} tipos de caso que o gerador cobre
        </h3>
        <ul className="mt-5 grid sm:grid-cols-2 gap-x-10 gap-y-5 list-none p-0">
          {PERFIS.map((p) => (
            <li key={p} className="border-t border-white/10 pt-4">
              <p className="font-semibold text-[var(--papel)] leading-snug">{PERFIL_LABEL[p].titulo}</p>
              <p className="mt-1 text-sm text-[var(--papel)]/65 leading-relaxed">{PERFIL_LABEL[p].desc}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 text-xl text-[var(--papel)] font-[family-name:var(--font-serif)] font-semibold">
          O que muda na prática
        </h3>
        <div className="mt-5 rounded-md border border-white/10 overflow-hidden">
          <div className="hidden md:grid grid-cols-[180px_1fr_1.4fr] bg-white/5 text-sm font-semibold text-[var(--papel)]/80">
            <div className="p-4" />
            <div className="p-4 border-l border-white/10">Modelo genérico de petição</div>
            <div className="p-4 border-l border-white/10 text-[var(--papel)]">RecuperaJogo</div>
          </div>
          {LINHAS.map((l) => (
            <div key={l.item} className="grid md:grid-cols-[180px_1fr_1.4fr] border-t border-white/10 first:border-t-0 md:first:border-t">
              <div className="p-4 pb-1 md:pb-4 font-semibold text-[var(--papel)]">{l.item}</div>
              <div className="px-4 py-1 md:p-4 md:border-l border-white/10 text-[var(--papel)]/55 text-sm leading-relaxed">
                <span className="md:hidden font-semibold">Modelo genérico: </span>
                {l.generico}
              </div>
              <div className="px-4 pt-1 pb-4 md:p-4 md:border-l border-white/10 text-[var(--papel)]/90 text-sm leading-relaxed">
                <span className="md:hidden font-semibold">RecuperaJogo: </span>
                {l.nosso}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
