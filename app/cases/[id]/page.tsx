"use client"

import { CaseDetailsPage } from "@/components/case-details-page"
import { useParams } from "next/navigation"

export default function CaseDetailPage() {
  const params = useParams()
  const caseId = params.id as string

  return <CaseDetailsPage caseId={caseId} />
}
