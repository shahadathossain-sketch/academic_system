"use client"

import { ICertificate } from "@/src/models/certificate-model"
import { ICertType } from "@/src/models/cert-type-model"
import { deleteApi } from "@/src/utils/server-api"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

type IProps = {
    certTypes: ICertType[]
    certificates: ICertificate[]
    setEditCert: (cert: ICertificate) => void
    onDeleted: () => void
}

export function CertList({ certTypes, certificates, setEditCert, onDeleted }: IProps) {
    function getCertTypeName(typeId: string) {
        return certTypes.find((ct) => ct.id === typeId)?.title ?? typeId
    }

    async function handleDelete(id: string) {
        await deleteApi("/api/certificates", id)
        onDeleted()
    }

    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg mt-4">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Note
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {certificates.length === 0 ? (
                        <tr>
                            <td
                                colSpan={3}
                                className="px-6 py-4 text-center text-gray-400"
                            >
                                No certificates found
                            </td>
                        </tr>
                    ) : (
                        certificates.map((cert) => (
                            <tr
                                key={cert.id}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {getCertTypeName(cert.typeId)}
                                </td>
                                <td className="px-6 py-4">{cert.company}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-x-2">
                                        <button
                                            onClick={() => setEditCert(cert)}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Edit"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cert.id!)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
