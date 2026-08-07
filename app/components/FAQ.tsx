"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const LINE = "#E4DFD1";
const SEAL = "#8A6D3B";

const PERGUNTAS = [
  {
    q: "Preciso de advogado pra usar isso?",
    a: "Não. O RecuperaJogo gera um rascunho de petição para você mesmo protocolar, usando o jus postulandi — o direito de processar sozinho em causas até 20 salários-mínimos no Juizado Especial Cível (art. 9º, Lei 9.099/95). Você pode revisar e ajustar o texto antes de usar.",
  },
  {
    q: "E se minha causa passar de 20 salários-mínimos?",
    a: "Acima desse limite, o jus postulandi não se aplica e você precisará de um advogado ou da Defensoria Pública. Recomendamos usar nossa calculadora para estimar o valor total antes de seguir.",
  },
  {
    q: "Funciona pra qualquer casa de apostas?",
    a: "Sim. O gerador funciona para qualquer casa de apostas que opere no Brasil. Os argumentos são adaptados conforme as informações e provas que você preenche sobre o seu caso específico.",
  },
  {
    q: "Preciso ir pessoalmente ao fórum?",
    a: "Depende do seu tribunal. Muitos estados já aceitam protocolo 100% digital pelo PJe, e-Proc ou até por e-mail. Verifique as regras do Juizado Especial da sua comarca.",
  },
  {
    q: "Se eu não gostar, tem reembolso?",
    a: "Sim. Oferecemos garantia incondicional de 7 dias. Se você não ficar satisfeito com o rascunho gerado, devolvemos o valor integral. É só entrar em contato pelo WhatsApp.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. Seguimos rigorosamente a LGPD (Lei 13.709/2018). Detalhes completos sobre como tratamos seus dados, incluindo informações sensíveis no fluxo de ludopatia, estão na nossa Política de Privacidade.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: LINE }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left py-4 gap-4">
        <span className="font-medium text-sm sm:text-base" style={{ color: INK }}>{q}</span>
        <ChevronDown size={18} style={{ color: SEAL, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} className="shrink-0" />
      </button>
      {open && (
        <p className="text-sm leading-relaxed pb-4 pr-8" style={{ color: INK_SOFT }}>{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-semibold mb-1 text-center" style={{ color: INK, fontFamily: "Georgia, serif" }}>Perguntas Frequentes</h2>
      <p className="text-sm text-center mb-8" style={{ color: INK_SOFT }}>Dúvida que não está aqui? Manda uma mensagem no WhatsApp.</p>
      <div className="rounded-xl border px-6" style={{ backgroundColor: PAPER, borderColor: LINE }}>
        {PERGUNTAS.map((item) => (
          <FaqItem key={item.q} {...item} />
        ))}
      </div>
    </section>
  );
}