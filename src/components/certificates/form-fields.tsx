"use client"

import { useActionState, useEffect } from "react"
import { createCertificates } from "@/src/actions/certificates"
import { ICertificate } from "@/src/models/certificate-model"
import { ICertType } from "@/src/models/cert-type-model"
import { Select } from "@/src/components/parts/select"
import { TextField } from "@/src/components/parts/text-field"
import { SubmitButton } from "@/src/components/parts/submit-button"
import { toSelArr } from "@/src/utils/form/select-helper"

type IProps = {
    certTypes: ICertType[]
    editCert?: ICertificate
    onSaved?: () => void
}

export function FormFields({ certTypes, editCert, onSaved }: IProps) {
    const [state, formAction] = useActionState(createCertificates, { isSaved: false })

    useEffect(() => {
        if (state.isSaved && onSaved) onSaved()
    }, [state.isSaved, onSaved])

    const options = toSelArr(certTypes, "title")

    return (
        <form action={formAction} className="grid grid-flow-row gap-y-4">
            {editCert?.id && (
                <input type="hidden" name="id" value={editCert.id} />
            )}
            <Select
                options={options}
                selProps={{
                    name: "typeId",
                    label: "Certificate Type",
                    isRequired: true,
                    defaultValue: editCert?.typeId,
                    error: state.errors?.typeId?.[0],
                }}
            />
            <TextField
                label="Company"
                name="company"
                isRequired={true}
                defaultValue={editCert?.company}
                errors={state.errors?.company}
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
            <SubmitButton name={editCert?.id ? "Update" : "Add"} />
        </form>
    )
}
