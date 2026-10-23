import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSession } from "../../../lib/auth";
import { incrementPeticoes, MAX_PETICOES, savePeticao, listPeticoes } from "../../../lib/users";
import { rateLimit } from "../../../lib/rate-limit";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    const peticoes = await listPeticoes(session.email);
    return NextResponse.json({ peticoes });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    if (!rateLimit(`pet:${session.email}`, 40, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde" },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({})) as {
      perfil?: string;
      valorCausa?: string;
      texto?: string;
    };

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

    if (body.texto) {
      try {
        await savePeticao(session.email, {
          perfil: body.perfil || "autoexclusao",
          valorCausa: body.valorCausa,
          texto: body.texto,
        });
      } catch (e) {
        console.error("savePeticao:", e);
      }
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
