/**
 * Onde protocolar no Juizado Especial Cível de cada UF (sem advogado, causa até 20 SM).
 *
 * Levantado em 01/11/2026 por pesquisa na web. Cada UF traz `nivel`:
 *  - "confirmado": o canal foi lido em página oficial do tribunal;
 *  - "verificar": a página oficial apareceu na pesquisa, mas não foi possível abri-la ou o dado pode estar defasado.
 * WhatsApp só aparece quando estava numa página oficial. Tribunais mudam esses canais com frequência:
 * a tela sempre manda o usuário conferir no site do tribunal.
 */
export const JEC_DATA_LEVANTAMENTO = "01/11/2026";

export interface JecCanal {
  nome: string;
  url?: string;
  obs?: string;
}
export interface JecUF {
  uf: string;
  tribunal: string;
  site: string;
  nivel: "confirmado" | "verificar";
  online?: JecCanal;
  presencial?: string;
  whatsapp?: { numero: string; obs: string };
  email?: string;
}

export const JEC: Record<string, JecUF> = {
  AC: { uf: "AC", tribunal: "TJAC", site: "https://www.tjac.jus.br", nivel: "verificar",
    online: { nome: "Petição Cidadão", url: "https://www.tjac.jus.br/peticao-cidadao/" },
    presencial: "Setor de Atermação dos Juizados Especiais Cíveis, Cidade da Justiça, Rio Branco. Endereços: https://www.tjac.jus.br/adm/enderecos-e-telefones/" },
  AL: { uf: "AL", tribunal: "TJAL", site: "https://www.tjal.jus.br", nivel: "verificar",
    presencial: "Atermação na Secretaria do Juizado Especial da comarca. Não achei canal online confirmado: procure 'Juizados' no site do tribunal." },
  AP: { uf: "AP", tribunal: "TJAP", site: "https://www.tjap.jus.br", nivel: "verificar",
    presencial: "Setor de Atermação em Macapá (há registro de atendimento do TJAP no SIAC/Super Fácil). Confirme endereço e horário no site." },
  AM: { uf: "AM", tribunal: "TJAM", site: "https://www.tjam.jus.br", nivel: "verificar",
    online: { nome: "Atermação On Line (Juizados Cíveis da capital)", url: "https://www.tjam.jus.br/index.php/juizados/atermacao" },
    presencial: "Setor de Ajuizamento/Atermação dos Juizados, Manaus. Unidades: https://www.tjam.jus.br/index.php/juizados/unidades-de-atendimento/capital" },
  BA: { uf: "BA", tribunal: "TJBA", site: "https://www.tjba.jus.br", nivel: "verificar",
    online: { nome: "Balcão Virtual / agendamento no SAJ", url: "https://balcaovirtual.tjba.jus.br" },
    presencial: "Central dos Juizados (Imbuí): Rua Padre Casimiro Quiroga, 2403, Imbuí, Salvador. Endereços dos SAJ: https://tjba.jus.br/juizadosespeciais/enderecos-e-telefones-capital/" },
  CE: { uf: "CE", tribunal: "TJCE", site: "https://www.tjce.jus.br", nivel: "confirmado",
    online: { nome: "Sistema de Atermação Online (também no app TJCE Mobile)", url: "https://sisatermacao.tjce.jus.br/" },
    whatsapp: { numero: "(85) 98239-4389", obs: "Núcleo Justiça 4.0, só para comarcas do interior sem unidade especializada. Para Fortaleza use o sistema online." },
    presencial: "Endereços dos Juizados: https://www.tjce.jus.br/juizados-especiais/juizados-especiais/" },
  DF: { uf: "DF", tribunal: "TJDFT", site: "https://www.tjdft.jus.br", nivel: "confirmado",
    online: { nome: "Como iniciar um processo nos Juizados (PJe, Balcão Virtual e NUREVI por videochamada)", url: "https://www.tjdft.jus.br/servicos/distribuicao-e-atendimento/como-iniciar-um-processo-nos-juizados-especiais" },
    presencial: "Núcleos de Atendimento Judiciário, com agendamento. Unidades: https://www.tjdft.jus.br/servicos/distribuicao-e-atendimento/unidades-de-atendimento-presencial",
    whatsapp: { numero: "(61) 3103-5874", obs: "Apoio virtual do TJDFT, segunda a sexta, 12h às 19h." }, email: "apoiovirtual@tjdft.jus.br" },
  ES: { uf: "ES", tribunal: "TJES", site: "https://www.tjes.jus.br", nivel: "verificar",
    online: { nome: "Juizados Especiais: ajuizamento online", url: "https://www.tjes.jus.br/institucional/coordenadorias/juizados-especiais/juizados-especiais-ajuizamento-online/" },
    presencial: "Centrais de Abertura de Processos, em Vitória: https://www.tjes.jus.br/institucional/coordenadorias/juizados-especiais/centrais-de-abertura-e-distribuicao-de-processos/" },
  GO: { uf: "GO", tribunal: "TJGO", site: "https://www.tjgo.jus.br", nivel: "verificar",
    email: "nucleoatermacao@tjgo.jus.br",
    whatsapp: { numero: "(62) 3018-6079", obs: "Núcleo de Atermação: envio da inicial e dos documentos, conforme a cartilha oficial do JEC do TJGO." },
    presencial: "Núcleo de Atermação dos Juizados Cíveis de Goiânia, com agendamento. Cartilha: https://docs.tjgo.jus.br/institucional/departamentos/turmas_recursais/CartilhaJuizadoEspecialCivelTJGO.pdf" },
  MA: { uf: "MA", tribunal: "TJMA", site: "https://www.tjma.jus.br", nivel: "confirmado",
    online: { nome: "Atermação On-line", url: "https://sistemas.tjma.jus.br/atermacao/#/inicio/", obs: "Depois, os atos seguintes podem exigir ir à sede do Juizado (Provimento CGJ 14/2023)." } },
  MT: { uf: "MT", tribunal: "TJMT", site: "https://www.tjmt.jus.br", nivel: "verificar",
    online: { nome: "Formulário Eletrônico de Atermação", url: "https://atermacao.tjmt.jus.br/formulario-atermacao" } },
  MS: { uf: "MS", tribunal: "TJMS", site: "https://www.tjms.jus.br", nivel: "verificar",
    online: { nome: "Agendamento de atendimento (abertura de ação por videochamada)", url: "https://agendamento.tjms.jus.br/cadastro/selecione-categoria" },
    presencial: "Fórum de Campo Grande, com agendamento pelo site." },
  MG: { uf: "MG", tribunal: "TJMG", site: "https://www.tjmg.jus.br", nivel: "verificar",
    online: { nome: "TJ Atende (opção Juizados Especiais da Capital) / pré-atermação online", url: "https://tj-atende.tjmg.jus.br/" },
    presencial: "Atermação dos Juizados de BH: Av. Francisco Sales, 1.446, Santa Efigênia, tel. (31) 3270-3550, seg a sex 7h30 às 18h30." },
  PA: { uf: "PA", tribunal: "TJPA", site: "https://www.tjpa.jus.br", nivel: "verificar",
    online: { nome: "Balcão Virtual do TJPA", url: "https://apps.tjpa.jus.br/bv/balcao.php" } },
  PB: { uf: "PB", tribunal: "TJPB", site: "https://www.tjpb.jus.br", nivel: "verificar",
    online: { nome: "Orientação às partes (Juizados) e PJe", url: "https://www.tjpb.jus.br/juizados-especiais/orientacao-as-partes" } },
  PR: { uf: "PR", tribunal: "TJPR", site: "https://www.tjpr.jus.br", nivel: "confirmado",
    online: { nome: "Formulário Virtual dos Juizados Especiais (escolha a comarca e 'Nova ação')", url: "https://www.tjpr.jus.br/formulario-virtual-juizados-especiais" },
    presencial: "Em Curitiba: Serviço de Triagem dos Juizados Especiais do Foro Central (confirme o endereço no site)." },
  PE: { uf: "PE", tribunal: "TJPE", site: "https://www.tjpe.jus.br", nivel: "confirmado",
    online: { nome: "Juizado Digital (formulário com anexos)", url: "https://portal.tjpe.jus.br/web/juizados-especiais/juizado-digital" },
    presencial: "Centros de Recebimento de Queixas Orais, com agendamento por telefone ou e-mail (veja a página do Juizado Digital)." },
  PI: { uf: "PI", tribunal: "TJPI", site: "https://www.tjpi.jus.br", nivel: "verificar",
    email: "cad.juizadostjpi@gmail.com",
    presencial: "Teresina: Atermação Virtual do CAD (Provimento CGJ 84/2021). Envie e-mail com o assunto 'Atermação virtual' e seu nome completo; a resposta automática traz o formulário. O e-mail vem de notícia do TJPI e é uma conta Gmail: confirme no site do tribunal." },
  RJ: { uf: "RJ", tribunal: "TJRJ", site: "https://www.tjrj.jus.br", nivel: "verificar",
    online: { nome: "Portal dos Juizados Especiais", url: "https://www.tjrj.jus.br/web/juizados-especiais" } },
  RN: { uf: "RN", tribunal: "TJRN", site: "https://www.tjrn.jus.br", nivel: "verificar",
    online: { nome: "Serviços dos Juizados Especiais", url: "https://portal.tjrn.jus.br/juizados-especiais-do-rn/servicos-dos-juizados-especiais/" } },
  RS: { uf: "RS", tribunal: "TJRS", site: "https://www.tjrs.jus.br", nivel: "verificar",
    online: { nome: "Juizado Especial Online (formulário JESP Online)", url: "https://www.tjrs.jus.br/novo/institucional/1o-grau/juizados-especiais/form-jesp-online/" } },
  RO: { uf: "RO", tribunal: "TJRO", site: "https://www.tjro.jus.br", nivel: "verificar",
    online: { nome: "AtermaJus (atermação online)", url: "https://atermajus.tjro.jus.br/" },
    presencial: "Balcão Virtual do TJRO, com canais de Porto Velho: https://balcaovirtual.tjro.jus.br/" },
  RR: { uf: "RR", tribunal: "TJRR", site: "https://www.tjrr.jus.br", nivel: "verificar",
    online: { nome: "Balcão Virtual, Juizados Especiais (Setor de Atendimento, Atermação e Distribuição)", url: "https://balcaovirtual.tjrr.jus.br/juizados-especiais" },
    email: "sada@tjrr.jus.br",
    whatsapp: { numero: "800-555-2233", obs: "'Resolva Aqui', listado na página do setor de atermação do TJRR." } },
  SC: { uf: "SC", tribunal: "TJSC", site: "https://www.tjsc.jus.br", nivel: "verificar",
    online: { nome: "eproc: cadastro 'Jus Postulandi' (usuários externos)", url: "https://www.tjsc.jus.br/web/processo-eletronico-eproc/usuarios-externos" },
    presencial: "Endereço do fórum da sua comarca: https://www.tjsc.jus.br/paginas-das-comarcas" },
  SP: { uf: "SP", tribunal: "TJSP", site: "https://www.tjsp.jus.br", nivel: "confirmado",
    online: { nome: "Peticionamento Eletrônico JEC (como fazer o pedido)", url: "https://www.tjsp.jus.br/PeticionamentoJEC", obs: "Há também cadastro de pessoa física no eproc (Jus Postulandi). Leia a página antes: pode exigir cadastro prévio." },
    presencial: "Dá para dar entrada presencialmente em fórum ou anexo do JEC. Endereços: https://www.tjsp.jus.br/ListaTelefonica" },
  SE: { uf: "SE", tribunal: "TJSE", site: "https://www.tjse.jus.br", nivel: "confirmado",
    online: { nome: "Juizado a um Clique (registro por videoconferência agendada)", url: "https://www.tjse.jus.br/portal/servicos/judiciais/juizado-a-um-clique" },
    whatsapp: { numero: "ver lista oficial", obs: "O TJSE publica WhatsApp por unidade de JEC: https://www.tjse.jus.br/portal/poder-judiciario/canais-de-atendimento/whatsapp (não são, necessariamente, canais de protocolo)." } },
  TO: { uf: "TO", tribunal: "TJTO", site: "https://www.tjto.jus.br", nivel: "verificar",
    online: { nome: "Balcão Virtual e ferramenta Jus Postulandi (até 20 salários mínimos)", url: "https://www.tjto.jus.br/balcao-virtual" } },
};

export const jecDaUF = (uf: string): JecUF | null => JEC[uf.toUpperCase()] ?? null;
