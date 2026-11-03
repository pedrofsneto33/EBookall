import { createHmac, timingSafeEqual } from "node:crypto";

/** Valida a assinatura x-signature do Mercado Pago.
 *  Formato do header: "ts=<timestamp>,v1=<hmac>"
 *  Manifest assinado: "id:<data.id>;request-id:<x-request-id>;ts:<ts>;"
 *  @param secret - MERCADOPAGO_WEBHOOK_SECRET
 *  @param xSignature - header x-signature do Mercado Pago
 *  @param xRequestId - header x-request-id
 *  @param dataId - data.id do pagamento (lowercase)
 * @returns true se a assinatura for válida, false caso contrário
 */
export function assinaturaValida(
  secret: string,
  xSignature: string,
  xRequestId: string,
  dataId: string
): boolean {
  if (!secret) return false;

  let ts = "";
  let v1 = "";
  for (const parte of xSignature.split(",")) {
    const [k, v] = parte.split("=").map((s) => s.trim());
    if (k === "ts") ts = v;
    if (k === "v1") v1 = v;
  }
  if (!ts || !v1 || !dataId) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${xRequestId};ts:${ts};`;
  const esperado = createHmac("sha256", secret).update(manifest).digest("hex");
  const a = Buffer.from(esperado, "utf8");
  const b = Buffer.from(v1, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}