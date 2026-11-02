export function emailKey(email: string): string {
  const normalized = email.toLowerCase().trim();
  const [local, domain] = normalized.split("@");
  if (!local || !domain) return normalized;

  // Remove tudo depois do '+' no nome local
  const cleanLocal = local.split("+")[0];

  // Para Gmail/Googlemail: remove pontos do nome local e normaliza o domínio
  const normalizedDomain = domain.toLowerCase();
  if (normalizedDomain === "gmail.com" || normalizedDomain === "googlemail.com") {
    const noDotsLocal = cleanLocal.replace(/\./g, "");
    return `${noDotsLocal}@gmail.com`; // Força gmail.com para tratar ambos como iguais
  }

  return `${cleanLocal}@${domain}`;
}

export function maskEmail(email: string): string {
  const [usuario, dominio] = email.split("@");
  if (!usuario || !dominio) return email;
  const mascarado = usuario.length > 2 ? usuario.slice(0, 2) + "***" : usuario[0] + "***";
  return `${mascarado}@${dominio}`;
}