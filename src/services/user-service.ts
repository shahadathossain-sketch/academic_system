import { connectMongoose } from "@/src/utils/mongoose-client"
import mongoose from "mongoose"

export class UserService {
    async getAll() {
        await connectMongoose()
        const db = mongoose.connection.db!
        return await db.collection("users").find({}).toArray()
    }

    async updateRole(id: string, role: string): Promise<void> {
        await connectMongoose()
        const db = mongoose.connection.db!
        const { ObjectId } = mongoose.Types
        await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: { role } }
        )
    }
}
