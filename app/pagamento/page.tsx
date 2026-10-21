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
  QrCode,
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
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [pixLoading, setPixLoading] = useState(false);
  const [pix, setPix] = useState<{
    paymentId: string;
    qrCodeBase64: string;
    copiaECola: string;
    expirationDate: string;
  } | null>(null);
  const [verificando, setVerificando] = useState(false);

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

  // Polling do status do Pix a cada 5s enquanto houver Pix gerado.
  useEffect(() => {
    if (!pix?.paymentId) return;
    const t = setInterval(() => {
      void verificarPagamento();
    }, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pix?.paymentId]);

  async function gerarPix() {
    setPixLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pix/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.status === 401) {
        router.replace("/login?next=/pagamento");
        return;
      }
      const data = await res.json();
      if (res.status === 429) {
        setError(data.error || "Muitas tentativas. Aguarde alguns minutos.");
        return;
      }
      if (!res.ok) {
        throw new Error(data.error || "Não foi possível gerar o Pix");
      }
      setPix({
        paymentId: data.paymentId,
        qrCodeBase64: data.qrCodeBase64,
        copiaECola: data.copiaECola,
        expirationDate: data.expirationDate,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao gerar o Pix");
    } finally {
      setPixLoading(false);
    }
  }

  async function copiarPix() {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.copiaECola);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError("Não foi possível copiar. Selecione e copie manualmente.");
    }
  }

  async function verificarPagamento() {
    if (!pix) return;
    setVerificando(true);
    try {
      const res = await fetch(`/api/pix/status?paymentId=${encodeURIComponent(pix.paymentId)}`, {
        credentials: "include",
        cache: "no-store",
      });
      if (res.status === 401) {
        router.replace("/login?next=/pagamento");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro ao consultar pagamento");
      }
      const status = data.status;
      if (status === "RECEIVED" || status === "CONFIRMED") {
        router.push("/obrigado");
        return;
      }
      if (status === "OVERDUE" || status === "REFUNDED") {
        setError("Pix expirou ou foi estornado. Gere um novo.");
        setPix(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao consultar pagamento");
    } finally {
      setVerificando(false);
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
            <span>Cartão cancelado. Você pode pagar via Pix abaixo.</span>
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

        {/* PIX via Asaas */}
        {!pix ? (
          <button
            type="button"
            onClick={gerarPix}
            disabled={pixLoading}
            className="w-full inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3.5 rounded-xl disabled:opacity-70"
            style={{ backgroundColor: SEAL, color: INK }}
          >
            {pixLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Gerando Pix...
              </>
            ) : (
              <>
                <QrCode size={18} /> Pagar com Pix (R$ 137) <ArrowRight size={18} />
              </>
            )}
          </button>
        ) : (
          <div
            className="mb-5 p-5 rounded-2xl border text-left"
            style={{ borderColor: "#1B6B4A", backgroundColor: "#0C1F17" }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#6EE7B7" }}>
              Pix gerado — pague e o acesso é liberado sozinho
            </p>
            <div className="flex justify-center mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  pix.qrCodeBase64.startsWith("data:")
                    ? pix.qrCodeBase64
                    : `data:image/png;base64,${pix.qrCodeBase64}`
                }
                alt="QR Code do Pix"
                width={220}
                height={220}
                className="rounded-xl bg-white p-2"
              />
            </div>
            <p className="text-xs mb-1" style={{ color: INK_SOFT }}>
              Pix copia e cola
            </p>
            <div className="flex items-start gap-2">
              <textarea
                readOnly
                value={pix.copiaECola}
                rows={3}
                className="w-full px-3 py-2 rounded-xl border font-mono text-xs resize-none"
                style={{ borderColor: "#1B6B4A", backgroundColor: "#0B1220", color: INK }}
              />
              <button
                type="button"
                onClick={copiarPix}
                className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-3 py-2.5 rounded-xl border"
                style={{ borderColor: "#1B6B4A", color: "#6EE7B7", backgroundColor: "#0B1220" }}
              >
                <Copy size={14} /> {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
            <p className="text-xs mt-3" style={{ color: INK_SOFT }}>
              Expira em: {new Date(pix.expirationDate).toLocaleString("pt-BR")}
            </p>
            <button
              type="button"
              onClick={verificarPagamento}
              disabled={verificando}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3.5 rounded-xl disabled:opacity-70"
              style={{ backgroundColor: SEAL, color: INK }}
            >
              {verificando ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Verificando...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} /> Já paguei — verificar agora
                </>
              )}
            </button>
          </div>
        )}

        <p className="text-xs mt-4 leading-relaxed" style={{ color: INK_SOFT }}>
          Pagamento via Pix. O acesso é liberado automaticamente em até 30 segundos após a confirmação.
        </p>

        <a
          href={`https://wa.me/${WHATSAPP}?text=Oi!%20Tenho%20d%C3%BAvida%20sobre%20o%20pagamento%20via%20Pix`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-xs text-center hover:underline"
          style={{ color: INK_SOFT }}
        >
          Dúvida? Fale no WhatsApp
        </a>

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
