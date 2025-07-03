"use client"

import { ClientDetailsPage } from "@/components/client-details-page"
import { useParams } from "next/navigation"

export default function ClientDetailPage() {
  const params = useParams()
  const clientId = params.id as string

  return <ClientDetailsPage clientId={clientId} />
}
