/**
 * Base de argumentos da petição — RecuperaJogo
 * 
 * Cada argumento tem uma tag `perfis`, indicando se se aplica a
 * "autoexclusao", "ludopatia", ou aos dois. Use `filtrarPorPerfil()`
 * pra pegar só o que é relevante pro fluxo que o usuário escolheu.
 */

// 1. Definimos o formato (tipo) de cada argumento para o TypeScript não reclamar
export interface Argumento {
  id: string;
  perfis: ("autoexclusao" | "ludopatia")[];
  label: string;
  texto: (dataFato?: string) => string;
  dicaProva?: string;
}

// 2. O array de argumentos, agora tipado corretamente como Argumento[]
export const ARGUMENTOS: Argumento[] = [
  // ============================================================
  // PERFIL: AUTOEXCLUSÃO
  // ============================================================
  {
    id: "deposito_pos_bloqueio",
    perfis: ["autoexclusao"],
    label: "A casa bloqueou/excluiu minha conta e, depois, aceitou novo depósito",
    texto: (dataFato?: string) =>
      `A parte Ré bloqueou/excluiu a conta da parte Autora e, ainda assim, voltou a aceitar ` +
      `depósito(s) posteriormente${dataFato ? ` (fato ocorrido em ${dataFato})` : ""}. Tal ` +
      `contradição evidencia falha grave no dever de cuidado e no controle interno da própria ` +
      `plataforma, nos termos do art. 14 do CDC (responsabilidade objetiva pelo fato do serviço), ` +
      `pois é incompatível alegar bloqueio por segurança/regularidade e, no mesmo período, ` +
      `processar novo depósito do mesmo usuário.`,
    dicaProva: "💡 Dica: Anexe prints do histórico de depósitos mostrando datas posteriores ao bloqueio."
  },
  {
    id: "acesso_nao_bloqueado",
    perfis: ["autoexclusao"],
    label: "Mesmo pedindo/tendo bloqueio, ainda conseguia fazer login e mexer na conta normalmente",
    texto: () =>
      `Ainda que a parte Autora tenha solicitado ou obtido o bloqueio/autoexclusão de sua conta, ` +
      `a parte Ré não impediu efetivamente o acesso à plataforma, permitindo login e/ou ` +
      `movimentação normal da conta durante o período em que deveria estar bloqueada. Tal falha ` +
      `configura descumprimento do próprio mecanismo de proteção que a Ré se compromete a ` +
      `oferecer, evidenciando defeito na prestação do serviço, nos termos do art. 14 do CDC.`,
    dicaProva: "💡 Dica: Anexe prints de tela mostrando o login ou saldo após a data do pedido de bloqueio."
  },
  {
    id: "propaganda_pos_exclusao",
    perfis: ["autoexclusao"],
    label: "Recebi propaganda/promoção da casa durante o período em que estava autoexcluído",
    texto: () =>
      `Durante o período de autoexclusão, a parte Autora recebeu comunicação de marketing, ` +
      `promoção ou propaganda direcionada da parte Ré, em desacordo com a vedação a esse tipo ` +
      `de contato durante o período de bloqueio prevista nas regras do próprio mecanismo de ` +
      `autoexclusão.`,
    dicaProva: "💡 Dica: Anexe print ou e-mail da comunicação recebida, com a data visível."
  },
  {
    id: "nao_verificacao_lista_autoexclusao",
    perfis: ["autoexclusao"],
    label: "A casa não verificou meu CPF na lista de autoexcluídos antes de aceitar aposta/depósito",
    texto: () =>
      `A parte Ré não comprova ter realizado a verificação cadastral do CPF da parte Autora junto ` +
      `à lista de autoexcluídos — seja a lista centralizada do governo federal, seja o cadastro ` +
      `interno da própria operadora — antes de permitir novo depósito ou aposta, o que configura ` +
      `falha no dever de diligência exigido de um fornecedor de serviço regulado e fiscalizado.`,
    dicaProva: "💡 Dica: Este é um argumento jurídico forte. Não exige prova sua, mas sim que a casa prove o contrário."
  },

  // ============================================================
  // PERFIL: LUDOPATIA
  // ============================================================
  {
    id: "nulidade_art26",
    perfis: ["ludopatia"],
    label: "Tenho diagnóstico (ou indício claro) de transtorno do jogo patológico",
    texto: () =>
      `Nos termos do art. 26 da Lei nº 14.790/2023 (Lei das Bets), as apostas realizadas por ` +
      `pessoa diagnosticada com transtorno do jogo patológico (ludopatia) são nulas de pleno ` +
      `direito, o que fundamenta o pedido de restituição dos valores apostados no período ` +
      `correspondente ao diagnóstico ou à manifestação do transtorno.`,
    dicaProva: "💡 Dica: Um laudo ou relatório de profissional de saúde mental (pode ser do SUS/CAPS) fortalece muito este argumento."
  },
  {
    id: "falha_monitoramento_padrao",
    perfis: ["ludopatia"],
    label: "Meu padrão de apostas era visivelmente compulsivo e a casa não fez nada",
    texto: () =>
      `A parte Autora apresentou padrão de comportamento compatível com perda de controle sobre o ` +
      `jogo — depósitos repetidos em curto intervalo de tempo, valores crescentes, tentativas de ` +
      `conter o próprio comportamento e/ou recurso a terceiros para sustentar as apostas. A parte Ré, ` +
      `mesmo diante desse padrão identificável em seus próprios sistemas de dados, não adotou ` +
      `qualquer medida de contenção, configurando falha no dever de monitoramento de comportamento de risco.`,
    dicaProva: "💡 Dica: Reúna prints do histórico que demonstrem esse padrão (vários depósitos no mesmo dia, por exemplo)."
  },
  {
    id: "ausencia_mecanismos_jogo_responsavel",
    perfis: ["ludopatia"],
    label: "A casa não oferecia (ou escondia) ferramentas de limite de depósito/autolimitação",
    texto: () =>
      `A parte Ré não disponibilizou, ou não tornou efetivamente acessíveis, mecanismos de jogo ` +
      `responsável — como limite de depósito, autolimitação de valor ou tempo, e pausa temporária ` +
      `voluntária — ferramentas que a regulamentação do setor exige das operadoras licenciadas ` +
      `como forma de proteção ao consumidor em situação de vulnerabilidade.`,
    dicaProva: "💡 Dica: Se possível, anexe um print atual do site da Ré mostrando a dificuldade de achar essas ferramentas."
  },

  // ============================================================
  // COMPARTILHADOS (fazem sentido nos dois perfis)
  // ============================================================
  {
    id: "hipervulnerabilidade",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Quero reforçar minha condição de consumidor hipervulnerável",
    texto: () =>
      `A parte Autora deve ser reconhecida como consumidor hipervulnerável, categoria que recebe ` +
      `proteção reforçada no ordenamento jurídico brasileiro, dada a natureza do serviço prestado ` +
      `pela Ré — estruturado, por sua própria dinâmica, para estimular a repetição do ` +
      `comportamento de consumo, com técnicas de design e recompensa que dificultam o controle ` +
      `racional por parte do usuário.`,
    dicaProva: "💡 Dica: Este é um argumento jurídico de enquadramento. Não precisa de prova específica, apenas ser marcado."
  },
  {
    id: "reincidencia_cobranca",
    perfis: ["autoexclusao", "ludopatia"],
    label: "A casa manteve/repetiu a cobrança indevida mesmo depois de eu reclamar",
    texto: () =>
      `A parte Ré, mesmo após notificada sobre a cobrança ou desconto indevido, manteve ou repetiu ` +
      `a prática — o que reforça o pedido de devolução em dobro (art. 42, parágrafo único, CDC) e ` +
      `evidencia ausência de boa-fé na resolução administrativa da questão, fato que também ` +
      `fundamenta o pedido de indenização pelo tempo e esforço exigidos da parte Autora para ` +
      `tentar resolver diretamente com a Ré antes de recorrer ao Judiciário (Teoria do Desvio ` +
      `Produtivo do Consumidor).`,
    dicaProva: "💡 Dica: Anexe prints de protocolos de atendimento, e-mails ou conversas no chat com o suporte da casa de aposta."
  },
  {
    id: "clausulas_abusivas_tos",
    perfis: ["autoexclusao", "ludopatia"],
    label: "A casa usou os 'Termos de Uso' para negar meu reembolso de forma abusiva",
    texto: () =>
      `A parte Ré tenta se eximir de sua responsabilidade citando cláusulas genéricas de seus ` +
      `"Termos de Uso". Contudo, tais cláusulas são nulas de pleno direito por serem abusivas, ` +
      `nos termos do art. 51 do CDC, pois buscam anular ou atenuar a responsabilidade do ` +
      `fornecedor por vícios de qualidade do serviço, especialmente em se tratando de ` +
      `consumidor hipervulnerável e de serviço de alto risco.`,
    dicaProva: "💡 Dica: Anexe o print da negativa da casa de aposta onde eles citam os 'Termos e Condições'."
  }
];

/**
 * Retorna só os argumentos relevantes pro perfil escolhido, mais os compartilhados.
 * 
 * @param perfil "autoexclusao" ou "ludopatia"
 */
export function filtrarPorPerfil(perfil: "autoexclusao" | "ludopatia"): Argumento[] {
  return ARGUMENTOS.filter((a) => a.perfis.includes(perfil));
}