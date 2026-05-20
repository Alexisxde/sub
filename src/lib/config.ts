import { z } from "zod"

const envSchema = z.object({
	DATABASE_URL: z.string(),
	NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
	NODE_ENV: z.string().default("production"),
	AUTH_SECRET: z.string()
})

const { error, success, data } = envSchema.safeParse(process.env)

if (!success) {
	// biome-ignore lint/suspicious/noConsole: Permitido para verificar las variables en el servidor.
	console.error("❌ Error en las variables de entorno: ", error.format())
	process.exit(1)
}

declare global {
	// biome-ignore lint/style/noNamespace: Permitido para verificar las variables en el servidor.
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}

export const { DATABASE_URL, NEXT_PUBLIC_APP_URL, NODE_ENV, AUTH_SECRET } = data
