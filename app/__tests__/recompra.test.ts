import { test, before } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

let grantAccessByEmail: typeof import("../lib/users").grantAccessByEmail;
let ensureDb: typeof import("../lib/db").ensureDb;

before(async () => {
  process.env.DATABASE_URL = `file:${join(mkdtempSync(join(tmpdir(), "rj-")), "t.db")}`;
  process.env.AUTH_SECRET = "x".repeat(40);
  ({ grantAccessByEmail } = await import("../lib/users"));
  ({ ensureDb } = await import("../lib/db"));
});

async function usadas(email: string) {
  const db = await ensureDb();
  const r = await db.execute({ sql: "SELECT peticoes_usadas AS n FROM users WHERE email = ?", args: [email] });
  return Number(r.rows[0]?.n);
}
async function setUsadas(email: string, n: number) {
  const db = await ensureDb();
  await db.execute({ sql: "UPDATE users SET peticoes_usadas = ? WHERE email = ?", args: [n, email] });
}

test("3/3 + nova compra: contador volta a 0", async () => {
  await grantAccessByEmail("a@teste.com", "mercadopago_pix");
  await setUsadas("a@teste.com", 3);
  await grantAccessByEmail("a@teste.com", "mercadopago_pix", { novaCompra: true });
  assert.equal(await usadas("a@teste.com"), 0);
});

test("1/3 + nova compra: contador não muda", async () => {
  await grantAccessByEmail("b@teste.com", "mercadopago_pix");
  await setUsadas("b@teste.com", 1);
  await grantAccessByEmail("b@teste.com", "mercadopago_pix", { novaCompra: true });
  assert.equal(await usadas("b@teste.com"), 1);
});

test("3/3 + grant do admin sem novaCompra: continua 3/3", async () => {
  await grantAccessByEmail("c@teste.com", "admin");
  await setUsadas("c@teste.com", 3);
  await grantAccessByEmail("c@teste.com", "admin");
  assert.equal(await usadas("c@teste.com"), 3);
});

test("pagamentos: o mesmo payment_id só registra uma vez (base da idempotência do webhook)", async () => {
  const db = await ensureDb();
  const ins = () =>
    db.execute({
      sql: "INSERT OR IGNORE INTO pagamentos (payment_id, email, valor, origem) VALUES (?, ?, ?, ?)",
      args: ["pay-1", "d@teste.com", 137, "mercadopago_pix"],
    });
  assert.equal((await ins()).rowsAffected, 1);
  assert.equal((await ins()).rowsAffected, 0);
});
