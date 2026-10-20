"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Copy,
  MessageCircle,
  CreditCard,
} from "lucide-react";

const SEAL = "#1B6B4A";
const PAPER = "#0B1220";
const INK = "#F5F7FA";
const INK_SOFT = "#9AA8BC";
const CNPJ = "55.536.885/0001-30";
const PRECO = "137,00";
const WHATSAPP = "5586988117925";

function PagamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled") === "1";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(async (r) => {
        if (!r.ok) {
          router.replace("/login?next=/pagamento");
          return;
        }
        const data = await r.json();
        if (!data.user) {
          router.replace("/login?next=/pagamento");
          return;
        }
        if (data.status === "active") {
          router.replace("/gerador");
          return;
        }
        setEmail(data.user.email ?? "");
        setLoading(false);
      })
      .catch(() => router.replace("/login?next=/pagamento"));
  }, [router]);

  async function copyCnpj() {
    try {
      await navigator.clipboard.writeText(CNPJ.replace(/\D/g, "") === "" ? CNPJ : CNPJ);
      // Copia formatado e também só números ajuda em alguns bancos
      await navigator.clipboard.writeText(CNPJ);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError("Não foi possível copiar. Anote: " + CNPJ);
    }
  }

  function openWhatsApp() {
    const msg = encodeURIComponent(
      `Oi! Paguei R$ ${PRECO} no PIX CNPJ Primex (${CNPJ}).\nE-mail da conta: ${email}\nSegue o comprovante.`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  }

  async function handleCartao() {
    setCheckoutLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Falha ao abrir o cartão");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro no pagamento");
      setCheckoutLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: PAPER }}>
        <Loader2 size={40} className="animate-spin" style={{ color: SEAL }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ backgroundColor: PAPER }}>
      <div
        className="w-full max-w-md rounded-2xl border shadow-xl p-7 text-center"
        style={{ borderColor: "#1E2A3A", backgroundColor: "#111827" }}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4"
          style={{ backgroundColor: "#134E3A", color: "#6EE7B7" }}
        >
          <Shield size={14} /> Garantia de 7 dias
        </div>

        <h1 className="text-2xl font-bold mb-1" style={{ color: INK }}>
          Pagar acesso — R$ {PRECO}
        </h1>
        <p className="text-sm mb-6" style={{ color: INK_SOFT }}>
          {email}
        </p>

        {canceled && (
          <div
            className="mb-4 p-3 rounded-xl text-sm flex gap-2 items-start border text-left"
            style={{ backgroundColor: "#3F1D1D", borderColor: "#7F1D1D", color: "#FECACA" }}
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>Cartão cancelado. Você pode pagar por PIX CNPJ abaixo.</span>
          </div>
        )}

        {error && (
          <div
            className="mb-4 p-3 rounded-xl text-sm flex gap-2 items-start border text-left"
            style={{ backgroundColor: "#3F1D1D", borderColor: "#7F1D1D", color: "#FECACA" }}
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* PIX PRIMEX — principal */}
        <div
          className="mb-5 p-5 rounded-2xl border text-left"
          style={{ borderColor: "#1B6B4A", backgroundColor: "#0C1F17" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#6EE7B7" }}>
            PIX direto — Primex Sistemas
          </p>
          <p className="text-sm mb-3" style={{ color: INK_SOFT }}>
            Valor: <strong style={{ color: INK }}>R$ {PRECO}</strong>
          </p>
          <p className="text-xs mb-1" style={{ color: INK_SOFT }}>
            Chave PIX (CNPJ)
          </p>
          <button
            type="button"
            onClick={copyCnpj}
            className="w-full flex items-center justify-between gap-2 px-3 py-3 rounded-xl border text-left font-mono text-sm font-semibold transition"
            style={{ borderColor: "#1B6B4A", backgroundColor: "#0B1220", color: INK }}
          >
            <span>{CNPJ}</span>
            <span className="inline-flex items-center gap-1 text-xs font-sans" style={{ color: "#6EE7B7" }}>
              <Copy size={14} /> {copied ? "Copiado!" : "Copiar"}
            </span>
          </button>
          <p className="text-xs mt-3 leading-relaxed" style={{ color: INK_SOFT }}>
            1. Abra o app do banco → PIX → Colar chave CNPJ
            <br />
            2. Transfira <strong style={{ color: INK }}>R$ {PRECO}</strong>
            <br />
            3. Envie o comprovante no WhatsApp (com este e-mail)
            <br />
            4. Liberamos o gerador em seguida
          </p>
          <button
            type="button"
            onClick={openWhatsApp}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3.5 rounded-xl"
            style={{ backgroundColor: "#25D366", color: "#0B1220" }}
          >
            <MessageCircle size={18} /> Enviar comprovante no WhatsApp
          </button>
        </div>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: "#1E2A3A" }} />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3" style={{ backgroundColor: "#111827", color: INK_SOFT }}>
              ou cartão
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCartao}
          disabled={checkoutLoading}
          className="w-full inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3.5 rounded-xl disabled:opacity-70 border"
          style={{ borderColor: "#1E2A3A", color: INK, backgroundColor: "#0B1220" }}
        >
          {checkoutLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Abrindo cartão...
            </>
          ) : (
            <>
              <CreditCard size={18} /> Pagar com cartão <ArrowRight size={18} />
            </>
          )}
        </button>

        <div className="mt-6 space-y-2 text-left text-sm" style={{ color: INK_SOFT }}>
          {["3 petições completas", "Calculadora + checklist", "Garantia 7 dias"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <CheckCircle2 size={16} style={{ color: SEAL }} />
              <span>{t}</span>
            </div>
          ))}
        </div>

        <div
          className="mt-6 p-3 rounded-xl border text-left text-xs"
          style={{ borderColor: "#1E2A3A", color: INK_SOFT }}
        >
          <p className="font-semibold mb-1" style={{ color: INK }}>
            Primex Sistemas LTDA
          </p>
          <p>CNPJ {CNPJ}</p>
          <p className="mt-1">Software de documento · não é advocacia</p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-6 text-xs hover:underline"
          style={{ color: INK_SOFT }}
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
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: PAPER }}>
          <Loader2 size={40} className="animate-spin" style={{ color: SEAL }} />
        </div>
      }
    >
      <PagamentoContent />
    </Suspense>
  );
}
