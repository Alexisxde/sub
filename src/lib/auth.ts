import { AUTH_SECRET } from "@/lib/config"
import db from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(db),
	secret: AUTH_SECRET,
	providers: [
		Credentials({
			credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
			async authorize(credentials) {
				if (!credentials || !credentials.email || !credentials.password) return null
				const { email, password } = credentials as { email: string; password: string }
				const user = await db.user.findUnique({
					where: { email },
					include: { avatar: true }
				})
				if (!user) throw new CredentialsSignin()
				const isMatch = await bcrypt.compare(password, user.password)
				if (!isMatch) throw new CredentialsSignin()

				return {
					id: user.id,
					email,
					role: user.role,
					name: user.name,
					image: user.avatar?.url ?? null
				}
			}
		})
	],
	session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
	pages: { signIn: "/", error: "/" },
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					id: user.id as string,
					role: user.role as string,
					email: user.email as string,
					image: user.image as string
				}
			}
			return token
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id
				session.user.name = token.name
				session.user.role = token.role
				session.user.email = token.email
				session.user.image = token.image as string
				session.error = token.error
			}
			return session
		},
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user
			const isProtectedRoute = nextUrl.pathname.startsWith("/app")
			if (isProtectedRoute && !isLoggedIn) return false
			return true
		}
	}
})
