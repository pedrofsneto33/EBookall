import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "../../lib/auth";
import { ensureDb } from "../../lib/db";
import { isAdmin } from "../../lib/admin";
import ActionButton from "./ActionButton";
import PayReferralButton from "./PayReferralButton";
import AffiliateForm from "./AffiliateForm";
import LogoutButton from "./LogoutButton";
import ApproveAffiliateButton from "./ApproveAffiliateButton";

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

type AffiliateRequestRow = {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
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

  const requestsRes = await db.execute(
    "SELECT id, nome, email, whatsapp, created_at FROM affiliate_requests WHERE status = 'pendente' ORDER BY created_at DESC"
  );
  const affiliateRequests: AffiliateRequestRow[] = requestsRes.rows.map((row) => ({
    id: toText(row.id),
    nome: toText(row.nome),
    email: toText(row.email),
    whatsapp: toText(row.whatsapp),
    createdAt: toText(row.created_at),
  }));

  return (
    <div className="min-h-screen bg-[#05080C] text-white w-full overflow-x-hidden">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-white">Dashboard Administrativo</p>
            <p className="text-[10px] text-white/60">{session.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin" className="text-xs text-white/60 hover:text-white">
              Liberação manual
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Clientes Totais" value={String(totalUsers)} />
          <KpiCard label="Ativos" value={String(activeUsers)} />
          <KpiCard label="Petições Geradas" value={String(totalPeticoes)} />
          <KpiCard label="Receita Estimada" value={`R$ ${receita.toLocaleString("pt-BR")}`} />
        </div>

        <AffiliateForm />

        {/* Novos Afiliados (Aguardando Aprovação) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Novos Afiliados (Aguardando Aprovação)</h2>
            <p className="text-xs text-white/60 mt-1">Pessoas que se candidataram para divulgar o RecuperaJogo.</p>
          </div>
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/60 border-b border-white/10">
                  <th className="px-6 py-3 font-medium">Nome</th>
                  <th className="px-6 py-3 font-medium">E-mail</th>
                  <th className="px-6 py-3 font-medium">WhatsApp</th>
                  <th className="px-6 py-3 font-medium">Data</th>
                  <th className="px-6 py-3 font-medium">Ação</th>
                </tr>
              </thead>
              <tbody>
                {affiliateRequests.map((r) => (
                  <tr key={r.id} className="border-b border-white/5">
                    <td className="px-6 py-3 text-white">{r.nome}</td>
                    <td className="px-6 py-3 text-white/80">{r.email}</td>
                    <td className="px-6 py-3 text-white/60">{r.whatsapp || "-"}</td>
                    <td className="px-6 py-3 text-white/60">{r.createdAt}</td>
                    <td className="px-6 py-3">
                      <ApproveAffiliateButton id={r.id} />
                    </td>
                  </tr>
                ))}
                {affiliateRequests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-6 text-center text-white/40">
                      Nenhuma solicitação pendente.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 md:hidden space-y-3">
            {affiliateRequests.length === 0 ? (
              <p className="text-white/40 text-center text-sm">Nenhuma solicitação pendente.</p>
            ) : (
              affiliateRequests.map((r) => (
                <div key={r.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-bold text-white">{r.nome}</p>
                  <p className="text-sm text-white/80 mt-1">{r.email}</p>
                  <p className="text-xs text-white/60 mt-1">{r.whatsapp || "-"}</p>
                  <p className="text-xs text-white/60 mt-1">{r.createdAt}</p>
                  <div className="mt-3">
                    <ApproveAffiliateButton id={r.id} className="w-full text-xs py-2" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Afiliados Cadastrados</h2>
          </div>
          <div className="overflow-x-auto hidden md:block">
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
          <div className="px-6 py-4 md:hidden space-y-3">
            {affiliates.length === 0 ? (
              <p className="text-white/40 text-center text-sm">Nenhum afiliado cadastrado.</p>
            ) : (
              affiliates.map((a) => (
                <div key={a.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-bold text-white">{a.email}</p>
                  <p className="text-emerald-400 font-semibold text-sm">Código: {a.code}</p>
                  <p className="text-xs text-white/60 mt-1">Criado em: {a.createdAt}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Usuários</h2>
          </div>
          <div className="overflow-x-auto hidden md:block">
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
          <div className="px-6 py-4 md:hidden space-y-3">
            {users.length === 0 ? (
              <p className="text-white/40 text-center text-sm">Nenhum usuário cadastrado.</p>
            ) : (
              users.map((u) => (
                <div key={u.email} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-bold text-white">{u.email}</p>
                  <span
                    className={`inline-block text-xs font-semibold px-2 py-1 rounded-full border mt-2 ${
                      u.status === "active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {u.status}
                  </span>
                  <p className="text-sm text-white/80 mt-2">
                    {u.peticoesUsadas} petição(s) usada(s)
                  </p>
                  <div className="mt-3 flex gap-2">
                    <ActionButton
                      email={u.email}
                      status={u.status}
                      className="flex-1 text-xs py-2"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Comissões a Pagar (Vendas Pendentes)</h2>
            <p className="text-xs text-white/60 mt-1">Vendas realizadas por afiliados que precisam do seu pagamento via Pix.</p>
          </div>
          <div className="overflow-x-auto hidden md:block">
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
                    <td className="px-6 py-3 text-emerald-400 font-semibold">R$ 41,10</td>
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
          <div className="px-6 py-4 md:hidden space-y-3">
            {referrals.length === 0 ? (
              <p className="text-white/40 text-center text-sm">Nenhuma indicação pendente.</p>
            ) : (
              referrals.map((r) => (
                <div key={r.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/60">E-mail do Cliente</p>
                  <p className="font-bold text-white">{r.buyerEmail}</p>
                  <p className="text-xs text-white/60 mt-1">Código: {r.affiliateCode}</p>
                  <p className="text-emerald-400 font-semibold mt-2">R$ 41,10</p>
                  <PayReferralButton id={r.id} className="w-full mt-3" />
                </div>
              ))
            )}
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
