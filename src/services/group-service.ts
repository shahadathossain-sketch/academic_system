import { Group, IGroup } from "@/src/models/group-model"
import { connectMongoose } from "@/src/utils/mongoose-client"

export class GroupService {
    async getAll(): Promise<IGroup[]> {
        await connectMongoose()
        const docs = await Group.find()
        return docs.map((d) => d.toJSON() as IGroup)
    }
}
