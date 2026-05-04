import { SemesterSubjects } from "@/src/components/subjects/semester-subjects"

export default function SubjectsPage() {
    return (
        <div className="grid grid-flow-row gap-4">
            <h1 className="font-bold text-xl">Subjects of Semester</h1>
            <SemesterSubjects />
        </div>
    )
}