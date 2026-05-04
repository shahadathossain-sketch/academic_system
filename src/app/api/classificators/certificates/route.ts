import { CertTypeService } from "@/src/services/cert-type-service"
import { NextResponse } from "next/server"

export async function GET() {
    const service = new CertTypeService()
    const certTypes = await service.getAll()
    return NextResponse.json(certTypes)
}
