"use client";

import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import CourtWinSection from "@/components/home/CourtWinSection";
import Navbar from "@/components/shared/Navbar";
import OfferSection from "@/components/home/OfferSection";
import { Check, X, Upload, Cpu, FileCheck2, HelpCircle, MessageCircle, FileText, HeartPulse, Lock, Wallet, Trophy, UserX, Repeat, Megaphone } from "lucide-react";
import { LIMITE_JUS_POSTULANDI, formatarMoeda } from "./lib/config";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Preciso de advogado para usar o sistema?',
    a: `Não. Causas de até ${formatarMoeda(LIMITE_JUS_POSTULANDI)} permitem que você mesmo protocole (jus postulandi, art. 9º da Lei 9.099/95). O RecuperaJogo apenas monta a petição; você revisa e assina.`
  },
  {
    q: 'O pagamento libera na hora?',
    a: 'O pagamento é via Pix no CNPJ. Você envia o comprovante no WhatsApp e nossa equipe libera seu acesso manualmente em até 10 minutos.',
  },
  {
    q: 'Serve para qualquer casa de apostas?',
    a: 'Sim, desde que a operadora tenha CNPJ no Brasil. O sistema gera a peça com base nos fatos que você preenche.',
  },
  {
    q: 'E se eu não gostar ou não quiser usar?',
    a: 'Você tem 7 dias de garantia incondicional. Basta solicitar o reembolso e devolvemos o valor integral.',
  },
  {
    q: 'Quantas petições posso gerar?',
    a: 'Seu acesso permite gerar até 3 petições completas. Você pode editar e regerar o mesmo caso sem custo extra.',
  },
];


function CountUp({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  useState(() => {
    const start = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    return 0;
  });
  const formatted = Math.round(value).toLocaleString("pt-BR");
  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#05080C] text-white">
      <Navbar />

      {/* HERO */}
      <HeroSection />

      {/* CASOS QUE RESOLVEMOS */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">
            Não importa o que a bet fez. Nós temos a petição certa.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Autoexclusão ignorada", Icon: Lock },
              { title: "Saldo ou Saque Retido", Icon: Wallet },
              { title: "Prêmio / Aposta Ganha Não Paga", Icon: Trophy },
              { title: "Conta Bloqueada Injustamente", Icon: UserX },
              { title: "Bônus com Rollover Abusivo", Icon: Repeat },
              { title: "Ludopatia com Laudo", Icon: HeartPulse },
              { title: "Publicidade Enganosa", Icon: Megaphone },
            ].map(({ title, Icon }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4"
              >
                <Icon className="text-emerald-400 shrink-0" size={28} />
                <span className="font-semibold text-white">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CourtWinSection />

      {/* PROVA */}
      <section className="border-y border-white/5 bg-gradient-to-b from-zinc-950 to-[#05080C] py-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400 mb-4">
            Autoridade
          </p>
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
             Caso Real: Sentença de R$ 3.000 em dano moral.
           </h2>
           <div className="mt-12 clip-custom inline-block bg-zinc-900 border border-emerald-500/40 px-10 py-8 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
             <div className="inline-block bg-emerald-400/20 text-emerald-400 text-xs font-bold px-3 py-1 mb-4 rounded-full">Caso Real</div>
             <p className="text-5xl md:text-6xl font-black text-emerald-400">
               R$ 3.000
             </p>
             <p className="mt-2 text-zinc-400 max-w-md mx-auto">
               Sentença real de um caso de autoexclusão ignorada. O juiz mandou a
               bet pagar.
             </p>
             <p className="mt-4 text-xs text-white/50 max-w-md mx-auto">
               Resultado de um caso específico em Teresina/PI. Cada juiz decide com base nas provas. O RecuperaJogo não garante resultados.
             </p>
           </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-24 px-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16">
            Como funciona
          </h2>

          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl font-black text-zinc-800">01</span>
                  <Upload className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-3">
                  Escolha seu caso
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Autoexclusão, ludopatia ou saldo retido. Selecione a tese que se
                  encaixa na sua situação.
                </p>
              </div>
              <div className="clip-custom bg-zinc-900 border border-white/10 p-8 h-48 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 w-full">
                  {["Autoexclusão", "Ludopatia", "Saldo retido"].map((t) => (
                    <div
                      key={t}
                      className="rounded bg-zinc-800 border border-zinc-700 p-3 text-center text-xs text-zinc-300"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 clip-custom bg-zinc-900 border border-white/10 p-8 h-48 flex items-center justify-center">
                <div className="space-y-3 w-full">
                  <div className="h-3 rounded bg-zinc-800 w-3/4" />
                  <div className="h-3 rounded bg-emerald-500/40 w-1/2" />
                  <div className="h-3 rounded bg-zinc-800 w-2/3" />
                  <div className="mt-4 text-center text-emerald-400 font-bold">
                    R$ 3.000 calculado
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl font-black text-zinc-800">02</span>
                  <Cpu className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-3">
                  Preencha a história
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  O sistema calcula o valor e gera a peça jurídica automaticamente.
                  Sem juridiquês.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl font-black text-zinc-800">03</span>
                  <FileCheck2 className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-3">
                  Baixe e protocole
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Pelo celular, no site do Juizado. Assine e envie. Pronto.
                </p>
              </div>
              <div className="clip-custom bg-zinc-900 border border-emerald-500/30 p-8 h-48 flex items-center justify-center">
                <div className="text-center">
                  <FileCheck2 className="text-emerald-400 mx-auto mb-3" size={48} />
                  <p className="text-sm text-zinc-400">petição.pdf pronto</p>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* OFERTA */}
      <OfferSection />

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-10">
            <HelpCircle className="text-emerald-400" size={28} />
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Perguntas frequentes
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left p-5"
                  >
                    <span className={`text-lg font-bold ${open ? "text-emerald-400" : "text-white"}`}>
                      {item.q}
                    </span>
                    {open ? (
                      <X className="text-emerald-400 shrink-0" size={20} />
                    ) : (
                      <span className="text-zinc-500 shrink-0 text-2xl leading-none">+</span>
                    )}
                  </button>
                  {open && (
                    <p className="px-5 pb-5 text-zinc-400 leading-relaxed">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-[#030712] border-t border-white/10 py-12 px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-black tracking-tight text-lg">Recupera<span className="text-emerald-400">Jogo</span></span>
            </div>
            <p className="text-sm text-white/60">Primex Sistemas LTDA - CNPJ: 55.536.885/0001-30</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-white mb-2">Links Útís</p>
            <a href="/politica-privacidade" className="block text-sm text-white/60 hover:text-white">Política de Privacidade</a>
            <a href="/termos" className="block text-sm text-white/60 hover:text-white">Termos de Uso</a>
            <a href="/apoio" className="flex items-center gap-2 text-sm text-white/60 hover:text-emerald-400 transition-colors"><HeartPulse size={14} /> Apoio Emocional e Jogo Responsável</a>
            <a href="https://e-bookall.vercel.app/login" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/60 hover:text-white">Área do Cliente</a>
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-2">Suporte</p>
            <p className="text-sm text-white/60 mb-2">Dúvidas? Fale conosco</p>
            <a href="https://wa.me/5586988117925" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-white/5 text-center text-zinc-600 text-sm">
          © 2026 RecuperaJogo. Todos os direitos reservados. Software de automação de documentos. Não somos um escritório de advocacia.
        </div>
      </footer>

      <a href="https://e-bookall.vercel.app/login" target="_blank" rel="noopener noreferrer" className="md:hidden fixed bottom-4 right-4 z-50 bg-emerald-500 text-[#05080C] font-bold rounded-full p-4 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
        <FileText size={24} />
      </a>

      <a
        href="https://wa.me/5586988117925?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20RecuperaJogo."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

    </div>
  );
}
