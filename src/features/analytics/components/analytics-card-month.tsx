"use client"
import { Calendar1 } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const BUDGET = 300

const RAW_DATA = [
	{ day: 1, actual: 10 },
	{ day: 4, actual: 20 },
	{ day: 8, actual: 10 },
	{ day: 11, actual: 10 },
	{ day: 15, actual: 80 },
	{ day: 18, actual: 5 },
	{ day: 22, actual: 40 },
	{ day: 23, actual: 40 },
	{ day: 25, actual: 100 },
	{ day: 29, actual: 10 }
]

const data = RAW_DATA.map((d) => ({
	...d,
	target: Math.round((BUDGET / 30) * d.day * 100) / 100
}))

const MONTH = "May"

interface CustomTooltipProps {
	active?: boolean
	payload?: Array<{ value: number; name: string }>
	label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
	if (active && payload && payload.length) {
		const actual = payload.find((p) => p.name === "actual")
		if (!actual) return null

		return (
			<div className="flex items-center gap-1 rounded-lg bg-card px-3 py-2 shadow-md border border-border">
				<p className="text-xs font-medium text-muted-foreground">
					{MONTH} {label}:
				</p>
				<p className="text-xs font-semibold">${actual.value.toFixed(2)}</p>
			</div>
		)
	}
	return null
}

export default function AnalyticsCardMonth() {
	return (
		<article className="rounded-4xl bg-card p-6 space-y-3 flex-1 min-h-53 h-fit max-h-71">
			<header className="flex items-center gap-2">
				<Calendar1 className="size-5" />
				<h3 className="text-primary font-medium text-base">Gastos del Mes</h3>
			</header>
			<section className="h-32">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
						<defs>
							<linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.18} />
								<stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
						<XAxis
							dataKey="day"
							tickLine={false}
							axisLine={false}
							tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
							tickFormatter={(v) => `${MONTH} ${v}`}
							interval={0}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
							tickFormatter={(v) => `$${v}`}
							width={52}
						/>
						<Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border)", strokeWidth: 1 }} />
						<Area
							type="monotone"
							dataKey="actual"
							stroke="var(--chart-5)"
							strokeWidth={2.5}
							fill="url(#actualGrad)"
							dot={{ r: 4, fill: "var(--chart-3)", stroke: "var(--chart-3)", strokeWidth: 2 }}
							activeDot={{ r: 6, fill: "var(--chart-4)", stroke: "var(--chart-4)", strokeWidth: 2 }}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</section>
		</article>
	)
}
