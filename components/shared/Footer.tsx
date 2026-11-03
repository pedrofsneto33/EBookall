import Link from "next/link";
import { EMPRESA, WHATSAPP, WHATSAPP_TXT } from "@/app/lib/config";

export function Footer() {
  return (
    <footer className="bg-[#070E18] border-t border-white/10 py-12 px-6">
      <div className="mx-auto max-w-6xl grid md:grid-cols-[1.2fr_1fr_1.4fr] gap-10">
        <div>
          <p className="font-[family-name:var(--font-serif)] font-semibold text-xl text-[var(--papel)]">RecuperaJogo</p>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            Software que monta petições para o Juizado Especial Cível.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            {EMPRESA.nome} · CNPJ {EMPRESA.cnpj}
          </p>
        </div>

        <nav aria-label="Rodapé" className="text-sm">
          <ul className="space-y-2 text-zinc-400">
            <li><Link href="/termos" className="hover:text-white transition-colors">Termos de uso</Link></li>
            <li><Link href="/politica-privacidade" className="hover:text-white transition-colors">Política de privacidade</Link></li>
            <li><Link href="/seja-afiliado" className="hover:text-white transition-colors">Seja afiliado</Link></li>
            <li><Link href="/apoio" className="hover:text-white transition-colors">Apoio emocional e jogo responsável</Link></li>
            <li><Link href="/login" className="hover:text-white transition-colors">Área do cliente</Link></li>
            <li>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                WhatsApp {WHATSAPP_TXT}
              </a>
            </li>
          </ul>
        </nav>

        <p className="text-xs text-zinc-500 leading-relaxed">
          O RecuperaJogo é uma plataforma de tecnologia que fornece ferramentas de automação documental. Não somos
          um escritório de advocacia e não prestamos consultoria jurídica. O uso do sistema não dispensa a análise
          de um profissional habilitado pela OAB.
        </p>
      </div>

      <p className="mt-10 text-center text-xs text-zinc-600">
        © 2026 RecuperaJogo. Todos os direitos reservados.
      </p>
    </footer>
  );
}
