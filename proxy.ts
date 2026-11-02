import { NextRequest, NextResponse } from 'next/server';

const REF_COOKIE = 'affiliate_ref';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  
  const ref = request.nextUrl.searchParams.get('ref');
  if (ref && /^[A-Z0-9_-]{3,20}$/i.test(ref) && !request.cookies.has(REF_COOKIE)) {
    response.cookies.set(REF_COOKIE, ref, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
