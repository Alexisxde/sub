"use client"

import { Construction } from "lucide-react"
import { motion } from "motion/react"

interface EmptyStateProps {
	title: string
	description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col items-center gap-4">
				<div className="p-4 rounded-full bg-muted">
					<Construction className="w-12 h-12 text-muted-foreground" />
				</div>
				<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
				{description && <p className="text-muted-foreground max-w-100">{description}</p>}
			</motion.div>
		</div>
	)
}
