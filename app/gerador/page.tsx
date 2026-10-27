"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle, Download, ChevronRight, Loader2
} from "lucide-react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { LIMITE_JUS_POSTULANDI, formatarMoeda, PERFIL_LABEL } from "../lib/config";
import type { Perfil } from "../lib/config";
import { argumentosDoPerfil } from "../lib/argumentos-meta";
import type { ArgumentoMeta } from "../lib/argumentos-meta";
import { trackEvent } from "../lib/analytics";
import { toast } from "sonner";

async function authFetch(url: string, init: RequestInit = {}) {
  return fetch(url, { ...init, credentials: "include" });
}

const pdfStyles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Times-Roman", fontSize: 12, lineHeight: 1.5 },
  header: { textAlign: "center", marginBottom: 20, fontSize: 12, fontWeight: "bold", textTransform: "uppercase" },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginTop: 15, marginBottom: 8, textTransform: "uppercase" },
  paragraph: { textAlign: "justify", marginBottom: 10, textIndent: 25 },
  footer: { marginTop: 40, textAlign: "center" },
  signatureView: { marginTop: 50, alignItems: "center", justifyContent: "center" },
  signatureText: { textAlign: "center" },
});

const PeticaoPDF = ({ texto }: { texto: string }) => {
  const blocos = texto.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {blocos.map((b, i) => {
          if (b.startsWith("[[CENTRO]]")) {
            return <Text key={i} style={pdfStyles.header}>{b.replace("[[CENTRO]]", "")}</Text>;
          }
          if (b.startsWith("[[ASSINATURA]]")) {
            const linhas = b.replace("[[ASSINATURA]]", "").split("\n");
            return (
              <View key={i} style={pdfStyles.signatureView}>
                {linhas.map((l, j) => (
                  <Text key={j} style={pdfStyles.signatureText}>{l}</Text>
                ))}
              </View>
            );
          }
          if (/^[IVX]+\s*[—–-]\s/.test(b)) return <Text key={i} style={pdfStyles.sectionTitle}>{b}</Text>;
          if (b.startsWith("Nestes termos") || b.startsWith("Dá-se à causa") || b.startsWith("Da-se a causa")) {
            return <Text key={i} style={pdfStyles.footer}>{b}</Text>;
          }
          return <Text key={i} style={pdfStyles.paragraph}>{b}</Text>;
        })}
      </Page>
    </Document>
  );
};

const MAX_PETICOES = 3;

function Field({ label, value, onChange, full, type = "text", placeholder, hint }: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void; 
  full?: boolean; 
  type?: string; 
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className={`text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="block mb-1 font-medium text-white/60">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border bg-black/40 border-white/10 text-base text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none [color-scheme:dark]"
      />
      {hint && <span className="block text-xs mt-1 text-white/40">{hint}</span>}
    </label>
  );
}

export default function GeradorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  const [usadas, setUsadas] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [casoToken, setCasoToken] = useState("");
  const [avisos, setAvisos] = useState<string[]>([]);
  
  const [tab, setTab] = useState("perfil");
  const [ack, setAck] = useState(false);
  const [perfil, setPerfil] = useState<Perfil>("autoexclusao");
  const [argsSel, setArgsSel] = useState<string[]>([]);
  
  const [valorPerdido, setValorPerdido] = useState("");
  const [valorDevolvido, setValorDevolvido] = useState("");
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
          setUsadas(used);
          setLimitReached(used >= MAX_PETICOES);
        }
      } catch {}
      setLoading(false);
    })();
  }, [router]);

  const calc = useMemo(() => {
    const base = parseFloat(valorPerdido) || 0;
    const devolvido = parseFloat(valorDevolvido) || 0;
    const comDobro = dobro ? base * 2 : base;
    const dm = danoMoral ? parseFloat(valorDM) || 0 : 0;
    const restituicao = Math.max(0, comDobro - devolvido);
    return { base, comDobro, dm, restituicao, total: restituicao + dm };
  }, [valorPerdido, valorDevolvido, dobro, danoMoral, valorDM]);

  const acimaLimiteJEC = calc.total > LIMITE_JUS_POSTULANDI;
  const disponiveis = argumentosDoPerfil(perfil);
  const restantes = Math.max(0, MAX_PETICOES - usadas);

  async function gerar() {
    trackEvent('Peticao_Gerada');
    if (limitReached || usadas >= MAX_PETICOES) { toast.error("Você já usou as 3 petições do seu acesso."); return; }
    if (acimaLimiteJEC) { toast.error(`Atenção: valor da causa acima de ${formatarMoeda(LIMITE_JUS_POSTULANDI)}.`); return; }
    if (argsSel.length === 0) return toast.error("Selecione ao menos um argumento.");
    if (relato.trim().length < 60) return toast.error("O relato está curto demais. Conte com detalhes (mínimo 60 caracteres).");
    if (!autor.nome || !reu.nome) return toast.error("Preencha o nome do autor e da casa ré.");
    if (!dataFato) return toast.error("Preencha a data do fato.");
    
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
          dataAutoexclusao: dataAuto || dataFato,
          valorPerdido,
          valorDevolvido: valorDevolvido || "0",
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
          valorBonus,
          valorRollover
        }),
      });
      
      const data = await res.json();
      
      if (res.status === 401) return router.replace("/login?redirect=/gerador");
      if (res.status === 402) return router.replace("/pagamento");
      
      if (!res.ok) {
        if (Array.isArray(data.erros) && data.erros.length > 0) {
          toast.error("Atenção, corrija os seguintes pontos:\n\n• " + data.erros.join("\n• "));
        } else {
          toast.error(data.error || "Erro ao gerar petição.");
        }
        return;
      }
      
      setTexto(data.texto);
      setUsadas(data.usadas);
      setLimitReached(data.usadas >= MAX_PETICOES);
      setCasoToken(data.caso_token || "");
      setAvisos(data.avisos ?? []);
      setTab("resultado");
    } catch (e) {
      console.error(e);
      toast.error("Erro ao gerar. Tente de novo.");
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

  function copiarTexto() {
    const textoLimpo = texto.replace(/\[\[(CENTRO|ASSINATURA)\]\]/g, "");
    navigator.clipboard.writeText(textoLimpo);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05080C]">
        <Loader2 className="animate-spin text-emerald-400" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080C] text-white relative pb-12 overflow-x-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
      
      <header className="border-b px-4 py-3 flex justify-between items-center bg-white/5 backdrop-blur-lg border-white/10 sticky top-0 z-10">
        <div>
          <p className="text-sm font-bold text-white">Gerador de Petição</p>
          {userEmail && <p className="hidden sm:block text-[10px] text-white/60">{userEmail}</p>}
        </div>
        <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap pb-1">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${limitReached ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-white/5 text-white/60 border-white/10"}`}>
            {usadas}/{MAX_PETICOES} petições
          </span>
          <Link href="/minhas-peticoes" className="text-xs text-white/60 hover:text-white transition-colors">Meu Histórico</Link>
          <button type="button" onClick={() => router.push("/")} className="text-xs text-white/60 hover:text-white transition-colors">Início</button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 relative z-10 w-full">
        {/* O aviso amarelo grandão foi REMOVIDO daqui. */}
        
        {limitReached && (
          <div className="flex gap-2 items-start border rounded-lg px-4 py-3 mb-6 bg-red-500/10 border-red-500/20">
            <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-400" />
            <p className="text-sm text-red-400">
              <strong>Limite atingido.</strong> Você já gerou as {MAX_PETICOES} petições inclusas no acesso.
              Baixe as que já tem; para novas peças é preciso novo acesso.
            </p>
          </div>
        )}

        <div className="flex overflow-x-auto whitespace-nowrap gap-2 mb-6 pb-2 px-4 sm:mx-0 sm:px-0">
          {["perfil", "dados", "argumentos", "resultado"].map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                tab === id
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "text-white/60 border-white/10 hover:text-white hover:bg-white/5"
              }`}
            >
              {i + 1}. {id.charAt(0).toUpperCase() + id.slice(1)}
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
                    className={`text-left flex gap-3 p-4 rounded-xl border transition-colors w-full ${
                      perfil === id
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{titulo}</p>
                      <p className="text-xs text-white/60 break-words">{desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {perfil === "bonus_rollover" && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm leading-relaxed mt-4">
                <strong>Atenção:</strong> O rollover é uma cláusula que você aceitou ao ativar a promoção. A tese de nulidade é difícil e depende do juiz considerar a cláusula abusiva. A chance de sucesso é menor. Siga apenas se o valor for alto.
              </div>
            )}
            {perfil === "publicidade_enganosa" && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm leading-relaxed mt-4">
                <strong>Atenção:</strong> Para publicidade enganosa, o juiz exigirá prova de que a propaganda te induziu ao erro e causou o seu prejuízo. Sem print da propaganda e do comprovante da aposta, a tese pode cair.
              </div>
            )}
            {perfil === "conta_bloqueada" && (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm leading-relaxed mt-4">
                <strong>Lembrete importante:</strong> A casa de apostas pode vencer o processo se provar que você violou os termos de uso (ex: múltiplas contas, fraude). Reúna todas as provas possíveis de que seu bloqueio foi indevido.
              </div>
            )}

            <button
              type="button"
              onClick={() => setTab("dados")}
              className="mt-4 inline-flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors"
            >
              Continuar <ChevronRight size={16} />
            </button>
          </div>
        )}

        {tab === "dados" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4 shadow-xl">
            <h2 className="font-semibold text-white">Dados da pessoa e da casa</h2>
            <p className="text-xs text-white/60">Limite sem advogado hoje: {formatarMoeda(LIMITE_JUS_POSTULANDI)}</p>
            
            {acimaLimiteJEC && (
              <div className="flex gap-2 items-start border rounded-lg px-4 py-3 bg-red-500/10 border-red-500/20">
                <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-400" />
                <p className="text-sm text-red-400">
                  Atenção: O valor da causa ultrapassou o limite de {formatarMoeda(LIMITE_JUS_POSTULANDI)}. Para causas acima disso, você precisará de um advogado ou da Defensoria Pública.
                </p>
              </div>
            )}
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nome do autor" value={autor.nome} onChange={(v) => setAutor({ ...autor, nome: v })} placeholder="Nome completo" />
              <Field label="CPF" value={autor.cpf} onChange={(v) => setAutor({ ...autor, cpf: v })} placeholder="000.000.000-00" />
              <Field label="Endereço" value={autor.endereco} onChange={(v) => setAutor({ ...autor, endereco: v })} full placeholder="Rua, número, bairro, CEP, cidade" />
              <Field label="Comarca" value={autor.comarca} onChange={(v) => setAutor({ ...autor, comarca: v })} placeholder="Ex: Teresina" />
              <Field label="UF" value={autor.uf} onChange={(v) => setAutor({ ...autor, uf: v })} placeholder="Ex: PI" />
              
              <Field label="Casa ré" value={reu.nome} onChange={(v) => setReu({ ...reu, nome: v })} placeholder="Nome da casa de apostas" />
              <Field label="CNPJ ré" value={reu.cnpj} onChange={(v) => setReu({ ...reu, cnpj: v })} placeholder="00.000.000/0000-00" />
              
              {perfil === "autoexclusao" && (
                <Field label="Data da autoexclusão" type="date" value={dataAuto} onChange={setDataAuto} />
              )}
              
              <Field 
                label={perfil === "conta_bloqueada" ? "Data do bloqueio" : perfil === "premio_nao_pago" ? "Data da recusa" : "Data do fato"} 
                type="date" 
                value={dataFato} 
                onChange={setDataFato} 
              />
              
              <Field label="Valor material R$" type="number" value={valorPerdido} onChange={setValorPerdido} placeholder="Ex: 8000" />
              
              <Field label="Já devolvido pela casa R$" type="number" value={valorDevolvido} onChange={setValorDevolvido} placeholder="Ex: 0" hint="Se a casa já devolveu algo, abatemos do pedido." />

              <Field label="Dano moral sugerido R$" type="number" value={valorDM} onChange={setValorDM} />
              
              {perfil === "bonus_rollover" && (
                <>
                  <Field label="Valor do bônus R$" type="number" value={valorBonus} onChange={setValorBonus} placeholder="Ex: 4000" />
                  <Field label="Valor exigido no rollover R$" type="number" value={valorRollover} onChange={setValorRollover} placeholder="Ex: 12000" />
                </>
              )}
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <label className="flex items-center gap-3 text-sm text-white cursor-pointer p-2 -m-2">
                <input type="checkbox" checked={dobro} onChange={(e) => setDobro(e.target.checked)} className="accent-emerald-500 w-5 h-5" /> 
                Pedir restituição em dobro (CDC art. 42)
              </label>
              <label className="flex items-center gap-3 text-sm text-white cursor-pointer p-2 -m-2">
                <input type="checkbox" checked={danoMoral} onChange={(e) => setDanoMoral(e.target.checked)} className="accent-emerald-500 w-5 h-5" /> 
                Incluir pedido de danos morais
              </label>
            </div>
            
            <label className="block text-sm text-white pt-2">
              <span className="block mb-1 font-medium text-white/60">Relato dos fatos desta pessoa (obrigatório)</span>
              <textarea
                value={relato}
                onChange={(e) => setRelato(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 rounded-lg border bg-black/40 border-white/10 text-base text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                placeholder="Conte em ordem: quando abriu a conta, o que a casa fez, valores e datas. Mínimo 60 caracteres."
              />
              <span className="block text-xs mt-1 text-white/40">{relato.length} caracteres</span>
            </label>
            
            <button
              type="button"
              onClick={() => setTab("argumentos")}
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors mt-2"
            >
              Continuar <ChevronRight size={16} />
            </button>
          </div>
        )}

        {tab === "argumentos" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3 shadow-xl">
            <h2 className="font-semibold mb-2 text-white">Argumentos deste tipo</h2>
            <p className="text-xs mb-3 text-white/60">O texto incluirá o nome da ré, datas e valores informados. Cada geração consome 1 das {MAX_PETICOES} petições.</p>
            
            {disponiveis.map((a: ArgumentoMeta) => (
              <label
                key={a.id}
                className={`flex gap-3 text-sm p-4 rounded-xl border cursor-pointer transition-colors ${
                  argsSel.includes(a.id)
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <input
                  type="checkbox"
                  checked={argsSel.includes(a.id)}
                  onChange={() => setArgsSel((p) => (p.includes(a.id) ? p.filter((x) => x !== a.id) : [...p, a.id]))}
                  className="accent-emerald-500 mt-0.5 w-5 h-5 shrink-0"
                />
                <div>
                  <p className="font-medium text-white">{a.label}</p>
                  {a.dica && <p className="text-xs text-white/60 mt-1">{a.dica}</p>}
                </div>
              </label>
            ))}
            
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-4 rounded-xl text-sm mt-4">
              <p className="font-semibold mb-1 text-blue-300">Lembrete de Provas e Documentos:</p>
              {perfil === "autoexclusao" && <p>Anexe o comprovante do Gov.br e o print do depósito posterior.</p>}
              {perfil === "saldo_retido" && <p>Anexe o print do saldo e do saque negado, além do comunicado da casa.</p>}
              {perfil === "ludopatia" && <p>O laudo médico é fundamental. Anexe também os comprovantes de depósitos sucessivos. Inclua as normativas de jogo responsável.</p>}
              {perfil === "bonus_rollover" && <p>Anexe o print da oferta do bônus e das regras de rollover. Inclua as normas da SPA/MF sobre publicidade.</p>}
              {perfil === "premio_nao_pago" && <p>Anexe o print da aposta ganha e a resposta da casa negando o pagamento.</p>}
              {perfil === "conta_bloqueada" && <p>Anexe o print do saldo e o print da tela de bloqueio.</p>}
              {perfil === "publicidade_enganosa" && <p>Anexe o print do anúncio que prometeu lucro certo e os comprovantes das perdas.</p>}
            </div>

            <label className="flex gap-3 text-sm mt-4 text-white bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer items-start">
              <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} className="accent-emerald-500 mt-0.5 w-5 h-5 shrink-0" /> 
              <span>Li o aviso e vou revisar o rascunho antes de protocolar.</span>
            </label>
            
            <button
              type="button"
              disabled={!ack || limitReached || generating || acimaLimiteJEC}
              onClick={gerar}
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors disabled:opacity-50 mt-2"
            >
              {generating ? <><Loader2 size={18} className="animate-spin" /> Gerando…</> : limitReached ? "Limite de 3 atingido" : `Gerar petição (${restantes} restantes)`}
            </button>

            {/* O AVISO LEGAL AGORA É UM TEXTO MINÚSCULO NO RODAPÉ DO BOTÃO */}
            <p className="text-[10px] text-white/30 text-center mt-4 leading-tight">
              Este é um software de automação de documentos. Não é advocacia. Você é o autor da peça e deve revisá-la antes de protocolar. Jus postulandi.
            </p>
          </div>
        )}

        {tab === "resultado" && texto && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-white">Rascunho — revise antes de protocolar</h2>
              <span className="text-xs text-white/60">Usadas: {usadas}/{MAX_PETICOES}</span>
            </div>
            
            {avisos.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-amber-400 mb-1">Avisos importantes:</p>
                <ul className="list-disc pl-5 text-sm text-amber-400/80 space-y-1">
                  {avisos.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            )}
            
            <div className="bg-[#0d1117] border border-white/10 rounded-lg p-6 max-h-[500px] overflow-auto font-serif text-sm leading-relaxed text-gray-300">
              {texto.split(/\n{2,}/).map((b, i) => {
                let content = b.trim();
                if (!content) return null;
                
                if (content.startsWith("[[CENTRO]]")) {
                  return <p key={i} className="text-center font-bold uppercase my-4 text-white">{content.replace("[[CENTRO]]", "")}</p>;
                }
                if (content.startsWith("[[ASSINATURA]]")) {
                  return (
                    <div key={i} className="mt-12 text-center text-white">
                      {content.replace("[[ASSINATURA]]", "").split("\n").map((l, j) => (
                        <p key={j} className="mb-1">{l}</p>
                      ))}
                    </div>
                  );
                }
                if (/^[IVX]+\s*[—–-]\s/.test(content)) {
                  return <p key={i} className="font-bold mt-6 mb-2 uppercase text-white">{content}</p>;
                }
                return <p key={i} className="mb-3 text-justify">{content}</p>;
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={baixar}
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors"
              >
                <Download size={16} /> Baixar PDF
              </button>
              <button
                type="button"
                onClick={copiarTexto}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                Copiar texto
              </button>
              {!limitReached && (
                <button
                  type="button"
                  onClick={() => { 
                    setTab("perfil"); 
                    setTexto(""); 
                    setArgsSel([]); 
                    setCasoToken("");
                    setRelato("");
                    setValorPerdido("");
                    setValorDevolvido("");
                    setDataFato("");
                    setDataAuto("");
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  Criar nova petição ({restantes} restantes)
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}