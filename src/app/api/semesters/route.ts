import { ISemester } from "@/src/types/semester-t"
import { type NextRequest } from "next/server"

const semestersDb: ISemester[] = [
    { id: 1, name: "1st Semester" },
    { id: 2, name: "2nd Semester" },
    { id: 3, name: "3rd Semester" }
]

export function GET(request: NextRequest) {
    return Response.json(semestersDb)
}