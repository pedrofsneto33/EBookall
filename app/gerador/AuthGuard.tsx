"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SEAL = "#1B6B4A";
const INK = "#0F1C2E";

type Props = {
  children: React.ReactNode;
  onReady: (user: { id: string; email: string }, peticoes: number) => void;
};

/**
 * Bloqueia /gerador se não houver sessão ou se status !== active.
 * Sempre manda não-pagantes para /pagamento.
 */
export default function AuthGuard({ children, onReady }: Props) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          router.replace("/login?redirect=/gerador");
          return;
        }
        const data = await res.json();
        if (!data?.user) {
          router.replace("/login?redirect=/gerador");
          return;
        }
        if (data.status !== "active") {
          router.replace("/pagamento");
          return;
        }
        if (!cancelled) {
          onReady(data.user, Number(data.peticoes_usadas) || 0);
          setOk(true);
        }
      } catch {
        router.replace("/pagamento");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router, onReady]);

  if (!ok) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F0E9" }}>
        <div className="text-center">
          <Loader2 size={36} className="mx-auto mb-4 animate-spin" style={{ color: SEAL }} />
          <p className="text-sm font-medium" style={{ color: INK }}>
            Verificando pagamento...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
