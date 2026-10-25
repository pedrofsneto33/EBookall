"use client";

import { useEffect, useState } from "react";
import { MP } from "../lib/config";

export default function MpAviso() {
  const [dias, setDias] = useState<number | null>(null);

  useEffect(() => {
    const ms = new Date(MP.extincaoISO).getTime() - Date.now();
    const raf = requestAnimationFrame(() => setDias(ms > 0 ? Math.ceil(ms / 86_400_000) : 0));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <a href="#mp" className="block relative z-[60] bg-amber-400/10 border-b border-amber-400/25 text-center text-[12px] sm:text-[13px] text-amber-200 px-4 py-2 hover:bg-amber-400/15 transition-colors">
      <strong className="font-semibold">Atualização jurídica:</strong> a MP 1.394/2026 proibiu as bets em {MP.publicacao}.
      {dias !== null && dias > 0 ? (
        <> As autorizações vencem em ~{dias} {dias === 1 ? "dia" : "dias"} ({MP.extincaoTxt}).</>
      ) : (
        <> As autorizações das operadoras já foram extintas.</>
      )}{" "}
      <span className="underline underline-offset-2">Entenda o que muda para você →</span>
    </a>
  );
}