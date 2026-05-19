"use client"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { motion } from "motion/react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import type z from "zod"
import { userLoginSchema } from "../schemas/login"

type FormData = z.infer<typeof userLoginSchema>

export default function SignInForm() {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const {
		handleSubmit,
		formState: { isSubmitting, errors },
		control,
		setError
	} = useForm<FormData>({ resolver: zodResolver(userLoginSchema) })

	const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
		try {
			const res = await signIn("credentials", { email, password, redirect: false })
			if (!res?.error) {
				setError("root", { message: "Correo o contraseña incorrectos." })
				return
			}
			router.push("/app")
		} catch (_) {
			setError("root", { message: "Ocurrió un error inesperado. Inténtalo de nuevo." })
		}
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button ripple size="sm">
					<motion.span layoutId="form-header-login">Iniciar sesión</motion.span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="rounded-lg inset-0 w-full z-20 md:rounded-4xl md:top-12 md:left-[53%] md:h-fit md:w-md">
				<PopoverHeader>
					<motion.h2 layoutId="form-header-login" className="text-2xl font-semibold">
						Iniciar sesión
					</motion.h2>
				</PopoverHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" autoComplete="off" noValidate>
					<Controller
						name="email"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input
								{...field}
								type="email"
								placeholder="m@example.com"
								label="Correo electrónico"
								error={errors.email?.message}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input
								{...field}
								type="password"
								placeholder="********"
								label="Contraseña"
								error={errors.password?.message}
							/>
						)}
					/>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? <Loader2Icon className="animate-spin size-4" /> : "Iniciar sesión"}
					</Button>
				</form>
				{errors.root && <p className="text-sm text-destructive">{errors.root.message}</p>}
			</PopoverContent>
		</Popover>
	)
}
