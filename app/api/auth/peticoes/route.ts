import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { incrementPeticoes, MAX_PETICOES } from "../../../lib/stripe-users";
import { rateLimit } from "../../../lib/rate-limit";

export const runtime = "nodejs";

/**
 * POST: registra +1 petição no metadata Stripe do Customer.
 * Bloqueia se já usou 3.
 */
export async function POST() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    if (!rateLimit(`pet:${session.email}`, 40, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde" },
        { status: 429 }
      );
    }

    const result = await incrementPeticoes(session.email);
    if (!result.ok) {
      return NextResponse.json(
        {
          error: result.error || "Limite de petições atingido",
          peticoes_usadas: result.peticoes_usadas,
          peticoes_max: MAX_PETICOES,
          limitReached: true,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      ok: true,
      peticoes_usadas: result.peticoes_usadas,
      peticoes_max: MAX_PETICOES,
      limitReached: result.limitReached,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
