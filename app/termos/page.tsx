import Link from "next/link";
import { Scale, ArrowLeft, FileText, AlertTriangle, CreditCard, Ban } from "lucide-react";

export default function TermosPage() {
  return (
    <div className="min-h-screen w-full bg-[#05080C] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full" />

      <header className="border-b px-6 py-4 flex items-center justify-between bg-[#05080C]/90 backdrop-blur-lg border-white/10">
        <div className="flex items-center gap-2">
          <Scale size={22} className="text-emerald-400" />
          <span className="text-xl font-bold text-white">RecuperaJogo</span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border transition-colors bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <ArrowLeft size={16} /> Voltar para Home
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <FileText size={28} className="text-emerald-400" />
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
            Termos de Uso
          </h1>
        </div>
        <p className="text-sm mb-8 text-white/70">Última atualização: 07 de agosto de 2026</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
          <div className="space-y-8 text-base leading-relaxed text-white/70">
            <div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-emerald-400">
                <FileText size={20} className="text-emerald-400" /> 1. O que somos
              </h2>
              <p>
                O RecuperaJogo é um software de automação de documentos. Não somos um escritório de
                advocacia e não prestamos assessoria jurídica. O usuário é o autor da petição e deve
                revisar o documento antes de protocolar.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-emerald-400">
                <AlertTriangle size={20} className="text-emerald-400" /> 2. Responsabilidade
              </h2>
              <p>
                O usuário é responsável pela revisão e protocolo da petição. O RecuperaJogo não
                garante o resultado da ação judicial, que depende das provas e da decisão do juiz.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-emerald-400">
                <CreditCard size={20} className="text-emerald-400" /> 3. Pagamento
              </h2>
              <p>
                O acesso é liberado mediante pagamento de R$ 137 via Pix. Você tem direito de
                arrependimento (reembolso) em até 7 dias, conforme o Código de Defesa do Consumidor
                (CDC).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-emerald-400">
                <Ban size={20} className="text-emerald-400" /> 4. Limite de uso
              </h2>
              <p>
                O acesso permite a geração de até 3 petições completas. Você pode editar e regerar o
                mesmo caso sem custo extra.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/" className="text-emerald-400 hover:underline text-sm">
            ← Voltar para a página inicial
          </Link>
        </div>
      </main>

      <footer className="border-t py-8 px-6 text-center border-white/10">
        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} RecuperaJogo. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}