/**
 * Bridge: gerador antigo ainda importa supabase.
 * Por baixo usa /api/auth/me. Sem pagamento ativo = status pending.
 */
"use client";

type SubRow = { status: string; peticoes_usadas: number };

async function fetchMe(): Promise<{
  user: { id: string; email: string } | null;
  status: string;
  peticoes_usadas: number;
} | null> {
  try {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const isSupabaseConfigured = true;

export const supabase = {
  auth: {
    async getSession() {
      const me = await fetchMe();
      if (!me?.user) {
        return { data: { session: null }, error: null };
      }
      return {
        data: {
          session: {
            user: { id: me.user.id, email: me.user.email },
            access_token: "rj-bridge",
          },
        },
        error: null,
      };
    },
    async getUser() {
      const me = await fetchMe();
      if (!me?.user) {
        return { data: { user: null }, error: null };
      }
      return { data: { user: { id: me.user.id, email: me.user.email } }, error: null };
    },
    async signOut() {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      return { error: null };
    },
    async signInWithPassword() {
      return {
        data: { user: null, session: null },
        error: { message: "Use /login" },
      };
    },
    async signUp() {
      return {
        data: { user: null, session: null },
        error: { message: "Use /login" },
      };
    },
  },
  from(table: string) {
    if (table !== "subscriptions") {
      return {
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: { message: "n/a" } }),
            maybeSingle: async () => ({ data: null, error: null }),
          }),
        }),
        update: () => ({
          eq: () => ({
            then: (cb: (v: { error: null }) => void) =>
              Promise.resolve({ error: null }).then(cb),
          }),
        }),
        insert: async () => ({ error: null }),
      };
    }

    return {
      select(_cols?: string) {
        return {
          eq(_field: string, _userId: string) {
            return {
              async single() {
                const me = await fetchMe();
                if (!me?.user) {
                  return { data: null, error: { message: "não autenticado" } };
                }
                // Sempre devolve a linha; o gerador decide se status === active
                const data: SubRow = {
                  status: me.status === "active" ? "active" : "pending",
                  peticoes_usadas: me.peticoes_usadas ?? 0,
                };
                return { data, error: null };
              },
              async maybeSingle() {
                const me = await fetchMe();
                if (!me?.user) return { data: null, error: null };
                return {
                  data: {
                    status: me.status === "active" ? "active" : "pending",
                    peticoes_usadas: me.peticoes_usadas ?? 0,
                  } as SubRow,
                  error: null,
                };
              },
            };
          },
        };
      },
      update(payload: { peticoes_usadas?: number }) {
        return {
          eq(_field: string, _userId: string) {
            const p = fetch("/api/auth/peticoes", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ count: payload.peticoes_usadas ?? 0 }),
            }).then(() => ({ error: null as null }));
            return {
              then: (cb: (v: { error: null }) => void) => p.then(cb),
              catch: (cb: (e: unknown) => void) => p.catch(cb),
            };
          },
        };
      },
      insert: async () => ({ error: null }),
    };
  },
};

export function createClient() {
  return supabase as any;
}
