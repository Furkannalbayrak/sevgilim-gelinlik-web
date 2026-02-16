import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  
  // Eğer host yoksa veya localhost ise işlem yapma (development için)
  if (!hostname || hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return NextResponse.next();
  }
  
  // Eğer www yoksa ve sevgilimgelinlik.com.tr ise www ekle
  if (hostname === 'sevgilimgelinlik.com.tr') {
    const url = request.nextUrl.clone();
    url.host = 'www.sevgilimgelinlik.com.tr';
    
    // 301 (Kalıcı) redirect - Google'a "bundan sonra hep www kullan" der
    return NextResponse.redirect(url, { status: 301 });
  }
  
  return NextResponse.next();
}

// Tüm route'larda çalışsın
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};