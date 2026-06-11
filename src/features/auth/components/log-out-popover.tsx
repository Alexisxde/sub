"use client"
import Button from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/lib/sileo"
import { LogOut } from "lucide-react"
import { motion } from "motion/react"
import { signOut } from "next-auth/react"
import { useState } from "react"

export default function LogOutPopover() {
	const [isOpen, setIsOpen] = useState(false)

	const handleSignOut = () => {
		signOut({ callbackUrl: "/" })
		setIsOpen(false)
		toast({ title: "Sesión cerrada", description: "Has cerrado tu sesión correctamente.", type: "success" })
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button size="xs" variant="ghost" className="bg-transparent border-0">
					<motion.span className="flex gap-1.5 items-center w-full font-medium">
						<LogOut />
						Cerrar sesión
					</motion.span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="z-30 rounded-3xl p-6 w-72 bottom-4 left-8 shadow-2xl border border-border bg-card">
				<div className="flex flex-col gap-4 p-2">
					<h3 className="text-xl font-medium tracking-tight">¿Cerrar sesión?</h3>
					<p className="text-sm text-muted-foreground">¿Estás seguro de que deseas salir de tu cuenta?</p>
					<div className="flex gap-2 justify-end mt-4">
						<Button
							ripple
							size="sm"
							variant="secondary"
							onClick={() => setIsOpen(false)}
							className="h-9 px-4 rounded-full">
							Cancelar
						</Button>
						<Button ripple size="sm" variant="destructive" onClick={handleSignOut} className="h-9 px-4 rounded-full">
							Cerrar sesión
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
