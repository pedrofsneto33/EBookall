// ============================================================
// Argumentos de petição — baseados em casos reais (JEC Teresina/PI)
// Sortenabet (sentença procedente DM R$ 3.000), Pagol, BetBoom +
// IN SPA/MF 31/2025, Portaria 2.579/2025, Portaria 1.231/2024, CDC.
// ============================================================

export interface Argumento {
  id: string;
  perfis: ("autoexclusao" | "ludopatia")[];
  label: string;
  texto: (dataFato?: string) => string;
  dicaProva?: string;
}

export interface PedidoEspecial {
  id: string;
  perfis: ("autoexclusao" | "ludopatia")[];
  label: string;
  texto: () => string;
}

export interface DadosPeticao {
  perfil: "autoexclusao" | "ludopatia";
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

export const ARGUMENTOS: Argumento[] = [
  {
    id: "nao_mero_arrependimento",
    perfis: ["autoexclusao"],
    label: "Não é arrependimento de aposta perdida",
    texto: () =>
      `Esclarece-se, desde logo, que a presente demanda não decorre de mero arrependimento por perdas em apostas regularmente realizadas. O núcleo da controvérsia é o descumprimento de obrigação regulatória específica do setor de apostas de quota fixa: a falha no sistema de autoexclusão, com manutenção indevida de conta ativa e aceitação de depósito(s) e/ou aposta(s) após a formalização da autoexclusão pela parte Autora perante a plataforma centralizada do Ministério da Fazenda (SPA/MF).`,
    dicaProva: "Deixe claro no relato a data da autoexclusão e a data do depósito posterior.",
  },
  {
    id: "autoexclusao_centralizada",
    perfis: ["autoexclusao"],
    label: "Autoexclusão centralizada na plataforma do MF",
    texto: (dataFato) =>
      `A parte Autora registrou autoexclusão centralizada no Sistema Centralizado de Autoexclusão de Apostas da Secretaria de Prêmios e Apostas do Ministério da Fazenda${dataFato ? ` em ${dataFato}` : ""}, por prazo indeterminado, com fundamento na Portaria SPA/MF nº 1.231/2024 (art. 2º, XXIII) e na Instrução Normativa SPA/MF nº 31/2025. O mecanismo existe precisamente para impedir cadastro, acesso e novas apostas em todos os agentes operadores autorizados.`,
    dicaProva: "Anexe o comprovante/registro de autoexclusão (gov.br/autoexclusaoapostas).",
  },
  {
    id: "prazo_30_dias_in31",
    perfis: ["autoexclusao"],
    label: "Prazo de 30 dias da IN 31 (não o de 90 dias)",
    texto: () =>
      `A Instrução Normativa SPA/MF nº 31/2025, art. 15, fixou prazo específico de até 30 (trinta) dias, contado de sua publicação, para que os agentes operadores implementassem os procedimentos de consulta ao SIGAP e bloqueio de usuários inscritos no sistema centralizado de autoexclusão. O prazo de 90 dias da Portaria SPA/MF nº 2.579/2025 (art. 2º) refere-se a outras adaptações (limites prudenciais e link de cadastro), e não suspende a obrigação de bloquear autoexcluídos após o prazo da IN 31 — distinção confirmada pela própria FAQ oficial da SPA/MF e pela Nota Informativa SEI nº 1864/2026/MF.`,
    dicaProva: "Útil se a casa alegar 'ainda estava no prazo de 90 dias'.",
  },
  {
    id: "consulta_sigap",
    perfis: ["autoexclusao"],
    label: "Dever de consultar o SIGAP (login e a cada 15 dias)",
    texto: () =>
      `Nos termos dos arts. 2º a 4º da IN SPA/MF nº 31/2025, o agente operador deve consultar o Sistema de Gestão de Apostas (SIGAP) na abertura de cadastro, no primeiro login do dia e, no mínimo, a cada quinze dias, para identificar usuários na base de autoexclusão centralizada. A omissão ou a falha nessa verificação configura defeito na prestação do serviço.`,
    dicaProva: "Peça exibição dos logs de consulta ao SIGAP referentes ao seu CPF.",
  },
  {
    id: "prazo_3_dias_encerramento",
    perfis: ["autoexclusao"],
    label: "Após status 'Impedido', bloqueio imediato e conta em até 3 dias",
    texto: () =>
      `Quando a consulta ao SIGAP retorna a informação "Impedido – Autoexclusão Centralizada", o operador deve imediatamente impedir novas apostas e encerrar a conta no prazo de até três dias, comunicando o motivo em até um dia (art. 7º da Portaria SPA/MF nº 2.579/2025). A mera comunicação de bloqueio sem efetivação técnica não cumpre o dever legal.`,
    dicaProva: "Compare a data da autoexclusão com a data em que a conta ainda aceitou depósito.",
  },
  {
    id: "deposito_pos_autoexclusao",
    perfis: ["autoexclusao"],
    label: "Depósito/aposta depois da autoexclusão",
    texto: (dataFato) =>
      `Apesar da autoexclusão regularmente registrada, a parte Ré permitiu acesso à plataforma, depósito e/ou realização de apostas${dataFato ? ` (fato em ${dataFato})` : ""}. Essa conduta viola o dever de jogo responsável e configura falha na prestação do serviço, nos termos do art. 14 do Código de Defesa do Consumidor.`,
    dicaProva: "Prints de depósito, extrato da conta e comprovante PIX após a data da autoexclusão.",
  },
  {
    id: "cdc_art14_objetivo",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Responsabilidade objetiva (CDC art. 14)",
    texto: () =>
      `A relação entre as partes é de consumo. Nos termos do art. 14 do CDC, o fornecedor de serviços responde, independentemente de culpa, pela reparação dos danos causados por defeitos relativos à prestação dos serviços. A eventual inconsistência operacional na integração de sistemas de verificação — inclusive a alegação de "erro pontual" — não afasta a responsabilidade: trata-se de risco inerente à atividade econômica da operadora (fortuito interno).`,
    dicaProva: "Argumento central acolhido em sentença do 4º JEC de Teresina/PI em caso análogo.",
  },
  {
    id: "recusa_estorno_suporte",
    perfis: ["autoexclusao"],
    label: "Suporte recusou estorno ou exigiu laudo",
    texto: () =>
      `Ao solicitar o estorno dos valores depositados após a autoexclusão, a parte Autora foi informada pela própria Ré de que nenhum valor seria restituído sob o argumento de que o montante "havia sido utilizado", e/ou teve a análise condicionada à apresentação de laudo médico de ludopatia. A autoexclusão centralizada é mecanismo administrativo/regulatório autônomo e não exige laudo médico, perícia ou interdição civil para produzir efeitos de bloqueio.`,
    dicaProva: "Anexe prints do chat de suporte (protocolo, data e texto integral).",
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
    id: "dano_moral_frustracao_protecao",
    perfis: ["autoexclusao"],
    label: "Dano moral pela frustração do mecanismo de proteção",
    texto: () =>
      `A autoexclusão é mecanismo de proteção destinado a impedir que o usuário continue apostando. Sua frustração por falha da operadora gera abalo extrapatrimonial indenizável, ainda que os valores materiais tenham sido posteriormente restituídos. A restituição do numerário é relevante para a extensão da reparação, mas não descaracteriza a violação já consumada nem elimina, por si só, a repercussão moral decorrente da quebra da expectativa legítima de proteção.`,
    dicaProva: "Sentença análoga no 4º JEC Teresina fixou R$ 3.000 a esse título (dados do caso concreto).",
  },
  {
    id: "nulidade_art26",
    perfis: ["ludopatia"],
    label: "Diagnóstico de transtorno do jogo (art. 26 da Lei 14.790/2023)",
    texto: () =>
      `Nos termos do art. 26 da Lei nº 14.790/2023, as apostas realizadas por pessoa diagnosticada com transtorno do jogo patológico são nulas de pleno direito, cabendo a repetição do indébito e a reparação dos danos. O gerador só utiliza este fundamento se houver laudo ou documentação de saúde informada pelo usuário.`,
    dicaProva: "Laudo ou relatório de profissional de saúde mental. Dado sensível (LGPD).",
  },
  {
    id: "hipervulnerabilidade",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Consumidor hipervulnerável",
    texto: () =>
      `A parte Autora, ao registrar autoexclusão motivada por perda de controle sobre o jogo e/ou ao apresentar elementos de vulnerabilidade psíquica relacionada às apostas, deve ser reconhecida como consumidor em situação de hipervulnerabilidade, atraindo proteção reforçada do CDC e das normas de jogo responsável da SPA/MF.`,
    dicaProva: "Enquadramento; não substitui prova do fato concreto.",
  },
];

export function filtrarPorPerfil(
  perfilOrArgs: "autoexclusao" | "ludopatia" | Argumento[],
  perfilMaybe?: "autoexclusao" | "ludopatia"
): Argumento[] {
  const perfil =
    typeof perfilOrArgs === "string" ? perfilOrArgs : (perfilMaybe as "autoexclusao" | "ludopatia");
  return ARGUMENTOS.filter((a) => a.perfis.includes(perfil));
}

export const PEDIDOS_ESPECIAIS: PedidoEspecial[] = [
  {
    id: "exibicao_sigap",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Exibição de logs de consulta ao SIGAP",
    texto: () =>
      `a exibição, pela parte Ré, dos registros e logs de consulta ao Sistema de Gestão de Apostas (SIGAP) referentes ao CPF da parte Autora, inclusive datas, horários e resultados das consultas (arts. 396 e seguintes do CPC), bem como dos registros de comunicação de bloqueio eventualmente enviados`,
  },
  {
    id: "exibicao_extrato",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Extrato completo de depósitos e apostas",
    texto: () =>
      `a exibição do extrato completo de depósitos, apostas, saques e movimentações da conta da parte Autora no período posterior à autoexclusão, com identificação de datas e valores`,
  },
  {
    id: "oficio_spa",
    perfis: ["autoexclusao"],
    label: "Ofício à SPA (opcional — juízes costumam indeferir)",
    texto: () =>
      `a expedição de ofício à Secretaria de Prêmios e Apostas do Ministério da Fazenda para ciência dos fatos, sem prejuízo de eventual provocação administrativa pelo próprio interessado perante a SPA e o Consumidor.gov.br`,
  },
];

export function filtrarPedidosPorPerfil(perfil: "autoexclusao" | "ludopatia"): PedidoEspecial[] {
  return PEDIDOS_ESPECIAIS.filter((p) => p.perfis.includes(perfil));
}

/** Modelo de estrutura de petição inspirado em iniciais reais (JEC). */
export function gerarPeticao(dados: DadosPeticao): string {
  const args = ARGUMENTOS.filter((a) => dados.argumentosSelecionados.includes(a.id));
  const pedidos = PEDIDOS_ESPECIAIS.filter((p) => dados.pedidosSelecionados.includes(p.id));
  const dataFato = dados.dataFato || dados.dataAutoexclusao;

  const corpoArgs = args
    .map((a, i) => `${i + 1}. ${a.texto(dataFato)}`)
    .join("\n\n");

  const listaPedidos = [
    dados.valorBase > 0
      ? `a condenação da parte Ré à restituição/repetição do indébito no valor de R$ ${dados.valorBase.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}${dados.dobro ? ", em dobro, nos termos do art. 42, parágrafo único, do CDC, se cabível" : ""}`
      : null,
    dados.danoMoral
      ? `a condenação da parte Ré ao pagamento de indenização por danos morais em valor a ser arbitrado pelo Juízo`
      : null,
    ...pedidos.map((p) => p.texto()),
    `a inversão do ônus da prova, nos termos do art. 6º, VIII, do CDC, se necessário à solução da controvérsia`,
  ]
    .filter(Boolean)
    .map((t, i) => `${i + 1}) ${t};`)
    .join("\n");

  return `AO JUÍZO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE ${dados.autor.comarca.toUpperCase()} – ${dados.autor.uf}

${dados.autor.nome}, já qualificado, vem, com fundamento nos arts. 3º e 14 da Lei nº 9.099/1995 e na Lei nº 8.078/1990 (CDC), propor

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

— Documento gerado pelo RecuperaJogo (software). Revise antes de protocolar. Não constitui assessoria jurídica.`;
}
