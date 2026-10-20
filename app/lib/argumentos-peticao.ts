// ============================================================
// Argumentos de petição — casos reais + regulação SPA/MF + CDC
// Personalizados por perfil e dados do autor (não genéricos).
// ============================================================

export type PerfilCaso = "autoexclusao" | "ludopatia" | "publicidade" | "saque";

export interface CtxArg {
  dataFato?: string;
  dataAutoexclusao?: string;
  reuNome?: string;
  valor?: number;
}

export interface Argumento {
  id: string;
  perfis: PerfilCaso[];
  label: string;
  texto: (ctx?: CtxArg) => string;
  dicaProva?: string;
}

export interface PedidoEspecial {
  id: string;
  perfis: PerfilCaso[];
  label: string;
  texto: () => string;
}

export interface DadosPeticao {
  perfil: PerfilCaso;
  autor: { nome: string; cpf: string; endereco: string; comarca: string; uf: string };
  reu: { nome: string; cnpj: string };
  relato: string;
  dataFato?: string;
  dataAutoexclusao?: string;
  argumentosSelecionados: string[];
  pedidosSelecionados: string[];
  danoMoral: boolean;
  dobro: boolean;
  valorBase: number;
  valorCausa: number;
}

function reu(ctx?: CtxArg) {
  return ctx?.reuNome?.trim() || "a parte Ré";
}

function fmtValor(v?: number) {
  if (v == null || Number.isNaN(v) || v <= 0) return null;
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export const ARGUMENTOS: Argumento[] = [
  {
    id: "nao_mero_arrependimento",
    perfis: ["autoexclusao"],
    label: "Não é arrependimento de aposta perdida",
    texto: (ctx) =>
      `Esclarece-se, desde logo, que a presente demanda não decorre de mero arrependimento por perdas em apostas regularmente realizadas. O núcleo da controvérsia é o descumprimento, por ${reu(ctx)}, de obrigação regulatória do setor de apostas de quota fixa: a falha no sistema de autoexclusão, com manutenção indevida de conta ativa e aceitação de depósito(s) e/ou aposta(s) após a formalização da autoexclusão pela parte Autora perante a plataforma centralizada do Ministério da Fazenda (SPA/MF).`,
    dicaProva: "No relato, fixe a data da autoexclusão e a data do depósito posterior.",
  },
  {
    id: "autoexclusao_centralizada",
    perfis: ["autoexclusao"],
    label: "Autoexclusão centralizada (SPA/MF)",
    texto: (ctx) => {
      const d = ctx?.dataAutoexclusao || ctx?.dataFato;
      return `A parte Autora registrou autoexclusão centralizada no Sistema Centralizado de Autoexclusão de Apostas da Secretaria de Prêmios e Apostas do Ministério da Fazenda${d ? ` em ${d}` : ""}, por prazo indeterminado, com fundamento na Portaria SPA/MF nº 1.231/2024 e na Instrução Normativa SPA/MF nº 31/2025. O mecanismo existe para impedir cadastro, acesso e novas apostas junto aos agentes operadores autorizados — inclusive ${reu(ctx)}.`;
    },
    dicaProva: "Anexe comprovante/protocolo da autoexclusão centralizada.",
  },
  {
    id: "deposito_apos_autoexclusao",
    perfis: ["autoexclusao"],
    label: "Depósito/aposta depois da autoexclusão",
    texto: (ctx) => {
      const d = ctx?.dataFato;
      const v = fmtValor(ctx?.valor);
      return `Apesar da autoexclusão regularmente registrada, ${reu(ctx)} permitiu acesso à plataforma, depósito e/ou realização de apostas${d ? ` (fato em ${d})` : ""}${v ? `, envolvendo valor da ordem de ${v}` : ""}. Essa conduta viola o dever de jogo responsável e configura falha na prestação do serviço, nos termos do art. 14 do Código de Defesa do Consumidor.`;
    },
    dicaProva: "Prints de depósito, extrato e PIX após a data da autoexclusão.",
  },
  {
    id: "cdc_art14_objetivo",
    perfis: ["autoexclusao", "ludopatia", "publicidade", "saque"],
    label: "Responsabilidade objetiva (CDC art. 14)",
    texto: (ctx) =>
      `A relação entre as partes é de consumo. Nos termos do art. 14 do CDC, o fornecedor de serviços responde, independentemente de culpa, pela reparação dos danos causados por defeitos relativos à prestação dos serviços. Eventual alegação de "erro pontual" de sistema por ${reu(ctx)} não afasta a responsabilidade: trata-se de risco inerente à atividade econômica (fortuito interno).`,
    dicaProva: "Argumento central em sentença do 4º JEC de Teresina/PI em caso análogo de autoexclusão.",
  },
  {
    id: "recusa_estorno_suporte",
    perfis: ["autoexclusao", "saque"],
    label: "Suporte recusou estorno ou exigiu laudo",
    texto: (ctx) =>
      `Ao solicitar o estorno ou a liberação dos valores, a parte Autora foi informada por ${reu(ctx)} de que nada seria restituído sob o argumento de que o montante "havia sido utilizado", e/ou teve a análise condicionada à apresentação de laudo médico de ludopatia. A autoexclusão centralizada e o dever de informação/boa-fé são institutos autônomos e não dependem de laudo médico, perícia ou interdição civil para produzir efeitos.`,
    dicaProva: "Anexe prints do chat de suporte (protocolo, data e texto).",
  },
  {
    id: "nao_exige_laudo_autoexclusao",
    perfis: ["autoexclusao"],
    label: "Autoexclusão não depende de laudo médico",
    texto: () =>
      `A proteção decorrente da autoexclusão centralizada ou específica não exige laudo médico. Condicionar o estorno ou o bloqueio à prova de transtorno de jogo patológico confunde institutos distintos e agrava a vulnerabilidade do consumidor que já acionou o mecanismo de proteção.`,
    dicaProva: "Use se o suporte pediu 'laudo de ludopatia' para analisar o caso.",
  },
  {
    id: "dano_moral_autoexclusao",
    perfis: ["autoexclusao"],
    label: "Dano moral pela frustração da autoexclusão",
    texto: (ctx) =>
      `A autoexclusão é mecanismo de proteção destinado a impedir que o usuário continue apostando. Sua frustração por falha de ${reu(ctx)} gera abalo extrapatrimonial indenizável, ainda que valores materiais tenham sido depois parcialmente restituídos. A restituição do numerário não descaracteriza a violação já consumada nem elimina, por si só, a repercussão moral decorrente da quebra da expectativa legítima de proteção.`,
    dicaProva: "Sentença análoga arbitrando danos morais por autoexclusão violada (JEC).",
  },
  {
    id: "ludopatia_dever_cuidado",
    perfis: ["ludopatia"],
    label: "Ludopatia e dever de cuidado da operadora",
    texto: (ctx) =>
      `A parte Autora apresentou à ${reu(ctx)} sinais e/ou comunicação de perda de controle sobre o jogo (pedidos de limite, bloqueio, pausa ou padrão de depósitos repetidos incompatível com uso recreativo). Nesses casos, o fornecedor tem dever reforçado de cuidado e de jogo responsável. A manutenção de estímulos comerciais e a facilitação de novos aportes, diante de tal quadro, agravam a falha na prestação do serviço.`,
    dicaProva: "Mensagens pedindo limite/bloqueio; histórico de depósitos; laudo se existir.",
  },
  {
    id: "hipervulnerabilidade",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Consumidor hipervulnerável",
    texto: () =>
      `A parte Autora, ao registrar autoexclusão motivada por perda de controle sobre o jogo e/ou ao apresentar elementos de vulnerabilidade psíquica relacionada às apostas, deve ser reconhecida como consumidor em situação de hipervulnerabilidade, atraindo proteção reforçada do CDC e das normas de jogo responsável da SPA/MF.`,
    dicaProva: "Útil quando há padrão compulsivo documentado ou laudo.",
  },
  {
    id: "publicidade_pos_optout",
    perfis: ["publicidade"],
    label: "Publicidade após pedido para parar",
    texto: (ctx) => {
      const d = ctx?.dataFato;
      return `A parte Autora solicitou a ${reu(ctx)} a cessação de contatos promocionais e/ou o encerramento da relação de estímulo ao jogo${d ? ` (pedido em ${d})` : ""}. Não obstante, continuou a receber ofertas de bônus, push, SMS ou e-mail marketing. Tal conduta contraria a boa-fé objetiva (CDC arts. 4º e 6º) e o dever de respeito à vontade de não ser mais alvo de publicidade de apostas.`;
    },
    dicaProva: "Print do pedido de opt-out + prints das ofertas posteriores com data.",
  },
  {
    id: "publicidade_agressiva",
    perfis: ["publicidade", "ludopatia"],
    label: "Estímulo comercial abusivo",
    texto: (ctx) =>
      `A estratégia comercial de ${reu(ctx)} — bônus de recarga, notificações insistentes e facilidade extrema de depósito — potencializa o risco de superendividamento e de reincidência no jogo, em descompasso com o dever de informação clara e de jogo responsável exigido da operadora autorizada.`,
    dicaProva: "Prints de bônus/push e frequência das mensagens.",
  },
  {
    id: "saque_recusado",
    perfis: ["saque"],
    label: "Saque recusado ou injustificadamente travado",
    texto: (ctx) => {
      const v = fmtValor(ctx?.valor);
      const d = ctx?.dataFato;
      return `A parte Autora detinha saldo disponível junto a ${reu(ctx)}${v ? ` (cerca de ${v})` : ""} e formulou pedido(s) de saque${d ? ` a partir de ${d}` : ""}, os quais foram recusados, retidos sem justificativa legítima ou condicionados a exigências desproporcionais. A retenção indevida de valores do consumidor configura falha na prestação do serviço e ofensa à boa-fé objetiva.`;
    },
    dicaProva: "Print do saldo, pedidos de saque e respostas do suporte.",
  },
  {
    id: "saque_demora_abusiva",
    perfis: ["saque"],
    label: "Demora abusiva no saque",
    texto: (ctx) =>
      `A demora reiterada de ${reu(ctx)} em processar o saque, sem informação clara de prazo e motivo, gera desvio produtivo do consumidor e pode caracterizar dano moral quando ultrapassa o razoável e obriga o usuário a múltiplas reclamações infrutíferas.`,
    dicaProva: "Linha do tempo: data do pedido × data da liberação (ou ausência dela).",
  },
  {
    id: "inversao_onus",
    perfis: ["autoexclusao", "ludopatia", "publicidade", "saque"],
    label: "Inversão do ônus da prova (CDC)",
    texto: () =>
      `Requer-se a inversão do ônus da prova, nos termos do art. 6º, VIII, do CDC, cabendo à parte Ré demonstrar o cumprimento efetivo das obrigações de bloqueio, informação, processamento de saque e respeito à vontade do consumidor, conforme o caso.`,
    dicaProva: "Peça padrão em relações de consumo.",
  },
];

export const PEDIDOS_ESPECIAIS: PedidoEspecial[] = [
  {
    id: "oficio_spa",
    perfis: ["autoexclusao", "ludopatia", "publicidade", "saque"],
    label: "Ofício à SPA/MF",
    texto: () =>
      `a expedição de ofício à Secretaria de Prêmios e Apostas do Ministério da Fazenda para ciência dos fatos, sem prejuízo de provocação administrativa pelo interessado perante a SPA e o Consumidor.gov.br`,
  },
  {
    id: "obrigacao_cessar_publicidade",
    perfis: ["publicidade"],
    label: "Obrigação de cessar publicidade",
    texto: () =>
      `a condenação da parte Ré a abster-se de enviar à parte Autora comunicações promocionais relativas a apostas, sob pena de multa diária a ser arbitrada pelo Juízo`,
  },
  {
    id: "obrigacao_liberar_saque",
    perfis: ["saque"],
    label: "Obrigação de liberar saque",
    texto: () =>
      `a condenação da parte Ré a processar e concluir o saque dos valores de titularidade da parte Autora, no prazo a ser fixado pelo Juízo, sob pena de multa`,
  },
];

export function filtrarPorPerfil(
  perfilOrArgs: PerfilCaso | Argumento[],
  perfilMaybe?: PerfilCaso
): Argumento[] {
  if (Array.isArray(perfilOrArgs)) {
    const perfil = perfilMaybe || "autoexclusao";
    return perfilOrArgs.filter((a) => a.perfis.includes(perfil));
  }
  return ARGUMENTOS.filter((a) => a.perfis.includes(perfilOrArgs));
}

export function filtrarPedidosPorPerfil(perfil: PerfilCaso): PedidoEspecial[] {
  return PEDIDOS_ESPECIAIS.filter((p) => p.perfis.includes(perfil));
}

export function gerarPeticao(dados: DadosPeticao): string {
  const ctx: CtxArg = {
    dataFato: dados.dataFato,
    dataAutoexclusao: dados.dataAutoexclusao,
    reuNome: dados.reu.nome,
    valor: dados.valorBase,
  };
  const args = ARGUMENTOS.filter((a) => dados.argumentosSelecionados.includes(a.id));
  const pedidosEsp = PEDIDOS_ESPECIAIS.filter((p) => dados.pedidosSelecionados.includes(p.id));

  const corpoArgs = args.map((a, i) => `${i + 1}. ${a.texto(ctx)}`).join("\n\n");

  const listaPedidos = [
    dados.valorBase > 0
      ? `a condenação da parte Ré à restituição/repetição do indébito no valor de R$ ${dados.valorBase.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}${dados.dobro ? ", em dobro, nos termos do art. 42, parágrafo único, do CDC, se cabível" : ""}`
      : null,
    dados.danoMoral
      ? `a condenação da parte Ré ao pagamento de indenização por danos morais em valor a ser arbitrado pelo Juízo`
      : null,
    ...pedidosEsp.map((p) => p.texto()),
    `a inversão do ônus da prova, nos termos do art. 6º, VIII, do CDC, se necessário à solução da controvérsia`,
  ]
    .filter(Boolean)
    .map((t, i) => `${i + 1}) ${t};`)
    .join("\n");

  return `AO JUÍZO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE ${dados.autor.comarca.toUpperCase()} – ${dados.autor.uf}

${dados.autor.nome}, CPF ${dados.autor.cpf}, residente em ${dados.autor.endereco}, vem, com fundamento nos arts. 3º e 14 da Lei nº 9.099/1995 e na Lei nº 8.078/1990 (CDC), propor

AÇÃO DE REPARAÇÃO DE DANOS MATERIAIS E MORAIS

em face de ${dados.reu.nome}, CNPJ ${dados.reu.cnpj}, pelos fatos e fundamentos a seguir.

1. SÍNTESE DOS FATOS

${dados.relato}

2. DO DIREITO

${corpoArgs || "(Selecione os argumentos aplicáveis ao seu caso.)"}

3. DOS PEDIDOS

Ante o exposto, requer:

${listaPedidos}

Dá-se à causa o valor de R$ ${dados.valorCausa.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}.

Nestes termos, pede deferimento.

${dados.autor.comarca}/${dados.autor.uf}, data da geração.

${dados.autor.nome}

— Documento gerado pelo RecuperaJogo (software). Revise antes de protocolar. Não constitui assessoria jurídica. Não reproduz sentença de terceiros como se fosse o seu caso.`;
}
