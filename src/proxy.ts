import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth-token';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('ss-auth')?.value;

  if (pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url));
    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (pathname.startsWith('/account')) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url));
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*'],
};