"use client"
import Button from "@/components/ui/button"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ChartLine, HomeIcon, LockKeyhole } from "lucide-react"
import { motion } from "motion/react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LogOutPopover from "./log-out-popover"
import ThemePopover from "./theme-popover"

const navItems = {
	user: [
		{ href: "/app", icon: <HomeIcon className="size-4 md:size-full" />, title: "Inicio" },
		{ href: "/app/analytics", icon: <ChartLine className="size-4 md:size-full" />, title: "Estadisticas" }
		// { href: "/app/subscriptions", icon: <Tag className="size-4 md:size-full" />, title: "Suscripciones" }
	],
	admin: [{ href: "/app/admin", icon: <LockKeyhole className="size-4 md:size-full" />, title: "Administración" }]
}

export default function Sidebar() {
	const { data: session } = useSession()
	const pathname = usePathname()

	return (
		<motion.aside initial={false} className="z-2 md:flex h-dvh flex-col items-center py-8 hidden">
			<nav className="flex w-full flex-1 flex-col justify-center gap-2 px-3">
				{navItems.user.map((item) => (
					<Link key={item.href} href={item.href} className="w-fit">
						<div
							className={cn(
								"flex items-center justify-center gap-1 rounded-4xl text-muted-foreground p-3 transition-all duration-200 ease-in-out hover:text-primary bg-muted/50 hover:bg-muted hover:opacity-100 transform hover:translate-x-2 hover:scale-105",
								{
									"bg-muted text-primary": pathname === item.href,
									"opacity-80": pathname !== item.href
								}
							)}>
							<span className="font-medium text-md tracking-tight">{item.title}</span>
						</div>
					</Link>
				))}
				{session?.user?.isAdmin &&
					navItems.admin.map((item) => (
						<Link key={item.href} href={item.href} className="w-fit">
							<div
								className={cn(
									"flex items-center justify-center gap-1 rounded-4xl text-muted-foreground p-3 transition-all duration-200 ease-in-out hover:text-primary bg-muted/50 hover:bg-muted hover:opacity-100 transform hover:translate-x-2 hover:scale-105",
									{
										"bg-muted text-primary": pathname === item.href,
										"opacity-80": pathname !== item.href
									}
								)}>
								<span className="font-medium text-md tracking-tight">{item.title}</span>
							</div>
						</Link>
					))}
			</nav>
			<footer className="mt-auto w-full px-4 flex flex-col gap-2">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							ripple
							size="sm"
							variant="secondary"
							className="text-muted-foreground bg-muted/50 hover:bg-muted hover:text-primary transform hover:translate-x-2 hover:scale-105 transition-all duration-200 ease-in-out">
							<motion.span layoutId="settings">Opciones</motion.span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="z-20 rounded-4xl bottom-4 left-6 h-fit w-fit p-6">
						<PopoverHeader className="p-2" closeButton={false}>
							<motion.h2 layoutId="settings" className="text-2xl font-medium">
								Opciones
							</motion.h2>
						</PopoverHeader>
						<div className="flex flex-col gap-1">
							<ThemePopover />
							<LogOutPopover />
						</div>
					</PopoverContent>
				</Popover>
			</footer>
		</motion.aside>
	)
}
