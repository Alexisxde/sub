import z from "zod"

export const userBaseSchema = z.object({
	email: z.email(),
	name: z.string().min(1),
	password: z.string().min(8),
	confirmPassword: z.string().min(8)
})

export const userRegisterSchema = userBaseSchema.refine((data) => data.password === data.confirmPassword, {
	message: "Las contraseñas no coinciden.",
	path: ["confirmPassword"]
})

export const userCreateSchema = userBaseSchema.pick({ name: true, email: true, password: true })
