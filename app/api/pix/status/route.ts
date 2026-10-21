import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { rateLimit } from "../../../lib/rate-limit";
import { consultarPagamento } from "../../../lib/asaas";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Faça login" }, { status: 401 });
    }

    if (!rateLimit(`pixstatus:${session.id}`, 60, 60 * 1000)) {
      return NextResponse.json({ error: "Muitas consultas. Aguarde." }, { status: 429 });
    }

    const paymentId = request.nextUrl.searchParams.get("paymentId");
    if (!paymentId || !/^pay_[a-zA-Z0-9]+$/.test(paymentId)) {
      return NextResponse.json({ error: "paymentId inválido" }, { status: 400 });
    }

    const { status } = await consultarPagamento(paymentId);
    return NextResponse.json({ status });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    console.error("GET /api/pix/status:", message);
    return NextResponse.json({ error: "Erro ao consultar pagamento" }, { status: 500 });
  }
}
