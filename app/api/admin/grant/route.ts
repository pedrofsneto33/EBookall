import { NextRequest, NextResponse } from "next/server";
import { grantAccessByEmail } from "../../../lib/stripe-users";

export const runtime = "nodejs";

/**
 * Libera acesso após PIX no CNPJ Primex.
 * GET/POST ?email=x&key=ADMIN_SECRET
 * Defina ADMIN_SECRET na Vercel.
 */
export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}

async function handle(request: NextRequest) {
  try {
    const secret = process.env.ADMIN_SECRET?.trim();
    if (!secret) {
      return NextResponse.json(
        { error: "ADMIN_SECRET não configurada" },
        { status: 500 }
      );
    }

    const url = request.nextUrl;
    let email = url.searchParams.get("email") || "";
    let key = url.searchParams.get("key") || "";

    if (request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      email = String(body.email || email).trim();
      key = String(body.key || key).trim();
    }

    if (key !== secret) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    await grantAccessByEmail(email.toLowerCase(), "admin_grant");
    return NextResponse.json({
      ok: true,
      email: email.toLowerCase(),
      message: "Acesso liberado. Usuário pode entrar em /login e ir ao gerador.",
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    console.error("admin/grant:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
