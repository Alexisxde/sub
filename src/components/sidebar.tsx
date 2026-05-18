"use client"
import Button from "@/components/ui/button"
import { Dock, DockAnchor } from "@/components/ui/dock"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ChartLine, HomeIcon, Tag } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createContext, useContext, useState } from "react"
import LogOutPopover from "./log-out-popover"
import ThemePopover from "./theme-popover"

type SidebarMode = "sidebar" | "dock"

interface SidebarContextType {
	mode: SidebarMode
	setMode: (mode: SidebarMode) => void
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	toggleSidebar: () => void
	toggleMode: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState<SidebarMode>("sidebar")
	const [isOpen, setIsOpen] = useState(true)

	const toggleSidebar = () => setIsOpen((prev) => !prev)
	const toggleMode = () => setMode((prev) => (prev === "sidebar" ? "dock" : "sidebar"))

	return (
		<SidebarContext.Provider value={{ mode, setMode, isOpen, setIsOpen, toggleSidebar, toggleMode }}>
			{children}
		</SidebarContext.Provider>
	)
}

export function useSidebar() {
	const context = useContext(SidebarContext)
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider")
	}
	return context
}

const navItems = [
	{ href: "/app", icon: <HomeIcon className="size-4 md:size-full" />, title: "Inicio" },
	{ href: "/app/analytics", icon: <ChartLine className="size-4 md:size-full" />, title: "Estadisticas" },
	{ href: "/app/subscriptions", icon: <Tag className="size-4 md:size-full" />, title: "Suscripciones" }
]

export default function Sidebar() {
	const { mode } = useSidebar()
	const pathname = usePathname()

	if (mode === "dock") {
		return (
			<div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-1 hidden md:block">
				<Dock>
					{navItems.map((item) => (
						<DockAnchor key={item.href} {...item} />
					))}
				</Dock>
			</div>
		)
	}

	return (
		<motion.aside initial={false} className="z-2 md:flex h-dvh flex-col items-center py-8 hidden">
			<nav className="flex w-full flex-1 flex-col justify-center gap-2 px-3">
				{navItems.map((item) => (
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
