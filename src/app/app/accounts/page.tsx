"use client"

import { EmptyState } from "@/components/empty-state"

export default function AccountsPage() {
	return (
		<section className="relative min-h-dvh p-6 md:p-10 overflow-hidden">
			<EmptyState
				title="Cuentas"
				description="Próximamente podrás gestionar tus diferentes cuentas bancarias y métodos de pago."
			/>
		</section>
	)
}
