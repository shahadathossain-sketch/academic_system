"use client"

import { useEffect, useState } from "react"
import { IOption } from "@/src/types/form-t"

type IProps = {
    options: IOption[]
    selProps: {
        name: string
        label: string
        isRequired: boolean
        defaultValue?: string
        error?: string
    }
}

export function Select({ options, selProps }: IProps) {
    const { name, label, isRequired, defaultValue, error } = selProps
    const [value, setValue] = useState(defaultValue ?? "")

    useEffect(() => {
        setValue(defaultValue ?? "")
    }, [defaultValue])

    return (
        <div className="grid grid-flow-row gap-y-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-900">
                {label}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required={isRequired}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
            >
                <option value="">--- Select ---</option>
                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.title}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    )
}
