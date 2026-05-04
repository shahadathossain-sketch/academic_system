import { GroupStudent, IGroupStudent } from "@/src/models/group-student-model"
import { connectMongoose } from "@/src/utils/mongoose-client"
import { Types } from "mongoose"

export class GroupStudentService {
    async getByGroup(groupId: string): Promise<IGroupStudent[]> {
        await connectMongoose()
        const docs = await GroupStudent.find({ groupId: new Types.ObjectId(groupId) })
        return docs.map((d) => d.toJSON() as unknown as IGroupStudent)
    }

    async delete(id: string): Promise<void> {
        await connectMongoose()
        await GroupStudent.deleteOne({ _id: new Types.ObjectId(id) })
    }
}
