import { auth } from "@/lib/auth"

export default auth(({ auth, nextUrl }) => {
	const isAuthenticated = !!auth
	const isProtectedRoute = nextUrl.pathname.startsWith("/app")
	const isAdminRoute = nextUrl.pathname.startsWith("/app/admin")
	if (!isAuthenticated && isProtectedRoute) return Response.redirect(new URL("/", nextUrl))
	if (isAuthenticated && !auth.user.isAdmin && isAdminRoute) return Response.redirect(new URL("/app", nextUrl))
})

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] }
