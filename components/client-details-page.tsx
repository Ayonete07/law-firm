"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MapPin, Building, Calendar, FileText, Edit, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockData } from "@/lib/mock-data"

interface ClientDetailsPageProps {
  clientId: string
}

export function ClientDetailsPage({ clientId }: ClientDetailsPageProps) {
  const router = useRouter()
  const [client, setClient] = useState<any>(null)
  const [cases, setCases] = useState<any[]>([])

  useEffect(() => {
    // Find client by ID
    const foundClient = mockData.clients.find((c) => c.id === clientId)
    setClient(foundClient)

    // Find cases for this client
    const clientCases = mockData.cases.filter((c) => c.client === foundClient?.name)
    setCases(clientCases)
  }, [clientId])

  if (!client) {
    return (
      <div className="p-4 md:p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Client not found.</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </Button>
      </div>

      {/* Client Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={client.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {client.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">{client.name}</CardTitle>
                      <p className="text-gray-600">Client since {client.joinDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(client.caseStatus)}>{client.caseStatus}</Badge>
                      <Button size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{client.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{client.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{client.address}</p>
                    </div>
                  </div>
                  {client.company && (
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Company</p>
                        <p className="font-medium">{client.company}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {client.notes && (
                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{client.notes}</p>
                </div>
              )}

              {/* Social Media */}
              {client.socialMedia && (
                <div>
                  <h3 className="font-semibold mb-2">Social Media</h3>
                  <div className="flex gap-2">
                    {client.socialMedia.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={client.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {client.socialMedia.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={client.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                          Twitter
                        </a>
                      </Button>
                    )}
                    {client.socialMedia.facebook && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={client.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                          Facebook
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Phone className="w-4 h-4 mr-2" />
                Call Client
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          {/* Client Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Client Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Cases</span>
                <span className="font-semibold">{cases.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Cases</span>
                <span className="font-semibold">{cases.filter((c) => c.status === "Active").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Closed Cases</span>
                <span className="font-semibold">{cases.filter((c) => c.status === "Closed").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-semibold text-green-600">87%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Associated Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Associated Cases</CardTitle>
        </CardHeader>
        <CardContent>
          {cases.length > 0 ? (
            <div className="space-y-4">
              {cases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => router.push(`/cases/${caseItem.id}`)}
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{caseItem.title}</h4>
                    <p className="text-sm text-gray-600">{caseItem.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-500">Attorney: {caseItem.attorney}</span>
                      <span className="text-sm text-gray-500">Type: {caseItem.caseType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        caseItem.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : caseItem.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {caseItem.status}
                    </Badge>
                    <Badge
                      className={
                        caseItem.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : caseItem.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {caseItem.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No cases associated with this client.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
