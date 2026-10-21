"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  MessageCircle,
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

  async function copiarCnpj() {
    setCopiarErro("");
    try {
      await navigator.clipboard.writeText("55536885000130");
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiarErro("Copie manualmente: 55.536.885/0001-30");
    }
  }

  function abrirWhatsApp() {
    window.open(
      `https://wa.me/5586988117925?text=${encodeURIComponent(
        "Oi! Paguei o Pix de R$ 137 e vou mandar o comprovante."
      )}`,
      "_blank"
    );
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

        {/* PIX estatico no CNPJ */}
        <div
          className="mb-5 p-5 rounded-2xl border text-left"
          style={{ borderColor: "#1B6B4A", backgroundColor: "#0C1F17" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#6EE7B7" }}>
            Pague R$ 137,00 via Pix
          </p>

          {qrErro ? (
            <p className="text-sm text-center py-6 leading-relaxed" style={{ color: INK }}>
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
                className="rounded-xl bg-white p-2"
                onError={() => setQrErro(true)}
              />
            </div>
          )}

          <p className="text-xs mb-1" style={{ color: INK_SOFT }}>
            Chave Pix (CNPJ):
          </p>
          <div className="flex items-center gap-2">
            <code
              className="flex-1 px-3 py-2.5 rounded-xl border font-mono text-sm"
              style={{ borderColor: "#1B6B4A", backgroundColor: "#0B1220", color: INK }}
            >
              55.536.885/0001-30
            </code>
            <button
              type="button"
              onClick={copiarCnpj}
              className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-3 py-2.5 rounded-xl border"
              style={{ borderColor: "#1B6B4A", color: "#6EE7B7", backgroundColor: "#0B1220" }}
            >
              {copiado ? "Copiado!" : "Copiar CNPJ"}
            </button>
          </div>
          {copiarErro && (
            <p className="text-xs mt-2" style={{ color: "#FECACA" }}>
              {copiarErro}
            </p>
          )}

          <ol className="mt-4 space-y-1 text-sm text-left" style={{ color: INK_SOFT }}>
            <li>1. Abra o app do seu banco.</li>
            <li>2. Escolha Pix &#8594; Pagar com CNPJ.</li>
            <li>3. Cole a chave acima e digite R$ 137,00.</li>
            <li>4. Envie o comprovante no WhatsApp abaixo.</li>
          </ol>

          <button
            type="button"
            onClick={abrirWhatsApp}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3.5 rounded-xl"
            style={{ backgroundColor: "#25D366", color: "#06311A" }}
          >
            <MessageCircle size={18} /> Enviar comprovante no WhatsApp
          </button>

          <p className="text-xs mt-3 leading-relaxed" style={{ color: INK_SOFT }}>
            Seu acesso é liberado manualmente em até 10 minutos após o envio do comprovante.
            Você recebe um e-mail quando estiver liberado.
          </p>
        </div>

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
