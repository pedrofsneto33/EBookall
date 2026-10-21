import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { grantAccessByEmail } from "../../../lib/users";

export const runtime = "nodejs";

/**
 * Libera acesso após PIX no CNPJ Primex.
 * POST JSON { email, key } — a chave nunca vai na URL.
 * Defina ADMIN_SECRET na Vercel.
 */
export async function POST(request: NextRequest) {
  try {
    const secret = process.env.ADMIN_SECRET?.trim();
    if (!secret) {
      return NextResponse.json(
        { error: "ADMIN_SECRET não configurada" },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const email = String(body.email ?? "").trim();
    const key = String(body.key ?? "");

    // Comparação timing-safe (não vaza o secret por tempo de resposta).
    const a = Buffer.from(key);
    const b = Buffer.from(secret);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const target = email.toLowerCase();
    await grantAccessByEmail(target, "admin_grant");
    console.log(`[admin/grant] email=${target} ts=${new Date().toISOString()}`);
    return NextResponse.json({ ok: true, email: target });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    console.error("admin/grant:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
