import { ensureDb } from "./db";

export async function dbRateLimit(key: string, max: number, windowMs: number): Promise<boolean> {
  try {
    const db = await ensureDb();
    const now = Date.now();

    // Conta quantas requisições foram feitas por essa chave dentro da janela de tempo
    const rs = await db.execute({
      sql: "SELECT COUNT(*) AS c FROM rate_hits WHERE k = ? AND t > ?",
      args: [key, now - windowMs],
    });

    const count = Number(rs.rows[0]?.c ?? 0);
    if (count >= max) {
      return false; // Excedeu o limite
    }

    // Registra a nova tentativa
    await db.execute({
      sql: "INSERT INTO rate_hits (k, t) VALUES (?, ?)",
      args: [key, now],
    });

    // Limpeza ocasional (2% de chance) para não encher o banco
    if (Math.random() < 0.02) {
      await db.execute({
        sql: "DELETE FROM rate_hits WHERE t < ?",
        args: [now - 24 * 60 * 60 * 1000],
      });
    }

    return true; // Permitido
  } catch (e) {
    console.error("Erro no dbRateLimit:", e);
    return true; // Em caso de falha no banco, deixa passar para não bloquear o cliente legítimo
  }
}