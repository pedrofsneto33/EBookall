"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ActionButton({ email, status }: { email: string; status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const action = status === "active" ? "revoke" : "grant";
  const label = status === "active" ? "Revogar" : "Liberar";

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/user-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action }),
      });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${
        action === "revoke"
          ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
      }`}
    >
      {loading ? "..." : label}
    </button>
  );
}
