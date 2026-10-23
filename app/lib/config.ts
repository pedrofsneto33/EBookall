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
