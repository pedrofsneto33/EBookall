const BASE = (process.env.ASAAS_BASE_URL || "https://api-sandbox.asaas.com/v3").replace(/\/$/, "");

async function asaasFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const apiKey = process.env.ASAAS_API_KEY;
  if (!apiKey) throw new Error("ASAAS_API_KEY não configurada");

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: apiKey,
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Asaas ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function criarCliente(email: string, nome: string): Promise<{ id: string }> {
  return asaasFetch<{ id: string }>("/customers", {
    method: "POST",
    body: JSON.stringify({ name: nome, email }),
  });
}

export async function criarCobrancaPix(
  customerId: string,
  valorCentavos: number,
  descricao: string,
  externalRef: string,
): Promise<{ id: string }> {
  const amanha = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  return asaasFetch<{ id: string }>("/payments", {
    method: "POST",
    body: JSON.stringify({
      customer: customerId,
      billingType: "PIX",
      value: valorCentavos / 100,
      dueDate: amanha,
      description: descricao,
      externalReference: externalRef,
    }),
  });
}

export async function obterQrCodePix(
  paymentId: string,
): Promise<{ encodedImage: string; payload: string; expirationDate: string }> {
  return asaasFetch<{ encodedImage: string; payload: string; expirationDate: string }>(
    `/payments/${paymentId}/pixQrCode`,
  );
}

export async function consultarPagamento(paymentId: string): Promise<{ status: string }> {
  return asaasFetch<{ status: string }>(`/payments/${paymentId}`);
}
