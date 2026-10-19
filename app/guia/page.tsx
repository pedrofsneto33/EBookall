import Link from "next/link";
import { BookOpen, ArrowRight, AlertTriangle } from "lucide-react";
import CapturaLead from "../components/CapturaLead";

const INK = "#0F1C2E";
const INK_SOFT = "#4A5B6E";
const PAPER = "#FAF8F4";
const PAPER_LINE = "#E6E1D6";
const SEAL = "#1B6B4A";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";

export default function GuiaPage() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: PAPER }}>
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: SEAL }}>RJ</div>
          <span className="text-[15px] font-semibold" style={{ color: INK }}>RecuperaJogo</span>
        </Link>
        <Link href="/" className="text-sm font-medium hover:underline" style={{ color: INK_SOFT }}>← Voltar</Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: AMBER_BG, color: "#5C4A22", border: `1px solid ${AMBER_BORDER}` }}>
            <BookOpen size={14} /> Guia gratuito
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: INK }}>
            Recuperei meu dinheiro das bets sozinho — e você também pode
          </h1>
          <p className="text-lg" style={{ color: INK_SOFT }}>
            Guia prático do Juizado Especial: fatos, provas e jus postulandi. Sem milagre.
          </p>
        </div>

        <div className="flex gap-3 items-start rounded-xl border px-4 py-3 mb-8" style={{ backgroundColor: AMBER_BG, borderColor: AMBER_BORDER }}>
          <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: SEAL }} />
          <p className="text-sm leading-relaxed" style={{ color: "#5C4A22" }}>
            <strong>Aviso:</strong> material educativo. Não é assessoria jurídica. Quem revisa e protocola é você.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <Capitulo n="1" titulo="Você não está sozinho" texto="Depósito indevido após bloqueio, suporte evasivo e endividamento são padrões do setor — não só azar individual. O Juizado Especial existe para causas até 20 salários mínimos, sem advogado (jus postulandi)." />
          <Capitulo n="2" titulo="Dois erros que pioram tudo" texto="Apostar de novo para 'recuperar' aprofunda o buraco. Reclamar só no suporte da casa, sem provas organizadas, quase nunca resolve." />
          <Capitulo n="3" titulo="O caminho do Juizado Especial" texto="Lei 9.099/95, art. 9º: em causas até 20 SM você protocola sozinho no JEC. Organize provas, monte o argumento (CDC + Lei 14.790/2023) e protocole." />
        </div>

        <div className="my-12"><CapturaLead /></div>

        <div className="space-y-6 mt-12">
          <Capitulo n="4" titulo="Reúna as provas certas" texto="Extratos, comprovantes Pix, prints de bloqueio, chat com protocolo, consumidor.gov.br, CNPJ da casa. Uma pasta só, arquivos com data no nome." />
          <Capitulo n="5" titulo="Base legal real" texto="Lei 14.790/2023 art. 26 (ludopatia), dever de monitoramento da operadora, CDC art. 14 e 42. Laudo (CID F63.0 / 6C50) fortalece — disponível no CAPS/SUS." />
          <Capitulo n="6" titulo="Protocolar e o que esperar" texto="PJe/e-Proc ou presencial. Guarde cópias. Haverá conciliação. Prazos são curtos. Sem garantia de vitória — prova e organização fazem diferença." />
          <Capitulo n="7" titulo="Mais que o dinheiro" texto="Autoexclusão em gov.br/autoexclusaoapostas. CAPS e UBS são gratuitos. O RecuperaJogo formata a petição com os argumentos — você revisa, assina e protocola." />

          <div className="rounded-2xl border-2 p-8 text-center mt-12" style={{ borderColor: SEAL, backgroundColor: "#FFF" }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: INK }}>Pronto para montar a petição?</h2>
            <div className="max-w-md mx-auto mb-6 p-4 rounded-xl text-left text-sm" style={{ backgroundColor: AMBER_BG, border: `1px solid ${AMBER_BORDER}`, color: "#5C4A22" }}>
              <p className="mb-2"><strong>Comparação:</strong></p>
              <p className="mb-1">Advogado por êxito: 20–40% do recuperado.</p>
              <p>RecuperaJogo: <strong>R$ 137</strong> uma vez. Você fica com 100% do que recuperar.</p>
            </div>
            <a href="/login" className="inline-flex items-center gap-2 text-[15px] font-semibold px-8 py-3.5 rounded-xl text-white" style={{ backgroundColor: SEAL }}>
              Gerar minha petição · R$ 137 <ArrowRight size={18} />
            </a>
            <p className="text-xs mt-3" style={{ color: INK_SOFT }}>3 petições · Garantia 7 dias · Stripe</p>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 px-6 text-center" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
        <Link href="/politica-privacidade" className="text-xs hover:underline" style={{ color: INK_SOFT }}>Política de Privacidade</Link>
        <p className="text-xs mt-2" style={{ color: INK_SOFT }}>© {new Date().getFullYear()} Primex Sistemas · RecuperaJogo</p>
      </footer>
    </div>
  );
}

function Capitulo({ n, titulo, texto }: { n: string; titulo: string; texto: string }) {
  return (
    <div className="rounded-xl border p-6" style={{ backgroundColor: "#FFF", borderColor: PAPER_LINE }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: SEAL }}>{n}</div>
        <h3 className="text-lg font-bold" style={{ color: INK }}>{titulo}</h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>{texto}</p>
    </div>
  );
}
