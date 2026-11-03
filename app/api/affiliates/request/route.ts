import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "../../../lib/db";
import { normalizeEmail } from "../../../lib/db";
import { dbRateLimit } from "../../../lib/rate-limit-db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Rate limit por IP: máximo 5 por hora
    if (!(await dbRateLimit(`affiliate-req:${ip}`, 5, 60 * 60 * 1000))) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const nome = String(body.nome ?? "").trim();
    const email = normalizeEmail(String(body.email ?? ""));
    const whatsapp = String(body.whatsapp ?? "").trim();

    // Validações de tamanho e formato
    if (!nome || nome.length < 2 || nome.length > 100) {
      return NextResponse.json(
        { error: "Nome deve ter entre 2 e 100 caracteres." },
        { status: 400 }
      );
    }
    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido ou excede 254 caracteres." },
        { status: 400 }
      );
    }
    if (whatsapp && (!/^\d{10,13}$/.test(whatsapp))) {
      return NextResponse.json(
        { error: "WhatsApp deve conter apenas dígitos (10 a 13 caracteres)." },
        { status: 400 }
      );
    }

    const db = await ensureDb();
    try {
      await db.execute({
        sql: `INSERT INTO affiliate_requests (id, nome, email, whatsapp, status) VALUES (?, ?, ?, ?, 'pendente')`,
        args: [crypto.randomUUID(), nome, email, whatsapp || null],
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.message.toLowerCase().includes("unique")) {
        return NextResponse.json(
          { error: "Este e-mail já possui uma solicitação pendente." },
          { status: 409 }
        );
      }
      throw err;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("affiliates/request:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}