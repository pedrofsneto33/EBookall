"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Scale, CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "../login/supabase";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";

function PagamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("user_id");
  const canceled = searchParams.get("canceled");

  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(userIdParam);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const uid = session?.user?.id ?? userIdParam;
        if (!uid) {
          router.replace("/login?redirect=/pagamento");
          return;
        }
        setUserId(uid);
        setEmail(session?.user?.email ?? null);

        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("status")
          .eq("user_id", uid)
          .maybeSingle();

        if (subscription?.status === "active") {
          setAlreadyPaid(true);
          setTimeout(() => router.replace("/gerador"), 1500);
        }
      } catch (e) {
        console.error(e);
        setError("Não foi possível verificar seu acesso. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    check();
  }, [userIdParam, router]);

  const handlePagar = async () => {
    if (!userId) {
      setError("Sessão inválida. Faça login novamente.");
      return;
    }
    setCheckoutLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, email }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Não foi possível iniciar o pagamento.");
      window.location.href = data.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao abrir o checkout.");
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F2EFE6" }}>
        <div className="text-center">
          <Loader2 size={40} className="mx-auto mb-4 animate-spin" style={{ color: SEAL }} />
          <p className="text-sm font-medium" style={{ color: INK }}>Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (alreadyPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F2EFE6" }}>
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
          <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: "#3F6B4A" }} />
          <h1 className="text-2xl font-bold mb-3" style={{ color: INK }}>Pagamento confirmado!</h1>
          <p className="text-sm" style={{ color: INK_SOFT }}>Redirecionando para o gerador...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F2EFE6" }}>
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: AMBER_BG }}>
          <Scale size={32} style={{ color: SEAL }} />
        </div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: INK }}>Complete sua inscrição</h1>
        <p className="text-sm mb-6" style={{ color: INK_SOFT }}>
          Para acessar o gerador de petições, finalize o pagamento único de <strong>R$ 137</strong>.
        </p>
        {canceled && (
          <div className="mb-4 p-3 rounded-lg border text-sm flex gap-2 items-start text-left" style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" }}>
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>Pagamento cancelado. Você pode tentar novamente quando quiser.</span>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg border text-sm flex gap-2 items-start text-left" style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" }}>
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        <div className="space-y-3 mb-6 text-left text-sm" style={{ color: INK_SOFT }}>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} style={{ color: "#3F6B4A" }} /><span>3 petições completas inclusas</span></div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} style={{ color: "#3F6B4A" }} /><span>Calculadora de valores</span></div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} style={{ color: "#3F6B4A" }} /><span>Checklist de provas</span></div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} style={{ color: "#3F6B4A" }} /><span>Garantia de 7 dias</span></div>
        </div>
        <button type="button" onClick={handlePagar} disabled={checkoutLoading}
          className="w-full inline-flex items-center justify-center gap-2 text-base font-bold px-6 py-4 rounded-lg transition-transform hover:scale-[1.02] disabled:opacity-70"
          style={{ backgroundColor: SEAL, color: "#FFF" }}>
          {checkoutLoading ? (<><Loader2 size={18} className="animate-spin" /> Abrindo pagamento...</>) : (<>Pagar R$ 137 e Acessar <ArrowRight size={18} /></>)}
        </button>
        <p className="text-xs mt-4" style={{ color: INK_SOFT }}>Pagamento seguro via Stripe. Acesso liberado automaticamente após a confirmação.</p>
        <button type="button" onClick={() => router.push("/")} className="mt-6 text-xs hover:underline" style={{ color: INK_SOFT }}>← Voltar ao início</button>
      </div>
    </div>
  );
}

export default function PaginaPagamento() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F2EFE6" }}>
        <div className="text-center">
          <Loader2 size={40} className="mx-auto mb-4 animate-spin" style={{ color: SEAL }} />
          <p className="text-sm font-medium" style={{ color: INK }}>Carregando...</p>
        </div>
      </div>
    }>
      <PagamentoContent />
    </Suspense>
  );
}
