"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"

interface PieChartData {
	name: string
	value: number
	color: string
}

interface ReusablePieChartProps {
	data: PieChartData[]
	innerRadius?: number
	outerRadius?: number
	className?: string
}

const renderActiveShape = (props: any) => {
	const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props

	return (
		<g>
			<motion.text
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				x={cx}
				y={cy}
				dy={-8}
				textAnchor="middle"
				fill="currentColor"
				className="text-sm font-medium fill-muted-foreground">
				{payload.name}
			</motion.text>
			<motion.text
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				x={cx}
				y={cy}
				dy={20}
				textAnchor="middle"
				fill="currentColor"
				className="text-2xl font-bold fill-foreground">
				${value}
			</motion.text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius + 8}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
				cornerRadius={12}
				className="drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]"
			/>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius - 6}
				outerRadius={innerRadius - 2}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
				opacity={0.3}
				cornerRadius={4}
			/>
		</g>
	)
}

export function ReusablePieChart({ data, innerRadius = 70, outerRadius = 95, className }: ReusablePieChartProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const total = data.reduce((acc, curr) => acc + curr.value, 0).toFixed(2)

	return (
		<div className={cn("relative h-80 w-full", className)}>
			<AnimatePresence mode="wait">
				{activeIndex === null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
						<span className="text-sm font-medium text-muted-foreground">Total</span>
						<span className="text-3xl font-bold text-foreground">${total}</span>
					</motion.div>
				)}
			</AnimatePresence>

			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						activeIndex={activeIndex ?? undefined}
						activeShape={renderActiveShape}
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={innerRadius}
						outerRadius={outerRadius}
						paddingAngle={8}
						dataKey="value"
						stroke="none"
						cornerRadius={12}
						onMouseEnter={(_, index) => setActiveIndex(index)}
						onMouseLeave={() => setActiveIndex(null)}
						animationBegin={0}
						animationDuration={1000}
						animationEasing="ease-out">
						{data.map((entry, index) => (
							<Cell
								key={`cell-${entry.name}`}
								fill={entry.color}
								className="transition-all duration-500 outline-none hover:opacity-80 cursor-pointer"
								style={{
									filter: activeIndex === index ? `drop-shadow(0 0 12px ${entry.color}44)` : "none"
								}}
							/>
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}
