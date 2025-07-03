"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Mail,
  Phone,
  Star,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockData } from "@/lib/mock-data"

interface AttorneyDetailsPageProps {
  attorneyId: string
}

/* identical UI as before – only the data-lookup logic changed */
export function AttorneyDetailsPage({ attorneyId }: AttorneyDetailsPageProps) {
  const router = useRouter()
  const [attorney, setAttorney] = useState<any | null>(null)
  const [cases, setCases] = useState<any[]>([])

  useEffect(() => {
    const found = mockData.attorneys.find((a) => a.id === attorneyId)
    setAttorney(found || null)

    if (found) {
      const attyCases = mockData.cases.filter((c) => c.attorney === found.name)
      setCases(attyCases)
    }
  }, [attorneyId])

  if (!attorney) {
    return (
      <div className="p-4 md:p-6">
        <p className="text-center text-gray-500">Attorney not found.</p>
      </div>
    )
  }

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))

  return (
    <div className="p-4 md:p-6 space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={attorney.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {attorney.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">{attorney.name}</CardTitle>
                      <Badge className="mb-3 bg-green-100 text-green-800">{attorney.specialization}</Badge>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(attorney.rating)}
                        <span className="text-sm text-gray-600">({attorney.rating})</span>
                      </div>
                      <p className="text-gray-600">Joined {attorney.joinDate}</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                      <Mail className="w-4 h-4" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* contact grid */}
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoRow icon={Mail} label="Email" value={attorney.email} />
                  <InfoRow icon={Phone} label="Phone" value={attorney.phone} />
                  <InfoRow icon={Calendar} label="Experience" value={`${attorney.experience} years`} />
                  <InfoRow icon={Briefcase} label="Active Cases" value={attorney.activeCases.toString()} />
                </div>
              </div>

              {/* bio */}
              <Section title="Biography">{attorney.bio}</Section>

              {/* education */}
              {attorney.education?.length && (
                <Section title="Education" icon={GraduationCap}>
                  <ul className="list-disc list-inside space-y-1">
                    {attorney.education.map((edu: string, i: number) => (
                      <li key={i}>{edu}</li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* certifications */}
              {attorney.certifications?.length && (
                <Section title="Certifications" icon={Award}>
                  <div className="flex flex-wrap gap-2">
                    {attorney.certifications.map((cert: string, i: number) => (
                      <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </Section>
              )}

              {/* social */}
              {attorney.socialMedia && (
                <Section title="Social Media">
                  <div className="flex gap-3">
                    {attorney.socialMedia.facebook && (
                      <SocialLink href={attorney.socialMedia.facebook} icon={Facebook} label="Facebook" />
                    )}
                    {attorney.socialMedia.twitter && (
                      <SocialLink href={attorney.socialMedia.twitter} icon={Twitter} label="Twitter" />
                    )}
                    {attorney.socialMedia.linkedin && (
                      <SocialLink href={attorney.socialMedia.linkedin} icon={Linkedin} label="LinkedIn" />
                    )}
                    {attorney.socialMedia.instagram && (
                      <SocialLink href={attorney.socialMedia.instagram} icon={Instagram} label="Instagram" />
                    )}
                  </div>
                </Section>
              )}
            </CardContent>
          </Card>
        </div>

        {/* sidebar quick stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Stat label="Cases Won" value="87%" positive />
              <Stat label="Client Satisfaction" value={`${attorney.rating}/5.0`} />
              <Stat label="Response Time" value="< 2 hrs" />
              <Stat label="Billable Hours" value="1,847" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* assigned cases */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Cases</CardTitle>
        </CardHeader>
        <CardContent>
          {cases.length ? (
            <div className="space-y-4">
              {cases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => router.push(`/cases/${c.id}`)}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{c.title}</h4>
                    <p className="text-sm text-gray-500">Client: {c.client}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        c.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : c.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {c.status}
                    </Badge>
                    <Badge
                      className={
                        c.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : c.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {c.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No cases assigned.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

/* ---------- helper components ---------- */
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

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string
  children: React.ReactNode
  icon?: any
}) {
  return (
    <div>
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        {title}
      </h3>
      {children}
    </div>
  )
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: any
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-2 py-1 border rounded-md text-sm hover:bg-gray-50"
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  )
}

function Stat({
  label,
  value,
  positive,
}: {
  label: string
  value: string
  positive?: boolean
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${positive ? "text-green-600" : ""}`}>{value}</span>
    </div>
  )
}
