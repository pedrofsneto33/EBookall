"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1"
    >
      <LogOut size={14} /> Sair
    </button>
  );
}