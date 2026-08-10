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

// =========================================================================
// 1. ESTILOS DO PDF
// =========================================================================
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
      <Text style={{...pdfStyles.noIndent, textAlign: 'center', fontWeight: 'bold', marginVertical: 10}}>
        {dados.tituloAcao}
      </Text>
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
      {dados.desvioProdutivo && (<>
        <Text style={pdfStyles.sectionTitle}>DO DESVIO PRODUTIVO E DA TENTATIVA PRÉVIA DE SOLUÇÃO</Text>
        <Text style={pdfStyles.paragraph}>{dados.desvioProdutivo}</Text>
      </>)}
      <Text style={pdfStyles.sectionTitle}>DOS PEDIDOS</Text>
      {dados.pedidos.split('\n').map((p: string, i: number) => (<Text key={i} style={p.trim() ? pdfStyles.paragraph : { height: 10 }}>{p}</Text>))}
      <Text style={pdfStyles.noIndent}>Dá-se à causa o valor de {dados.valorCausa}.</Text>
      <Text style={pdfStyles.footer}>Nestes termos, pede deferimento.</Text>
      <View style={pdfStyles.signatureLine}><Text>{dados.autorNome}</Text></View>
      <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 10 }}>{dados.cidadeData}</Text>
    </Page>
  </Document>
);

// =========================================================================
// 2. CONSTANTES
// =========================================================================
const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const PAPER_LINE = "#E4DFD1";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";
const GREEN = "#3F6B4A";
const LIMITE_JEC = 28240.00;
const MAX_PETICOES = 3;

const PROVAS = [
  { id: "autoexclusao", texto: "Print do registro de Autoexclusão Centralizada (Gov.br/SPA) com data e motivo visíveis" },
  { id: "extrato_pos", texto: "Extrato da plataforma mostrando depósito/aposta APÓS a data da autoexclusão" },
  { id: "comprovante", texto: "Comprovante bancário (Pix/Boleto) do depósito indevido" },
  { id: "email_bloqueio", texto: "E-mail da empresa informando o 'bloqueio imediato' (com data e hora)" },
  { id: "chat", texto: "Print do Chat/Suporte com a negativa ou resposta evasiva (com protocolo)" },
  { id: "consumidor_gov", texto: "Print da reclamação no Consumidor.gov.br ou Procon" },
  { id: "laudo", texto: "Laudo médico/psiquiátrico com CID-10 F63.0 ou CID-11 6C50 (obtido de graça no CAPS/SUS)" },
  { id: "emprestimos", texto: "Comprovantes de empréstimos familiares ou uso recorrente de cartão para apostar" },
  { id: "cnpj", texto: "CNPJ da operadora (Casa dos Dados / Receita Federal)" },
];

const ARGUMENTOS_CONDICIONAIS = [
  { 
    id: "cond_email", label: "Tenho E-mail de Bloqueio + Depósito posterior (Contradição Temporal)", 
    texto: (dataFato?: string, horaFato?: string) => `Consta dos autos que, em ${dataFato || "[DATA]"}, a Requerida encaminhou comunicação formal informando que a conta havia sido "imediatamente e definitivamente bloqueada".\n\nTodavia, no mesmo dia, às ${horaFato || "[HORA]"}, o sistema da própria Requerida aceitou novo depósito.\n\nA sequência temporal evidencia que o bloqueio alegado não foi efetivamente implementado, configurando contradição documental que afasta qualquer alegação de boa-fé.` 
  },
  { 
    id: "cond_devolucao", label: "A empresa devolveu parte do valor (Confissão Implícita)", 
    texto: () => `A Requerida procedeu à devolução parcial do valor, o que demonstra reconhecimento implícito da irregularidade operacional.\n\nContudo, de forma contraditória, limitou-se a restituir apenas parcela, mantendo a retenção do montante principal, configurando enriquecimento sem causa (art. 884, CC).` 
  },
];

// =========================================================================
// 3. COMPONENTES DE UI
// =========================================================================
function TabButton({ active, onClick, icon: Icon, n, label }: { active: boolean; onClick: () => void; icon: any; n: string; label: string }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors w-full ${active ? "text-white" : "text-[#3D4C5E] hover:bg-[#EFEADE]"}`} style={active ? { backgroundColor: INK } : { backgroundColor: "transparent" }}>
      <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0" style={{ backgroundColor: active ? SEAL : "#E4DFD1", color: active ? "#FBF9F4" : INK_SOFT }}>{n}</span>
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
        <strong>Isto não é assessoria jurídica.</strong> Não há advogado responsável por este conteúdo — é um serviço de automação de redação para causas de até 20 salários-mínimos (jus postulandi). {!compact && " "}O texto é gerado com apoio de IA e pode conter imprecisões. Revise cada parágrafo, confirme prazos e normas vigentes e adapte à realidade do seu caso antes de protocolar. {compact && " Em causas acima de 20 salários-mínimos, ou complexas, procure um advogado."}
      </p>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span style={{ color: INK_SOFT }}>{label}</span>
      <span style={{ color: INK, fontWeight: bold ? 700 : 500 }}>{value}</span>
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

// =========================================================================
// 4. COMPONENTE PRINCIPAL
// =========================================================================
export default function GeradorMaterialJuridico() {
  const router = useRouter();
  
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndPayment = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
          router.replace(`/login?redirect=/gerador`);
          return;
        }

        const { data: subscription, error: subError } = await supabase
          .from('subscriptions')
          .select('status, user_id, peticoes_usadas')
          .eq('user_id', session.user.id)
          .single();

        if (!subscription || subscription.status !== 'active') {
          router.replace(`/pagamento?user_id=${session.user.id}`);
          return;
        }

        const usadas = subscription?.peticoes_usadas ?? 0;
        setUserEmail(session.user.email ?? null);
        setUserId(session.user.id ?? null);
        setPetitionCount(usadas);
        setLimitReached(usadas >= MAX_PETICOES);
        setLoading(false);
      } catch (err) {
        console.error("Erro na verificação:", err);
        setLoading(false);
      }
    };
    checkAuthAndPayment();
  }, [router]);

  const [petitionCount, setPetitionCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [tab, setTab] = useState("perfil");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ackDisclaimer, setAckDisclaimer] = useState(false);
  const [dadosPDF, setDadosPDF] = useState<any>(null);
  const [geradoTexto, setGeradoTexto] = useState("");
  
  const [perfil, setPerfil] = useState<"autoexclusao" | "ludopatia">("autoexclusao");
  const [argumentosSelecionados, setArgumentosSelecionados] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const perfilParam = params.get('perfil');
      if (perfilParam === 'ludopatia') setPerfil('ludopatia');
      else if (perfilParam === 'autoexclusao') setPerfil('autoexclusao');
    }
  }, []);

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
  const [autor, setAutor] = useState({ nome: "", cpf: "", endereco: "", comarca: "", uf: "" });
  const [reu, setReu] = useState({ nome: "", cnpj: "" });
  const [relato, setRelato] = useState("");
  const [argsCondSel, setArgsCondSel] = useState<Record<string, boolean>>({});
  
  const toggleArg = (id: string) => setArgsCondSel((s) => ({ ...s, [id]: !s[id] }));
  const toggleArgumento = (id: string) => {
    setArgumentosSelecionados(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const handleLogout = async () => { 
    await supabase.auth.signOut(); 
    router.replace("/"); 
  };

  function gerarPeticao() {
    if (limitReached || petitionCount >= MAX_PETICOES) { 
      alert(`Você atingiu o limite de ${MAX_PETICOES} petições.`); 
      return; 
    }
    if (argumentosSelecionados.length === 0) {
      alert("Por favor, selecione pelo menos um argumento jurídico para gerar a petição.");
      return;
    }
    
    // ✅ CORREÇÃO: Valor base para restituição (separado do total)
    const valorBaseRestituicao = calc.base > 0 ? fmt(calc.base) : "[preencher valor da causa]";
    const valorCausa = calc.total > 0 ? fmt(calc.total) : "[preencher valor da causa]";
    
    const argumentosDinamicos = ARGUMENTOS.filter(a => argumentosSelecionados.includes(a.id)).map((a) => ({ 
      titulo: a.label.toUpperCase(), 
      texto: a.texto(dataFato) 
    }));

    const argumentosCondicionais = ARGUMENTOS_CONDICIONAIS.filter((a) => argsCondSel[a.id]).map((a, i) => { 
      const numRomano = ["VIII", "IX", "X", "XI"][i]; 
      return { titulo: `${numRomano} — ${a.label.toUpperCase()}`, texto: a.texto(dataFato, horaFato) }; 
    });

    const argumentosFinais = [...argumentosDinamicos, ...argumentosCondicionais];
    
    let textoRoteiro = "";
    if (tentativaChat || tentativaConsumidorGov) {
      textoRoteiro = `A parte Autora, agindo de boa-fé, tentou resolver a questão administrativamente antes de buscar o Judiciário. `;
      if (tentativaChat) textoRoteiro += `Entrou em contato com o suporte da Ré em data anterior, obtendo o protocolo ${protocoloChat || "[NÚMERO]"}, e `;
      if (tentativaConsumidorGov) textoRoteiro += `registrou reclamação formal no Consumidor.gov.br sob o nº ${protocoloConsumidorGov || "[NÚMERO]"}. `;
      textoRoteiro += `A Ré, contudo, limitou-se a oferecer respostas automatizadas e evasivas. Tal conduta configura claro Desvio Produtivo do Consumidor.`;
    }
    
    // ✅ CORREÇÃO: Pedidos com valores corretos e detalhados
    const pedidos = `Diante do exposto, requer-se:\n\na) a restituição do valor de ${valorBaseRestituicao}${dobro ? `, em DOBRO (totalizando ${fmt(calc.comDobro)}), nos termos do art. 42, parágrafo único, do CDC` : ""}, corrigido monetariamente e acrescido de juros de mora de 1% ao mês desde a data do(s) fato(s)${calc.meses > 0 ? ` (totalizando ${fmt(calc.juros)} de juros)` : ""};\n\n${danoMoral ? `b) a condenação da Ré ao pagamento de indenização por danos morais, em valor não inferior a ${fmt(parseFloat(valorDanoMoral) || 0)}, observando-se os princípios da proporcionalidade e caráter pedagógico;\n` : ""}c) a inversão do ônus da prova, conforme fundamentado;\n\nd) a citação da parte Ré para, querendo, apresentar contestação, sob pena de revelia.`;
    
    const dados = {
      enderecamento: `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE ${autor.comarca || "[COMARCA]"} – ${autor.uf || "[UF]"}`,
      qualificacao: `${autor.nome || "[NOME COMPLETO DO AUTOR]"}, portador(a) do CPF nº ${autor.cpf || "[CPF]"}, residente em ${autor.endereco || "[ENDEREÇO COMPLETO]"}, vem, respeitosamente, com fundamento no art. 9º da Lei 9.099/95 (jus postulandi) e no Código de Defesa do Consumidor, propor a presente`,
      tituloAcao: `AÇÃO DE INDENIZAÇÃO POR DANOS MATERIAIS${danoMoral ? " E MORAIS" : ""}`,
      qualificacaoReu: `em face de ${reu.nome || "[NOME DA EMPRESA RÉ]"}, inscrita no CNPJ nº ${reu.cnpj || "[CNPJ]"}, pelos fatos e fundamentos a seguir.`,
      fatos: relato || "[Descreva aqui, em ordem cronológica: quando você se autoexcluiu no Gov.br, a data em que a plataforma aceitou o depósito indevidamente, e as tentativas de contato com o suporte.]",
      argumentos: argumentosFinais,
      onusProva: `Aplica-se ao caso o Código de Defesa do Consumidor, por se tratar de relação de consumo. Requer-se a inversão do ônus da prova, nos termos do art. 6º, VIII, do CDC, dada a hipossuficiência técnica e informacional da parte Autora frente aos sistemas da Ré, que detém os registros de acesso e integração ao SIGAP.`,
      desvioProdutivo: textoRoteiro,
      pedidos: pedidos,
      valorCausa: valorCausa,
      autorNome: autor.nome || "[NOME COMPLETO DO AUTOR]",
      cidadeData: `${autor.comarca || "[CIDADE]"}, ${new Date().toLocaleDateString("pt-BR")}.`
    };
    
    setDadosPDF(dados);
    
    let textoPreview = `${dados.enderecamento}\n\n${dados.qualificacao}\n\n${dados.tituloAcao}\n\n${dados.qualificacaoReu}\n\nI — DOS FATOS\n\n${dados.fatos}\n\n`;
    argumentosFinais.forEach((arg, i) => {
      textoPreview += `${i + 1}. ${arg.titulo}\n${arg.texto}\n\n`;
    });
    textoPreview += `DO DESVIO PRODUTIVO\n\n${textoRoteiro || "Não informado."}\n\nDOS PEDIDOS\n\n${dados.pedidos}\n\nDá-se à causa o valor de ${dados.valorCausa}.\n\nNestes termos,\npede deferimento.\n\n${dados.cidadeData}\n\n${dados.autorNome}`;
    
    setGeradoTexto(textoPreview);
    setTab("resultado");
    
    const newCount = petitionCount + 1;
    setPetitionCount(newCount);
    if (newCount >= MAX_PETICOES) setLimitReached(true);

    if (userId) {
      supabase.from('subscriptions').update({ peticoes_usadas: newCount }).eq('user_id', userId);
    }
  }

  function copiar() { navigator.clipboard.writeText(geradoTexto); alert("Texto copiado!"); }
  async function baixarPDF() {
    if (!dadosPDF) return;
    const blob = await pdf(<PeticaoPDF dados={dadosPDF} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const nomeArquivo = autor.nome ? autor.nome.replace(/[^a-zA-Z0-9]/g, '_') : 'Rascunho';
    a.href = url; a.download = `Peticao_${nomeArquivo}.pdf`; a.click();
    URL.revokeObjectURL(url);
  }
  const provasMarcadas = Object.values(checked).filter(Boolean).length;

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

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#F2EFE6" }}>
      <header className="border-b px-4 py-3 flex items-center justify-between shadow-sm" style={{ backgroundColor: "#FBF9F4", borderColor: "#E4DFD1" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FBF1DD" }}><User size={18} style={{ color: "#8A6D3B" }} /></div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "#3D4C5E" }}>Logado como</p>
            <p className="text-sm font-bold truncate max-w-[200px]" style={{ color: "#1E2A3A" }}>{userEmail || "Carregando..."}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border" style={{ borderColor: limitReached ? "#FECACA" : "#E4DFD1", backgroundColor: limitReached ? "#FEF2F2" : "#FFF" }}>
            <FileText size={14} style={{ color: limitReached ? "#991B1B" : SEAL }} />
            <span className="text-xs font-semibold" style={{ color: limitReached ? "#991B1B" : INK }}>Petições: {petitionCount}/{MAX_PETICOES}</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border transition-all hover:bg-red-50" style={{ borderColor: "#FECACA", color: "#991B1B" }}><LogOut size={14} /> Sair</button>
        </div>
      </header>
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-1"><Scale size={22} style={{ color: SEAL }} /><span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: INK_SOFT }}>Juizado Especial Cível · Autoexclusão Violada</span></div>
        <h1 className="text-3xl font-semibold mb-1" style={{ color: INK, fontFamily: "Georgia, 'Times New Roman', serif" }}>Gerador de Material Jurídico do Consumidor</h1>
        <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Ferramenta para causas de até 20 salários-mínimos (jus postulandi). Siga as abas na ordem para montar sua petição com argumentos validados.</p>
        <div className="mb-6"><DisclaimerBar /></div>
        
        {limitReached && (<div className="mb-6 p-4 rounded-lg border border-red-300 bg-red-50 text-red-800 text-sm flex items-start gap-3"><Lock size={20} className="shrink-0 mt-0.5" /><div><strong>Limite de gerações atingido.</strong><p className="mt-1">Sua conta já utilizou as {MAX_PETICOES} petições inclusas no seu plano.</p></div></div>)}
        
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
            <TabButton n="0" icon={User} label="Perfil do Caso" active={tab === "perfil"} onClick={() => setTab("perfil")} />
            <TabButton n="1" icon={Info} label="Roteiro Prévio" active={tab === "roteiro"} onClick={() => setTab("roteiro")} />
            <TabButton n="2" icon={ClipboardList} label="Provas" active={tab === "provas"} onClick={() => setTab("provas")} />
            <TabButton n="3" icon={Calculator} label="Cálculo" active={tab === "calculo"} onClick={() => setTab("calculo")} />
            <TabButton n="4" icon={FileText} label="Petição" active={tab === "peticao" || tab === "resultado"} onClick={() => setTab("peticao")} />
          </nav>

          <div className="rounded-xl border p-6" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
            
            {tab === "perfil" && (
              <div>
                <h2 className="text-lg font-semibold mb-4" style={{ color: INK }}>Selecione o Perfil do seu Caso</h2>
                <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Isso definirá quais argumentos jurídicos serão incluídos na sua petição.</p>
                <div className="space-y-4">
                  <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${perfil === "autoexclusao" ? "border-[#8A6D3B] bg-[#FBF9F4] ring-2 ring-[#8A6D3B]" : "border-[#E4DFD1] hover:bg-white"}`} onClick={() => setPerfil("autoexclusao")}>
                    <input type="radio" checked={perfil === "autoexclusao"} onChange={() => setPerfil("autoexclusao")} className="mt-1 w-4 h-4" />
                    <div>
                      <span className="text-sm font-bold block" style={{ color: INK }}>Autoexclusão / Bloqueio Violado</span>
                      <p className="text-xs mt-1" style={{ color: INK_SOFT }}>Foco na quebra de contrato regulatório, falha no dever de bloqueio e responsabilidade objetiva da operadora.</p>
                    </div>
                  </label>

                  <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${perfil === "ludopatia" ? "border-[#8A6D3B] bg-[#FBF9F4] ring-2 ring-[#8A6D3B]" : "border-[#E4DFD1] hover:bg-white"}`} onClick={() => setPerfil("ludopatia")}>
                    <input type="radio" checked={perfil === "ludopatia"} onChange={() => setPerfil("ludopatia")} className="mt-1 w-4 h-4" />
                    <div>
                      <span className="text-sm font-bold block" style={{ color: INK }}>Ludopatia / Saúde Mental (Vulnerabilidade)</span>
                      <p className="text-xs mt-1" style={{ color: INK_SOFT }}>Inclui argumentos sobre nulidade das apostas pela Lei 14.790/2023 (art. 26). Laudo não é sempre obrigatório, mas fortalece muito o caso.</p>
                    </div>
                  </label>
                </div>
                <button onClick={() => setTab("roteiro")} className="mt-6 inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: INK }}>Próximo: Roteiro Prévio <ChevronRight size={16} /></button>
              </div>
            )}

            {tab === "roteiro" && (
              <div>
                <h2 className="text-lg font-semibold mb-4" style={{ color: INK }}>Passo a Passo Pré-Processual</h2>
                <p className="text-sm mb-4" style={{ color: INK_SOFT }}>Juízes valorizam quando o consumidor tenta resolver antes de processar. Isso configura "Desvio Produtivo" e fortalece seu pedido de Dano Moral. Marque o que já fez:</p>
                <div className="space-y-4 mb-6">
                  <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-white" style={{ borderColor: PAPER_LINE }}>
                    <input type="checkbox" checked={tentativaChat} onChange={(e) => setTentativaChat(e.target.checked)} className="mt-1 w-4 h-4" />
                    <div className="flex-1">
                      <span className="text-sm font-medium" style={{ color: INK }}>Tentei contato via Chat/Suporte</span>
                      {tentativaChat && <input type="text" placeholder="Número do Protocolo" value={protocoloChat} onChange={(e) => setProtocoloChat(e.target.value)} className="mt-2 w-full px-3 py-2 text-sm rounded-lg border outline-none focus:ring-2" style={{ borderColor: PAPER_LINE }} />}
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-white" style={{ borderColor: PAPER_LINE }}>
                    <input type="checkbox" checked={tentativaConsumidorGov} onChange={(e) => setTentativaConsumidorGov(e.target.checked)} className="mt-1 w-4 h-4" />
                    <div className="flex-1">
                      <span className="text-sm font-medium" style={{ color: INK }}>Abri reclamação no Consumidor.gov.br</span>
                      {tentativaConsumidorGov && <input type="text" placeholder="Número do Protocolo da Reclamação" value={protocoloConsumidorGov} onChange={(e) => setProtocoloConsumidorGov(e.target.value)} className="mt-2 w-full px-3 py-2 text-sm rounded-lg border outline-none focus:ring-2" style={{ borderColor: PAPER_LINE }} />}
                    </div>
                  </label>
                </div>
                <button onClick={() => setTab("provas")} className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: INK }}>Próximo: Checklist de Provas <ChevronRight size={16} /></button>
              </div>
            )}

            {tab === "provas" && (
              <div>
                <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold" style={{ color: INK }}>Checklist de Provas</h2><span className="text-xs font-medium" style={{ color: INK_SOFT }}>{provasMarcadas}/{PROVAS.length} reunidas</span></div>
                <div className="space-y-1 mb-6">
                  {PROVAS.map((item) => { 
                    const on = !!checked[item.id]; 
                    return (
                      <button key={item.id} onClick={() => setChecked((c) => ({ ...c, [item.id]: !c[item.id] }))} className="w-full flex items-start gap-3 text-left px-3 py-2.5 rounded-lg hover:bg-[#F2EFE6] transition-colors">
                        {on ? <CheckCircle2 size={19} className="shrink-0 mt-0.5" style={{ color: "#3F6B4A" }} /> : <Circle size={19} className="shrink-0 mt-0.5" style={{ color: "#B9B2A0" }} />}
                        <span className="text-sm" style={{ color: INK, opacity: on ? 0.6 : 1, textDecoration: on ? "line-through" : "none" }}>{item.texto}</span>
                      </button>
                    ); 
                  })}
                </div>
                <button onClick={() => setTab("calculo")} className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: INK }}>Próximo: Calculadora de Valores <ChevronRight size={16} /></button>
              </div>
            )}

            {tab === "calculo" && (
              <div>
                <h2 className="text-lg font-semibold mb-4" style={{ color: INK }}>Calculadora de Valores (Estimativa)</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <Field label="Data da Autoexclusão Centralizada" value={dataAutoexclusao} onChange={setDataAutoexclusao} />
                  <Field label="Data do Depósito Indevido" value={dataFato} onChange={setDataFato} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <Field label="Valor Perdido / Depositado (R$)" value={valorPerdido} onChange={setValorPerdido} placeholder="Ex: 800" />
                  <Field label="Hora aproximada do depósito" value={horaFato} onChange={setHoraFato} placeholder="Ex: 06:02" />
                </div>
                <div className="space-y-3 mb-6">
                  <label className="flex items-start gap-2 text-sm cursor-pointer p-3 rounded-lg border" style={{ borderColor: PAPER_LINE }}>
                    <input type="checkbox" checked={dobro} onChange={(e) => setDobro(e.target.checked)} className="mt-1 w-4 h-4" />
                    <div>
                      <span style={{ color: INK, fontWeight: 500 }}>Pedir restituição em DOBRO (art. 42, parágrafo único, CDC)</span>
                      <p className="text-xs mt-1" style={{ color: INK_SOFT }}>A restituição em dobro só é devida quando a empresa agiu de má-fé ou negligência grave, sem "engano justificável".</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={danoMoral} onChange={(e) => setDanoMoral(e.target.checked)} className="w-4 h-4" />
                    <span style={{ color: INK }}>Incluir pedido de Danos Morais</span>
                  </label>
                  {danoMoral && <Field label="Valor sugerido para Dano Moral (R$)" value={valorDanoMoral} onChange={setValorDanoMoral} placeholder="5000" />}
                  {danoMoral && <p className="text-xs" style={{ color: INK_SOFT }}>Média no JEC para este tipo de causa: R$ 3.000 a R$ 5.000. O valor final é arbitrado pelo juiz.</p>}
                </div>
                <div className="rounded-lg p-4 space-y-1.5 mb-4" style={{ backgroundColor: "#F2EFE6" }}>
                  <Row label="Valor base" value={fmt(calc.base)} />
                  {dobro && <Row label="Em dobro (art. 42, CDC)" value={fmt(calc.comDobro)} />}
                  <Row label={`Juros de mora (1% a.m. × ${calc.meses} meses)`} value={fmt(calc.juros)} />
                  {danoMoral && <Row label="Danos morais (estimativa)" value={fmt(calc.danoMoral)} />}
                  <div className="h-px my-2" style={{ backgroundColor: PAPER_LINE }} />
                  <Row label="Total estimado da causa" value={fmt(calc.total)} bold />
                </div>
                {calc.excedeLimite ? (
                  <div className="mb-4 p-4 rounded-lg border border-red-300 bg-red-50 text-red-800 text-sm">
                    <div className="flex items-start gap-2"><AlertCircle size={18} className="shrink-0 mt-0.5" /><div><strong>Atenção: Valor acima do limite para Jus Postulandi.</strong><p className="mt-1">O valor estimado ({fmt(calc.total)}) ultrapassa 20 salários mínimos (R$ {LIMITE_JEC.toLocaleString("pt-BR")}). Procure um advogado ou Defensoria Pública.</p></div></div>
                  </div>
                ) : calc.total > 0 ? (
                  <div className="mb-4 p-4 rounded-lg border border-green-300 bg-green-50 text-green-800 text-sm">
                    <div className="flex items-start gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /><div><strong>Valor dentro do limite para Jus Postulandi.</strong><p className="mt-1">O valor estimado ({fmt(calc.total)}) está dentro do limite de 20 salários mínimos para atuação sem advogado no JEC.</p></div></div>
                  </div>
                ) : null}
                <button onClick={() => setTab("peticao")} disabled={calc.excedeLimite} className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: INK }}>Próximo: Montar Petição <ChevronRight size={16} /></button>
              </div>
            )}

            {tab === "peticao" && (
              <div>
                <h2 className="text-lg font-semibold mb-4" style={{ color: INK }}>Dados para o Rascunho</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <Field label="Seu nome completo" value={autor.nome} onChange={(v: string) => setAutor({ ...autor, nome: v })} />
                  <Field label="CPF" value={autor.cpf} onChange={(v: string) => setAutor({ ...autor, cpf: v })} />
                  <Field label="Endereço completo" value={autor.endereco} onChange={(v: string) => setAutor({ ...autor, endereco: v })} full />
                  <Field label="Comarca (Cidade)" value={autor.comarca} onChange={(v: string) => setAutor({ ...autor, comarca: v })} />
                  <Field label="UF" value={autor.uf} onChange={(v: string) => setAutor({ ...autor, uf: v })} />
                  <Field label="Nome da casa de apostas (ré)" value={reu.nome} onChange={(v: string) => setReu({ ...reu, nome: v })} />
                  <Field label="CNPJ da ré (se souber)" value={reu.cnpj} onChange={(v: string) => setReu({ ...reu, cnpj: v })} />
                </div>
                <label className="block text-sm font-medium mb-1" style={{ color: INK_SOFT }}>Relato dos fatos (em suas próprias palavras)</label>
                <textarea value={relato} onChange={(e) => setRelato(e.target.value)} rows={5} placeholder="Ex: 'Me autoexcluí no Gov.br em 11/12/2025. No dia 22/12, a plataforma aceitou um depósito de R$ 800,00 mesmo com meu bloqueio ativo.'" className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 mb-5" style={{ borderColor: PAPER_LINE }} />
                
                <p className="text-sm font-medium mb-2" style={{ color: INK_SOFT }}>Selecione os argumentos que se aplicam ao seu caso:</p>
                <div className="space-y-2 mb-6">
                  {filtrarPorPerfil(perfil).map((arg) => (
                    <label key={arg.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${argumentosSelecionados.includes(arg.id) ? "bg-amber-50 border-amber-300" : "hover:bg-[#F2EFE6] border-[#E4DFD1]"}`}>
                      <input 
                        type="checkbox" 
                        checked={argumentosSelecionados.includes(arg.id)} 
                        onChange={() => toggleArgumento(arg.id)} 
                        className="mt-1 w-4 h-4" 
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium" style={{ color: INK }}>{arg.label}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {argumentosSelecionados.length > 0 && (
                  <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: "#FFFBEB", borderColor: AMBER_BORDER }}>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: INK }}>
                      <ClipboardList size={16} style={{ color: SEAL }} /> Checklist de Provas Recomendadas:
                    </h3>
                    {argumentosSelecionados.map((idSelecionado) => {
                      const argumento = ARGUMENTOS.find(a => a.id === idSelecionado);
                      if (!argumento || !argumento.dicaProva) return null;

                      return (
                        <div key={argumento.id} className="mb-3 p-3 bg-white border border-amber-200 rounded-lg flex gap-3 shadow-sm">
                          <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: SEAL }} />
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "#926821" }}>{argumento.label}</h4>
                            <p className="text-sm text-amber-900 leading-relaxed">{argumento.dicaProva}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <p className="text-sm font-medium mb-2" style={{ color: INK_SOFT }}>Argumentos Condicionais Específicos (Marque apenas se tiver a prova exata)</p>
                <div className="space-y-1 mb-5">
                  {ARGUMENTOS_CONDICIONAIS.map((a) => (
                    <button key={a.id} onClick={() => toggleArg(a.id)} className="w-full flex items-start gap-3 text-left px-3 py-2 rounded-lg hover:bg-[#F2EFE6]">
                      {argsCondSel[a.id] ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "#3F6B4A" }} /> : <Circle size={18} className="shrink-0 mt-0.5" style={{ color: "#B9B2A0" }} />}
                      <span className="text-sm" style={{ color: INK }}>{a.label}</span>
                    </button>
                  ))}
                </div>
                
                <div className="mt-5 mb-4"><DisclaimerBar compact /></div>
                <label className="flex items-start gap-2 text-sm mb-4 cursor-pointer" onClick={() => setAckDisclaimer(!ackDisclaimer)}>
                  {ackDisclaimer ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "#3F6B4A" }} /> : <Circle size={18} className="shrink-0 mt-0.5" style={{ color: "#B9B2A0" }} />}
                  <span style={{ color: INK }}>Li o aviso acima e entendo que devo revisar o texto, prazos e normas antes de protocolar.</span>
                </label>
                <button onClick={gerarPeticao} disabled={!ackDisclaimer || limitReached} className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed" style={{ backgroundColor: INK }}>
                  {limitReached ? "Limite Atingido" : "Gerar Rascunho da Petição"} <ChevronRight size={16} />
                </button>
              </div>
            )}

            {tab === "resultado" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold" style={{ color: INK }}>Rascunho Gerado</h2>
                  <div className="flex gap-2">
                    <button onClick={copiar} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border" style={{ borderColor: PAPER_LINE, color: INK }}><Copy size={14} /> Copiar Texto</button>
                    <button onClick={baixarPDF} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: INK }}><Download size={14} /> Baixar PDF Formatado</button>
                  </div>
                </div>
                <div className="rounded-lg border p-6 whitespace-pre-wrap text-sm leading-relaxed max-h-[600px] overflow-y-auto mb-4" style={{ backgroundColor: "#FFFDF8", borderColor: PAPER_LINE, color: "#2A2A28", fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  {geradoTexto}
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm">
                  <strong>💡 Dica Profissional:</strong> Clique em <strong>"Baixar PDF Formatado"</strong> para obter o documento com margens, fonte Times New Roman, texto justificado e espaçamento 1.5, pronto para ser impresso ou anexado no PJe.
                </div>

                {/* ✅ NOVO: AVISO SOBRE ANEXAR DOCUMENTOS NO JEC */}
                {provasMarcadas > 0 && (
                  <div className="mt-4 p-5 rounded-lg border-2" style={{ backgroundColor: "#FEF3C7", borderColor: AMBER_BORDER }}>
                    <div className="flex items-start gap-3">
                      <Paperclip size={24} className="shrink-0 mt-0.5" style={{ color: SEAL }} />
                      <div>
                        <h3 className="font-bold text-base mb-2" style={{ color: INK }}>⚠️ IMPORTANTE: Anexe seus documentos no JEC!</h3>
                        <p className="text-sm mb-3" style={{ color: INK }}>
                          Você marcou <strong>{provasMarcadas} documento(s)</strong> no Checklist de Provas. 
                          <strong> Todos eles devem ser anexados em formato PDF</strong> junto com esta petição no sistema do Juizado Especial Cível da sua região.
                        </p>
                        <div className="bg-white p-3 rounded border border-amber-200">
                          <p className="text-xs font-semibold mb-2" style={{ color: SEAL }}>📎 Documentos que você precisa anexar:</p>
                          <ul className="space-y-1">
                            {PROVAS.filter(p => checked[p.id]).map((p) => (
                              <li key={p.id} className="text-xs flex items-start gap-2" style={{ color: INK }}>
                                <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: GREEN }} />
                                <span>{p.texto}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-xs mt-3" style={{ color: INK_SOFT }}>
                           <strong>Dica:</strong> A maioria dos tribunais aceita protocolo online via PJe ou e-SAJ. Converta todos os prints e comprovantes para PDF antes de anexar. 
                          Se tiver dúvidas sobre como protocolar, procure a Defensoria Pública da sua região — o atendimento é gratuito.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-5 rounded-lg border text-center" style={{ backgroundColor: AMBER_BG, borderColor: AMBER_BORDER }}>
                  <p className="text-sm font-semibold mb-3" style={{ color: INK }}>Conhece alguém que também foi prejudicado por casa de apostas?</p>
                  <p className="text-xs mb-4" style={{ color: INK_SOFT }}>Esse público se indica muito entre si. Compartilhe o RecuperaJogo e ajude outra pessoa a recuperar o que é dela.</p>
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent("Acabei de ver uma ferramenta que ajuda a processar casa de apostas que ignoram autoexclusão. Dá uma olhada: https://recuperajogo.vercel.app")}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-transform hover:scale-105" 
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <MessageCircle size={16} /> Compartilhar no WhatsApp
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}