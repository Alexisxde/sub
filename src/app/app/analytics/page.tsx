"use client"
import { ReusablePieChart } from "@/components/ui/pie-chart"

const data = [
	{ name: "Streaming", value: 5, color: "#FF3B30" },
	{ name: "IA", value: 10, color: "#34C759" },
	{ name: "Otro", value: 14, color: "#007AFF" },
	{ name: "Software", value: 7, color: "#5856D6" }
]

export default function AnalyticsPage() {
	return (
		<section className="relative min-h-dvh p-6 md:p-10 overflow-hidden bg-background">
			<ReusablePieChart data={data} />
		</section>
	)
}
