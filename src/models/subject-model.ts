import { model, models, Schema, Model, Types } from "mongoose"

export interface ISubjectModel {
    id: string
    title: string
}

const SubjectSchema = new Schema<ISubjectModel>(
    { title: String },
    {
        timestamps: false,
        collection: "subjects",
        strict: true,
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (_doc: unknown, ret: ISubjectModel & { _id: Types.ObjectId }) => {
                const { _id, ...rest } = ret
                return { ...rest, id: _id.toString() }
            },
        },
    }
)

export const Subject: Model<ISubjectModel> =
    models.Subject || model("Subject", SubjectSchema)
