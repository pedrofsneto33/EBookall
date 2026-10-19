"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, FileText, Shield, Loader2 } from "lucide-react";
import { supabase } from "../login/supabase";

const INK = "#0F1C2E";
const INK_SOFT = "#4A5B6E";
const LINE = "#E6E1D6";
const SEAL = "#1B6B4A";
const GREEN_BG = "#E8F5EF";
const GREEN_BORDER = "#B9CFC0";
const MUTED_BG = "#F3F0E9";

export default function PaginaObrigado() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("Compra Confirmada");
    }

    let cancelled = false;
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          if (!cancelled) setChecking(false);
          return;
        }
        for (let i = 0; i < 8; i++) {
          const { data: sub } = await supabase
            .from("subscriptions")
            .select("status")
            .eq("user_id", session.user.id)
            .maybeSingle();
          if (sub?.status === "active") {
            router.replace("/gerador");
            return;
          }
          await new Promise((r) => setTimeout(r, 1000));
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => { cancelled = true; };
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: MUTED_BG }}>
        <div className="text-center max-w-sm">
          <Loader2 size={36} className="mx-auto mb-4 animate-spin" style={{ color: SEAL }} />
          <p className="text-sm font-medium" style={{ color: INK }}>Confirmando pagamento e liberando acesso...</p>
          <p className="text-xs mt-2" style={{ color: INK_SOFT }}>Isso leva poucos segundos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: MUTED_BG }}>
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-sm border p-8 text-center" style={{ borderColor: LINE }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: GREEN_BG }}>
          <CheckCircle2 size={32} style={{ color: SEAL }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: INK }}>Pagamento confirmado</h1>
        <p className="text-sm mb-6" style={{ color: INK_SOFT }}>
          Seu acesso foi liberado. Entre e gere suas petições agora.
        </p>
        <div className="rounded-xl border p-5 mb-6 text-left" style={{ backgroundColor: GREEN_BG, borderColor: GREEN_BORDER }}>
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm" style={{ color: INK }}>
            <FileText size={16} style={{ color: SEAL }} /> Próximos passos
          </h3>
          <ol className="space-y-2 text-sm" style={{ color: INK_SOFT }}>
            <li className="flex items-start gap-2"><span className="font-bold" style={{ color: SEAL }}>1.</span><span>Faça login com o e-mail da compra.</span></li>
            <li className="flex items-start gap-2"><span className="font-bold" style={{ color: SEAL }}>2.</span><span>Escolha o tipo de caso no gerador.</span></li>
            <li className="flex items-start gap-2"><span className="font-bold" style={{ color: SEAL }}>3.</span><span>Baixe o PDF e protocole no Juizado.</span></li>
          </ol>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login?redirect=/gerador" className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3 rounded-xl text-white" style={{ backgroundColor: SEAL }}>
            Entrar no gerador <ArrowRight size={18} />
          </Link>
          <Link href="/guia" className="inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-3 rounded-xl border" style={{ borderColor: LINE, color: INK }}>
            Ver o guia
          </Link>
        </div>
        <div className="mt-8 pt-5 border-t" style={{ borderColor: LINE }}>
          <p className="text-xs flex items-center justify-center gap-2" style={{ color: INK_SOFT }}>
            <Shield size={14} style={{ color: SEAL }} /> Dúvidas? WhatsApp (86) 98811-7925
          </p>
        </div>
      </div>
    </div>
  );
}
