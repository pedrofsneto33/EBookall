import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { ensureDb, normalizeEmail } from "../../../lib/db";
import { grantAccessByEmail } from "../../../lib/users";

const ADMIN_EMAIL = "pedrofsneto33@gmail.com";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.email.toLowerCase().trim() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  let body: { email?: string; action?: string } = {};
  try {
    body = (await req.json()) as { email?: string; action?: string };
  } catch {
    body = {};
  }

  const email = body.email ? normalizeEmail(body.email) : "";
  const action = body.action;

  if (!email || (action !== "grant" && action !== "revoke")) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  if (action === "grant") {
    await grantAccessByEmail(email, "admin");
  } else {
    const db = await ensureDb();
    await db.execute({
      sql: `UPDATE users SET status = 'inactive', updated_at = datetime('now') WHERE email = ?`,
      args: [email],
    });
  }

  return NextResponse.json({ ok: true });
}
