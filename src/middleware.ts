import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.email) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth/signin';
      return NextResponse.redirect(url);
    }
    // Role check must be done in the page or API route, not middleware
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 