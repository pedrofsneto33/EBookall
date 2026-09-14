# RecuperaJogo

Ferramenta de automação de petições para Juizado Especial Cível (jus postulandi), focada em casos de **autoexclusão violada** e **ludopatia** no setor de apostas (Lei 14.790/2023 + CDC).

**Produção:** https://recuperajogo.vercel.app

> **Aviso:** isto **não** é assessoria jurídica. O usuário revisa e protocola em nome próprio.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Supabase (Auth + tabelas `subscriptions` / `leads`)
- Stripe Checkout Session (pagamento único)
- `@react-pdf/renderer` (PDF da petição)
- Resend (notificação de leads)

## Configuração

```bash
cp .env.example .env.local
npm install
npm run dev
```

### Variáveis obrigatórias

| Variável | Uso |
|----------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | Auth + DB |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cliente browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Webhook / upsert de subscription |
| `STRIPE_SECRET_KEY` | Checkout Session |
| `STRIPE_WEBHOOK_SECRET` | Validação do webhook |
| `NEXT_PUBLIC_SITE_URL` | URLs de success/cancel |

### Schema sugerido (Supabase)

```sql
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  peticoes_usadas int not null default 0,
  payment_provider_id text,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  unique (user_id)
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  nome text,
  whatsapp text,
  origem text default 'guia',
  created_at timestamptz default now()
);

alter table public.subscriptions enable row level security;
create policy "own sub select" on public.subscriptions
  for select using (auth.uid() = user_id);
```

### Webhook Stripe

1. Endpoint: `https://SEU_DOMINIO/api/webhook`
2. Evento: `checkout.session.completed`
3. Secret em `STRIPE_WEBHOOK_SECRET`

O checkout envia `metadata.user_id` e o webhook faz **upsert** (corrige o bug do UPDATE sem linha).

## Fluxo

1. Login → garante subscription `pending`
2. `/pagamento` → `/api/checkout` → Stripe
3. Webhook → `status = active`
4. `/obrigado` → `/gerador` (até 3 petições)

## Commits recentes de correção

- Checkout Session autenticado (substitui Payment Link estático)
- Webhook TypeScript com upsert
- API `/api/subscription/ensure`
