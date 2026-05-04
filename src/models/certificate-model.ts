import { model, models, Schema, Model, Types } from "mongoose"
import { ICertType } from "@/src/models/cert-type-model"

export interface ICertificate {
    id?: string
    typeId: string
    company: string
    isCreated?: boolean
}

export interface ICertificateWithType extends ICertificate {
    certType: ICertType
}

const CertificateSchema = new Schema<ICertificate>(
    {
        typeId: String,
        company: String,
        isCreated: Boolean,
    },
    {
        timestamps: false,
        collection: "certificates",
        strict: true,
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (_doc: unknown, ret: ICertificate & { _id: Types.ObjectId }) => {
                const { _id, ...rest } = ret
                return { ...rest, id: _id.toString() }
            },
        },
    }
)

export const Certificate: Model<ICertificate> =
    models.Certificate || model("Certificate", CertificateSchema)
