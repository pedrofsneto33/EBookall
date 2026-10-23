import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { getSession } from "../lib/auth";
import { hasPaidAccess } from "../lib/users";
import { MAX_PETICOES, PRECO_TXT } from "../lib/config";

const WHATSAPP_NUMERO = "5586988117925";

/**
 * Retorno pós-pagamento (Pix CNPJ).
 * O acesso é liberado manualmente pelo admin (/admin -> /api/admin/grant),
 * então o estado real vem do SQLite via `hasPaidAccess`.
 */
export const dynamic = "force-dynamic";

export default async function PaginaObrigado() {
  const session = await getSession();
  if (!session) redirect("/login?next=/obrigado");

  const liberado = await hasPaidAccess(session.email);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#05080C]">
      <div className="max-w-lg w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8 text-center">
        {liberado ? (
          <>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 bg-emerald-500/10">
              <CheckCircle2 size={32} className="text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white">
              Pagamento confirmado — acesso liberado
            </h1>
            <p className="text-sm mb-6 text-white/60">
              Você pode gerar até {MAX_PETICOES} petições com seu acesso atual.
            </p>
            <Link
              href="/gerador"
              className="inline-flex w-full items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3 rounded-xl bg-emerald-500 text-[#05080C] hover:bg-emerald-400 transition-colors"
            >
              Ir para o gerador <ArrowRight size={18} />
            </Link>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 bg-amber-500/10">
              <Clock size={30} className="text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white">
              Aguardando liberação
            </h1>
            <p className="text-sm mb-6 text-white/60">
              Seu Pix foi recebido, mas o acesso ainda não foi liberado. Envie o
              comprovante no WhatsApp para agilizar.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
                `Olá! Já fiz o Pix de R$ ${PRECO_TXT} no CNPJ da Primex. Meu e-mail de acesso é ${session.email}. Vou enviar o comprovante agora.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3 rounded-xl bg-[#25D366] text-[#06311A] hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} /> Enviar comprovante no WhatsApp
            </a>
            {/* <a> (e não <Link>) de propósito: força o re-render do Server
                Component para reconsultar o status de acesso no SQLite. */}
            <a
              href="/obrigado"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm font-medium px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors"
            >
              <RefreshCw size={16} /> Já fui liberado — verificar agora
            </a>
          </>
        )}

        <div className="mt-8 pt-5 border-t border-white/10">
          <p className="text-xs flex items-center justify-center gap-2 text-white/60">
            <ShieldCheck size={14} className="text-emerald-400" /> Dúvidas? WhatsApp (86) 98811-7925
          </p>
        </div>
      </div>
    </div>
  );
}
