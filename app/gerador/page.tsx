"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle, CheckCircle2, Circle, Calculator, FileText,
  ClipboardList, Copy, Download, ChevronRight, Scale, Info,
  AlertCircle, User, Heart, Shield, LogOut, Lock
} from "lucide-react";
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

import { supabase } from "../login/supabase"; 

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
            p.trim().startsWith('- ') ? 
            <Text key={i} style={pdfStyles.listItem}>{p}</Text> :
            <Text key={i} style={pdfStyles.paragraph}>{p}</Text>
          ))}
        </View>
      ))}

      <Text style={pdfStyles.sectionTitle}>DA RELAÇÃO DE CONSUMO E DA INVERSÃO DO ÔNUS DA PROVA</Text>
      <Text style={pdfStyles.paragraph}>{dados.onusProva}</Text>

      {dados.desvioProdutivo && (
        <>
          <Text style={pdfStyles.sectionTitle}>DO DESVIO PRODUTIVO E DA TENTATIVA PRÉVIA DE SOLUÇÃO</Text>
          <Text style={pdfStyles.paragraph}>{dados.desvioProdutivo}</Text>
        </>
      )}

      <Text style={pdfStyles.sectionTitle}>DOS PEDIDOS</Text>
      {dados.pedidos.split('\n').map((p: string, i: number) => (
        <Text key={i} style={p.trim() ? pdfStyles.paragraph : { height: 10 }}>{p}</Text>
      ))}

      <Text style={pdfStyles.noIndent}>Dá-se à causa o valor de {dados.valorCausa}.</Text>
      <Text style={pdfStyles.footer}>Nestes termos, pede deferimento.</Text>
      <View style={pdfStyles.signatureLine}>
        <Text>{dados.autorNome}</Text>
      </View>
      <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 10 }}>{dados.cidadeData}</Text>
    </Page>
  </Document>
);

// =========================================================================
// 2. CONSTANTES E ARGUMENTOS
// =========================================================================
const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const PAPER_LINE = "#E4DFD1";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";
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

const ARGUMENTOS_UNIVERSAIS = [
  {
    id: "univ_sigap", label: "Dever de Consulta ao SIGAP (IN 31/2025)",
    texto: () => `A parte Autora realizou Autoexclusão Centralizada no âmbito do sistema oficial da Secretaria de Prêmios e Apostas do Ministério da Fazenda (SPA/MF).\n\nNos termos da IN SPA/MF nº 31/2025 (arts. 2º e 3º), é dever obrigatório do operador consultar o SIGAP previamente à autorização de acesso, cadastro ou realização de operações.\n\nA parte Ré, ao aceitar depósitos após a formalização da autoexclusão, descumpriu obrigação regulatória vinculante, configurando falha grave na prestação do serviço (art. 14, CDC).`,
  },
  {
    id: "univ_prazo_30_dias", label: "Prazo de 30 dias para Integração (IN 31/2025, art. 15)",
    texto: () => `A Requerida tenta utilizar o prazo de 90 dias da Portaria SPA/MF nº 2.579/2025 como excludente de responsabilidade. Contudo, a IN SPA/MF nº 31/2025 (art. 15) estabeleceu o prazo de 30 dias para integração ao sistema de impedidos.\n\nO prazo de 90 dias refere-se exclusivamente à adaptação cadastral e tecnológica, não suspendendo o dever material de bloqueio, conforme esclarecido pela própria SPA/MF (Nota Informativa SEI nº 1864/2026/MF).`,
  },
  {
    id: "univ_cdc_cc", label: "Distinção: Art. 814 CC (Dívida de Jogo) vs. Art. 42 CDC (Repetição de Indébito)",
    texto: () => `A lide não versa sobre cobrança de dívida de jogo (art. 814 do Código Civil), mas sobre repetição de indébito por violação de obrigação regulatória (art. 42, parágrafo único, do CDC).\n\nO cerne da demanda é a falha no bloqueio da conta após autoexclusão centralizada, não o resultado de apostas. A aplicação do art. 814 do CC ao caso é indevida.`,
  },
  {
    id: "univ_responsabilidade", label: "Responsabilidade Objetiva e Fortuito Interno (Súmula 479 STJ)",
    texto: () => `Nos termos do art. 14 do CDC, a responsabilidade da fornecedora é objetiva, independendo de dolo ou culpa.\n\nEventuais falhas operacionais, inconsistências sistêmicas ou problemas internos de integração configuram fortuito interno, risco da atividade (Súmula 479 do STJ).`,
  },
  {
    id: "univ_laudo", label: "Desnecessidade de Laudo Médico para Autoexclusão",
    texto: () => `A regulamentação da autoexclusão centralizada não exige laudo médico, interdição judicial ou comprovação de incapacidade civil para gerar o dever de bloqueio.\n\nO dever nasce da própria formalização da autoexclusão no sistema oficial da SPA/MF. A tentativa de condicionar a proteção à demonstração de incapacidade formal não encontra respaldo normativo.`,
  },
  {
    id: "univ_bloqueio_72h", label: "Dever de Bloqueio em 72 Horas (Art. 7º da Portaria 2.579/2025)",
    texto: () => `O art. 7º da Portaria SPA/MF nº 2.579/2025 estabelece que, identificado o status 'Impedido - Autoexclusão Centralizada' no SIGAP, o operador deve imediatamente impedir novas apostas e encerrar a conta no prazo máximo de 3 (três) dias.\n\nA falha no bloqueio dentro deste prazo configura defeito na prestação do serviço (art. 14, §1º, II, CDC).`,
  },
];

// ✅ NOVO: Argumento de Ludopatia com Lei 14.790/2023
const ARGUMENTO_LUDOPATIA = {
  id: "ludo_vulnerabilidade",
  label: "Nulidade das Apostas por Ludopatia (Lei 14.790/2023, art. 26)",
  texto: () =>
    `A parte Autora é portadora de transtorno do jogo patológico (ludopatia), conforme diagnóstico médico (CID-10 F63.0 / CID-11 6C50), obtido via CAPS/SUS.\n\n` +
    `A Lei nº 14.790/2023 (Lei das Bets), em seu artigo 26, estabelece que "é nula de pleno direito a aposta realizada por pessoa diagnosticada com transtorno do jogo patológico".\n\n` +
    `A Requerida, ao não identificar o padrão inequívoco de comportamento compulsivo da parte Autora (depósitos frequentes, uso de múltiplos meios de pagamento, apostas em horários incomuns, empréstimos para sustentar o vício), descumpriu o dever legal de monitoramento imposto pela própria Lei 14.790/2023.\n\n` +
    `Jurisprudência do TJSP (10ª Vara Cível de São Paulo) já reconheceu falha na prestação do serviço por omissão da plataforma em identificar padrão de comportamento compulsivo, admitindo restituição de valores. Em outro caso documentado, casa de apostas foi condenada a devolver R$ 217 mil a consumidora que demonstrou ter recorrido a empréstimos familiares para sustentar o vício.\n\n` +
    `As apostas realizadas pela parte Autora são, portanto, nulas de pleno direito, cabendo a restituição integral dos valores depositados.`,
};

const ARGUMENTOS_CONDICIONAIS = [
  {
    id: "cond_email", label: "Tenho E-mail de Bloqueio + Depósito posterior (Contradição Temporal)",
    texto: (dataFato?: string, horaFato?: string) => `Consta dos autos que, em ${dataFato || "[DATA]"}, a Requerida encaminhou comunicação formal informando que a conta havia sido "imediatamente e definitivamente bloqueada".\n\nTodavia, no mesmo dia, às ${horaFato || "[HORA]"}, o sistema da própria Requerida aceitou novo depósito.\n\nA sequência temporal evidencia que o bloqueio alegado não foi efetivamente implementado, configurando contradição documental que afasta qualquer alegação de boa-fé.`,
  },
  {
    id: "cond_devolucao", label: "A empresa devolveu parte do valor (Confissão Implícita)",
    texto: () => `A Requerida procedeu à devolução parcial do valor, o que demonstra reconhecimento implícito da irregularidade operacional.\n\nContudo, de forma contraditória, limitou-se a restituir apenas parcela, mantendo a retenção do montante principal, configurando enriquecimento sem causa (art. 884, CC).`,
  },
];

// =========================================================================
// 3. COMPONENTES DE UI
// =========================================================================
function TabButton({ active, onClick, icon: Icon, n, label }: any) {
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
        <strong>Isto não é assessoria jurídica.</strong> Não há advogado responsável por este conteúdo — é um serviço de automação de redação para causas de até 20 salários-mínimos (jus postulandi). {!compact && " "}O texto é gerado com apoio de IA e pode conter imprecisões. Revise cada parágrafo, confirme prazos e normas vigentes (especialmente portarias da SPA/MF) e adapte à realidade do seu caso antes de protocolar. {compact && " Em causas acima de 20 salários-mínimos, ou complexas, procure um advogado."}
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

function Field({ label, value, onChange, full, placeholder }: any) {
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
  
  const [petitionCount, setPetitionCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  const [tab, setTab] = useState("perfil");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ackDisclaimer, setAckDisclaimer] = useState(false);
  const [dadosPDF, setDadosPDF] = useState<any>(null);
  const [geradoTexto, setGeradoTexto] = useState("");

  const [perfil, setPerfil] = useState<"generico" | "ludopatia">("generico");

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
    if (dataFato) {
      const d1 = new Date(dataFato);
      const d2 = new Date();
      meses = Math.max(0, (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth()));
    }
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

  // ✅ CORREÇÃO DEFINITIVA DO LOOP - verifica pathname antes de redirecionar
  useEffect(() => {
    if (sessionChecked) return;

    const checkSession = async () => {
      console.log("🔍 Verificando sessão...");
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("❌ Erro ao buscar sessão:", error);
        setSessionChecked(true);
        return;
      }

      console.log("📦 Sessão:", session);

      if (session?.user) {
        console.log("✅ Usuário logado:", session.user.email);
        setUserEmail(session.user.email ?? null);
        setUserId(session.user.id ?? null);

        const { data: usageData, error: usageError } = await supabase
          .from('petition_usage')
          .select('count')
          .eq('user_id', session.user.id)
          .single();

        if (usageError && usageError.code !== 'PGRST116') {
          console.error("Erro ao buscar uso:", usageError);
        }

        if (usageData) {
          setPetitionCount(usageData.count);
          if (usageData.count >= MAX_PETICOES) setLimitReached(true);
        }
      } else {
        console.log("️ Sem sessão, redirecionando para login...");
        // ✅ IMPORTANTE: Só redireciona se NÃO estiver já em /login
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          router.replace("/login");
        }
      }
      
      setSessionChecked(true);
    };

    checkSession();
  }, [sessionChecked, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  function gerarPeticao() {
    if (limitReached || petitionCount >= MAX_PETICOES) {
      alert(`Você atingiu o limite de ${MAX_PETICOES} petições permitidas para sua conta. Entre em contato com o suporte para adquirir mais gerações.`);
      return;
    }

    const valorCausa = calc.total > 0 ? fmt(calc.total) : "[preencher valor da causa]";
    
    const argumentosFinais = [
      ...ARGUMENTOS_UNIVERSAIS.map((a, i) => ({ titulo: `${["II", "III", "IV", "V", "VI", "VII"][i]} — ${a.label.toUpperCase()}`, texto: a.texto() })),
      ...(perfil === "ludopatia" ? [{ titulo: "VIII — NULIDADE DAS APOSTAS POR LUDOPATIA (LEI 14.790/2023, ART. 26)", texto: ARGUMENTO_LUDOPATIA.texto() }] : []),
      ...ARGUMENTOS_CONDICIONAIS.filter((a) => argsCondSel[a.id]).map((a, i) => {
        const numRomano = perfil === "ludopatia" ? ["IX", "X"][i] : ["VIII", "IX"][i];
        return { titulo: `${numRomano} — ${a.label.toUpperCase()}`, texto: a.texto(dataFato, horaFato) };
      }),
    ];

    let textoRoteiro = "";
    if (tentativaChat || tentativaConsumidorGov) {
      textoRoteiro = `A parte Autora, agindo de boa-fé, tentou resolver a questão administrativamente antes de buscar o Judiciário. `;
      if (tentativaChat) textoRoteiro += `Entrou em contato com o suporte da Ré em data anterior, obtendo o protocolo ${protocoloChat || "[NÚMERO]"}, e `;
      if (tentativaConsumidorGov) textoRoteiro += `registrou reclamação formal no Consumidor.gov.br sob o nº ${protocoloConsumidorGov || "[NÚMERO]"}. `;
      textoRoteiro += `A Ré, contudo, limitou-se a oferecer respostas automatizadas e evasivas, invocando supostos 'prazos de adaptação' já desmentidos pela própria autoridade reguladora (SPA/MF), ou simplesmente ignorou a demanda. Tal conduta configura claro Desvio Produtivo do Consumidor.`;
    }

    const pedidos = `Diante do exposto, requer-se:\n\na) a restituição do valor de ${valorCausa}${dobro ? ", em dobro, nos termos do art. 42, parágrafo único, do CDC" : ""}, corrigido monetariamente e acrescido de juros de mora de 1% ao mês desde a data do(s) fato(s);\n\n${danoMoral ? `b) a condenação da Ré ao pagamento de indenização por danos morais, em valor não inferior a ${fmt(parseFloat(valorDanoMoral) || 0)}, observando-se os princípios da proporcionalidade e caráter pedagógico;\n` : ""}c) a inversão do ônus da prova, conforme fundamentado;\n\nd) a citação da parte Ré para, querendo, apresentar contestação, sob pena de revelia.`;

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
    setGeradoTexto(`[VISUALIZAÇÃO EM TEXTO PLANO - BAIXE O PDF PARA A FORMATAÇÃO JURÍDICA COMPLETA]\n\n${dados.enderecamento}\n\n${dados.qualificacao}\n\n${dados.tituloAcao}\n\n${dados.qualificacaoReu}\n\nI — DOS FATOS\n\n${dados.fatos}\n\n[ARGUMENTOS JURÍDICOS INSERIDOS AUTOMATICAMENTE NO PDF]\n\n${dados.onusProva}\n\n${textoRoteiro ? `DO DESVIO PRODUTIVO\n\n${textoRoteiro}\n\n` : ""}DOS PEDIDOS\n\n${dados.pedidos}\n\nDá-se à causa o valor de ${dados.valorCausa}.\n\nNestes termos,\npede deferimento.\n\n${dados.cidadeData}\n\n${dados.autorNome}`);
    setTab("resultado");

    const newCount = petitionCount + 1;
    supabase.from('petition_usage').upsert({ user_id: userId, count: newCount }).then(({ error }) => {
      if (error) console.error("Erro ao salvar uso:", error);
      else {
        setPetitionCount(newCount);
        if (newCount >= MAX_PETICOES) setLimitReached(true);
      }
    });
  }

  function copiar() {
    navigator.clipboard.writeText(geradoTexto);
    alert("Texto copiado para a área de transferência!");
  }

  async function baixarPDF() {
    if (!dadosPDF) return;
    const blob = await pdf(<PeticaoPDF dados={dadosPDF} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const nomeArquivo = autor.nome ? autor.nome.replace(/[^a-zA-Z0-9]/g, '_') : 'Rascunho';
    a.href = url;
    a.download = `Peticao_${nomeArquivo}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const provasMarcadas = Object.values(checked).filter(Boolean).length;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#F2EFE6" }}>
      
      <header className="border-b px-4 py-3 flex items-center justify-between shadow-sm" style={{ backgroundColor: "#FBF9F4", borderColor: "#E4DFD1" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FBF1DD" }}>
            <User size={18} style={{ color: "#8A6D3B" }} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "#3D4C5E" }}>Logado como</p>
            <p className="text-sm font-bold truncate max-w-[200px]" style={{ color: "#1E2A3A" }}>
              {userEmail || "Carregando usuário..."}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border" style={{ borderColor: limitReached ? "#FECACA" : "#E4DFD1", backgroundColor: limitReached ? "#FEF2F2" : "#FFF" }}>
            <FileText size={14} style={{ color: limitReached ? "#991B1B" : SEAL }} />
            <span className="text-xs font-semibold" style={{ color: limitReached ? "#991B1B" : INK }}>
              Petições: {petitionCount}/{MAX_PETICOES}
            </span>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border transition-all hover:bg-red-50"
            style={{ borderColor: "#FECACA", color: "#991B1B" }}
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-1">
          <Scale size={22} style={{ color: SEAL }} />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: INK_SOFT }}>Juizado Especial Cível · Autoexclusão Violada</span>
        </div>
        <h1 className="text-3xl font-semibold mb-1" style={{ color: INK, fontFamily: "Georgia, 'Times New Roman', serif" }}>Gerador de Material Jurídico do Consumidor</h1>
        <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Ferramenta para causas de até 20 salários-mínimos (jus postulandi). Siga as abas na ordem para montar sua petição com argumentos validados.</p>

        <div className="mb-6"><DisclaimerBar /></div>

        {limitReached && (
          <div className="mb-6 p-4 rounded-lg border border-red-300 bg-red-50 text-red-800 text-sm flex items-start gap-3">
            <Lock size={20} className="shrink-0 mt-0.5" />
            <div>
              <strong>Limite de gerações atingido.</strong>
              <p className="mt-1">Sua conta já utilizou as {MAX_PETICOES} petições inclusas no seu plano. Para gerar novas petições, entre em contato com nosso suporte ou adquira um novo pacote.</p>
            </div>
          </div>
        )}

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
                  <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${perfil === "generico" ? "border-[#8A6D3B] bg-[#FBF9F4] ring-2 ring-[#8A6D3B]" : "border-[#E4DFD1] hover:bg-white"}`} onClick={() => setPerfil("generico")}>
                    <input type="radio" checked={perfil === "generico"} onChange={() => setPerfil("generico")} className="mt-1 w-4 h-4" />
                    <div>
                      <span className="text-sm font-bold block" style={{ color: INK }}>Autoexclusão Genérica (Controle Financeiro/Prevenção)</span>
                      <p className="text-xs mt-1" style={{ color: INK_SOFT }}>Foco na quebra de contrato regulatório, falha no dever de bloqueio e responsabilidade objetiva da operadora.</p>
                    </div>
                  </label>

                  <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${perfil === "ludopatia" ? "border-[#8A6D3B] bg-[#FBF9F4] ring-2 ring-[#8A6D3B]" : "border-[#E4DFD1] hover:bg-white"}`} onClick={() => setPerfil("ludopatia")}>
                    <input type="radio" checked={perfil === "ludopatia"} onChange={() => setPerfil("ludopatia")} className="mt-1 w-4 h-4" />
                    <div>
                      <span className="text-sm font-bold block" style={{ color: INK }}>Ludopatia / Saúde Mental (Vulnerabilidade)</span>
                      <p className="text-xs mt-1" style={{ color: INK_SOFT }}>Inclui argumentos sobre nulidade das apostas pela Lei 14.790/2023 (art. 26), consumidor hipervulnerável e jurisprudência real. <strong>Laudo não é obrigatório, mas fortalece muito o caso (obtenha de graça no CAPS).</strong></p>
                    </div>
                  </label>
                </div>

                <button onClick={() => setTab("roteiro")} className="mt-6 inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: INK }}>
                  Próximo: Roteiro Prévio <ChevronRight size={16} />
                </button>
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
                <button onClick={() => setTab("provas")} className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: INK }}>
                  Próximo: Checklist de Provas <ChevronRight size={16} />
                </button>
              </div>
            )}

            {tab === "provas" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold" style={{ color: INK }}>Checklist de Provas</h2>
                  <span className="text-xs font-medium" style={{ color: INK_SOFT }}>{provasMarcadas}/{PROVAS.length} reunidas</span>
                </div>
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
                <button onClick={() => setTab("calculo")} className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: INK }}>
                  Próximo: Calculadora de Valores <ChevronRight size={16} />
                </button>
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
                    <div className="flex items-start gap-2">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <div>
                        <strong>Atenção: Valor acima do limite para Jus Postulandi.</strong>
                        <p className="mt-1">O valor estimado ({fmt(calc.total)}) ultrapassa 20 salários mínimos (R$ {LIMITE_JEC.toLocaleString("pt-BR")}). Procure um advogado ou Defensoria Pública.</p>
                      </div>
                    </div>
                  </div>
                ) : calc.total > 0 ? (
                  <div className="mb-4 p-4 rounded-lg border border-green-300 bg-green-50 text-green-800 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                      <div>
                        <strong>Valor dentro do limite para Jus Postulandi.</strong>
                        <p className="mt-1">O valor estimado ({fmt(calc.total)}) está dentro do limite de 20 salários mínimos para atuação sem advogado no JEC.</p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <button onClick={() => setTab("peticao")} disabled={calc.excedeLimite} className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: INK }}>
                  Próximo: Montar Petição <ChevronRight size={16} />
                </button>
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

                <p className="text-sm font-medium mb-2" style={{ color: INK_SOFT }}>Argumentos Condicionais (Marque apenas se tiver a prova)</p>
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

                <button 
                  onClick={gerarPeticao} 
                  disabled={!ackDisclaimer || limitReached} 
                  className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed" 
                  style={{ backgroundColor: INK }}
                >
                  {limitReached ? "Limite Atingido" : "Gerar Rascunho da Petição"} <ChevronRight size={16} />
                </button>
              </div>
            )}

            {tab === "resultado" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold" style={{ color: INK }}>Rascunho Gerado</h2>
                  <div className="flex gap-2">
                    <button onClick={copiar} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border" style={{ borderColor: PAPER_LINE, color: INK }}>
                      <Copy size={14} /> Copiar Texto
                    </button>
                    <button onClick={baixarPDF} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: INK }}>
                      <Download size={14} /> Baixar PDF Formatado
                    </button>
                  </div>
                </div>
                
                <div className="rounded-lg border p-6 whitespace-pre-wrap text-sm leading-relaxed max-h-[600px] overflow-y-auto mb-4" style={{ backgroundColor: "#FFFDF8", borderColor: PAPER_LINE, color: "#2A2A28", fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  {geradoTexto}
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm">
                  <strong>💡 Dica Profissional:</strong> Clique em <strong>"Baixar PDF Formatado"</strong> para obter o documento com margens, fonte Times New Roman, texto justificado e espaçamento 1.5, pronto para ser impresso ou anexado no PJe.
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}