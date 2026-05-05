import z from "zod"

export const subscriptionSchema = z.object({
	serviceId: z.string().min(1, "Seleccione un servicio."),
	amount: z.coerce.number().positive({ message: "El monto debe ser un número mayor a 0." }),
	categoryId: z.string().min(1, "Seleccione una categoría."),
	startDate: z.string().min(1, "Seleccione una fecha."),
	period: z.enum(["month", "year"], { error: "Seleccione un periodo." }),
	notification: z.boolean().default(false),
	paymentMethodId: z.string().min(1, "Seleccione un método de pago."),
	note: z.string().optional()
})

export type SubscriptionFormValues = z.infer<typeof subscriptionSchema>
