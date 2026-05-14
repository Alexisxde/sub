"use client"
import { monthStringShort } from "@/utils/month-string"
import { Plus, Receipt } from "lucide-react"
import { motion } from "motion/react"
import { useAnalyticsSubscriptions } from "../hooks/use-analytics-subscriptions"

type Props = { month: number; year: number }

export default function AnalyticsCardServices({ month, year }: Props) {
	const { data, isLoading } = useAnalyticsSubscriptions({ month, year })

	if (isLoading) return null

	return (
		<motion.article
			initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			transition={{ duration: 0.3, delayChildren: 0.2, staggerChildren: 0.1 }}
			className="flex flex-col rounded-4xl bg-card p-6 space-y-4 flex-1">
			<header className="flex items-center gap-2">
				<Receipt className="size-5" />
				<h3 className="text-primary font-medium text-base">Suscripciones</h3>
			</header>
			{!data || data.length === 0 ? (
				<section className="flex flex-col flex-1 items-center justify-center size-full p-6 text-center gap-3">
					<div className="p-4 rounded-full bg-muted">
						<Receipt className="size-7 text-muted-foreground" />
					</div>
					<h3 className="text-base font-semibold text-foreground">No hay suscripciones</h3>
					<p className="text-sm text-muted-foreground w-full">
						Actualmente no tenés ninguna suscripción. Podés agregar una nueva en el botón{" "}
						<span className="inline-flex ml-0.5 items-center justify-center p-0.75 bg-primary text-primary-foreground rounded-full">
							<Plus className="size-3" />
						</span>
						.
					</p>
				</section>
			) : (
				<>
					<section className="flex flex-col gap-2 divide-y divide-border overflow-hidden">
						{data.map(({ id, name, logo, amount, period, startDate, endDate }) => (
							<div key={id} className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
								<div
									className="[&_svg]:size-5 flex items-center justify-center"
									dangerouslySetInnerHTML={{ __html: logo || "" }}
								/>
								<div className="flex flex-col gap-1 w-full">
									<span className="text-sm font-medium leading-none text-foreground">{name}</span>
									<span className="text-xs text-muted-foreground">
										{new Date(startDate).getUTCDate()} {monthStringShort(new Date(startDate).getUTCMonth())} -{" "}
										{new Date(endDate).getUTCDate()} {monthStringShort(new Date(endDate).getUTCMonth())}
									</span>
								</div>
								<span className="w-28 text-right text-sm text-muted-foreground pr-2">
									${amount.toFixed(2)}/{period === "month" ? "mes" : "año"}
								</span>
							</div>
						))}
					</section>
					{data.length > 5 && (
						<footer className="text-center text-[11px] text-muted-foreground -mt-2 underline">
							+{data.length - 5} más
						</footer>
					)}
				</>
			)}
		</motion.article>
	)
}
