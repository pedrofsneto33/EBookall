export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                E
              </div>
              <span className="font-bold text-2xl text-gray-900">
                Ebook<span className="text-purple-600">al</span>
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#funcionalidades" className="text-gray-600 hover:text-purple-600 font-medium transition">Funcionalidades</a>
              <a href="#como-funciona" className="text-gray-600 hover:text-purple-600 font-medium transition">Como Funciona</a>
              <a href="#depoimentos" className="text-gray-600 hover:text-purple-600 font-medium transition">Depoimentos</a>
              <a href="#precos" className="text-gray-600 hover:text-purple-600 font-medium transition">Preços</a>
            </nav>
            <a href="#" className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition">
              Começar Grátis
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6 animate-pulse">
             Novo: Geração de Ebooks com IA
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Crie Ebooks Profissionais<br />
            <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              em Minutos com IA
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Transforme uma simples ideia em um livro digital completo, com capa profissional e formatação perfeita. Sem precisar escrever uma única linha.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#precos" className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-purple-500/40 transition transform hover:scale-105">
              Criar Meu Primeiro Ebook →
            </a>
            <a href="#como-funciona" className="bg-white text-gray-700 font-semibold text-lg px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition">
              Ver Demonstração
            </a>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">10.000+</div>
              <div className="text-gray-600">Ebooks Criados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">5 min</div>
              <div className="text-gray-600">Tempo Médio</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">98%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Nossa plataforma combina IA avançada com design profissional para criar ebooks que vendem
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "", title: "Geração Rápida", desc: "Ebook completo em menos de 5 minutos com IA avançada" },
              { icon: "", title: "Capas Profissionais", desc: "Designs únicos gerados automaticamente para seu ebook" },
              { icon: "📄", title: "Multi-Formato", desc: "Exporte em PDF, Word, EPUB e até Audiobook" },
              { icon: "🎨", title: "Templates Prontos", desc: "Dezenas de modelos profissionais para escolher" },
              { icon: "✏️", title: "Editor Integrado", desc: "Edite e personalize seu ebook antes de exportar" },
              { icon: "", title: "Pronto para Vender", desc: "Exporte com página de vendas e descrição otimizadas" },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-orange-50 border border-purple-100 hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-gradient-to-br from-purple-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Como Funciona
          </h2>
          <p className="text-center text-purple-200 mb-12 max-w-2xl mx-auto">
            Do zero ao ebook publicado em apenas 3 passos simples
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Defina o Tema", desc: "Digite o assunto do seu ebook. Nossa IA sugere títulos e um sumário detalhado automaticamente." },
              { step: "2", title: "A IA Escreve", desc: "Em minutos, o sistema gera todo o conteúdo capítulo por capítulo, com formatação profissional." },
              { step: "3", title: "Baixe e Venda", desc: "Exporte o arquivo final e comece a vender na Hotmart, Kiwify ou Amazon KDP imediatamente." },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-purple-200">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-4xl text-purple-400">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            O que nossos clientes dizem
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Milhares de pessoas já estão criando e vendendo ebooks com o Ebookal
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Maria Silva", role: "Empreendedora Digital", text: "Criei meu primeiro ebook em 10 minutos! Já vendi mais de 100 cópias na primeira semana." },
              { name: "João Pedro", role: "Coach de Vida", text: "A qualidade do conteúdo gerado pela IA é impressionante. Economizo horas de trabalho!" },
              { name: "Ana Carolina", role: "Marketing Digital", text: "As capas ficam lindas e profissionais. Melhor investimento que fiz para meu negócio." },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {"⭐⭐⭐⭐⭐".split("").map((star, j) => (
                    <span key={j} className="text-2xl">{star}</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{item.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="py-20 bg-gradient-to-br from-purple-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Planos Simples e Transparentes
          </h2>
          <p className="text-center text-purple-200 mb-12 max-w-2xl mx-auto">
            Escolha o plano ideal para o seu ritmo de criação. Cancele a qualquer momento.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Iniciante", price: "R$0", period: "/mês", features: ["1 ebook/mês", "PDF básico", "Capas simples", "Suporte por email"] },
              { name: "Pro", price: "R$47", period: "/mês", features: ["10 ebooks/mês", "Todos os formatos", "Capas com IA", "Editor completo", "Suporte prioritário"], destaque: true },
              { name: "Agência", price: "R$147", period: "/mês", features: ["Ebooks ilimitados", "Audiobook IA", "Suporte prioritário", "API de acesso", "White label"] },
            ].map((plano, i) => (
              <div key={i} className={`p-8 rounded-2xl ${plano.destaque ? 'bg-gradient-to-br from-purple-600 to-orange-500 scale-105 shadow-2xl border-4 border-yellow-400' : 'bg-white/10 backdrop-blur border border-white/20'}`}>
                {plano.destaque && (
                  <div className="bg-yellow-400 text-purple-900 text-center font-bold py-1 rounded-lg mb-4">
                    MAIS POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plano.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plano.price}</span>
                  <span className="text-gray-300">{plano.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plano.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-green-400 text-xl">✓</span> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-bold transition ${plano.destaque ? 'bg-white text-purple-600 hover:bg-gray-100' : 'bg-white/20 hover:bg-white/30'}`}>
                  Assinar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {[
              { q: "Preciso saber escrever para usar?", a: "Não! A IA escreve todo o conteúdo para você. Você só precisa definir o tema e aprovar o sumário." },
              { q: "Posso vender os ebooks que criar?", a: "Sim! Você tem 100% dos direitos sobre os ebooks criados. Pode vender em qualquer plataforma." },
              { q: "Qual a qualidade do conteúdo gerado?", a: "Usamos as IAs mais avançadas do mercado (GPT-4 e Claude). O conteúdo é coerente, bem estruturado e profissional." },
              { q: "Posso cancelar quando quiser?", a: "Sim! Não temos fidelidade. Você pode cancelar sua assinatura a qualquer momento." },
            ].map((item, i) => (
              <div key={i} className="border border-purple-200 rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-orange-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para Criar seu Primeiro Ebook?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Junte-se a milhares de criadores e comece a monetizar seu conhecimento hoje mesmo!
          </p>
          <a href="#" className="inline-block bg-white text-purple-600 font-bold text-lg px-10 py-4 rounded-xl hover:shadow-2xl transition transform hover:scale-105">
            Começar Grátis Agora →
          </a>
          <p className="mt-4 text-sm text-purple-200">
            7 dias de teste grátis • Sem cartão de crédito
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                  E
                </div>
                <span className="font-bold text-xl text-white">
                  Ebook<span className="text-purple-400">al</span>
                </span>
              </div>
              <p className="text-sm">Democratizando a criação de conhecimento com inteligência artificial.</p>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">Produto</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#funcionalidades" className="hover:text-purple-400 transition">Funcionalidades</a></li>
                <li><a href="#precos" className="hover:text-purple-400 transition">Preços</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Exemplos</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">Contato</h5>
              <ul className="space-y-2 text-sm">
                <li>suporte@ebookal.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 Ebookal. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}