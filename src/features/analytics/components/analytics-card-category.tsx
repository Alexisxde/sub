"use client"
import { BookMarked, Bot, Laptop, Monitor, Puzzle, Sparkles } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"

const data = [
	{ name: "Software", value: 5, pct: "50%", icon: Laptop },
	{ name: "Streaming", value: 2, pct: "20%", icon: Monitor },
	{ name: "Educación", value: 1, pct: "10%", icon: BookMarked },
	{ name: "IA", value: 1, pct: "10%", icon: Bot },
	{ name: "Otros", value: 1, pct: "10%", icon: Sparkles }
]

const total = data.reduce((s, d) => s + d.value, 0)

export default function AnalyticsCardCategory() {
	return (
		<article className="rounded-4xl bg-card p-6">
			<header className="flex items-center gap-2">
				<Puzzle className="size-5" />
				<h3 className="text-primary font-medium text-base">Categorías</h3>
			</header>
			<section className="relative flex w-full items-center justify-center">
				<PieChart width={250} height={130}>
					<Pie
						data={data}
						cx={120}
						cy={118}
						startAngle={180}
						endAngle={0}
						innerRadius={74}
						outerRadius={104}
						paddingAngle={3}
						dataKey="value"
						strokeWidth={0}
						cornerRadius={6}
						labelLine={false}>
						{data.map((_, index) => (
							<Cell key={`cell-${index}`} style={{ fill: `var(--chart-${index + 1})` }} stroke="transparent" />
						))}
					</Pie>
				</PieChart>
				<div className="absolute bottom-2 flex flex-col items-center">
					<span className="text-primary text-[32px] font-semibold leading-none tracking-tight">{total}</span>
					<span className="text-muted-foreground text-xs mt-0.5">Suscripciones</span>
				</div>
			</section>
			<footer className="mt-2 flex flex-col gap-3">
				{data.map((item, index) => {
					const Icon = item.icon
					return (
						<div key={item.name} className="flex items-center gap-2.5">
							<span
								className="size-2.5 rounded-full shrink-0"
								style={{ backgroundColor: `var(--chart-${index + 1})` }}
							/>
							<Icon size={16} className="text-muted-foreground shrink-0" />
							<span className="flex-1 text-gray-300 text-[13px]">{item.name}</span>
							<span className="text-gray-200 text-[13px] font-semibold tabular-nums border-r pr-4 border-border">
								{item.value.toLocaleString()}
							</span>
							<span className="text-muted-foreground text-[12px] tabular-nums w-7 text-right">{item.pct}</span>
						</div>
					)
				})}
			</footer>
		</article>
	)
}
