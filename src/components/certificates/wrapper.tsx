"use client"

import { useCallback, useEffect, useState } from "react"
import { ICertificate } from "@/src/models/certificate-model"
import { ICertType } from "@/src/models/cert-type-model"
import { getApi } from "@/src/utils/server-api"
import { CertList } from "./list"
import { Form } from "./form"

type IProps = {
    certTypes: ICertType[]
}

export function Wrapper({ certTypes }: IProps) {
    const [certificates, setCertificates] = useState<ICertificate[]>([])
    const [editCert, setEditCert] = useState<ICertificate | undefined>()

    const fetchCertificates = useCallback(async () => {
        const data = await getApi<ICertificate[]>("/api/certificates")
        setCertificates(data ?? [])
    }, [])

    useEffect(() => {
        fetchCertificates()
    }, [fetchCertificates])

    return (
        <div className="grid grid-flow-row gap-4">
            <Form
                certTypes={certTypes}
                editCert={editCert}
                onSaved={fetchCertificates}
                onClose={() => setEditCert(undefined)}
            />
            <CertList
                certTypes={certTypes}
                certificates={certificates}
                setEditCert={setEditCert}
                onDeleted={fetchCertificates}
            />
        </div>
    )
}
