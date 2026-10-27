"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "../lib/analytics";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  MessageCircle,
} from "lucide-react";
import { PRECO_TXT, WHATSAPP_TXT, waLink } from "../lib/config";

const CNPJ_FORMATADO = "55.536.885/0001-30";
const CNPJ_LIMPO = "55536885000130";

function PagamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled") === "1";
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [copiarErro, setCopiarErro] = useState("");
  const [qrErro, setQrErro] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(async (r) => {
        if (!r.ok) {
          router.replace("/login?next=/pagamento");
          return;
        }
        const data = await r.json();
        if (!data.email) {
          router.replace("/login?next=/pagamento");
          return;
        }
        if (data.status === "active") {
          router.replace("/gerador");
          return;
        }
        setEmail(data.email);
        setLoading(false);
      })
      .catch(() => router.replace("/login?next=/pagamento"));
  }, [router]);

  async function copiarCnpj() {
    setCopiarErro("");
    try {
      await navigator.clipboard.writeText(CNPJ_LIMPO);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiarErro("Copie manualmente: " + CNPJ_FORMATADO);
    }
  }

  function abrirWhatsApp() {
    window.open(
      `https://wa.me/5586988117925?text=${encodeURIComponent(
        `Oi! Paguei o Pix de R$ ${PRECO_TXT} e vou mandar o comprovante.`
      )}`,
      "_blank"
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05080C]">
        <Loader2 size={40} className="animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:py-10 bg-[#05080C]">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl p-5 sm:p-7 text-center">
        
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
           <Shield size={14} /> Acesso imediato
        </div>

        <h1 className="text-2xl font-bold mb-1 text-white">
          Pagar acesso — R$ {PRECO_TXT}
        </h1>
        <p className="text-sm mb-6 text-white/60">
          {email}
        </p>

        {canceled && (
          <div className="mb-4 p-3 rounded-xl text-sm flex gap-2 items-start border text-left bg-red-500/10 border-red-500/20 text-red-400">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>Pagamento cancelado. Você pode tentar novamente.</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl text-sm flex gap-2 items-start border text-left bg-red-500/10 border-red-500/20 text-red-400">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* PIX ESTÁTICO */}
        <div className="mb-5 p-5 rounded-2xl border text-left border-emerald-500/20 bg-emerald-500/5">
          <p className="text-xs font-semibold uppercase tracking-wide mb-3 text-emerald-400">
            Pague R$ {PRECO_TXT} via Pix
          </p>

          {qrErro ? (
            <p className="text-sm text-center py-6 leading-relaxed text-white">
              Use a chave Pix (CNPJ) abaixo para pagar.
            </p>
          ) : (
            <div className="flex justify-center mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pix-qr.png"
                alt="QR Code Pix CNPJ Primex"
                width={220}
                height={220}
                className="rounded-xl bg-white p-2 w-full max-w-[220px] h-auto"
                onError={() => setQrErro(true)}
              />
            </div>
          )}

          <p className="text-xs mb-1 text-white/60">
            Chave Pix (CNPJ):
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <code className="flex-1 px-3 py-2.5 rounded-xl border font-mono text-sm border-emerald-500/20 bg-black/40 text-white break-all">
              {CNPJ_FORMATADO}
            </code>
            <button
              type="button"
              onClick={copiarCnpj}
              className="shrink-0 inline-flex items-center justify-center gap-1 text-sm font-semibold px-4 py-3 rounded-xl border border-emerald-500/20 text-emerald-400 bg-black/40 hover:bg-emerald-500/10 transition-colors"
            >
              {copiado ? "Copiado!" : "Copiar CNPJ"}
            </button>
          </div>
          {copiarErro && (
            <p className="text-xs mt-2 text-red-400">{copiarErro}</p>
          )}

          <ol className="mt-4 space-y-1 text-sm text-left text-white/60">
            <li>1. Abra o app do seu banco.</li>
            <li>2. Escolha Pix &#8594; Pagar com CNPJ.</li>
            <li>3. Cole a chave acima e digite R$ {PRECO_TXT}.</li>
            <li>4. Envie o comprovante no WhatsApp abaixo.</li>
          </ol>

          <button
            type="button"
            onClick={() => { trackEvent('Clique_WhatsApp_Pagamento'); abrirWhatsApp(); }}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 text-[15px] font-bold px-6 py-4 rounded-xl bg-[#25D366] text-[#06311A] hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={18} /> Enviar comprovante no WhatsApp
          </button>

          <p className="text-xs mt-3 leading-relaxed text-white/60">
            Seu acesso é liberado manualmente em até 10 minutos após o envio do comprovante.
          </p>
        </div>

        <a
          href={waLink("Oi! Tenho dúvida sobre o pagamento via Pix")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-xs text-center hover:underline text-white/60"
        >
          Dúvida? Fale no WhatsApp
        </a>

        {/* BENEFÍCIOS */}
        <div className="mt-6 space-y-3 text-left text-sm text-white/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>3 petições completas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>Calculadora + checklist de provas</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>Acesso imediato após confirmação</span>
          </div>
        </div>

        <div className="mt-6 p-3 rounded-xl border text-left text-xs border-white/10 text-white/60">
          <p className="font-semibold mb-1 text-white">
            Primex Sistemas LTDA
          </p>
          <p>CNPJ {CNPJ_FORMATADO}</p>
          <p className="mt-1">Software de documento · não é advocacia</p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-6 text-xs hover:underline text-white/60"
        >
          ← Voltar ao início
        </button>
      </div>
    </div>
  );
}

export default function PaginaPagamento() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#05080C]">
          <Loader2 size={40} className="animate-spin text-emerald-400" />
        </div>
      }
    >
      <PagamentoContent />
    </Suspense>
  );
}