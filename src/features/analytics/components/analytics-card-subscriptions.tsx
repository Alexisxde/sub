"use client"
import { useServices } from "@/features/service/hooks/use-services"

export default function AnalyticsCardSubscriptions() {
	const { data } = useServices()

	return (
		<div className="w-full max-w-sm flex flex-col gap-2.5">
			{data?.map((sub) => (
				<article key={sub.id} className="bg-card rounded-2xl p-3 flex flex-col gap-2 shadow-sm border">
					<div className="flex items-center gap-3">
						<div
							className="[&_svg]:size-6 flex items-center justify-center"
							dangerouslySetInnerHTML={{ __html: sub.logo || "" }}
						/>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-foreground leading-tight">{sub.name}</p>
							<p className="text-xs text-muted-foreground leading-tight">Premium 4k</p>
						</div>
						<div className="text-right shrink-0">
							<p className="text-sm font-semibold text-foreground leading-tight">$10.00</p>
							<p className="text-xs text-muted-foreground leading-tight">09 May</p>
						</div>
					</div>
				</article>
			))}
		</div>
	)
}
