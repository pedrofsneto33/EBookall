/**
 * Constantes únicas do produto. Tudo que aparece em mais de um lugar
 * (preço, limite do JEC, WhatsApp, prazos da MP) mora aqui.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://recuperajogo.vercel.app"
).replace(/\/$/, "");

/** Preço em centavos (fonte da verdade do checkout) e texto de exibição. */
export const PRECO_CENTAVOS = 13700;
export const PRECO_TXT = "137,00";
export const PRECO_INT = "137";

/** Salário mínimo vigente. Atualize via env quando mudar (2026: R$ 1.621). */
export const SALARIO_MINIMO =
  Number(process.env.NEXT_PUBLIC_SALARIO_MINIMO) > 0
    ? Number(process.env.NEXT_PUBLIC_SALARIO_MINIMO)
    : 1621;

/** Até 20 SM: dispensa advogado (jus postulandi). Até 40 SM: competência do JEC. */
export const LIMITE_JUS_POSTULANDI = SALARIO_MINIMO * 20;
export const LIMITE_JEC = SALARIO_MINIMO * 40;

export const MAX_PETICOES = 3;
export const ACCESS_DAYS = 365;
export const GARANTIA_DIAS = 7;

export const WHATSAPP = "5586988117925";
export const WHATSAPP_TXT = "(86) 98811-7925";
export const waLink = (msg = "Oi! Vi o site do RecuperaJogo e tenho uma dúvida.") =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export const EMPRESA = {
  nome: "Primex Sistemas LTDA",
  cnpj: "55.536.885/0001-30",
  site: "https://www.primexsistemas.com",
};

/** Marcos da MP 1.394/2026 (publicada em 25/09/2026). Ver landing #mp. */
export const MP = {
  numero: "Medida Provisória nº 1.394/2026",
  publicacao: "25/09/2026",
  url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/mpv/mpv1394.htm",
  /** Extinção estimada das autorizações (30 dias após a publicação). */
  extincaoISO: "2026-10-25T23:59:59-03:00",
  extincaoTxt: "25/10/2026",
};

export const PERFIS = ["autoexclusao", "ludopatia", "saldo_retido", "premio_nao_pago", "conta_bloqueada", "bonus_rollover", "publicidade_enganosa"] as const;
export type Perfil = (typeof PERFIS)[number];

export const PERFIL_LABEL: Record<Perfil, { titulo: string; desc: string }> = {
  autoexclusao: {
    titulo: "Exclusão centralizada furada",
    desc: "Autoexcluiu e a casa ainda aceitou depósito.",
  },
  ludopatia: {
    titulo: "Ludopatia / dever de cuidado",
    desc: "Pedidos de limite ignorados.",
  },
  saldo_retido: {
    titulo: "Saldo ou saque não devolvido",
    desc: "Tinha saldo na conta, o saque foi negado/estornado ou a restituição não chegou.",
  },
  premio_nao_pago: {
    titulo: "Prêmio ou Aposta Ganha Não Paga",
    desc: "A casa não pagou o prêmio, cancelou a aposta ou alterou a cotação após o resultado.",
  },
  conta_bloqueada: {
    titulo: "Conta Bloqueada ou Suspensa",
    desc: "Sua conta foi bloqueada e o saldo retido sem justificativa ou direito de defesa.",
  },
  bonus_rollover: {
    titulo: "Bônus com Rollover Abusivo",
    desc: "A casa exigiu requisitos impossíveis para liberar o bônus, impedindo o saque.",
  },
  publicidade_enganosa: {
    titulo: "Publicidade Enganosa",
    desc: "A plataforma prometeu ganhos garantidos ou omitiu riscos, estimulando apostas.",
  },
};
/** Formata um valor em reais (BRL) de forma padronizada. */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}

