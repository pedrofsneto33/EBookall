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
  const s = process.env.AUTH_SECRET || process.env.STRIPE_SECRET_KEY;
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
  return new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

export async function createMagicToken(email: string): Promise<string> {
  const id = userIdFromEmail(email);
  return new SignJWT({ email: email.toLowerCase().trim(), purpose: "magic" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(id)
    .setIssuedAt()
    .setExpirationTime(`${LINK_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const id = payload.sub;
    const email = typeof payload.email === "string" ? payload.email : "";
    if (!id || !email) return null;
    return { id, email };
  } catch {
    return null;
  }
}

export async function verifyMagicToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.purpose !== "magic") return null;
    const id = payload.sub;
    const email = typeof payload.email === "string" ? payload.email : "";
    if (!id || !email) return null;
    return { id, email };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
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
