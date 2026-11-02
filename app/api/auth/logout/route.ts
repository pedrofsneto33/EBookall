import { NextResponse } from "next/server";
import { clearSessionCookie } from "../../../lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  clearSessionCookie(res);
  res.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
  return res;
}
