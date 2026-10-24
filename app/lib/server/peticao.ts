import { calcularCausa, fmtBRL, parseBRL } from "../calc";
import { LIMITE_JEC, LIMITE_JUS_POSTULANDI, PERFIS, type Perfil, SALARIO_MINIMO } from "../config";
import { ARGUMENTOS_META, CONDICIONAIS_META, PROVAS_META } from "../argumentos-meta";
import { isCNPJ, isCPF, onlyDigits, UFS } from "../validators";
import { TEXTOS, TITULOS, type CtxArg } from "./argumentos";

export interface PeticaoInput {
  perfil: Perfil;
  autor: { nome: string; cpf: string; endereco: string; comarca: string; uf: string; email?: string; telefone?: string };
  reu: { nome: string; cnpj: string };
  relato: string;
  dataFato: string; // AAAA-MM-DD
  horaFato?: string;
  dataAutoexclusao?: string; // AAAA-MM-DD
  valorPerdido: number;
  valorDevolvido: number;
  dobro: boolean;
  danoMoral: boolean;
  valorDanoMoral: number;
  argumentos: string[];
  condicionais: string[];
  tentativaChat: boolean;
  protocoloChat?: string;
  tentativaConsumidorGov: boolean;
  protocoloConsumidorGov?: string;
  pedirExibicao: boolean;
  provas: string[];
}

export interface PeticaoResultado {
  texto: string;
  valorCausa: number;
  avisos: string[];
}

const str = (x: unknown, max = 4000) => (typeof x === "string" ? x.trim().slice(0, max) : "");
const bool = (x: unknown) => x === true;
const isISO = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
const br = (iso?: string) => (iso && isISO(iso) ? iso.split("-").reverse().join("/") : "");

export function validarEntrada(raw: unknown): { ok: true; data: PeticaoInput } | { ok: false; erros: string[] } {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const erros: string[] = [];

  const perfil = (PERFIS as readonly unknown[]).includes(r.perfil) ? (r.perfil as Perfil) : null;
  if (!perfil) erros.push("Escolha o tipo de caso.");

  const a = (r.autor ?? {}) as Record<string, unknown>;
  const autor = {
    nome: str(a.nome, 160),
    cpf: str(a.cpf, 20),
    endereco: str(a.endereco, 300),
    comarca: str(a.comarca, 80),
    uf: str(a.uf, 2).toUpperCase(),
    email: str(a.email, 160),
    telefone: str(a.telefone, 30),
  };
  if (autor.nome.split(/\s+/).length < 2) erros.push("Informe seu nome completo.");
  if (!isCPF(autor.cpf)) erros.push("CPF inválido.");
  if (autor.endereco.length < 10) erros.push("Informe seu endereço completo.");
  if (!autor.comarca) erros.push("Informe a comarca/cidade.");
  if (!(UFS as readonly string[]).includes(autor.uf)) erros.push("UF inválida.");

  const rr = (r.reu ?? {}) as Record<string, unknown>;
  const reu = { nome: str(rr.nome, 160), cnpj: str(rr.cnpj, 20) };
  if (reu.nome.length < 3) erros.push("Informe o nome da casa de apostas (ré).");
  if (!isCNPJ(reu.cnpj)) erros.push("CNPJ da ré inválido.");

  const relato = str(r.relato, 8000);
  if (relato.length < 60) erros.push("O relato dos fatos está curto demais (mínimo ~60 caracteres). Conte o que aconteceu, com datas.");

  const dataFato = str(r.dataFato, 10);
  if (!isISO(dataFato)) erros.push("Informe a data do fato.");
  else if (Date.parse(dataFato) > Date.now()) erros.push("A data do fato não pode ser futura.");

  const dataAutoexclusao = str(r.dataAutoexclusao, 10);
  if (perfil === "autoexclusao" && !isISO(dataAutoexclusao)) erros.push("Informe a data da autoexclusão.");

  const valorPerdido = parseBRL(r.valorPerdido as string | number | null);
  if (valorPerdido <= 0) erros.push("Informe o valor envolvido (R$).");

  const valorDevolvido = parseBRL(r.valorDevolvido as string | number | null);
  if (valorDevolvido > valorPerdido * (r.dobro === true ? 2 : 1)) erros.push("O valor já devolvido não pode passar do valor envolvido.");
  if (perfil === "autoexclusao" && isISO(dataAutoexclusao) && isISO(dataFato) && Date.parse(dataFato) < Date.parse(dataAutoexclusao))
    erros.push("A data do fato é anterior à data da autoexclusão: no caso de autoexclusão violada, o depósito/aposta vem depois do pedido.");

  const idsArg = new Set(ARGUMENTOS_META.filter((x) => perfil && x.perfis.includes(perfil)).map((x) => x.id));
  const argumentos = (Array.isArray(r.argumentos) ? r.argumentos : []).filter((x: unknown): x is string => typeof x === "string" && idsArg.has(x));
  if (argumentos.length === 0) erros.push("Selecione ao menos um argumento.");

  const idsCond = new Set(CONDICIONAIS_META.filter((x) => perfil && x.perfis.includes(perfil)).map((x) => x.id));
  const condicionais = (Array.isArray(r.condicionais) ? r.condicionais : []).filter((x: unknown): x is string => typeof x === "string" && idsCond.has(x));

  const idsProva = new Set(PROVAS_META.map((p) => p.id));
  const provas = (Array.isArray(r.provas) ? r.provas : []).filter((x: unknown): x is string => typeof x === "string" && idsProva.has(x));

  if (erros.length || !perfil) return { ok: false, erros };

  return {
    ok: true,
    data: {
      perfil,
      autor,
      reu,
      relato,
      dataFato,
      horaFato: str(r.horaFato, 5),
      dataAutoexclusao: isISO(dataAutoexclusao) ? dataAutoexclusao : undefined,
      valorPerdido,
      valorDevolvido,
      dobro: bool(r.dobro),
      danoMoral: bool(r.danoMoral),
      valorDanoMoral: parseBRL(r.valorDanoMoral as string | number | null),
      argumentos,
      condicionais,
      tentativaChat: bool(r.tentativaChat),
      protocoloChat: str(r.protocoloChat, 60),
      tentativaConsumidorGov: bool(r.tentativaConsumidorGov),
      protocoloConsumidorGov: str(r.protocoloConsumidorGov, 60),
      pedirExibicao: bool(r.pedirExibicao),
      provas,
    },
  };
}

const ROMANOS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];

export function montarPeticao(i: PeticaoInput): PeticaoResultado {
  const avisos: string[] = [];
  const causa = calcularCausa({
    valor: i.valorPerdido,
    devolvido: i.valorDevolvido,
    dataFato: i.dataFato,
    dobro: i.dobro,
    danoMoral: i.danoMoral,
    valorDanoMoral: i.valorDanoMoral,
  });
  if (causa.foraDoJec) avisos.push(`O valor da causa (${fmtBRL(causa.valorCausa)}) passa de 40 salários mínimos (${fmtBRL(LIMITE_JEC)}): fora da competência do Juizado Especial.`);
  else if (causa.precisaAdvogado) avisos.push(`O valor da causa (${fmtBRL(causa.valorCausa)}) passa de 20 salários mínimos (${fmtBRL(LIMITE_JUS_POSTULANDI)}): para protocolar no Juizado é preciso advogado ou Defensoria.`);

  if (i.argumentos.includes("nulidade_art26") && !i.provas.includes("laudo"))
    avisos.push("Você marcou a nulidade por ludopatia, mas não marcou o laudo nas provas. Sem laudo de profissional de saúde mental esse argumento tende a cair.");
  if (i.perfil === "autoexclusao" && !i.provas.includes("autoexclusao"))
    avisos.push("Anexe o comprovante da autoexclusão: sem ele o argumento central fica sem prova.");
  if (!i.provas.includes("comprovante")) avisos.push("Anexe o comprovante bancário do valor (Pix/cartão/boleto).");
  if (i.perfil === "autoexclusao" && i.dataAutoexclusao && Date.parse(i.dataFato) - Date.parse(i.dataAutoexclusao) < 3 * 86_400_000)
    avisos.push("O fato ocorreu em menos de 72h da autoexclusão. A casa tem esse prazo para bloquear o acesso (IN SPA/MF 31/2025), então a tese fica fraca. Só siga se houver outro fundamento forte.");
  if (i.argumentos.includes("sigap_prazo") && Date.parse(i.dataFato) < Date.parse("2025-12-11"))
    avisos.push("O argumento do prazo de 30 dias do Sigap só vale para fatos a partir de 11/12/2025 (o prazo terminou em 10/12/2025). Desmarque-o para esta data.");
  if (i.argumentos.includes("sigap_prazo"))
    avisos.push("Atenção: a tese do prazo de 30 dias da IN SPA/MF 31/2025 ainda é disputada. Há sentença que adotou prazo maior (90 dias) e o recurso está pendente. A petição já rebate isso, mas o juiz pode decidir de outro modo.");
  if (i.perfil !== "autoexclusao" && Date.now() - Date.parse(i.dataFato) > 3 * 365 * 86_400_000)
    avisos.push("O fato tem mais de 3 anos. A restituição por enriquecimento sem causa prescreve em 3 anos (art. 206, § 3º, IV, do Código Civil), e a casa pode alegar isso. Explique na petição por que o prazo não correu ou se aplica outro prazo.");
  if (i.valorDevolvido > 0)
    avisos.push("Você informou valor já devolvido: a petição pede só o saldo e reforça o dano moral. Se tudo foi devolvido, o foco do pedido passa a ser o dano moral.");
  if (i.dobro) avisos.push("Restituição em dobro (art. 42, parágrafo único, do CDC) exige cobrança indevida e má-fé/engano injustificável: pedido mais difícil. Considere desmarcar se o valor já foi devolvido.");

  const dataFatoBR = br(i.dataFato);
  const ctx: CtxArg = { dataFato: dataFatoBR, dataAutoexclusao: br(i.dataAutoexclusao), valor: i.valorPerdido, devolvido: i.valorDevolvido, perfil: i.perfil };
  const blocos: string[] = [];
  let n = 0;
  const titulo = (t: string) => `${ROMANOS[n++] ?? n} — ${t}`;

  const { autor, reu } = i;
  const contato = [autor.email && `e-mail ${autor.email}`, autor.telefone && `telefone ${autor.telefone}`].filter(Boolean).join(", ");

  blocos.push(
    `[[CENTRO]]EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE ${autor.comarca.toUpperCase()} – ${autor.uf}`,
    `${autor.nome.toUpperCase()}, inscrito(a) no CPF sob o nº ${autor.cpf}, residente e domiciliado(a) em ${autor.endereco}${contato ? `, ${contato}` : ""}, vem, respeitosamente, com fundamento nos arts. 3º e 9º da Lei nº 9.099/95 e na Lei nº 8.078/90 (Código de Defesa do Consumidor), propor a presente`,
    `[[CENTRO]]AÇÃO DE ${i.perfil === "ludopatia" ? "RESTITUIÇÃO DE VALORES" : "INDENIZAÇÃO"} POR DANOS MATERIAIS${i.danoMoral ? " E MORAIS" : ""}`,
    `em face de ${reu.nome.toUpperCase()}, pessoa jurídica inscrita no CNPJ sob o nº ${reu.cnpj}, pelos fatos e fundamentos a seguir expostos.`,
  );

  // Fatos
  let fatos = i.relato;
  const fatoCab: string[] = [];
  if (i.dataAutoexclusao && i.perfil === "autoexclusao") fatoCab.push(`autoexclusão centralizada formalizada em ${br(i.dataAutoexclusao)}`);
  fatoCab.push(`fato principal em ${dataFatoBR}${i.horaFato ? `, às ${i.horaFato}` : ""}`);
  fatoCab.push(`valor envolvido de ${fmtBRL(i.valorPerdido)}`);
  fatos = `${fatos}\n\nResumo cronológico: ${fatoCab.join("; ")}.`;
  blocos.push(titulo("DOS FATOS"), fatos);

  // Competência
  blocos.push(
    titulo("DA COMPETÊNCIA E DO JUS POSTULANDI"),
    (causa.precisaAdvogado
      ? `A causa é de menor complexidade e seu valor, ${fmtBRL(causa.valorCausa)}, não excede o limite de 40 (quarenta) salários mínimos (art. 3º, I, da Lei nº 9.099/95). `
      : `A causa é de menor complexidade e seu valor, ${fmtBRL(causa.valorCausa)}, não excede o limite de 20 (vinte) salários mínimos (${fmtBRL(SALARIO_MINIMO * 20)}), dispensando a assistência de advogado (art. 9º, caput, da Lei nº 9.099/95). `) +
      `O Juizado Especial Cível é competente por se tratar de ação de reparação de dano ajuizada no domicílio do autor ou no local do fato (art. 4º, III, da Lei nº 9.099/95), em relação de consumo (art. 101, I, do CDC).`,
  );

  // Consumo
  blocos.push(
    titulo("DA RELAÇÃO DE CONSUMO E DA INVERSÃO DO ÔNUS DA PROVA"),
    "A parte Autora é destinatária final dos serviços prestados pela Requerida, que os fornece mediante remuneração, aplicando-se o Código de Defesa do Consumidor (arts. 2º e 3º). " +
      "Presentes a verossimilhança das alegações e a hipossuficiência técnica do consumidor, requer-se a inversão do ônus da prova (art. 6º, VIII, do CDC), cabendo à Requerida exibir os registros de acesso, autoexclusão e movimentação financeira.",
  );

  if (i.perfil === "autoexclusao")
    blocos.push(
      titulo("DA TEMPESTIVIDADE"),
      "A pretensão decorre de falha na prestação de serviço (fato do serviço) e a presente ação é proposta dentro do prazo prescricional de 5 (cinco) anos previsto no art. 27 do Código de Defesa do Consumidor, contado do conhecimento do dano e de sua autoria.",
    );

  // Argumentos em ordem lógica
  const ORDEM = [
    "nao_mero_descumprimento", "autoexclusao_descumprida", "sigap_prazo", "deposito_pos_bloqueio", "acesso_nao_bloqueado",
    "nao_exige_laudo_autoexclusao", "saldo_nao_restituido", "retencao_enriquecimento", "nulidade_art26", "dever_jogo_responsavel",
    "hipervulnerabilidade", "fortuito_interno", "premio_nao_pago_falha", "conta_bloqueada_sem_justa_causa", "rollover_abusivo", "publicidade_enganosa"
  ];
  const pos = (id: string) => (ORDEM.includes(id) ? ORDEM.indexOf(id) : ORDEM.length);
  const principais = i.argumentos.filter((id) => id !== "dano_moral_falha").sort((a, b) => pos(a) - pos(b));
  const finais = [...i.condicionais, ...i.argumentos.filter((id) => id === "dano_moral_falha")];
  for (const id of [...principais, ...finais]) {
    const fn = TEXTOS[id];
    if (fn) blocos.push(titulo(TITULOS[id] ?? id.toUpperCase()), fn(ctx));
  }

  // Desvio produtivo
  if (i.tentativaChat || i.tentativaConsumidorGov) {
    let t = "A parte Autora tentou resolver a questão administrativamente antes de acionar o Judiciário. ";
    if (i.tentativaChat) t += `Contatou o suporte da Requerida sob o protocolo ${i.protocoloChat || "[NÚMERO]"}. `;
    if (i.tentativaConsumidorGov) t += `Registrou reclamação em canal de defesa do consumidor sob o nº ${i.protocoloConsumidorGov || "[NÚMERO]"}. `;
    t += "A Requerida ofereceu respostas evasivas ou nenhuma solução, obrigando o consumidor a desperdiçar tempo e recursos que deveriam ser dedicados a atividades existenciais, o que configura desvio produtivo do consumidor e reforça o dever de indenizar.";
    blocos.push(titulo("DO DESVIO PRODUTIVO E DA TENTATIVA PRÉVIA DE SOLUÇÃO"), t);
  }

  // Pedidos
  const itens: string[] = [];
  const letra = () => String.fromCharCode(97 + itens.length);
  itens.push(`${letra()}) a citação da Requerida, para comparecer à audiência de conciliação e, querendo, apresentar defesa, sob pena de revelia (art. 20 da Lei nº 9.099/95);`);
  if (causa.restituicao > 0) {
    const dev = i.valorDevolvido > 0 ? `, já abatido o valor de ${fmtBRL(i.valorDevolvido)} devolvido pela Requerida` : "";
    itens.push(
      `${letra()}) a condenação da Requerida à restituição de ${fmtBRL(causa.restituicao)}${i.dobro ? `, em dobro, nos termos do art. 42, parágrafo único, do CDC` : ""}${dev}, com correção monetária desde o desembolso (Súmula 43 do STJ) e juros de mora legais desde a citação (art. 405 do Código Civil);`,
    );
  } else if (i.valorDevolvido > 0) {
    itens.push(`${letra()}) o reconhecimento de que a restituição de ${fmtBRL(i.valorDevolvido)} só ocorreu após o descumprimento e a provocação da parte Autora, sem afastar o dever de indenizar;`);
  }
  if (i.danoMoral && i.valorDanoMoral > 0)
    itens.push(`${letra()}) a condenação da Requerida ao pagamento de indenização por danos morais no valor de ${fmtBRL(i.valorDanoMoral)}, ou outro valor que Vossa Excelência entender justo, com correção monetária a partir do arbitramento (Súmula 362 do STJ) e juros de mora legais desde a citação;`);
  itens.push(`${letra()}) a inversão do ônus da prova, na forma do art. 6º, VIII, do CDC;`);
  if (i.pedirExibicao)
    itens.push(`${letra()}) a determinação para que a Requerida exiba, no prazo que for fixado, os registros de autoexclusão, bloqueio, acesso, depósitos e movimentações da conta vinculada ao CPF da parte Autora (arts. 396 e seguintes do CPC);`);
  itens.push(`${letra()}) a produção de todas as provas em direito admitidas, em especial a documental.`);

  blocos.push(titulo("DOS PEDIDOS"), "Diante do exposto, requer:", ...itens);
  blocos.push(`Dá-se à causa o valor de ${fmtBRL(causa.valorCausa)}.`);

  // Documentos
  const anexos = PROVAS_META.filter((p) => i.provas.includes(p.id));
  if (anexos.length) {
    blocos.push(titulo("DOS DOCUMENTOS"), "Instruem a presente petição os seguintes documentos:", ...anexos.map((p, k) => `Doc. ${String(k + 1).padStart(2, "0")} — ${p.anexo}`));
  }

  const hoje = new Date().toLocaleDateString("pt-BR");
  blocos.push(
    "[[CENTRO]]Nestes termos, pede deferimento.",
    `[[CENTRO]]${autor.comarca}/${autor.uf}, ${hoje}.`,
    `[[ASSINATURA]]${autor.nome}\nCPF ${autor.cpf}`,
  );

  return { texto: blocos.join("\n\n"), valorCausa: causa.valorCausa, avisos };
}

export const chaveCaso = (i: PeticaoInput) => `${onlyDigits(i.autor.cpf)}|${onlyDigits(i.reu.cnpj)}`;
