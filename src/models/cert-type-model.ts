import { model, models, Schema, Model, Types } from "mongoose"

export interface ICertType {
    id: string
    title: string
}

const CertTypeSchema = new Schema<ICertType>(
    { title: String },
    {
        timestamps: false,
        collection: "cert_types",
        strict: true,
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (_doc: unknown, ret: ICertType & { _id: Types.ObjectId }) => {
                const { _id, ...rest } = ret
                return { ...rest, id: _id.toString() }
            },
        },
    }
)

export const CertType: Model<ICertType> =
    models.CertType || model("CertType", CertTypeSchema)
