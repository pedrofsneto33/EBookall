# RecuperaJogo

Gerador de **rascunho de petição** para Juizado Especial Cível (jus postulandi) em casos contra casas de apostas (autoexclusão violada, falha de serviço, CDC).

**Produção:** https://recuperajogo.vercel.app  
**Empresa:** Primex Sistemas LTDA · CNPJ 55.536.885/0001-30 · https://www.primexsistemas.com

> **Não é advocacia.** Não promete resultado judicial. O usuário revisa e protocola em nome próprio.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Supabase (Auth + `subscriptions` + `leads`)
- Stripe Checkout (Pix + cartão, pagamento único R$ 137)
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
| `NEXT_PUBLIC_SUPABASE_URL` | Auth + DB |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cliente |
| `SUPABASE_SERVICE_ROLE_KEY` | Webhook / ensure subscription |
| `STRIPE_SECRET_KEY` | Checkout Session |
| `STRIPE_WEBHOOK_SECRET` | Validação do webhook |
| `STRIPE_PRICE_ID` | (opcional) Price fixo |
| `NEXT_PUBLIC_SITE_URL` | success/cancel + SEO |
| `RESEND_API_KEY` | E-mail de leads |
| `RESEND_FROM` | Remetente |
| `LEADS_NOTIFY_EMAIL` | Destino da notificação |
| `NEXT_PUBLIC_VIDEO_URL` | (opcional) embed da seção vídeo |

## Fluxo de pagamento

1. Usuário faz login (`/login`)
2. `/pagamento` → `POST /api/checkout` → Stripe Checkout (Pix ou cartão)
3. Webhook `checkout.session.completed` → upsert `subscriptions.status = active`
4. Redirect `/obrigado` → `/gerador` (até 3 petições)

Endpoint do webhook: `https://SEU_DOMINIO/api/webhook`  
Evento: `checkout.session.completed`

## Deploy checklist

- [ ] Env vars na Vercel
- [ ] Webhook Stripe apontando para produção
- [ ] Supabase: tabelas + RLS em `subscriptions` e `leads`
- [ ] Testar checkout + webhook em modo live
- [ ] (Opcional) Prints/PDF tarjados em `/public/docs` e lista em `ProvaReal.tsx`
- [ ] (Opcional) `NEXT_PUBLIC_VIDEO_URL` e links de fontes em `ImpactoSocial.tsx`

## Scripts

```bash
npm run build
npm run lint
```
