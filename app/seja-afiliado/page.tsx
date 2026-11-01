"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, DollarSign, HandCoins, Smartphone, Users } from "lucide-react";

export default function SejaAfiliadoPage() {
  const whatsappUrl =
    "https://wa.me/5586988117925?text=Ol%C3%A1!%20Quero%20ser%20um%20afiliado%20do%20RecuperaJogo";

  return (
    <div className="min-h-screen bg-[#05080C] text-white">
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-lg px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Recupera<span className="text-emerald-400">Jogo</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login?redirect=/afiliados" className="text-xs text-white/60 hover:text-emerald-400 transition-colors">
              Já sou afiliado, acessar painel
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-emerald-500 text-[#05080C] font-bold px-3 py-1.5 rounded-full hover:bg-emerald-400 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="px-6 py-12 sm:px-8 sm:py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-4 tracking-wider">
              Programa de Afiliados RecuperaJogo
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
              Ganhe <span className="text-emerald-400">30% de comissão</span> indicando o RecuperaJogo
            </h1>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transforme cada indicação em renda. Ajude pessoas a recuperarem dinheiro
              perdido em casas de apostas e ganhe <span className="text-white font-semibold">R$ 41,10 por venda</span>.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-emerald-500 text-[#05080C] font-black text-lg rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <ArrowRight size={20} /> Quero ser um Afiliado
            </a>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black mb-12 text-center">Como funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Cadastre-se</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Fale conosco no WhatsApp e solicite sua entrada no programa de afiliados.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                  <Link2Icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Pegue seu link</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Acesse o painel de afiliado e copie seu link exclusivo de indicação.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Compartilhe e ganhe</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Divulgue seu link e ganhe comissão sobre cada venda realizada.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-16 sm:px-8 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black mb-12 text-center">Vantagens</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold">30% de comissão</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Ganhe <span className="text-white font-semibold">R$ 41,10 por cada venda</span>
                  realizada através do seu link de indicação.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <HandCoins className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold">Pagamento rápido via Pix</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Suas comissões são pagas rapidamente via Pix, direto na sua chave cadastrada.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold">Painel em tempo real</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Acompanhe suas indicações, status e comissões pendentes direto no painel do afiliado.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-8 text-center">
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-12">
            <h2 className="text-2xl font-black mb-4">Já é afiliado?</h2>
            <p className="text-white/60 mb-8">
              Acesse o painel para gerenciar suas indicações e sacar suas comissões.
            </p>
            <Link
              href="/login?redirect=/afiliados"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
            >
              <ArrowRight size={18} /> Acessar painel do afiliado
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#030712] border-t border-white/10 py-10 sm:py-12 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-black tracking-tight text-lg">
                  Recupera<span className="text-emerald-400">Jogo</span>
                </span>
              </div>
              <p className="text-sm text-white/60">
                Primex Sistemas LTDA - CNPJ: 55.536.885/0001-30
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-white mb-2">Links Úteis</p>
              <Link href="/politica-privacidade" className="block text-sm text-white/60 hover:text-white">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="block text-sm text-white/60 hover:text-white">
                Termos de Uso
              </Link>
              <Link href="/login?redirect=/afiliados" className="block text-sm text-white/60 hover:text-white">
                Painel do Afiliado
              </Link>
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-2">Suporte</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
              >
                <MessageCircleIcon size={16} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-white/5 text-center text-zinc-600 text-xs sm:text-sm">
            © 2026 RecuperaJogo. Todos os direitos reservados. Software de automação de documentos. Não somos um
            escritório de advocacia. Este serviço não substitui aconselhamento jurídico profissional.
          </div>
        </div>
      </footer>
    </div>
  );
}

function MessageCircleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7c-5.8-.5-7-8.5-7-8.5" />
      <line x1="22" x2="22" y1="12" y2="12" />
      <line x1="16" x2="16" y1="22" y2="22" />
      <line x1="8" x2="8" y1="22" y2="22" />
    </svg>
  );
}

function Link2Icon({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.73" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.73" />
    </svg>
  );
}