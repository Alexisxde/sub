"use client"

import { EmptyState } from "@/components/empty-state"

export default function CategoriesPage() {
	return (
		<section className="relative min-h-dvh p-6 md:p-10 overflow-hidden">
			<EmptyState
				title="Categorías"
				description="Próximamente podrás personalizar las categorías de tus suscripciones."
			/>
		</section>
	)
}
