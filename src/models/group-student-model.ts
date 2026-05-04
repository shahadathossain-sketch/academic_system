import { model, models, Schema, Model, Types } from "mongoose"

// Schema-level document type (raw MongoDB types)
interface IGroupStudentDoc {
    firstName: string
    lastName: string
    groupId: Types.ObjectId
}

// API-level output type (after toJSON transform)
export interface IGroupStudent {
    id: string
    firstName: string
    lastName: string
    groupId: string
}

const GroupStudentSchema = new Schema<IGroupStudentDoc>(
    {
        firstName: String,
        lastName: String,
        groupId: { type: Schema.Types.ObjectId, ref: "Group" },
    },
    {
        timestamps: false,
        collection: "group_students",
        strict: true,
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (
                _doc: unknown,
                ret: IGroupStudentDoc & { _id: Types.ObjectId; id?: string }
            ): IGroupStudent => {
                const { _id, groupId, ...rest } = ret
                return { ...rest, id: _id.toString(), groupId: groupId.toString() }
            },
        },
    }
)

export const GroupStudent: Model<IGroupStudentDoc> =
    models.GroupStudent || model<IGroupStudentDoc>("GroupStudent", GroupStudentSchema, "group_students")
