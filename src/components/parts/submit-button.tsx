"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton({ name }: { name?: string }) {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 disabled:opacity-50"
        >
            {pending ? "Saving..." : (name || "Add")}
        </button>
    )
}
