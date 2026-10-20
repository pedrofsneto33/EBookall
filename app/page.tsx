"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MessageCircle,
  Shield,
  AlertTriangle,
  FileText,
  Ban,
} from "lucide-react";

const WA =
  "https://wa.me/5586988117925?text=" +
  encodeURIComponent("Oi! Preciso de suporte no RecuperaJogo.");
const CNPJ = "55.536.885/0001-30";
const PRECO = "137";
const LOGIN = "/login";

const SITUACOES = [
  {
    title: "Exclusão centralizada furada",
    text: "Você se autoexcluiu no sistema oficial e a casa ainda aceitou depósito ou aposta. É falha na prestação do serviço (CDC).",
  },
  {
    title: "Ludopatia e dever de cuidado",
    text: "Sinais de dependência, pedidos de limite ou bloqueio ignorados. A casa tinha dever de proteção e não cumpriu.",
  },
  {
    title: "Publicidade depois do pedido para parar",
    text: "Você pediu para não receber mais oferta e continuou sendo bombardeado com bônus, push e SMS.",
  },
  {
    title: "Saque travado ou resposta evasiva",
    text: "Dinheiro no saldo, saque recusado, atrasado ou com exigência abusiva. Documente e formalize.",
  },
];

const FAQ = [
  {
    q: "Isso é advocacia?",
    a: "Não. É software da Primex Sistemas LTDA. Você revisa o rascunho e protocola em nome próprio no Juizado Especial (jus postulandi).",
  },
  {
    q: "A MP proibiu as bets. Ainda dá pra processar?",
    a: "Sim. A MP 1.394/2026 proíbe a operação daqui pra frente. Fatos anteriores — autoexclusão furada, depósito indevido, publicidade abusiva — podem ser levados ao Juizado. A proibição não apaga o direito sobre o passado.",
  },
  {
    q: "Serve para site chinês / tarja ilegal?",
    a: "Na prática, não. Casa sem licença no Brasil, servidor fora e sem CNPJ utilizável quase inviabiliza cobrança e citação. O gerador é pensado para bets licenciadas (ou que operaram com autorização), onde há réu identificável e foro no Brasil.",
  },
  {
    q: "Só vale se eu tiver ganho R$ 3 mil?",
    a: "Não. A sentença de R$ 3 mil é um exemplo real de danos morais por autoexclusão violada. Cada caso tem fatos, valores e pedidos diferentes. O produto monta o rascunho conforme a sua situação — não copia uma sentença pronta.",
  },
  {
    q: "Preciso de laudo de ludopatia?",
    a: "Não é obrigatório em todo caso. Laudo reforça quando existe. Em autoexclusão furada e falha de serviço, o eixo costuma ser CDC art. 14 e prova documental (prints, e-mails, extratos).",
  },
  {
    q: "Como pago e tem reembolso?",
    a: `R$ ${PRECO} no PIX da Primex (CNPJ ${CNPJ}) ou cartão. Garantia de 7 dias pelo WhatsApp se não gostar do rascunho.`,
  },
];

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.08]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[15px] font-medium text-white/90">{q}</span>
        <ChevronDown
          size={18}
          className={`text-white/30 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-[14px] leading-relaxed text-white/50 -mt-1 max-w-2xl">{a}</p>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-5 h-14 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            Recupera<span className="text-emerald-400">Jogo</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-xs text-white/40 hover:text-white transition"
            >
              Suporte
            </a>
            <Link
              href={LOGIN}
              className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-emerald-400 transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>
      </header>

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-400/90 mb-5">
            Primex Sistemas · gerador de petição
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tight leading-[1.08] max-w-3xl">
            Petição contra bets licenciadas.
            <span className="block text-white/40 mt-1">
              Autoexclusão, ludopatia, publicidade e saque.
            </span>
          </h1>
          <p className="mt-6 text-[16px] text-white/55 max-w-xl leading-relaxed">
            Software para montar rascunho de petição no Juizado Especial Cível.
            Você revisa e protocola em nome próprio. Não é advocacia. Não promete
            resultado. R$ {PRECO}, até 3 petições.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link
              href={LOGIN}
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-[15px] px-7 py-3.5 rounded-full transition-colors"
            >
              Gerar minha petição <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <a
              href="#para-quem"
              className="inline-flex items-center justify-center gap-2 border border-white/15 hover:bg-white/5 text-white/80 font-medium text-[15px] px-7 py-3.5 rounded-full transition-colors"
            >
              Ver se cabe no meu caso
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/35">
            <span className="inline-flex items-center gap-1.5">
              <Shield size={13} className="text-emerald-500" /> Garantia 7 dias
            </span>
            <span>PIX CNPJ {CNPJ}</span>
            <span>Não é sociedade de advogados</span>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: "JEC", l: "Juizado Especial Cível" },
            { v: `R$ ${PRECO}`, l: "pagamento único" },
            { v: "3", l: "petições inclusas" },
            { v: "7 dias", l: "garantia" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-xl md:text-2xl font-bold tracking-tight">{s.v}</p>
              <p className="text-[12px] text-white/40 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="para-quem" className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-4">
          Situações que o gerador cobre
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 max-w-2xl">
          Não é só um processo de R$ 3 mil.
        </h2>
        <p className="text-[15px] text-white/50 max-w-2xl mb-12 leading-relaxed">
          A sentença de danos morais por autoexclusão violada é um exemplo real.
          O produto serve para montar peças a partir dos <em>seus</em> fatos —
          ludopatia, exclusão centralizada, publicidade e problemas de saque em
          casas com réu identificável no Brasil.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {SITUACOES.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-emerald-400" strokeWidth={2.5} />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold mb-1.5">{s.title}</h3>
                  <p className="text-[13px] text-white/45 leading-relaxed">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#0f0f0f]">
        <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-6 md:p-7">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={18} className="text-emerald-400" />
                <h3 className="text-[15px] font-semibold">Bets licenciadas</h3>
              </div>
              <p className="text-[14px] text-white/55 leading-relaxed mb-4">
                Casas que operaram (ou operam) com autorização no Brasil: CNPJ,
                foro e citação possíveis. É o foco do gerador — autoexclusão,
                CDC, publicidade e saque.
              </p>
              <p className="text-[13px] text-emerald-400/90 font-medium">
                Aqui faz sentido montar a peça e protocolar no Juizado.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Ban size={18} className="text-white/40" />
                <h3 className="text-[15px] font-semibold text-white/70">
                  Tarjas / sites ilegais (ex.: &quot;chinesas&quot;)
                </h3>
              </div>
              <p className="text-[14px] text-white/45 leading-relaxed mb-4">
                Plataforma sem licença, domínio offshore, sem CNPJ utilizável:
                cobranca e citação quase inviáveis na prática. Não vendemos a
                ideia de que dá para &quot;recuperar fácil&quot; nesses casos.
              </p>
              <p className="text-[13px] text-white/40 font-medium">
                Seja honesto consigo: o produto não resolve tarja ilegal.
              </p>
            </div>
          </div>
          <p className="mt-6 text-[12px] text-white/30 leading-relaxed max-w-3xl">
            A MP 1.394/2026 proibiu a exploração de bets e jogos online no país.
            O que ocorreu <strong className="text-white/45 font-medium">antes</strong> —
            falhas de exclusão, publicidade indevida, saques — pode ainda ser
            objeto de pedido no Juizado, contra réu identificável.
          </p>
        </div>
      </section>

      <section id="prova" className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-4">
          Exemplo real (um caso, não o único)
        </p>
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          Sentença por autoexclusão violada
        </h2>
        <p className="text-[14px] text-white/45 max-w-2xl mb-8 leading-relaxed">
          4º JEC de Teresina/PI. Processo público. Dados sensíveis omitidos.
          Serve de referência de argumento (CDC art. 14) — não garante o mesmo
          valor nem o mesmo resultado no seu caso.
        </p>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 max-w-3xl">
          <p className="text-[11px] text-white/30 mb-4 font-mono">
            0804781-17.2026.8.18.0140 · Sortenabet Gaming Brasil S.A.
          </p>
          <p className="text-[15px] md:text-base leading-relaxed text-white/80 mb-4">
            Autoexclusão centralizada em dezembro/2025. Em janeiro/2026 a casa
            ainda aceitou depósito e apostas. Pedido de danos morais procedente
            — <span className="text-emerald-400 font-semibold">R$ 3.000,00</span>.
          </p>
          <p className="text-[13px] text-white/35">
            Fundamento: falha na prestação do serviço · CDC art. 14
          </p>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#0f0f0f]">
        <div className="mx-auto max-w-5xl px-5 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-4">
            Como funciona
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-12">
            Três passos. Sem juridiquês.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                t: "Entre com o e-mail",
                d: "Conta em segundos. Sem senha para decorar.",
              },
              {
                n: "02",
                t: `Pague R$ ${PRECO}`,
                d: `PIX no CNPJ ${CNPJ} ou cartão. Envie o comprovante no WhatsApp.`,
              },
              {
                n: "03",
                t: "Gere a petição",
                d: "Até 3 rascunhos em PDF conforme o seu caso. Você revisa e protocola no Juizado.",
              },
            ].map((p) => (
              <div key={p.n}>
                <span className="text-[11px] font-mono text-emerald-400/80 tracking-widest">
                  {p.n}
                </span>
                <h3 className="text-lg font-semibold mt-2 mb-1.5">{p.t}</h3>
                <p className="text-[14px] text-white/40 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex gap-4 items-start">
          <AlertTriangle size={20} className="text-white/40 shrink-0 mt-0.5" />
          <p className="text-[13px] text-white/45 leading-relaxed">
            O RecuperaJogo não é escritório de advocacia e não promete ganho de
            causa. O rascunho é ferramenta documental. Resultado judicial depende
            do juiz, das provas e do caso concreto.
          </p>
        </div>
      </section>

      <section className="border-y border-white/[0.06]">
        <div className="mx-auto max-w-md px-5 py-20 md:py-24 text-center">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-400/80 mb-4">
            Acesso completo
          </p>
          <p className="text-5xl md:text-6xl font-bold tracking-tight">R$ {PRECO}</p>
          <p className="text-[13px] text-white/35 mt-2 mb-8">
            pagamento único · PIX Primex ou cartão
          </p>
          <ul className="text-left space-y-3 mb-9 text-[14px] text-white/60">
            {[
              "Até 3 petições em PDF",
              "Roteiros: exclusão, ludopatia, publicidade, saque",
              "Foco em bets com réu identificável no Brasil",
              "Garantia de 7 dias",
              `PIX chave CNPJ ${CNPJ}`,
            ].map((i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check
                  size={15}
                  className="text-emerald-400 shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                {i}
              </li>
            ))}
          </ul>
          <Link
            href={LOGIN}
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-[15px] px-6 py-3.5 rounded-full transition-colors"
          >
            Começar agora <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
          <p className="text-[11px] text-white/25 mt-5">
            Primex Sistemas LTDA · CNPJ {CNPJ}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-20 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
          Perguntas frequentes
        </h2>
        {FAQ.map((item) => (
          <FaqRow key={item.q} q={item.q} a={item.a} />
        ))}
      </section>

      <section className="border-t border-white/[0.06] bg-[#0f0f0f]">
        <div className="mx-auto max-w-2xl px-5 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Seu caso é de bet licenciada?
          </h2>
          <p className="text-white/45 mb-8 text-[15px]">
            E-mail → PIX Primex → gerador. Direto.
          </p>
          <Link
            href={LOGIN}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-400 text-black font-semibold text-[15px] px-8 py-3.5 rounded-full transition-colors"
          >
            Ir para o login <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-10">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row justify-between gap-6 text-[12px] text-white/30">
          <div>
            <p className="text-white/55 font-medium mb-1">
              RecuperaJogo · Primex Sistemas LTDA
            </p>
            <p>CNPJ {CNPJ}</p>
            <p className="mt-2 max-w-sm leading-relaxed">
              Software de documento. Não é sociedade de advogados. Não promete
              resultado judicial. Não se destina a recuperação em plataformas
              ilegais sem réu no Brasil.
            </p>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/politica-privacidade" className="hover:text-white transition">
              Privacidade
            </Link>
            <Link href="/guia" className="hover:text-white transition">
              Guia
            </Link>
            <a
              href="https://www.primexsistemas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Primex
            </a>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} className="text-[#0a0a0a]" />
      </a>
    </div>
  );
}
