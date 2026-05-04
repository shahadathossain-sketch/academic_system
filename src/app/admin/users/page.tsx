import { UserService } from "@/src/services/user-service"
import { UserRoleSelector } from "@/src/components/admin/user-role-selector"
import { auth } from "@/src/utils/auth"
import { Role } from "@/src/constants/role"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminUsersPage() {
    const session = await auth.api.getSession({ headers: await headers() })
    const role = (session?.user as { role?: string } | undefined)?.role

    if (!session || role !== Role.Administrator) {
        redirect("/signin")
    }

    const service = new UserService()
    const users = await service.getAll()

    return (
        <div className="grid grid-flow-row gap-4">
            <h1 className="font-bold text-xl">Users</h1>
            <div className="relative overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={String(user._id)} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {String(user.name ?? "")}
                                </td>
                                <td className="px-6 py-4">{String(user.email ?? "")}</td>
                                <td className="px-6 py-4">
                                    <UserRoleSelector
                                        userId={String(user._id)}
                                        currentRole={String(user.role ?? Role.User)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
