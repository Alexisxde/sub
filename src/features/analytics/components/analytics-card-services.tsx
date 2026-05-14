"use client"
import { monthStringShort } from "@/utils/month-string"
import { Receipt } from "lucide-react"
import { motion } from "motion/react"
import { useAnalyticsSubscriptions } from "../hooks/use-analytics-subscriptions"
import { CardEmptyState } from "./analytics-card-empty"

type Props = { month: number; year: number }

export default function AnalyticsCardServices({ month, year }: Props) {
	const { data = [], isLoading } = useAnalyticsSubscriptions({ month, year })

	if (isLoading) return <article className="rounded-4xl bg-card p-6 min-h-64 animate-pulse" />

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
			{data.length === 0 ? (
				<CardEmptyState />
			) : (
				<>
					<section className="flex flex-col gap-2 divide-y divide-border overflow-hidden">
						{data.slice(0, 5).map(({ id, name, logo, amount, period, startDate, endDate }) => (
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
