import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    temUser: !!process.env.BREVO_SMTP_USER,
    temPass: !!process.env.BREVO_SMTP_PASS,
    userComecaCom: process.env.BREVO_SMTP_USER?.substring(0, 5) || "vazio",
    userTemEspaco: process.env.BREVO_SMTP_USER !== process.env.BREVO_SMTP_USER?.trim(),
  });
}