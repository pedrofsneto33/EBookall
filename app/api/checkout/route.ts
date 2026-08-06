import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Mapeamento dos produtos com os seus IDs REAIS do Stripe
const PRICES = {
  pro: 'price_1U0B28QlLVHhmz5iGUTlG2nZ',
  business: 'price_1U0B2pQlLVHhmz5iyWsf98ex',
  avulso: 'price_1U0B3QQlLVHhmz5iVcH3aXOi',
};

export async function POST(request: Request) {
  try {
    const { plano } = await request.json();

    const priceId = PRICES[plano as keyof typeof PRICES];

    if (!priceId) {
      return NextResponse.json(
        { error: 'Plano inválido fornecido.' },
        { status: 400 }
      );
    }

    // Criar sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: plano === 'avulso' ? 'payment' : 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get('origin')}/gerador?success=true`,
      cancel_url: `${request.headers.get('origin')}/precos?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Erro no checkout:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}