"use client"

type IProps = {
    label: string
    name: string
    isRequired: boolean
    type?: string
    defaultValue?: string
    errors?: string[]
}

export function TextField({
    label,
    name,
    isRequired,
    type = "text",
    defaultValue,
    errors,
}: IProps) {
    return (
        <div className="grid grid-flow-row gap-y-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-900">
                {label}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                defaultValue={defaultValue}
                required={isRequired}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            />
            {errors?.map((err, i) => (
                <span key={i} className="text-red-500 text-xs">
                    {err}
                </span>
            ))}
        </div>
    )
}
