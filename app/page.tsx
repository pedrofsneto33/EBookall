import Link from "next/link";
import { Scale, FileText, CheckCircle2, ArrowRight, Shield, AlertTriangle, Heart, BookOpen, Gavel, Lock, Calculator, MapPin } from "lucide-react";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const PAPER_LINE = "#E4DFD1";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";
const GREEN_BG = "#F0FDF4";
const GREEN_BORDER = "#BBF7D0";

export default function LandingPage() {
  const stripeLink = "https://buy.stripe.com/3cIbJ12W71ZUgAofGZeQM00";

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: PAPER }}>
      
      {/* HEADER */}
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
        <div className="flex items-center gap-2">
          <Scale size={22} style={{ color: SEAL }} />
          <span className="text-xl font-bold" style={{ color: INK, fontFamily: "Georgia, serif" }}>
            RecuperaJogo
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/guia" className="text-sm font-medium hover:underline" style={{ color: INK_SOFT }}>
            Guia Gratuito
          </Link>
          <Link 
            href="/login" 
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-colors hover:bg-[#EFEADE]"
            style={{ borderColor: SEAL, color: SEAL }}
          >
            Acessar Sistema
          </Link>
        </div>
      </header>

      {/* HERO COM DUAS PORTAS */}
      <section className="max-w-4xl mx-auto text-center px-4 py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6" style={{ backgroundColor: AMBER_BG, color: "#5C4A22", border: `1px solid ${AMBER_BORDER}` }}>
          <Shield size={14} />
          Baseado na Lei 14.790/2023, IN 31/2025 e no CDC
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: INK, fontFamily: "Georgia, serif" }}>
          A casa de apostas devia ter te protegido. Não protegeu.
        </h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
          Seja porque ignorou seu pedido de autoexclusão, seja porque nunca quis perceber que você não conseguia mais parar — a lei te dá o direito de cobrar isso, sozinho, no Juizado Especial.
        </p>

        {/* DUAS PORTAS */}
        <div className="grid sm:grid-cols-2 gap-6 text-left mb-10">
          <a href="/gerador?perfil=autoexclusao"
             className="block border-2 rounded-xl p-6 text-left hover:shadow-lg transition-all"
             style={{ borderColor: PAPER_LINE, backgroundColor: "#FFF" }}>
            <span className="text-3xl"></span>
            <h3 className="font-semibold text-lg mt-2 mb-1" style={{ color: INK }}>
              Fui bloqueado e mesmo assim consegui depositar de novo
            </h3>
            <p className="text-sm" style={{ color: INK_SOFT }}>
              Sua autoexclusão foi ignorada pela casa de apostas. A lei obriga a devolução, muitas vezes em dobro.
            </p>
          </a>

          <a href="/gerador?perfil=ludopatia"
             className="block border-2 rounded-xl p-6 text-left hover:shadow-lg transition-all"
             style={{ borderColor: GREEN_BORDER, backgroundColor: GREEN_BG }}>
            <span className="text-3xl">🎰</span>
            <h3 className="font-semibold text-lg mt-2 mb-1" style={{ color: INK }}>
              Não consigo controlar quanto aposto
            </h3>
            <p className="text-sm" style={{ color: INK_SOFT }}>
              A Lei das Bets (art. 26) considera nulas apostas de quem tem diagnóstico de jogo patológico. A Justiça já mandou casas devolverem valores assim.
            </p>
          </a>
        </div>

        {/* CTA PRINCIPAL */}
        <a 
          href={stripeLink}
          className="inline-flex items-center gap-2 text-lg font-bold px-8 py-4 rounded-lg transition-transform hover:scale-105 shadow-lg"
          style={{ backgroundColor: SEAL, color: "#FFF" }}
        >
          Gerar Minha Petição Agora
          <ArrowRight size={20} />
        </a>

        <p className="text-xs mt-4 max-w-xl mx-auto" style={{ color: INK_SOFT }}>
          <AlertTriangle size={12} className="inline mr-1" />
          Isto não é assessoria jurídica. Ferramenta de automação para causas até 20 salários-mínimos (jus postulandi). Revise antes de protocolar.
        </p>
      </section>

      {/* MINHA HISTÓRIA */}
      <section className="py-16 px-6" style={{ backgroundColor: "#F2EFE6" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={24} style={{ color: SEAL }} />
            <h2 className="text-2xl font-bold" style={{ color: INK, fontFamily: "Georgia, serif" }}>
              Minha História
            </h2>
          </div>
          
          <div className="space-y-4 text-base leading-relaxed" style={{ color: INK }}>
            <p>
              Não sou advogado. Sou uma pessoa comum que decidiu não aceitar calado quando uma casa de apostas fez algo que eu sabia que estava errado.
            </p>
            <p>
              Usando o <em>jus postulandi</em> — o direito de processar sozinho em causas até 20 salários-mínimos — entrei com ação contra duas casas de apostas diferentes. Recuperei o valor de uma delas em dobro, como manda o Código de Defesa do Consumidor. Da outra, o dinheiro voltou antes mesmo do processo terminar.
            </p>
            <p>
              Numa terceira causa, não foi tão simples: perdi na primeira instância. Podia ter parado ali. Não parei — entrei com recurso, porque continuava acreditando no argumento e tinha a prova pra sustentar. Esse processo segue até hoje.
            </p>
            <p>
              Foi nesse caminho — juntando prova, entendendo a lei, errando e ajustando — que percebi uma coisa: quase ninguém sabe que pode fazer isso sozinho. A maioria acha que precisa de advogado, desiste na primeira resposta automática do suporte, ou nem sabe que existe uma lei que torna nulas as apostas de quem tem ludopatia.
            </p>
            <p className="font-semibold border-l-4 pl-4 py-2" style={{ color: SEAL, borderColor: SEAL }}>
              Meu caso foi sobre autoexclusão ignorada. Construí esse site também pra quem vive a outra parte dessa mesma realidade: a perda de controle. O RecuperaJogo existe pra encurtar esse caminho pra quem está exatamente onde eu estava.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE ESTÁ INCLUSO */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: INK, fontFamily: "Georgia, serif" }}>
            O que você recebe ao acessar o sistema
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: FileText, title: "Gerador de Petição em PDF", desc: "Formatação forense profissional (Times New Roman, justificado), pronto para imprimir e protocolar." },
              { icon: Gavel, title: "Argumentos Jurídicos Blindados", desc: "Lei 14.790/2023 (art. 26), IN 31/2025, Art. 42 do CDC e jurisprudência real já inseridos." },
              { icon: Calculator, title: "Calculadora de Juros e Danos Morais", desc: "Estimativa exata do valor da causa com trava de segurança para o limite do JEC." },
              { icon: Lock, title: "3 Petições Completas Inclusas", desc: "Seu investimento único de R$ 137 garante a geração de até 3 petições completas." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-white border" style={{ borderColor: PAPER_LINE }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: AMBER_BG }}>
                  <item.icon size={20} style={{ color: SEAL }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: INK }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: INK_SOFT }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO ÉTICA / SAÚDE MENTAL */}
      <section className="py-16 px-6" style={{ backgroundColor: "#F2EFE6" }}>
        <div className="max-w-3xl mx-auto">
          <div className="p-6 rounded-xl border-2" style={{ borderColor: GREEN_BORDER, backgroundColor: GREEN_BG }}>
            <div className="flex items-center gap-3 mb-4">
              <Heart size={24} style={{ color: "#16A34A" }} />
              <h2 className="text-xl font-bold" style={{ color: INK }}>
                Antes de processar, cuide de você
              </h2>
            </div>
            <p className="text-sm mb-4" style={{ color: INK_SOFT }}>
              Processar é sobre justiça, não sobre voltar a apostar. Se você sente que perdeu o controle, existe ajuda gratuita e oficial:
            </p>
            <ul className="space-y-2 text-sm" style={{ color: INK }}>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: "#16A34A" }} />
                <span><strong>Autoexclusão Governamental:</strong> Acesse gov.br/autoexclusaoapostas. Bloqueia todas as casas licenciadas em 72h.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: "#16A34A" }} />
                <span><strong>Apoio Psicológico Gratuito (SUS):</strong> Procure o CAPS ou sua UBS mais próxima. Não exige comprovação, é só chegar. <strong>O laudo obtido aqui também fortalece seu processo.</strong></span>
              </li>
            </ul>
            
            <div className="mt-6 text-center">
              <a 
                href="https://rsa.cnj.jus.br/ja/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border transition-colors hover:bg-white"
                style={{ borderColor: "#16A34A", color: "#16A34A" }}
              >
                <MapPin size={16} />
                Encontre o Juizado Especial mais perto de você
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PREÇO E CTA FINAL */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: INK }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: PAPER, fontFamily: "Georgia, serif" }}>
            Pronto para exigir o que é seu?
          </h2>
          <p className="text-base mb-8" style={{ color: INK_SOFT }}>
            Pagamento único. Sem mensalidades.
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: INK_SOFT }}>
              Investimento Único
            </p>
            <div className="flex items-baseline justify-center gap-1 mb-4">
              <span className="text-4xl font-bold" style={{ color: INK }}>R$ 137</span>
            </div>
            <p className="text-sm mb-6" style={{ color: INK_SOFT }}>
              <strong>3 petições completas inclusas</strong> + calculadora + argumentos da Lei 14.790/2023.
              <br />
              Menos do que um honorário de advogado — e com o mesmo resultado jurídico.
            </p>
            
            <a 
              href={stripeLink}
              className="block w-full text-center text-base font-bold px-6 py-4 rounded-lg transition-transform hover:scale-105"
              style={{ backgroundColor: SEAL, color: "#FFF" }}
            >
              Quero Gerar Minha Petição
            </a>

            <p className="text-[10px] mt-4" style={{ color: INK_SOFT }}>
              Pagamento 100% seguro via Stripe. Acesso liberado na hora.
            </p>
          </div>

          <p className="text-xs max-w-xl mx-auto" style={{ color: "#8A96A6" }}>
            <AlertTriangle size={12} className="inline mr-1" />
            O gerador não exige laudo médico, mas quanto mais evidência você reunir (prints, e-mails, protocolos, laudo do CAPS), mais forte fica seu argumento perante o juiz.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 px-6 text-center" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
        <p className="text-xs" style={{ color: INK_SOFT }}>
          © {new Date().getFullYear()} RecuperaJogo. Todos os direitos reservados.
          <br />
          Este site não possui vínculo com o Poder Judiciário ou com a Secretaria de Prêmios e Apostas (SPA/MF).
        </p>
      </footer>

    </div>
  );
}