export function Footer() {
  return (
    <footer className="bg-[#020305] border-t border-zinc-800 py-12 px-6">
      <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-black text-xl tracking-tighter">RecuperaJogo</p>
          <p className="mt-2 text-sm text-zinc-400">
            Tecnologia jurídica para quem foi lesado.
          </p>
          <div className="mt-4">
<a
              href="https://instagram.com"
              aria-label="Instagram"
              className="inline-flex text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-300">
            Institucional
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>
              <a href="/termos" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
            </li>
            <li>
              <a href="/politica-privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="https://wa.me/5586988117925" className="hover:text-white transition-colors">
                Contato
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            O RecuperaJogo é uma plataforma de tecnologia que fornece
            ferramentas de automação documental. Não somos um escritório de
            advocacia e não prestamos consultoria jurídica. O uso do sistema não
            dispensa a análise de um profissional habilitado pela OAB.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-zinc-600">
        © 2026 RecuperaJogo. Todos os direitos reservados. CNPJ: 55.536.885/0001-30
      </div>
    </footer>
  );
}
