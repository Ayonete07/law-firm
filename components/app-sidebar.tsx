"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  Scale,
  FileText,
  CreditCard,
  BarChart3,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "clients", label: "Clients", icon: Users, href: "/clients" },
  { id: "cases", label: "Cases", icon: Briefcase, href: "/cases" },
  { id: "calendar", label: "Appointments", icon: Calendar, href: "/calendar" },
  { id: "attorneys", label: "Attorneys", icon: Scale, href: "/attorneys" },
  { id: "documents", label: "Documents", icon: FileText, href: "/documents" },
  { id: "billing", label: "Billing", icon: CreditCard, href: "/billing" },
  { id: "reports", label: "Reports", icon: BarChart3, href: "/reports" },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <Sidebar className="border-r border-gray-200" collapsible="icon">
      <SidebarHeader className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="font-semibold text-gray-900">D-CASE</h2>
            <p className="text-xs text-gray-500">Legal Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <div className="flex flex-col items-center mb-6 group-data-[collapsible=icon]:mb-4">
          <Avatar className="w-16 h-16 mb-3 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:mb-2">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center group-data-[collapsible=icon]:hidden">
            <h3 className="font-medium text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-500">Senior Partner</p>
            <div className="flex gap-2 mt-2 justify-center">
              <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                <Mail className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                <Link href={item.href} className="w-full justify-start">
                  <item.icon className="w-4 h-4" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200 group-data-[collapsible=icon]:hidden">
        <div className="text-xs text-gray-400 text-center">© 2025 D-CASE. All Rights Reserved.</div>
      </SidebarFooter>
    </Sidebar>
  )
}
