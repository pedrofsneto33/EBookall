"use client";

const WHATSAPP_URL =
  "https://wa.me/5586988117925?text=Ol%C3%A1!%20Quero%20recuperar%20meu%20dinheiro%20das%20bets%20e%20gerar%20minha%20peti%C3%A7%C3%A3o.";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#05080C]/80 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-black tracking-tight text-lg">
            Recupera<span className="text-emerald-400">Jogo</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          <a href="#como-funciona" className="hover:text-white transition-colors">
            Como funciona
          </a>
          <a href="#prova" className="hover:text-white transition-colors">
            Prova
          </a>
          <a href="#preco" className="hover:text-white transition-colors">
            Preço
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#login" className="text-sm text-zinc-300 hover:text-white px-3 py-2">
            Entrar
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="clip-custom bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-sm px-5 py-2.5 transition-colors"
          >
            Gerar Petição
          </a>
        </div>
      </div>
    </header>
  );
}

