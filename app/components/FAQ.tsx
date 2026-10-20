"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CNPJ = "55.536.885/0001-30";
const PRECO = "137";

const ITEMS = [
  {
    q: "Isso é escritório de advocacia?",
    a: "Não. É software da Primex Sistemas LTDA (primexsistemas.com). Eu montei a ferramenta depois de processar uma casa de apostas no Juizado. Você revisa e protocola em nome próprio.",
  },
  {
    q: "Preciso de advogado?",
    a: "Em causas até 20 salários mínimos no Juizado Especial Cível, a lei permite protocolar sozinho (jus postulandi). Caso complexo ou valor maior: advogado ou Defensoria.",
  },
  {
    q: "Como pago?",
    a: `R$ ${PRECO} no PIX direto da Primex (CNPJ ${CNPJ}). Você copia a chave, paga e manda o comprovante no WhatsApp — liberamos o gerador em seguida. Também tem opção de cartão.`,
  },
  {
    q: "Tem reembolso?",
    a: "Sim. 7 dias. Não gostou do rascunho? Devolvemos. Fale no WhatsApp de suporte.",
  },
  {
    q: "Meus dados ficam salvos?",
    a: "Usamos o mínimo necessário para conta e acesso. Você pode pedir exclusão pelo WhatsApp. Veja a Política de Privacidade.",
  },
  {
    q: "E se a casa me ignorar?",
    a: "A petição é o caminho formal no Juizado. Citação e prazos seguem o processo. O software não garante acordo nem sentença favorável.",
  },
  {
    q: "Funciona sem laudo?",
    a: "Sim, em cenários de autoexclusão violada e falha de serviço (CDC). Laudo de ludopatia reforça o caso quando existir, mas não é obrigatório em todo perfil.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-2">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "#1E2A3A", backgroundColor: "#111827" }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
            >
              <span className="text-sm font-semibold text-white">{item.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                style={{ color: "#6EE7B7" }}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm leading-relaxed" style={{ color: "#9AA8BC" }}>
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
