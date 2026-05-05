import Button from "@/components/ui/button"
import SignInForm from "@/features/auth/components/sign-in-form"
import SignUpForm from "@/features/auth/components/sign-up-form"
import { auth } from "@/lib/auth"
import Link from "next/link"

export default async function Page() {
	const session = await auth()

	return (
		<section className="flex flex-1 h-dvh gap-4 p-4">
			<main className="grid w-full grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-4">
				<article className="flex flex-col gap-4 justify-between bg-card p-8 rounded-4xl">
					<div className="flex-1" />
					<div>
						<h1 className="text-5xl font-semibold">Subscriptions</h1>
						<p className="mt-4 text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
					</div>
					{session?.user ? (
						<Button ripple asChild className="w-fit">
							<Link href="/app">Ir a la app</Link>
						</Button>
					) : (
						<div className="flex gap-2">
							<SignInForm />
							<SignUpForm />
						</div>
					)}
				</article>
				<article className="bg-card p-8 rounded-4xl"></article>
				<article className="bg-card p-8 rounded-4xl"></article>
				<article className="bg-card p-8 rounded-4xl"></article>
			</main>
		</section>
	)
}
