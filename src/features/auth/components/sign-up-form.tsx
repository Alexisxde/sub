"use client"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import type z from "zod"
import { userRegisterSchema } from "../schemas/register"
import { register } from "../services/auth"

type FormData = z.infer<typeof userRegisterSchema>

export default function SignUpForm() {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const {
		handleSubmit,
		formState: { isSubmitting, errors },
		control,
		setError
	} = useForm<FormData>({ resolver: zodResolver(userRegisterSchema) })

	const onSubmit: SubmitHandler<FormData> = async ({ name, email, password }) => {
		try {
			await register({ name, email, password })
			router.push("/app")
		} catch (_) {
			setError("root", { message: "Ocurrió un error inesperado. Inténtalo de nuevo." })
		}
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button ripple size="sm" variant="outline">
					<motion.span layoutId="form-header-sign-up">Crear cuenta</motion.span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="rounded-lg inset-0 w-full z-20 md:rounded-4xl md:top-32 md:left-10 md:h-fit md:w-md">
				<PopoverHeader>
					<motion.h2 layoutId="form-header-sign-up" className="text-2xl font-semibold">
						Crear cuenta
					</motion.h2>
				</PopoverHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" autoComplete="off" noValidate>
					<Controller
						name="name"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input {...field} type="text" placeholder="Jon Doe" label="Nombre" error={errors.name?.message} />
						)}
					/>
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
					<Controller
						name="confirmPassword"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input
								{...field}
								type="password"
								placeholder="********"
								label="Confirmar contraseña"
								error={errors.confirmPassword?.message}
							/>
						)}
					/>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? <Loader2Icon className="animate-spin size-4" /> : "Crear cuenta"}
					</Button>
				</form>
				{errors.root && <p className="text-sm text-destructive">{errors.root.message}</p>}
			</PopoverContent>
		</Popover>
	)
}
