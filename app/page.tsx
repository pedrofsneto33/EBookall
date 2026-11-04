"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import DemoGerador from "@/components/home/DemoGerador";
import HeroSection from "@/components/home/HeroSection";
import CourtWinSection from "@/components/home/CourtWinSection";
import Navbar from "@/components/shared/Navbar";
import OfferSection from "@/components/home/OfferSection";

import { ArrowRight, X, Upload, Cpu, FileCheck2, HelpCircle, MessageCircle, HeartPulse, Lock, Wallet, Trophy, UserX, Repeat, Megaphone, ExternalLink, MapPin, ShieldCheck, ClipboardList, Scale, ShieldAlert, RotateCw } from "lucide-react";
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
    a: 'O pagamento é por Pix e o acesso é liberado assim que ele é confirmado, em geral em instantes. Se passar de 10 minutos, chame a gente no WhatsApp.',
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
    aviso: "Sentença de 1º grau, sujeita a recurso. Acima de R$ 32.420: precisa de advogado ou Defensoria." 
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
    <div className="landing min-h-screen bg-[var(--tinta)] text-white overflow-x-hidden">
      <Navbar />


      {/* HERO */}
      <HeroSection />
      <DemoGerador />

      {/* CASOS QUE RESOLVEMOS */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}>
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
                className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 flex items-center gap-4 group hover:bg-white/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] hover:border-emerald-500/40"
              >
                <Icon className="text-emerald-400 shrink-0 size={24} group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-colors duration-300" />
                <span className="font-semibold text-white text-sm sm:text-base">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      </motion.div>

      <section className="py-8 px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-emerald-500/15 to-transparent border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <div className="shrink-0">
            <Scale size={48} className="text-emerald-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
              A MP 1.394/2026 proibiu as bets. Mas o seu prejuízo do passado não foi apagado.
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-4">
              Pelo princípio da irretroatividade, a lei nova não apaga os fatos que já aconteceram. Se você sofreu um golpe (saque negado, autoexclusão ignorada, prêmio não pago) antes da proibição, você ainda tem o direito de cobrar na Justiça.
            </p>
            <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05080C]">
              Quero recuperar o que é meu
            </Link>
          </div>
        </div>
      </section>

      <CourtWinSection />

      {/* PROVA (AGORA COM AS DECISÕES REAIS) */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}>
        <section className="border-y border-white/5 bg-gradient-to-b from-zinc-950 to-[#05080C] py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
              A Justiça já mandou as bets pagarem.
            </h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
              Decisões reais, com número de processo e fonte. Cada caso depende das provas, mas o caminho já está aberto nos tribunais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {DECISOES.map((c) => (
              <div key={c.proc} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8 group flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] hover:border-emerald-500/40">
                <div>
                  <p className="text-[11px] text-emerald-400/80 mb-3">{c.uf} · proc. {c.proc}</p>
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
      </motion.div>

      {/* COMO FUNCIONA */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}>
        <section id="como-funciona" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative">
          {/* Linha vertical central luminosa (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 -translate-x-1/2" />

          <div className="mx-auto max-w-5xl px-4 relative">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">
                Como funciona na prática
              </h2>
              <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
                Três passos simples para montar sua petição e recuperar seu dinheiro das bets.
              </p>
            </div>
            {/* PASSO 1 — Escolha seu caso */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16"
            >
              <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
                <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                  <span className="text-5xl font-black text-emerald-400">01</span>
                  <Upload className="text-emerald-400" size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4">Escolha seu caso</h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-8">
                  Autoexclusão, ludopatia, saldo retido, rollover e mais. Selecione a tese que se encaixa na sua situação.
                </p>
                <button className="inline-flex items-center gap-2 bg-emerald-500 text-[#05080C] font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.4)] justify-center md:justify-start w-full md:w-auto">
                  Selecionar caso <ArrowRight size={16} />
                </button>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                <div className="relative w-full max-w-[320px] md:max-w-[400px] bg-[#0B1018] border border-white/10 rounded-2xl p-5 md:p-8 shadow-2xl">
                  <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10 grid grid-cols-2 gap-3">
                    <div className="bg-emerald-500/10 border border-emerald-500 rounded-lg p-3 flex flex-col items-center justify-center gap-1.5">
                      <ShieldAlert size={18} className="text-emerald-400" />
                      <span className="text-[10px] font-medium text-white text-center leading-tight">Autoexclusão</span>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-3 flex flex-col items-center justify-center gap-1.5">
                      <Wallet size={18} className="text-white/60" />
                      <span className="text-[10px] font-medium text-white/60 text-center leading-tight">Saldo retido</span>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-3 flex flex-col items-center justify-center gap-1.5">
                      <HeartPulse size={18} className="text-white/60" />
                      <span className="text-[10px] font-medium text-white/60 text-center leading-tight">Ludopatia</span>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-3 flex flex-col items-center justify-center gap-1.5">
                      <RotateCw size={18} className="text-white/60" />
                      <span className="text-[10px] font-medium text-white/60 text-center leading-tight">Rollover</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PASSO 2 — Preencha a história */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 mb-16"
            >
              <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
                <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                  <span className="text-5xl font-black text-emerald-400">02</span>
                  <Cpu className="text-emerald-400" size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4">Preencha a história</h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-8">
                  O sistema calcula o valor e gera a peça jurídica automaticamente. Sem juridiquês.
                </p>
                <button className="inline-flex items-center gap-2 bg-emerald-500 text-[#05080C] font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.4)] justify-center md:justify-start w-full md:w-auto">
                  Começar agora <ArrowRight size={16} />
                </button>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                <div className="relative w-full max-w-[320px] md:max-w-[400px] bg-[#0B1018] border border-white/10 rounded-2xl p-5 md:p-8 shadow-2xl">
                  <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10 space-y-3">
                    <div className="h-10 rounded-lg bg-black/40 border border-white/10" />
                    <div className="h-10 rounded-lg bg-black/40 border border-white/10" />
                    <div className="flex items-center gap-2 h-10 rounded-lg bg-black/40 border border-white/10">
                      <input type="text" className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500 px-3" placeholder="Valor da causa" />
                      <button className="bg-emerald-500 text-black font-bold text-center py-2 rounded-lg text-sm px-4">Gerar Petição</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PASSO 3 — Baixe e protocole */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
            >
              <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
                <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                  <span className="text-5xl font-black text-emerald-400">03</span>
                  <FileCheck2 className="text-emerald-400" size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4">Baixe e protocole</h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-8">
                  Pelo celular, no site do Juizado. Assine, envie e anexe a petição. Pronto.
                </p>
                <button className="inline-flex items-center gap-2 bg-emerald-500 text-[#05080C] font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.4)] justify-center md:justify-start w-full md:w-auto">
                  Baixar PDF <ArrowRight size={16} />
                </button>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                <div className="relative w-full max-w-[320px] md:max-w-[400px] bg-[#0B1018] border border-white/10 rounded-2xl p-5 md:p-8 shadow-2xl flex flex-col items-center justify-center text-center">
                  <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10">
                    <FileCheck2 size={48} className="text-emerald-400 mx-auto mb-4" />
                    <button className="bg-emerald-500 text-black font-bold text-center py-2 rounded-lg text-sm px-6 w-full">
                      Baixar PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* RECURSOS DO GERADOR */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-center mb-10 sm:mb-16">
            Tudo o que o gerador faz por você
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
              <MapPin className="text-emerald-400 shrink-0" size={28} />
              <span className="font-semibold text-white text-sm sm:text-base">Guia de Protocolo por Estado</span>
              <p className="text-white/60 text-sm leading-relaxed">Saiba exatamente onde protocolar no Juizado Especial da sua UF, com links oficiais, e-mail ou WhatsApp.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
              <ShieldCheck className="text-emerald-400 shrink-0" size={28} />
              <span className="font-semibold text-white text-sm sm:text-base">Verificação de CNPJ</span>
              <p className="text-white/60 text-sm leading-relaxed">O sistema confere o CNPJ da casa de apostas na Receita Federal para você não processar a empresa errada.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
              <ClipboardList className="text-emerald-400 shrink-0" size={28} />
              <span className="font-semibold text-white text-sm sm:text-base">Checklist de Provas</span>
              <p className="text-white/60 text-sm leading-relaxed">Marque as provas que você tem e o sistema monta a lista de documentos anexos automaticamente.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
              <Scale className="text-emerald-400 shrink-0" size={28} />
              <span className="font-semibold text-white text-sm sm:text-base">Jurisprudência e Decisões</span>
              <p className="text-white/60 text-sm leading-relaxed">Insira decisões de casos semelhantes e argumentos condicionais para fortalecer o seu pedido.</p>
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

      <a
        href="https://wa.me/5586988117925?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20RecuperaJogo."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 md:bottom-6 right-4 md:right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}

