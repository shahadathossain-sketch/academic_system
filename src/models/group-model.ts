import { model, models, Schema, Model, Types } from "mongoose"
import { WithStringId } from "@/src/models/model-t"

export interface IGroup {
    id: string
    name: string
}

type IReturnType = WithStringId<IGroup>

const GroupSchema = new Schema<IGroup>(
    { name: String },
    {
        timestamps: false,
        collection: "groups",
        strict: true,
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (
                _doc: unknown,
                ret: IGroup & { _id: Types.ObjectId }
            ): IReturnType => {
                const { _id, ...rest } = ret
                return { ...rest, id: _id.toString() }
            },
        },
    }
)

export const Group: Model<IGroup> = models.Group || model("Group", GroupSchema)
