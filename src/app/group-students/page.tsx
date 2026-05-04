import { GroupService } from "@/src/services/group-service"
import { StudentList } from "@/src/components/students/student-list"

export default async function GroupStudentsPage() {
    const service = new GroupService()
    const groups = await service.getAll()

    return (
        <div className="grid grid-flow-row gap-4">
            <h1 className="font-bold text-xl">Group Students</h1>
            <StudentList groups={groups} />
        </div>
    )
}
