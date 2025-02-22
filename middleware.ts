import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/api/(.*)',
  '/ref/(.*)',
  '(footer)',
  '/terms-of-service',
  '/privacy-policy',
  '/cookie-policy',
  '/how-it-works',
  '/faq',
  '(landing)',
  '/sso-callback',
  '/v1/oauth_callback',
  '/sitemap.xml',
  '/sitemap-0.xml',
  '/robots.txt',
]);

export default clerkMiddleware(async (auth, request) => {
  // Skip protection for public routes
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // Protect private routes
  await auth.protect();
  const user = await auth();

  // Redirect unauthenticated users to the homepage
  if (!user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
});

// Middleware configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/',
  ],
};
