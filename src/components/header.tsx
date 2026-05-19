import Button from "@/components/ui/button"
import SignInForm from "@/features/auth/components/sign-in-form"
import SignUpForm from "@/features/auth/components/sign-up-form"
import { auth } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link"

export default async function Header() {
	const session = await auth()
	return (
		<header className="w-full flex items-center justify-between max-w-5xl px-8 mt-4">
			<Image width={24} height={24} src="/rocco.svg" alt="Rocco Logo" />
			<nav className="flex items-center gap-4">
				{session?.user ? (
					<Button ripple asChild className="rounded-2xl">
						<Link href="/app">Ir a la app</Link>
					</Button>
				) : (
					<div className="flex gap-2">
						<SignInForm />
						<SignUpForm />
					</div>
				)}
			</nav>
		</header>
	)
}
