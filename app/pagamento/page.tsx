"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Scale, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "../login/supabase";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";

// 🔒 Componente interno que usa useSearchParams
function PagamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const [loading, setLoading] = useState(true);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  useEffect(() => {
    const checkPayment = async () => {
      if (!userId) {
        router.replace("/login");
        return;
      }

      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("user_id", userId)
        .single();

      if (subscription?.status === "active") {
        setAlreadyPaid(true);
        setTimeout(() => router.replace("/gerador"), 2000);
      }
      
      setLoading(false);
    };

    checkPayment();
  }, [userId, router]);

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

  const stripeLink = `https://buy.stripe.com/test_3cIbJ12W71ZUgAofGZeQM00`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F2EFE6" }}>
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: AMBER_BG }}>
          <Scale size={32} style={{ color: SEAL }} />
        </div>
        
        <h1 className="text-2xl font-bold mb-3" style={{ color: INK }}>Complete sua inscrição</h1>
        <p className="text-sm mb-6" style={{ color: INK_SOFT }}>
          Para acessar o gerador de petições, finalize seu pagamento único de R$ 137.
        </p>

        <div className="space-y-3 mb-6 text-left text-sm" style={{ color: INK_SOFT }}>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: "#3F6B4A" }} />
            <span>3 petições completas inclusas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: "#3F6B4A" }} />
            <span>Calculadora de valores</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: "#3F6B4A" }} />
            <span>Checklist de provas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: "#3F6B4A" }} />
            <span>Garantia de 7 dias</span>
          </div>
        </div>

        <a
          href={stripeLink}
          className="w-full inline-flex items-center justify-center gap-2 text-base font-bold px-6 py-4 rounded-lg transition-transform hover:scale-105"
          style={{ backgroundColor: SEAL, color: "#FFF" }}
        >
          Pagar R$ 137 e Acessar <ArrowRight size={18} />
        </a>

        <p className="text-xs mt-4" style={{ color: INK_SOFT }}>
          Pagamento seguro via Stripe. Acesso liberado imediatamente.
        </p>
      </div>
    </div>
  );
}

// 🔒 Componente principal que envolve o conteúdo em Suspense
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