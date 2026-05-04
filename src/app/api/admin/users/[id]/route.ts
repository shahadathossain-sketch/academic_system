import { UserService } from "@/src/services/user-service"
import { auth } from "@/src/utils/auth"
import { Role } from "@/src/constants/role"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

type Params = { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, { params }: Params) {
    const session = await auth.api.getSession({ headers: await headers() })
    const role = (session?.user as { role?: string } | undefined)?.role

    if (!session || role !== Role.Administrator) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const newRole: string = body.role

    if (!Object.values(Role).includes(newRole as Role)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const service = new UserService()
    await service.updateRole(id, newRole)

    return NextResponse.json({ success: true })
}
