import { GroupStudentService } from "@/src/services/group-student-service"
import { NextRequest, NextResponse } from "next/server"

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
    const { id } = await params
    const service = new GroupStudentService()
    const students = await service.getByGroup(id)
    return NextResponse.json(students)
}
