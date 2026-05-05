import Button from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SubscriptionCreatePopover from "./subscription-create-popover"
import SubscriptionTotal from "./subscription-total"

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
	total: string
	month: number
	year: number
	prevMonth: () => void
	nextMonth: () => void
}

export default function HeaderCalendar({ month, year, total, prevMonth, nextMonth }: Props) {
	return (
		<header className="flex flex-col items-center gap-1 px-3 mb-2">
			<div className="w-full flex items-center justify-end">
				<SubscriptionCreatePopover />
			</div>
			<h2 className="text-muted-foreground text-base font-medium tracking-tight">
				{MONTHS[month]}, {year}
			</h2>
			<div className="flex items-center gap-4">
				<Button ripple type="button" onClick={prevMonth} variant="outline">
					<ChevronLeft className="size-6" />
				</Button>
				<SubscriptionTotal total={total} />
				<Button ripple type="button" onClick={nextMonth} variant="outline">
					<ChevronRight className="size-6" />
				</Button>
			</div>
		</header>
	)
}
