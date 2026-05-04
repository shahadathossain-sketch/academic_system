import { CertificateService } from "@/src/services/certificate-service"
import { NextRequest, NextResponse } from "next/server"

type Params = { params: Promise<{ certificateId: string }> }

const service = new CertificateService()

export async function PUT(request: NextRequest) {
    const body = await request.json()
    await service.updateCertificate(body)
    return NextResponse.json({ success: true })
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { certificateId } = await params
    await service.deleteCertificate(certificateId)
    return NextResponse.json({ success: true })
}
