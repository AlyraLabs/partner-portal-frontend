import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/projects',
  '/danger-zone',
  '/bug-report',
  '/fees',
  '/analytics',
];

const publicRoutes = ['/login', '/register', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('access_token');
  const isAuthenticated = !!sessionCookie;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/projects', request.url));
  }

  if (pathname === '/' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
