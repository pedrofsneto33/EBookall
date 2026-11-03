import { test, before } from "node:test";
import assert from "node:assert/strict";

process.env.NEXT_PUBLIC_SALARIO_MINIMO = "1621";

let parseBRL: typeof import("../lib/calc").parseBRL;
let LIMITE_JUS_POSTULANDI: number;
let PRECO_CENTAVOS: number;
let PRECO_INT: string;
let chaveCaso: typeof import("../lib/server/peticao").chaveCaso;

// Import dinâmico: o config lê NEXT_PUBLIC_SALARIO_MINIMO ao carregar.
before(async () => {
  ({ parseBRL } = await import("../lib/calc"));
  ({ LIMITE_JUS_POSTULANDI, PRECO_CENTAVOS, PRECO_INT } = await import("../lib/config"));
  ({ chaveCaso } = await import("../lib/server/peticao"));
});

test("parseBRL aceita formatos brasileiros", () => {
  assert.equal(parseBRL("8.000,00"), 8000);
  assert.equal(parseBRL("1.234,56"), 1234.56);
  assert.equal(parseBRL("R$ 2.500"), 2500);
  assert.equal(parseBRL("2500"), 2500);
  assert.equal(parseBRL("1234.56"), 1234.56);
});
test("parseBRL devolve 0 para lixo e vazio", () => {
  assert.equal(parseBRL(""), 0);
  assert.equal(parseBRL("abc"), 0);
  assert.equal(parseBRL(null), 0);
  assert.equal(parseBRL(undefined), 0);
  assert.equal(parseBRL("-5"), 0);
});

test("limite do jus postulandi = 20 salários mínimos (R$ 32.420)", () => {
  assert.equal(LIMITE_JUS_POSTULANDI, 32420);
});

test("preço é coerente (centavos x texto)", () => {
  assert.equal(PRECO_CENTAVOS / 100, Number(PRECO_INT));
});

const caso = (over: Record<string, unknown> = {}) =>
  ({
    autor: { cpf: "529.982.247-25" },
    reu: { cnpj: "11.222.333/0001-81" },
    perfil: "autoexclusao",
    dataFato: "2026-01-10",
    valorPerdido: 100,
    ...over,
  }) as never;

test("chaveCaso: mesmo caso, mesma chave (ignora máscara e outros campos)", () => {
  const a = chaveCaso(caso());
  const b = chaveCaso(caso({ autor: { cpf: "52998224725" }, valorPerdido: 999 }));
  assert.equal(a, b);
});
test("chaveCaso: perfil, data, CPF ou CNPJ diferentes geram chave diferente", () => {
  const base = chaveCaso(caso());
  assert.notEqual(base, chaveCaso(caso({ perfil: "saldo_retido" })));
  assert.notEqual(base, chaveCaso(caso({ dataFato: "2026-02-10" })));
  assert.notEqual(base, chaveCaso(caso({ autor: { cpf: "111.444.777-35" } })));
  assert.notEqual(base, chaveCaso(caso({ reu: { cnpj: "55.536.885/0001-30" } })));
});
