import Header from "@/components/header"
import Hero from "@/components/hero"

export default async function Page() {
	return (
		<section className="flex flex-col items-center justify-center p-6">
			<div className="absolute inset-0 -z-10 h-full w-full">
				<div className="absolute inset-0 bg-linear-to-b from-primary/10 via-background to-card" />
				<div className="absolute left-1/2 top-0 h-125 w-full -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
			</div>
			<Header />
			<Hero />
		</section>
	)
}
