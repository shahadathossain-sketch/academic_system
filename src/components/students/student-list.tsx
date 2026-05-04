"use client"

import { useState } from "react"
import { IGroup } from "@/src/models/group-model"
import { IGroupStudent } from "@/src/models/group-student-model"
import { getApi } from "@/src/utils/server-api"

type IProps = {
    groups: IGroup[]
}

export function StudentList({ groups }: IProps) {
    const [students, setStudents] = useState<IGroupStudent[]>([])
    const [selectedGroupId, setSelectedGroupId] = useState<string>("")

    async function handleGroupClick(groupId: string) {
        setSelectedGroupId(groupId)
        if (!groupId) {
            setStudents([])
            return
        }
        const data = await getApi<IGroupStudent[]>(`/api/group-students/${groupId}`)
        setStudents(data ?? [])
    }

    async function handleDelete(studentId: string) {
        await fetch(`/api/group-students/${selectedGroupId}/${studentId}`, {
            method: "DELETE",
        })
        setStudents((prev) => prev.filter((s) => s.id !== studentId))
    }

    return (
        <div className="grid grid-flow-row gap-y-8 max-w-2xl">
            <div className="flex items-center gap-x-2">
                <label htmlFor="group" className="text-sm font-medium text-gray-900">
                    Select Group
                </label>
                <select
                    id="group"
                    onChange={(e) => handleGroupClick(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                >
                    <option value="">---</option>
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="relative overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-6 py-4 text-center text-gray-400"
                                >
                                    Select a group to view students
                                </td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr
                                    key={student.id}
                                    className="bg-white border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {student.firstName}
                                    </td>
                                    <td className="px-6 py-4">{student.lastName}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(student.id)}
                                            className="font-medium text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
