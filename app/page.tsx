import DemoGerador from "@/components/home/DemoGerador";
import HeroSection from "@/components/home/HeroSection";
import Especializado from "@/components/home/Especializado";
import AvisoMP from "@/components/home/AvisoMP";
import Provas from "@/components/home/Provas";
import OfferSection from "@/components/home/OfferSection";
import Navbar from "@/components/shared/Navbar";
import { LIMITE_JUS_POSTULANDI, MAX_PETICOES, formatarMoeda, waLink, WHATSAPP_TXT } from "./lib/config";

const FAQS = [
  { q: "Preciso de advogado?", a: `Não, em causas de até ${formatarMoeda(LIMITE_JUS_POSTULANDI)} (20 salários mínimos) você pode protocolar sozinho no Juizado Especial Cível (art. 9º da Lei 9.099/95). O RecuperaJogo monta a petição; você revisa, assina e protocola. Acima desse valor é preciso advogado ou Defensoria.` },
  { q: "Serve para qualquer casa de apostas?", a: "Serve para casas com CNPJ no Brasil. O gerador cobre 7 tipos de caso e monta a peça com os fatos que você informar." },
  { q: "O pagamento libera na hora?", a: `O pagamento é por Pix e o acesso é liberado quando ele é confirmado, em geral em instantes. Se passar de 10 minutos, chame no WhatsApp ${WHATSAPP_TXT}.` },
  { q: "Quantas petições posso gerar?", a: `${MAX_PETICOES} petições por compra. Ao usar as ${MAX_PETICOES}, o acesso se encerra e uma nova compra libera mais ${MAX_PETICOES}.` },
  { q: "Preciso ir ao fórum?", a: "Em geral não. Muitos Juizados aceitam o protocolo pela internet ou por WhatsApp. O gerador mostra os canais do seu estado, mas confirme no site do tribunal antes de protocolar." },
  { q: "E se o juiz negar o pedido?", a: "Isso pode acontecer. O resultado depende das provas e do entendimento do juiz, e ninguém pode garantir ganho de causa. Por isso a petição traz a lista de provas que você deve juntar." },
  { q: "Quanto tempo demora?", a: "Montar a petição leva alguns minutos. O processo no Juizado varia muito de comarca para comarca." },
  { q: "E se a casa de apostas fechou?", a: "A empresa continua existindo e pode ser cobrada pelo que aconteceu antes. Receber pode ser mais demorado e depende de a empresa ter bens ou valores para pagar." },
  { q: "Meus dados ficam seguros?", a: "Usamos os seus dados apenas para montar as petições e liberar o seu acesso. Detalhes na Política de Privacidade." },
  { q: "Posso pedir reembolso?", a: "Sim, em até 7 dias da compra, conforme os Termos de Uso e o Código de Defesa do Consumidor." },
];

export default function LandingPage() {
  return (
    <div className="landing min-h-screen bg-[var(--tinta)] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <DemoGerador />
      <Especializado />
      <AvisoMP />
      <Provas />
      <OfferSection />

      <section id="faq" className="px-5 sm:px-6 py-16 sm:py-24 bg-[var(--tinta)] border-t border-white/10">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl leading-tight text-[var(--papel)]">Perguntas frequentes</h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-[var(--papel)]">
                  {f.q}
                  <span aria-hidden="true" className="text-[var(--papel)]/50 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-[var(--papel)]/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 bg-[#25D366] text-white text-sm font-semibold rounded-full px-4 py-3 shadow-lg hover:scale-105 transition-transform"
      >
        WhatsApp
      </a>
    </div>
  );
}
