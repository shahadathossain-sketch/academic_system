import { Certificate, ICertificate } from "@/src/models/certificate-model"
import { connectMongoose } from "@/src/utils/mongoose-client"

export class CertificateService {
    async getCertificates(): Promise<ICertificate[]> {
        await connectMongoose()
        return await Certificate.find().sort({ company: 1 })
    }

    async saveCertificate(certificate: ICertificate): Promise<void> {
        await connectMongoose()
        await Certificate.create(certificate)
    }

    async updateCertificate(certificate: ICertificate): Promise<void> {
        await connectMongoose()
        await Certificate.updateOne(
            { _id: certificate.id },
            { $set: { typeId: certificate.typeId, company: certificate.company } }
        )
    }

    async deleteCertificate(id: string): Promise<void> {
        await connectMongoose()
        await Certificate.deleteOne({ _id: id })
    }
}
