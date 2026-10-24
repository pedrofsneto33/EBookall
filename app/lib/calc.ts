import { LIMITE_JEC, LIMITE_JUS_POSTULANDI } from "./config";

/** Aceita "1.234,56", "1234,56", "1234.56", "R$ 2.500" e "2500". */
export function parseBRL(input: string | number | null | undefined): number {
  if (typeof input === "number") return Number.isFinite(input) ? input : 0;
  if (!input) return 0;
  let s = String(input).replace(/[R$\s]/gi, "");
  if (!s) return 0;
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", ".");
  } else if (/^\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, "");
  }
  const n = parseFloat(s);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Meses completos entre duas datas ISO (AAAA-MM-DD). */
export function mesesEntre(dataISO: string, hoje = new Date()): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataISO)) return 0;
  const [y, m, d] = dataISO.split("-").map(Number);
  let meses = (hoje.getFullYear() - y) * 12 + (hoje.getMonth() + 1 - m);
  if (hoje.getDate() < d) meses -= 1;
  return Math.max(0, meses);
}

export interface CausaInput {
  valor: number;
  dataFato?: string;
  dobro?: boolean;
  danoMoral?: boolean;
  valorDanoMoral?: number;
  /** Quanto a casa já devolveu (abate do pedido de restituição). */
  devolvido?: number;
}

export interface CausaResultado {
  base: number;
  comDobro: number;
  juros: number;
  meses: number;
  danoMoral: number;
  total: number;
  /** Soma dos pedidos, SEM juros estimados: é o que vai na petição como valor da causa. */
  valorCausa: number;
  /** Restituição a pedir (já com dobro e abatendo o que foi devolvido). */
  restituicao: number;
  /** Passou de 20 SM: precisa de advogado/Defensoria para protocolar. */
  precisaAdvogado: boolean;
  /** Passou de 40 SM: fora da competência do Juizado Especial. */
  foraDoJec: boolean;
}

/**
 * Estimativa do valor da causa. Os juros aqui são só uma ESTIMATIVA
 * (1% a.m. simples); na sentença o juiz aplica o índice legal.
 */
export function calcularCausa(i: CausaInput): CausaResultado {
  const base = Math.max(0, i.valor || 0);
  const meses = i.dataFato ? mesesEntre(i.dataFato) : 0;
  const comDobro = i.dobro ? base * 2 : base;
  const juros = comDobro * 0.01 * meses;
  const danoMoral = i.danoMoral ? Math.max(0, i.valorDanoMoral || 0) : 0;
  const devolvido = Math.max(0, i.devolvido || 0);
  const restituicao = Math.max(0, comDobro - devolvido);
  const total = Math.max(0, comDobro - devolvido) + juros + danoMoral;
  const valorCausa = restituicao + danoMoral;
  return {
    base,
    comDobro,
    juros,
    meses,
    danoMoral,
    total,
    valorCausa,
    restituicao,
    precisaAdvogado: valorCausa > LIMITE_JUS_POSTULANDI,
    foraDoJec: valorCausa > LIMITE_JEC,
  };
}
