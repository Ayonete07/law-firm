import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full bg-gray-50">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col">
                <SidebarTrigger className="md:flex z-30" />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
