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
  Eye,
  Gavel,
  X,
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
  { icon: Ban, title: "Autoexclusão furada", text: "Você pediu para parar. A casa ainda aceitou depósito." },
  { icon: Banknote, title: "Saque travado", text: "Saldo seu. Transferência negada ou enrolada." },
  { icon: Flame, title: "Jogo que não para", text: "App e sessão sem fim. A peça fala de fato e de CDC." },
  { icon: Scale, title: "Laudo / ludopatia", text: "Com laudo, o art. 26 da SPA entra. Sem laudo, o gerador não inventa diagnóstico." },
];

const FAQ = [
  {
    q: "Isso é escritório de advocacia?",
    a: "Não. É software da Primex Sistemas LTDA (primexsistemas.com). Eu montei a ferramenta depois de processar uma casa de apostas no Juizado. Você revisa e protocola em nome próprio.",
  },
  {
    q: "Preciso de advogado?",
    a: "Em causas até 20 salários mínimos no Juizado Especial Cível, a lei permite protocolar sozinho (jus postulandi). Caso complexo ou valor maior: advogado ou Defensoria.",
  },
  {
    q: "Como pago?",
    a: `R$ ${PRECO} no Stripe (Pix ou cartão). O webhook libera o acesso na hora e você cai na página de obrigado.`,
  },
  {
    q: "Tem reembolso?",
    a: "Sim. 7 dias. Não gostou do rascunho? Devolvemos. Fale no WhatsApp de suporte.",
  },
  {
    q: "Meus dados ficam salvos?",
    a: "Conta e petições ficam no Supabase com acesso restrito à sua conta. Você pode pedir exclusão pelo painel ou pelo WhatsApp. Veja a Política de Privacidade.",
  },
  {
    q: "E se a casa me ignorar?",
    a: "A petição é o caminho formal no Juizado. Citação e prazos seguem o processo. O software não garante acordo nem sentença favorável.",
  },
  {
    q: "Funciona sem laudo?",
    a: "Sim, em cenários de autoexclusão violada e falha de serviço (CDC). Laudo de ludopatia fortalece outros pedidos — o gerador só usa laudo se você informar.",
  },
];

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left py-5 gap-4 group"
      >
        <span className="font-medium text-base text-white/90 group-hover:text-white transition-colors">{q}</span>
        <ChevronDown size={20} className={`shrink-0 text-emerald-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="text-sm leading-relaxed pb-5 pr-8 text-white/55 animate-fade-in">{a}</p>}
    </div>
  );
}

function PrimaryCta({ className = "" }: { className?: string }) {
  return (
    <Link
      href={CTA_PRIMARY}
      className={`btn-press inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-[15px] font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.35)] ${className}`}
    >
      Gerar minha petição · R$ {PRECO}
      <ArrowRight size={18} />
    </Link>
  );
}

export default function LandingPage() {
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL;

  return (
    <div className="min-h-screen bg-[#05080C] text-white antialiased overflow-x-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,0.18), transparent 55%), radial-gradient(ellipse 40% 40% at 100% 50%, rgba(220,38,38,0.08), transparent 50%)",
          }}
        />
        <div className="ambient-orb w-[420px] h-[420px] bg-emerald-500/10 top-[-80px] left-[10%]" />
      </div>

      <header className="relative z-50 sticky top-0 border-b border-white/8 bg-[#05080C]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-[#05080C] text-xs font-black tracking-tighter">RJ</div>
            <span className="font-semibold text-[15px] tracking-tight">RecuperaJogo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/55">
            <a href="#como" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#para-quem" className="hover:text-white transition-colors">Para quem</a>
            <a href="#preco" className="hover:text-white transition-colors">Preço</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={CTA_PRIMARY}
              className="btn-press hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400"
            >
              Gerar petição · R$ {PRECO}
            </Link>
            <Link href="/login" className="text-sm text-white/50 hover:text-white px-2">Entrar</Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 px-4 pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 mb-6 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-red-300">
                Contra as bets · não a favor delas
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-black leading-[1.08] tracking-tight animate-fade-up delay-100">
              As casas lucram com o seu prejuízo.
              <span className="block mt-2 text-gradient-animated">
                Eu montei a ferramenta para você reagir.
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/55 max-w-xl leading-relaxed animate-fade-up delay-200">
              Rascunho de petição para o Juizado Especial — método que usei quando processei uma casa de apostas. Você revisa e protocola.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up delay-300">
              <PrimaryCta className="animate-pulse-glow" />
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-[15px] font-semibold border border-white/15 text-white/80 hover:bg-white/5"
              >
                <MessageCircle size={18} className="text-emerald-400" />
                Suporte no WhatsApp
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/40 animate-fade-up delay-400">
              <span className="inline-flex items-center gap-1.5"><Shield size={13} className="text-emerald-400" /> Garantia 7 dias</span>
              <span className="inline-flex items-center gap-1.5"><Gavel size={13} className="text-emerald-400" /> Jus postulandi</span>
              <span className="inline-flex items-center gap-1.5">Pix ou cartão · Stripe</span>
            </div>
          </div>
          <div className="lg:col-span-5 animate-scale-in delay-200">
            <IscaCalculadora />
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-white/45">
          <a href="https://www.primexsistemas.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
            Primex Sistemas · CNPJ <strong className="text-white/70">{CNPJ}</strong>
          </a>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>Software · não advocacia</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>Pagamento via Stripe</span>
        </div>
      </section>

      <ImpactoSocial />

      <section id="historia" className="relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">Por que existe</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-5">
              Eu processei Sortenabet. Depois montei o gerador.
            </h2>
            <div className="space-y-4 text-white/55 leading-relaxed">
              <p>
                Autoexclusão centralizada em dezembro de 2025. Em janeiro a casa ainda aceitou depósito
                e apostas. No 4º Juizado Especial Cível de Teresina (proc. 0804781-17.2026.8.18.0140)
                houve condenação a R$ 3.000 de danos morais — CDC art. 14. Isso não garante o seu caso.
              </p>
              <p>
                O RecuperaJogo transforma esse caminho em software: rascunho com fundamentos de
                autoexclusão (IN 31, SIGAP, Portaria 2.579), checklist e calculadora. Você revisa.
                Você protocola.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ProvaReal />

      {videoUrl ? (
        <section className="relative z-10 px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-6">
              <h2 className="text-2xl font-black tracking-tight">Em vídeo</h2>
            </Reveal>
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src={videoUrl}
                title="RecuperaJogo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

      <section id="para-quem" className="relative z-10 px-4 py-16 md:py-24 bg-white/[0.02] border-y border-white/8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <h3 className="font-bold text-lg">Para quem é</h3>
              </div>
              <ul className="space-y-2.5 text-sm text-white/65">
                <li>Quem sofreu autoexclusão furada, saque travado ou falha clara da casa</li>
                <li>Quem quer montar rascunho e protocolar no Juizado (jus postulandi)</li>
                <li>Quem aceita revisar o texto antes de protocolar</li>
                <li>Quem entende que juiz decide — software não promete vitória</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <X size={20} className="text-red-400" />
                <h3 className="font-bold text-lg">Para quem NÃO é</h3>
              </div>
              <ul className="space-y-2.5 text-sm text-white/65">
                <li>Quem busca advogado ou patrocínio jurídico</li>
                <li>Quem quer “garantia de ganhar” a causa</li>
                <li>Quem não tem prova mínima do que aconteceu</li>
                <li>Quem espera que a Primex protocolize ou acompanhe o processo</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">Cenários</p>
            <h2 className="text-3xl font-black tracking-tight mb-8">O texto muda com o que te fizeram</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CASOS.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}>
                  <div className="card-lift rounded-2xl border border-white/10 bg-[#0B1018] p-5 h-full">
                    <Icon size={22} className="text-emerald-400 mb-3" />
                    <h3 className="font-bold text-[15px] mb-2">{c.title}</h3>
                    <p className="text-sm text-white/50">{c.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="como" className="relative z-10 px-4 py-16 md:py-24 bg-white/[0.02] border-y border-white/8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">Fluxo</p>
            <h2 className="text-3xl font-black tracking-tight mb-10">Três passos</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Crie a conta e pague", d: "Stripe: Pix ou cartão. Acesso liberado na hora pelo webhook." },
              { n: "02", t: "Conte o que aconteceu", d: "O gerador monta o rascunho com base no fato — não é PDF genérico." },
              { n: "03", t: "Revise e protocola", d: "Você é o autor no Juizado. Hash no rodapé do PDF." },
            ].map((p, i) => (
              <Reveal key={p.n} delay={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}>
                <div className="card-lift relative rounded-2xl border border-white/10 p-7 bg-gradient-to-b from-white/[0.06] to-transparent h-full">
                  <span className="text-5xl font-black text-white/10 absolute top-4 right-5">{p.n}</span>
                  <p className="text-emerald-400 text-sm font-bold mb-2">{p.n}</p>
                  <h3 className="text-xl font-bold mb-2">{p.t}</h3>
                  <p className="text-sm text-white/50">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">Ancoragem</p>
            <h2 className="text-3xl font-black tracking-tight mb-8">Advogado particular vs. jus postulandi</h2>
          </Reveal>
          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/[0.04] text-white/50 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-medium">Ponto</th>
                    <th className="px-4 py-3 font-medium">Advogado particular</th>
                    <th className="px-4 py-3 font-medium">Gerador + Juizado</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-t border-white/8">
                    <td className="px-4 py-3 text-white/45">Custo típico</td>
                    <td className="px-4 py-3">Honorários + possíveis custas</td>
                    <td className="px-4 py-3">R$ {PRECO} no software · JEC 1º grau sem custas em regra</td>
                  </tr>
                  <tr className="border-t border-white/8 bg-white/[0.02]">
                    <td className="px-4 py-3 text-white/45">Quem protocola</td>
                    <td className="px-4 py-3">Advogado</td>
                    <td className="px-4 py-3">Você (jus postulandi, até o limite legal)</td>
                  </tr>
                  <tr className="border-t border-white/8">
                    <td className="px-4 py-3 text-white/45">O que o software faz</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">Rascunho + checklist · você revisa</td>
                  </tr>
                  <tr className="border-t border-white/8 bg-white/[0.02]">
                    <td className="px-4 py-3 text-white/45">Resultado</td>
                    <td className="px-4 py-3">Depende do caso e do juiz</td>
                    <td className="px-4 py-3">Idem — sem garantia de vitória</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-white/30 mt-3">
              Referência geral de Juizado Especial (Lei 9.099/95). Confirme no tribunal da sua comarca.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="preco" className="relative z-10 px-4 py-16 md:py-24 bg-white/[0.02] border-y border-white/8">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="rounded-[2rem] border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-[#0B1018] to-[#0B1018] p-8 md:p-10 text-center relative overflow-hidden">
              <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3 relative">Acesso completo</p>
              <p className="text-5xl font-black tracking-tight relative">
                R$ {PRECO}
                <span className="text-lg font-medium text-white/40 ml-2">uma vez</span>
              </p>
              <p className="text-white/55 mt-3 mb-6 relative text-sm">
                Até 3 petições · checklist · calculadora · garantia 7 dias
              </p>
              <ul className="text-left max-w-sm mx-auto space-y-2 mb-8 relative text-sm text-white/80">
                {["PDF da petição", "Argumentos CDC + regulação", "Checklist de provas", "Liberação automática via Stripe"].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
              <PrimaryCta className="relative w-full sm:w-auto" />
              <p className="text-[11px] text-white/35 mt-4 relative">
                Primex Sistemas LTDA · CNPJ {CNPJ} · Pix ou cartão no Stripe
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 px-4 py-12">
        <Reveal className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-white/[0.03] p-5 flex gap-3">
          <Eye size={18} className="text-white/40 shrink-0 mt-0.5" />
          <p className="text-xs text-white/45 leading-relaxed">
            <strong className="text-white/70">Prazo:</strong> direitos de consumo em geral seguem prazos
            prescricionais do Código Civil e regras do CDC. Não deixe o tempo passar sem organizar
            prova. Isto não é aconselhamento sobre o prazo do seu caso — confirme com fonte oficial ou
            profissional habilitado.
          </p>
        </Reveal>
      </section>

      <EmpresaPrimex />

      <section id="faq" className="relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2 text-center">FAQ</p>
            <h2 className="text-3xl font-black tracking-tight mb-10 text-center">Perguntas diretas</h2>
          </Reveal>
          <div className="rounded-2xl border border-white/10 px-5 sm:px-6 bg-white/[0.02]">
            {FAQ.map((item, i) => (
              <FaqItem key={item.q} {...item} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-20">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            As bets não vão te explicar o Juizado.
          </h2>
          <p className="text-white/50 mb-8">
            O gerador é o mapa. A prova é sua. A decisão é do juiz.
          </p>
          <PrimaryCta />
        </Reveal>
      </section>

      <footer className="relative z-10 border-t border-white/8 px-4 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-[#05080C] text-[10px] font-black">RJ</div>
              <span className="font-semibold">RecuperaJogo</span>
            </div>
            <p className="text-xs text-white/40 max-w-sm leading-relaxed">
              Software da{" "}
              <a href="https://www.primexsistemas.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-emerald-400 underline underline-offset-2">
                PRIMEX SISTEMAS LTDA
              </a>{" "}
              · CNPJ {CNPJ}. Não é sociedade de advogados. Não promete resultado judicial.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-white/45">
            <Link href="/guia" className="hover:text-white">Guia</Link>
            <Link href="/calculadora" className="hover:text-white">Calculadora</Link>
            <Link href="/politica-privacidade" className="hover:text-white">Privacidade</Link>
            <a href="https://www.primexsistemas.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Primex</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Suporte</a>
            <Link href="/login" className="hover:text-white">Entrar</Link>
          </div>
        </div>
        <p className="max-w-6xl mx-auto mt-8 text-[11px] text-white/25">
          © {new Date().getFullYear()} Primex Sistemas · RecuperaJogo
        </p>
      </footer>

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white font-semibold text-sm px-4 py-3 shadow-[0_8px_40px_rgba(37,211,102,0.35)] hover:scale-105 transition-transform"
        aria-label="Suporte WhatsApp"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">Suporte</span>
      </a>
    </div>
  );
}
