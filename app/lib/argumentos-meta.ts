/**
 * Metadados dos argumentos e provas (seguro para o cliente).
 * Os TEXTOS jurídicos ficam em lib/server/argumentos.ts e só são montados
 * no servidor, depois de checar assinatura ativa e limite de petições.
 */
import type { Perfil } from "./config";

export interface ArgumentoMeta {
  id: string;
  perfis: Perfil[];
  label: string;
  dica?: string;
  /** Pré-marcado ao escolher o perfil. */
  padrao?: boolean;
}

export const ARGUMENTOS_META: ArgumentoMeta[] = [
  // ——— autoexclusão
  {
    id: "autoexclusao_descumprida",
    perfis: ["autoexclusao"],
    label: "A casa descumpriu a autoexclusão que eu fiz (aceitou depósito/aposta depois)",
    dica: "É o argumento central. Precisa da data da autoexclusão e do comprovante do depósito.",
    padrao: true,
  },
  {
    id: "nao_mero_descumprimento",
    perfis: ["autoexclusao", "saldo_retido"],
    label: "Deixar claro que não é reclamação por ter perdido aposta",
    dica: "Enquadra o caso como falha de serviço, não como arrependimento.",
    padrao: true,
  },
  {
    id: "deposito_pos_bloqueio",
    perfis: ["autoexclusao"],
    label: "A casa bloqueou/excluiu minha conta e depois aceitou novo depósito",
    dica: "Anexe prints do histórico de depósitos com data e hora.",
  },
  {
    id: "acesso_nao_bloqueado",
    perfis: ["autoexclusao"],
    label: "Mesmo após o pedido de bloqueio, eu ainda conseguia fazer login",
    dica: "Anexe prints de login/uso posterior à data do bloqueio.",
  },
  {
    id: "nao_exige_laudo_autoexclusao",
    perfis: ["autoexclusao"],
    label: "Autoexclusão não depende de laudo médico",
    dica: "Evita confundir o caso com ludopatia.",
    padrao: true,
  },
  // ——— saldo retido
  {
    id: "saldo_nao_restituido",
    perfis: ["saldo_retido"],
    label: "O saldo não foi restituído nos prazos da MP 1.394/2026",
    dica: "Use se o encerramento das bets já ocorreu e o dinheiro não voltou. Anexe extrato do saldo.",
    padrao: true,
  },
  {
    id: "retencao_enriquecimento",
    perfis: ["saldo_retido"],
    label: "A retenção do meu saldo é enriquecimento sem causa",
    dica: "Vale também para saque negado ou estornado fora do prazo.",
    padrao: true,
  },
  // ——— ludopatia
  {
    id: "nulidade_art26",
    perfis: ["ludopatia"],
    label: "Tenho laudo de ludopatia: as apostas são nulas (art. 26 da Lei 14.790/2023)",
    dica: "Exige laudo de profissional de saúde mental habilitado. Sem laudo, não marque.",
    padrao: true,
  },
  {
    id: "dever_jogo_responsavel",
    perfis: ["ludopatia"],
    label: "A casa descumpriu o dever de jogo responsável / prevenção",
    dica: "Use com prova de padrão compulsivo (depósitos seguidos, madrugada, empréstimos).",
  },
  // ——— prêmio não pago
  {
    id: "premio_nao_pago_falha",
    perfis: ["premio_nao_pago"],
    label: "A casa não pagou o prêmio/aposta ganha (falha de serviço)",
    dica: "É o argumento central. Anexe o ticket/aposta e o resultado oficial.",
    padrao: true,
  },
  // ——— conta bloqueada
  {
    id: "conta_bloqueada_sem_justa_causa",
    perfis: ["conta_bloqueada"],
    label: "Bloqueio da conta sem justa causa ou direito de defesa",
    dica: "Anexe o comunicado de bloqueio e o extrato do saldo retido.",
    padrao: true,
  },
  // ——— bônus rollover
  {
    id: "rollover_abusivo",
    perfis: ["bonus_rollover"],
    label: "Rollover abusivo/irrealizável do bônus",
    dica: "Anexe os termos do bônus e o histórico de apostas.",
    padrao: true,
  },
  // ——— publicidade enganosa
  {
    id: "publicidade_enganosa",
    perfis: ["publicidade_enganosa"],
    label: "Publicidade enganosa (promessas de ganho / omissão de riscos)",
    dica: "Anexe os anúncios/promessas e prints de marketing.",
    padrao: true,
  },
  // ——— comuns
  {
    id: "hipervulnerabilidade",
    perfis: ["autoexclusao", "ludopatia", "saldo_retido", "premio_nao_pago", "conta_bloqueada", "bonus_rollover", "publicidade_enganosa"],
    label: "Consumidor hipervulnerável (vulnerabilidade agravada)",
    dica: "Mais forte em autoexclusão e ludopatia.",
  },
  {
    id: "fortuito_interno",
    perfis: ["autoexclusao", "ludopatia", "saldo_retido", "premio_nao_pago", "conta_bloqueada", "bonus_rollover", "publicidade_enganosa"],
    label: "Falha no sistema da casa é risco dela (fortuito interno)",
    dica: "Use se a casa culpar “erro de sistema” ou “integração”.",
  },
  {
    id: "dano_moral_falha",
    perfis: ["autoexclusao", "ludopatia", "saldo_retido", "premio_nao_pago", "conta_bloqueada", "bonus_rollover", "publicidade_enganosa"],
    label: "Fundamentar o pedido de dano moral",
    dica: "Marque se você pede dano moral.",
    padrao: true,
  },
];

export interface CondicionalMeta {
  id: string;
  perfis: Perfil[];
  label: string;
}

export const CONDICIONAIS_META: CondicionalMeta[] = [
  {
    id: "cond_email",
    perfis: ["autoexclusao"],
    label: "Tenho e-mail da casa dizendo “conta bloqueada” e, no mesmo dia, um depósito aceito (contradição temporal)",
  },
  {
    id: "cond_devolucao",
    perfis: ["autoexclusao", "saldo_retido", "ludopatia"],
    label: "A casa devolveu parte do valor (reconhecimento implícito)",
  },
];

export interface ProvaMeta {
  id: string;
  texto: string;
  /** Como aparece na lista de documentos da petição. */
  anexo: string;
  perfis?: Perfil[];
}

export const PROVAS_META: ProvaMeta[] = [
  { id: "autoexclusao", perfis: ["autoexclusao"], texto: "Comprovante da Autoexclusão Centralizada (gov.br) com data visível", anexo: "Comprovante de autoexclusão centralizada" },
  { id: "extrato_pos", perfis: ["autoexclusao"], texto: "Extrato da plataforma mostrando depósito/aposta APÓS a autoexclusão", anexo: "Extrato da plataforma com movimentação posterior à autoexclusão" },
  { id: "comprovante", texto: "Comprovante bancário (Pix/cartão/boleto) do depósito", anexo: "Comprovante(s) bancário(s) do(s) depósito(s)" },
  { id: "saldo_extrato", perfis: ["saldo_retido"], texto: "Print/extrato do saldo disponível e do saque negado, estornado ou pendente", anexo: "Extrato do saldo e do saque não efetivado" },
  { id: "comunicado_mp", perfis: ["saldo_retido"], texto: "Comunicado da casa sobre encerramento e devolução de saldo (e-mail/app)", anexo: "Comunicado da ré sobre encerramento e restituição de saldo" },
  { id: "email_bloqueio", texto: "E-mail da empresa informando bloqueio/encerramento (com data e hora)", anexo: "E-mail da ré informando bloqueio/encerramento da conta" },
  { id: "chat", texto: "Print do chat/suporte com a negativa ou resposta evasiva (com protocolo)", anexo: "Registro de atendimento (chat/suporte) com protocolo" },
  { id: "consumidor_gov", texto: "Reclamação no Consumidor.gov.br ou Procon", anexo: "Reclamação registrada em canal de defesa do consumidor" },
  { id: "laudo", perfis: ["ludopatia"], texto: "Laudo de profissional de saúde mental (CID-10 F63.0 / CID-11 6C50), ex.: CAPS/SUS", anexo: "Laudo de profissional de saúde mental" },
  { id: "emprestimos", perfis: ["ludopatia"], texto: "Comprovantes de empréstimos ou uso recorrente de cartão para apostar", anexo: "Comprovantes de empréstimos/uso recorrente de crédito para apostar" },
  { id: "cnpj", texto: "CNPJ da operadora (Receita Federal / Casa dos Dados)", anexo: "Cartão CNPJ da ré" },
];

export const argumentosDoPerfil = (p: Perfil) => ARGUMENTOS_META.filter((a) => a.perfis.includes(p));
export const condicionaisDoPerfil = (p: Perfil) => CONDICIONAIS_META.filter((a) => a.perfis.includes(p));
export const provasDoPerfil = (p: Perfil) => PROVAS_META.filter((a) => !a.perfis || a.perfis.includes(p));
export const argumentosPadrao = (p: Perfil) => argumentosDoPerfil(p).filter((a) => a.padrao).map((a) => a.id);
