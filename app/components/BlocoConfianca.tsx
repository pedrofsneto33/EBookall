import { AlertTriangle, ShieldCheck, MessageCircle, MapPin } from "lucide-react";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";
const GREEN_BG = "#EEF4EF";
const GREEN_BORDER = "#B9CFC0";
const GREEN = "#3F6B4A";

// ✅ Número real do Pedro (formato internacional)
const WHATSAPP_NUMERO = "5586988117925";
const WHATSAPP_MSG = encodeURIComponent("Oi! Tenho uma dúvida sobre o RecuperaJogo.");

export function DisclaimerCurto() {
  return (
    <div
      className="flex items-start gap-2 max-w-md mx-auto mt-4 px-3 py-2.5 rounded-lg border text-xs leading-relaxed"
      style={{ backgroundColor: AMBER_BG, borderColor: AMBER_BORDER, color: "#5C4A22" }}
    >
      <AlertTriangle size={14} className="shrink-0 mt-0.5" style={{ color: SEAL }} />
      <span>
        Ferramenta de automação de documento, não assessoria jurídica. Sem advogado responsável,
        sem garantia de resultado. Revise antes de protocolar.
      </span>
    </div>
  );
}

export function OQueEstaIncluso() {
  const itens = [
    "Geração de até 3 petições (você pode usar para casas diferentes)",
    "Checklist de provas interativo",
    "Calculadora de valores estimados",
    "Acesso às ferramentas sem mensalidade",
  ];
  return (
    <div className="max-w-md mx-auto mb-4">
      <p className="text-sm font-semibold mb-2 text-center" style={{ color: INK }}>
        O que está incluso:
      </p>
      <ul className="space-y-1.5">
        {itens.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm" style={{ color: INK_SOFT }}>
            <ShieldCheck size={15} className="shrink-0 mt-0.5" style={{ color: GREEN }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Garantia() {
  return (
    <div
      className="flex items-center gap-3 max-w-md mx-auto my-4 px-4 py-3 rounded-lg border"
      style={{ backgroundColor: GREEN_BG, borderColor: GREEN_BORDER }}
    >
      <ShieldCheck size={20} style={{ color: GREEN }} className="shrink-0" />
      <p className="text-sm" style={{ color: INK }}>
        <strong>Garantia de 7 dias.</strong> Não gostou do rascunho? Devolvemos seu dinheiro, sem burocracia.
      </p>
    </div>
  );
}

export function BotaoWhatsApp({ floating = false }) {
  const base =
    "inline-flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium text-white shadow-lg";
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMERO}?text=${WHATSAPP_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      className={floating ? `${base} fixed bottom-5 right-5 z-50` : base}
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle size={18} />
      Falar no WhatsApp
    </a>
  );
}

// ✅ Link corrigido: busca no Google (o rsa.cnj.jus.br está fora do ar)
export function LocalizarJuizado() {
  return (
    <a
      href="https://www.google.com/search?q=Juizado+Especial+C%C3%ADvel+mais+pr%C3%B3ximo+de+mim"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium hover:bg-black/5 transition-colors"
      style={{ borderColor: "#E4DFD1", color: INK }}
    >
      <MapPin size={16} style={{ color: SEAL }} />
      Buscar Juizado Especial no Google
    </a>
  );
}