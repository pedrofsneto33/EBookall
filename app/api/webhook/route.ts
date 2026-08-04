import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const CREDITS_BY_PRICE_ID: Record<string, number> = {
  'price_1U0B28QlLVHhmz5iGUTlG2nZ': 30,
  'price_1U0B2pQlLVHhmz5iyWsf98ex': 100,
  'price_1U0B3QQlLVHhmz5iVcH3aXOi': 50,
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Erro ao verificar webhook:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleCheckoutCompleted(session);
      break;
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      await handleInvoicePaymentSucceeded(invoice);
      break;
    default:
      console.log('Evento ignorado:', event.type);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: any) {
  console.log('Webhook recebido! Session ID:', session.id);
  console.log('Email do cliente:', session.customer_details?.email);

  const email = session.customer_details?.email;

  if (!email) {
    console.error('ERRO: Email nao encontrado');
    return;
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  const priceId = lineItems.data[0]?.price?.id;

  console.log('Price ID recebido:', priceId);

  if (!priceId) {
    console.error('ERRO: Price ID nao encontrado na sessao');
    return;
  }

  const creditsToAdd = CREDITS_BY_PRICE_ID[priceId] || 0;
  console.log('Creditos para adicionar:', creditsToAdd);

  if (creditsToAdd === 0) {
    console.error('ERRO: Price ID desconhecido:', priceId);
    console.log('Price IDs configurados:', Object.keys(CREDITS_BY_PRICE_ID));
    return;
  }

  console.log('Buscando usuario no Supabase:', email);
  const { data: user, error: userError } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (userError || !user) {
    console.error('ERRO: Usuario nao encontrado:', userError);
    return;
  }

  const userId = user.id;
  console.log('Usuario encontrado! ID:', userId);

  const { data: existingCredits } = await supabaseAdmin
    .from('credits')
    .select('balance, total_earned')
    .eq('user_id', userId)
    .single();

  if (existingCredits) {
    const newBalance = existingCredits.balance + creditsToAdd;
    const newTotalEarned = existingCredits.total_earned + creditsToAdd;

    const { error: updateError } = await supabaseAdmin
      .from('credits')
      .update({
        balance: newBalance,
        total_earned: newTotalEarned,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('ERRO ao atualizar creditos:', updateError);
    } else {
      console.log('SUCESSO! Adicionados', creditsToAdd, 'creditos. Novo saldo:', newBalance);
    }
  } else {
    const { error: insertError } = await supabaseAdmin
      .from('credits')
      .insert({
        user_id: userId,
        balance: creditsToAdd,
        total_earned: creditsToAdd,
        total_spent: 0
      });

    if (insertError) {
      console.error('ERRO ao criar registro:', insertError);
    } else {
      console.log('SUCESSO! Criado registro com', creditsToAdd, 'creditos.');
    }
  }
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  console.log('Invoice payment recebido! Invoice ID:', invoice.id);

  const email = invoice.customer_email;
  const priceId = invoice.lines?.data[0]?.price?.id;

  console.log('Email do cliente:', email);
  console.log('Price ID recebido:', priceId);

  if (!email) {
    console.error('ERRO: Email nao encontrado na invoice');
    return;
  }

  if (!priceId) {
    console.error('ERRO: Price ID nao encontrado na invoice');
    return;
  }

  const creditsToAdd = CREDITS_BY_PRICE_ID[priceId] || 0;
  console.log('Creditos para adicionar:', creditsToAdd);

  if (creditsToAdd === 0) {
    console.error('ERRO: Price ID desconhecido:', priceId);
    return;
  }

  console.log('Buscando usuario no Supabase:', email);
  const { data: user, error: userError } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (userError || !user) {
    console.error('ERRO: Usuario nao encontrado:', userError);
    return;
  }

  const userId = user.id;
  console.log('Usuario encontrado! ID:', userId);

  const { data: existingCredits } = await supabaseAdmin
    .from('credits')
    .select('balance, total_earned')
    .eq('user_id', userId)
    .single();

  if (existingCredits) {
    const newBalance = existingCredits.balance + creditsToAdd;
    const newTotalEarned = existingCredits.total_earned + creditsToAdd;

    const { error: updateError } = await supabaseAdmin
      .from('credits')
      .update({
        balance: newBalance,
        total_earned: newTotalEarned,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('ERRO ao atualizar creditos:', updateError);
    } else {
      console.log('SUCESSO! Adicionados', creditsToAdd, 'creditos. Novo saldo:', newBalance);
    }
  } else {
    const { error: insertError } = await supabaseAdmin
      .from('credits')
      .insert({
        user_id: userId,
        balance: creditsToAdd,
        total_earned: creditsToAdd,
        total_spent: 0
      });

    if (insertError) {
      console.error('ERRO ao criar registro:', insertError);
    } else {
      console.log('SUCESSO! Criado registro com', creditsToAdd, 'creditos.');
    }
  }
}