"use server"

import { auth } from "@/src/utils/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signoutAction() {
    await auth.api.signOut({ headers: await headers() })
    redirect("/signin")
}
