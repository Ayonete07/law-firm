"use client"

import { AttorneyDetailsPage } from "@/components/attorney-details-page"
import { useParams } from "next/navigation"

export default function AttorneyDetailPage() {
  const params = useParams()
  const attorneyId = params.id as string

  return <AttorneyDetailsPage attorneyId={attorneyId} />
}
