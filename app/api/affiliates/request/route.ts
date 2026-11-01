import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "../../../lib/db";
import { normalizeEmail } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const nome = String(body.nome ?? "").trim();
    const email = normalizeEmail(String(body.email ?? ""));
    const whatsapp = String(body.whatsapp ?? "").trim();

    if (!nome || nome.length < 2) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const db = await ensureDb();
    try {
      await db.execute({
        sql: `INSERT INTO affiliate_requests (id, nome, email, whatsapp, status) VALUES (?, ?, ?, ?, 'pendente')`,
        args: [crypto.randomUUID(), nome, email, whatsapp || null],
      });
    } catch (err: any) {
      if (err?.message?.toLowerCase().includes("unique")) {
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