import Link from "next/link";
import { Scale, ArrowLeft, Shield, Database, Eye, Lock, Mail } from "lucide-react";

export default function PrivacidadePage() {
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
          <Shield size={28} className="text-emerald-400" />
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
            Política de Privacidade
          </h1>
        </div>
        <p className="text-sm mb-8 text-white/70">Última atualização: 25 de outubro de 2026</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
          <div className="space-y-8 text-base leading-relaxed text-white/70">
            <p>
              O RecuperaJogo valoriza a sua privacidade e está em total conformidade com a Lei Geral
              de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>

            <div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-emerald-400">
                <Database size={20} className="text-emerald-400" /> 1. Dados que Coletamos
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-white/60">
                <li>
                  <strong className="text-white">Identificação:</strong> nome completo, CPF, endereço,
                  e-mail.
                </li>
                <li>
                  <strong className="text-white">Dados do caso:</strong> relato dos fatos, valores, nome
                  da casa de apostas.
                </li>
                <li>
                  <strong className="text-white">Dado sensível (quando aplicável):</strong> no fluxo de
                  ludopatia, informações sobre saúde (perda de controle, diagnóstico) são tratadas com
                  consentimento específico, conforme art. 11 da LGPD.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-emerald-400">
                <Eye size={20} className="text-emerald-400" /> 2. Finalidade e Base Legal
              </h2>
              <p>
                Seus dados são utilizados exclusivamente para: (a) gerar o documento solicitado
                (execução de contrato, art. 7º, V); (b) processar a liberação do seu acesso via Pix e WhatsApp; (c) prestar
                suporte. <strong className="text-white">Nunca</strong> vendemos ou compartilhamos seus
                dados com terceiros para fins de marketing.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-emerald-400">
                <Lock size={20} className="text-emerald-400" /> 3. Segurança e Armazenamento
              </h2>
              <p className="mb-4">
                Utilizamos infraestrutura segura na nuvem (Vercel e Turso). Os dados são armazenados pelo prazo necessário para a prestação do serviço ou até você solicitar a exclusão.
              </p>
              <p className="bg-white/5 p-4 rounded-xl border border-white/10 text-sm">
                <strong className="text-white">Dados Sensíveis (CPF e Endereço):</strong> Os dados inseridos no gerador de petições (como CPF, endereço e relato dos fatos) são armazenados em nosso banco de dados exclusivamente para permitir que você acesse o seu histórico de petições e faça o download novamente. O acesso a esses dados é estritamente restrito ao titular da conta e aos administradores da plataforma para fins de suporte. Nós não vendemos, alugamos ou compartilhamos esses dados com terceiros.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-emerald-400">
                <Mail size={20} className="text-emerald-400" /> 4. Seus Direitos e Contato
              </h2>
              <p>
                Você pode solicitar acesso, correção ou exclusão total dos seus dados a qualquer momento.
                Para exercer esses direitos ou tirar dúvidas, envie um e-mail para:{" "}
                <strong className="text-white">pedrofsneto33@gmail.com</strong> ou entre em contato pelo
                WhatsApp (86) 98811-7925.
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