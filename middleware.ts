import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

import { tokenVerify } from './actions/auth'

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')

  const publicRoutes = ['/login', '/signup']

  if (accessToken) {
    const verified = await tokenVerify(accessToken.value)

    if (verified) {
      // Check if not going to public routes
      if (!publicRoutes.includes(request.url)) {
        return NextResponse.next()
      }
      else {
        return NextResponse.redirect(new URL('/items', request.url))
      }
    }
  }
  
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/items:pathname*'],
}
