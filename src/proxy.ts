import { auth } from "@/lib/auth"

export default auth(({ auth, nextUrl }) => {
	const isAuthenticated = !!auth
	const isAuthPage = nextUrl.pathname.startsWith("/login")
	const isProtectedRoute = nextUrl.pathname.startsWith("/app")
	if (isAuthenticated && isAuthPage) return Response.redirect(new URL("/app", nextUrl))
	if (!isAuthenticated && isProtectedRoute) return Response.redirect(new URL("/login", nextUrl))
})

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] }
