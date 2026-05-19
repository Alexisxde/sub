export default function Hero() {
	return (
		<section className="flex flex-col text-center items-center justify-center pt-12 max-w-3xl space-x-4 px-4 mx-auto">
			<h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
				Gestiona tus suscripciones de forma sencilla
				<span className="block text-muted-foreground text-2xl my-2 sm:text-3xl">
					Controla tus gastos y ahorrá dinero
				</span>
			</h1>
			<p className="max-w-xl text-base text-muted-foreground sm:text-lg">
				Adios a las sorpresas en tu cuenta bancaria. Recibirás recordatorios de pago. Simplifica tu vida financiera y
				mantén el control de tus gastos con nuestra plataforma fácil de usar.
			</p>
		</section>
	)
}
