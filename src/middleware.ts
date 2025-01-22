import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

export default clerkMiddleware(async (auth, req, next) => {
    const protectedRoutes = createRouteMatcher([
      '/dashboard',
      '/dashboard/(.*)'
    ])
    if (protectedRoutes(req)) await auth.protect()
});
	
	export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  };