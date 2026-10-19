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
  valorBase: number;
  valorCausa: number;
}

export const ARGUMENTOS: Argumento[] = [
  {
    id: "nao_mero_descumprimento",
    perfis: ["autoexclusao"],
    label: "Quero deixar claro desde já: isso não é birra por ter perdido aposta",
    texto: () => `Esclarece-se, desde logo, que a presente demanda não decorre de mero arrependimento por perdas em apostas regularmente realizadas. O núcleo da controvérsia é o descumprimento de obrigação regulatória específica do setor — falha no sistema de autoexclusão, com manutenção indevida de conta ativa e aceitação de depósito(s) e/ou aposta(s) após a formalização do pedido de autoexclusão pela parte Autora.`,
    dicaProva: "Argumento de enquadramento."
  },
  {
    id: "deposito_pos_bloqueio",
    perfis: ["autoexclusao"],
    label: "A casa bloqueou/excluiu minha conta e, depois, aceitou novo depósito",
    texto: (dataFato) => `A parte Ré bloqueou/excluiu a conta da parte Autora e, ainda assim, voltou a aceitar depósito(s) posteriormente${dataFato ? ` (fato ocorrido em ${dataFato})` : ""}. Tal contradição evidencia falha grave no dever de cuidado, nos termos do art. 14 do CDC.`,
    dicaProva: "Anexe prints do histórico de depósitos."
  },
  {
    id: "acesso_nao_bloqueado",
    perfis: ["autoexclusao"],
    label: "Mesmo pedindo bloqueio, ainda conseguia fazer login",
    texto: () => `Ainda que a parte Autora tenha solicitado o bloqueio de sua conta, a parte Ré não impediu efetivamente o acesso à plataforma.`,
    dicaProva: "Anexe prints de login após a data do bloqueio."
  },
  {
    id: "nao_exige_laudo_autoexclusao",
    perfis: ["autoexclusao"],
    label: "Autoexclusão não precisa de laudo médico",
    texto: () => `A proteção decorrente da autoexclusão não exige laudo médico, perícia ou interdição civil.`,
    dicaProva: "Essencial para não confundir com ludopatia."
  },
  {
    id: "nulidade_art26",
    perfis: ["ludopatia"],
    label: "Tenho diagnóstico de transtorno do jogo patológico",
    texto: () => `Nos termos do art. 26 da Lei nº 14.790/2023, as apostas realizadas por pessoa diagnosticada com transtorno do jogo patológico são nulas de pleno direito.`,
    dicaProva: "Laudo ou relatório de saúde mental fortalece o argumento."
  },
  {
    id: "hipervulnerabilidade",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Consumidor hipervulnerável",
    texto: () => `A parte Autora deve ser reconhecida como consumidor hipervulnerável, com proteção reforçada no ordenamento brasileiro.`,
    dicaProva: "Argumento de enquadramento."
  },
  {
    id: "fortuito_interno",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Falha no sistema da casa é responsabilidade dela",
    texto: () => `Nos termos do art. 14 do CDC, a responsabilidade do fornecedor é objetiva. Falhas operacionais configuram fortuito interno.`,
    dicaProva: "Use se a casa culpar erro no sistema."
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
    id: "exibicao_documentos",
    perfis: ["autoexclusao", "ludopatia"],
    label: "Pedir logs de consulta ao SIGAP",
    texto: () => `a exibição, pela parte Ré, dos registros de comunicação de bloqueio e dos logs de consulta ao SIGAP referentes ao CPF da parte Autora, nos termos dos arts. 396 e seguintes do CPC`,
  },
];

export function filtrarPedidosPorPerfil(perfil: "autoexclusao" | "ludopatia"): PedidoEspecial[] {
  return PEDIDOS_ESPECIAIS.filter((p) => p.perfis.includes(perfil));
}

export function gerarPeticao(dados: DadosPeticao): string {
  return "Petição gerada.";
}
