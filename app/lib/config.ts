/** Preço único do produto (R$ 137,00) — fonte de verdade. */
export const PRECO_CENTAVOS = 13700;
export const PRECO_TXT = "137,00";
export const PRECO_INT = "137";

/** Limite de petições incluídas no acesso. */
export const MAX_PETICOES = 3;

export interface PerfilCasoConfig {
  id: string;
  title: string;
  desc: string;
}

export const PERFIS_CASO: PerfilCasoConfig[] = [
  { id: "autoexclusao", title: "Exclusão centralizada furada", desc: "Autoexcluiu e a casa ainda aceitou depósito." },
  { id: "ludopatia", title: "Ludopatia / dever de cuidado", desc: "Pedidos de limite ignorados." },
  { id: "publicidade", title: "Publicidade após pedir para parar", desc: "Bônus/push depois do opt-out." },
  { id: "saque", title: "Saque travado", desc: "Saldo existe, liberação enrolada." },
  { id: "premio_nao_pago", title: "Prêmio ou Aposta Ganha Não Paga", desc: "A casa não pagou o prêmio, cancelou a aposta ou alterou a cotação após o resultado." },
  { id: "conta_bloqueada", title: "Conta Bloqueada ou Suspensa", desc: "Sua conta foi bloqueada e o saldo retido sem justificativa ou direito de defesa." },
  { id: "bonus_rollover", title: "Bônus com Rollover Abusivo", desc: "A casa exigiu requisitos impossíveis para liberar o bônus, impedindo o saque." },
  { id: "publicidade_enganosa", title: "Publicidade Enganosa", desc: "A plataforma prometeu ganhos garantidos ou omitiu riscos, estimulando apostas." },
];


/** Salário mínimo vigente (fonte de verdade para limites do JEC). */
export const SALARIO_MINIMO = 1621;

/** Limite do Juizado Especial para jus postulandi (20 salários mínimos). */
export const LIMITE_JUS_POSTULANDI = SALARIO_MINIMO * 20;

/** Formata um valor em reais (BRL) de forma padronizada. */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}
