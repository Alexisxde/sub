"use client"
import { useState } from "react"
import { useSubscriptions } from "../../subscription/hooks/use-subscriptions"
import AnalyticsCardCategory from "./analytics-card-category"
import AnalyticsCardMonth from "./analytics-card-month"
import AnalyticsCardPayments from "./analytics-card-payments"
import AnalyticsCardServices from "./analytics-card-services"
import AnalyticsHeader from "./analytics-header"

export function AnalyticsDashboard() {
	const [currentDate, setCurrentDate] = useState(new Date())
	const month = currentDate.getMonth()
	const year = currentDate.getFullYear()
	useSubscriptions({ month: month + 1, year })
	const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
	const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

	return (
		<section className="h-dvh p-6 space-y-4">
			<AnalyticsHeader month={month} year={year} prevMonth={prevMonth} nextMonth={nextMonth} />
			<main className="flex flex-col gap-3">
				<section className="flex gap-3">
					<AnalyticsCardMonth />
					<AnalyticsCardPayments />
				</section>
				<section className="grid grid-cols-3 grid-rows-1 gap-3">
					<article className="rounded-4xl bg-card p-6 flex-1"></article>
					<AnalyticsCardServices />
					<AnalyticsCardCategory />
				</section>
			</main>
		</section>
	)
}
