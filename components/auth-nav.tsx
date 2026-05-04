"use client"

import { useSession, signOut } from "@/src/utils/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function AuthNav() {
    const { data: session } = useSession()
    const router = useRouter()

    return (
        <nav>
            <ul className="grid grid-flow-col w-fit gap-x-3 items-center">
                {session ? (
                    <>
                        <li className="text-sm text-gray-700">{session.user.email}</li>
                        {(session.user as { role?: string }).role === "administrator" && (
                            <li>
                                <Link
                                    href="/admin/users"
                                    className="text-sm text-purple-600 hover:underline"
                                >
                                    Admin
                                </Link>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={async () => {
                                    await signOut()
                                    router.push("/signin")
                                    router.refresh()
                                }}
                                className="text-sm text-red-600 hover:underline"
                            >
                                Sign Out
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                href="/signin"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/signup"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
