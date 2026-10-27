import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { rateLimit } from "../../../lib/rate-limit";
import { grantAccessByEmail } from "../../../lib/users";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(`admin-grant:${ip}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente mais tarde." },
        { status: 429 }
      );
    }

    const secret = process.env.ADMIN_SECRET?.trim();
    if (!secret) {
      return NextResponse.json(
        { error: "ADMIN_SECRET nao configurada" },
        { status: 500 }
      );
    }

    const body = await request.json().catch((err) => {
      return {};
    });
    const email = String(body.email ?? "").trim();
    const key = String(body.key ?? "");


    const a = Buffer.from(key);
    const b = Buffer.from(secret);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "E-mail invalido" }, { status: 400 });
    }

    const target = email.toLowerCase();
    await grantAccessByEmail(target, "admin_grant");
    return NextResponse.json({ ok: true, email: target });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro";
    console.error("admin/grant:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
