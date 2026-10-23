import Link from "next/link";
import {
  HeartPulse,
  ShieldCheck,
  Phone,
  AlertTriangle,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

const canais = [
  {
    title: "CVV — Centro de Valorização da Vida",
    description:
      "Ligue 188 (ligação gratuita, sigilosa, 24h) ou acesse o site para conversar por chat/e-mail.",
    link: "https://www.cvv.org.br",
    linkLabel: "cvv.org.br",
  },
  {
    title: "CAPS — Centros de Atenção Psicossocial",
    description:
      "Procure a UBS mais próxima ou um CAPS AD (Álcool e Drogas). O atendimento é gratuito pelo SUS.",
    link: "https://www.gov.br/saude",
    linkLabel: "gov.br/saude",
  },
  {
    title: "Jogadores Anônimos (JA)",
    description:
      "Grupos de apoio presenciais e online para quem quer parar de jogar.",
    link: "https://www.jogadoresanonimos.com.br",
    linkLabel: "jogadoresanonimos.com.br",
  },
];

const bloqueios = [
  {
    title: "Gamban",
    description:
      "Aplicativo pago (com opção de bolsa gratuita em alguns casos) que bloqueia sites e apps de apostas em todos os dispositivos (Android, iOS, Windows, Mac). Atua no nível do dispositivo, independente da operadora.",
    link: "https://gamban.com",
    linkLabel: "gamban.com",
  },
  {
    title: "BetBlocker",
    description:
      "Alternativa gratuita e anônima. Bloqueia mais de 1 milhão de sites de apostas. Pode ser configurado por tempo determinado.",
    link: "https://betblocker.org",
    linkLabel: "betblocker.org",
  },
];

const sinais = [
  "Necessidade de apostar quantias cada vez maiores.",
  "Inquietação ou irritabilidade ao tentar parar.",
  "Mentir para esconder o quanto joga.",
  "Apostar para fugir de sentimentos ruins (ansiedade, culpa).",
  "Prejudicar relacionamentos ou o trabalho por causa do jogo.",
];

export const metadata = {
  title: "Apoio e Autoexclusão — RecuperaJogo",
  description:
    "Recursos de apoio para pessoas com ludopatia: canais gratuitos, bloqueio de apostas e autoexclusão oficial.",
};

export default function ApoioPage() {
  return (
    <div className="min-h-screen bg-[#05080C] text-white">
      <header className="border-b border-white/10 bg-[#05080C]/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-black tracking-tight text-lg">
            Recupera<span className="text-emerald-400">Jogo</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden py-24 px-6">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full" />
        <div className="relative mx-auto max-w-3xl text-center">
          <HeartPulse className="mx-auto mb-6 text-emerald-400" size={48} />
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">
            Você não está sozinho. Buscar ajuda é o primeiro passo.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-400 leading-relaxed">
            A ludopatia é uma condição de saúde reconhecida. Existe tratamento
            gratuito pelo SUS e canais de apoio emocional disponíveis 24h.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">
            Canais de ajuda gratuitos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {canais.map((c) => (
              <div
                key={c.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <Phone className="text-emerald-400 mb-4" size={24} />
                <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {c.description}
                </p>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
                >
                  {c.linkLabel}
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-emerald-400" size={28} />
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Bloqueie o acesso
            </h2>
          </div>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-3xl">
            Bloquear o acesso é uma ferramenta de proteção. Instale em todos os
            dispositivos que você usa.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {bloqueios.map((b) => (
              <div
                key={b.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {b.description}
                </p>
                <a
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
                >
                  {b.linkLabel}
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/5">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Autoexclusão oficial
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            O Governo Federal possui uma Plataforma Centralizada de
            Autoexclusão (Ministério da Fazenda). Ao se autoexcluir, você bloqueia
            seu CPF de acessar todas as casas de apostas autorizadas no Brasil.
          </p>
          <a
            href="https://www.gov.br/autoexclusaoapostas"
            target="_blank"
            rel="noopener noreferrer"
            className="clip-custom inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-base px-6 py-3 transition-colors"
          >
            Acessar plataforma oficial
            <ExternalLink size={18} />
          </a>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/5">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-amber-400" size={28} />
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Quando o jogo deixa de ser diversão
            </h2>
          </div>
          <ul className="space-y-3">
            {sinais.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 text-zinc-300 leading-relaxed"
              >
                <AlertTriangle
                  className="text-amber-400 shrink-0 mt-1"
                  size={18}
                />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 px-6 border-t border-white/5">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs text-white/50 leading-relaxed">
            Esta página é um recurso informativo. O RecuperaJogo não é um serviço
            de saúde mental. Se você está em crise, ligue 188 (CVV).
          </p>
        </div>
      </section>

      <section className="py-12 px-6 border-t border-white/5">
        <div className="mx-auto max-w-3xl text-center">
          <MessageCircle className="mx-auto mb-3 text-emerald-400" size={24} />
          <p className="text-sm text-white/60">
            Precisa de orientação sobre seus direitos?{" "}
            <Link href="/" className="text-emerald-400 hover:text-emerald-300">
              Voltar ao RecuperaJogo
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

