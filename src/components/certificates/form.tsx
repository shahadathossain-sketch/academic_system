"use client"

import { useEffect, useState } from "react"
import { ICertificate } from "@/src/models/certificate-model"
import { ICertType } from "@/src/models/cert-type-model"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { FormFields } from "./form-fields"

type IProps = {
    certTypes: ICertType[]
    editCert?: ICertificate
    onSaved: () => void
    onClose: () => void
}

export function Form({ certTypes, editCert, onSaved, onClose }: IProps) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (editCert) setIsOpen(true)
    }, [editCert])

    function handleSaved() {
        setIsOpen(false)
        onSaved()
        onClose()
    }

    function handleClose() {
        setIsOpen(false)
        onClose()
    }

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-x-1 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
            >
                <PlusIcon className="h-4 w-4" />
                Add
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">
                                {editCert?.id ? "Edit Certificate" : "Add Certificate"}
                            </h2>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <FormFields
                            certTypes={certTypes}
                            editCert={editCert}
                            onSaved={handleSaved}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
