"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Users, DollarSign, Link2 } from "lucide-react";

type Referral = {
  id: string;
  affiliateCode: string;
  buyerEmail: string;
  status: string;
  comissaoValor: number | null;
  createdAt: string;
};

function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return email;
  const [local, domain] = email.split("@");
  if (local.length <= 1) return `${local}***@${domain}`;
  return `${local[0]}***@${domain}`;
}

export default function AfiliadosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notAffiliate, setNotAffiliate] = useState(false);
  const [code, setCode] = useState("");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/affiliates/me");
        if (res.status === 401) {
          router.replace("/login?redirect=/afiliados");
          return;
        }
        if (res.status === 404) {
          setNotAffiliate(true);
          return;
        }
        if (!res.ok) {
          setNotAffiliate(true);
          return;
        }
        const data = await res.json();
        setCode(data.code ?? "");
        setReferrals(data.referrals ?? []);
      } catch {
        setNotAffiliate(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const link = `https://recuperajogo.vercel.app/?ref=${code}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const pendingTotal = referrals
    .filter((r) => r.status === "pendente")
    .reduce((sum, r) => sum + (r.comissaoValor ?? 27.4), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05080C] text-white flex items-center justify-center">
        <p className="text-white/60">Carregando...</p>
      </div>
    );
  }

  if (notAffiliate) {
    return (
      <div className="min-h-screen bg-[#05080C] text-white">
        <main className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-black mb-4">Programa de Afiliados</h1>
          <p className="text-white/60">
            Você ainda não é um afiliado. Fale com o suporte para fazer parte.
          </p>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#05080C] text-white">
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-black mb-2">Programa de Afiliados</h1>
          <p className="text-white/60">
            Ganhe <span className="text-emerald-400 font-semibold">20%</span> de comissão
            (R$ 27,40) por cada venda realizada através do seu link exclusivo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
              <DollarSign className="w-4 h-4" /> Total a Receber
            </div>
            <p className="text-2xl font-black text-emerald-400">
              R$ {pendingTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
              <Users className="w-4 h-4" /> Indicações
            </div>
            <p className="text-2xl font-black text-white">{referrals.length}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2 text-white/60 text-xs mb-3">
            <Link2 className="w-4 h-4" /> Seu Link de Indicação
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              readOnly
              value={link}
              className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/80"
            />
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado!" : "Copiar Link"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Suas Indicações</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/60 border-b border-white/10">
                  <th className="px-6 py-3 font-medium">Cliente</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Comissão</th>
                  <th className="px-6 py-3 font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((r) => (
                  <tr key={r.id} className="border-b border-white/5">
                    <td className="px-6 py-3 text-white">{maskEmail(r.buyerEmail)}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                          r.status === "pago"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {r.status === "pago" ? "Pago" : "Pendente"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-emerald-400 font-semibold">R$ 27,40</td>
                    <td className="px-6 py-3 text-white/60">{r.createdAt}</td>
                  </tr>
                ))}
                {referrals.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-white/40">
                      Nenhuma indicação ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

