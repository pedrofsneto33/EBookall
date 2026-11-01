import { onlyDigits } from "../validators";

export interface DadosCnpj {
  razaoSocial: string;
  fantasia: string;
  situacao: string;
  municipio: string;
  uf: string;
}

/** Consulta pública (BrasilAPI). Best-effort: qualquer falha devolve null e a geração segue normalmente. */
export async function consultarCnpj(cnpj: string, f: typeof fetch = fetch): Promise<DadosCnpj | null> {
  const d = onlyDigits(cnpj);
  if (d.length !== 14) return null;
  try {
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 3000);
    const r = await f(`https://brasilapi.com.br/api/cnpj/v1/${d}`, { signal: ctl.signal, headers: { accept: "application/json" } });
    clearTimeout(to);
    if (!r.ok) return null;
    const j = (await r.json()) as Record<string, unknown>;
    return {
      razaoSocial: String(j.razao_social ?? ""),
      fantasia: String(j.nome_fantasia ?? ""),
      situacao: String(j.descricao_situacao_cadastral ?? ""),
      municipio: String(j.municipio ?? ""),
      uf: String(j.uf ?? ""),
    };
  } catch {
    return null;
  }
}

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9 ]/g, " ");
const STOP = new Set(["ltda", "sa", "s", "a", "eireli", "me", "epp", "de", "do", "da", "dos", "das", "e", "bet", "brasil", "brazil", "gaming", "apostas", "jogos", "servicos", "tecnologia"]);
const tokens = (s: string) => norm(s).split(/\s+/).filter((t) => t.length > 2 && !STOP.has(t));

/** Avisos sobre o CNPJ da ré, a partir dos dados públicos. */
export function avisosCnpj(nomeDigitado: string, dados: DadosCnpj | null): string[] {
  if (!dados) return [];
  const out: string[] = [];
  const alvo = new Set([...tokens(dados.razaoSocial), ...tokens(dados.fantasia)]);
  const meus = tokens(nomeDigitado);
  const bate = meus.length === 0 || meus.some((t) => alvo.has(t));
  const nomeReceita = dados.razaoSocial || dados.fantasia;
  if (!bate)
    out.push(`O CNPJ informado pertence a "${nomeReceita}" (${dados.municipio}/${dados.uf}), que não parece ser o mesmo nome que você digitou ("${nomeDigitado}"). Confira se é a empresa operadora certa antes de protocolar.`);
  else if (nomeReceita)
    out.push(`Confira a qualificação da ré: na Receita Federal este CNPJ consta como "${nomeReceita}" (${dados.municipio}/${dados.uf}). Use essa razão social na petição, não o nome do site.`);
  if (/cr[eé]dito|financeira|banco|pagamentos?|institui[cç][aã]o/i.test(dados.razaoSocial))
    out.push(`A razão social "${dados.razaoSocial}" parece de instituição financeira ou meio de pagamento, não da operadora de apostas. Procure nos Termos de Uso o CNPJ da empresa que opera o site.`);
  if (dados.situacao && !/ativa/i.test(dados.situacao)) out.push(`Na Receita Federal este CNPJ consta como "${dados.situacao}". Confirme se a empresa ainda responde pelo serviço.`);
  return out;
}
