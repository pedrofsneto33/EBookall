"use client";

import { useState } from "react";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import CourtWinSection from "@/components/home/CourtWinSection";
import Navbar from "@/components/shared/Navbar";
import OfferSection from "@/components/home/OfferSection";

import { X, Upload, Cpu, FileCheck2, HelpCircle, MessageCircle, FileText, HeartPulse, Lock, Wallet, Trophy, UserX, Repeat, Megaphone, ExternalLink } from "lucide-react";
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
    q: 'Quantas petições posso gerar?',
    a: 'Seu acesso permite gerar até 3 petições completas. Você pode editar e regerar o mesmo caso sem custo extra.',
  },
];

const DECISOES = [
  { 
    uf: "TJSC · Tubarão", 
    proc: "5005803-28.2025.8.24.0075", 
    t: "Falha no dever de jogo responsável", 
    v: "R$ 217 mil + R$ 10 mil (Dano Moral)", 
    d: "Aplicou CDC, Lei 14.790/23 e Portaria SPA/MF 1.231/24. A ré não contestou.", 
    href: "https://www.migalhas.com.br/quentes/448239/casa-de-aposta-devolve-r-217-mil-por-violar-dever-de-jogo-responsavel", 
    fonte: "Migalhas", 
    aviso: "Acima de R$ 32.420: precisa de advogado ou Defensoria." 
  },
  { 
    uf: "TJDFT · 3ª Turma Cível", 
    proc: "0707743-74.2025.8.07.0001", 
    t: "Ludopatia: apostas anuladas", 
    v: "R$ 180.963,12 + R$ 4 mil (Dano Moral)", 
    d: "Tribunal manteve a nulidade das apostas de consumidor com laudo e reconheceu falha da casa em bloquear o acesso.", 
    href: "https://www.tjdft.jus.br/institucional/imprensa/noticias/2026/junho/tjdft-anula-apostas-e-condena-plataforma-a-devolver-r-180-mil-a-consumidor-com-ludopatia", 
    fonte: "TJDFT", 
    aviso: "Acima de R$ 32.420: precisa de advogado ou Defensoria." 
  },
  { 
    uf: "TJSP", 
    proc: "4000778-26.2026.8.26.0248", 
    t: "Autoexclusão não bloqueada no prazo", 
    v: "R$ 81 mil", 
    d: "Casa continuou aceitando depósitos e apostas depois da autoexclusão. Fundamento: dever de segurança e de jogo responsável.", 
    href: "https://bnldata.com.br/justica-condena-plataforma-de-apostas-por-falha-em-autoexclusao-de-apostador/", 
    fonte: "BNL Data", 
    aviso: "Acima de R$ 32.420: precisa de advogado ou Defensoria." 
  },
  { 
    uf: "TJDFT · Turma Recursal", 
    proc: "0759332-60.2025.8.07.0016", 
    t: "Conta suspensa sem provar irregularidade", 
    v: "R$ 7 mil", 
    d: "A casa suspendeu a conta sem avisar nem provar a violação dos termos de uso. Decisão unânime.", 
    href: "https://www.tjdft.jus.br/institucional/imprensa/noticias/2026/abril/tjdft-mantem-condenacao-de-plataforma-de-apostas-que-suspendeu-conta-sem-comprovar-irregularidade", 
    fonte: "TJDFT", 
    aviso: "Cabe sem advogado (até R$ 32.420)." 
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#05080C] text-white overflow-x-hidden">
      <Navbar />


      {/* HERO */}
      <HeroSection />

      {/* CASOS QUE RESOLVEMOS */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-center mb-4">
            Não importa o que a bet fez.
            <br />Nós temos a petição certa.
          </h2>
          <p className="text-center text-white/60 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Escolha o seu caso e o gerador monta a peça jurídica específica para a sua situação.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Autoexclusão Ignorada", Icon: Lock },
              { title: "Saldo ou Saque Retido", Icon: Wallet },
              { title: "Prêmio / Aposta Ganha Não Paga", Icon: Trophy },
              { title: "Conta Bloqueada Injustamente", Icon: UserX },
              { title: "Bônus com Rollover Abusivo", Icon: Repeat },
              { title: "Ludopatia com Laudo", Icon: HeartPulse },
              { title: "Publicidade Enganosa", Icon: Megaphone },
            ].map(({ title, Icon }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 flex items-center gap-4 hover:bg-white/10 transition-colors"
              >
                <Icon className="text-emerald-400 shrink-0" size={24} />
                <span className="font-semibold text-white text-sm sm:text-base">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CourtWinSection />

      {/* PROVA (AGORA COM AS DECISÕES REAIS) */}
      <section className="border-y border-white/5 bg-gradient-to-b from-zinc-950 to-[#05080C] py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400 mb-4">
              Autoridade
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
              A Justiça já mandou as bets pagarem.
            </h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
              Decisões reais, com número de processo e fonte. Cada caso depende das provas, mas o caminho já está aberto nos tribunais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {DECISOES.map((c) => (
              <div key={c.proc} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-emerald-500/30 transition-colors flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-mono text-emerald-400/80 mb-3">{c.uf} · proc. {c.proc}</p>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{c.t}</h3>
                  <p className="text-3xl sm:text-4xl font-black text-emerald-400 mb-2">{c.v}</p>
                  
                  {/* NOVO AVISO AQUI */}
                  <p className={`text-xs font-semibold mb-4 ${c.aviso.includes('sem advogado') ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {c.aviso}
                  </p>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">{c.d}</p>
                </div>
                <a 
                  href={c.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white transition-colors mt-auto"
                >
                  Fonte: {c.fonte} <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
          
          <p className="text-center text-xs text-white/30 mt-8 max-w-2xl mx-auto">
            Decisões noticiadas pela imprensa e pelos próprios tribunais. Não há garantia de resultado para casos futuros. O juiz decide com base nas provas de cada processo.
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-center mb-10 sm:mb-16">
          Como funciona
        </h2>

        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-16">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-800">01</span>
                <Upload className="text-emerald-400" size={28} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                Escolha seu caso
              </h3>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                Autoexclusão, ludopatia, saldo retido, rollover e mais. Selecione a tese que se encaixa na sua situação.
              </p>
            </div>
            <div className="clip-custom bg-zinc-900 border border-white/10 p-6 sm:p-8 h-auto min-h-[180px] sm:h-48 flex items-center justify-center rounded-2xl">
              <div className="grid grid-cols-2 gap-3 w-full">
                {["Autoexclusão", "Ludopatia", "Saldo retido", "Rollover"].map((t) => (
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

          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
            <div className="order-2 md:order-1 clip-custom bg-zinc-900 border border-white/10 p-6 sm:p-8 h-auto min-h-[180px] sm:h-48 flex items-center justify-center rounded-2xl">
              <div className="space-y-3 w-full">
                <div className="h-3 rounded bg-zinc-800 w-3/4" />
                <div className="h-3 rounded bg-emerald-500/40 w-1/2" />
                <div className="h-3 rounded bg-zinc-800 w-2/3" />
                <div className="mt-4 text-center text-emerald-400 font-bold">
                  Valor da causa calculado
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-800">02</span>
                <Cpu className="text-emerald-400" size={28} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                Preencha a história
              </h3>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                O sistema calcula o valor e gera a peça jurídica automaticamente. Sem juridiquês.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-800">03</span>
                <FileCheck2 className="text-emerald-400" size={28} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                Baixe e protocole
              </h3>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                Pelo celular, no site do Juizado. Assine, envie e anexe a petição. Pronto.
              </p>
            </div>
            <div className="clip-custom bg-zinc-900 border border-emerald-500/30 p-6 sm:p-8 h-auto min-h-[180px] sm:h-48 flex items-center justify-center rounded-2xl">
              <div className="text-center">
                <FileCheck2 className="text-emerald-400 mx-auto mb-3" size={40} />
                <p className="text-sm text-zinc-400">petição.pdf</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <OfferSection />

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-white/5">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <HelpCircle className="text-emerald-400" size={24} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
              Perguntas frequentes
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left p-4 sm:p-5"
                  >
                    <span className={`text-base sm:text-lg font-bold ${open ? "text-emerald-400" : "text-white"}`}>
                      {item.q}
                    </span>
                    {open ? (
                      <X className="text-emerald-400 shrink-0" size={20} />
                    ) : (
                      <span className="text-zinc-500 shrink-0 text-2xl leading-none">+</span>
                    )}
                  </button>
                  {open && (
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-zinc-400 text-sm sm:text-base leading-relaxed">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-[#030712] border-t border-white/10 py-10 sm:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-black tracking-tight text-lg">Recupera<span className="text-emerald-400">Jogo</span></span>
            </div>
            <p className="text-sm text-white/60">Primex Sistemas LTDA - CNPJ: 55.536.885/0001-30</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-white mb-2">Links Úteis</p>
            <Link href="/politica-privacidade" className="block text-sm text-white/60 hover:text-white">Política de Privacidade</Link>
            <Link href="/termos" className="block text-sm text-white/60 hover:text-white">Termos de Uso</Link>
            <Link href="/apoio" className="flex items-center gap-2 text-sm text-white/60 hover:text-emerald-400 transition-colors"><HeartPulse size={14} /> Apoio Emocional e Jogo Responsável</Link>
            <Link href="/login" className="block text-sm text-white/60 hover:text-white">Área do Cliente</Link>
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-2">Suporte</p>
            <p className="text-sm text-white/60 mb-2">Dúvidas? Fale conosco</p>
            <a href="https://wa.me/5586988117925" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-white/5 text-center text-zinc-600 text-xs sm:text-sm">
          © 2026 RecuperaJogo. Todos os direitos reservados. Software de automação de documentos. Não somos um escritório de advocacia.
        </div>
      </footer>

      <Link href="/login" className="md:hidden fixed bottom-4 right-4 z-50 bg-emerald-500 text-[#05080C] font-bold rounded-full p-4 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
        <FileText size={24} />
      </Link>

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