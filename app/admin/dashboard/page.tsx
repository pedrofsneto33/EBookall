import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "../../lib/auth";
import { ensureDb } from "../../lib/db";
import { isAdmin } from "../../lib/admin";
import ActionButton from "./ActionButton";
import PayReferralButton from "./PayReferralButton";
import AffiliateForm from "./AffiliateForm";

type UserRow = {
  email: string;
  status: string;
  peticoesUsadas: number;
  createdAt: string;
};

type ReferralRow = {
  id: string;
  affiliateCode: string;
  buyerEmail: string;
  affiliateEmail: string;
  createdAt: string;
};

type AffiliateRow = {
  id: string;
  email: string;
  code: string;
  createdAt: string;
};

function toInt(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

function toText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (value instanceof Uint8Array) return new TextDecoder().decode(value);
  return String(value);
}

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const isSuperAdmin = isAdmin(session.email);
  if (!isSuperAdmin) {
    redirect("/");
  }

  const db = await ensureDb();

  const totalUsersRes = await db.execute("SELECT COUNT(*) AS total FROM users");
  const activeUsersRes = await db.execute("SELECT COUNT(*) AS total FROM users WHERE status = 'active'");
  const totalPeticoesRes = await db.execute("SELECT COUNT(*) AS total FROM peticoes");

  const totalUsers = toInt(totalUsersRes.rows[0]?.total);
  const activeUsers = toInt(activeUsersRes.rows[0]?.total);
  const totalPeticoes = toInt(totalPeticoesRes.rows[0]?.total);
  const receita = activeUsers * 137;

  const usersRes = await db.execute(
    "SELECT email, status, peticoes_usadas, created_at FROM users ORDER BY created_at DESC"
  );

  const users: UserRow[] = usersRes.rows.map((row) => ({
    email: toText(row.email),
    status: toText(row.status),
    peticoesUsadas: toInt(row.peticoes_usadas),
    createdAt: toText(row.created_at),
  }));

  const referralsRes = await db.execute(
    `SELECT r.id, r.affiliate_code, r.buyer_email, r.created_at, a.email AS affiliate_email
       FROM referrals r
       LEFT JOIN affiliates a ON a.code = r.affiliate_code
      WHERE r.status = 'pendente'
      ORDER BY r.created_at DESC`
  );

  const referrals: ReferralRow[] = referralsRes.rows.map((row) => ({
    id: toText(row.id),
    affiliateCode: toText(row.affiliate_code),
    buyerEmail: toText(row.buyer_email),
    affiliateEmail: toText(row.affiliate_email),
    createdAt: toText(row.created_at),
  }));

  const affiliatesRes = await db.execute(
    "SELECT id, email, code, created_at FROM affiliates ORDER BY created_at DESC"
  );
  const affiliates: AffiliateRow[] = affiliatesRes.rows.map((row) => ({
    id: toText(row.id),
    email: toText(row.email),
    code: toText(row.code),
    createdAt: toText(row.created_at),
  }));

  return (
    <div className="min-h-screen bg-[#05080C] text-white">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-white">Dashboard Administrativo</p>
            <p className="text-[10px] text-white/60">{session.email}</p>
          </div>
          <Link href="/admin" className="text-xs text-white/60 hover:text-white">
            Liberação manual
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Clientes Totais" value={String(totalUsers)} />
          <KpiCard label="Ativos" value={String(activeUsers)} />
          <KpiCard label="Petições Geradas" value={String(totalPeticoes)} />
          <KpiCard label="Receita Estimada" value={`R$ ${receita.toLocaleString("pt-BR")}`} />
        </div>

        <AffiliateForm />

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Afiliados Cadastrados</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/60 border-b border-white/10">
                  <th className="px-6 py-3 font-medium">E-mail</th>
                  <th className="px-6 py-3 font-medium">Código</th>
                  <th className="px-6 py-3 font-medium">Data de Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {affiliates.map((a) => (
                  <tr key={a.id} className="border-b border-white/5">
                    <td className="px-6 py-3 text-white">{a.email}</td>
                    <td className="px-6 py-3 text-emerald-400 font-semibold">{a.code}</td>
                    <td className="px-6 py-3 text-white/60">{a.createdAt}</td>
                  </tr>
                ))}
                {affiliates.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-center text-white/40">
                      Nenhum afiliado cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Usuários</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/60 border-b border-white/10">
                  <th className="px-6 py-3 font-medium">E-mail</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Petições Usadas</th>
                  <th className="px-6 py-3 font-medium">Data de Cadastro</th>
                  <th className="px-6 py-3 font-medium">Ação</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-b border-white/5">
                    <td className="px-6 py-3 text-white">{u.email}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                          u.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-white/80">{u.peticoesUsadas}</td>
                    <td className="px-6 py-3 text-white/60">{u.createdAt}</td>
                    <td className="px-6 py-3">
                      <ActionButton email={u.email} status={u.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Indicações de Afiliados (Pendentes)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/60 border-b border-white/10">
                  <th className="px-6 py-3 font-medium">Data da Indicação</th>
                  <th className="px-6 py-3 font-medium">E-mail do Cliente</th>
                  <th className="px-6 py-3 font-medium">Código do Afiliado</th>
                  <th className="px-6 py-3 font-medium">Comissão</th>
                  <th className="px-6 py-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((r) => (
                  <tr key={r.id} className="border-b border-white/5">
                    <td className="px-6 py-3 text-white/60">{r.createdAt}</td>
                    <td className="px-6 py-3 text-white">{r.buyerEmail}</td>
                    <td className="px-6 py-3 text-white/80">{r.affiliateCode}</td>
                    <td className="px-6 py-3 text-emerald-400 font-semibold">R$ 27,40</td>
                    <td className="px-6 py-3">
                      <PayReferralButton id={r.id} />
                    </td>
                  </tr>
                ))}
                {referrals.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-6 text-center text-white/40">
                      Nenhuma indicação pendente.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-xs text-white/60 mb-2">{label}</p>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  );
}
