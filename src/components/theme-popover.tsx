"use client"
import { usePalette } from "@/providers/palette-provider"
import { Palette } from "lucide-react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import Button from "./ui/button"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "./ui/popover"

export default function ThemePopover() {
	const { theme, setTheme } = useTheme()
	const { palette, setPalette } = usePalette()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size="xs" variant="ghost" className="bg-transparent border-0">
					<motion.span layoutId="theme" className="flex gap-1.5 items-center w-full font-medium">
						<Palette />
						Apariencia
					</motion.span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="z-30 rounded-4xl bottom-8 left-10 size-fit p-6">
				<PopoverHeader>
					<motion.h2 layoutId="theme" className="text-2xl font-medium flex gap-2 items-center">
						<Palette />
						Apariencia
					</motion.h2>
				</PopoverHeader>
				<div className="grid grid-cols-3 gap-4 p-6">
					<Button
						onClick={(e) => {
							e.stopPropagation
							setTheme("dark")
						}}
						className={`aspect-square size-16 rounded-full bg-[conic-gradient(black_0%_25%,#1a1a1a_25%_50%,#333333_50%_75%,#4d4d4d_75%_100%)] shadow-lg ${theme === "dark" && "border-2 border-muted rounded-xl"}`}
					/>
					<Button
						onClick={() => setTheme("light")}
						className={`aspect-square size-16 rounded-full bg-[conic-gradient(white_0%_25%,#f0f0f0_25%_50%,#d9d9d9_50%_75%,#bfbfbf_75%_100%)] shadow-lg ${theme === "light" && "border-2 border-muted rounded-xl"}`}
					/>
					<Button
						onClick={() => {
							if (palette !== "blue") setPalette("blue")
							else setPalette(null)
						}}
						className={`aspect-square size-16 rounded-full bg-[conic-gradient(#3b82f6_0%_25%,#60a5fa_25%_50%,#93c5fd_50%_75%,#bfdbfe_75%_100%)] shadow-lg ${palette === "blue" && "border-2 border-primary rounded-xl"}`}
					/>
					<Button
						onClick={() => {
							if (palette !== "green") setPalette("green")
							else setPalette(null)
						}}
						className={`aspect-square size-16 rounded-full bg-[conic-gradient(#22c55e_0%_25%,#4ade80_25%_50%,#86efac_50%_75%,#bbf7d0_75%_100%)] ${palette === "green" && "border-2 border-primary rounded-xl"}`}
					/>
					<Button
						onClick={() => {
							if (palette !== "violet") setPalette("violet")
							else setPalette(null)
						}}
						className={`aspect-square size-16 rounded-full bg-[conic-gradient(#a855f7_0%_25%,#c084fc_25%_50%,#d8b4fe_50%_75%,#ede9fe_75%_100%)] shadow-lg ${palette === "violet" && "border-2 border-primary rounded-xl"}`}
					/>
				</div>
			</PopoverContent>
		</Popover>
	)
}
