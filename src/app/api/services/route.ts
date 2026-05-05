import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "@/utils/http-code"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const session = await auth()
	const userId = session?.user.id
	if (!userId) return NextResponse.json({ error: "No autorizado." }, { status: UNAUTHORIZED })
	try {
		const searchParams = request.nextUrl.searchParams
		const search = searchParams.get("search")
		const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(search || "")

		const services = await prisma.service.findMany({
			where: search
				? {
						OR: [{ name: { contains: search, mode: "insensitive" } }, ...(isUUID ? [{ id: search }] : [])]
					}
				: {},
			select: { id: true, name: true, logo: true },
			orderBy: { name: "asc" },
			take: search && !isUUID ? undefined : 5
		})
		return NextResponse.json(services, { status: OK })
	} catch (_) {
		return NextResponse.json({ error: "Internal Server Error" }, { status: INTERNAL_SERVER_ERROR })
	}
}
