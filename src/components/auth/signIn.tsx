"use client"

import { useActionState } from "react"
import { signinAction } from "@/src/actions/signin-action"
import { TextField } from "@/src/components/parts/text-field"
import { SubmitButton } from "@/src/components/parts/submit-button"
import Link from "next/link"

export function SignInForm() {
    const [state, formAction] = useActionState(signinAction, { isSaved: false })

    return (
        <form action={formAction} className="grid grid-flow-row gap-y-4 max-w-sm w-full">
            <h1 className="font-bold text-xl">Sign In</h1>
            <TextField
                label="Email"
                name="email"
                type="email"
                isRequired={true}
                errors={state.errors?.email}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                isRequired={true}
                errors={state.errors?.password}
            />
            {state.message && (
                <p
                    className={`text-sm ${
                        state.isSaved ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {state.message}
                </p>
            )}
            <SubmitButton name="Sign In" />
            <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </form>
    )
}
