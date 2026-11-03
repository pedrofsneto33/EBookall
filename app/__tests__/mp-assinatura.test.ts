import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { assinaturaValida } from "../lib/server/mp-assinatura";

const secret = "segredo-teste";
const ts = "1700000000";
const rid = "req-abc";
const id = "123456";
const v1 = createHmac("sha256", secret).update(`id:${id};request-id:${rid};ts:${ts};`).digest("hex");

test("assinatura correta passa", () => {
  assert.equal(assinaturaValida(secret, `ts=${ts},v1=${v1}`, rid, id), true);
});
test("data.id em maiúsculas é normalizado", () => {
  const idMaiusc = "ABC123";
  const h = createHmac("sha256", secret).update(`id:abc123;request-id:${rid};ts:${ts};`).digest("hex");
  assert.equal(assinaturaValida(secret, `ts=${ts},v1=${h}`, rid, idMaiusc), true);
});
test("assinatura errada falha", () => {
  assert.equal(assinaturaValida(secret, `ts=${ts},v1=deadbeef`, rid, id), false);
});
test("request-id ou id diferentes falham", () => {
  assert.equal(assinaturaValida(secret, `ts=${ts},v1=${v1}`, "outro", id), false);
  assert.equal(assinaturaValida(secret, `ts=${ts},v1=${v1}`, rid, "999"), false);
});
test("secret vazio, header vazio ou sem ts/v1 falham", () => {
  assert.equal(assinaturaValida("", `ts=${ts},v1=${v1}`, rid, id), false);
  assert.equal(assinaturaValida(secret, "", rid, id), false);
  assert.equal(assinaturaValida(secret, `v1=${v1}`, rid, id), false);
  assert.equal(assinaturaValida(secret, `ts=${ts}`, rid, id), false);
});
