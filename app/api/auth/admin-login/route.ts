import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { dbRateLimit } from "../../../lib/rate-limit-db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!(await dbRateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000))) {
      return NextResponse.json({ error: "Muitas tentativas. Tente novamente em 15 minutos." }, { status: 429 });
    }

    const { email, password } = await req.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;

    if (!email || !password || !adminEmail || !adminHash) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 400 });
    }

    const isEmailValid = email.toLowerCase().trim() === adminEmail.toLowerCase().trim();
    const isPasswordValid = await bcrypt.compare(password, adminHash);

    if (!isEmailValid || !isPasswordValid) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET?.slice(0, 64));
    const token = await new SignJWT({ email: adminEmail, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(adminEmail)
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(secret);

    (await cookies()).set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Erro no admin-login:", e);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}