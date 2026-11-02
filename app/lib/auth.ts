import { randomUUID } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "rj_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 dias
const LINK_MAX_AGE = 60 * 30; // 30 min

export type SessionUser = {
  id: string;
  email: string;
};

function getSecret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET não configurada na Vercel");
  return new TextEncoder().encode(s.slice(0, 64));
}

/** ID estável a partir do e-mail (sem banco). */
export function userIdFromEmail(email: string): string {
  const normalized = email.toLowerCase().trim();
  // prefixo legível + hash curto
  let h = 0;
  for (let i = 0; i < normalized.length; i++) {
    h = (Math.imul(31, h) + normalized.charCodeAt(i)) | 0;
  }
  return `usr_${Math.abs(h).toString(16)}_${normalized.replace(/[^a-z0-9]/g, "").slice(0, 12)}`;
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ email: user.email, tipo: "sessao" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

export async function createMagicToken(email: string): Promise<string> {
  const id = userIdFromEmail(email);
  return new SignJWT({ email: email.toLowerCase().trim(), purpose: "magic", tipo: "magic" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(id)
    .setJti(randomUUID())
    .setIssuedAt()
    .setExpirationTime(`${LINK_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.tipo !== "sessao") return null;
    const id = payload.sub;
    const email = typeof payload.email === "string" ? payload.email : "";
    if (!id || !email) return null;
    return { id, email };
  } catch {
    return null;
  }
}

export type MagicTokenResult = {
  user: SessionUser;
  jti: string;
} | null;

export async function verifyMagicToken(token: string): Promise<MagicTokenResult> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.purpose !== "magic") return null;
    if (payload.tipo !== "magic") return null;
    const id = payload.sub;
    const email = typeof payload.email === "string" ? payload.email : "";
    const jti = typeof payload.jti === "string" ? payload.jti : "";
    if (!id || !email || !jti) return null;
    return { user: { id, email }, jti };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();

  // 1. Tenta a sessão normal de cliente (rj_session)
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    const user = await verifySessionToken(token);
    if (user) return user;
  }

  // 2. Tenta a sessão exclusiva de admin (admin_session)
  const adminToken = jar.get("admin_session")?.value;
  if (adminToken) {
    try {
      const { payload } = await jwtVerify(adminToken, getSecret());
      if (payload.role === "admin" && typeof payload.email === "string") {
        return { id: userIdFromEmail(payload.email), email: payload.email };
      }
    } catch {
      // Token de admin inválido/expirado, ignora e segue
    }
  }

  return null;
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
