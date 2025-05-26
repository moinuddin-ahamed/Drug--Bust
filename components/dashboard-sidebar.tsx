"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  AlertCircle,
  Map,
  FileText,
  Settings,
  LogOut,
  HelpCircle,
  Database,
  MessageSquare,
  Shield,
  Brain
} from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 text-white">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2">
        <Shield className="h-8 w-8" />
        <h1 className="text-xl font-bold">INTEL-TRACK</h1>
      </div>

      <div className="p-4 border-b border-slate-800">
        <p className="text-xs text-slate-400">OPERATION</p>
        <h2 className="text-lg font-bold">Drug Bust</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs text-slate-400 mb-2">MAIN NAVIGATION</p>

        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/dashboard") ? "bg-primary text-primary-foreground" : "text-slate-300 hover:bg-slate-800"}`}
        >
          <BarChart3 className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/dashboard/suspects"
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/dashboard/suspects") ? "bg-primary text-primary-foreground" : "text-slate-300 hover:bg-slate-800"}`}
        >
          <Users className="h-5 w-5" />
          <span>Suspects</span>
        </Link>

        <Link
          href="/dashboard/intelligence"
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/dashboard/intelligence") ? "bg-primary text-primary-foreground" : "text-slate-300 hover:bg-slate-800"}`}
        >
          <AlertCircle className="h-5 w-5" />
          <span>Intelligence</span>
        </Link>

        <Link
          href="/dashboard/surveillance"
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/dashboard/surveillance") ? "bg-primary text-primary-foreground" : "text-slate-300 hover:bg-slate-800"}`}
        >
          <Map className="h-5 w-5" />
          <span>Surveillance</span>
        </Link>

        <Link
          href="/dashboard/reports"
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/dashboard/reports") ? "bg-primary text-primary-foreground" : "text-slate-300 hover:bg-slate-800"}`}
        >
          <FileText className="h-5 w-5" />
          <span>Reports</span>
        </Link>
        <Link
          href="/dashboard/database"
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/dashboard/database") ? "bg-primary text-primary-foreground" : "text-slate-300 hover:bg-slate-800"}`}
        >
          <Database className="h-5 w-5" />
          <span>Database</span>
        </Link>

        <Link
          href="/dashboard/gemini"
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/dashboard/gemini") ? "bg-primary text-primary-foreground" : "text-slate-300 hover:bg-slate-800"}`}
        >
          <Brain className="h-5 w-5" />
          <span>AI Analysis</span>
        </Link>

        <p className="text-xs text-slate-400 mt-6 mb-2">SYSTEM</p>

        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/dashboard/settings") ? "bg-primary text-primary-foreground" : "text-slate-300 hover:bg-slate-800"}`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>

        <Link
          href="/dashboard/support"
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/dashboard/support") ? "bg-primary text-primary-foreground" : "text-slate-300 hover:bg-slate-800"}`}
        >
          <HelpCircle className="h-5 w-5" />
          <span>Support</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  )
}