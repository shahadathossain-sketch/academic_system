import { CertType, ICertType } from "@/src/models/cert-type-model"
import { connectMongoose } from "@/src/utils/mongoose-client"

export class CertTypeService {
    async getAll(): Promise<ICertType[]> {
        await connectMongoose()
        const docs = await CertType.find()
        return docs.map((d) => d.toJSON() as ICertType)
    }
}
