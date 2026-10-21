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

const INK = "#0F1C2E";
const INK_SOFT = "#4A5B6E";
const PAPER = "#F3F0E9";
const LINE = "#E6E1D6";
const SEAL = "#1B6B4A";
const GREEN_BG = "#E8F5EF";
const AMBER_BG = "#FBF1DD";
const AMBER_TEXT = "#5C4A22";
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
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: PAPER }}
    >
      <div
        className="max-w-lg w-full bg-white rounded-2xl shadow-sm border p-8 text-center"
        style={{ borderColor: LINE }}
      >
        {liberado ? (
          <>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: GREEN_BG }}
            >
              <CheckCircle2 size={32} style={{ color: SEAL }} />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: INK }}>
              Pagamento confirmado — acesso liberado
            </h1>
            <p className="text-sm mb-6" style={{ color: INK_SOFT }}>
              Você pode gerar até {MAX_PETICOES} petições com seu acesso atual.
            </p>
            <Link
              href="/gerador"
              className="inline-flex w-full items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3 rounded-xl text-white"
              style={{ backgroundColor: SEAL }}
            >
              Ir para o gerador <ArrowRight size={18} />
            </Link>
          </>
        ) : (
          <>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: AMBER_BG }}
            >
              <Clock size={30} style={{ color: AMBER_TEXT }} />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: INK }}>
              Aguardando liberação
            </h1>
            <p className="text-sm mb-6" style={{ color: INK_SOFT }}>
              Seu Pix foi recebido, mas o acesso ainda não foi liberado. Envie o
              comprovante no WhatsApp para agilizar.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
                `Olá! Já fiz o Pix de R$ ${PRECO_TXT} no CNPJ da Primex. Meu e-mail de acesso é ${session.email}. Vou enviar o comprovante agora.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3 rounded-xl text-white"
              style={{ backgroundColor: SEAL }}
            >
              <MessageCircle size={18} /> Enviar comprovante no WhatsApp
            </a>
            {/* <a> (e não <Link>) de propósito: força o re-render do Server
                Component para reconsultar o status de acesso no SQLite. */}
            <a
              href="/obrigado"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm font-medium px-6 py-3 rounded-xl border"
              style={{ borderColor: LINE, color: INK }}
            >
              <RefreshCw size={16} /> Já fui liberado — verificar agora
            </a>
          </>
        )}

        <div className="mt-8 pt-5 border-t" style={{ borderColor: LINE }}>
          <p
            className="text-xs flex items-center justify-center gap-2"
            style={{ color: INK_SOFT }}
          >
            <ShieldCheck size={14} style={{ color: SEAL }} /> Dúvidas? WhatsApp (86) 98811-7925
          </p>
        </div>
      </div>
    </div>
  );
}
