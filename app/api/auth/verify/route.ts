import { NextRequest, NextResponse } from "next/server";
import {
  verifyMagicToken,
  createSessionToken,
  setSessionCookie,
} from "../../../lib/auth";
import { hasPaidAccess } from "../../../lib/stripe-users";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || "https://recuperajogo.vercel.app";

  if (!token) {
    return NextResponse.redirect(`${origin}/login?error=link_invalido`);
  }

  const user = await verifyMagicToken(token);
  if (!user) {
    return NextResponse.redirect(`${origin}/login?error=link_expirado`);
  }

  const sessionToken = await createSessionToken(user);
  let paid = false;
  try {
    paid = await hasPaidAccess(user.email);
  } catch {
    paid = false;
  }

  const dest = paid ? `${origin}/gerador` : `${origin}/pagamento`;
  const res = NextResponse.redirect(dest);
  setSessionCookie(res, sessionToken);
  return res;
}
