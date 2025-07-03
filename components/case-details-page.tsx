"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, FileText, Edit, Phone, Mail, Clock, User, Scale } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockData } from "@/lib/mock-data"

interface CaseDetailsPageProps {
  caseId: string
}

export function CaseDetailsPage({ caseId }: CaseDetailsPageProps) {
  const router = useRouter()
  const [caseData, setCaseData] = useState<any | null>(null)

  useEffect(() => {
    const found = mockData.cases.find((c) => c.id === caseId)
    setCaseData(found || null)
  }, [caseId])

  if (!caseData) {
    return (
      <div className="p-4 md:p-6">
        <p className="text-center text-gray-500">Case not found.</p>
      </div>
    )
  }

  const statusColor =
    caseData.status === "Active"
      ? "bg-green-100 text-green-800"
      : caseData.status === "Pending"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-gray-100 text-gray-800"

  const priorityColor =
    caseData.priority === "High"
      ? "bg-red-100 text-red-800"
      : caseData.priority === "Medium"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800"

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* back-button */}
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* top grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* main card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{caseData.title}</CardTitle>
                  <p className="text-gray-600">Case ID&nbsp;#{caseData.id}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={statusColor}>{caseData.status}</Badge>
                  <Badge className={priorityColor}>{caseData.priority}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* info grid */}
              <div>
                <h3 className="font-semibold mb-4">Case Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoRow icon={User} label="Client" value={caseData.client} />
                  <InfoRow icon={Scale} label="Attorney" value={caseData.attorney} />
                  <InfoRow icon={FileText} label="Case Type" value={caseData.caseType} />
                  <InfoRow icon={Calendar} label="Deadline" value={caseData.deadline} />
                </div>
              </div>

              {/* progress */}
              {caseData.progress && (
                <div>
                  <h3 className="font-semibold mb-2">Progress</h3>
                  <Progress value={caseData.progress} className="h-2" />
                  <p className="text-right text-sm mt-1">{caseData.progress}%</p>
                </div>
              )}

              {/* description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{caseData.description}</p>
              </div>

              {/* simple timeline (if any) */}
              {caseData.timeline?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-4">Timeline</h3>
                  <div className="space-y-4">
                    {caseData.timeline.map((t: any, i: number) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-600" />
                          {i < caseData.timeline.length - 1 && <div className="w-px flex-1 bg-gray-300" />}
                        </div>
                        <div>
                          <p className="font-medium">{t.event}</p>
                          <p className="text-xs text-gray-500">{t.date}</p>
                          <p className="text-sm text-gray-600">{t.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* side-actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Avatar>
                <AvatarImage src={caseData.clientAvatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {caseData.client
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <ActionBtn label="Call Client" icon={Phone} />
              <ActionBtn label="Email Client" icon={Mail} variant="outline" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ActionBtn label="Edit Case" icon={Edit} />
              <ActionBtn label="Schedule Meeting" icon={Calendar} variant="outline" />
              <ActionBtn label="Add Document" icon={FileText} variant="outline" />
              <ActionBtn label="Log Time" icon={Clock} variant="outline" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ---------- helpers ---------- */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-gray-400" />
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

function ActionBtn({
  label,
  icon: Icon,
  variant = "default",
}: {
  label: string
  icon: any
  variant?: "default" | "outline"
}) {
  const base = "w-full justify-start flex items-center gap-2 px-3 py-2 rounded-md text-sm"
  const styles =
    variant === "outline" ? "border bg-transparent hover:bg-gray-50" : "bg-blue-600 text-white hover:bg-blue-700"

  return (
    <button className={`${base} ${styles}`}>
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}
