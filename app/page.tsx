"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Shield,
  Ban,
  Banknote,
  Scale,
  Flame,
  Gavel,
  Smartphone,
  FileText,
  Zap,
} from "lucide-react";
import ProvaReal from "./components/ProvaReal";
import ImpactoSocial from "./components/ImpactoSocial";
import EmpresaPrimex from "./components/EmpresaPrimex";
import Reveal from "./components/Reveal";
import IscaCalculadora from "./components/IscaCalculadora";

const WHATSAPP = "5586988117925";
const WA_MSG = encodeURIComponent("Oi! Preciso de suporte no RecuperaJogo.");
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${WA_MSG}`;
const CNPJ = "55.536.885/0001-30";
const PRECO = "137";
const CTA_PRIMARY = "/login";

const CASOS = [
  { icon: Ban, title: "Autoexclusão furada", text: "Você pediu para parar. A casa ainda aceitou depósito.", color: "from-red-500/20 to-transparent" },
  { icon: Banknote, title: "Saque travado", text: "Saldo seu. Transferência negada ou enrolada.", color: "from-amber-500/20 to-transparent" },
  { icon: Flame, title: "Jogo que não para", text: "App e sessão sem fim. A peça fala de fato e de CDC.", color: "from-orange-500/20 to-transparent" },
  { icon: Scale, title: "Laudo / ludopatia", text: "Com laudo, o art. 26 da SPA entra. Sem laudo, o gerador não inventa diagnóstico.", color: "from-emerald-500/20 to-transparent" },
];

const PASSOS = [
  { n: "01", t: "Entre com o e-mail", d: "Conta em segundos. Sem senha complicada.", icon: Smartphone },
  { n: "02", t: "Pague R$ 137 no PIX Primex", d: `CNPJ ${CNPJ}. Ou cartão. Acesso liberado após confirmação.`, icon: Zap },
  { n: "03", t: "Gere a petição", d: "Até 3 rascunhos. Você revisa e protocola no Juizado.", icon: FileText },
];

const FAQ = [
  { q: "Isso é escritório de advocacia?", a: "Não. É software da Primex Sistemas LTDA (primexsistemas.com). Eu montei a ferramenta depois de processar uma casa de apostas no Juizado. Você revisa e protocola em nome próprio." },
  { q: "Preciso de advogado?", a: "Em causas até 20 salários mínimos no Juizado Especial Cível, a lei permite protocolar sozinho (jus postulandi). Caso complexo ou valor maior: advogado ou Defensoria." },
  { q: "Como pago?", a: `R$ ${PRECO} no PIX direto da Primex (CNPJ ${CNPJ}). Você copia a chave, paga e manda o comprovante no WhatsApp — liberamos o gerador em seguida. Também tem opção de cartão.` },
  { q: "Tem reembolso?", a: "Sim. 7 dias. Não gostou do rascunho? Devolvemos. Fale no WhatsApp de suporte." },
  { q: "Meus dados ficam salvos?", a: "Usamos o mínimo para conta e acesso. Você pode pedir exclusão pelo WhatsApp. Veja a Política de Privacidade." },
  { q: "E se a casa me ignorar?", a: "A petição é o caminho formal no Juizado. Citação e prazos seguem o processo. O software não garante acordo nem sentença favorável." },
  { q: "Funciona sem laudo?", a: "Sim, em cenários de autoexclusão violada e falha de serviço (CDC). Laudo reforça quando existir, mas não é obrigatório em todo perfil." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left">
        <span className="text-sm md:text-base font-semibold text-white">{q}</span>
        <ChevronDown size={20} className={`shrink-0 text-emerald-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-white/55 leading-relaxed border-t border-white/5 pt-3">{a}</div>}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="ambient-orb top-[-10%] left-[-5%] w-[420px] h-[420px] bg-emerald-500/20" />
        <div className="ambient-orb top-[20%] right-[-10%] w-[380px] h-[380px] bg-red-600/15" style={{ animationDelay: "-3s" }} />
        <div className="ambient-orb bottom-[10%] left-[30%] w-[300px] h-[300px] bg-emerald-600/10" style={{ animationDelay: "-5s" }} />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <header className="relative z-20 border-b border-white/8 backdrop-blur-md bg-[#030712]/70 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-xs font-black text-[#030712]">RJ</div>
            <span className="font-bold tracking-tight">RecuperaJogo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/55">
            <a href="#como" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#prova" className="hover:text-white transition-colors">Prova real</a>
            <a href="#preco" className="hover:text-white transition-colors">Preço</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex text-xs text-white/45 hover:text-emerald-400">Suporte</a>
            <Link href={CTA_PRIMARY} className="btn-cta inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl bg-emerald-500 text-[#030712]">
              Começar <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 pt-12 pb-20 md:pt-20 md:pb-28 px-4">
        <div className="absolute inset-0 hero-grid opacity-60" />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div>
              <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Campanha contra as bets · não é advocacia
              </div>
              <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">
                A casa te empurrou a jogar.
                <br />
                <span className="text-gradient-emerald">Agora documente e processa.</span>
              </h1>
              <p className="animate-fade-up delay-200 text-base md:text-lg text-white/60 max-w-xl leading-relaxed mb-8">
                Gerador de rascunho de petição para o Juizado Especial Cível. Método testado em processo real.
                Você revisa, protocola em nome próprio. R$ {PRECO} · PIX CNPJ Primex.
              </p>
              <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 mb-8">
                <Link href={CTA_PRIMARY} className="btn-cta animate-pulse-glow inline-flex items-center justify-center gap-2 text-base font-bold px-7 py-4 rounded-2xl bg-emerald-500 text-[#030712]">
                  Quero minha petição <ArrowRight size={20} />
                </Link>
                <a href="#prova" className="inline-flex items-center justify-center gap-2 text-base font-semibold px-7 py-4 rounded-2xl border border-white/15 text-white/80 hover:bg-white/5 transition">
                  Ver sentença real
                </a>
              </div>
              <div className="animate-fade-up delay-400 flex flex-wrap gap-4 text-xs text-white/45">
                <span className="inline-flex items-center gap-1.5"><Shield size={14} className="text-emerald-400" /> Garantia 7 dias</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> PIX CNPJ {CNPJ}</span>
                <span className="inline-flex items-center gap-1.5"><Gavel size={14} className="text-emerald-400" /> Jus postulandi</span>
              </div>
            </div>

            <div className="animate-fade-up delay-300 relative">
              <div className="img-frame rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/15 blur-3xl rounded-full" />
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/80 mb-4">Prova real</p>
                <p className="text-2xl md:text-3xl font-black leading-tight mb-3">
                  R$ 3.000
                  <span className="block text-lg font-semibold text-white/50 mt-1">danos morais · sentença pública</span>
                </p>
                <p className="text-sm text-white/50 leading-relaxed mb-5">
                  4º JEC Teresina/PI · Sortenabet · autoexclusão ignorada · CDC art. 14
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-black/40 border border-white/10 p-3">
                    <p className="text-xs text-white/40">Processo</p>
                    <p className="text-sm font-semibold text-white/90 truncate">0804781-17...</p>
                  </div>
                  <div className="rounded-xl bg-black/40 border border-white/10 p-3">
                    <p className="text-xs text-white/40">Resultado</p>
                    <p className="text-sm font-semibold text-emerald-300">Procedente</p>
                  </div>
                </div>
                <p className="text-[10px] text-white/30 mt-4">Não garante o mesmo resultado no seu caso.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 -mt-6 mb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { n: "R$ 137", l: "pagamento único" },
            { n: "3", l: "petições inclusas" },
            { n: "7 dias", l: "garantia" },
            { n: "JEC", l: "jus postulandi" },
          ].map((s) => (
            <div key={s.l} className="stat-card rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center">
              <p className="text-xl md:text-2xl font-black text-emerald-300">{s.n}</p>
              <p className="text-xs text-white/45 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <ImpactoSocial />

      <section id="para-quem" className="relative z-10 px-4 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 mb-3">Para quem é</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-10 max-w-2xl">Se a bet te enrolou, o caminho é o Juizado.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {CASOS.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}>
                <div className={`card-lift rounded-2xl border border-white/10 bg-gradient-to-br ${c.color} p-6 h-full`}>
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <c.icon size={22} className="text-emerald-300" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="como" className="relative z-10 px-4 py-20 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 mb-3">Como funciona</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12">Três passos. Sem juridiquês.</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {PASSOS.map((p, i) => (
              <Reveal key={p.n} delay={Math.min(i + 1, 3) as 1 | 2 | 3}>
                <div className="card-lift rounded-2xl border border-white/10 bg-[#0c1220] p-6 h-full relative">
                  <span className="text-5xl font-black text-white/5 absolute top-4 right-5">{p.n}</span>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-4">
                    <p.icon size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{p.t}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProvaReal />

      <section className="relative z-10 px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <IscaCalculadora />
          </Reveal>
        </div>
      </section>

      <section id="preco" className="relative z-10 px-4 py-20 md:py-28">
        <div className="max-w-lg mx-auto">
          <Reveal>
            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-[#0c1220] p-8 md:p-10 text-center shadow-[0_0_60px_rgba(16,185,129,0.12)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">Acesso completo</p>
              <p className="text-5xl md:text-6xl font-black text-white mb-1">R$ {PRECO}</p>
              <p className="text-sm text-white/45 mb-6">pagamento único · PIX CNPJ Primex ou cartão</p>
              <ul className="text-left space-y-3 mb-8 text-sm text-white/70">
                {["Até 3 petições em PDF", "Argumentos CDC + regulação SPA", "Checklist de provas", "Garantia de 7 dias", `PIX chave CNPJ ${CNPJ}`].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <Link href={CTA_PRIMARY} className="btn-cta animate-pulse-glow w-full inline-flex items-center justify-center gap-2 text-base font-bold px-6 py-4 rounded-2xl bg-emerald-500 text-[#030712]">
                Começar agora <ArrowRight size={20} />
              </Link>
              <p className="text-[11px] text-white/35 mt-4">Primex Sistemas LTDA · não é advocacia · não promete resultado</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="relative z-10 px-4 py-20 border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 mb-3 text-center">FAQ</p>
            <h2 className="text-3xl font-black tracking-tight mb-8 text-center">Perguntas diretas</h2>
          </Reveal>
          <div className="space-y-2">
            {FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <EmpresaPrimex />

      <section className="relative z-10 px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-4">Pronto para montar a peça?</h2>
            <p className="text-white/50 mb-8">E-mail → PIX Primex → gerador. Sem enrolação.</p>
            <Link href={CTA_PRIMARY} className="btn-cta inline-flex items-center gap-2 text-base font-bold px-8 py-4 rounded-2xl bg-emerald-500 text-[#030712]">
              Ir para o login <ArrowRight size={20} />
            </Link>
          </Reveal>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-4 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-white/40">
          <div>
            <p className="font-bold text-white/70 mb-1">RecuperaJogo</p>
            <p>Primex Sistemas LTDA · CNPJ {CNPJ}</p>
            <p className="mt-1 text-xs">Software de documento. Não é sociedade de advogados. Não promete resultado judicial.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/politica-privacidade" className="hover:text-emerald-400">Privacidade</Link>
            <Link href="/guia" className="hover:text-emerald-400">Guia</Link>
            <a href="https://www.primexsistemas.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Primex</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 inline-flex items-center gap-1">
              <MessageCircle size={12} /> WhatsApp
            </a>
          </div>
        </div>
      </footer>

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-[#030712] flex items-center justify-center shadow-lg hover:scale-105 transition"
        aria-label="WhatsApp suporte"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
