import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/api/(.*)", 
  "/ref/(.*)", 
  "(footer)", 
  "/terms-of-service", 
  "/privacy-policy", 
  "/cookie-policy", 
  "/how-it-works", 
  "/faq", 
  "(landing)", 
  "/sso-callback", 
  "/v1/oauth_callback", 
  "/sitemap.xml", 
  "/sitemap-0.xml", 
  "/robots.txt"
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect(); // ✅ This automatically handles unauthenticated users.
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/",
  ],
};
