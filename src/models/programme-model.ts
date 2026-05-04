import { model, models, Schema, Model, Types } from "mongoose"

interface IProgrammeDoc {
    title: string
    facultyId: Types.ObjectId
}

export interface IProgrammeModel {
    id: string
    title: string
    facultyId: string
}

const ProgrammeSchema = new Schema<IProgrammeDoc>(
    {
        title: String,
        facultyId: { type: Schema.Types.ObjectId },
    },
    {
        timestamps: false,
        collection: "programmes",
        strict: true,
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (
                _doc: unknown,
                ret: IProgrammeDoc & { _id: Types.ObjectId; id?: string }
            ): IProgrammeModel => {
                const { _id, facultyId, ...rest } = ret
                return { ...rest, id: _id.toString(), facultyId: facultyId.toString() }
            },
        },
    }
)

export const Programme: Model<IProgrammeDoc> =
    models.Programme || model<IProgrammeDoc>("Programme", ProgrammeSchema)
