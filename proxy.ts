import { NextRequest, NextResponse } from 'next/server';

const REF_COOKIE = 'affiliate_ref';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();

  // 1. Lógica de captura de afiliado (mantida)
  const ref = request.nextUrl.searchParams.get('ref');
  if (ref && /^[A-Z0-9_-]{3,20}$/i.test(ref) && !request.cookies.has(REF_COOKIE)) {
    response.cookies.set(REF_COOKIE, ref, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  // 2. Proteção da área de ADMIN (bloqueia tudo em /admin, exceto /admin-login)
  if (pathname.startsWith('/admin') && pathname !== '/admin-login') {
    const adminSession = request.cookies.get('admin_session');
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  // 3. Proteção da área de AFILIADOS (bloqueia /afiliados, exceto /afiliados/login)
  if (pathname.startsWith('/afiliados') && pathname !== '/afiliados/login') {
    const clientSession = request.cookies.get('rj_session');
    if (!clientSession) {
      return NextResponse.redirect(new URL('/afiliados/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
