import { AuthNav } from "@/components/auth-nav"
import { Nav } from "@/components/nav"
import { INav } from "@/src/types/nav-t"

const menu: INav[] = [
    { title: "Subjects", slug: "/subjects" },
    { title: "Certificates", slug: "/certificates" },
    { title: "Group Students", slug: "/group-students" },
]

export function Header() {
    return (
        <header className="border-b border-gray-400 p-1 mb-5 grid grid-flow-col gap-x-4 justify-between items-center">
            <Nav menu={menu} />
            <AuthNav />
        </header>
    )
}
