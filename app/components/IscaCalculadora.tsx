"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Loader2, ArrowRight } from "lucide-react";

type Step = "form" | "loading" | "result";

export default function IscaCalculadora() {
  const [step, setStep] = useState<Step>("form");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [depositos, setDepositos] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const valor = useMemo(() => {
    const n = Number(String(depositos).replace(/\./g, "").replace(",", "."));
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [depositos]);

  const estimado = useMemo(() => {
    if (valor <= 0) return 0;
    return Math.round(valor * 1.2);
  }, [valor]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!nome.trim() || !email.trim()) {
      setError("Nome e e-mail são obrigatórios.");
      return;
    }
    if (!consent) {
      setError("Marque o consentimento LGPD para continuar.");
      return;
    }
    if (valor <= 0) {
      setError("Informe o total aproximado depositado.");
      return;
    }
    setStep("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim() || null,
          origem: "calculadora",
          consentimento: true,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Falha ao salvar");
      }
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar");
      setStep("form");
    }
  }

  if (step === "result") {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 md:p-6">
        <p className="text-[11px] uppercase tracking-wider text-emerald-400 mb-2">Estimativa ilustrativa</p>
        <p className="text-2xl font-black text-white mb-1">
          R$ {estimado.toLocaleString("pt-BR")}
        </p>
        <p className="text-sm text-white/55 mb-4 leading-relaxed">
          Ordem de grandeza a partir do que você informou (depósitos ≈ R${" "}
          {valor.toLocaleString("pt-BR")}). Não é valor de sentença nem garantia.
          O juiz decide com base na prova.
        </p>
        <Link
          href="/login"
          className="btn-press inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400"
        >
          Gerar minha petição · R$ 137
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 md:p-6 backdrop-blur">
      <div className="flex items-center gap-2 mb-3">
        <Calculator size={18} className="text-emerald-400" />
        <p className="text-sm font-semibold text-white">Calculadora grátis</p>
      </div>
      <p className="text-xs text-white/45 mb-4 leading-relaxed">
        Informe o total aproximado depositado. O resultado aparece depois do cadastro
        (nome, e-mail e WhatsApp).
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/50 outline-none"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/50 outline-none"
          required
        />
        <input
          type="tel"
          placeholder="WhatsApp (opcional)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/50 outline-none"
        />
        <input
          type="text"
          inputMode="decimal"
          placeholder="Total depositado (ex: 5000)"
          value={depositos}
          onChange={(e) => setDepositos(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/50 outline-none"
          required
        />
        <label className="flex items-start gap-2 text-[11px] text-white/45 leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded border-white/20"
          />
          <span>
            Concordo com o uso dos meus dados para contato sobre o RecuperaJogo, conforme a{" "}
            <a href="/politica-privacidade" className="text-emerald-400 underline underline-offset-2">
              Política de Privacidade
            </a>
            .
          </span>
        </label>
        {error && <p className="text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={step === "loading"}
          className="btn-press w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 disabled:opacity-70"
        >
          {step === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Calculando…
            </>
          ) : (
            "Ver estimativa grátis"
          )}
        </button>
      </form>
    </div>
  );
}
