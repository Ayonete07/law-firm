"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Appointment {
  id: string
  title: string
  client: string
  attorney: string
  date: string
  time: string
  type: "Meeting" | "Court Date" | "Consultation" | "Deadline"
  description: string
}

export function CalendarContent() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      title: "Client Consultation",
      client: "John Doe",
      attorney: "Mical Lobani",
      date: "2025-01-15",
      time: "10:00",
      type: "Consultation",
      description: "Initial consultation for business litigation case",
    },
    {
      id: "2",
      title: "Court Hearing",
      client: "Jane Smith",
      attorney: "Sarah Johnson",
      date: "2025-01-20",
      time: "14:00",
      type: "Court Date",
      description: "Family court hearing for custody case",
    },
    {
      id: "3",
      title: "Contract Review",
      client: "Mike Wilson",
      attorney: "David Brown",
      date: "2025-01-22",
      time: "11:00",
      type: "Meeting",
      description: "Review and finalize contract terms",
    },
  ])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({})
  const [viewMode, setViewMode] = useState<"Month" | "Week" | "Day">("Month")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleAddAppointment = () => {
    if (newAppointment.title && newAppointment.client && newAppointment.date && newAppointment.time) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        title: newAppointment.title,
        client: newAppointment.client,
        attorney: newAppointment.attorney || "",
        date: newAppointment.date,
        time: newAppointment.time,
        type: (newAppointment.type as Appointment["type"]) || "Meeting",
        description: newAppointment.description || "",
      }
      setAppointments([...appointments, appointment])
      setNewAppointment({})
      setIsAddDialogOpen(false)
    }
  }

  const getAppointmentsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return appointments.filter((apt) => apt.date === dateStr)
  }

  const getTypeColor = (type: Appointment["type"]) => {
    switch (type) {
      case "Court Date":
        return "bg-red-100 text-red-800"
      case "Consultation":
        return "bg-blue-100 text-blue-800"
      case "Deadline":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="md:text-2xl font-bold">Appointments</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAppointment.title || ""}
                  onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                  placeholder="Enter appointment title"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={newAppointment.client || ""}
                    onChange={(e) => setNewAppointment({ ...newAppointment, client: e.target.value })}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label htmlFor="attorney">Attorney</Label>
                  <Input
                    id="attorney"
                    value={newAppointment.attorney || ""}
                    onChange={(e) => setNewAppointment({ ...newAppointment, attorney: e.target.value })}
                    placeholder="Enter attorney name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAppointment.date || ""}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newAppointment.time || ""}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  onValueChange={(value) =>
                    setNewAppointment({ ...newAppointment, type: value as Appointment["type"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Court Date">Court Date</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newAppointment.description || ""}
                  onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddAppointment} className="w-full">
                Schedule Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-lg md:text-xl">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              {["Month", "Week", "Day"].map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode(mode as typeof viewMode)}
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-h-[80px] md:min-h-[100px] p-1 md:p-2 border border-gray-100 ${
                  day ? "bg-white hover:bg-gray-50" : "bg-gray-50"
                }`}
              >
                {day && (
                  <>
                    <div className="font-medium text-sm mb-1">{day}</div>
                    <div className="space-y-1">
                      {getAppointmentsForDate(day).map((apt) => (
                        <div
                          key={apt.id}
                          className={`text-xs p-1 rounded truncate ${getTypeColor(apt.type)}`}
                          title={`${apt.time} - ${apt.title} (${apt.client})`}
                        >
                          <div className="font-medium">{apt.time}</div>
                          <div className="truncate">{apt.title}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments
              .filter((apt) => new Date(apt.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((apt) => (
                <div
                  key={apt.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{apt.title}</h4>
                    <p className="text-sm text-gray-600">
                      {apt.client} • {apt.attorney}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(apt.date).toLocaleDateString()} at {apt.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(apt.type)}`}>{apt.type}</span>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
