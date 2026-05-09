import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from "@/utils/http-code"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth()
	const userId = session?.user.id
	if (!userId) return NextResponse.json({ error: "No autorizado." }, { status: UNAUTHORIZED })

	try {
		const { id } = await params

		const subscription = await prisma.subscription.findUnique({
			where: { id, userId },
			include: {
				service: true,
				category: true,
				history: {
					include: {
						paymentMethod: true
					},
					orderBy: {
						startDate: "desc"
					}
				}
			}
		})

		if (!subscription) {
			return NextResponse.json({ error: "Suscripción no encontrada." }, { status: NOT_FOUND })
		}

		return NextResponse.json(subscription, { status: OK })
	} catch (error) {
		console.error("Error fetching subscription:", error)
		return NextResponse.json({ error: "Internal Server Error" }, { status: INTERNAL_SERVER_ERROR })
	}
}

export async function DELETE(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth()
	const userId = session?.user.id
	if (!userId) return NextResponse.json({ error: "No autorizado." }, { status: UNAUTHORIZED })

	try {
		const { id } = await params

		// Verify ownership before deletion
		const subscription = await prisma.subscription.findUnique({
			where: { id, userId }
		})

		if (!subscription) {
			return NextResponse.json({ error: "Suscripción no encontrada." }, { status: NOT_FOUND })
		}

		// Delete history first if needed (depending on onDelete configuration)
		// Based on schema NoAction, we might need to handle this
		await prisma.historySubscription.deleteMany({
			where: { subscriptionId: id }
		})

		await prisma.subscription.delete({
			where: { id }
		})

		return NextResponse.json({ message: "Suscripción eliminada." }, { status: OK })
	} catch (error) {
		console.error("Error deleting subscription:", error)
		return NextResponse.json({ error: "Internal Server Error" }, { status: INTERNAL_SERVER_ERROR })
	}
}
