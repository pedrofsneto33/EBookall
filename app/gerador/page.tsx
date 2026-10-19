"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle, CheckCircle2, Circle, Calculator, FileText,
  ClipboardList, Copy, Download, ChevronRight, Scale, Info,
  AlertCircle, User, Heart, Shield, LogOut, Lock, MessageCircle, Loader2, Paperclip
} from "lucide-react";
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { supabase } from "../login/supabase";
import { ARGUMENTOS, filtrarPorPerfil, Argumento } from "../lib/argumentos-peticao";

const pdfStyles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Times-Roman', fontSize: 12, lineHeight: 1.5 },
  header: { textAlign: 'center', marginBottom: 20, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginTop: 15, marginBottom: 8, textTransform: 'uppercase' },
  paragraph: { textAlign: 'justify', marginBottom: 10, textIndent: 25 },
  noIndent: { textAlign: 'justify', marginBottom: 10 },
  listItem: { textAlign: 'justify', marginBottom: 5, marginLeft: 25 },
  footer: { marginTop: 50, textAlign: 'center' },
  signatureLine: { marginTop: 60, textAlign: 'center', borderTop: '1px solid black', width: 250, marginLeft: 'auto', marginRight: 'auto', paddingTop: 5 }
});

const PeticaoPDF = ({ dados }: { dados: any }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.header}>{dados.enderecamento}</Text>
      <Text style={pdfStyles.noIndent}>{dados.qualificacao}</Text>
      <Text style={{...pdfStyles.noIndent, textAlign: 'center', fontWeight: 'bold', marginVertical: 10}}>{dados.tituloAcao}</Text>
      <Text style={pdfStyles.noIndent}>{dados.qualificacaoReu}</Text>
      <Text style={pdfStyles.sectionTitle}>I — DOS FATOS</Text>
      <Text style={pdfStyles.paragraph}>{dados.fatos}</Text>
      {dados.argumentos.map((arg: any, index: number) => (
        <View key={index}>
          <Text style={pdfStyles.sectionTitle}>{arg.titulo}</Text>
          {arg.texto.split('\n\n').map((p: string, i: number) => (
            p.trim().startsWith('- ') ? <Text key={i} style={pdfStyles.listItem}>{p}</Text> : <Text key={i} style={pdfStyles.paragraph}>{p}</Text>
          ))}
        </View>
      ))}
      <Text style={pdfStyles.sectionTitle}>DA RELAÇÃO DE CONSUMO E DA INVERSÃO DO ÔNUS DA PROVA</Text>
      <Text style={pdfStyles.paragraph}>{dados.onusProva}</Text>
      {dados.desvioProdutivo && (<><Text style={pdfStyles.sectionTitle}>DO DESVIO PRODUTIVO E DA TENTATIVA PRÉVIA DE SOLUÇÃO</Text><Text style={pdfStyles.paragraph}>{dados.desvioProdutivo}</Text></>)}
      <Text style={pdfStyles.sectionTitle}>DOS PEDIDOS</Text>
      {dados.pedidos.split('\n').map((p: string, i: number) => (<Text key={i} style={p.trim() ? pdfStyles.paragraph : { height: 10 }}>{p}</Text>))}
      <Text style={pdfStyles.noIndent}>Dá-se à causa o valor de {dados.valorCausa}.</Text>
      <Text style={pdfStyles.footer}>Nestes termos, pede deferimento.</Text>
      <View style={pdfStyles.signatureLine}><Text>{dados.autorNome}</Text></View>
      <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 10 }}>{dados.cidadeData}</Text>
    </Page>
  </Document>
);

const INK = "#0F1C2E";
const INK_SOFT = "#4A5B6E";
const PAPER = "#FAF8F4";
const PAPER_LINE = "#E6E1D6";
const SEAL = "#1B6B4A";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";
const GREEN = "#1B6B4A";
const LIMITE_JEC = 28240.00;
const MAX_PETICOES = 3;

const PROVAS = [
  { id: "autoexclusao", texto: "Print do registro de Autoexclusão Centralizada (Gov.br/SPA) com data e motivo visíveis" },
  { id: "extrato_pos", texto: "Extrato da plataforma mostrando depósito/aposta APÓS a data da autoexclusão" },
  { id: "comprovante", texto: "Comprovante bancário (Pix/Boleto) do depósito indevido" },
  { id: "email_bloqueio", texto: "E-mail da empresa informando o 'bloqueio imediato' (com data e hora)" },
  { id: "chat", texto: "Print do Chat/Suporte com a negativa ou resposta evasiva (com protocolo)" },
  { id: "consumidor_gov", texto: "Print da reclamação no Consumidor.gov.br ou Procon" },
  { id: "laudo", texto: "Laudo médico/psiquiátrico com CID-10 F63.0 ou CID-11 6C50 (CAPS/SUS)" },
  { id: "emprestimos", texto: "Comprovantes de empréstimos ou uso recorrente de cartão para apostar" },
  { id: "cnpj", texto: "CNPJ da operadora (Casa dos Dados / Receita Federal)" },
];

const ARGUMENTOS_CONDICIONAIS = [
  { id: "cond_email", label: "Tenho E-mail de Bloqueio + Depósito posterior (Contradição Temporal)", texto: (dataFato?: string, horaFato?: string) => `Consta dos autos que, em ${dataFato || "[DATA]"}, a Requerida encaminhou comunicação formal informando que a conta havia sido \"imediatamente e definitivamente bloqueada\".\n\nTodavia, no mesmo dia, às ${horaFato || "[HORA]"}, o sistema da própria Requerida aceitou novo depósito.\n\nA sequência temporal evidencia que o bloqueio alegado não foi efetivamente implementado.` },
  { id: "cond_devolucao", label: "A empresa devolveu parte do valor (Confissão Implícita)", texto: () => `A Requerida procedeu à devolução parcial do valor, o que demonstra reconhecimento implícito da irregularidade operacional.\n\nContudo, limitou-se a restituir apenas parcela, mantendo a retenção do montante principal, configurando enriquecimento sem causa (art. 884, CC).` },
];

function TabButton({ active, onClick, icon: Icon, n, label }: { active: boolean; onClick: () => void; icon: any; n: string; label: string }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors w-full ${active ? "text-white" : "hover:bg-[#F3F0E9]"}`} style={active ? { backgroundColor: INK, color: "#fff" } : { backgroundColor: "transparent", color: INK_SOFT }}>
      <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0" style={{ backgroundColor: active ? SEAL : PAPER_LINE, color: active ? "#FAF8F4" : INK_SOFT }}>{n}</span>
      <Icon size={17} className="shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function DisclaimerBar({ compact }: { compact?: boolean }) {
  return (
    <div className="flex gap-3 items-start rounded-lg border px-4 py-3" style={{ backgroundColor: AMBER_BG, borderColor: AMBER_BORDER }}>
      <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: SEAL }} />
      <p className="text-sm leading-relaxed" style={{ color: "#5C4A22" }}>
        <strong>Isto não é assessoria jurídica.</strong> Serviço de automação de redação (jus postulandi, até 20 SM). Revise antes de protocolar.{compact ? "" : " Em causas complexas, procure um advogado."}
      </p>
    </div>
  );
}

function Field({ label, value, onChange, full, placeholder }: { label: string; value: string; onChange: (v: string) => void; full?: boolean; placeholder?: string }) {
  return (
    <label className={`text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="block mb-1 font-medium" style={{ color: INK_SOFT }}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2" style={{ borderColor: PAPER_LINE, backgroundColor: "#FFF" }} />
    </label>
  );
}

export default function GeradorMaterialJuridico() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [petitionCount, setPetitionCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [tab, setTab] = useState("perfil");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ackDisclaimer, setAckDisclaimer] = useState(false);
  const [dadosPDF, setDadosPDF] = useState<any>(null);
  const [geradoTexto, setGeradoTexto] = useState("");
  const [perfil, setPerfil] = useState<"autoexclusao" | "ludopatia">("autoexclusao");
  const [argumentosSelecionados, setArgumentosSelecionados] = useState<string[]>([]);
  const [tentativaChat, setTentativaChat] = useState(false);
  const [protocoloChat, setProtocoloChat] = useState("");
  const [tentativaConsumidorGov, setTentativaConsumidorGov] = useState(false);
  const [protocoloConsumidorGov, setProtocoloConsumidorGov] = useState("");
  const [valorPerdido, setValorPerdido] = useState("");
  const [dataFato, setDataFato] = useState("");
  const [horaFato, setHoraFato] = useState("");
  const [dataAutoexclusao, setDataAutoexclusao] = useState("");
  const [dobro, setDobro] = useState(false);
  const [danoMoral, setDanoMoral] = useState(true);
  const [valorDanoMoral, setValorDanoMoral] = useState("5000");
  const [autor, setAutor] = useState({ nome: "", cpf: "", endereco: "", comarca: "", uf: "" });
  const [reu, setReu] = useState({ nome: "", cnpj: "" });
  const [relato, setRelato] = useState("");
  const [argsCondSel, setArgsCondSel] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const check = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) { router.replace(`/login?redirect=/gerador`); return; }
        const { data: subscription } = await supabase.from('subscriptions').select('status, peticoes_usadas').eq('user_id', session.user.id).single();
        if (!subscription || subscription.status !== 'active') { router.replace(`/pagamento?user_id=${session.user.id}`); return; }
        const usadas = subscription?.peticoes_usadas ?? 0;
        setUserEmail(session.user.email ?? null);
        setUserId(session.user.id ?? null);
        setPetitionCount(usadas);
        setLimitReached(usadas >= MAX_PETICOES);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    check();
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('perfil');
      if (p === 'ludopatia') setPerfil('ludopatia');
      else if (p === 'autoexclusao') setPerfil('autoexclusao');
    }
  }, []);

  const calc = useMemo(() => {
    const base = parseFloat(valorPerdido) || 0;
    let meses = 0;
    if (dataFato) { const d1 = new Date(dataFato); const d2 = new Date(); meses = Math.max(0, (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth())); }
    const comDobro = dobro ? base * 2 : base;
    const juros = comDobro * 0.01 * meses;
    const danoMoralValor = danoMoral ? parseFloat(valorDanoMoral) || 0 : 0;
    const total = comDobro + juros + danoMoralValor;
    return { base, comDobro, juros, meses, danoMoral: danoMoralValor, total, excedeLimite: total > LIMITE_JEC };
  }, [valorPerdido, dataFato, dobro, danoMoral, valorDanoMoral]);

  const fmt = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const toggleArg = (id: string) => setArgsCondSel((s) => ({ ...s, [id]: !s[id] }));
  const toggleArgumento = (id: string) => setArgumentosSelecionados(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  const handleLogout = async () => { await supabase.auth.signOut(); router.replace("/"); };

  function gerarPeticao() {
    if (limitReached || petitionCount >= MAX_PETICOES) { alert(`Limite de ${MAX_PETICOES} petições.`); return; }
    if (argumentosSelecionados.length === 0) { alert("Selecione pelo menos um argumento jurídico."); return; }
    const valorBaseRestituicao = calc.base > 0 ? fmt(calc.base) : "[preencher valor]";
    const valorCausa = calc.total > 0 ? fmt(calc.total) : "[preencher valor da causa]";
    const argumentosDinamicos = ARGUMENTOS.filter(a => argumentosSelecionados.includes(a.id)).map((a) => ({ titulo: a.label.toUpperCase(), texto: a.texto(dataFato) }));
    const argumentosCondicionais = ARGUMENTOS_CONDICIONAIS.filter((a) => argsCondSel[a.id]).map((a, i) => ({ titulo: `${["VIII", "IX", "X", "XI"][i]} — ${a.label.toUpperCase()}`, texto: a.texto(dataFato, horaFato) }));
    const argumentosFinais = [...argumentosDinamicos, ...argumentosCondicionais];
    let textoRoteiro = "";
    if (tentativaChat || tentativaConsumidorGov) {
      textoRoteiro = `A parte Autora tentou resolver administrativamente. `;
      if (tentativaChat) textoRoteiro += `Contato com suporte sob protocolo ${protocoloChat || "[NÚMERO]"}. `;
      if (tentativaConsumidorGov) textoRoteiro += `Reclamação no Consumidor.gov.br nº ${protocoloConsumidorGov || "[NÚMERO]"}. `;
      textoRoteiro += `A Ré ofereceu respostas evasivas, configurando Desvio Produtivo do Consumidor.`;
    }
    const pedidos = `Diante do exposto, requer-se:\n\na) a restituição do valor de ${valorBaseRestituicao}${dobro ? `, em DOBRO (totalizando ${fmt(calc.comDobro)}), nos termos do art. 42, parágrafo único, do CDC` : ""}, corrigido monetariamente e acrescido de juros de mora de 1% ao mês desde o(s) fato(s)${calc.meses > 0 ? ` (${fmt(calc.juros)} de juros)` : ""};\n\n${danoMoral ? `b) indenização por danos morais não inferior a ${fmt(parseFloat(valorDanoMoral) || 0)};\n` : ""}c) a inversão do ônus da prova;\n\nd) a citação da Ré.`;
    const dados = {
      enderecamento: `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE ${autor.comarca || "[COMARCA]"} – ${autor.uf || "[UF]"}`,
      qualificacao: `${autor.nome || "[NOME]"}, CPF nº ${autor.cpf || "[CPF]"}, residente em ${autor.endereco || "[ENDEREÇO]"}, vem, com fundamento no art. 9º da Lei 9.099/95 e no CDC, propor a presente`,
      tituloAcao: `AÇÃO DE INDENIZAÇÃO POR DANOS MATERIAIS${danoMoral ? " E MORAIS" : ""}`,
      qualificacaoReu: `em face de ${reu.nome || "[EMPRESA RÉ]"}, CNPJ nº ${reu.cnpj || "[CNPJ]"}.`,
      fatos: relato || "[Descreva: autoexclusão, depósito indevido, tentativas de suporte.]",
      argumentos: argumentosFinais,
      onusProva: `Aplica-se o CDC. Requer-se a inversão do ônus da prova (art. 6º, VIII, CDC).`,
      desvioProdutivo: textoRoteiro,
      pedidos,
      valorCausa,
      autorNome: autor.nome || "[NOME]",
      cidadeData: `${autor.comarca || "[CIDADE]"}, ${new Date().toLocaleDateString("pt-BR")}.`,
    };
    setDadosPDF(dados);
    let textoPreview = `${dados.enderecamento}\n\n${dados.qualificacao}\n\n${dados.tituloAcao}\n\n${dados.qualificacaoReu}\n\nI — DOS FATOS\n\n${dados.fatos}\n\n`;
    argumentosFinais.forEach((arg, i) => { textoPreview += `${i + 1}. ${arg.titulo}\n${arg.texto}\n\n`; });
    textoPreview += `DOS PEDIDOS\n\n${dados.pedidos}\n\nDá-se à causa o valor de ${dados.valorCausa}.\n\nNestes termos, pede deferimento.\n\n${dados.cidadeData}\n\n${dados.autorNome}`;
    setGeradoTexto(textoPreview);
    setTab("resultado");
    const newCount = petitionCount + 1;
    setPetitionCount(newCount);
    if (newCount >= MAX_PETICOES) setLimitReached(true);
    if (userId) {
      supabase.from('subscriptions').update({ peticoes_usadas: newCount }).eq('user_id', userId).then(({ error }) => { if (error) console.error(error); });
    }
  }

  async function baixarPDF() {
    if (!dadosPDF) return;
    const blob = await pdf(<PeticaoPDF dados={dadosPDF} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `peticao-recuperajogo-${Date.now()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F0E9" }}>
        <div className="text-center">
          <Loader2 size={36} className="mx-auto mb-4 animate-spin" style={{ color: SEAL }} />
          <p className="text-sm font-medium" style={{ color: INK }}>Verificando acesso...</p>
        </div>
      </div>
    );
  }

  const argumentosDisponiveis = filtrarPorPerfil(ARGUMENTOS, perfil);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#F3F0E9" }}>
      <header className="border-b px-4 py-3 flex items-center justify-between shadow-sm" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: SEAL }}>RJ</div>
          <div>
            <p className="text-sm font-bold truncate max-w-[200px]" style={{ color: INK }}>{userEmail || "..."}</p>
            <p className="text-[10px]" style={{ color: INK_SOFT }}>Gerador de petição</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs" style={{ borderColor: limitReached ? "#FECACA" : PAPER_LINE, backgroundColor: limitReached ? "#FEF2F2" : "#FFF", color: limitReached ? "#991B1B" : INK_SOFT }}>
            {petitionCount}/{MAX_PETICOES} petições
          </div>
          <button onClick={handleLogout} className="text-xs font-medium flex items-center gap-1 hover:underline" style={{ color: INK_SOFT }}>
            <LogOut size={14} /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="space-y-1">
          <TabButton active={tab==="perfil"} onClick={() => setTab("perfil")} icon={User} n="1" label="Perfil do caso" />
          <TabButton active={tab==="provas"} onClick={() => setTab("provas")} icon={ClipboardList} n="2" label="Provas" />
          <TabButton active={tab==="dados"} onClick={() => setTab("dados")} icon={FileText} n="3" label="Dados e valores" />
          <TabButton active={tab==="argumentos"} onClick={() => setTab("argumentos")} icon={Scale} n="4" label="Argumentos" />
          <TabButton active={tab==="resultado"} onClick={() => setTab("resultado")} icon={Download} n="5" label="Resultado" />
        </aside>

        <main className="min-w-0">
          <h1 className="text-2xl font-bold mb-1" style={{ color: INK }}>Gerador de petição</h1>
          <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Preencha, revise e baixe o PDF. Você é o autor da peça.</p>
          <div className="mb-6"><DisclaimerBar /></div>

          {tab === "perfil" && (
            <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
              <h2 className="font-semibold" style={{ color: INK }}>Tipo de caso</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer ${perfil==="autoexclusao" ? "ring-2" : ""}`} style={{ borderColor: perfil==="autoexclusao" ? SEAL : PAPER_LINE, backgroundColor: perfil==="autoexclusao" ? "#E8F5EF" : "#FFF" }} onClick={() => setPerfil("autoexclusao")}>
                  <Lock size={18} style={{ color: SEAL }} />
                  <div><p className="font-medium text-sm" style={{ color: INK }}>Autoexclusão ignorada</p><p className="text-xs" style={{ color: INK_SOFT }}>Pediu para parar e ainda aceitaram depósito.</p></div>
                </label>
                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer ${perfil==="ludopatia" ? "ring-2" : ""}`} style={{ borderColor: perfil==="ludopatia" ? SEAL : PAPER_LINE, backgroundColor: perfil==="ludopatia" ? "#E8F5EF" : "#FFF" }} onClick={() => setPerfil("ludopatia")}>
                  <Heart size={18} style={{ color: SEAL }} />
                  <div><p className="font-medium text-sm" style={{ color: INK }}>Ludopatia / laudo</p><p className="text-xs" style={{ color: INK_SOFT }}>Padrão compulsivo ou laudo (art. 26 SPA).</p></div>
                </label>
              </div>
              <button onClick={() => setTab("provas")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: SEAL }}>Continuar <ChevronRight size={16} /></button>
            </div>
          )}

          {tab === "provas" && (
            <div className="rounded-xl border p-6 space-y-3" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
              <h2 className="font-semibold mb-2" style={{ color: INK }}>Checklist de provas</h2>
              {PROVAS.map((p) => (
                <label key={p.id} className="flex items-start gap-3 text-sm cursor-pointer">
                  <input type="checkbox" checked={!!checked[p.id]} onChange={() => setChecked((s) => ({ ...s, [p.id]: !s[p.id] }))} className="mt-1" style={{ accentColor: SEAL }} />
                  <span style={{ color: INK_SOFT }}>{p.texto}</span>
                </label>
              ))}
              <button onClick={() => setTab("dados")} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: SEAL }}>Continuar <ChevronRight size={16} /></button>
            </div>
          )}

          {tab === "dados" && (
            <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
              <h2 className="font-semibold" style={{ color: INK }}>Dados e valores</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Seu nome" value={autor.nome} onChange={(v) => setAutor({ ...autor, nome: v })} />
                <Field label="CPF" value={autor.cpf} onChange={(v) => setAutor({ ...autor, cpf: v })} />
                <Field label="Endereço" value={autor.endereco} onChange={(v) => setAutor({ ...autor, endereco: v })} full />
                <Field label="Comarca" value={autor.comarca} onChange={(v) => setAutor({ ...autor, comarca: v })} />
                <Field label="UF" value={autor.uf} onChange={(v) => setAutor({ ...autor, uf: v })} />
                <Field label="Nome da casa (ré)" value={reu.nome} onChange={(v) => setReu({ ...reu, nome: v })} />
                <Field label="CNPJ da ré" value={reu.cnpj} onChange={(v) => setReu({ ...reu, cnpj: v })} />
                <Field label="Valor perdido (R$)" value={valorPerdido} onChange={setValorPerdido} />
                <Field label="Data do fato" value={dataFato} onChange={setDataFato} placeholder="AAAA-MM-DD" />
                <Field label="Data autoexclusão" value={dataAutoexclusao} onChange={setDataAutoexclusao} placeholder="AAAA-MM-DD" />
              </div>
              <label className="block text-sm">
                <span className="block mb-1 font-medium" style={{ color: INK_SOFT }}>Relato dos fatos</span>
                <textarea value={relato} onChange={(e) => setRelato(e.target.value)} rows={5} className="w-full px-3 py-2 rounded-lg border outline-none" style={{ borderColor: PAPER_LINE }} />
              </label>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: INK_SOFT }}>
                <label className="flex items-center gap-2"><input type="checkbox" checked={dobro} onChange={(e) => setDobro(e.target.checked)} style={{ accentColor: SEAL }} /> Pedir restituição em dobro</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={danoMoral} onChange={(e) => setDanoMoral(e.target.checked)} style={{ accentColor: SEAL }} /> Danos morais</label>
              </div>
              {danoMoral && <Field label="Valor danos morais (R$)" value={valorDanoMoral} onChange={setValorDanoMoral} />}
              <p className="text-sm" style={{ color: INK }}>Estimativa da causa: <strong>{fmt(calc.total)}</strong>{calc.excedeLimite ? " — acima do teto do JEC" : ""}</p>
              <button onClick={() => setTab("argumentos")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: SEAL }}>Continuar <ChevronRight size={16} /></button>
            </div>
          )}

          {tab === "argumentos" && (
            <div className="rounded-xl border p-6 space-y-3" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
              <h2 className="font-semibold mb-2" style={{ color: INK }}>Argumentos jurídicos</h2>
              {argumentosDisponiveis.map((a: Argumento) => (
                <label key={a.id} className="flex items-start gap-3 text-sm cursor-pointer p-3 rounded-lg border" style={{ borderColor: argumentosSelecionados.includes(a.id) ? SEAL : PAPER_LINE, backgroundColor: argumentosSelecionados.includes(a.id) ? "#E8F5EF" : "#FFF" }}>
                  <input type="checkbox" checked={argumentosSelecionados.includes(a.id)} onChange={() => toggleArgumento(a.id)} className="mt-1" style={{ accentColor: SEAL }} />
                  <span style={{ color: INK }}>{a.label}</span>
                </label>
              ))}
              <h3 className="font-medium pt-2" style={{ color: INK }}>Condicionais</h3>
              {ARGUMENTOS_CONDICIONAIS.map((a) => (
                <label key={a.id} className="flex items-start gap-3 text-sm cursor-pointer">
                  <input type="checkbox" checked={!!argsCondSel[a.id]} onChange={() => toggleArg(a.id)} className="mt-1" style={{ accentColor: SEAL }} />
                  <span style={{ color: INK_SOFT }}>{a.label}</span>
                </label>
              ))}
              <label className="flex items-start gap-2 text-sm pt-2">
                <input type="checkbox" checked={ackDisclaimer} onChange={(e) => setAckDisclaimer(e.target.checked)} style={{ accentColor: SEAL }} />
                <span style={{ color: INK_SOFT }}>Li o aviso: isto não é assessoria jurídica. Vou revisar a peça.</span>
              </label>
              <button disabled={!ackDisclaimer || limitReached} onClick={gerarPeticao} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-50" style={{ backgroundColor: SEAL }}>
                Gerar petição <FileText size={16} />
              </button>
            </div>
          )}

          {tab === "resultado" && (
            <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
              <h2 className="font-semibold" style={{ color: INK }}>Resultado</h2>
              {!geradoTexto ? (
                <p className="text-sm" style={{ color: INK_SOFT }}>Gere a petição na aba Argumentos.</p>
              ) : (
                <>
                  <textarea readOnly value={geradoTexto} rows={18} className="w-full text-xs font-mono p-3 rounded-lg border" style={{ borderColor: PAPER_LINE, color: INK }} />
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => { navigator.clipboard.writeText(geradoTexto); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm" style={{ borderColor: PAPER_LINE, color: INK }}><Copy size={14} /> Copiar</button>
                    <button onClick={baixarPDF} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: SEAL }}><Download size={14} /> Baixar PDF</button>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
