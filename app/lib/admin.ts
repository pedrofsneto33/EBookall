export function isAdmin(email: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) return false; // Falha fechada: sem ADMIN_EMAIL, ninguém é admin
  return email.toLowerCase().trim() === adminEmail;
}
