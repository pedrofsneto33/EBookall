import { createClient, type Client } from "@libsql/client";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * Banco local (libsql/SQLite) com o status de acesso e o limite de petições.
 *
 * - Local (dev):  DATABASE_URL=file:./data/app.db
 * - Turso (prod): DATABASE_URL=libsql://xxx.turso.io  +  DATABASE_AUTH_TOKEN
 *
 * A inicialização é lazy e memoizada: o client e o schema são criados
 * na primeira chamada e reaproveitados (evita abrir conexão por request).
 */

const DEFAULT_LOCAL_URL = "file:./data/app.db";

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS users (
     email TEXT PRIMARY KEY,
     status TEXT NOT NULL DEFAULT 'pending',
     peticoes_usadas INTEGER NOT NULL DEFAULT 0,
     stripe_customer_id TEXT,
     stripe_session_id TEXT,
     grant_reason TEXT,
     granted_at TEXT,
     created_at TEXT NOT NULL DEFAULT (datetime('now')),
     updated_at TEXT NOT NULL DEFAULT (datetime('now'))
   )`,
  `CREATE INDEX IF NOT EXISTS idx_users_status ON users(status)`,
  `CREATE TABLE IF NOT EXISTS peticoes (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     email TEXT NOT NULL,
     perfil TEXT NOT NULL,
     valor_causa TEXT,
     texto TEXT NOT NULL,
     created_at TEXT NOT NULL DEFAULT (datetime('now'))
   )`,
  `CREATE INDEX IF NOT EXISTS idx_peticoes_email ON peticoes(email)`,
  `CREATE TABLE IF NOT EXISTS affiliates (
     id TEXT PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     code TEXT UNIQUE NOT NULL,
     comissao_percentual REAL DEFAULT 20,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   )`,
  `CREATE TABLE IF NOT EXISTS referrals (
     id TEXT PRIMARY KEY,
     affiliate_code TEXT NOT NULL,
     buyer_email TEXT NOT NULL,
     status TEXT DEFAULT 'pendente',
     valor_venda REAL,
     comissao_valor REAL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   )`,
];

function resolveUrl(): string {
  return process.env.DATABASE_URL?.trim() || DEFAULT_LOCAL_URL;
}

function ensureLocalDir(url: string) {
  // O driver não cria o diretório do arquivo .db — criamos antes.
  const filePath = url.slice("file:".length);
  const dir = path.dirname(path.resolve(filePath));
  mkdirSync(dir, { recursive: true });
}

async function createClientAndInit(): Promise<Client> {
  const url = resolveUrl();
  if (url.startsWith("file:")) ensureLocalDir(url);

  const client = createClient({
    url,
    authToken: process.env.DATABASE_AUTH_TOKEN?.trim() || undefined,
  });

  for (const stmt of SCHEMA_STATEMENTS) {
    await client.execute(stmt);
  }
  return client;
}

let dbPromise: Promise<Client> | null = null;

/** Client único do processo, com schema aplicado na primeira chamada. */
export function ensureDb(): Promise<Client> {
  if (!dbPromise) {
    dbPromise = createClientAndInit().catch((err: unknown) => {
      // Libera a memoização para permitir nova tentativa no próximo request.
      dbPromise = null;
      throw err;
    });
  }
  return dbPromise;
}

/** Normaliza e-mail para a chave da tabela users. */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}
