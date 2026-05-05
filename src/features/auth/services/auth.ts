import api from "@/lib/axios"
import type { UserRegisterData } from "../auth"

export async function register({ name, email, password }: UserRegisterData) {
	const res = await api.post("/api/auth/register", { name, email, password })
	return res.data
}
