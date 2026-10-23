import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "../lib/auth";
import { listPeticoes, type PeticaoRecord } from "../lib/users";
import PeticaoActions from "./Actions";

export default async function MinhasPeticoesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const peticoes = await listPeticoes(session.email);

  return (
    <div className="min-h-screen bg-[#05080C] text-white">
      <header className="border-b border-white/10 bg-[#05080C]/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-black tracking-tight text-lg">
            Recupera<span className="text-emerald-400">Jogo</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/gerador" className="text-sm text-white/60 hover:text-white">
              Gerador
            </Link>
            <Link href="/minhas-peticoes" className="text-sm text-emerald-400">
              Meu Histórico
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-8">
          Minhas petições
        </h1>

        {peticoes.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-zinc-400 mb-6">
              Você ainda não gerou nenhuma petição.
            </p>
            <Link
              href="/gerador"
              className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Criar minha primeira petição
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {peticoes.map((p: PeticaoRecord) => (
              <div
                key={p.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-xs text-white/40 mb-1">
                      {new Date(p.createdAt).toLocaleString("pt-BR")}
                    </p>
                    <p className="font-bold text-white">{p.perfil}</p>
                    {p.valorCausa && (
                      <p className="text-sm text-zinc-400 mt-1">
                        Valor da causa: {p.valorCausa}
                      </p>
                    )}
                  </div>
                  <PeticaoActions texto={p.texto} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
