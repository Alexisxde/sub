"use client"

import Button from "@/components/ui/button"
import { TextAnimate } from "@/components/ui/text-animate"
import SubscriptionCreatePopover from "@/features/subscription/components/subscription-create-popover"
import { ChevronLeft, ChevronRight } from "lucide-react"

const MONTHS = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre"
]

type Props = {
	month: number
	year: number
	prevMonth: () => void
	nextMonth: () => void
}

export default function AnalyticsHeader({ month, year, prevMonth, nextMonth }: Props) {
	return (
		<header className="relative flex flex-col items-center gap-1 px-3 mb-4">
			<div className="absolute w-full flex items-center justify-end">
				<SubscriptionCreatePopover />
			</div>
			<h2 className="text-muted-foreground text-base font-medium tracking-tight">Estadísticas</h2>
			<div className="flex items-center gap-4">
				<Button ripple type="button" onClick={prevMonth} variant="outline" className="size-12 rounded-full">
					<ChevronLeft className="size-6" />
				</Button>
				<div className="min-w-70 text-center">
					<TextAnimate
						className="text-5xl md:text-6xl text-primary font-semibold"
						duration={0.3}
						getDelay={(i) => i * 0.02}
						transition={{ ease: [0.175, 0.885, 0.32, 1.1] }}>
						{`${MONTHS[month]}, ${year}`}
					</TextAnimate>
				</div>
				<Button ripple type="button" onClick={nextMonth} variant="outline" className="size-12 rounded-full">
					<ChevronRight className="size-6" />
				</Button>
			</div>
		</header>
	)
}
