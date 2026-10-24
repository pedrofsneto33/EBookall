/**
 * TEXTOS jurídicos dos argumentos. Só são importados no servidor.
 *
 * ⚠ REVISÃO JURÍDICA: os textos abaixo são modelos de redação, não parecer.
 * VERIFICADO em 23/10/2026 (fontes secundárias): art. 26, VI e § 1º da Lei 14.790/2023 (redação original; revogado pela MP 1.394/2026, art. 29);
 * IN SPA/MF 31/2025: 30 dias para o Sigap (fim em 10/12/2025), bloqueio em 72h, consulta no cadastro, no 1º login do dia e a cada 15 dias.
 */
import { fmtBRL } from "../calc";

export interface CtxArg {
  dataFato?: string; // dd/mm/aaaa
  dataAutoexclusao?: string; // dd/mm/aaaa
  valor: number;
  devolvido?: number;
  perfil?: "autoexclusao" | "ludopatia" | "saldo_retido" | "premio_nao_pago" | "conta_bloqueada" | "bonus_rollover" | "publicidade_enganosa";
}

const d = (s?: string, fallback = "[DATA]") => (s && s.trim() ? s : fallback);
const v = (n: number) => (n > 0 ? fmtBRL(n) : "[VALOR]");

/** Parágrafo de direito intertemporal: toda tese que usa a Lei 14.790 carrega isto. */
export const DIREITO_INTERTEMPORAL =
  "Registre-se que os fatos narrados ocorreram durante a vigência das autorizações de operação da Requerida, " +
  "razão pela qual se aplica a Lei nº 14.790/2023, ainda que posteriormente modificada. A Medida Provisória nº 1.394/2026 " +
  "preservou expressamente a aplicação dessa lei aos fatos ocorridos durante a vigência das autorizações (art. 29, parágrafo único) " +
  "e manteve as obrigações do agente relativas ao período em que esteve autorizado (art. 10), em respeito ao ato jurídico perfeito " +
  "e ao direito adquirido (art. 5º, XXXVI, da Constituição Federal; art. 6º da LINDB).";

export const TEXTOS: Record<string, (c: CtxArg) => string> = {
  nao_mero_descumprimento: () =>
    "Esclarece-se, desde logo, que a presente demanda não decorre de mero arrependimento por perdas em apostas regularmente realizadas. " +
    "O núcleo da controvérsia é a falha na prestação do serviço pela Requerida, consistente em não cumprir mecanismo de proteção " +
    "ao consumidor que ela própria deveria operar, com consequente prejuízo material e extrapatrimonial à parte Autora.",

  autoexclusao_descumprida: (c) =>
    `A parte Autora formalizou autoexclusão centralizada em ${d(c.dataAutoexclusao)}, ato pelo qual manifestou, de forma expressa e inequívoca, ` +
    `a vontade de ser impedida de acessar e apostar em plataformas autorizadas. A partir desse momento, competia à Requerida impedir ` +
    `novo acesso, depósito e aposta. Todavia, em ${d(c.dataFato)}, a plataforma permitiu o acesso e aceitou depósito no valor de ${v(c.valor)}.\n\n` +
    "Nos termos do art. 14, caput e § 1º, do Código de Defesa do Consumidor, o fornecedor responde, independentemente de culpa, " +
    "pelos danos decorrentes de defeitos na prestação do serviço, sendo defeituoso o serviço que não fornece a segurança que o consumidor dele pode esperar. " +
    "Não há segurança possível quando o consumidor que pediu proteção é reexposto ao risco pela própria fornecedora.\n\n" +
    DIREITO_INTERTEMPORAL,

  sigap_prazo: (c) =>
    `Desde 10/12/2025 as operadoras estavam obrigadas a consultar o Sistema Nacional de Autoexclusão (Sigap) no cadastro, no primeiro acesso de cada dia e periodicamente, e a bloquear o acesso do usuário autoexcluído em até 72 horas, nos termos da Instrução Normativa SPA/MF nº 31/2025 (art. 4º e art. 15). ` +
    `O prazo de 30 (trinta) dias concedido para essa integração encerrou-se em 10/12/2025. O fato narrado (${d(c.dataFato)}) é posterior a esse termo, e a autoexclusão da parte Autora (${d(c.dataAutoexclusao)}) já constava do sistema.\n\n` +
    "Não prospera eventual alegação de prazo de adequação mais amplo previsto em outros atos normativos: a obrigação específica de consultar o Sigap e de bloquear usuários autoexcluídos é a da Instrução Normativa, cujo prazo já havia se esgotado. " +
    "A Requerida, ademais, não demonstrou ter realizado nenhuma consulta ou bloqueio, ônus que lhe cabe (art. 6º, VIII, do CDC).",

  deposito_pos_bloqueio: (c) =>
    `A parte Ré bloqueou/excluiu a conta da parte Autora e, ainda assim, voltou a aceitar depósito(s) posteriormente${c.dataFato ? ` (fato ocorrido em ${c.dataFato})` : ""}. ` +
    "A contradição evidencia falha grave no dever de cuidado e de segurança, nos termos do art. 14 do CDC: se a conta estava bloqueada, o sistema não poderia receber recursos; " +
    "se podia recebê-los, o bloqueio não foi efetivo.",

  acesso_nao_bloqueado: () =>
    "Ainda que a parte Autora tenha solicitado o bloqueio de sua conta, a parte Ré não impediu efetivamente o acesso à plataforma, " +
    "permitindo novo login e utilização dos serviços. A ineficácia do bloqueio é defeito do serviço (art. 14 do CDC), " +
    "cuja prova de regularidade incumbe à fornecedora (art. 6º, VIII, do CDC).",

  nao_exige_laudo_autoexclusao: () =>
    "A proteção decorrente da autoexclusão não exige laudo médico, perícia ou interdição civil. A pretensão não se funda em diagnóstico clínico, " +
    "mas no descumprimento, pela Requerida, de mecanismo de bloqueio acionado pelo próprio consumidor.",

  saldo_nao_restituido: (c) =>
    `A parte Autora mantinha saldo de ${v(c.valor)} na plataforma da Requerida. Com a edição da Medida Provisória nº 1.394/2026, publicada em 25/09/2026, ` +
    "impôs-se aos agentes a indisponibilização de seus sítios e aplicações, a segregação de recursos e a restituição integral dos valores devidos aos apostadores, " +
    "em prazos curtos (arts. 7º a 9º), sob multa diária em caso de descumprimento (art. 8º, § 2º). A restituição pelas instituições financeiras, ademais, " +
    "não afasta a responsabilidade do agente pelos valores não disponibilizados (art. 9º, § 4º).\n\n" +
    `Até a presente data, ${c.dataFato ? `contados de ${c.dataFato}, ` : ""}o valor não foi restituído à parte Autora, o que configura descumprimento de dever legal e contratual ` +
    "e falha na prestação do serviço (art. 14 do CDC).",

  retencao_enriquecimento: (c) =>
    `A retenção do valor de ${v(c.valor)}, pertencente à parte Autora, sem causa jurídica que a justifique, caracteriza enriquecimento sem causa ` +
    "(art. 884 do Código Civil) e viola o direito básico à efetiva reparação e à prevenção de danos (art. 6º, VI, do CDC). " +
    "O dinheiro depositado pelo consumidor não integra o patrimônio da fornecedora, que dele é mera depositária enquanto não utilizado em aposta.",

  nulidade_art26: () =>
    "Nos termos do art. 26, inciso VI, da Lei nº 14.790/2023, vigente à época dos fatos, era vedada a aposta realizada por pessoa diagnosticada com ludopatia, " +
    "por laudo de profissional de saúde mental habilitado, sendo nulas de pleno direito as apostas realizadas em desacordo com o dispositivo (§ 1º). " +
    "A parte Autora apresenta laudo que atesta o diagnóstico, de modo que as apostas realizadas são nulas e devem ser restituídas.\n\n" +
    DIREITO_INTERTEMPORAL,

  dever_jogo_responsavel: () =>
    "Era dever da Requerida adotar políticas de jogo responsável e de prevenção do transtorno do jogo patológico, identificando e reagindo a padrões de risco " +
    "(depósitos sucessivos, uso em horários atípicos, recarga por múltiplos meios). A inércia diante de padrão evidente de uso compulsivo é falha na prestação do serviço, " +
    "nos termos do art. 14 do CDC. As obrigações de jogo responsável relativas ao período autorizado foram mantidas pela Medida Provisória nº 1.394/2026 (art. 10).",

  hipervulnerabilidade: () =>
    "A parte Autora deve ser reconhecida como consumidora hipervulnerável: além da vulnerabilidade inerente a toda relação de consumo (art. 4º, I, do CDC), " +
    "soma-se a vulnerabilidade agravada de quem se encontra em situação de risco ao jogo, o que reclama proteção reforçada e interpretação mais favorável ao consumidor (art. 47 do CDC).",

  fortuito_interno: () =>
    "A responsabilidade do fornecedor é objetiva (art. 14 do CDC). Falhas de integração entre sistemas, de verificação cadastral ou de bloqueio " +
    "são riscos inerentes à atividade e configuram fortuito interno, que não afasta o dever de indenizar.",

  dano_moral_falha: () =>
    "O dano moral decorre da violação do dever de segurança e de proteção: o consumidor que buscou proteção expressa foi desatendido por quem lucra com a atividade, " +
    "experimentando frustração, angústia e perda de tempo útil na tentativa de resolver o problema, além da reexposição ao risco que procurou evitar. " +
    "O valor pleiteado observa os critérios de proporcionalidade, caráter pedagógico e vedação ao enriquecimento ilícito.",

  premio_nao_pago_falha: (c) =>
    `A recusa de pagamento do prêmio da aposta ganha no valor de ${v(c.valor)} configura falha na prestação do serviço (art. 14 do CDC) e enriquecimento sem causa (art. 884 do Código Civil). ` +
    "A Requerida não apresentou justificativa legítima para o não pagamento, retendo valores que pertencem à parte Autora.",

  conta_bloqueada_sem_justa_causa: (c) =>
    `O bloqueio da conta da parte Autora, com a retenção de saldo de ${v(c.valor)}, sem justificativa plausível e sem direito de defesa, ` +
    "viola o dever de informação e a função social do contrato (arts. 6º, III, e 51 do CDC). O bloqueio unilateral e injustificado configura falha grave na prestação do serviço.",

  rollover_abusivo: (c) =>
    `As cláusulas de rollover desproporcionais exigidas pela Requerida para a liberação do bônus (exigência de apostar múltiplas vezes o valor recebido) ` +
    "são abusivas e nulas de pleno direito (art. 51, IV, do CDC), pois colocam o consumidor em desvantagem exagerada e impedem o saque dos valores.",

  publicidade_enganosa: () =>
    "A publicidade veiculada pela Requerida (ou por seus influenciadores), que prometeu lucro certo ou omitiu os riscos reais de perda, configura prática abusiva " +
    "e publicidade enganosa (arts. 37 e 39 do CDC), ferindo o princípio da boa-fé objetiva e induzindo o consumidor ao erro.",

  // condicionais
  cond_precedentes_autoexclusao: () => {
    const sp = "No processo nº 4000778-26.2026.8.26.0248 (TJSP), condenou-se a operadora a restituir R$ 81.000,00 por não bloquear usuário autoexcluído, por violação do dever de segurança e de jogo responsável. ";
    const sc = "No processo nº 5005803-28.2025.8.24.0075 (1ª Vara Cível de Tubarão/SC), condenou-se a operadora à restituição de valores e a R$ 10.000,00 de dano moral, com fundamento no Código de Defesa do Consumidor e na falha do dever de jogo responsável. ";
    return (
      "A título ilustrativo, sem efeito vinculante, a matéria tem sido enfrentada pela jurisprudência de primeiro grau. " +
      sp + sc +
      "Requer-se a juntada das respectivas decisões."
    );
  },

  cond_precedentes_ludopatia: () => {
    const sc = "No processo nº 5005803-28.2025.8.24.0075 (1ª Vara Cível de Tubarão/SC), condenou-se a operadora à restituição de valores e a R$ 10.000,00 de dano moral, com fundamento no Código de Defesa do Consumidor e na falha do dever de jogo responsável. ";
    return (
      "A título ilustrativo, sem efeito vinculante, a matéria tem sido enfrentada pela jurisprudência de primeiro grau. " +
      sc +
      "Requer-se a juntada da respectiva decisão."
    );
  },

  cond_email: (c) =>
    `Consta dos autos que, em ${d(c.dataFato)}, a Requerida encaminhou comunicação formal informando que a conta havia sido bloqueada. ` +
    "Todavia, no mesmo dia, o sistema da própria Requerida aceitou novo depósito. A sequência temporal evidencia que o bloqueio alegado não foi efetivamente implementado.",

  cond_devolucao: (c) =>
    c.devolvido && c.devolvido >= c.valor
      ? `A Requerida devolveu ${fmtBRL(c.devolvido)} somente depois do descumprimento e da provocação da parte Autora, o que demonstra reconhecimento da irregularidade operacional. ` +
        "A devolução não elimina o dano já consumado: a parte Autora, que havia buscado proteção, foi reexposta ao risco e precisou acionar a Requerida e, depois, o Judiciário, remanescendo o dever de indenizar o dano moral."
      : "A Requerida procedeu à devolução parcial do valor, o que demonstra reconhecimento implícito da irregularidade operacional. " +
        "Contudo, limitou-se a restituir apenas parcela, mantendo a retenção do restante, o que configura enriquecimento sem causa (art. 884 do Código Civil).",
};

export const TITULOS: Record<string, string> = {
  nao_mero_descumprimento: "DO ENQUADRAMENTO DA DEMANDA",
  autoexclusao_descumprida: "DO DESCUMPRIMENTO DA AUTOEXCLUSÃO",
  sigap_prazo: "DO DEVER DE CONSULTAR O SIGAP E DO PRAZO JÁ ESGOTADO",
  deposito_pos_bloqueio: "DO DEPÓSITO ACEITO APÓS O BLOQUEIO",
  acesso_nao_bloqueado: "DA INEFICÁCIA DO BLOQUEIO",
  nao_exige_laudo_autoexclusao: "DA DESNECESSIDADE DE LAUDO NA AUTOEXCLUSÃO",
  saldo_nao_restituido: "DA NÃO RESTITUIÇÃO DO SALDO",
  retencao_enriquecimento: "DO ENRIQUECIMENTO SEM CAUSA",
  nulidade_art26: "DA NULIDADE DAS APOSTAS (LUDOPATIA)",
  dever_jogo_responsavel: "DO DEVER DE JOGO RESPONSÁVEL",
  hipervulnerabilidade: "DA HIPERVULNERABILIDADE DO CONSUMIDOR",
  fortuito_interno: "DA RESPONSABILIDADE OBJETIVA E DO FORTUITO INTERNO",
  dano_moral_falha: "DO DANO MORAL",
  premio_nao_pago_falha: "DA RECUSA DE PAGAMENTO DO PRÊMIO",
  conta_bloqueada_sem_justa_causa: "DO BLOQUEIO INJUSTIFICADO DA CONTA",
  rollover_abusivo: "DA ABUSIVIDADE DO ROLLOVER",
  publicidade_enganosa: "DA PUBLICIDADE ENGANOSA",
  cond_email: "DA CONTRADIÇÃO TEMPORAL",
  cond_devolucao: "DA DEVOLUÇÃO PARCIAL",
  cond_precedentes_autoexclusao: "DE DECISÕES SOBRE A MATÉRIA",
  cond_precedentes_ludopatia: "DE DECISÕES SOBRE A MATÉRIA",
};
