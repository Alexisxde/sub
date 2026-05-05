"use client"
import { PanelLeftDashed } from "lucide-react"
import { motion } from "motion/react"
import Button from "./ui/button"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "./ui/popover"

export default function NavegationPopover() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size="xs" variant="ghost" className="bg-transparent border-0">
					<motion.span layoutId="navigation" className="flex gap-1.5 items-center w-full font-medium">
						<PanelLeftDashed />
						Navegación
					</motion.span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="z-30 rounded-4xl bottom-8 left-10 h-fit w-fit p-6">
				<PopoverHeader>
					<motion.h2 layoutId="navigation" className="text-2xl font-medium flex gap-2 items-center">
						<PanelLeftDashed />
						Navegación
					</motion.h2>
				</PopoverHeader>
				<div className="grid grid-cols-3 gap-4 p-6 w-64">Test</div>
			</PopoverContent>
		</Popover>
	)
}
