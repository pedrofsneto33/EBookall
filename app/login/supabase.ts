import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * NEXT_PUBLIC_* precisa estar como Plain (não Sensitive) na Vercel,
 * senão o bundle do browser fica sem URL e o cadastro dá "Failed to fetch".
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes("placeholder") &&
  supabaseAnonKey !== "placeholder-anon-key";

function createBrowserClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    console.error(
      "[RecuperaJogo] NEXT_PUBLIC_SUPABASE_URL / ANON_KEY ausentes no bundle. " +
        "Na Vercel: coloque essas variáveis como Plain (não Sensitive) e faça Redeploy."
    );
  }
  return createSupabaseClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || "placeholder-anon-key",
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );
}

export const supabase = createBrowserClient();

/** Factory usada por /pagamento e outras páginas. */
export function createClient() {
  return supabase;
}
