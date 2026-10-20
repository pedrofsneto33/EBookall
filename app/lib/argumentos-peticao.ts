// ============================================================
// Argumentos de petição — base jurídica SPA/MF + CDC + Lei 14.790/2023
// Fontes: FAQ SPA/MF; Portaria 1.231/2024; Portaria 2.579/2025; IN 31/2025.
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
      `Esclarece-se, desde logo, que a presente demanda não decorre de mero arrependimento por perdas em apostas regularmente realizadas. O núcleo da controvérsia é o descumprimento, por ${reu(ctx)}, de obrigação regulatória específica do setor de apostas de quota fixa (Lei nº 14.790/2023 e Portaria SPA/MF nº 1.231/2024): a falha no sistema de autoexclusão, com manutenção indevida de conta ativa e aceitação de depósito(s) e/ou aposta(s) após a formalização da autoexclusão pela parte Autora perante a plataforma centralizada da Secretaria de Prêmios e Apostas do Ministério da Fazenda (SPA/MF).`,
    dicaProva: "No relato, fixe a data da autoexclusão e a data do depósito posterior.",
  },
  {
    id: "autoexclusao_centralizada",
    perfis: ["autoexclusao"],
    label: "Autoexclusão centralizada — natureza e eficácia",
    texto: (ctx) => {
      const d = ctx?.dataAutoexclusao || ctx?.dataFato;
      return `A parte Autora registrou autoexclusão centralizada na plataforma mantida pela SPA/MF${d ? ` em ${d}` : ""}, por prazo determinado ou indeterminado, nos termos do art. 2º, XXIII, da Portaria SPA/MF nº 1.231/2024 (com a redação dada pela Portaria SPA/MF nº 2.579/2025). Trata-se de mecanismo de proteção ao apostador que impede o cadastro e a participação em todos os agentes operadores autorizados. A autoexclusão centralizada não se confunde com a autoexclusão específica (feita apenas em um operador): seus efeitos alcançam todo o mercado regulado. A plataforma é serviço público gratuito, com autenticação Gov.br, conforme orientações oficiais da SPA/MF.`;
    },
    dicaProva: "Anexe comprovante/protocolo da autoexclusão centralizada (Gov.br/SPA).",
  },
  {
    id: "prazo_30_vs_90",
    perfis: ["autoexclusao"],
    label: "Prazo de 30 dias (IN 31) ≠ prazo de 90 dias (Portaria 2.579)",
    texto: (ctx) =>
      `Eventual alegação de ${reu(ctx)} no sentido de que dispunha de "prazo de 90 dias" para adequação não se confunde com o dever de bloquear quem já está na base de autoexclusão centralizada. O FAQ oficial da SPA/MF distingue expressamente: (i) o prazo de 90 (noventa) dias da Portaria SPA/MF nº 2.579/2025, art. 2º, refere-se à adaptação de sistemas para campos obrigatórios de cadastro (limites prudenciais) e à disponibilização do link da plataforma centralizada; (ii) o prazo de 30 (trinta) dias da Instrução Normativa SPA/MF nº 31/2025, art. 15, refere-se especificamente à implementação dos procedimentos de consulta ao SIGAP e de impedimento de cadastro/uso por pessoas autoexcluídas. Confundir os dois prazos esvazia a proteção que a norma conferiu ao apostador que já formalizou a autoexclusão.`,
    dicaProva: "Cite o FAQ SPA/MF (Autoexclusão) e arts. 15 da IN 31/2025 e 2º da Portaria 2.579/2025.",
  },
  {
    id: "deveres_operacionais_in31",
    perfis: ["autoexclusao"],
    label: "Deveres operacionais da IN 31/2025 (SIGAP, 3 dias, 15 dias)",
    texto: (ctx) =>
      `A Instrução Normativa SPA/MF nº 31/2025 impõe à ${reu(ctx)} deveres objetivos e periódicos: (a) consultar o Sistema de Gestão de Apostas – SIGAP para verificar se o CPF consta da base de autoexclusão centralizada (art. 2º); (b) na efetivação do primeiro login do dia, se a consulta retornar "Impedido – Autoexclusão Centralizada", impedir imediatamente novas apostas e encerrar a conta no prazo de até três dias (art. 7º); (c) comunicar o motivo do encerramento em até um dia; (d) realizar consultas a todos os usuários cadastrados, no mínimo a cada quinze dias (art. 3º). A aceitação de depósito ou aposta após a inscrição na base centralizada evidencia o descumprimento desses deveres, independentemente de culpa (fortuito interno da atividade).`,
    dicaProva: "Linha do tempo: data da autoexclusão × data do login/depósito × ausência de bloqueio em 3 dias.",
  },
  {
    id: "deposito_apos_autoexclusao",
    perfis: ["autoexclusao"],
    label: "Depósito/aposta depois da autoexclusão",
    texto: (ctx) => {
      const d = ctx?.dataFato;
      const v = fmtValor(ctx?.valor);
      return `Apesar da autoexclusão regularmente registrada, ${reu(ctx)} permitiu acesso à plataforma, depósito e/ou realização de apostas${d ? ` (fato em ${d})` : ""}${v ? `, envolvendo valor da ordem de ${v}` : ""}. Essa conduta viola o dever de jogo responsável (Portaria SPA/MF nº 1.231/2024) e configura falha na prestação do serviço, nos termos do art. 14 do Código de Defesa do Consumidor, além de frustrar a finalidade protetiva da autoexclusão centralizada prevista na IN SPA/MF nº 31/2025.`;
    },
    dicaProva: "Prints de depósito, extrato e PIX após a data da autoexclusão.",
  },
  {
    id: "cdc_art14_objetivo",
    perfis: ["autoexclusao", "ludopatia", "publicidade", "saque"],
    label: "Responsabilidade objetiva (CDC art. 14)",
    texto: (ctx) =>
      `A relação entre as partes é de consumo (CDC, arts. 2º e 3º). Nos termos do art. 14 do CDC, o fornecedor de serviços responde, independentemente de culpa, pela reparação dos danos causados por defeitos relativos à prestação dos serviços. Eventual alegação de "erro pontual" de sistema por ${reu(ctx)} não afasta a responsabilidade: trata-se de risco inerente à atividade econômica regulada (fortuito interno), sobretudo quando a norma setorial (IN 31/2025) impõe consultas periódicas ao SIGAP e bloqueio imediato de novas apostas.`,
    dicaProva: "Argumento central acolhido em sentença do 4º JEC de Teresina/PI em caso análogo.",
  },
  {
    id: "recusa_estorno_suporte",
    perfis: ["autoexclusao", "saque"],
    label: "Suporte recusou estorno ou exigiu laudo",
    texto: (ctx) =>
      `Ao solicitar o estorno ou a liberação dos valores, a parte Autora foi informada por ${reu(ctx)} de que nada seria restituído sob o argumento de que o montante "havia sido utilizado", e/ou teve a análise condicionada à apresentação de laudo médico de ludopatia. A autoexclusão centralizada é mecanismo administrativo-regulatório autônomo (Portaria 1.231/2024 e IN 31/2025) e não depende de laudo médico, perícia ou interdição civil para produzir efeitos de bloqueio. Condicionar a restituição a prova de transtorno confunde institutos e agrava a vulnerabilidade de quem já acionou o mecanismo de proteção.`,
    dicaProva: "Anexe prints do chat de suporte (protocolo, data e texto).",
  },
  {
    id: "nao_exige_laudo_autoexclusao",
    perfis: ["autoexclusao"],
    label: "Autoexclusão não depende de laudo médico",
    texto: () =>
      `A proteção decorrente da autoexclusão centralizada ou específica não exige laudo médico. A plataforma oficial da SPA/MF admite motivos como "decisão voluntária", "dificuldades financeiras" ou "perda de controle sobre o jogo", sem condicionar o deferimento a perícia. Condicionar o estorno ou o bloqueio à prova de transtorno de jogo patológico (CID) confunde a autoexclusão regulatória com a interdição civil e esvazia a finalidade preventiva do instituto.`,
    dicaProva: "Use se o suporte pediu 'laudo de ludopatia' para analisar o caso.",
  },
  {
    id: "dano_moral_autoexclusao",
    perfis: ["autoexclusao"],
    label: "Dano moral pela frustração da autoexclusão",
    texto: (ctx) =>
      `A autoexclusão é mecanismo de proteção destinado a impedir que o usuário continue apostando. Sua frustração por falha de ${reu(ctx)} gera abalo extrapatrimonial indenizável (CDC art. 6º, VI), ainda que valores materiais tenham sido depois parcialmente restituídos. A restituição do numerário não descaracteriza a violação já consumada nem elimina, por si só, a repercussão moral decorrente da quebra da expectativa legítima de proteção assegurada pelo ordenamento setorial.`,
    dicaProva: "Sentença análoga arbitrando danos morais por autoexclusão violada (JEC).",
  },
  {
    id: "ludopatia_dever_cuidado",
    perfis: ["ludopatia"],
    label: "Ludopatia e dever de cuidado da operadora",
    texto: (ctx) =>
      `A parte Autora apresentou à ${reu(ctx)} sinais e/ou comunicação de perda de controle sobre o jogo (pedidos de limite, bloqueio, pausa ou padrão de depósitos repetidos incompatível com uso recreativo). A Portaria SPA/MF nº 1.231/2024 impõe aos operadores deveres de jogo responsável, inclusive mecanismos de autolimitação e de autoexclusão. A manutenção de estímulos comerciais e a facilitação de novos aportes, diante de tal quadro, configuram falha na prestação do serviço (CDC art. 14) e violação do dever de proteção reforçada ao consumidor vulnerável.`,
    dicaProva: "Mensagens pedindo limite/bloqueio; histórico de depósitos; laudo se existir.",
  },
  {
    id: "hipervulnerabilidade",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Consumidor hipervulnerável",
    texto: () =>
      `A parte Autora, ao registrar autoexclusão motivada por perda de controle sobre o jogo e/ou ao apresentar elementos de vulnerabilidade psíquica ou financeira relacionada às apostas, deve ser reconhecida como consumidor em situação de hipervulnerabilidade. A doutrina e a jurisprudência consumeristas reconhecem proteção reforçada nesses casos (CDC arts. 4º e 6º), em consonância com a política pública de jogo responsável da SPA/MF (Lei nº 14.790/2023 e Portaria nº 1.231/2024).`,
    dicaProva: "Útil quando há padrão compulsivo documentado ou laudo.",
  },
  {
    id: "limites_prudenciais",
    perfis: ["ludopatia", "autoexclusao"],
    label: "Limites prudenciais e jogo responsável (Portaria 2.579)",
    texto: (ctx) =>
      `A Portaria SPA/MF nº 2.579/2025 reforçou a obrigatoriedade de limites prudenciais de perda financeira e de tempo de jogo no cadastro do apostador. Ainda que o prazo de 90 dias para adequação sistêmica desses campos seja distinto do prazo de 30 dias da IN 31/2025, a ratio da norma é clara: o operador deve atuar de modo a prevenir excessos e a respeitar a vontade de quem busca se proteger. A conduta de ${reu(ctx)} de continuar permitindo depósitos e apostas após pedido de bloqueio ou autoexclusão contraria essa diretriz.`,
    dicaProva: "Pedidos de limite ignorados; ausência de bloqueio efetivo.",
  },
  {
    id: "publicidade_pos_optout",
    perfis: ["publicidade"],
    label: "Publicidade após pedido para parar",
    texto: (ctx) => {
      const d = ctx?.dataFato;
      return `A parte Autora solicitou a ${reu(ctx)} a cessação de contatos promocionais e/ou o encerramento da relação de estímulo ao jogo${d ? ` (pedido em ${d})` : ""}. Não obstante, continuou a receber ofertas de bônus, push, SMS ou e-mail marketing. Tal conduta contraria a boa-fé objetiva (CDC arts. 4º e 6º) e o dever de respeito à vontade de não ser mais alvo de publicidade de apostas. Nas orientações oficiais da SPA/MF sobre autoexclusão centralizada, o usuário declara ciência de que, durante o período, não deverá receber publicidade direcionada — padrão que reforça o dever de abstenção também nos pedidos individuais de opt-out.`;
    },
    dicaProva: "Print do pedido de opt-out + prints das ofertas posteriores com data.",
  },
  {
    id: "publicidade_agressiva",
    perfis: ["publicidade", "ludopatia"],
    label: "Estímulo comercial abusivo",
    texto: (ctx) =>
      `A estratégia comercial de ${reu(ctx)} — bônus de recarga, notificações insistentes e facilidade extrema de depósito — potencializa o risco de superendividamento e de reincidência no jogo, em descompasso com o dever de informação clara e de jogo responsável exigido da operadora autorizada (Portaria SPA/MF nº 1.231/2024). A publicidade que desconsidera a vulnerabilidade do consumidor pode caracterizar prática abusiva (CDC art. 39).`,
    dicaProva: "Prints de bônus/push e frequência das mensagens.",
  },
  {
    id: "saque_recusado",
    perfis: ["saque"],
    label: "Saque recusado ou injustificadamente travado",
    texto: (ctx) => {
      const v = fmtValor(ctx?.valor);
      const d = ctx?.dataFato;
      return `A parte Autora detinha saldo disponível junto a ${reu(ctx)}${v ? ` (cerca de ${v})` : ""} e formulou pedido(s) de saque${d ? ` a partir de ${d}` : ""}, os quais foram recusados, retidos sem justificativa legítima ou condicionados a exigências desproporcionais. A retenção indevida de valores do consumidor configura falha na prestação do serviço (CDC art. 14) e ofensa à boa-fé objetiva. No regime da autoexclusão centralizada (IN 31/2025), a norma ainda prevê prazos curtos para devolução de recursos — o que reforça, por analogia, a exigência de agilidade e transparência no tratamento do saldo do usuário.`;
    },
    dicaProva: "Print do saldo, pedidos de saque e respostas do suporte.",
  },
  {
    id: "saque_demora_abusiva",
    perfis: ["saque"],
    label: "Demora abusiva no saque",
    texto: (ctx) =>
      `A demora reiterada de ${reu(ctx)} em processar o saque, sem informação clara de prazo e motivo, gera desvio produtivo do consumidor e pode caracterizar dano moral quando ultrapassa o razoável e obriga o usuário a múltiplas reclamações infrutíferas (CDC arts. 6º e 14).`,
    dicaProva: "Linha do tempo: data do pedido × data da liberação (ou ausência dela).",
  },
  {
    id: "inversao_onus",
    perfis: ["autoexclusao", "ludopatia", "publicidade", "saque"],
    label: "Inversão do ônus da prova (CDC)",
    texto: () =>
      `Requer-se a inversão do ônus da prova, nos termos do art. 6º, VIII, do CDC, cabendo à parte Ré demonstrar o cumprimento efetivo das obrigações de consulta ao SIGAP, bloqueio, informação, processamento de saque e respeito à vontade do consumidor, conforme o caso — sobretudo porque os sistemas de verificação e de jogo responsável estão sob seu domínio técnico.`,
    dicaProva: "Peça padrão em relações de consumo; reforçada quando há dever regulatório de registro/consulta.",
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

  return `AO JUÍZO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE ${dados.autor.comarca.toUpperCase()} – ${dados.autor.uf}\n\n${dados.autor.nome}, CPF ${dados.autor.cpf}, residente em ${dados.autor.endereco}, vem, por si mesmo(a), em causa própria, com fundamento no art. 9º da Lei nº 9.099/1995 (jus postulandi) e na Lei nº 8.078/1990 (CDC), propor\n\nAÇÃO DE REPARAÇÃO DE DANOS MATERIAIS E MORAIS\n\nem face de ${dados.reu.nome}, CNPJ ${dados.reu.cnpj}, pelos fatos e fundamentos a seguir.\n\n1. SÍNTESE DOS FATOS\n\n${dados.relato}\n\n2. DO DIREITO\n\n${corpoArgs || "(Selecione os argumentos aplicáveis ao seu caso.)"}\n\n3. DOS PEDIDOS\n\nAnte o exposto, requer:\n\n${listaPedidos}\n\nDá-se à causa o valor de R$ ${dados.valorCausa.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}.\n\nNestes termos, pede deferimento.\n\n${dados.autor.comarca}/${dados.autor.uf}, data da geração.\n\n${dados.autor.nome}\nParte autora — em causa própria (jus postulandi)\n\n— Documento gerado pelo RecuperaJogo (software). Revise antes de protocolar. Não constitui assessoria jurídica.`;
}
