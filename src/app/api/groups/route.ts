import { GroupService } from "@/src/services/group-service"
import { NextResponse } from "next/server"

export async function GET() {
    const service = new GroupService()
    const groups = await service.getAll()
    return NextResponse.json(groups)
}
