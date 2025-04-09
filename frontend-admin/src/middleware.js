import { NextResponse } from 'next/server'

export function middleware(request) {
  // Lấy token từ cookie
  const token = request.cookies.get('auth_token')?.value
  
  // Lấy đường dẫn hiện tại
  const { pathname } = request.nextUrl

  // Nếu đã có token và đang ở trang login, chuyển hướng về dashboard
  if (token && pathname === '/admin-login') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Nếu chưa có token và đang truy cập trang chủ hoặc các route admin (trừ trang login), chuyển hướng về trang login
  if (!token && (pathname === '/' || (pathname.startsWith('/admin') && pathname !== '/admin-login'))) {
    return NextResponse.redirect(new URL('/admin-login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*', '/admin-login']
} 