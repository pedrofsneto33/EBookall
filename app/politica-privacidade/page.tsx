import Link from "next/link";
import { Scale, ArrowLeft, Shield, Database, Eye, Lock, Mail } from "lucide-react";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const PAPER_LINE = "#E4DFD1";
const SEAL = "#8A6D3B";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: PAPER }}>
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
        <div className="flex items-center gap-2">
          <Scale size={22} style={{ color: SEAL }} />
          <span className="text-xl font-bold" style={{ color: INK, fontFamily: "Georgia, serif" }}>RecuperaJogo</span>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border transition-colors hover:bg-[#EFEADE]" style={{ borderColor: SEAL, color: SEAL }}>
          <ArrowLeft size={16} /> Voltar para Home
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-6">
          <Shield size={28} style={{ color: SEAL }} />
          <h1 className="text-3xl font-bold" style={{ color: INK, fontFamily: "Georgia, serif" }}>Política de Privacidade</h1>
        </div>
        <p className="text-sm mb-8" style={{ color: INK_SOFT }}>Última atualização: 07 de agosto de 2026</p>

        <div className="space-y-8 text-base leading-relaxed" style={{ color: INK }}>
          <p>O RecuperaJogo valoriza a sua privacidade e está em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>

          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: INK, fontFamily: "Georgia, serif" }}><Database size={20} style={{ color: SEAL }} /> 1. Dados que Coletamos</h2>
            <ul className="list-disc pl-6 space-y-1" style={{ color: INK_SOFT }}>
              <li><strong>Identificação:</strong> nome completo, CPF, endereço, e-mail.</li>
              <li><strong>Dados do caso:</strong> relato dos fatos, valores, nome da casa de apostas.</li>
              <li><strong>Dado sensível (quando aplicável):</strong> no fluxo de ludopatia, informações sobre saúde (perda de controle, diagnóstico) são tratadas com consentimento específico, conforme art. 11 da LGPD.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: INK, fontFamily: "Georgia, serif" }}><Eye size={20} style={{ color: SEAL }} /> 2. Finalidade e Base Legal</h2>
            <p>Seus dados são utilizados exclusivamente para: (a) gerar o documento solicitado (execução de contrato, art. 7º, V); (b) processar o pagamento via Stripe; (c) prestar suporte. <strong>Nunca</strong> vendemos ou compartilhamos seus dados com terceiros para fins de marketing.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: INK, fontFamily: "Georgia, serif" }}><Lock size={20} style={{ color: SEAL }} /> 3. Segurança e Armazenamento</h2>
            <p>Utilizamos infraestrutura segura (Supabase/Vercel). Os dados são armazenados de forma criptografada pelo prazo necessário para a prestação do serviço ou até você solicitar a exclusão.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: INK, fontFamily: "Georgia, serif" }}><Mail size={20} style={{ color: SEAL }} /> 4. Seus Direitos e Contato</h2>
            <p>Você pode solicitar acesso, correção ou exclusão total dos seus dados a qualquer momento. Para exercer esses direitos ou tirar dúvidas, envie um e-mail para: <strong>[pedrofsnet0@gmail.com]</strong> ou entre em contato pelo WhatsApp (86) 98811-7925.</p>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 px-6 text-center" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
        <p className="text-xs" style={{ color: INK_SOFT }}>© {new Date().getFullYear()} RecuperaJogo. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}