import { CertificateService } from "@/src/services/certificate-service"
import { NextRequest, NextResponse } from "next/server"

const service = new CertificateService()

export async function GET() {
    const certificates = await service.getCertificates()
    return NextResponse.json(certificates)
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    await service.saveCertificate(body)
    return NextResponse.json({ success: true })
}
