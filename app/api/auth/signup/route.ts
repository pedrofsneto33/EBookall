import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json({ error: "Use /api/auth/request-link" }, { status: 410 });
}
