import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { tema, tom, capitulos } = await request.json();

    console.log(' Gerando ebook:', { tema, tom, capitulos });

    // 1. Gerar sumário
    const sumarioCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em criar ebooks profissionais e bem estruturados.',
        },
        {
          role: 'user',
          content: `Crie um sumário com ${capitulos} capítulos para um ebook sobre: "${tema}". Tom: ${tom}. Responda APENAS com uma lista numerada dos capítulos, um por linha.`,
        },
      ],
      model: 'llama-3.3-70b-versatile',  // ✅ MODELO ATUALIZADO
    });

    const sumario = sumarioCompletion.choices[0].message.content || '';
    console.log('📋 Sumário gerado:', sumario);
    
    const capitulosLista = sumario.split('\n').filter((c) => c.trim());

    // 2. Gerar conteúdo de cada capítulo
    const ebookCompleto: any[] = [];

    for (const capitulo of capitulosLista.slice(0, 3)) { // Limita a 3 capítulos
      console.log('✍️  Gerando capítulo:', capitulo);
      
      const conteudoCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Você é um escritor profissional. Escreva conteúdo rico, detalhado e envolvente.',
          },
          {
            role: 'user',
            content: `Escreva o conteúdo completo do capítulo: "${capitulo}" para um ebook sobre "${tema}". Tom: ${tom}. Mínimo de 500 palavras. Formate com markdown (títulos, parágrafos, listas).`,
          },
        ],
        model: 'llama-3.3-70b-versatile',  // ✅ MODELO ATUALIZADO
      });

      ebookCompleto.push({
        titulo: capitulo,
        conteudo: conteudoCompletion.choices[0].message.content,
      });
    }

    console.log('✅ Ebook gerado com sucesso!');

    return NextResponse.json({
      success: true,
      ebook: {
        tema,
        capitulos: ebookCompleto,
      },
    });
  } catch (error) {
    console.error('❌ Erro ao gerar ebook:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao gerar ebook' },
      { status: 500 }
    );
  }
}