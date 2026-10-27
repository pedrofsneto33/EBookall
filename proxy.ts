import { NextRequest, NextResponse } from 'next/server';

const REF_COOKIE = 'affiliate_ref';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  
  // Pega o ?ref= da URL (ex: site.com/?ref=JOAO10)
  const ref = request.nextUrl.searchParams.get('ref');

  // Se tem o código na URL e o usuário ainda não tem o cookie salvo
  if (ref && !request.cookies.has(REF_COOKIE)) {
    response.cookies.set(REF_COOKIE, ref, {
      maxAge: 60 * 60 * 24 * 30, // Dura 30 dias
      httpOnly: true, // Segurança: o JS do navegador não pode ler
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production', // Só HTTPS em produção
    });
  }
  
  return response;
}

// Configura para rodar em todas as páginas, exceto APIs e arquivos estáticos
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}