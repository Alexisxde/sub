import Sidebar from "@/components/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className="flex gap-4 h-dvh">
			<Sidebar />
			<main className="flex-1 overflow-auto">{children}</main>
		</section>
	)
}
