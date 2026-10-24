"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle, Calculator, Download, ChevronRight, Scale,
  AlertCircle, Heart, Lock, Loader2, Trophy, Ban, Gift, Megaphone,
} from "lucide-react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { LIMITE_JUS_POSTULANDI, formatarMoeda, PERFIS, PERFIL_LABEL } from "../lib/config";
import type { Perfil } from "../lib/config";
import { argumentosDoPerfil, condicionaisDoPerfil, provasDoPerfil } from "../lib/argumentos-meta";
import type { ArgumentoMeta } from "../lib/argumentos-meta";
import { trackEvent } from "../lib/analytics";
import { getSession } from "../lib/auth";

async function authFetch(url: string, init: RequestInit = {}) {
  return fetch(url, { ...init, credentials: "include" });
}


const pdfStyles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Times-Roman", fontSize: 12, lineHeight: 1.5 },
  header: { textAlign: "center", marginBottom: 20, fontSize: 12, fontWeight: "bold", textTransform: "uppercase" },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginTop: 15, marginBottom: 8, textTransform: "uppercase" },
  paragraph: { textAlign: "justify", marginBottom: 10, textIndent: 25 },
  noIndent: { textAlign: "justify", marginBottom: 10 },
  footer: { marginTop: 40, textAlign: "center" },
});

const PeticaoPDF = ({ texto }: { texto: string }) => {
  const blocos = texto.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {blocos.map((b, i) => {
          if (/^[IVX]+\s*[—–-]\s/.test(b)) return <Text key={i} style={pdfStyles.sectionTitle}>{b}</Text>;
          if (b.startsWith("EXCELENT") || b.startsWith("AO JUÍZO") || b.startsWith("AO JUIZO")) return <Text key={i} style={pdfStyles.header}>{b}</Text>;
          if (b.startsWith("Nestes termos") || b.startsWith("Dá-se à causa") || b.startsWith("Da-se a causa")) return <Text key={i} style={pdfStyles.footer}>{b}</Text>;
          return <Text key={i} style={pdfStyles.paragraph}>{b}</Text>;
        })}
      </Page>
    </Document>
  );
};
const INK = "#0F1C2E";
const SOFT = "#4A5B6E";
const PAPER = "#FAF8F4";
const LINE = "#E6E1D6";
const SEAL = "#1B6B4A";
const MAX_PETICOES = 3;

// PERFIS, PERFIL_LABEL e Perfil agora vêm de ../lib/config.ts

function Field({ label, value, onChange, full }: { label: string; value: string; onChange: (v: string) => void; full?: boolean }) {
  return (
    <label className={`text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="block mb-1 font-medium text-white/60">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
      />
    </label>
  );
}

export default function GeradorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [peticoesUsadas, setPeticoesUsadas] = useState(0);
  const [usadas, setUsadas] = useState(0);
  const [casoToken, setCasoToken] = useState("");
  const [avisos, setAvisos] = useState<string[]>([]);
  const [limitReached, setLimitReached] = useState(false);
  const [tab, setTab] = useState("perfil");
  const [ack, setAck] = useState(false);
  const [perfil, setPerfil] = useState<Perfil>("autoexclusao");
  const [argsSel, setArgsSel] = useState<string[]>([]);
  const [valorPerdido, setValorPerdido] = useState("");
  const [dataFato, setDataFato] = useState("");
  const [dataAuto, setDataAuto] = useState("");
  const [dobro, setDobro] = useState(false);
  const [danoMoral, setDanoMoral] = useState(true);
  const [valorDM, setValorDM] = useState("3000");
  const [valorBonus, setValorBonus] = useState("");
  const [valorRollover, setValorRollover] = useState("");
  const [autor, setAutor] = useState({ nome: "", cpf: "", endereco: "", comarca: "", uf: "" });
  const [reu, setReu] = useState({ nome: "", cnpj: "" });
  const [relato, setRelato] = useState("");
  const [texto, setTexto] = useState("");
  const [dadosPDF, setDadosPDF] = useState<any>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/auth/me", { credentials: "include" });
        if (r.ok) {
          const d = await r.json();
          if (d?.status === "pending") { router.replace("/pagamento"); return; }
          if (d?.email || d?.user?.email) setUserEmail(d.email || d.user?.email);
          const used = Number(d?.peticoes_usadas) || 0;
          setPeticoesUsadas(used);
          setLimitReached(used >= MAX_PETICOES);
        }
      } catch {}
      setLoading(false);
    })();
  }, [router]);

  const calc = useMemo(() => {
    const base = parseFloat(valorPerdido) || 0;
    const comDobro = dobro ? base * 2 : base;
    const dm = danoMoral ? parseFloat(valorDM) || 0 : 0;
    return { base, comDobro, total: comDobro + dm };
  }, [valorPerdido, dobro, danoMoral, valorDM]);

  const fmt = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const acimaLimiteJEC = calc.total > LIMITE_JUS_POSTULANDI;
  const disponiveis = argumentosDoPerfil(perfil);
  const restantes = Math.max(0, MAX_PETICOES - peticoesUsadas);

  async function gerar() {
    trackEvent('Peticao_Gerada');
    if (limitReached || peticoesUsadas >= MAX_PETICOES) { alert("Você já usou as 3 petições do seu acesso."); return; }
    if (acimaLimiteJEC) { alert(`Atenção: valor da causa acima de ${formatarMoeda(LIMITE_JUS_POSTULANDI)}.`); return; }
    if (argsSel.length === 0) return alert("Selecione argumentos.");
    if (relato.trim().length < 40) return alert("Relato curto demais.");
    if (!autor.nome || !reu.nome) return alert("Preencha autor e casa ré.");
    setGenerating(true);
    try {
      const res = await authFetch("/api/peticao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          perfil,
          autor,
          reu,
          relato,
          dataFato,
          dataAutoexclusao: dataAuto,
          valorPerdido,
          valorDevolvido: "0",
          dobro,
          danoMoral,
          valorDanoMoral: valorDM,
          argumentos: argsSel,
          condicionais: [],
          provas: [],
          tentativaChat: false,
          tentativaConsumidorGov: false,
          pedirExibicao: false,
          caso_token: casoToken,
        }),
      });
      const data = await res.json();
      if (res.status === 401) return router.replace("/login?redirect=/gerador");
      if (res.status === 402) return router.replace("/pagamento");
      if (!res.ok) return alert(data.error || "Erro ao gerar");
      setTexto(data.texto);
      setUsadas(data.usadas);
      setCasoToken(data.caso_token || "");
      setAvisos(data.avisos ?? []);
      setTab("resultado");
    } catch (e) {
      console.error(e);
      alert("Erro ao gerar. Tente de novo.");
    } finally {
      setGenerating(false);
    }
  }
  async function baixar() {
    if (!texto) return;
    const blob = await pdf(<PeticaoPDF texto={texto} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `peticao-recuperajogo-${Date.now()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05080C]">
        <Loader2 className="animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080C] text-white relative">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
      <header className="border-b px-4 py-3 flex justify-between items-center bg-white/5 backdrop-blur-lg border-white/10">
        <div>
          <p className="text-sm font-bold text-white">Gerador · peça da causa da pessoa</p>
          {userEmail && <p className="text-[10px] text-white/60">{userEmail}</p>}
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${limitReached ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-white/5 text-white/60 border-white/10"}`}
          >
            {peticoesUsadas}/{MAX_PETICOES} petições
          </span>
          <Link href="/minhas-peticoes" className="text-xs text-white/60 hover:text-white">Meu Histórico</Link>
          <button type="button" onClick={() => router.push("/")} className="text-xs text-white/60 hover:text-white">Início</button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {limitReached && (
          <div className="flex gap-2 items-start border rounded-lg px-4 py-3 mb-6 bg-red-500/10 border-red-500/20">
            <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-400" />
            <p className="text-sm text-red-400">
              <strong>Limite atingido.</strong> Você já gerou as {MAX_PETICOES} petições inclusas no acesso.
              Baixe as que já tem; para novas peças é preciso novo acesso.
            </p>
          </div>
        )}

        <div className="flex gap-2 items-start border rounded-lg px-4 py-3 mb-6 bg-amber-500/10 border-amber-500/20">
          <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-400" />
          <p className="text-sm text-amber-400">
            <strong>Não é advocacia.</strong> Rascunho para jus postulandi. Até {MAX_PETICOES} petições no acesso.
            Restam <strong>{restantes}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["perfil", "dados", "argumentos", "resultado"].map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                tab === id
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "text-white/60 border-white/10 hover:text-white hover:bg-white/5"
              }`}
            >
              {i + 1}. {id}
            </button>
          ))}
        </div>

        {tab === "perfil" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
            <h2 className="font-semibold mb-3 text-white">Qual é a causa desta pessoa?</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {(Object.keys(PERFIL_LABEL) as Perfil[]).map((id) => {
                const { titulo, desc } = PERFIL_LABEL[id];
                return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPerfil(id)}
                  className={`text-left flex gap-3 p-4 rounded-xl border transition-colors ${
                    perfil === id
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-white">{titulo}</p>
                    <p className="text-xs text-white/60">{desc}</p>
                  </div>
                </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setTab("dados")}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors"
            >
              Continuar <ChevronRight size={16} />
            </button>
          </div>
        )}

        {tab === "dados" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3 shadow-xl">
            <h2 className="font-semibold text-white">Dados da pessoa e da casa</h2>
            <p className="text-xs text-white/60 mb-2">Limite sem advogado hoje: {formatarMoeda(LIMITE_JUS_POSTULANDI)}</p>
            {acimaLimiteJEC && (
              <div className="flex gap-2 items-start border rounded-lg px-4 py-3 mb-3 bg-red-500/10 border-red-500/20">
                <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-400" />
                <p className="text-sm text-red-400">
                  Atenção: O valor da causa ultrapassou o limite de {formatarMoeda(LIMITE_JUS_POSTULANDI)}. Para causas acima disso, você precisará de um advogado ou da Defensoria Pública.
                </p>
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Nome do autor" value={autor.nome} onChange={(v) => setAutor({ ...autor, nome: v })} />
              <Field label="CPF" value={autor.cpf} onChange={(v) => setAutor({ ...autor, cpf: v })} />
              <Field label="Endereço" value={autor.endereco} onChange={(v) => setAutor({ ...autor, endereco: v })} full />
              <Field label="Comarca" value={autor.comarca} onChange={(v) => setAutor({ ...autor, comarca: v })} />
              <Field label="UF" value={autor.uf} onChange={(v) => setAutor({ ...autor, uf: v })} />
              <Field label="Casa ré" value={reu.nome} onChange={(v) => setReu({ ...reu, nome: v })} />
              <Field label="CNPJ ré" value={reu.cnpj} onChange={(v) => setReu({ ...reu, cnpj: v })} />
              <Field label="Data autoexclusão" value={dataAuto} onChange={setDataAuto} />
              <Field label={perfil === "conta_bloqueada" ? "Data do bloqueio" : perfil === "premio_nao_pago" ? "Data da recusa" : "Data do fato"} value={dataFato} onChange={setDataFato} />
              <Field label="Valor material R$" value={valorPerdido} onChange={setValorPerdido} />
              {perfil === "bonus_rollover" && (
                <>
                  <Field label="Valor do bônus R$" value={valorBonus} onChange={setValorBonus} />
                  <Field label="Valor exigido no rollover R$" value={valorRollover} onChange={setValorRollover} />
                </>
              )}
              <Field label="Dano moral sugerido R$" value={valorDM} onChange={setValorDM} />
            </div>
            <label className="flex gap-2 text-sm text-white"><input type="checkbox" checked={dobro} onChange={(e) => setDobro(e.target.checked)} className="accent-emerald-500" /> Dobro (CDC art. 42)</label>
            <label className="flex gap-2 text-sm text-white"><input type="checkbox" checked={danoMoral} onChange={(e) => setDanoMoral(e.target.checked)} className="accent-emerald-500" /> Danos morais</label>
            <label className="block text-sm text-white">
              <span className="block mb-1 font-medium text-white/60">Relato dos fatos desta pessoa (obrigatório)</span>
              <textarea
                value={relato}
                onChange={(e) => setRelato(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 rounded-lg border bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm"
                placeholder="Datas, o que pediu, o que a casa fez, valores..."
              />
            </label>
            <button
              type="button"
              onClick={() => setTab("argumentos")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors"
            >
              Continuar <ChevronRight size={16} />
            </button>
          </div>
        )}

        {tab === "argumentos" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2 shadow-xl">
            <h2 className="font-semibold mb-2 text-white">Argumentos deste tipo</h2>
            <p className="text-xs mb-3 text-white/60">O texto inclui o nome da ré, datas e valor informados. Cada geração consome 1 das {MAX_PETICOES} petições.</p>
            {disponiveis.map((a: ArgumentoMeta) => (
              <label
                key={a.id}
                className={`flex gap-3 text-sm p-3 rounded-lg border cursor-pointer transition-colors ${
                  argsSel.includes(a.id)
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <input
                  type="checkbox"
                  checked={argsSel.includes(a.id)}
                  onChange={() => setArgsSel((p) => (p.includes(a.id) ? p.filter((x) => x !== a.id) : [...p, a.id]))}
                  className="accent-emerald-500"
                />
                <div>
                  <p className="font-medium text-white">{a.label}</p>
                  {a.dica && <p className="text-xs text-white/60">{a.dica}</p>}
                </div>
              </label>
            ))}
            <label className="flex gap-2 text-sm mt-3 text-white">
              <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} className="accent-emerald-500" /> Li o aviso e vou revisar antes de protocolar
            </label>
            <button
              type="button"
              disabled={!ack || limitReached || generating || acimaLimiteJEC}
              onClick={gerar}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {generating ? "Gerando…" : limitReached ? "Limite de 3 atingido" : `Gerar petição (${restantes} restantes)`}
              <Scale size={16} />
            </button>
          </div>
        )}

        {tab === "resultado" && texto && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3 shadow-xl">
            <h2 className="font-semibold text-white">Rascunho — revise</h2>
            <p className="text-xs text-white/60">Usadas: {peticoesUsadas}/{MAX_PETICOES}. Baixe o PDF agora; a cota já foi consumida.</p>
            <pre className="text-xs whitespace-pre-wrap p-4 rounded-lg border max-h-[420px] overflow-auto bg-[#0d1117] border-white/10 text-gray-300 font-mono leading-relaxed">{texto}</pre>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={baixar}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors"
              >
                <Download size={16} /> PDF
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(texto)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                Copiar
              </button>
              {!limitReached && (
                <button
                  type="button"
                  onClick={() => { setTab("perfil"); setTexto(""); setDadosPDF(null); setArgsSel([]); }}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  Nova ({restantes} restantes)
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
