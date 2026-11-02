import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { isAdmin } from "../../../lib/admin";
import { grantAccessByEmail } from "../../../lib/users";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !isAdmin(session.email)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const action = String(body.action ?? "");
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    if (action === "grant") {
      await grantAccessByEmail(email, "admin");
    } else if (action === "revoke") {
      const db = await import("../../../lib/db").then((m) => m.ensureDb());
      await db.execute({
        sql: "UPDATE users SET status = 'pending', peticoes_usadas = 0 WHERE email = ?",
        args: [email],
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Erro no user-action:", e);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}