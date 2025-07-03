"use client"

import { useState } from "react"
import { DashboardContent } from "@/components/dashboard-content"
import { ClientsContent } from "@/components/clients-content"
import { CasesContent } from "@/components/cases-content"
import { CalendarContent } from "@/components/calendar-content"
import { AttorneysContent } from "@/components/attorneys-content"
import { DocumentsContent } from "@/components/documents-content"
import { BillingContent } from "@/components/billing-content"
import { ReportsContent } from "@/components/reports-content"
import { ClientDetailsPage } from "@/components/client-details-page"
import { CaseDetailsPage } from "@/components/case-details-page"
import { AttorneyDetailsPage } from "@/components/attorney-details-page"

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  caseStatus: "Active" | "Closed" | "Pending"
  avatar: string
  joinDate: string
  company?: string
  notes?: string
  socialMedia?: {
    facebook?: string
    twitter?: string
    linkedin?: string
  }
}

export interface Case {
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
  progress?: number
  documents?: string[]
  timeline?: Array<{
    date: string
    event: string
    description: string
  }>
}

export interface Attorney {
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
  socialMedia?: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
  education?: string[]
  certifications?: string[]
}

export default function HomePage() {
  const [activeView, setActiveView] = useState("dashboard")
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [selectedAttorneyId, setSelectedAttorneyId] = useState<string | null>(null)

  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@dummy.com",
      phone: "+1 234 567 8900",
      address: "123 Main St, New York, NY",
      caseStatus: "Active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      joinDate: "2024-01-15",
      company: "Doe Enterprises",
      notes: "High-value client with multiple ongoing cases. Prefers email communication.",
      socialMedia: {
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
      },
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@dummy.com",
      phone: "+1 234 567 8901",
      address: "456 Oak Ave, Los Angeles, CA",
      caseStatus: "Pending",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      joinDate: "2024-02-20",
      company: "Smith & Associates",
      notes: "Family law case, sensitive matter requiring discretion.",
      socialMedia: {
        linkedin: "https://linkedin.com/in/janesmith",
      },
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@dummy.com",
      phone: "+1 234 567 8902",
      address: "789 Pine St, Chicago, IL",
      caseStatus: "Closed",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      joinDate: "2024-03-10",
      company: "Wilson Corp",
      notes: "Successfully resolved criminal defense case. Potential for future business.",
    },
  ])

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
      clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      progress: 65,
      timeline: [
        { date: "2024-01-15", event: "Case Filed", description: "Initial case filing and documentation" },
        { date: "2024-02-20", event: "Discovery Phase", description: "Evidence gathering and witness interviews" },
        { date: "2024-03-10", event: "Mediation Scheduled", description: "Mediation session scheduled for next month" },
      ],
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
      clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      progress: 30,
      timeline: [
        { date: "2024-02-01", event: "Initial Consultation", description: "First meeting with client" },
        { date: "2024-02-15", event: "Documentation Review", description: "Review of existing custody agreements" },
      ],
    },
  ])

  const [attorneys, setAttorneys] = useState<Attorney[]>([
    {
      id: "1",
      name: "Mr. Tristan",
      email: "tristan@dcase.com",
      phone: "+1 234 567 8900",
      specialization: "Estate Planning Lawyer",
      experience: 8,
      rating: 4.8,
      activeCases: 12,
      bio: "Experienced estate planning attorney with expertise in wills, trusts, and probate law. Dedicated to helping families secure their financial future.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      joinDate: "2020-03-15",
      socialMedia: {
        linkedin: "https://linkedin.com/in/tristan",
        twitter: "https://twitter.com/tristan_law",
      },
      education: ["Harvard Law School - JD", "Yale University - BA Political Science"],
      certifications: ["Estate Planning Specialist", "Tax Law Certification"],
    },
    {
      id: "2",
      name: "Ms. Sophia",
      email: "sophia@dcase.com",
      phone: "+1 234 567 8902",
      specialization: "Employment Lawyer",
      experience: 10,
      rating: 4.9,
      activeCases: 15,
      bio: "Employment law specialist focusing on workplace rights, discrimination, and labor disputes. Passionate advocate for employee rights.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      joinDate: "2019-01-10",
      socialMedia: {
        linkedin: "https://linkedin.com/in/sophia-law",
        instagram: "https://instagram.com/sophia_legal",
      },
      education: ["Stanford Law School - JD", "UC Berkeley - BA Economics"],
      certifications: ["Employment Law Specialist", "Mediation Certification"],
    },
  ])

  const handleViewClient = (clientId: string) => {
    setSelectedClientId(clientId)
    setActiveView("client-details")
  }

  const handleViewCase = (caseId: string) => {
    setSelectedCaseId(caseId)
    setActiveView("case-details")
  }

  const handleViewAttorney = (attorneyId: string) => {
    setSelectedAttorneyId(attorneyId)
    setActiveView("attorney-details")
  }

  return (
    
      <div className="flex min-h-screen w-full bg-gray-50">
        
        <main className="overflow-auto w-full"><DashboardContent /></main>
      </div>

  )
}
