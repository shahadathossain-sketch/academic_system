import Link from "next/link"

export default function Home() {
    return (
        <div className="grid grid-cols-4 gap-x-4 gap-y-4 mt-8">
            <Link href="/group-students">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50">
                    <h2 className="font-bold text-lg mb-2">Students</h2>
                    <p className="text-gray-500 text-sm">View and manage group students</p>
                </div>
            </Link>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
                <h2 className="font-bold text-lg mb-2">Schedules</h2>
                <p className="text-gray-500 text-sm">View class schedules</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
                <h2 className="font-bold text-lg mb-2">Teachers</h2>
                <p className="text-gray-500 text-sm">View teacher information</p>
            </div>
            <Link href="/certificates">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50">
                    <h2 className="font-bold text-lg mb-2">Certificates</h2>
                    <p className="text-gray-500 text-sm">Manage your certificates</p>
                </div>
            </Link>
        </div>
    )
}
