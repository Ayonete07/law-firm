"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, TrendingDown, Users, Briefcase, DollarSign } from "lucide-react"

export function ReportsContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedReport, setSelectedReport] = useState("overview")

  const kpiData = [
    {
      title: "Total Cases",
      value: "850",
      change: "+12%",
      trend: "up",
      icon: Briefcase,
      color: "blue",
    },
    {
      title: "Active Clients",
      value: "324",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      title: "Monthly Revenue",
      value: "$125,400",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "purple",
    },
    {
      title: "Case Success Rate",
      value: "87%",
      change: "+3%",
      trend: "up",
      icon: TrendingUp,
      color: "orange",
    },
  ]

  const caseOutcomes = [
    { category: "Real Estate", won: 85, lost: 15, pending: 10 },
    { category: "Corporate", won: 70, lost: 20, pending: 15 },
    { category: "Employment", won: 60, lost: 25, pending: 20 },
    { category: "Family Law", won: 75, lost: 18, pending: 12 },
    { category: "Criminal", won: 65, lost: 30, pending: 18 },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600"
      case "green":
        return "bg-green-100 text-green-600"
      case "purple":
        return "bg-purple-100 text-purple-600"
      case "orange":
        return "bg-orange-100 text-orange-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        </div>
        <div className="flex gap-4">
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="cases">Case Analysis</SelectItem>
              <SelectItem value="clients">Client Reports</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(kpi.color)}`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Revenue trend chart would be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Case Outcomes */}
        <Card>
          <CardHeader>
            <CardTitle>Case Outcomes by Practice Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {caseOutcomes.map((outcome, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{outcome.category}</span>
                    <span className="text-gray-500">{outcome.won + outcome.lost + outcome.pending} cases</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                    <div
                      className="bg-green-500"
                      style={{ width: `${(outcome.won / (outcome.won + outcome.lost + outcome.pending)) * 100}%` }}
                    />
                    <div
                      className="bg-red-500"
                      style={{ width: `${(outcome.lost / (outcome.won + outcome.lost + outcome.pending)) * 100}%` }}
                    />
                    <div
                      className="bg-yellow-500"
                      style={{ width: `${(outcome.pending / (outcome.won + outcome.lost + outcome.pending)) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Won: {outcome.won}</span>
                    <span>Lost: {outcome.lost}</span>
                    <span>Pending: {outcome.pending}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Acquisition */}
        <Card>
          <CardHeader>
            <CardTitle>Client Acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Referrals</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Online Marketing</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Direct Contact</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attorney Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Attorneys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ms. Sophia", cases: 18, rating: 4.9 },
                { name: "Ms. Emma Burton", cases: 15, rating: 4.7 },
                { name: "Mr. Tristan", cases: 12, rating: 4.8 },
                { name: "Mr. Jacob", cases: 8, rating: 4.6 },
              ].map((attorney, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{attorney.name}</p>
                    <p className="text-xs text-gray-600">{attorney.cases} active cases</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{attorney.rating}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(attorney.rating) ? "text-yellow-400" : "text-gray-300"
                            }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Targets */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Revenue Target</span>
                  <span>$125K / $150K</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "83%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>New Clients</span>
                  <span>28 / 35</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Cases Closed</span>
                  <span>45 / 50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline">Export as PDF</Button>
            <Button variant="outline">Export as Excel</Button>
            <Button variant="outline">Email Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
