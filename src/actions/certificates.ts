"use server"

import { IState } from "@/src/types/shared-t"
import { CertificateService } from "@/src/services/certificate-service"
import z from "zod"

const certSchema = z.object({
    id: z.coerce.string().optional(),
    typeId: z.coerce.string().min(1, "Certificate type is required"),
    company: z.string().min(2, "Company must be at least 2 characters"),
})

export async function createCertificates(
    prevState: IState,
    formData: FormData
): Promise<IState> {
    const data = Object.fromEntries(formData)
    const result = certSchema.safeParse(data)

    if (!result.success) {
        return { isSaved: false, errors: result.error.flatten().fieldErrors }
    }

    const { id, typeId, company } = result.data
    const service = new CertificateService()

    if (!id) {
        await service.saveCertificate({ typeId, company, isCreated: true })
    } else {
        await service.updateCertificate({ id, typeId, company })
    }

    return { isSaved: true, message: "Saved successfully" }
}
