// ============================================================
// 1. TIPOS (TypeScript)
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
  argumentosSelecionados: string[];
  pedidosSelecionados: string[];
  danoMoral: boolean;
  dobro: boolean;
  valorBase: number; // Adicionado para corrigir o texto da restituição
  valorCausa: number;
}

// ============================================================
// 2. ARGUMENTOS (25 no total - Sem erros de sintaxe)
// ============================================================
export const ARGUMENTOS: Argumento[] = [
  // ============================================================
  // AUTOEXCLUSÃO (10 originais + 2 novos do caso real)
  // ============================================================
  {
    id: "nao_mero_descumprimento",
    perfis: ["autoexclusao"],
    label: "Quero deixar claro desde já: isso não é birra por ter perdido aposta",
    texto: () => `Esclarece-se, desde logo, que a presente demanda não decorre de mero arrependimento por perdas em apostas regularmente realizadas. O núcleo da controvérsia é o descumprimento de obrigação regulatória específica do setor — falha no sistema de autoexclusão, com manutenção indevida de conta ativa e aceitação de depósito(s) e/ou aposta(s) após a formalização do pedido de autoexclusão pela parte Autora.`,
    dicaProva: "💡 Argumento de enquadramento. Apenas marque para deixar o tom da petição claro."
  },
  {
    id: "deposito_pos_bloqueio",
    perfis: ["autoexclusao"],
    label: "A casa bloqueou/excluiu minha conta e, depois, aceitou novo depósito",
    texto: (dataFato) => `A parte Ré bloqueou/excluiu a conta da parte Autora e, ainda assim, voltou a aceitar depósito(s) posteriormente${dataFato ? ` (fato ocorrido em ${dataFato})` : ""}. Tal contradição evidencia falha grave no dever de cuidado e no controle interno da própria plataforma, nos termos do art. 14 do CDC.`,
    dicaProva: "💡 Anexe prints do histórico de depósitos mostrando datas posteriores ao bloqueio."
  },
  {
    id: "acesso_nao_bloqueado",
    perfis: ["autoexclusao"],
    label: "Mesmo pedindo/tendo bloqueio, ainda conseguia fazer login e mexer na conta normalmente",
    texto: () => `Ainda que a parte Autora tenha solicitado ou obtido o bloqueio/autoexclusão de sua conta, a parte Ré não impediu efetivamente o acesso à plataforma, permitindo login e/ou movimentação normal da conta durante o período em que deveria estar bloqueada. Tal falha configura descumprimento do próprio mecanismo de proteção que a Ré se compromete a oferecer.`,
    dicaProva: "💡 Anexe prints de tela mostrando o login ou saldo após a data do pedido de bloqueio."
  },
  {
    id: "distincao_30_90_dias",
    perfis: ["autoexclusao"],
    label: 'A casa usa o "prazo de adaptação de 90 dias" pra se justificar — mas esse prazo não é sobre bloqueio',
    texto: () => `A regulamentação do setor distingue expressamente dois prazos de naturezas distintas. Nos termos do art. 15 da Instrução Normativa SPA/MF nº 31/2025, a integração ao sistema operacional de impedidos (bloqueio) deveria ocorrer em 30 dias. O prazo de 90 dias refere-se exclusivamente à adequação de campos cadastrais e funcionalidades acessórias, matéria distinta e autônoma.`,
    dicaProva: "💡 Argumento técnico forte. Use se a casa de apostas tentou usar essa desculpa no atendimento."
  },
  {
    id: "consulta_periodica_sigap",
    perfis: ["autoexclusao"],
    label: "A casa não comprova ter consultado periodicamente o SIGAP pra saber que eu estava excluído",
    texto: () => `Nos termos do art. 4º da Instrução Normativa SPA/MF nº 31/2025, a consulta ao Sistema de Gestão de Apostas (SIGAP) é obrigatória: (i) na abertura do cadastro; (ii) na efetivação do primeiro login do dia; e (iii), no mínimo, a cada 15 dias. A parte Ré não comprova ter realizado essa consulta periódica dentro do prazo legal.`,
    dicaProva: "💡 Prepara o terreno para o 'Pedido Especial' de exibição de documentos."
  },
  {
    id: "nao_exige_laudo_autoexclusao",
    perfis: ["autoexclusao"],
    label: "Quero deixar claro que autoexclusão não precisa de laudo médico (diferente de ludopatia)",
    texto: () => `Esclarece-se que a proteção decorrente da autoexclusão não exige, como pressuposto, laudo médico, perícia psiquiátrica, interdição civil ou reconhecimento formal de incapacidade. O dever de bloqueio nasce da própria formalização do pedido de autoexclusão, independentemente de sua motivação declarada.`,
    dicaProva: "💡 Essencial para evitar que o juiz confunda seu caso com o de ludopatia e exija laudo."
  },
  {
    id: "propaganda_pos_exclusao",
    perfis: ["autoexclusao"],
    label: "Recebi propaganda/promoção da casa durante o período em que estava autoexcluído",
    texto: () => `Durante o período de autoexclusão, a parte Autora recebeu comunicação de marketing, promoção ou propaganda direcionada da parte Ré, em desacordo com a vedação a esse tipo de contato durante o período de bloqueio prevista nas regras do próprio mecanismo de autoexclusão.`,
    dicaProva: "💡 Anexe print ou e-mail da comunicação recebida, com a data visível."
  },
  {
    id: "comunicacao_intempestiva",
    perfis: ["autoexclusao"],
    label: "A casa só me avisou do bloqueio depois de já ter encerrado/mexido na minha conta",
    texto: () => `A regulamentação exige que, antes do encerramento da conta, a operadora comunique ao usuário o motivo do bloqueio, devendo tal comunicação ser documentada e armazenada por, no mínimo, cinco anos. Comunicação enviada após o encerramento da conta é incompatível com a diligência exigida pela norma.`,
    dicaProva: "💡 Anexe o e-mail ou mensagem de bloqueio, destacando a data em que foi enviada."
  },
  {
    id: "nao_verificacao_lista_autoexclusao",
    perfis: ["autoexclusao"],
    label: "A casa não verificou meu CPF na lista de autoexcluídos antes de aceitar aposta/depósito",
    texto: () => `A parte Ré não comprova ter realizado a verificação cadastral do CPF da parte Autora junto à lista de autoexcluídos — seja a lista centralizada do governo federal, seja o cadastro interno da própria operadora — antes de permitir novo depósito ou aposta, o que configura falha no dever de diligência.`,
    dicaProva: "💡 Argumento jurídico forte. Não exige prova sua, mas sim que a casa prove o contrário."
  },
  {
    id: "devolucao_parcial_confissao",
    perfis: ["autoexclusao"],
    label: "A casa já devolveu uma parte do dinheiro (mesmo sem eu processar ainda)",
    texto: () => `Eventual devolução parcial, pela parte Ré, de valores movimentados após a autoexclusão possui relevância jurídica significativa: se inexistisse falha ou irregularidade, não haveria razão lógica para qualquer restituição voluntária. Tal devolução constitui indício de reconhecimento implícito de anormalidade operacional.`,
    dicaProva: "💡 Anexe o comprovante da devolução parcial feita pela casa de apostas."
  },
  {
    id: "prazo_3_dias_bloqueio",
    perfis: ["autoexclusao"],
    label: "A casa não provou que consultou o SIGAP e me bloqueou no prazo de 3 dias",
    texto: () => `Cabe exclusivamente à parte Ré o ônus de comprovar que realizou a consulta periódica ao SIGAP e promoveu o bloqueio da conta no prazo legal. Nos termos do art. 7º da Portaria SPA/MF nº 2.579/2025, identificada a situação de "Impedido", a operadora tem o dever de encerrar a conta em até 3 (três) dias. A ausência de apresentação dos logs de consulta por parte da Ré atrai a presunção de veracidade dos fatos alegados pelo Autor, nos termos do art. 400 do CPC.`,
    dicaProva: "💡 Estratégia de ouro: o ônus de provar a consulta é da casa. Se não anexarem os logs, o juiz presume que não consultaram."
  },
  {
    id: "confissao_falha_operacional",
    perfis: ["autoexclusao"],
    label: "A casa admitiu por escrito que teve 'falha operacional' no sistema",
    texto: () => `A própria parte Ré admitiu, em manifestação oficial, a ocorrência de 'inconsistência na integração de seus sistemas automatizados de verificação de restrições'. Tal confissão expressa afasta qualquer alegação de regularidade da conduta e confirma a falha na prestação do serviço, nos termos do art. 14 do CDC e da Súmula 479 do STJ (por analogia), que responsabiliza o fornecedor por fortuito interno relativo a falhas em seus próprios sistemas.`,
    dicaProva: "💡 Use se a casa admitiu por escrito (e-mail, contestação, Reclame Aqui) que teve falha no sistema."
  },

  // ============================================================
  // LUDOPATIA (5 originais)
  // ============================================================
  {
    id: "nulidade_art26",
    perfis: ["ludopatia"],
    label: "Tenho diagnóstico (ou indício claro) de transtorno do jogo patológico",
    texto: () => `Nos termos do art. 26 da Lei nº 14.790/2023, as apostas realizadas por pessoa diagnosticada com transtorno do jogo patológico (ludopatia) são nulas de pleno direito, o que fundamenta o pedido de restituição dos valores apostados. A nulidade, nesses casos, opera de pleno direito (ipso jure), independentemente de prova de incapacidade civil formal.`,
    dicaProva: "💡 Um laudo ou relatório de profissional de saúde mental (pode ser do SUS/CAPS) fortalece muito este argumento."
  },
  {
    id: "falha_monitoramento_padrao",
    perfis: ["ludopatia"],
    label: "Meu padrão de apostas era visivelmente compulsivo e a casa não fez nada",
    texto: () => `A parte Autora apresentou padrão de comportamento compatível com perda de controle sobre o jogo — depósitos repetidos em curto intervalo, valores crescentes. A ausência de mecanismos de controle revela falha na prestação do serviço, caracterizada pela omissão da parte Ré em conter um padrão identificável em seus próprios sistemas de dados.`,
    dicaProva: "💡 Reúna prints do histórico que demonstrem esse padrão (vários depósitos no mesmo dia, por exemplo)."
  },
  {
    id: "design_manipulativo",
    perfis: ["ludopatia"],
    label: "A casa usa bônus e notificações agressivas que estimulam continuar apostando",
    texto: () => `É fato notório que plataformas de apostas utilizam mecanismos de estímulo contínuo ao consumo — bônus, reforços intermitentes, publicidade agressiva — que acentuam comportamentos de risco. Tais técnicas de design reforçam a caracterização da parte Autora como consumidor hipervulnerável.`,
    dicaProva: "💡 Anexe prints de notificações push, e-mails de bônus ou pop-ups agressivos no site."
  },
  {
    id: "ausencia_mecanismos_jogo_responsavel",
    perfis: ["ludopatia"],
    label: "A casa não oferecia (ou escondia) ferramentas de limite de depósito/autolimitação",
    texto: () => `A parte Ré não disponibilizou, ou não tornou efetivamente acessíveis, mecanismos de jogo responsável — limite de depósito, autolimitação de valor ou tempo, e pausa temporária voluntária — ferramentas que a regulamentação do setor exige das operadoras licenciadas.`,
    dicaProva: "💡 Se possível, anexe um print atual do site da Ré mostrando a dificuldade de achar essas ferramentas."
  },
  {
    id: "assuncao_risco_afastada",
    perfis: ["ludopatia"],
    label: 'Quero rebater de antemão o argumento de que "apostar é um risco que eu assumi"',
    texto: () => `Afasta-se, desde logo, eventual tese de que a perda em apostas representa mera assunção de risco inerente à atividade. Quando a falha da parte Ré no cumprimento de deveres legais de prevenção contribui para a continuidade das apostas por consumidor em vulnerabilidade, a jurisprudência brasileira tem afastado a tese de assunção do risco.`,
    dicaProva: "💡 Argumento preventivo excelente para blindar a petição contra contestações padrão."
  },

  // ============================================================
  // COMPARTILHADOS (5 originais + 2 novos do caso real)
  // ============================================================
  {
    id: "hipervulnerabilidade",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Quero reforçar minha condição de consumidor hipervulnerável",
    texto: () => `A parte Autora deve ser reconhecida como consumidor hipervulnerável, categoria que recebe proteção reforçada no ordenamento jurídico brasileiro, dada a natureza do serviço prestado pela Ré — estruturado para estimular a repetição do comportamento de consumo.`,
    dicaProva: "💡 Argumento jurídico de enquadramento. Não precisa de prova específica."
  },
  {
    id: "irrelevancia_lucro_anterior",
    perfis: ["autoexclusao", "ludopatia"],
    label: 'Quero rebater de antemão o argumento de que eu "já tinha lucrado antes"',
    texto: () => `Eventual alegação de que a parte Autora obteve ganhos em momento anterior aos fatos não possui relevância jurídica. O dever de bloqueio e de monitoramento de padrão de risco é absolutamente independente do resultado financeiro momentâneo do usuário.`,
    dicaProva: "💡 Use se você já ganhou dinheiro na plataforma no passado e teme que a casa use isso contra você."
  },
  {
    id: "fortuito_interno",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Quero reforçar que falha no sistema da casa não é desculpa, é responsabilidade dela",
    texto: () => `Nos termos do art. 14 do CDC, a responsabilidade do fornecedor por defeito na prestação do serviço é objetiva. Eventuais falhas operacionais configuram fortuito interno, incapaz de afastar essa responsabilidade — por analogia à Súmula 479 do STJ.`,
    dicaProva: "💡 Use se a casa de apostas culpar 'erro no sistema' ou 'falha de integração'."
  },
  {
    id: "reincidencia_cobranca",
    perfis: ["autoexclusao", "ludopatia"],
    label: "A casa manteve/repetiu a cobrança indevida mesmo depois de eu reclamar",
    texto: () => `A parte Ré, mesmo após notificada sobre a cobrança indevida, manteve ou repetiu a prática — o que reforça o pedido de devolução em dobro (art. 42, parágrafo único, CDC) e fundamenta o pedido de indenização pelo Desvio Produtivo do Consumidor.`,
    dicaProva: "💡 Anexe prints de protocolos de atendimento, e-mails ou conversas no chat com o suporte."
  },
  {
    id: "termos_abusivos",
    perfis: ["autoexclusao", "ludopatia"],
    label: 'A casa usou os "Termos de Uso" pra negar meu reembolso',
    texto: () => `A parte Ré tenta se eximir de sua responsabilidade citando cláusulas genéricas de seus "Termos de Uso". Tais cláusulas são nulas de pleno direito por serem abusivas, nos termos do art. 51 do CDC, pois buscam anular a responsabilidade do fornecedor.`,
    dicaProva: "💡 Anexe o print da negativa da casa de aposta onde eles citam os 'Termos e Condições'."
  },
  {
    id: "dano_moral_autonomo",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Mesmo que a casa devolva o dinheiro, quero dano moral pela violação dos meus direitos",
    texto: () => `A eventual restituição dos valores materiais pela parte Ré não exclui o direito à indenização por danos morais, que possui causa de pedir autônoma e distinta — a violação a direito de personalidade do consumidor vulnerável, decorrente da falha na prestação do serviço (arts. 5º, V e X, da CF; 186 e 927 do CC; e 6º, VI, do CDC). A reparação material não exclui a indenização moral, tratando-se de pretensões cumuláveis.`,
    dicaProva: "💡 Essencial se a casa já devolveu o dinheiro mas você quer continuar pedindo dano moral."
  },
  {
    id: "dimensao_coletiva_925mil",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Quero destacar que meu caso não é isolado — são mais de 925 mil autoexcluídos no Brasil",
    texto: () => `Conforme dados oficiais da própria SPA/MF (Nota Informativa SEI nº 1864/2026/MF), a Plataforma Centralizada de Autoexclusão já contabiliza mais de 925 mil solicitações. Diante de universo dessa magnitude, a falha aqui identificada — descumprimento do dever de consulta periódica ao SIGAP e de bloqueio tempestivo — não pode ser tratada como questão de interesse exclusivamente individual, sendo razoável supor a existência de outros consumidores na mesma situação em todo o território nacional.`,
    dicaProva: "💡 Argumento forte para pedir ofício ao Ministério Público (tutela coletiva)."
  },
];

export function filtrarPorPerfil(perfil: "autoexclusao" | "ludopatia"): Argumento[] {
  return ARGUMENTOS.filter((a) => a.perfis.includes(perfil));
}

// ============================================================
// 3. PEDIDOS ESPECIAIS
// ============================================================
export const PEDIDOS_ESPECIAIS: PedidoEspecial[] = [
  {
    id: "exibicao_documentos",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Pedir que o juiz obrigue a casa a mostrar os logs de consulta ao SIGAP",
    texto: () => `a exibição, pela parte Ré, dos registros de comunicação de bloqueio e dos logs de consulta ao SIGAP referentes ao CPF da parte Autora, nos termos dos arts. 396 e seguintes do CPC, sob pena de se presumirem verdadeiros os fatos alegados pela parte Autora, nos termos do art. 400 do CPC`,
  },
  {
    id: "oficio_orgaos",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Pedir que o juiz oficie a SPA/MF e o Ministério Público sobre o problema mais amplo",
    texto: () => `a expedição de ofício à Subsecretaria de Monitoramento e Fiscalização da SPA/MF, para conhecimento dos fatos apurados nestes autos, e ao Ministério Público, nos termos do art. 139, X, do CPC, para avaliação quanto à eventual tutela coletiva de interesses individuais homogêneos.`,
  },
];

export function filtrarPedidosPorPerfil(perfil: "autoexclusao" | "ludopatia"): PedidoEspecial[] {
  return PEDIDOS_ESPECIAIS.filter((p) => p.perfis.includes(perfil));
}

// ============================================================
// 4. MARCO REGULATÓRIO
// ============================================================
const MARCO_BASE = `A atividade de apostas de quota fixa no Brasil é regulada pela Lei nº 14.790/2023, que instituiu a Secretaria de Prêmios e Apostas (SPA), vinculada ao Ministério da Fazenda. Entre as obrigações impostas às operadoras licenciadas está o dever de adotar práticas de jogo responsável, incluindo a disponibilização de mecanismos de autoexclusão, limite de depósito e monitoramento de padrões de comportamento de risco.

Para fins de fiscalização, as operadoras licenciadas são obrigadas a integrar seus sistemas ao SIGAP (Sistema de Gestão de Apostas), plataforma mantida pelo poder público que permite o rastreamento de informações da atividade de apostas.

O descumprimento dessas obrigações regulatórias específicas do setor configura defeito na prestação do serviço na esfera cível, nos termos do art. 14 do CDC.`;

const MARCO_AUTOEXCLUSAO = `Especificamente quanto ao mecanismo de autoexclusão, a regulamentação prevê que o pedido de autoexclusão deve resultar no bloqueio efetivo da conta em prazo curto e determinado. A operadora licenciada tem o dever de consultar periodicamente o SIGAP para identificar usuários autoexcluídos e promover o bloqueio dentro do prazo regulatório aplicável.`;

const MARCO_LUDOPATIA = `Especificamente quanto à proteção de apostadores em situação de vulnerabilidade por transtorno do jogo, o art. 26 da Lei nº 14.790/2023 estabelece que apostas realizadas por pessoa diagnosticada com transtorno do jogo patológico são nulas de pleno direito. A mesma lei impõe às operadoras o dever de monitorar padrões de comportamento de risco e disponibilizar mecanismos de jogo responsável.`;

function montarMarcoRegulatorio(perfil: "autoexclusao" | "ludopatia"): string {
  const addendum = perfil === "ludopatia" ? MARCO_LUDOPATIA : MARCO_AUTOEXCLUSAO;
  return `${MARCO_BASE}\n\n${addendum}`;
}

// ============================================================
// 5. NUMERAÇÃO E MONTAGEM FINAL
// ============================================================
function romanize(n: number): string {
  const map = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
  return map[n - 1] || String(n);
}

function letterize(n: number): string {
  return String.fromCharCode(96 + n);
}

export function gerarPeticao({
  perfil,
  autor,
  reu,
  relato,
  dataFato,
  argumentosSelecionados = [],
  pedidosSelecionados = [],
  danoMoral = false,
  dobro = false,
  valorBase = 0,
  valorCausa = 0,
}: DadosPeticao): string {
  const fmt = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  
  const valorBaseFmt = valorBase > 0 ? fmt(valorBase) : "[preencher valor da causa]";
  const valorDobroFmt = valorBase > 0 ? fmt(valorBase * 2) : "[valor em dobro]";
  const valorCausaFmt = valorCausa > 0 ? fmt(valorCausa) : "[preencher valor da causa]";

  let n = 3;

  const blocosArgumentos = ARGUMENTOS.filter((a) => argumentosSelecionados.includes(a.id))
    .map((a) => {
      const bloco = `${romanize(n)} — ${a.label.toUpperCase()}\n\n${a.texto(dataFato)}`;
      n++;
      return bloco;
    })
    .join("\n\n");

  const numRelacaoConsumo = romanize(n++);
  const numPedidos = romanize(n++);

  const temNulidadeArt26 = perfil === "ludopatia" && argumentosSelecionados.includes("nulidade_art26");

  const listaPedidos = [
    `a restituição do valor de ${valorBaseFmt}${dobro ? `, em DOBRO (totalizando ${valorDobroFmt}), nos termos do art. 42, parágrafo único, do CDC` : ""}, corrigido monetariamente e acrescido de juros de mora de 1% ao mês desde a data do(s) fato(s)`,
  ];

  if (temNulidadeArt26) {
    listaPedidos.push(
      `o reconhecimento da nulidade de pleno direito das apostas realizadas pela parte Autora no período correspondente ao diagnóstico ou à manifestação do transtorno do jogo patológico, nos termos do art. 26 da Lei nº 14.790/2023`
    );
  }

  if (danoMoral) {
    listaPedidos.push(
      `a condenação da Ré ao pagamento de indenização por danos morais, em valor a ser arbitrado por este Juízo, observando-se os princípios da proporcionalidade e do caráter pedagógico`
    );
  }

  listaPedidos.push(`a inversão do ônus da prova, conforme fundamentado`);

  PEDIDOS_ESPECIAIS.filter((p) => pedidosSelecionados.includes(p.id)).forEach((p) => {
    listaPedidos.push(p.texto());
  });

  listaPedidos.push(`a citação da parte Ré para, querendo, apresentar contestação, sob pena de revelia`);

  const pedidosFormatados = listaPedidos
    .map((texto, i) => `${letterize(i + 1)}) ${texto};`)
    .join("\n");

  return `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE ${autor.comarca || "[COMARCA]"} – ${autor.uf || "[UF]"}

${autor.nome || "[NOME COMPLETO DO AUTOR]"}, portador(a) do CPF nº ${autor.cpf || "[CPF]"}, residente em ${autor.endereco || "[ENDEREÇO COMPLETO]"}, vem, respeitosamente, com fundamento no art. 9º da Lei 9.099/95 (jus postulandi) e no Código de Defesa do Consumidor, propor a presente

AÇÃO DE INDENIZAÇÃO POR DANOS MATERIAIS${danoMoral ? " E MORAIS" : ""}

em face de ${reu.nome || "[NOME DA EMPRESA RÉ]"}, inscrita no CNPJ nº ${reu.cnpj || "[CNPJ]"}, pelos fatos e fundamentos a seguir.

I — DOS FATOS

${relato || "[Descreva aqui, em ordem cronológica, os fatos relevantes com datas.]"}

II — DO MARCO REGULATÓRIO DO SETOR DE APOSTAS

${montarMarcoRegulatorio(perfil)}

${blocosArgumentos}

${numRelacaoConsumo} — DA RELAÇÃO DE CONSUMO E DA INVERSÃO DO ÔNUS DA PROVA

Aplica-se ao caso o Código de Defesa do Consumidor, por se tratar de relação de consumo entre a parte Autora (consumidor hipervulnerável) e a parte Ré (fornecedora de serviço de apostas). Requer-se a inversão do ônus da prova, nos termos do art. 6º, VIII, do CDC.

${numPedidos} — DOS PEDIDOS

Diante do exposto, requer-se:

${pedidosFormatados}

Dá-se à causa o valor de ${valorCausaFmt}.

Nestes termos, pede deferimento.

${autor.comarca || "[CIDADE]"}, ${new Date().toLocaleDateString("pt-BR")}.

${autor.nome || "[NOME COMPLETO DO AUTOR]"}`;
}