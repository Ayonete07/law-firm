"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Star, Phone, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Attorney {
  id: string
  name: string
  email: string
  phone: string
  specialization: string
  experience: number
  rating: number
  activeCases: number
  bio: string
  avatar: string
  joinDate: string
}

export function AttorneysContent() {
  const [attorneys, setAttorneys] = useState<Attorney[]>([
    {
      id: "1",
      name: "Mr. Tristan",
      email: "tristan@lawfirm.com",
      phone: "+1 234 567 8900",
      specialization: "Estate Planning Lawyer",
      experience: 8,
      rating: 4.8,
      activeCases: 12,
      bio: "Experienced estate planning attorney with expertise in wills, trusts, and probate law.",
      avatar: "/placeholder.svg?height=100&width=100",
      joinDate: "2020-03-15",
    },
    {
      id: "2",
      name: "Mr. Jacob",
      email: "jacob@lawfirm.com",
      phone: "+1 234 567 8901",
      specialization: "Bankruptcy Lawyer",
      experience: 6,
      rating: 4.6,
      activeCases: 8,
      bio: "Dedicated bankruptcy attorney helping clients navigate financial difficulties and debt relief.",
      avatar: "/placeholder.svg?height=100&width=100",
      joinDate: "2021-07-20",
    },
    {
      id: "3",
      name: "Ms. Sophia",
      email: "sophia@lawfirm.com",
      phone: "+1 234 567 8902",
      specialization: "Employment Lawyer",
      experience: 10,
      rating: 4.9,
      activeCases: 15,
      bio: "Employment law specialist focusing on workplace rights, discrimination, and labor disputes.",
      avatar: "/placeholder.svg?height=100&width=100",
      joinDate: "2019-01-10",
    },
    {
      id: "4",
      name: "Ms. Emma Burton",
      email: "emma@lawfirm.com",
      phone: "+1 234 567 8903",
      specialization: "Family Lawyer",
      experience: 12,
      rating: 4.7,
      activeCases: 18,
      bio: "Compassionate family law attorney specializing in divorce, custody, and adoption cases.",
      avatar: "/placeholder.svg?height=100&width=100",
      joinDate: "2018-05-22",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedAttorney, setSelectedAttorney] = useState<Attorney | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [newAttorney, setNewAttorney] = useState<Partial<Attorney>>({})

  const filteredAttorneys = attorneys.filter(
    (attorney) =>
      attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attorney.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddAttorney = () => {
    if (newAttorney.name && newAttorney.email && newAttorney.specialization) {
      const attorney: Attorney = {
        id: Date.now().toString(),
        name: newAttorney.name,
        email: newAttorney.email,
        phone: newAttorney.phone || "",
        specialization: newAttorney.specialization,
        experience: newAttorney.experience || 0,
        rating: 4.0,
        activeCases: 0,
        bio: newAttorney.bio || "",
        avatar: "/placeholder.svg?height=100&width=100",
        joinDate: new Date().toISOString().split("T")[0],
      }
      setAttorneys([...attorneys, attorney])
      setNewAttorney({})
      setIsAddDialogOpen(false)
    }
  }

  const handleViewAttorney = (attorney: Attorney) => {
    setSelectedAttorney(attorney)
    setIsViewDialogOpen(true)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          
          <h1 className="md:text-2xl font-bold">Attorneys</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Attorney
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Attorney</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newAttorney.name || ""}
                  onChange={(e) => setNewAttorney({ ...newAttorney, name: e.target.value })}
                  placeholder="Enter attorney name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAttorney.email || ""}
                    onChange={(e) => setNewAttorney({ ...newAttorney, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newAttorney.phone || ""}
                    onChange={(e) => setNewAttorney({ ...newAttorney, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select onValueChange={(value) => setNewAttorney({ ...newAttorney, specialization: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business Law">Business Law</SelectItem>
                      <SelectItem value="Family Law">Family Law</SelectItem>
                      <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Employment Law">Employment Law</SelectItem>
                      <SelectItem value="Estate Planning">Estate Planning</SelectItem>
                      <SelectItem value="Bankruptcy Law">Bankruptcy Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={newAttorney.experience || ""}
                    onChange={(e) =>
                      setNewAttorney({ ...newAttorney, experience: Number.parseInt(e.target.value) || 0 })
                    }
                    placeholder="Enter years of experience"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={newAttorney.bio || ""}
                  onChange={(e) => setNewAttorney({ ...newAttorney, bio: e.target.value })}
                  placeholder="Enter attorney biography"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddAttorney} className="w-full">
                Add Attorney
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search attorneys..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Attorneys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAttorneys.map((attorney) => (
          <Card key={attorney.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={attorney.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {attorney.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">{attorney.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{attorney.specialization}</p>
              <div className="flex justify-center mb-3">
                {renderStars(attorney.rating)}
                <span className="ml-2 text-sm text-gray-600">({attorney.rating})</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{attorney.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{attorney.phone}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <div className="text-center">
                  <p className="font-semibold">{attorney.experience}</p>
                  <p className="text-gray-600">Years Exp.</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{attorney.activeCases}</p>
                  <p className="text-gray-600">Active Cases</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleViewAttorney(attorney)} className="flex-1">
                  View Profile
                </Button>
                <Button size="sm" variant="outline">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attorney Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Attorney Profile</DialogTitle>
          </DialogHeader>
          {selectedAttorney && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={selectedAttorney.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {selectedAttorney.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedAttorney.name}</h2>
                  <Badge className="mb-3 bg-green-100 text-green-800">{selectedAttorney.specialization}</Badge>
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(selectedAttorney.rating)}
                    <span className="text-sm text-gray-600">({selectedAttorney.rating})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Email:</p>
                      <p className="text-gray-600">{selectedAttorney.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone:</p>
                      <p className="text-gray-600">{selectedAttorney.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium">Experience:</p>
                      <p className="text-gray-600">{selectedAttorney.experience} years</p>
                    </div>
                    <div>
                      <p className="font-medium">Active Cases:</p>
                      <p className="text-gray-600">{selectedAttorney.activeCases}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Biography</h3>
                <p className="text-gray-600">{selectedAttorney.bio}</p>
              </div>
              <div className="flex gap-4">
                <Button className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredAttorneys.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No attorneys found matching your search.</p>
        </div>
      )}
    </div>
  )
}
