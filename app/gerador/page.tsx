"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle, Calculator, Download, ChevronRight, Scale,
  AlertCircle, Heart, Lock, Loader2,
} from "lucide-react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { ARGUMENTOS, filtrarPorPerfil, Argumento } from "../lib/argumentos-peticao";

const pdfStyles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Times-Roman", fontSize: 12, lineHeight: 1.5 },
  header: { textAlign: "center", marginBottom: 20, fontSize: 12, fontWeight: "bold", textTransform: "uppercase" },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginTop: 15, marginBottom: 8, textTransform: "uppercase" },
  paragraph: { textAlign: "justify", marginBottom: 10, textIndent: 25 },
  noIndent: { textAlign: "justify", marginBottom: 10 },
  footer: { marginTop: 40, textAlign: "center" },
});

const PeticaoPDF = ({ dados }: { dados: any }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.header}>{dados.enderecamento}</Text>
      <Text style={pdfStyles.noIndent}>{dados.qualificacao}</Text>
      <Text style={{ ...pdfStyles.noIndent, textAlign: "center", fontWeight: "bold", marginVertical: 10 }}>{dados.tituloAcao}</Text>
      <Text style={pdfStyles.noIndent}>{dados.qualificacaoReu}</Text>
      <Text style={pdfStyles.sectionTitle}>I — DOS FATOS</Text>
      <Text style={pdfStyles.paragraph}>{dados.fatos}</Text>
      <Text style={pdfStyles.sectionTitle}>II — DO DIREITO</Text>
      {dados.argumentos.map((arg: any, i: number) => (
        <View key={i}>
          <Text style={{ ...pdfStyles.sectionTitle, fontSize: 11, marginTop: 10 }}>{i + 1}. {arg.titulo}</Text>
          <Text style={pdfStyles.paragraph}>{arg.texto}</Text>
        </View>
      ))}
      <Text style={pdfStyles.sectionTitle}>III — DOS PEDIDOS</Text>
      <Text style={pdfStyles.paragraph}>{dados.pedidos}</Text>
      <Text style={pdfStyles.noIndent}>Dá-se à causa o valor de {dados.valorCausa}.</Text>
      <Text style={pdfStyles.footer}>Nestes termos, pede deferimento.</Text>
      <Text style={{ textAlign: "center", marginTop: 24 }}>{dados.cidadeData}</Text>
      <Text style={{ textAlign: "center", marginTop: 36, fontWeight: "bold" }}>{dados.autorNome}</Text>
      <Text style={{ textAlign: "center", marginTop: 4, fontSize: 10 }}>Parte autora — em causa própria (jus postulandi)</Text>
      <Text style={{ textAlign: "center", marginTop: 16, fontSize: 9 }}>
        Peça elaborada e protocolada pela própria parte, nos termos do art. 9º da Lei nº 9.099/1995. Não há advogado constituído nos autos.
      </Text>
    </Page>
  </Document>
);

const INK = "#0F1C2E";
const SOFT = "#4A5B6E";
const PAPER = "#FAF8F4";
const LINE = "#E6E1D6";
const SEAL = "#1B6B4A";
const MAX_PETICOES = 3;

type Perfil = "autoexclusao" | "ludopatia" | "publicidade" | "saque";

const PERFIS: { id: Perfil; title: string; desc: string; Icon: any }[] = [
  { id: "autoexclusao", title: "Exclusão centralizada furada", desc: "Autoexcluiu e a casa ainda aceitou depósito.", Icon: Lock },
  { id: "ludopatia", title: "Ludopatia / dever de cuidado", desc: "Pedidos de limite ignorados.", Icon: Heart },
  { id: "publicidade", title: "Publicidade após pedir para parar", desc: "Bônus/push depois do opt-out.", Icon: AlertCircle },
  { id: "saque", title: "Saque travado", desc: "Saldo existe, liberação enrolada.", Icon: Calculator },
];

function Field({ label, value, onChange, full }: { label: string; value: string; onChange: (v: string) => void; full?: boolean }) {
  return (
    <label className={`text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="block mb-1 font-medium" style={{ color: SOFT }}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border" style={{ borderColor: LINE }} />
    </label>
  );
}

export default function GeradorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [peticoesUsadas, setPeticoesUsadas] = useState(0);
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
  const disponiveis = filtrarPorPerfil(ARGUMENTOS, perfil);
  const restantes = Math.max(0, MAX_PETICOES - peticoesUsadas);

  async function gerar() {
    if (limitReached || peticoesUsadas >= MAX_PETICOES) {
      alert("Você já usou as 3 petições do seu acesso. Não é possível gerar mais.");
      return;
    }
    if (argsSel.length === 0) return alert("Selecione argumentos.");
    if (relato.trim().length < 40) return alert("Relato obrigatório com os fatos desta pessoa (mín. 40 caracteres). Não copie sentença de terceiro.");
    if (!autor.nome || !reu.nome) return alert("Preencha autor e casa ré.");

    setGenerating(true);
    try {
      const res = await fetch("/api/auth/peticoes", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "increment" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setLimitReached(true);
        setPeticoesUsadas(Number(data.peticoes_usadas) || MAX_PETICOES);
        alert(data.error || "Limite de 3 petições atingido.");
        setGenerating(false);
        return;
      }
      const used = Number(data.peticoes_usadas) || peticoesUsadas + 1;
      setPeticoesUsadas(used);
      setLimitReached(used >= MAX_PETICOES || !!data.limitReached);

      const ctx = { dataFato: dataFato || undefined, dataAutoexclusao: dataAuto || dataFato || undefined, reuNome: reu.nome, valor: calc.base };
      const argumentos = ARGUMENTOS.filter((a) => argsSel.includes(a.id)).map((a) => ({
        titulo: a.label.toUpperCase(),
        texto: a.texto(ctx),
      }));

      const pedidos =
        `Requer-se:\n` +
        (calc.base > 0 ? `a) restituição de ${fmt(calc.base)}${dobro ? ` em dobro (${fmt(calc.comDobro)})` : ""};\n` : "") +
        (danoMoral ? `b) danos morais a arbitrar (parâmetro ${fmt(parseFloat(valorDM) || 0)});\n` : "") +
        `c) inversão do ônus da prova (CDC art. 6º, VIII);\nd) citação da Ré.`;

      const dados = {
        enderecamento: `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE ${(autor.comarca || "[COMARCA]").toUpperCase()} – ${(autor.uf || "[UF]").toUpperCase()}`,
        qualificacao: `${autor.nome}, CPF nº ${autor.cpf || "[CPF]"}, residente e domiciliado(a) em ${autor.endereco || "[ENDEREÇO]"}, vem, por si mesmo(a), em causa própria, com fundamento no art. 9º da Lei nº 9.099/1995 (jus postulandi) e na Lei nº 8.078/1990 (Código de Defesa do Consumidor), propor a presente`,
        tituloAcao: `AÇÃO DE INDENIZAÇÃO POR DANOS MATERIAIS${danoMoral ? " E MORAIS" : ""}`,
        qualificacaoReu: `em face de ${reu.nome}, inscrita no CNPJ sob o nº ${reu.cnpj || "[CNPJ]"}, pelos fatos e fundamentos a seguir expostos.`,
        fatos: relato,
        argumentos,
        pedidos,
        valorCausa: calc.total > 0 ? fmt(calc.total) : "[preencher]",
        autorNome: autor.nome,
        cidadeData: `${autor.comarca || "[CIDADE]"}, ${new Date().toLocaleDateString("pt-BR")}.`,
      };
      setDadosPDF(dados);

      let p = `${dados.enderecamento}\n\n${dados.qualificacao}\n\n${dados.tituloAcao}\n\n${dados.qualificacaoReu}\n\nI — DOS FATOS\n\n${dados.fatos}\n\nII — DO DIREITO\n\n`;
      argumentos.forEach((a, i) => { p += `${i + 1}. ${a.titulo}\n${a.texto}\n\n`; });
      p += `III — DOS PEDIDOS\n\n${dados.pedidos}\n\nDá-se à causa o valor de ${dados.valorCausa}.\n\nNestes termos, pede deferimento.\n\n${dados.cidadeData}\n\n${dados.autorNome}\nParte autora — em causa própria (jus postulandi)\n\nPeça elaborada e protocolada pela própria parte, nos termos do art. 9º da Lei nº 9.099/1995. Não há advogado constituído nos autos.`;
      setTexto(p);
      setTab("resultado");
    } catch (e) {
      console.error(e);
      alert("Erro ao gerar. Tente de novo.");
    } finally {
      setGenerating(false);
    }
  }

  async function baixar() {
    if (!dadosPDF) return;
    const blob = await pdf(<PeticaoPDF dados={dadosPDF} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `peticao-${Date.now()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F0E9" }}>
        <Loader2 className="animate-spin" style={{ color: SEAL }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F3F0E9" }}>
      <header className="border-b px-4 py-3 flex justify-between items-center" style={{ backgroundColor: PAPER, borderColor: LINE }}>
        <div>
          <p className="text-sm font-bold" style={{ color: INK }}>Gerador · peça da causa da pessoa</p>
          {userEmail && <p className="text-[10px]" style={{ color: SOFT }}>{userEmail}</p>}
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{
              borderColor: limitReached ? "#FECACA" : LINE,
              backgroundColor: limitReached ? "#FEF2F2" : "#FFF",
              color: limitReached ? "#991B1B" : SOFT,
            }}
          >
            {peticoesUsadas}/{MAX_PETICOES} petições
          </span>
          <button type="button" onClick={() => router.push("/")} className="text-xs" style={{ color: SOFT }}>Início</button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {limitReached && (
          <div className="flex gap-2 items-start border rounded-lg px-4 py-3 mb-6" style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA" }}>
            <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-600" />
            <p className="text-sm text-red-800">
              <strong>Limite atingido.</strong> Você já gerou as {MAX_PETICOES} petições inclusas no acesso.
              Baixe as que já tem; para novas peças é preciso novo acesso.
            </p>
          </div>
        )}

        <div className="flex gap-2 items-start border rounded-lg px-4 py-3 mb-6" style={{ backgroundColor: "#FBF1DD", borderColor: "#D8B368" }}>
          <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: SEAL }} />
          <p className="text-sm" style={{ color: "#5C4A22" }}>
            <strong>Não é advocacia.</strong> Rascunho para jus postulandi. Até {MAX_PETICOES} petições no acesso.
            Restam <strong>{restantes}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["perfil", "dados", "argumentos", "resultado"].map((id, i) => (
            <button key={id} type="button" onClick={() => setTab(id)} className="px-3 py-1.5 rounded-full text-xs font-semibold border" style={{ borderColor: tab === id ? SEAL : LINE, backgroundColor: tab === id ? SEAL : "#FFF", color: tab === id ? "#FFF" : SOFT }}>
              {i + 1}. {id}
            </button>
          ))}
        </div>

        {tab === "perfil" && (
          <div className="rounded-xl border p-6" style={{ backgroundColor: PAPER, borderColor: LINE }}>
            <h2 className="font-semibold mb-3" style={{ color: INK }}>Qual é a causa desta pessoa?</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {PERFIS.map(({ id, title, desc, Icon }) => (
                <button key={id} type="button" onClick={() => setPerfil(id)} className="text-left flex gap-3 p-4 rounded-xl border" style={{ borderColor: perfil === id ? SEAL : LINE, backgroundColor: perfil === id ? "#E8F5EF" : "#FFF" }}>
                  <Icon size={18} style={{ color: SEAL }} />
                  <div><p className="text-sm font-medium" style={{ color: INK }}>{title}</p><p className="text-xs" style={{ color: SOFT }}>{desc}</p></div>
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setTab("dados")} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: SEAL }}>Continuar <ChevronRight size={16} /></button>
          </div>
        )}

        {tab === "dados" && (
          <div className="rounded-xl border p-6 space-y-3" style={{ backgroundColor: PAPER, borderColor: LINE }}>
            <h2 className="font-semibold" style={{ color: INK }}>Dados da pessoa e da casa</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Nome do autor" value={autor.nome} onChange={(v) => setAutor({ ...autor, nome: v })} />
              <Field label="CPF" value={autor.cpf} onChange={(v) => setAutor({ ...autor, cpf: v })} />
              <Field label="Endereço" value={autor.endereco} onChange={(v) => setAutor({ ...autor, endereco: v })} full />
              <Field label="Comarca" value={autor.comarca} onChange={(v) => setAutor({ ...autor, comarca: v })} />
              <Field label="UF" value={autor.uf} onChange={(v) => setAutor({ ...autor, uf: v })} />
              <Field label="Casa ré" value={reu.nome} onChange={(v) => setReu({ ...reu, nome: v })} />
              <Field label="CNPJ ré" value={reu.cnpj} onChange={(v) => setReu({ ...reu, cnpj: v })} />
              <Field label="Data autoexclusão" value={dataAuto} onChange={setDataAuto} />
              <Field label="Data do fato" value={dataFato} onChange={setDataFato} />
              <Field label="Valor material R$" value={valorPerdido} onChange={setValorPerdido} />
              <Field label="Dano moral sugerido R$" value={valorDM} onChange={setValorDM} />
            </div>
            <label className="flex gap-2 text-sm" style={{ color: INK }}><input type="checkbox" checked={dobro} onChange={(e) => setDobro(e.target.checked)} /> Dobro (CDC art. 42)</label>
            <label className="flex gap-2 text-sm" style={{ color: INK }}><input type="checkbox" checked={danoMoral} onChange={(e) => setDanoMoral(e.target.checked)} /> Danos morais</label>
            <label className="block text-sm">
              <span className="block mb-1 font-medium" style={{ color: SOFT }}>Relato dos fatos desta pessoa (obrigatório)</span>
              <textarea value={relato} onChange={(e) => setRelato(e.target.value)} rows={5} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: LINE }} placeholder="Datas, o que pediu, o que a casa fez, valores..." />
            </label>
            <button type="button" onClick={() => setTab("argumentos")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: SEAL }}>Continuar <ChevronRight size={16} /></button>
          </div>
        )}

        {tab === "argumentos" && (
          <div className="rounded-xl border p-6 space-y-2" style={{ backgroundColor: PAPER, borderColor: LINE }}>
            <h2 className="font-semibold mb-2" style={{ color: INK }}>Argumentos deste tipo</h2>
            <p className="text-xs mb-3" style={{ color: SOFT }}>O texto inclui o nome da ré, datas e valor informados. Cada geração consome 1 das {MAX_PETICOES} petições.</p>
            {disponiveis.map((a: Argumento) => (
              <label key={a.id} className="flex gap-3 text-sm p-3 rounded-lg border cursor-pointer" style={{ borderColor: argsSel.includes(a.id) ? SEAL : LINE, backgroundColor: argsSel.includes(a.id) ? "#E8F5EF" : "#FFF" }}>
                <input type="checkbox" checked={argsSel.includes(a.id)} onChange={() => setArgsSel((p) => p.includes(a.id) ? p.filter((x) => x !== a.id) : [...p, a.id])} style={{ accentColor: SEAL }} />
                <div><p className="font-medium" style={{ color: INK }}>{a.label}</p>{a.dicaProva && <p className="text-xs" style={{ color: SOFT }}>{a.dicaProva}</p>}</div>
              </label>
            ))}
            <label className="flex gap-2 text-sm mt-3" style={{ color: INK }}><input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} /> Li o aviso e vou revisar antes de protocolar</label>
            <button
              type="button"
              disabled={!ack || limitReached || generating}
              onClick={gerar}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
              style={{ backgroundColor: SEAL }}
            >
              {generating ? "Gerando…" : limitReached ? "Limite de 3 atingido" : `Gerar petição (${restantes} restantes)`}
              <Scale size={16} />
            </button>
          </div>
        )}

        {tab === "resultado" && texto && (
          <div className="rounded-xl border p-6 space-y-3" style={{ backgroundColor: PAPER, borderColor: LINE }}>
            <h2 className="font-semibold" style={{ color: INK }}>Rascunho — revise</h2>
            <p className="text-xs" style={{ color: SOFT }}>Usadas: {peticoesUsadas}/{MAX_PETICOES}. Baixe o PDF agora; a cota já foi consumida.</p>
            <pre className="text-xs whitespace-pre-wrap p-4 rounded-lg border max-h-[420px] overflow-auto" style={{ backgroundColor: "#FFF", borderColor: LINE, color: INK }}>{texto}</pre>
            <div className="flex gap-3">
              <button type="button" onClick={baixar} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: SEAL }}><Download size={16} /> PDF</button>
              <button type="button" onClick={() => navigator.clipboard.writeText(texto)} className="px-5 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: LINE, color: INK }}>Copiar</button>
              {!limitReached && (
                <button type="button" onClick={() => { setTab("perfil"); setTexto(""); setDadosPDF(null); setArgsSel([]); }} className="px-5 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: LINE, color: INK }}>
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
