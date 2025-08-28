import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware simplificado para evitar upstream errors
  const response = NextResponse.next();
  
  // Headers básicos apenas
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match apenas rotas específicas para evitar conflitos
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};