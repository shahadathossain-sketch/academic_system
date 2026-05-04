"use client"

import { useActionState } from "react"
import { signupAction } from "@/src/actions/signup-action"
import { TextField } from "@/src/components/parts/text-field"
import { SubmitButton } from "@/src/components/parts/submit-button"
import Link from "next/link"

export function RegisterForm() {
    const [state, formAction] = useActionState(signupAction, { isSaved: false })

    return (
        <form action={formAction} className="grid grid-flow-row gap-y-4 max-w-sm w-full">
            <h1 className="font-bold text-xl">Create Account</h1>
            <TextField
                label="Username"
                name="username"
                isRequired={true}
                errors={state.errors?.username}
            />
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
            <SubmitButton name="Sign Up" />
            <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/signin" className="text-blue-600 hover:underline">
                    Sign in
                </Link>
            </p>
        </form>
    )
}
