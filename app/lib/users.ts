import { ensureDb, normalizeEmail } from "./db";
import { MAX_PETICOES } from "./config";

/**
 * Regras de acesso e limite de petições agora vivem na tabela `users`
 * (SQLite/libsql).
 */

/** Limite de petições incluídas no acesso (fonte de verdade: `config.ts`). */
export { MAX_PETICOES };

export type AccessStatus = "pending" | "active";

type UserRecord = {
  status: AccessStatus;
  peticoes_usadas: number;
  stripe_customer_id: string | null;
  stripe_session_id: string | null;
};

function toInt(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

/** Converte uma coluna TEXT do libSQL (Value) para string | null. */
function toText(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") return value;
  if (value instanceof Uint8Array) return new TextDecoder().decode(value);
  return String(value);
}

/** Lê o usuário. Retorna null se ainda não existir na tabela. */
async function findUser(email: string): Promise<UserRecord | null> {
  const db = await ensureDb();
  const rs = await db.execute({
    sql: `SELECT status, peticoes_usadas, stripe_customer_id, stripe_session_id
            FROM users WHERE email = ?`,
    args: [email],
  });
  const row = rs.rows[0];
  if (!row) return null;
  return {
    status: row.status === "active" ? "active" : "pending",
    peticoes_usadas: toInt(row.peticoes_usadas),
    stripe_customer_id: toText(row.stripe_customer_id),
    stripe_session_id: toText(row.stripe_session_id),
  };
}

/** Garante que o usuário exista (cria como pending se necessário). */
async function ensureUser(email: string): Promise<void> {
  const db = await ensureDb();
  await db.execute({
    sql: `INSERT INTO users (email, status, peticoes_usadas)
          VALUES (?, 'pending', 0)
          ON CONFLICT(email) DO NOTHING`,
    args: [email],
  });
}


export interface PeticaoRecord {
  id: number;
  perfil: string;
  valorCausa: string | null;
  texto: string;
  createdAt: string;
}

/** Acesso pago: usuário ativo na tabela users. */
export async function hasPaidAccess(email: string): Promise<boolean> {
  const target = normalizeEmail(email);
  if (!target) return false;
  try {
    const user = await findUser(target);
    return user?.status === "active";
  } catch (e) {
    console.error("hasPaidAccess:", e);
    return false;
  }
}

/** Quantas petições o e-mail já gerou (tabela users no SQLite). */
export async function getPeticoesUsadas(email: string): Promise<number> {
  const target = normalizeEmail(email);
  if (!target) return 0;
  try {
    const user = await findUser(target);
    return user?.peticoes_usadas ?? 0;
  } catch (e) {
    console.error("getPeticoesUsadas:", e);
    return 0;
  }
}


/**
 * Incrementa o contador de petições do usuário.
 * Retorna { ok, peticoes_usadas, limitReached }.
 * Se já estiver no limite, não incrementa.
 */
export async function incrementPeticoes(
  email: string
): Promise<{ ok: boolean; peticoes_usadas: number; limitReached: boolean; error?: string }> {
  const target = normalizeEmail(email);
  if (!target) {
    return { ok: false, peticoes_usadas: 0, limitReached: false, error: "E-mail inválido" };
  }

  try {
    const db = await ensureDb();
    await ensureUser(target);

    // O WHERE já trava o limite: o UPDATE só aplica enquanto < MAX.
    const rs = await db.execute({
      sql: `UPDATE users
            SET peticoes_usadas = peticoes_usadas + 1,
                updated_at = datetime('now')
            WHERE email = ? AND peticoes_usadas < ?
            RETURNING peticoes_usadas`,
      args: [target, MAX_PETICOES],
    });

    // libsql local retorna rowsAffected=0 mesmo com RETURNING.
    // Usar rows.length.
    if (rs.rows.length !== 1) {
      const used = await getPeticoesUsadas(target);
      return {
        ok: false,
        peticoes_usadas: used,
        limitReached: true,
        error: `Limite de ${MAX_PETICOES} petições atingido.`,
      };
    }

    const next = toInt(rs.rows[0].peticoes_usadas);
    return { ok: true, peticoes_usadas: next, limitReached: next >= MAX_PETICOES };
  } catch (e) {
    console.error("incrementPeticoes:", e);
    return {
      ok: false,
      peticoes_usadas: 0,
      limitReached: false,
      error: "Não foi possível registrar a petição. Tente novamente.",
    };
  }
}

/** Libera acesso (PIX manual, admin ou webhook). Idempotente por e-mail. */
export async function grantAccessByEmail(email: string, reason = "manual"): Promise<void> {
  const target = normalizeEmail(email);
  if (!target) throw new Error("E-mail inválido");

  const db = await ensureDb();
  await db.execute({
    sql: `INSERT INTO users (email, status, peticoes_usadas, grant_reason, granted_at, updated_at)
          VALUES (?, 'active', 0, ?, ?, datetime('now'))
          ON CONFLICT(email) DO UPDATE SET
            status = 'active',
            grant_reason = excluded.grant_reason,
            granted_at = excluded.granted_at,
            updated_at = datetime('now')`,
    args: [target, reason, new Date().toISOString()],
  });
}


/** Salva uma petição gerada pelo usuário. */
export async function savePeticao(
  email: string,
  data: { perfil: string; valorCausa?: string; texto: string }
): Promise<void> {
  const target = normalizeEmail(email);
  if (!target) return;
  const db = await ensureDb();
  await db.execute({
    sql: `INSERT INTO peticoes (email, perfil, valor_causa, texto) VALUES (?, ?, ?, ?)`,
    args: [target, data.perfil, data.valorCausa || null, data.texto],
  });
}

/** Lista as petições do usuário (mais recentes primeiro). */
export async function listPeticoes(email: string): Promise<PeticaoRecord[]> {
  const target = normalizeEmail(email);
  if (!target) return [];
  try {
    const db = await ensureDb();
    const rs = await db.execute({
      sql: `SELECT id, perfil, valor_causa, texto, created_at
            FROM peticoes WHERE email = ? ORDER BY created_at DESC, id DESC`,
      args: [target],
    });
    return rs.rows.map((row) => ({
      id: toInt(row.id),
      perfil: toText(row.perfil) || "",
      valorCausa: toText(row.valor_causa),
      texto: toText(row.texto) || "",
      createdAt: toText(row.created_at) || "",
    }));
  } catch (e) {
    console.error("listPeticoes:", e);
    return [];
  }
}
