"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Case {
  id: string
  title: string
  client: string
  attorney: string
  caseType: string
  status: "Active" | "Closed" | "Pending"
  priority: "High" | "Medium" | "Low"
  deadline: string
  description: string
  clientAvatar: string
}

export function CasesContent() {
  const [cases, setCases] = useState<Case[]>([
    {
      id: "1",
      title: "Business Litigation Case",
      client: "John Doe",
      attorney: "Mical Lobani",
      caseType: "Business Law",
      status: "Active",
      priority: "High",
      deadline: "2024-12-31",
      description: "Complex business litigation involving contract disputes and intellectual property rights.",
      clientAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      title: "Family Custody Case",
      client: "Jane Smith",
      attorney: "Sarah Johnson",
      caseType: "Family Law",
      status: "Pending",
      priority: "Medium",
      deadline: "2024-11-15",
      description: "Child custody case involving divorced parents seeking joint custody arrangement.",
      clientAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      title: "Criminal Defense Case",
      client: "Mike Wilson",
      attorney: "David Brown",
      caseType: "Criminal Law",
      status: "Active",
      priority: "High",
      deadline: "2024-10-20",
      description: "Criminal defense case involving white-collar crime allegations.",
      clientAvatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [newCase, setNewCase] = useState<Partial<Case>>({})

  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.attorney.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCase = () => {
    if (newCase.title && newCase.client && newCase.attorney) {
      const caseItem: Case = {
        id: Date.now().toString(),
        title: newCase.title,
        client: newCase.client,
        attorney: newCase.attorney,
        caseType: newCase.caseType || "General",
        status: (newCase.status as Case["status"]) || "Pending",
        priority: (newCase.priority as Case["priority"]) || "Medium",
        deadline: newCase.deadline || "",
        description: newCase.description || "",
        clientAvatar: "/placeholder.svg?height=40&width=40",
      }
      setCases([...cases, caseItem])
      setNewCase({})
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteCase = (id: string) => {
    setCases(cases.filter((caseItem) => caseItem.id !== id))
  }

  const handleViewCase = (caseItem: Case) => {
    setSelectedCase(caseItem)
    setIsViewDialogOpen(true)
  }

  const getStatusColor = (status: Case["status"]) => {
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

  const getPriorityColor = (priority: Case["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Case Management</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Case
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Case</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Case Title</Label>
                <Input
                  id="title"
                  value={newCase.title || ""}
                  onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                  placeholder="Enter case title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={newCase.client || ""}
                    onChange={(e) => setNewCase({ ...newCase, client: e.target.value })}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label htmlFor="attorney">Attorney</Label>
                  <Input
                    id="attorney"
                    value={newCase.attorney || ""}
                    onChange={(e) => setNewCase({ ...newCase, attorney: e.target.value })}
                    placeholder="Enter attorney name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="caseType">Case Type</Label>
                  <Select onValueChange={(value) => setNewCase({ ...newCase, caseType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business Law">Business Law</SelectItem>
                      <SelectItem value="Family Law">Family Law</SelectItem>
                      <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Employment Law">Employment Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => setNewCase({ ...newCase, status: value as Case["status"] })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select onValueChange={(value) => setNewCase({ ...newCase, priority: value as Case["priority"] })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newCase.deadline || ""}
                  onChange={(e) => setNewCase({ ...newCase, deadline: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCase.description || ""}
                  onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                  placeholder="Enter case description"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddCase} className="w-full">
                Add Case
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search cases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCases.map((caseItem) => (
          <Card key={caseItem.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-2">{caseItem.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(caseItem.status)}>{caseItem.status}</Badge>
                    <Badge className={getPriorityColor(caseItem.priority)}>{caseItem.priority}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={caseItem.clientAvatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {caseItem.client
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{caseItem.client}</p>
                  <p className="text-xs text-gray-500">Client</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Attorney:</span> {caseItem.attorney}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Type:</span> {caseItem.caseType}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Deadline:</span> {caseItem.deadline}
                </p>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{caseItem.description}</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleViewCase(caseItem)} className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteCase(caseItem.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Case Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedCase?.title}</DialogTitle>
          </DialogHeader>
          {selectedCase && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Case Information</h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Client:</span> {selectedCase.client}
                      </p>
                      <p>
                        <span className="font-medium">Attorney:</span> {selectedCase.attorney}
                      </p>
                      <p>
                        <span className="font-medium">Type:</span> {selectedCase.caseType}
                      </p>
                      <p>
                        <span className="font-medium">Deadline:</span> {selectedCase.deadline}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Status & Priority</h3>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(selectedCase.status)}>{selectedCase.status}</Badge>
                      <Badge className={getPriorityColor(selectedCase.priority)}>{selectedCase.priority}</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{selectedCase.description}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No cases found matching your search.</p>
        </div>
      )}
    </div>
  )
}
