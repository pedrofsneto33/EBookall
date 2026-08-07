import Link from "next/link";
import { Scale, BookOpen, CheckCircle2, ArrowRight, Lock, AlertTriangle } from "lucide-react";
import CapturaLead from "../components/CapturaLead";

const INK = "#1E2A3A";
const INK_SOFT = "#3D4C5E";
const PAPER = "#FBF9F4";
const PAPER_LINE = "#E4DFD1";
const SEAL = "#8A6D3B";
const AMBER_BG = "#FBF1DD";
const AMBER_BORDER = "#D8B368";

export default function GuiaPage() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: PAPER }}>
      {/* HEADER */}
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
        <Link href="/" className="flex items-center gap-2">
          <Scale size={22} style={{ color: SEAL }} />
          <span className="text-xl font-bold" style={{ color: INK, fontFamily: "Georgia, serif" }}>RecuperaJogo</span>
        </Link>
        <Link href="/" className="text-sm font-medium hover:underline" style={{ color: INK_SOFT }}>
          ← Voltar para Home
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* TÍTULO */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: AMBER_BG, color: "#5C4A22", border: `1px solid ${AMBER_BORDER}` }}>
            <BookOpen size={14} /> Guia Gratuito · Parte 1 de 2
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: INK, fontFamily: "Georgia, serif" }}>
            Recuperei Meu Dinheiro das Bets Sozinho — E Você Também Pode
          </h1>
          <p className="text-lg" style={{ color: INK_SOFT }}>
            Guia prático do Juizado Especial para quem apostou, perdeu e quer os fatos, não promessa milagrosa.
          </p>
        </div>

        {/* AVISO LEGAL */}
        <div className="flex gap-3 items-start rounded-lg border px-4 py-3 mb-8" style={{ backgroundColor: AMBER_BG, borderColor: AMBER_BORDER }}>
          <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: SEAL }} />
          <p className="text-sm leading-relaxed" style={{ color: "#5C4A22" }}>
            <strong>AVISO IMPORTANTE:</strong> Este material é educativo, baseado em experiência pessoal real. Não é assessoria jurídica. As ferramentas mencionadas são de automação de documentos — quem decide, revisa e protocola é sempre você (jus postulandi). Prazos e normas podem ter mudado; confirme sempre a versão vigente.
          </p>
        </div>

        {/* CAPÍTULOS GRATUITOS (1 a 3) */}
        <div className="space-y-8 mb-12">
          <Capitulo
            n="1"
            titulo="Você Não Está Sozinho Nisso"
            texto="Eu depositei dinheiro numa casa de apostas achando que sabia o que estava fazendo. Não sabia. Em algum momento minha conta foi bloqueada — e, mesmo bloqueada, horas depois a plataforma aceitou um novo depósito meu, de R$ 25. Isso não devia ter acontecido. Se o sistema me bloqueou por segurança ou irregularidade, como aceitou dinheiro meu duas horas e meia depois? Foi esse detalhe — pequeno, quase escondido num e-mail de suporte — que me fez perceber que o problema não era só 'eu apostei e perdi, azar o meu'. Tinha uma contradição ali, documentada, com hora certa. Levantamento do DataSenado mostra que quatro em cada dez apostadores mensais no Brasil já estão endividados, com contas atrasadas há mais de 90 dias — isso não é um problema individual seu, é um padrão de um setor que movimenta bilhões."
          />
          <Capitulo
            n="2"
            titulo="Os Dois Erros Que Pioram Tudo"
            texto="Erro 1: tentar 'recuperar' apostando mais. Sei que a vontade existe — errar por menos, tentar de novo, 'só mais uma'. Só que isso não é recuperação, é aprofundar o buraco. Organizações que acompanham dependência em jogo são categóricas: quem tenta se recuperar apostando de novo, na prática, só piora a situação financeira. Erro 2: reclamar direto com a casa de apostas sem provas organizadas. A maioria das pessoas manda mensagem de suporte, recebe uma resposta padrão, e desiste ali. O suporte da casa de apostas não existe pra te dar razão — existe pra te manter satisfeito o suficiente pra você não sair."
          />
          <Capitulo
            n="3"
            titulo="O Caminho Que Pouca Gente Conhece: o Juizado Especial"
            texto="Existe uma regra na lei brasileira (Lei 9.099/95, art. 9º) chamada jus postulandi: em causas de até 20 salários-mínimos, você pode entrar com uma ação sozinho, sem precisar de advogado, no Juizado Especial Cível (JEC). Foi assim que eu processei duas casas de apostas diferentes — sem pagar honorário nenhum, sem dividir nada do valor recuperado. Isso é diferente de contratar um escritório de advocacia — que hoje já existem muitos especializados nesse tipo de causa, cobrando geralmente por êxito (só recebem se você ganhar, tirando uma porcentagem do valor). Não há nada de errado nisso, é uma opção válida. Mas se sua causa é pequena, ou você simplesmente prefere não dividir o que é seu, o Juizado Especial com jus postulandi é uma porta que existe, é legal, e pouquíssima gente sabe que pode usar sozinha."
          />
        </div>

        {/* BLOCO DE CAPTURA */}
        <div className="my-12">
          <CapturaLead />
        </div>

        {/* CAPÍTULOS LIBERADOS (4 a 7) */}
        <div className="space-y-8 mt-12">
          <Capitulo
            n="4"
            titulo="Passo 1: Reunir as Provas Certas"
            texto="Prova é o que decide um processo — não a indignação, não o quanto você perdeu, mas o que está documentada. Checklist do que reunir: (1) Extrato/histórico completo da conta na casa de apostas (depósitos, saques, apostas realizadas); (2) Comprovantes bancários de cada depósito (Pix, cartão, boleto) — com data e hora; (3) Prints ou e-mails de conversas com o suporte da casa de apostas; (4) Print da tela de bloqueio/exclusão da conta, com data e hora visíveis; (5) Se aplicável: print de depósito aceito depois do bloqueio — essa contradição, sozinha, já é um argumento forte; (6) Termos de uso / política vigentes da casa na época dos fatos; (7) Protocolo de reclamação no Procon ou consumidor.gov.br, se já tiver registrado; (8) Situação cadastral / CNPJ da empresa (Receita Federal, ou sites como Casa dos Dados). Reserve um único e-mail ou pasta só pra isso. Salve tudo com nome e data no arquivo (ex: 'print-bloqueio-23-12.png'). Quando chegar a hora de montar o argumento, você vai agradecer a organização."
          />
          <Capitulo
            n="5"
            titulo="Passo 2: Montar o Argumento (A Base Legal Real)"
            texto="Você não precisa ser advogado pra entender o essencial. O Código de Defesa do Consumidor (CDC) protege você nessa relação, porque apostar numa plataforma é, sim, uma relação de consumo. Mas existe uma lei específica que mudou tudo em 2023. A Lei nº 14.790/2023 (Lei das Bets), no artigo 26, estabelece que: 'É nula de pleno direito a aposta realizada por pessoa diagnosticada com transtorno do jogo patológico.' Isso significa que, se você tem diagnóstico de ludopatia (CID-10 F63.0 ou CID-11 6C50), as apostas que você fez são juridicamente nulas — e você tem direito à restituição dos valores perdidos, independente de ter feito autoexclusão formal ou não. A lei também impõe às operadoras o dever de: monitorar comportamento de risco dos usuários; oferecer mecanismos efetivos de jogo responsável; identificar padrões de comportamento compulsivo. O dever é da casa de apostas de identificar o padrão, não do usuário de ter se autoexcluído primeiro. Três pilares que sustentam esse tipo de causa: (1) Nulidade das apostas por ludopatia (Lei 14.790/2023, art. 26); (2) Dever de monitoramento da operadora; (3) Responsabilidade objetiva do fornecedor (art. 14 do CDC). Jurisprudência real: 10ª Vara Cível de São Paulo condenou casa de apostas por falha na prestação do serviço ao não identificar padrão inequívoco de comportamento compulsivo, admitindo restituição parcial de valores. Em outro caso documentado, casa de apostas foi condenada a devolver R$ 217 mil a uma consumidora que demonstrou ter recorrido a empréstimos com familiares e uso recorrente de cartão de crédito para sustentar o vício. Sobre o laudo médico: laudo médico não é sempre obrigatório, mas fortalece muito o caso. O diagnóstico deve ser feito preferencialmente por médico psiquiatra, identificando a doença pelos códigos CID-10 F63.0 ou CID-11 6C50. Você pode conseguir esse laudo de graça no CAPS, via SUS."
          />
          <Capitulo
            n="6"
            titulo="Passo 3: Protocolar e o Que Esperar"
            texto="Com as provas organizadas e o argumento montado, o próximo passo é dar entrada no Juizado Especial Cível da sua cidade — presencialmente, ou pelo PJe/e-Proc do seu estado, dependendo de como o tribunal local organiza isso. Coisas que eu queria ter sabido antes de começar: (1) Guarde cópia de tudo que você protocola. Parece óbvio, mas em meio à ansiedade do primeiro processo, gente esquece. (2) Prepare-se pra audiência de conciliação primeiro. Na maioria dos casos, antes de qualquer decisão do juiz, existe uma tentativa de acordo. Chegar com valor mínimo aceitável já definido na sua cabeça ajuda a não decidir sob pressão. (3) Nem toda primeira instância é favorável — e não é o fim. Existe o recurso inominado, um novo pedido de análise por uma turma recursal. Perder na primeira rodada dói, mas não encerra o caminho se você ainda acredita no argumento e tem prova pra sustentar. (4) Prazos existem e são curtos — tanto pra contestação da outra parte quanto pra eventual recurso seu. Anote a data de cada notificação assim que ela chegar. Não existe fórmula que garanta vitória — quem decide é o juiz, caso a caso. O que existe é diferença enorme entre chegar organizado, com prova e argumento, e chegar só com a certeza de que foi enganado."
          />
          <Capitulo
            n="7"
            titulo="Antes de Fechar: o Que Importa Mais que o Dinheiro"
            texto="Se você chegou até aqui pensando só em reaver o que perdeu, quero fechar com uma coisa que aprendi no processo: processar é sobre justiça, não sobre voltar a apostar assim que o dinheiro cair na conta. Se em algum momento da leitura você reconheceu em si mesmo dificuldade real de controlar quanto aposta, isso pesa mais do que qualquer restituição — e existe ajuda gratuita, oficial, pra isso. Autoexclusão pelo governo — gratuito, leva menos de 5 minutos: acesse gov.br/autoexclusaoapostas com uma conta gov.br nível prata ou ouro. Escolha o motivo e o prazo do bloqueio (determinado ou indeterminado). Em até 72 horas, todas as casas de apostas licenciadas no Brasil bloqueiam sua conta automaticamente. Apoio psicológico gratuito, pelo governo: CAPS (Centro de Atenção Psicossocial) — atendimento especializado gratuito; UBS (Unidade Básica de Saúde) — porta de entrada do SUS, pode te encaminhar. Nenhum dos dois cobra nada. Nenhum exige que você 'prove' que tem um problema — é só chegar e pedir ajuda. E se quiser seguir com o processo de forma profissional: montar uma petição do zero, caçar os artigos de lei certos, calcular os juros de mora e formatar tudo nas regras do Juizado Especial dá trabalho e margem a erros. Foi por isso que eu desenvolvi o RecuperaJogo. Não é um modelo genérico de internet. É um gerador inteligente que já insere todos esses argumentos blindados (incluindo a Lei 14.790/2023 e a jurisprudência real) diretamente no seu caso, com base nas provas que você tem. O sistema te guia passo a passo, calcula o valor exato da sua causa (com trava de segurança de 20 salários-mínimos) e te entrega um PDF formatado com cara de petição profissional, pronto para você apenas revisar, assinar e protocolar."
          />

          {/* CTA FINAL COM ÂNCORA DE PREÇO */}
          <div className="rounded-2xl border-2 p-8 text-center mt-12" style={{ borderColor: SEAL, backgroundColor: "#FFF" }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: INK, fontFamily: "Georgia, serif" }}>
              Pronto pra transformar esse conhecimento em petição pronta?
            </h2>
            
            {/* ÂNCORA DE PREÇO */}
            <div className="max-w-md mx-auto mb-6 p-4 rounded-lg" style={{ backgroundColor: AMBER_BG, border: `1px solid ${AMBER_BORDER}` }}>
              <p className="text-sm mb-2" style={{ color: "#5C4A22" }}>
                <strong>Comparação honesta:</strong>
              </p>
              <div className="space-y-2 text-sm" style={{ color: INK }}>
                <p> <strong>Advogado especializado:</strong> cobra de 20% a 40% do valor recuperado por êxito. Numa causa de R$ 5.000, você fica com R$ 3.000 a R$ 4.000.</p>
                <p>⚖️ <strong>RecuperaJogo:</strong> pagamento único de R$ 137. Você fica com <strong>100% do que recuperar</strong>.</p>
              </div>
            </div>

            <a
              href="/login"
              className="inline-flex items-center gap-2 text-base font-bold px-8 py-4 rounded-lg transition-transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: SEAL, color: "#FFF" }}
            >
              Acessar o Gerador de Petição <ArrowRight size={20} />
            </a>
            <p className="text-xs mt-3" style={{ color: INK_SOFT }}>
              3 petições completas inclusas · Garantia de 7 dias · Pagamento seguro via Stripe
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t py-8 px-6 text-center" style={{ backgroundColor: PAPER, borderColor: PAPER_LINE }}>
        <div className="flex flex-col items-center gap-2 mb-4">
          <Link href="/politica-privacidade" className="text-xs hover:underline" style={{ color: INK_SOFT }}>Política de Privacidade</Link>
        </div>
        <p className="text-xs" style={{ color: INK_SOFT }}>
          © {new Date().getFullYear()} RecuperaJogo. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

function Capitulo({ n, titulo, texto }: { n: string; titulo: string; texto: string }) {
  return (
    <div className="rounded-xl border p-6" style={{ backgroundColor: "#FFF", borderColor: PAPER_LINE }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: SEAL, color: "#FFF" }}>
          {n}
        </div>
        <h3 className="text-lg font-bold" style={{ color: INK, fontFamily: "Georgia, serif" }}>{titulo}</h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: INK }}>{texto}</p>
    </div>
  );
}