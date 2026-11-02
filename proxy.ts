import { NextRequest, NextResponse } from 'next/server';

const REF_COOKIE = 'affiliate_ref';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const adminToken = request.cookies.get('admin_session')?.value;

  // 1. Proteção da área de admin (não bloqueia a própria página de login)
  if (pathname.startsWith('/admin') && pathname !== '/admin-login') {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  // 2. Se já está logado como admin, não precisa ver a tela de login
  if (pathname === '/admin-login' && adminToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // 3. Lógica de Afiliados - redirecionar para tela de login dedicada
  if (pathname.startsWith('/afiliados') && pathname !== '/afiliados/login') {
    return NextResponse.redirect(new URL('/afiliados/login', request.url));
  }

  // 4. Lógica de Afiliados (continua após o redirecionamento)
  const response = NextResponse.next();

  // Pega o ?ref= da URL (ex: site.com/?ref=JOAO10)
  const ref = request.nextUrl.searchParams.get('ref');

  // Se tem o código na URL e o usuário ainda não tem o cookie salvo
  if (ref && !request.cookies.has(REF_COOKIE)) {
    if (/^[A-Z0-9_-]{3,20}$/i.test(ref)) {
      response.cookies.set(REF_COOKIE, ref, {
        maxAge: 60 * 60 * 24 * 30, // Dura 30 dias
        httpOnly: true, // Segurança: o JS do navegador não pode ler
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production', // Só HTTPS em produção
      });
    }
  }

  return response;
}

// Configura para rodar em todas as páginas, exceto APIs e arquivos estáticos
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
