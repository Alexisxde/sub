import type { Service } from "@/features/service/service"
import type z from "zod"
import type { subscriptionSchema } from "./schemas/subscription"

export type SubscriptionPeriod = "month" | "year"

export type PaymentMethod = {
	id: string
	name: string
	cardNumber?: string
	createdAt: string
	isDeleted: boolean
}

export type Category = {
	id: string
	name: string
}

export type SubcriptionHistory = {
	id: string
	amount: number
	period: SubscriptionPeriod
	note?: string
	startDate: string
	endDate: string
}

export type Subcription = {
	id: string
	notificationSent: boolean
	history: SubcriptionHistory[]
	service: Service
	category: Category
}

export type CreateSubcription = z.infer<typeof subscriptionSchema>
