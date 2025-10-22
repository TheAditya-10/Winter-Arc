import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/login(.*)', '/signup(.*)', '/', '/api/user'])
const isAuthRoute = createRouteMatcher(['/register'])

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated, redirectToSignIn } = await auth()

  if (!isPublicRoute(req) && !isAuthenticated) {
    return redirectToSignIn()
  }
  if (!isAuthRoute(req) && !isPublicRoute(req) && (await auth()).sessionClaims?.metadata?.isRegistered !== 'true') {
    const url = new URL('/register', req.url)
    return NextResponse.redirect(url)
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}