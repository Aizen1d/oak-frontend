import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

import { tokenVerify } from './actions/auth'

const publicRoutes = ['/login', '/signup', '/']

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')

  if (accessToken) {
    const response = await tokenVerify(accessToken.value)

    if (response) {

      // Check if not going to public routes
      if (!publicRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.next()
      }
      
      return NextResponse.redirect(new URL('/items', request.url))
    }
  }
}

export const config = {
  matcher: ['/items:pathname*', ...publicRoutes],
}
