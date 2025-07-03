"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, Maximize2, TrendingUp, TrendingDown, Eye, Edit, Phone } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useRouter } from "next/navigation"
import { mockData } from "@/lib/mock-data"

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 69000 },
  { month: "Sep", revenue: 75000 },
  { month: "Oct", revenue: 78000 },
  { month: "Nov", revenue: 82000 },
  { month: "Dec", revenue: 85000 },
]

export function DashboardContent() {
  const router = useRouter()
  const [cases, setCases] = useState(mockData.cases)

  const handleViewCase = (caseId: string) => {
    router.push(`/cases/${caseId}`)
  }

  const handleEditCase = (caseId: string) => {
    router.push(`/cases/${caseId}?edit=true`)
  }

  const handleCallClient = (clientName: string) => {
    // Implement call functionality
    alert(`Calling ${clientName}...`)
  }

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search" className="pl-10 w-full bg-white border-gray-200" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cases</p>
                <p className="text-xl md:text-2xl font-bold">850</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Won Cases</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">170</p>
                <p className="text-sm text-green-600">56.7%</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lost Cases</p>
                <p className="text-xl md:text-2xl font-bold text-red-600">79</p>
                <p className="text-sm text-red-600">26.3%</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-xl md:text-2xl font-bold">$85,000</p>
                <p className="text-sm text-green-600">+12.5%</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outcomes by Practice Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { area: "Real Estate", won: 85, lost: 15, declined: 10 },
                { area: "Corporate", won: 70, lost: 20, declined: 15 },
                { area: "Employment", won: 60, lost: 25, declined: 20 },
                { area: "Litigation", won: 55, lost: 30, declined: 25 },
              ].map((item) => (
                <div key={item.area} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.area}</span>
                    <span>{item.won + item.lost + item.declined} cases</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-green-500"
                      style={{ width: `${(item.won / (item.won + item.lost + item.declined)) * 100}%` }}
                    />
                    <div
                      className="bg-red-500"
                      style={{ width: `${(item.lost / (item.won + item.lost + item.declined)) * 100}%` }}
                    />
                    <div
                      className="bg-yellow-500"
                      style={{ width: `${(item.declined / (item.won + item.lost + item.declined)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ongoing Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Ongoing Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cases.slice(0, 3).map((caseItem) => (
              <div
                key={caseItem.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={caseItem.clientAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {caseItem.client
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{caseItem.client}</p>
                    <p className="text-sm text-gray-500">{caseItem.title}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Case Type</p>
                    <p className="font-medium">{caseItem.caseType}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Attorney</p>
                    <p className="font-medium">{caseItem.attorney}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      caseItem.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : caseItem.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }
                  >
                    {caseItem.priority} Priority
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewCase(caseItem.id)}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditCase(caseItem.id)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleCallClient(caseItem.client)}>
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
