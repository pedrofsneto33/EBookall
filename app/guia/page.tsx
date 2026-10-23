import Link from "next/link";
import { BookOpen, ArrowRight, AlertTriangle } from "lucide-react";
import CapturaLead from "../components/CapturaLead";
import { LIMITE_JUS_POSTULANDI, formatarMoeda } from "../lib/config";

export default function GuiaPage() {
  return (
    <div className="min-h-screen w-full bg-[#05080C] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full" />

      <header className="border-b px-6 py-4 flex items-center justify-between bg-[#05080C]/90 backdrop-blur-lg border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-emerald-500">
            RJ
          </div>
          <span className="text-[15px] font-semibold text-white">RecuperaJogo</span>
        </Link>
        <Link
          href="/"
          className="text-sm font-medium hover:underline text-white/70 hover:text-white"
        >
          ← Voltar
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookOpen size={14} /> Guia gratuito
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white">
            Recuperei meu dinheiro das bets sozinho — e você também pode
          </h1>
          <p className="text-lg text-white/70">
            Guia prático do Juizado Especial: fatos, provas e jus postulandi. Sem milagre.
          </p>
        </div>

        <div className="flex gap-3 items-start rounded-xl border px-4 py-3 mb-8 bg-amber-500/10 border-amber-500/20">
          <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-400" />
          <p className="text-sm leading-relaxed text-amber-200">
            <strong>Aviso:</strong> material educativo. Não é assessoria jurídica. Quem revisa e protocola é você.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <Capitulo n="1" titulo="Você não está sozinho" texto={`Depósito indevido após bloqueio, suporte evasivo e endividamento são padrões do setor — não só azar individual. O Juizado Especial existe para causas até ${formatarMoeda(LIMITE_JUS_POSTULANDI)}, sem advogado (jus postulandi).`} />
          <Capitulo n="2" titulo="Dois erros que pioram tudo" texto="Apostar de novo para 'recuperar' aprofunda o buraco. Reclamar só no suporte da casa, sem provas organizadas, quase nunca resolve." />
          <Capitulo n="3" titulo="O caminho do Juizado Especial" texto="Lei 9.099/95, art. 9º: em causas até 20 SM você protocola sozinho no JEC. Organize provas, monte o argumento (CDC + Lei 14.790/2023) e protocole." />
        </div>

        <div className="my-12"><CapturaLead /></div>

        <div className="space-y-6 mt-12">
          <Capitulo n="4" titulo="Reúna as provas certas" texto="Extratos, comprovantes Pix, prints de bloqueio, chat com protocolo, consumidor.gov.br, CNPJ da casa. Uma pasta só, arquivos com data no nome." />
          <Capitulo n="5" titulo="Base legal real" texto="Lei 14.790/2023 art. 26 (ludopatia), dever de monitoramento da operadora, CDC art. 14 e 42. Laudo (CID F63.0 / 6C50) fortalece — disponível no CAPS/SUS." />
          <Capitulo n="6" titulo="Protocolar e o que esperar" texto="PJe/e-Proc ou presencial. Guarde cópias. Haverá conciliação. Prazos são curtos. Sem garantia de vitória — prova e organização fazem diferença." />
          <Capitulo n="7" titulo="Mais que o dinheiro" texto="Autoexclusão em gov.br/autoexclusaoapostas. CAPS e UBS são gratuitos. O RecuperaJogo formata a petição com os argumentos — você revisa, assina e protocola." />

          <div className="rounded-2xl border p-8 text-center mt-12 bg-white/5 border-emerald-500/30">
            <h2 className="text-2xl font-bold mb-4 text-white">Pronto para montar a petição?</h2>
            <div className="max-w-md mx-auto mb-6 p-4 rounded-xl text-left text-sm bg-white/5 border border-white/10 text-white/70">
              <p className="mb-2"><strong className="text-white">Comparação:</strong></p>
              <p className="mb-1">Advogado por êxito: 20–40% do recuperado.</p>
              <p>RecuperaJogo: <strong className="text-white">R$ 137</strong> uma vez. Você fica com 100% do que recuperar.</p>
            </div>
            <a href="/login" className="inline-flex items-center gap-2 text-[15px] font-semibold px-8 py-3.5 rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
              Gerar minha petição · R$ 137 <ArrowRight size={18} />
            </a>
            <p className="text-xs mt-3 text-white/60">3 petições · Garantia 7 dias · Stripe</p>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 px-6 text-center bg-[#05080C] border-white/10">
        <Link href="/politica-privacidade" className="text-xs hover:underline text-white/60 hover:text-white">Política de Privacidade</Link>
        <p className="text-xs mt-2 text-white/60">© {new Date().getFullYear()} Primex Sistemas · RecuperaJogo</p>
      </footer>
    </div>
  );
}

function Capitulo({ n, titulo, texto }: { n: string; titulo: string; texto: string }) {
  return (
    <div className="rounded-xl border p-6 bg-white/5 border-white/10">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-emerald-500">{n}</div>
        <h3 className="text-lg font-bold text-emerald-400">{titulo}</h3>
      </div>
      <p className="text-sm leading-relaxed text-white/70">{texto}</p>
    </div>
  );
}
