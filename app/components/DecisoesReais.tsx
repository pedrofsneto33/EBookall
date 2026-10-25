import { ExternalLink } from "lucide-react";
import Reveal from "./Reveal";

const CASOS = [
  { uf: "TJSP", proc: "4000778-26.2026.8.26.0248", t: "Autoexclusão não bloqueada no prazo", v: "Devolução de R$ 81 mil", d: "Casa continuou aceitando depósitos e apostas depois da autoexclusão. Fundamento: dever de segurança e de jogo responsável. Há recurso pendente.", href: "https://bnldata.com.br/justica-condena-plataforma-de-apostas-por-falha-em-autoexclusao-de-apostador/", fonte: "BNL Data" },
  { uf: "TJSC · Tubarão", proc: "5005803-28.2025.8.24.0075", t: "Falha no dever de jogo responsável", v: "Cerca de R$ 217 mil + R$ 10 mil de dano moral", d: "Aplicou CDC, Lei 14.790/23 e Portaria SPA/MF 1.231/24. A ré não contestou.", href: "https://www.migalhas.com.br/quentes/448239/casa-de-aposta-devolve-r-217-mil-por-violar-dever-de-jogo-responsavel", fonte: "Migalhas" },
  { uf: "TJDFT · 3ª Turma Cível (acórdão)", proc: "0707743-74.2025.8.07.0001", t: "Ludopatia: apostas anuladas", v: "Devolução de R$ 180.963,12 (abatidos os ganhos) + R$ 4 mil de dano moral", d: "Tribunal manteve a nulidade das apostas de consumidor com diagnóstico de ludopatia e reconheceu falha da casa em bloquear o acesso após pedido no chat. Valor acima do limite sem advogado: casos assim exigem advogado ou Defensoria.", href: "https://www.tjdft.jus.br/institucional/imprensa/noticias/2026/junho/tjdft-anula-apostas-e-condena-plataforma-a-devolver-r-180-mil-a-consumidor-com-ludopatia", fonte: "TJDFT (site oficial)" },
  { uf: "TJDFT · 3ª Turma Recursal dos Juizados", proc: "0759332-60.2025.8.07.0016", t: "Conta suspensa sem provar irregularidade", v: "Restituição de R$ 7.000 mantida", d: "Juizado Especial de Águas Claras/DF. A casa suspendeu a conta sem avisar nem provar a violação dos termos de uso e não contestou o saldo, embora tivesse acesso exclusivo aos dados. Decisão unânime. Dentro do limite de 20 salários: dá para fazer sem advogado.", href: "https://www.tjdft.jus.br/institucional/imprensa/noticias/2026/abril/tjdft-mantem-condenacao-de-plataforma-de-apostas-que-suspendeu-conta-sem-comprovar-irregularidade", fonte: "TJDFT (site oficial)" },
];

export default function DecisoesReais() {
  return (
    <section id="decisoes" className="relative z-10 px-4 py-14">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">Decisões reais</p>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">A Justiça já decidiu casos assim</h2>
          <p className="text-white/50 text-sm mb-8 max-w-2xl">Decisões noticiadas pela imprensa e pelo próprio tribunal (duas sentenças de primeira instância e dois acórdãos). Cada caso depende das provas e pode ser reformado em recurso. Não é garantia de resultado.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {CASOS.map((c) => (
            <div key={c.proc} className="card-lift rounded-2xl border border-white/10 bg-[#0B1018] p-6">
              <p className="text-[11px] font-mono text-emerald-300/80">{c.uf} · proc. {c.proc}</p>
              <h3 className="text-lg font-bold mt-2">{c.t}</h3>
              <p className="text-2xl font-black text-emerald-300 my-2">{c.v}</p>
              <p className="text-sm text-white/60 leading-relaxed mb-3">{c.d}</p>
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white">
                Fonte: {c.fonte} <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
