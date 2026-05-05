import Sidebar, { SidebarProvider } from "@/components/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<div className="flex min-h-screen bg-background text-foreground">
				<Sidebar />
				<main className="flex-1 overflow-auto md:pl-40">{children}</main>
			</div>
		</SidebarProvider>
	)
}
