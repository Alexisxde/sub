import SubscriptionCalendar from "@/features/subscription/components/subscription-calendar"
import { Suspense } from "react"

export default function Page() {
	return (
		<section className="h-dvh p-4 pb-8 md:p-8 md:pr-8">
			<Suspense>
				<SubscriptionCalendar />
			</Suspense>
		</section>
	)
}
