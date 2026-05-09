import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "@/utils/http-code"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(_request: NextRequest) {
	const session = await auth()
	const userId = session?.user.id
	if (!userId) return NextResponse.json({ error: "No autorizado." }, { status: UNAUTHORIZED })
	try {
		const categories = await prisma.category.findMany({
			where: {
				OR: [{ userId: null }, { userId }],
				isDeleted: false
			},
			select: { id: true, name: true },
			orderBy: { name: "asc" }
		})
		return NextResponse.json(categories, { status: OK })
	} catch (_) {
		return NextResponse.json({ error: "Internal Server Error" }, { status: INTERNAL_SERVER_ERROR })
	}
}
