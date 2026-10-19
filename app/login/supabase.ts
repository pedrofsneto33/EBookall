/**
 * LEGADO — auth migrou para Stripe Customer + JWT (app/lib/auth.ts).
 * Mantido só para não quebrar imports antigos em builds cacheados.
 */
export const isSupabaseConfigured = false;

export function createClient() {
  throw new Error(
    "Supabase desativado. Use /api/auth/login e /api/auth/me (Stripe + JWT)."
  );
}

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: new Error("Supabase desativado") }),
    getUser: async () => ({ data: { user: null }, error: new Error("Supabase desativado") }),
    signOut: async () => ({ error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: new Error("Use /api/auth/login") }),
    signUp: async () => ({ data: { user: null, session: null }, error: new Error("Use /api/auth/signup") }),
  },
  from: () => ({
    select: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error("Supabase desativado") }), maybeSingle: async () => ({ data: null, error: null }) }) }),
    update: () => ({ eq: () => ({ then: (cb: any) => Promise.resolve({ error: null }).then(cb) }) }),
    insert: async () => ({ error: new Error("Supabase desativado") }),
  }),
} as any;
