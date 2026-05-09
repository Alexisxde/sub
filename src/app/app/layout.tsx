import Sidebar, { SidebarProvider } from "@/components/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<div className="flex gap-4 h-dvh">
				<Sidebar />
				<main className="flex-1 overflow-auto">{children}</main>
			</div>
		</SidebarProvider>
	)
}
