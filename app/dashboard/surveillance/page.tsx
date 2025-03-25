"use client"

import { useState } from "react"
import {
  Filter,
  Download,
  Plus,
  MapPin,
  Eye,
  Clock,
  AlertTriangle,
  ChevronRight,
  MoreHorizontal,
  Maximize,
  ZoomIn,
  ZoomOut,
  Layers,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GoogleMapsComponent } from "@/components/google-maps-component"

export default function SurveillancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArea, setSelectedArea] = useState("all")

  const surveillancePoints = [
    {
      id: "SP-1001",
      name: "Mumbai Central",
      type: "hotspot",
      status: "active",
      lastUpdated: "10 minutes ago",
      coordinates: { lat: 19.076, lng: 72.8777 },
      suspectCount: 5,
    },
    {
      id: "SP-1002",
      name: "Delhi NCR Hub",
      type: "distribution",
      status: "active",
      lastUpdated: "25 minutes ago",
      coordinates: { lat: 28.7041, lng: 77.1025 },
      suspectCount: 3,
    },
    {
      id: "SP-1003",
      name: "Kolkata East",
      type: "hotspot",
      status: "monitoring",
      lastUpdated: "1 hour ago",
      coordinates: { lat: 22.5726, lng: 88.3639 },
      suspectCount: 2,
    },
    {
      id: "SP-1004",
      name: "Bangalore Tech Park",
      type: "distribution",
      status: "active",
      lastUpdated: "45 minutes ago",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      suspectCount: 4,
    },
    {
      id: "SP-1005",
      name: "Chennai Harbor",
      type: "entry",
      status: "monitoring",
      lastUpdated: "2 hours ago",
      coordinates: { lat: 13.0827, lng: 80.2707 },
      suspectCount: 2,
    },
    {
      id: "SP-1006",
      name: "Hyderabad Central",
      type: "hotspot",
      status: "active",
      lastUpdated: "30 minutes ago",
      coordinates: { lat: 17.385, lng: 78.4867 },
      suspectCount: 3,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Surveillance</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Surveillance Operations</h2>
            <p className="text-muted-foreground">Monitor and track suspect activities in real-time</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Surveillance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Across 6 cities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monitored Suspects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">+5 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Identified Hotspots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">All operational</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <Card className="md:col-span-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Surveillance Map</CardTitle>
                <CardDescription>Real-time monitoring of suspect locations</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[500px]">
              <GoogleMapsComponent locations={surveillancePoints} mapType="surveillance" />
            </CardContent>
            <CardFooter className="p-3 border-t flex justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Hotspot</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Distribution</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Entry Point</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Layers className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Surveillance Points</CardTitle>
                <CardDescription>Active monitoring locations</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[300px] overflow-auto">
                  {surveillancePoints.map((point) => (
                    <div key={point.id} className="flex items-center justify-between p-3 border-b last:border-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              point.type === "hotspot"
                                ? "bg-red-500"
                                : point.type === "distribution"
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                            }`}
                          ></div>
                          <h3 className="font-medium">{point.name}</h3>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {point.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {point.lastUpdated}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`
                          ${
                            point.status === "active"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                          }
                        `}
                        >
                          {point.status.charAt(0).toUpperCase() + point.status.slice(1)}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <Button variant="outline" className="w-full">
                  View All Locations
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest surveillance updates</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[200px] overflow-auto">
                  {[
                    {
                      id: "ACT-1001",
                      location: "Mumbai Central",
                      event: "Suspect movement detected",
                      time: "10 minutes ago",
                      severity: "high",
                    },
                    {
                      id: "ACT-1002",
                      location: "Delhi NCR Hub",
                      event: "New suspect identified",
                      time: "25 minutes ago",
                      severity: "medium",
                    },
                    {
                      id: "ACT-1003",
                      location: "Bangalore Tech Park",
                      event: "Suspicious package exchange",
                      time: "45 minutes ago",
                      severity: "high",
                    },
                    {
                      id: "ACT-1004",
                      location: "Hyderabad Central",
                      event: "Surveillance camera repositioned",
                      time: "1 hour ago",
                      severity: "low",
                    },
                  ].map((activity) => (
                    <div key={activity.id} className="flex items-start justify-between p-3 border-b last:border-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1 rounded-full ${
                              activity.severity === "high"
                                ? "bg-red-100"
                                : activity.severity === "medium"
                                  ? "bg-amber-100"
                                  : "bg-blue-100"
                            }`}
                          >
                            <AlertTriangle
                              className={`h-3 w-3 ${
                                activity.severity === "high"
                                  ? "text-red-500"
                                  : activity.severity === "medium"
                                    ? "text-amber-500"
                                    : "text-blue-500"
                              }`}
                            />
                          </div>
                          <h3 className="font-medium text-sm">{activity.event}</h3>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <span>{activity.location}</span>
                          <span className="mx-1">•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

