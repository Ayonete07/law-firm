"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  DollarSign,
  Download,
  FileText,
  Mail,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ReportsContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedReport, setSelectedReport] = useState("overview")
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

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

  const attorneyPerformance = [
    { name: "Ms. Sophia", cases: 18, rating: 4.9, revenue: 45000 },
    { name: "Ms. Emma Burton", cases: 15, rating: 4.7, revenue: 38000 },
    { name: "Mr. Tristan", cases: 12, rating: 4.8, revenue: 32000 },
    { name: "Mr. Jacob", cases: 8, rating: 4.6, revenue: 25000 },
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

  const generateCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(",")
    const rows = data.map((row) => Object.values(row).join(",")).join("\n")
    const csvContent = `${headers}\n${rows}`

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generatePDF = async (reportType: string) => {
    // Simulate PDF generation
    const content = `
D-CASE Law Firm - ${reportType.toUpperCase()} REPORT
Generated on: ${new Date().toLocaleDateString()}
Period: ${selectedPeriod}

=== KEY PERFORMANCE INDICATORS ===
${kpiData.map((kpi) => `${kpi.title}: ${kpi.value} (${kpi.change})`).join("\n")}

=== CASE OUTCOMES BY PRACTICE AREA ===
${caseOutcomes
  .map((outcome) => `${outcome.category}: Won: ${outcome.won}, Lost: ${outcome.lost}, Pending: ${outcome.pending}`)
  .join("\n")}

=== ATTORNEY PERFORMANCE ===
${attorneyPerformance
  .map(
    (attorney) =>
      `${attorney.name}: ${attorney.cases} cases, Rating: ${attorney.rating}, Revenue: $${attorney.revenue.toLocaleString()}`,
  )
  .join("\n")}

=== SUMMARY ===
This report provides a comprehensive overview of the law firm's performance for the ${selectedPeriod} period.
Total active cases: 850
Total active clients: 324
Monthly revenue: $125,400
Case success rate: 87%
    `

    const blob = new Blob([content], { type: "application/pdf" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `D-CASE_${reportType}_Report_${new Date().toISOString().split("T")[0]}.pdf`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateExcel = (reportType: string) => {
    // Create Excel-like CSV with multiple sheets simulation
    const kpiSheet = `KPI Data\n${kpiData.map((kpi) => `${kpi.title},${kpi.value},${kpi.change}`).join("\n")}`
    const caseOutcomesSheet = `\n\nCase Outcomes\n${caseOutcomes.map((outcome) => `${outcome.category},${outcome.won},${outcome.lost},${outcome.pending}`).join("\n")}`
    const attorneySheet = `\n\nAttorney Performance\n${attorneyPerformance.map((attorney) => `${attorney.name},${attorney.cases},${attorney.rating},${attorney.revenue}`).join("\n")}`

    const excelContent = kpiSheet + caseOutcomesSheet + attorneySheet

    const blob = new Blob([excelContent], { type: "application/vnd.ms-excel" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `D-CASE_${reportType}_Report_${new Date().toISOString().split("T")[0]}.xlsx`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExport = async (format: "pdf" | "excel" | "csv") => {
    setIsExporting(true)

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const reportType = selectedReport
      const timestamp = new Date().toISOString().split("T")[0]

      switch (format) {
        case "pdf":
          await generatePDF(reportType)
          toast({
            title: "PDF Export Successful",
            description: `${reportType} report has been downloaded as PDF.`,
          })
          break
        case "excel":
          generateExcel(reportType)
          toast({
            title: "Excel Export Successful",
            description: `${reportType} report has been downloaded as Excel file.`,
          })
          break
        case "csv":
          const csvData = [
            ...kpiData.map((kpi) => ({ type: "KPI", name: kpi.title, value: kpi.value, change: kpi.change })),
            ...caseOutcomes.map((outcome) => ({
              type: "Case Outcome",
              name: outcome.category,
              won: outcome.won,
              lost: outcome.lost,
              pending: outcome.pending,
            })),
            ...attorneyPerformance.map((attorney) => ({
              type: "Attorney",
              name: attorney.name,
              cases: attorney.cases,
              rating: attorney.rating,
              revenue: attorney.revenue,
            })),
          ]
          generateCSV(csvData, `D-CASE_${reportType}_Report_${timestamp}.csv`)
          toast({
            title: "CSV Export Successful",
            description: `${reportType} report has been downloaded as CSV file.`,
          })
          break
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleEmailReport = async () => {
    setIsExporting(true)

    try {
      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Report Emailed Successfully",
        description: `${selectedReport} report has been sent to your email address.`,
      })
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "There was an error sending the report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="md:text-2xl font-bold">Reports & Analytics</h1>
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
              {attorneyPerformance.map((attorney, index) => (
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
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              onClick={() => handleExport("pdf")}
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export as PDF"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport("excel")}
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export as Excel"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport("csv")}
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export as CSV"}
            </Button>
            <Button
              variant="outline"
              onClick={handleEmailReport}
              disabled={isExporting}
              className="flex items-center gap-2 bg-transparent"
            >
              <Mail className="w-4 h-4" />
              {isExporting ? "Sending..." : "Email Report"}
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Reports will be generated based on the selected report type and time period. Downloads will start
            automatically once processing is complete.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
