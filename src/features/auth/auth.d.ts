import type z from "zod"
import type { userLoginSchema } from "./schemas/login"
import type { userRegisterSchema } from "./schemas/register"

export type UserLoginData = z.infer<typeof userLoginSchema>
export type UserRegisterData = Omit<z.infer<typeof userRegisterSchema>, "confirmPassword">
