/**
 * Rate limit em memória (Map por processo).
 *
 * Limitação: por instância serverless. Para produção real,
 * trocar por Upstash/Vercel KV.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Acima deste tamanho, varre as entradas expiradas. */
const MAX_ENTRIES = 5000;

/**
 * Teto duro de memória: número máximo de chaves rastreadas.
 * Só é atingido sob flood de chaves únicas (ataque distribuído).
 */
const HARD_MAX_ENTRIES = 50000;

/**
 * Intervalo mínimo entre varreduras completas. Evita percorrer o Map
 * inteiro a cada requisição sob flood (custo O(n) por request).
 */
const SWEEP_INTERVAL_MS = 1000;

/**
 * Balde global para chaves novas quando o teto duro é atingido.
 * Chaves já rastreadas NUNCA são despejadas — despejar rearmaria o
 * contador e abriria brecha para burlar o limite.
 */
const OVERFLOW_MAX = 100;
const OVERFLOW_WINDOW_MS = 60 * 1000;

const overflow: Bucket = { count: 0, resetAt: 0 };

let lastSweepAt = 0;

/** Remove as entradas expiradas. */
function sweepExpired(now: number) {
  for (const [k, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(k);
  }
}

/** Limita chaves novas quando o teto duro de memória foi atingido. */
function overflowLimit(now: number): boolean {
  if (overflow.resetAt <= now) {
    overflow.count = 1;
    overflow.resetAt = now + OVERFLOW_WINDOW_MS;
    return true;
  }
  if (overflow.count >= OVERFLOW_MAX) return false;
  overflow.count += 1;
  return true;
}

/**
 * Conta uma ocorrência para `key` e diz se ainda está dentro do limite.
 * @returns true = permitido; false = excedeu (rate limit atingido).
 */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();

  // Varredura periódica (não a cada request) para manter o Map enxuto.
  if (buckets.size > MAX_ENTRIES && now - lastSweepAt > SWEEP_INTERVAL_MS) {
    sweepExpired(now);
    lastSweepAt = now;
  }

  const existing = buckets.get(key);
  if (existing && existing.resetAt > now) {
    if (existing.count >= max) return false;
    existing.count += 1;
    return true;
  }

  // Chave nova (ou expirada): reinicia a janela.
  if (buckets.size >= HARD_MAX_ENTRIES && !overflowLimit(now)) return false;
  buckets.set(key, { count: 1, resetAt: now + windowMs });
  return true;
}