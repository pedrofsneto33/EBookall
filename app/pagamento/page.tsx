"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Shield } from "lucide-react";

const SEAL = "#1B6B4A";
const PAPER = "#F3F0E9";
const INK = "#1A1A1A";
const INK_SOFT = "#5C5C5C";
const CNPJ = "55.536.885/0001-30";

function PagamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled") === "1";
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
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
        setUserId(data.user.id);
        setEmail(data.user.email ?? "");
        setLoading(false);
      })
      .catch(() => router.replace("/login?next=/pagamento"));
  }, [router]);

  async function handlePagar() {
    if (!userId) return;
    setCheckoutLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, email }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Falha ao abrir o checkout");
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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: PAPER }}>
      <div
        className="w-full max-w-md bg-white rounded-2xl border shadow-sm p-8 text-center"
        style={{ borderColor: "#E5E0D4" }}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4"
          style={{ backgroundColor: "#E8F5EF", color: SEAL }}
        >
          <Shield size={14} /> Garantia de 7 dias
        </div>

        <h1 className="text-2xl font-bold mb-2" style={{ color: INK }}>
          Acesso completo
        </h1>
        <p className="text-sm mb-1" style={{ color: INK_SOFT }}>
          {email}
        </p>
        <p className="text-4xl font-black mb-1" style={{ color: SEAL }}>
          R$ 137
        </p>
        <p className="text-xs mb-6" style={{ color: INK_SOFT }}>
          pagamento único
        </p>

        {canceled && (
          <div
            className="mb-4 p-3 rounded-xl text-sm flex gap-2 items-start border"
            style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" }}
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>Pagamento cancelado. Você pode tentar de novo.</span>
          </div>
        )}

        {error && (
          <div
            className="mb-4 p-3 rounded-xl text-sm flex gap-2 items-start border"
            style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" }}
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-3 mb-6 text-left text-sm" style={{ color: INK_SOFT }}>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: SEAL }} />
            <span>3 petições completas inclusas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: SEAL }} />
            <span>Calculadora de valores</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: SEAL }} />
            <span>Checklist de provas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: SEAL }} />
            <span>Garantia de 7 dias</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: SEAL }} />
            <span>Pix ou cartão via Stripe</span>
          </div>
        </div>

        <div
          className="mb-6 p-3 rounded-xl border text-left text-xs"
          style={{ borderColor: "#E5E0D4", color: INK_SOFT }}
        >
          <p className="font-semibold mb-1" style={{ color: INK }}>
            Primex Sistemas LTDA
          </p>
          <p>CNPJ {CNPJ}</p>
          <p className="mt-1">Software de documento · não é advocacia</p>
        </div>

        <button
          type="button"
          onClick={handlePagar}
          disabled={checkoutLoading}
          className="w-full inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3.5 rounded-xl disabled:opacity-70"
          style={{ backgroundColor: SEAL, color: "#FFF" }}
        >
          {checkoutLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Abrindo pagamento...
            </>
          ) : (
            <>
              Pagar R$ 137 · Pix ou cartão <ArrowRight size={18} />
            </>
          )}
        </button>
        <p className="text-xs mt-4" style={{ color: INK_SOFT }}>
          Pagamento seguro via Stripe. Acesso liberado automaticamente após a confirmação.
        </p>
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
