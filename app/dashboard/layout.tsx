import type React from "react"
import { SidebarProvider } from "@/components/sidebar-provider"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 bg-muted/40">{children}</main>
      </div>
    </SidebarProvider>
  )
}

