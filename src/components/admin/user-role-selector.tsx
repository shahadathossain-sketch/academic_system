"use client"

import { useState } from "react"
import { Role } from "@/src/constants/role"

type IProps = {
    userId: string
    currentRole: string
}

export function UserRoleSelector({ userId, currentRole }: IProps) {
    const [role, setRole] = useState(currentRole || Role.User)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    async function handleChange(newRole: string) {
        setSaving(true)
        setError("")
        setRole(newRole)
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            })
            if (!res.ok) setError("Failed to update")
        } catch {
            setError("Failed to update")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <select
                value={role}
                onChange={(e) => handleChange(e.target.value)}
                disabled={saving}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 disabled:opacity-50"
            >
                {Object.values(Role).map((r) => (
                    <option key={r} value={r}>
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                    </option>
                ))}
            </select>
            {saving && <span className="text-xs text-gray-400">Saving…</span>}
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    )
}
