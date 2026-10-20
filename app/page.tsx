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
  {
    icon: Ban,
    title: "Autoexclusão furada",
    text: "Você pediu para parar. A casa ainda aceitou depósito.",
    color: "from-red-500/20 to-transparent",
  },
  {
    icon: Banknote,
    title: "Saque travado",
    text: "Saldo seu. Transferência negada ou enrolada.",
    color: "from-amber-500/20 to-transparent",
  },
  {
    icon: Flame,
    title: "Jogo que não para",
    text: "App e sessão sem fim. A peça fala de fato e de CDC.",
    color: "from-orange-500/20 to-transparent",
  },
  {
    icon: Scale,
    title: "Laudo / ludopatia",
    text: "Com laudo, o art. 26 da SPA entra. Sem laudo, o gerador não inventa diagnóstico.",
    color: "from-emerald-500/20 to-transparent",
  },
];

const PASSOS = [
  {
    n: "01",
    t: "Entre com o e-mail",
    d: "Conta em segundos. Sem senha complicada.",
    icon: Smartphone,
  },
  {
    n: "02",
    t: "Pague R$ 137 no PIX Primex",
    d: `CNPJ ${CNPJ}. Ou cartão. Acesso liberado após confirmação.`,
    icon: Zap,
  },
  {
    n: "03",
    t: "Gere a petição",
    d: "Até 3 rascunhos. Você revisa e protocola no Juizado.",
    icon: FileText,
  },
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
    a: `R$ ${PRECO} no PIX direto da Primex (CNPJ ${CNPJ}). Você copia a chave, paga e manda o comprovante no WhatsApp — liberamos o gerador em seguida. Também tem opção de cartão.`,
  },
  {
    q: "Tem reembolso?",
    a: "Sim. 7 dias. Não gostou do rascunho? Devolvemos. Fale no WhatsApp de suporte.",
  },
  {
    q: "Meus dados ficam salvos?",
    a: "Usamos o mínimo para conta e acesso. Você pode pedir exclusão pelo WhatsApp. Veja a Política de Privacidade.",
  },
  {
    q: "E se a casa me ignorar?",
    a: "A petição é o caminho formal no Juizado. Citação e prazos seguem o processo. O software não garante acordo nem sentença favorável.",
  },
  {
    q: "Funciona sem laudo?",
    a: "Sim, em cenários de autoexclusão violada e falha de serviço (CDC). Laudo reforça quando existir, mas não é obrigatório em todo perfil.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="text-sm md:text-base font-semibold text-white">{q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-emerald-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-white/55 leading-relaxed border-t border-white/5 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="ambient-orb top-[-10%] left-[-5%] w-[420px] h-[420px] bg-emerald-500/20" />
        <div
          className="ambient-orb top-[20%] right-[-10%] w-[380px] h-[380px] bg-red-600/15"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="ambient-orb bottom-[10%] left-[30%] w-[300px] h-[300px] bg-emerald-600/10"
          style={{ animationDelay: "-5s" }}
        />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* Nav */}
      <header className="relative z-20 border-b border-white/8 backdrop-blur-md bg-[#030712]/70 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-xs font-black text-[#030712]">
              RJ
            </div>
            <span className="font-bold tracking-tight">RecuperaJogo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/55">
            <a href="#como" className="hover:text-white transition-colors">
              Como funciona
            </a>
            <a href="#prova" className="hover:text-white transition-colors">
              Prova real
            </a>
            <a href="#preco" className="hover:text-white transition-colors">
              Preço
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-xs text-white/45 hover:text-emerald-400"
            >
              Suporte
            </a>
            <Link
              href={CTA_PRIMARY}
              className="btn-cta inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl bg-emerald-500 text-[#030712]"
            >
              Começar <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 pt-12 pb-20 md:pt-20 md:pb-28 px-4">
        <div className="absolute inset-0 hero-grid opacity-60" />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div>
              <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-soft-pulse" />
                Campanha contra as bets · não é advocacia
              </div>

              <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">
                A casa te empurrou a jogar.
                <br />
                <span className="text-gradient-emerald">Agora documente e processa.</span>
              </h1>

              <p className="animate-fade-up delay-200 text-base md:text-lg text-white/60 max-w-xl leading-relaxed mb-8">
                Gerador de rascunho de petição para o{