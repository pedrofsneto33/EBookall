import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "");
    if (!token) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const supabaseUser = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: existing } = await admin
      .from("subscriptions")
      .select("id, status, peticoes_usadas")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) return NextResponse.json({ subscription: existing, created: false });

    const { data, error } = await admin
      .from("subscriptions")
      .insert({ user_id: user.id, status: "pending", peticoes_usadas: 0 })
      .select()
      .single();

    if (error) {
      console.error("ensure subscription:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ subscription: data, created: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
