"use client"
import Button from "@/components/ui/button"
import type { Subcription } from "@/features/subscription/suscription"
import { AnimatePresence, motion } from "motion/react"
import { useLayoutEffect, useRef, useState } from "react"

interface SubscriptionHoverCardProps {
	subscriptions: {
		sub: Subcription
		type: "start" | "end"
		amount: number
	}[]
	day: number
	mousePosition: { x: number; y: number }
	isVisible: boolean
	onMouseEnter?: () => void
	onMouseLeave?: () => void
}

export function SubscriptionHoverCard({
	subscriptions,
	day,
	mousePosition,
	isVisible,
	onMouseEnter,
	onMouseLeave
}: SubscriptionHoverCardProps) {
	const cardRef = useRef<HTMLDivElement>(null)
	const [coords, setCoords] = useState({ x: 0, y: 0 })
	const [activeDay, setActiveDay] = useState<number | null>(null)

	useLayoutEffect(() => {
		if (isVisible && cardRef.current) {
			const updatePosition = () => {
				if (!cardRef.current) return
				const rect = cardRef.current.getBoundingClientRect()
				const padding = 40
				const viewportWidth = window.innerWidth
				const viewportHeight = window.innerHeight

				let x = mousePosition.x + 15
				let y = mousePosition.y - 20
				if (x + rect.width > viewportWidth - padding) x = mousePosition.x - rect.width - 15
				if (x < padding) x = padding
				if (y + rect.height > viewportHeight - padding) y = viewportHeight - rect.height - padding
				if (y < padding) y = padding
				setCoords({ x, y })
				setActiveDay(day)
			}

			if (day !== activeDay) updatePosition()
		}
		if (!isVisible && activeDay !== null) setActiveDay(null)
	}, [isVisible, day, mousePosition.x, mousePosition.y, activeDay])

	return (
		<AnimatePresence>
			{isVisible && subscriptions.length > 0 && (
				<motion.div
					key={day}
					ref={cardRef}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					className="fixed z-20 rounded-xl shadow-2xl border bg-card overflow-hidden hidden sm:block min-w-70 max-w-[320px] pointer-events-auto"
					style={{
						left: coords.x,
						top: coords.y,
						maxHeight: "calc(100vh - 100px)"
					}}
					initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(8px)" }}
					animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
					exit={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(8px)" }}
					transition={{ type: "spring", stiffness: 350, damping: 25 }}>
					<div className="p-4 flex flex-col gap-2">
						<div className="flex items-center justify-between border-b border-border/50 pb-2">
							<span className="text-sm font-semibold text-foreground">Suscripciones del día {day}</span>
							<span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
								{subscriptions.length}
							</span>
						</div>
						<motion.div
							className="flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar"
							style={{ maxHeight: "300px", scrollbarGutter: "stable" }}
							initial="hidden"
							animate="visible"
							variants={{
								visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
							}}>
							{subscriptions.map((item, idx) => (
								<motion.div
									key={`${item.sub.id}-${idx}`}
									variants={{
										hidden: { opacity: 0, x: -10 },
										visible: { opacity: 1, x: 0 }
									}}
									className="flex items-center gap-3 p-1 group">
									<div
										className="size-8 flex items-center justify-center bg-muted rounded-lg p-1.5 [&_svg]:size-full"
										dangerouslySetInnerHTML={{ __html: item.sub.service.logo ?? "" }}
									/>
									<div className="flex flex-col flex-1">
										<span className="text-sm font-medium text-foreground truncate">{item.sub.service.name}</span>
										<div className="flex items-center gap-2">
											{item.type === "start" ? (
												<div className="size-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
											) : (
												<div className="size-2 rounded-full bg-destructive" />
											)}
											<span className="text-xs text-muted-foreground">
												{item.type === "start" ? "Subscripción" : "Expira"} • ${item.amount.toFixed(2)}
											</span>
										</div>
									</div>
									{item.type === "end" && (
										<Button variant="outline" size="sm" className="h-7 px-2 text-[10px] font-semibold tracking-tight">
											Renovar
										</Button>
									)}
								</motion.div>
							))}
						</motion.div>
						<div className="mt-1 pt-2 border-t border-border/50 flex justify-between text-muted-foreground items-center">
							<span className="text-sm font-medium text-right">Total</span>
							<span className="text-sm font-semibold">
								${subscriptions.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
							</span>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
