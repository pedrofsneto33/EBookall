import { createClient } from "@supabase/supabase-js";

// Placeholder evita crash no `next build` quando env vars não estão no ambiente de build.
// Em produção o Vercel injeta as vars reais.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
