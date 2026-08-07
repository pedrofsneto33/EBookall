"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Scale, CheckCircle2, ArrowRight, FileText, Shield } from "lucide-react";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const PAPER_LINE = "#E4DFD1";
const SEAL = "#8A6D3B";
const GREEN_BG = "#F0FDF4";
const GREEN_BORDER = "#BBF7D0";

export default function PaginaObrigado() {
  // ✅ Rastrear compra no Plausible
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('Compra Confirmada');
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: PAPER }}>
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border p-8 text-center" style={{ borderColor: PAPER_LINE }}>
        
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: GREEN_BG }}>
          <CheckCircle2 size={36} style={{ color: "#16A34A" }} />
        </div>

        <h1 className="text-3xl font-bold mb-3" style={{ color: INK, fontFamily: "Georgia, serif" }}>
          Pagamento confirmado!
        </h1>
        <p className="text-base mb-6" style={{ color: INK_SOFT }}>
          Seu acesso ao RecuperaJogo foi liberado. Você receberá um e-mail com os detalhes de login em instantes.
        </p>

        <div className="rounded-xl border p-5 mb-6 text-left" style={{ backgroundColor: GREEN_BG, borderColor: GREEN_BORDER }}>
          <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: INK }}>
            <FileText size={18} style={{ color: "#16A34A" }} />
            Próximos passos:
          </h3>
          <ol className="space-y-2 text-sm" style={{ color: INK }}>
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: "#16A34A" }}>1.</span>
              <span>Faça login com o e-mail que você usou na compra.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: "#16A34A" }}>2.</span>
              <span>Escolha o perfil do seu caso (Autoexclusão ou Ludopatia).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: "#16A34A" }}>3.</span>
              <span>Siga o passo a passo e gere sua petição em PDF.</span>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/login"
            className="inline-flex items-center justify-center gap-2 text-base font-bold px-6 py-3 rounded-lg transition-transform hover:scale-105"
            style={{ backgroundColor: SEAL, color: "#FFF" }}
          >
            Acessar o Gerador <ArrowRight size={18} />
          </Link>
          <Link 
            href="/guia"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-3 rounded-lg border transition-colors hover:bg-[#EFEADE]"
            style={{ borderColor: SEAL, color: SEAL }}
          >
            Reler o Guia Gratuito
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t" style={{ borderColor: PAPER_LINE }}>
          <p className="text-xs flex items-center justify-center gap-2" style={{ color: INK_SOFT }}>
            <Shield size={14} />
            Dúvidas? Fale conosco pelo WhatsApp: (86) 98811-7925
          </p>
        </div>
      </div>
    </div>
  );
}