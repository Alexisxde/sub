import type { DefaultSession, Session as SessionType } from "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
	interface User {
		id?: string
		email?: string
		role?: string
		image?: string | null
	}

	interface Session extends SessionType {
		user: User & DefaultSession["user"]
		error?: string
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string
		email: string
		role: string
		image?: string | null
		error?: string
	}
}
