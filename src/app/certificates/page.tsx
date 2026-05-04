import { Wrapper } from "@/src/components/certificates/wrapper"
import { CertTypeService } from "@/src/services/cert-type-service"

export default async function CertificatePage() {
    const service = new CertTypeService()
    const certTypes = await service.getAll()
    return (
        <div className="grid grid-flow-row gap-4">
            <h1 className="font-bold text-xl">Certificates</h1>
            <Wrapper certTypes={certTypes ?? []} />
        </div>
    )
}
