import { NextResponse } from 'next/server'

export function middleware(request) {
  // Lấy token từ cookie
  const token = request.cookies.get('adminToken')?.value

  // Lấy đường dẫn hiện tại
  const { pathname } = request.nextUrl

  // Nếu đang ở trang chủ (/)
  if (pathname === '/') {
    // Nếu đã có token, chuyển hướng về dashboard
    if (token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    // Nếu chưa có token, chuyển hướng về trang login
    return NextResponse.redirect(new URL('/admin-login', request.url))
  }

  // Nếu đang ở trang login và đã có token, chuyển hướng về dashboard
  if (pathname === '/admin-login' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Nếu không phải trang login và chưa có token, chuyển hướng về trang login
  if (pathname !== '/admin-login' && !token) {
    return NextResponse.redirect(new URL('/admin-login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/admin-login',
    '/users/:path*',
    '/posts/:path*',
    '/reports/:path*',
    '/settings/:path*',
  ]
} 