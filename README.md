# RecuperaJogo

Gerador de **rascunho de petição** para Juizado Especial Cível (jus postulandi) em casos contra casas de apostas (autoexclusão violada, falha de serviço, CDC).

**Produção:** https://recuperajogo.vercel.app  
**Empresa:** Primex Sistemas LTDA · CNPJ 55.536.885/0001-30 · https://www.primexsistemas.com

> **Não é advocacia.** Não promete resultado judicial. O usuário revisa e protocola em nome próprio.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- JWT próprio (cookie `rj_session`) — sessão e autenticação
- Pix CNPJ (Pix estático) — pagamento único R$ 137, liberação manual de acesso
- SQLite (libSQL) — status de acesso, limite de petições e usuários
- `@react-pdf/renderer` (PDF)
- Resend (notificação de leads)

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Variáveis

| Variável | Uso |
|----------|-----|
| `AUTH_SECRET` | Assinatura do JWT de sessão |
| `ADMIN_SECRET` | Liberação manual de acesso (`/api/admin/grant`) |
| `DATABASE_URL` | SQLite/libSQL — usuários, status e limite de petições |
| `DATABASE_AUTH_TOKEN` | Token do Turso (produção) |
| `NEXT_PUBLIC_SITE_URL` | Links de acesso + SEO |
| `RESEND_API_KEY` | E-mail de leads |
| `RESEND_FROM` | Remetente |
| `LEADS_NOTIFY_EMAIL` | Destino da notificação |
| `NEXT_PUBLIC_VIDEO_URL` | (opcional) embed da seção vídeo |

## Fluxo de pagamento

1. Usuário faz login (`/login`)
2. `/pagamento` → Pix CNPJ (chave/QR estático) e envio do comprovante por WhatsApp
3. Admin confirma o Pix e libera o acesso (`/admin` → `POST /api/admin/grant`) → `users.status = active` no SQLite
4. Cliente entra e usa `/gerador` (até 3 petições)

Endpoint de liberação: `POST /api/admin/grant` (requer `ADMIN_SECRET`)

## Deploy checklist

- [ ] Env vars na Vercel
- [ ] `AUTH_SECRET` definida (assinatura do JWT de sessão)
- [ ] `ADMIN_SECRET` definida para a liberação manual de acesso
- [ ] SQLite/libSQL: `DATABASE_URL` (e `DATABASE_AUTH_TOKEN` no Turso)
- [ ] Testar o fluxo Pix CNPJ + liberação manual (`/admin` → `/obrigado` → `/gerador`)
- [ ] (Opcional) Prints/PDF tarjados em `/public/docs` e lista em `ProvaReal.tsx`
- [ ] (Opcional) `NEXT_PUBLIC_VIDEO_URL` e links de fontes em `ImpactoSocial.tsx`

## Scripts

```bash
npm run build
npm run lint
```
