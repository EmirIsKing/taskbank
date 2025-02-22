import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes
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
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // Protect private routes
  await auth.protect();
  const user = await auth();

  // Redirect unauthenticated users to homepage
  if (!user) {
    const signInUrl = new URL('/', request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// Catch-all matcher for all routes except static assets
export const config = {
  matcher: [
    '/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|css|js|json|txt|map|woff2?|ttf|eot)).*)', // Exclude static files
  ],
};
