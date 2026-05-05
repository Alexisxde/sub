"use client"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"
import type { MouseEvent } from "react"
import { cloneElement, isValidElement, memo, useCallback, useEffect, useState } from "react"

export const buttonVariants = cva(
	"relative flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-in-out [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 cursor-pointer focus:outline-none overflow-hidden active:scale-[0.97] leading-none",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
				outline:
					"border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
				ghost:
					"hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
				destructive:
					"bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
				link: "text-primary underline-offset-4 hover:underline"
			},
			size: {
				xs: "h-[40px] text-[12px] px-[12px] py-[12px] rounded-[20px] gap-1 [&_svg]:size-[14px]",
				sm: "h-[46px] text-[14px] px-[14px] py-[14px] rounded-[23px] gap-1 [&_svg]:size-[16px]",
				md: "h-[51px] text-[16px] px-[16px] py-[16px] rounded-[26px] gap-[5px] [&_svg]:size-[18px]",
				lg: "h-[58px] text-[18px] px-[18px] py-[18px] rounded-[29px] gap-[6px] [&_svg]:size-[20px]"
			},
			disabled: { true: "opacity-50 cursor-not-allowed" }
		},
		defaultVariants: {
			variant: "default",
			size: "md",
			disabled: false
		}
	}
)

export type ButtonProps = VariantProps<typeof buttonVariants> & {
	duration?: string
	asChild?: boolean
	ripple?: boolean
} & React.ComponentPropsWithRef<"button">

export const Button = memo(
	({
		className,
		children,
		duration = "600ms",
		onClick,
		variant,
		size,
		disabled = false,
		asChild = false,
		ripple = false,
		ref,
		...props
	}: ButtonProps) => {
		const [buttonRipples, setButtonRipples] = useState<Array<{ x: number; y: number; size: number; key: number }>>([])

		const createRipple = useCallback(
			(event: MouseEvent<HTMLElement>) => {
				if (!ripple) return
				const button = event.currentTarget
				const rect = button.getBoundingClientRect()
				const size = Math.max(rect.width, rect.height)
				const x = event.clientX - rect.left - size / 2
				const y = event.clientY - rect.top - size / 2

				const newRipple = { x, y, size, key: Date.now() }
				setButtonRipples((prevRipples) => [...prevRipples, newRipple])
			},
			[ripple]
		)

		useEffect(() => {
			if (buttonRipples.length > 0) {
				const lastRipple = buttonRipples[buttonRipples.length - 1]
				const timeout = setTimeout(() => {
					setButtonRipples((prevRipples) => prevRipples.filter((ripple) => ripple.key !== lastRipple.key))
				}, parseInt(duration))
				return () => clearTimeout(timeout)
			}
		}, [buttonRipples, duration])

		const ripples = ripple ? (
			<span className="pointer-events-none absolute inset-0">
				{buttonRipples.map((ripple) => (
					<motion.span
						className="animate-rippling bg-foreground/75 absolute rounded-full opacity-30"
						key={ripple.key}
						initial={{ transform: "scale(0)", opacity: 0.25, filter: "blur(0px)" }}
						animate={{ transform: "scale(1)", opacity: 0, filter: "blur(2px)" }}
						transition={{ duration: parseInt(duration) / 1000, ease: "easeOut" }}
						style={{
							width: `${ripple.size}px`,
							height: `${ripple.size}px`,
							top: `${ripple.y}px`,
							left: `${ripple.x}px`,
							transform: `scale(0)`
						}}
					/>
				))}
			</span>
		) : null

		const handleClick = useCallback(
			(event: MouseEvent<HTMLButtonElement>) => {
				createRipple(event)
				onClick?.(event)
			},
			[createRipple, onClick]
		)

		if (asChild && isValidElement(children)) {
			const childProps = children.props as any
			return cloneElement(children as React.ReactElement<any>, {
				className: cn(buttonVariants({ variant, size, disabled }), className, childProps.className),
				onClick: (e: MouseEvent<HTMLButtonElement>) => {
					createRipple(e)
					childProps.onClick?.(e)
					onClick?.(e)
				},
				children: (
					<>
						<div className="relative z-5 flex items-center justify-center gap-1.5">{childProps.children}</div>
						{ripples}
					</>
				),
				...props
			})
		}

		return (
			<button
				className={cn(buttonVariants({ variant, size, disabled }), className)}
				onClick={handleClick}
				disabled={disabled}
				ref={ref}
				{...props}>
				<div className="relative z-5 flex items-center justify-center gap-1.5 w-full">{children}</div>
				{ripples}
			</button>
		)
	}
)

export default Button
