import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/auth/login(.*)', '/auth/signup(.*)', '/', ])
const isAuthRoute = createRouteMatcher(['/auth/register'])

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated, redirectToSignIn, sessionClaims } = await auth()

  if (!isPublicRoute(req) && !isAuthenticated) {
    return redirectToSignIn()
  }
  if (!isAuthRoute(req) && !isPublicRoute(req) && sessionClaims?.publicMetadata?.status !== 'registered') {
    const url = new URL('/auth/register', req.url)
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