"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, FileText, Shield, Scale, User } from "lucide-react";
import { supabase } from "../login/supabase";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const SEAL = "#8A6D3B";
const GREEN_BG = "#F0FDF4";
const GREEN_BORDER = "#BBF7D0";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";

export default function PaginaObrigado() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Verifica se está logado (mas NÃO redireciona se não estiver)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    };
    checkSession();
  }, []);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#F2EFE6" }}>
      
      {/* Header */}
      <header className="border-b px-4 py-3 flex items-center justify-between shadow-sm" style={{ backgroundColor: PAPER, borderColor: "#E4DFD1" }}>
        <div className="flex items-center gap-2">
          <Scale size={20} style={{ color: SEAL }} />
          <span className="text-lg font-semibold" style={{ color: INK, fontFamily: "Georgia, serif" }}>
            RecuperaJogo
          </span>
        </div>
        {userEmail && (
          <div className="flex items-center gap-2 text-sm" style={{ color: INK_SOFT }}>
            <User size={14} />
            <span>{userEmail}</span>
          </div>
        )}
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-3xl mx-auto px-4 py-16">
        
        {/* Confirmação de Pagamento */}
        <div className="rounded-xl border-2 p-8 text-center mb-8" style={{ borderColor: GREEN_BORDER, backgroundColor: GREEN_BG }}>
          <CheckCircle2 size={64} className="mx-auto mb-4" style={{ color: "#16A34A" }} />
          <h1 className="text-3xl font-bold mb-3" style={{ color: INK, fontFamily: "Georgia, serif" }}>
            Pagamento Confirmado!
          </h1>
          <p className="text-lg" style={{ color: INK_SOFT }}>
            Seu acesso ao RecuperaJogo está liberado.
          </p>
        </div>

        {/* O que fazer agora */}
        <div className="rounded-xl border p-8 mb-8" style={{ backgroundColor: PAPER, borderColor: "#E4DFD1" }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: INK, fontFamily: "Georgia, serif" }}>
            O que fazer agora?
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-lg" style={{ backgroundColor: SEAL, color: "#FFF" }}>
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: INK }}>
                  Acesse o Gerador de Petição
                </h3>
                <p className="text-sm" style={{ color: INK_SOFT }}>
                  Clique no botão abaixo para ir direto ao gerador. Lá você vai montar sua petição passo a passo, com argumentos jurídicos blindados baseados na IN 31/2025 e na Nota Informativa 1864.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-lg" style={{ backgroundColor: SEAL, color: "#FFF" }}>
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: INK }}>
                  Reúna suas provas
                </h3>
                <p className="text-sm" style={{ color: INK_SOFT }}>
                  Antes de começar, tenha em mãos: print da autoexclusão, extrato da casa de apostas, comprovantes de depósito e e-mails do suporte. O gerador vai te guiar no checklist completo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-lg" style={{ backgroundColor: SEAL, color: "#FFF" }}>
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: INK }}>
                  Gere e baixe seu PDF
                </h3>
                <p className="text-sm" style={{ color: INK_SOFT }}>
                  O sistema calcula o valor da causa, insere os argumentos corretos e gera um PDF formatado com cara de petição profissional. É só revisar, assinar e protocolar no JEC.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Principal */}
        <div className="text-center mb-8">
          <button 
            onClick={() => router.push("/gerador")}
            className="inline-flex items-center gap-2 text-base font-medium px-8 py-4 rounded-lg transition-transform hover:scale-105"
            style={{ backgroundColor: SEAL, color: "#FFF" }}
          >
            <FileText size={20} />
            Ir para o Gerador de Petição
            <ArrowRight size={18} />
          </button>
          {!userEmail && (
            <p className="text-xs mt-3" style={{ color: INK_SOFT }}>
              Se você não estiver logado, será redirecionado para a página de login.
            </p>
          )}
        </div>

        {/* Dica Importante */}
        <div className="rounded-lg border p-6" style={{ backgroundColor: AMBER_BG, borderColor: AMBER_BORDER }}>
          <Shield size={24} className="mb-3" style={{ color: SEAL }} />
          <h3 className="text-lg font-semibold mb-2" style={{ color: INK }}>
             Dica importante
          </h3>
          <p className="text-sm" style={{ color: "#5C4A22" }}>
            Seu acesso ao RecuperaJogo é vitalício. Você pode gerar quantas petições precisar. Se tiver qualquer dúvida sobre o processo, releia o e-book "Recuperei Meu Dinheiro das Bets Sozinho" que você recebeu por e-mail — ele explica cada passo em detalhes.
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center" style={{ borderColor: "#E4DFD1", backgroundColor: PAPER }}>
        <p className="text-xs" style={{ color: INK_SOFT }}>
          © {new Date().getFullYear()} RecuperaJogo. Todos os direitos reservados.
        </p>
      </footer>

    </div>
  );
}