"use server"

import { IState } from "@/src/types/shared-t"
import { signInSchema } from "@/src/utils/form/login-validator"
import { auth } from "@/src/utils/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signinAction(
    prevState: IState,
    formData: FormData
): Promise<IState> {
    const data = Object.fromEntries(formData)
    const result = signInSchema.safeParse(data)

    if (!result.success) {
        return { isSaved: false, errors: result.error.flatten().fieldErrors }
    }

    const { email, password } = result.data

    try {
        await auth.api.signInEmail({
            body: { email, password },
            headers: await headers(),
        })
    } catch (e: unknown) {
        return { isSaved: false, message: (e as Error).message }
    }

    redirect("/")
}
