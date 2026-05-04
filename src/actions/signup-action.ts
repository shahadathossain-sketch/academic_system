"use server"

import { IState } from "@/src/types/shared-t"
import { signUpSchema } from "@/src/utils/form/login-validator"
import { auth } from "@/src/utils/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signupAction(
    prevState: IState,
    formData: FormData
): Promise<IState> {
    const data = Object.fromEntries(formData)
    const result = signUpSchema.safeParse(data)

    if (!result.success) {
        return { isSaved: false, errors: result.error.flatten().fieldErrors }
    }

    const { email, password, username: name } = result.data

    try {
        await auth.api.signUpEmail({
            body: { email, password, name },
            headers: await headers(),
        })
    } catch (e: unknown) {
        return { isSaved: false, message: (e as Error).message }
    }

    redirect("/")
}
