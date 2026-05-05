"use client"
import Button from "@/components/ui/button"
import { Calendar, CalendarContent, CalendarMessageError, CalendarTrigger } from "@/components/ui/calendar-input"
import Input from "@/components/ui/input"
import SearchInput from "@/components/ui/search-input"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectMessageError,
	SelectTrigger
} from "@/components/ui/select"
import Textarea from "@/components/ui/textarea"
import { useServices } from "@/features/service/hooks/use-services"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import useCreateSubscription from "../hooks/use-create-subscription"
import { subscriptionSchema, type SubscriptionFormValues } from "../schemas/subscription"

type Props = {
	onOpenChange: (open: boolean) => void
}

const values = [
	{ id: "7a071748-5872-4e13-b819-7dbfae516d10", name: "Streaming" },
	{ id: "bcfd860b-4ed5-4ada-b718-ae0ff44aee7c", name: "IA" },
	{ id: "7b6f6877-a88c-4f26-a441-066b53755416", name: "Software" },
	{ id: "94bd74e9-2a10-4e82-a6f7-26da3527581f", name: "Otro" }
]

const period = [
	{ id: "month", name: "Mes" },
	{ id: "year", name: "Año" }
]

export default function SubscriptionForm({ onOpenChange }: Props) {
	const { mutateAsync } = useCreateSubscription()
	const {
		handleSubmit,
		reset,
		setError,
		formState: { isSubmitting, errors },
		control,
		watch
	} = useForm<SubscriptionFormValues>({
		resolver: zodResolver(subscriptionSchema),
		defaultValues: {
			serviceId: "",
			amount: undefined,
			categoryId: "",
			startDate: "",
			period: undefined,
			notification: false,
			paymentMethodId: "00a8ad90-0e87-4c1f-b6e5-052ad1189932",
			note: ""
		}
	})

	const serviceValue = watch("serviceId")
	const { data: services = [] } = useServices(serviceValue)

	const onSubmit: SubmitHandler<SubscriptionFormValues> = async (data) => {
		try {
			const isValidService = services.some((s) => s.id === data.serviceId)
			if (!isValidService) return setError("serviceId", { message: "Debes seleccionar un servicio de la lista." })
			await mutateAsync(data)
			onOpenChange(false)
			reset()
		} catch (_) {}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
			<Controller
				name="serviceId"
				control={control}
				defaultValue=""
				render={({ field }) => (
					<SearchInput
						{...field}
						data={services}
						label="Suscripción"
						placeholder="Netflix, Spotify, AWS..."
						error={errors.serviceId?.message}
					/>
				)}
			/>
			<Controller
				name="amount"
				control={control}
				defaultValue=""
				render={({ field }) => <Input {...field} label="Monto" placeholder="0.00" error={errors.amount?.message} />}
			/>
			<Controller
				name="startDate"
				control={control}
				render={({ field }) => (
					<Calendar
						value={field.value ? new Date(`${field.value}T00:00:00`) : undefined}
						onValueChange={(date) => {
							if (!date) return field.onChange("")
							const year = date.getFullYear()
							const month = String(date.getMonth() + 1).padStart(2, "0")
							const day = String(date.getDate()).padStart(2, "0")
							field.onChange(`${year}-${month}-${day}`)
						}}>
						<CalendarTrigger label="Fecha" error={!!errors.startDate?.message} />
						<CalendarContent />
						<CalendarMessageError message={errors.startDate?.message} />
					</Calendar>
				)}
			/>
			<div className="flex items-start space-x-4">
				<Controller
					name="categoryId"
					control={control}
					render={({ field }) => (
						<Select value={field.value} onValueChange={field.onChange}>
							<SelectTrigger className="w-48" label="Categoría" error={!!errors.categoryId?.message} />
							<SelectMessageError message={errors.categoryId?.message} />
							<SelectContent>
								<SelectGroup>
									{values.map(({ id, name }) => (
										<SelectItem key={id} value={id}>
											{name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					)}
				/>
				<Controller
					name="period"
					control={control}
					render={({ field }) => (
						<Select value={field.value} onValueChange={field.onChange}>
							<SelectTrigger className="w-44" label="Período" error={!!errors.period?.message} />
							<SelectMessageError message={errors.period?.message} />
							<SelectContent>
								<SelectGroup>
									{period.map(({ id, name }) => (
										<SelectItem key={id} value={id}>
											{name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					)}
				/>
			</div>
			<Controller name="note" control={control} render={({ field }) => <Textarea {...field} label="Observación" />} />
			<footer className="flex items-center gap-2 justify-end">
				<Button ripple type="button" variant="secondary" disabled={isSubmitting} onClick={() => onOpenChange(false)}>
					Cancelar
				</Button>
				<Button ripple type="submit" disabled={isSubmitting}>
					{isSubmitting ? <Loader2Icon className="animate-spin size-4" /> : "Guardar"}
				</Button>
			</footer>
		</form>
	)
}
