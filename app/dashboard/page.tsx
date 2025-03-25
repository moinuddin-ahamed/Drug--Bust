"use client"

import { useState } from "react"
import {
  Bell,
  User,
  Search,
  Flag,
  AlertTriangle,
  Calendar,
  ChevronRight,
  Maximize,
  MoreVertical,
  Pin,
  TextIcon as Telegram,
  MessageCircle,
  Instagram,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MapComponent } from "@/components/map-component"
import { RecentActivityCard } from "@/components/recent-activity-card"
import { UpcomingScheduleCard } from "@/components/upcoming-schedule-card"
import { StatCard } from "@/components/stat-card"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cases, suspects..."
                className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>OP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Cases"
            value="42"
            change="+12%"
            trend="up"
            description="From last month"
            icon={<Flag className="h-5 w-5" />}
          />
          <StatCard
            title="Suspects Identified"
            value="128"
            change="+8%"
            trend="up"
            description="From last month"
            icon={<User className="h-5 w-5" />}
          />
          <StatCard
            title="High Risk Alerts"
            value="17"
            change="-3%"
            trend="down"
            description="From last month"
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <StatCard
            title="Scheduled Operations"
            value="8"
            change="+2"
            trend="up"
            description="For this week"
            icon={<Calendar className="h-5 w-5" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Pin className="h-5 w-5" />
                  Pinned Reports
                </CardTitle>
                <CardDescription>High priority cases requiring immediate attention</CardDescription>
              </div>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="high">High Risk</TabsTrigger>
                  <TabsTrigger value="medium">Medium Risk</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "1032810",
                    handle: "@suspect_1",
                    risk: 87,
                    platform: "telegram",
                    icon: <Telegram className="h-5 w-5 text-blue-500" />,
                  },
                  {
                    id: "1018297",
                    handle: "@dealer_9",
                    risk: 62,
                    platform: "whatsapp",
                    icon: <MessageCircle className="h-5 w-5 text-green-500" />,
                  },
                  {
                    id: "1022431",
                    handle: "@crypto_plug",
                    risk: 91,
                    platform: "instagram",
                    icon: <Instagram className="h-5 w-5 text-pink-500" />,
                  },
                ].map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="font-mono text-sm text-muted-foreground">#{report.id}</div>
                      <div className="font-medium">{report.handle}</div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Progress value={report.risk} className="w-24 h-2" />
                        <span
                          className={`text-sm font-medium ${
                            report.risk > 80 ? "text-red-500" : report.risk > 60 ? "text-amber-500" : "text-green-500"
                          }`}
                        >
                          {report.risk}%
                        </span>
                      </div>

                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                        {report.icon}
                      </div>

                      <Button variant="outline" size="icon">
                        <Flag className="h-4 w-4 text-red-500" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign Agent</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Reports
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <RecentActivityCard />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Surveillance Map</CardTitle>
                <CardDescription>Active locations of interest</CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <Maximize className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 aspect-video">
              <MapComponent />
            </CardContent>
          </Card>

          <UpcomingScheduleCard />
        </div>
      </div>
    </div>
  )
}

