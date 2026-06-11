"use client"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/components/ui/popover"
import LogOutPopover from "@/features/auth/components/log-out-popover"
import SubscriptionCreatePopover from "@/features/subscription/components/subscription-create-popover"
import { useIsMobile } from "@/hooks/use-mobile"
import { ChartLine, HomeIcon, LockKeyhole, Settings } from "lucide-react"
import { motion } from "motion/react"
import { useSession } from "next-auth/react"
import ThemePopover from "./theme-popover"
import { Menu, MenuButton, MenuContent, MenuLink } from "./ui/menu"
import { Sidebar, SidebarButton, SidebarContent, SidebarFooter, SidebarLink } from "./ui/sidebar"

const navItems = {
	user: [
		{ href: "/app", icon: <HomeIcon className="size-4 md:size-full" />, title: "Inicio" },
		{ href: "/app/analytics", icon: <ChartLine className="size-4 md:size-full" />, title: "Estadisticas" }
	],
	admin: [{ href: "/app/admin", icon: <LockKeyhole className="size-4 md:size-full" />, title: "Administración" }]
}

export default function Navigation() {
	const isMobile = useIsMobile()
	const { data: session } = useSession()

	if (isMobile)
		return (
			<Menu>
				<MenuContent>
					{navItems.user.map((item) => (
						<MenuLink key={item.href} href={item.href} title={item.title} icon={item.icon} />
					))}
					{session?.user?.isAdmin &&
						navItems.admin.map((item) => (
							<MenuLink key={item.href} href={item.href} title={item.title} icon={item.icon} />
						))}
					<Popover>
						<PopoverTrigger asChild>
							<MenuButton title="Opciones" icon={<Settings className="size-4 md:size-full" />} className="size-10" />
						</PopoverTrigger>
						<PopoverContent className="z-2 rounded-4xl bottom-4 right-4 size-fit p-6">
							<PopoverHeader className="p-2" closeButton={false}>
								<motion.h2 layoutId="settings-mobile" className="text-2xl font-medium">
									Opciones
								</motion.h2>
							</PopoverHeader>
							<div className="flex flex-col gap-1">
								<ThemePopover />
								<LogOutPopover />
							</div>
						</PopoverContent>
					</Popover>
					<SubscriptionCreatePopover />
				</MenuContent>
			</Menu>
		)

	return (
		<Sidebar>
			<SidebarContent>
				{navItems.user.map((item) => (
					<SidebarLink key={item.href} href={item.href} title={item.title} />
				))}
				{session?.user?.isAdmin &&
					navItems.admin.map((item) => <SidebarLink key={item.href} href={item.href} title={item.title} />)}
			</SidebarContent>
			<SidebarFooter>
				<Popover>
					<PopoverTrigger asChild>
						<SidebarButton title="Opciones" />
					</PopoverTrigger>
					<PopoverContent className="z-10 rounded-4xl bottom-4 left-6 h-fit w-fit p-6">
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
			</SidebarFooter>
		</Sidebar>
	)
}
