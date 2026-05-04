import { connectMongoose } from "@/src/utils/mongoose-client"
import { Group } from "@/src/models/group-model"
import { GroupStudent } from "@/src/models/group-student-model"
import { CertType } from "@/src/models/cert-type-model"
import { NextResponse } from "next/server"

export async function GET() {
    await connectMongoose()

    await Group.deleteMany({})
    await GroupStudent.deleteMany({})
    await CertType.deleteMany({})

    const [groupA, groupB, groupC] = await Group.insertMany([
        { name: "Group A" },
        { name: "Group B" },
        { name: "Group C" },
    ])

    await GroupStudent.insertMany([
        { firstName: "Alice", lastName: "Johnson", groupId: groupA._id },
        { firstName: "Bob", lastName: "Smith", groupId: groupA._id },
        { firstName: "Carol", lastName: "Williams", groupId: groupA._id },
        { firstName: "David", lastName: "Brown", groupId: groupA._id },
        { firstName: "Emma", lastName: "Jones", groupId: groupB._id },
        { firstName: "Frank", lastName: "Davis", groupId: groupB._id },
        { firstName: "Grace", lastName: "Miller", groupId: groupB._id },
        { firstName: "Henry", lastName: "Wilson", groupId: groupC._id },
        { firstName: "Isla", lastName: "Moore", groupId: groupC._id },
        { firstName: "Jack", lastName: "Taylor", groupId: groupC._id },
    ])

    await CertType.insertMany([
        { title: "Study Certificate" },
        { title: "Academic Leave" },
    ])

    return NextResponse.json({
        message: "Seeded: 3 groups, 10 students, 2 cert types",
    })
}
