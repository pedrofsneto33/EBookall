"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MessageCircle,
  Shield,
} from "lucide-react";

const WA = "https://wa.me/5586988117925?text=" + encodeURIComponent("Oi! Preciso de suporte no RecuperaJogo.");
const CNPJ = "55.536.885/0001-30";
const PRECO = "137";
const LOGIN = "/login";

const FAQ = [
  { q: "Isso é advocacia?", a: "Não. É software da Primex Sistemas LTDA. Você revisa o rascunho e protocola em nome próprio no Juizado Especial." },
  { q: "Preciso de advogado?", a: "Em causas até 20 salários mínimos no Juizado, a lei permite protocolar sozinho (jus postulandi). Caso maior ou complexo: advogado ou Defensoria." },
  { q: "Como pago?", a: `R$ ${PRECO} no PIX da Primex (CNPJ ${CNPJ}). Copia a chave, paga e manda o comprovante no WhatsApp. Também aceita cartão.` },
  { q: "Tem reembolso?", a: "Sim, 7 dias. Não gostou do rascunho? Devolvemos pelo WhatsApp." },
  { q: "Funciona sem laudo?", a: "Sim, em autoexclusão violada e falha de serviço (CDC). Laudo reforça quando existir, mas não é obrigatório em todo caso." },
];

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="text-[15px] font-medium text-white">{q}</span>
        <ChevronDown size={18} className={`text-white/40 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-5 text-[14px] leading-relaxed text-white/50 -mt-1 max-w-2xl">{a}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0a0a0a]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-[15px]">
            Recupera<span className="text-emerald-400">Jogo</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hidden sm:block text-xs text-white/40 hover:text-white transition">
              Suporte
            </a>
            <Link href={LOGIN} className="text-xs font-semibold bg-white text-black px-3.5 py-2 rounded-full hover:bg-emerald-400 transition">
              Entrar
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/85 to-[#0a0a0a]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5">
          <p className="text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            Primex Sistemas · contra as bets
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.05] max-w-3xl">
            A bet te prendeu.
            <br />
            <span className="text-white/40">O Juizado é o caminho.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/55 max-w-xl leading-relaxed">
            Gerador de petição para Juizado Especial Cível. Baseado em caso real com sentença.
            Você preenche, revisa e protocola em nome próprio — R$ {PRECO}.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={LOGIN}
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-[15px] px-6 py-3.5 rounded-full transition"
            >
              Gerar minha petição <ArrowRight size={18} />
            </Link>
            <a
              href="#prova"
              className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-white/80 font-medium text-[15px] px-6 py-3.5 rounded-full transition"
            >
              Ver a sentença
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/35">
            <span className="inline-flex items-center gap-1.5"><Shield size={13} className="text-emerald-500" /> Garantia 7 dias</span>
            <span>PIX CNPJ {CNPJ}</span>
            <span>Não é advocacia</span>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: "R$ 3.000", l: "danos morais na sentença" },
            { v: "JEC", l: "Juizado Especial Cível" },
            { v: `R$ ${PRECO}`, l: "acesso completo" },
            { v: "3", l: "petições inclusas" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl md:text-3xl font-bold tracking-tight">{s.v}</p>
              <p className="text-xs text-white/40 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/30 mb-4">O problema</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5">
              Autoexclusão ignorada.
              <br />
              Depósito aceito mesmo assim.
            </h2>
            <p className="text-white/50 leading-relaxed mb-6">
              Você pediu para parar. A plataforma continuou aberta. O CDC trata isso como falha na
              prestação do serviço — e o Juizado Especial existe para quem quer protocolar sem
              advogado, até o limite legal.
            </p>
            <ul className="space-y-3">
              {["Autoexclusão furada", "Saque travado ou enrolado", "App que não deixa parar"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-white/70">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <Check size={12} className="text-emerald-400" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80"
              alt="Pessoa com celular"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-sm text-white/80 font-medium">
              O celular vira a mesa de jogo. A peça documenta o que a casa omitiu.
            </p>
          </div>
        </div>
      </section>

      <section id="prova" className="bg-[#111] border-y border-white/8">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-emerald-400/80 mb-4">Prova real</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Sentença no Juizado</h2>
          <p className="text-white/45 max-w-xl mb-10 text-[15px] leading-relaxed">
            Processo público no 4º JEC de Teresina/PI. Dados sensíveis omitidos. Não garante o mesmo resultado no seu caso.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 md:p-8">
              <p className="text-xs text-white/35 mb-4">0804781-17.2026.8.18.0140 · Sortenabet Gaming Brasil S.A.</p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white/90 mb-6">
                Autoexclusão centralizada em dezembro/2025. Em janeiro/2026 a casa ainda aceitou depósito e apostas.
                Sentença: danos morais procedentes — <span className="text-emerald-400 font-semibold">R$ 3.000,00</span>.
              </p>
              <p className="text-sm text-white/40">Fundamento: CDC art. 14 · falha na prestação do serviço.</p>
            </div>
            <div className="rounded-2xl overflow-hidden relative min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80"
                alt="Documento jurídico"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="text-3xl font-bold text-emerald-400">R$ 3 mil</p>
                <p className="text-sm text-white/60">danos morais · procedente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/30 mb-4">Como funciona</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 max-w-lg">Três passos. Sem juridiquês.</h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {[
            { n: "1", t: "Entre com o e-mail", d: "Conta em segundos. Sem senha para lembrar." },
            { n: "2", t: "Pague R$ 137", d: `PIX no CNPJ ${CNPJ} ou cartão. Manda o comprovante no WhatsApp.` },
            { n: "3", t: "Gere a petição", d: "Até 3 rascunhos em PDF. Você revisa e protocola no Juizado." },
          ].map((p) => (
            <div key={p.n} className="relative">
              <span className="text-5xl font-bold text-white/10 absolute -top-2 left-0">{p.n}</span>
              <div className="pt-10">
                <h3 className="text-lg font-semibold mb-2">{p.t}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#111]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="max-w-md mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-emerald-400/80 mb-4">Acesso</p>
            <p className="text-5xl md:text-6xl font-bold tracking-tight mb-2">R$ {PRECO}</p>
            <p className="text-sm text-white/40 mb-8">pagamento único · PIX Primex ou cartão</p>
            <ul className="text-left space-y-3 mb-8 text-sm text-white/65">
              {[
                "Até 3 petições em PDF",
                "Argumentos CDC + regulação",
                "Checklist de provas",
                "Garantia de 7 dias",
                `PIX chave CNPJ ${CNPJ}`,
              ].map((i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  {i}
                </li>
              ))}
            </ul>
            <Link
              href={LOGIN}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-[15px] px-6 py-3.5 rounded-full transition"
            >
              Começar agora <ArrowRight size={18} />
            </Link>
            <p className="text-[11px] text-white/30 mt-5">Primex Sistemas LTDA · não promete resultado judicial</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-20 md:py-28">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Perguntas frequentes</h2>
        <div>
          {FAQ.map((item) => (
            <FaqRow key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Pronto para montar a peça?
          </h2>
          <p className="text-white/50 mb-8 text-[15px]">E-mail → PIX Primex → gerador. Direto.</p>
          <Link
            href={LOGIN}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-400 text-black font-semibold text-[15px] px-7 py-3.5 rounded-full transition"
          >
            Ir para o login <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/8 px-5 py-10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-6 text-xs text-white/35">
          <div>
            <p className="text-white/60 font-medium mb-1">RecuperaJogo · Primex Sistemas LTDA</p>
            <p>CNPJ {CNPJ}</p>
            <p className="mt-2 max-w-sm">Software de documento. Não é sociedade de advogados. Não promete resultado judicial.</p>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/politica-privacidade" className="hover:text-white transition">Privacidade</Link>
            <Link href="/guia" className="hover:text-white transition">Guia</Link>
            <a href="https://www.primexsistemas.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Primex</a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp</a>
          </div>
        </div>
      </footer>

      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-105 transition"
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} className="text-[#0a0a0a]" />
      </a>
    </div>
  );
}
