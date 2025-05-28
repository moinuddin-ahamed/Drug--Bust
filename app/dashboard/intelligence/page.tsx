"use client"

import { useState } from "react"
import {
  BarChart2,
  PieChart,
  TrendingUp,
  Clock,
  AlertTriangle,
  MessageSquare,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Update the import to use the working component
import GoogleMapsComponent from "@/components/google-maps"

export default function IntelligencePage() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Intelligence</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Intelligence Dashboard</h2>
            <p className="text-muted-foreground">Analyze patterns and trends in drug trafficking activities</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <div className="flex items-center mt-1 text-sm">
                <div className="flex items-center text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  12%
                </div>
                <div className="text-muted-foreground ml-2">From last period</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Identified Networks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="flex items-center mt-1 text-sm">
                <div className="flex items-center text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />2
                </div>
                <div className="text-muted-foreground ml-2">New networks</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Trafficking Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <div className="flex items-center mt-1 text-sm">
                <div className="flex items-center text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />3
                </div>
                <div className="text-muted-foreground ml-2">New routes</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Seizure Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹4.2M</div>
              <div className="flex items-center mt-1 text-sm">
                <div className="flex items-center text-red-500">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  8%
                </div>
                <div className="text-muted-foreground ml-2">From last period</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5" />
                    Case Distribution by Drug Type
                  </CardTitle>
                  <CardDescription>Breakdown of cases by substance</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Cannabis</div>
                        <div className="text-sm text-muted-foreground">38%</div>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">MDMA/Ecstasy</div>
                        <div className="text-sm text-muted-foreground">24%</div>
                      </div>
                      <Progress value={24} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Cocaine</div>
                        <div className="text-sm text-muted-foreground">18%</div>
                      </div>
                      <Progress value={18} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Heroin</div>
                        <div className="text-sm text-muted-foreground">12%</div>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Methamphetamine</div>
                        <div className="text-sm text-muted-foreground">8%</div>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Distribution Channels
                  </CardTitle>
                  <CardDescription>Primary methods of distribution</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Social Media</div>
                        <div className="text-sm text-muted-foreground">42%</div>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Messaging Apps</div>
                        <div className="text-sm text-muted-foreground">35%</div>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Dark Web</div>
                        <div className="text-sm text-muted-foreground">15%</div>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">In-Person</div>
                        <div className="text-sm text-muted-foreground">8%</div>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Emerging Trends
                </CardTitle>
                <CardDescription>Recently identified patterns and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Increased use of encrypted messaging",
                      description:
                        "Traffickers are increasingly using end-to-end encrypted messaging apps to coordinate deliveries.",
                      severity: "high",
                      date: "2 days ago",
                    },
                    {
                      title: "New synthetic compounds",
                      description: "Novel synthetic cannabinoids detected in multiple seizures across urban centers.",
                      severity: "medium",
                      date: "1 week ago",
                    },
                    {
                      title: "Cross-border coordination",
                      description:
                        "Evidence of increased coordination between domestic and international trafficking networks.",
                      severity: "high",
                      date: "2 weeks ago",
                    },
                    {
                      title: "Cryptocurrency payments",
                      description:
                        "Growing trend of using privacy-focused cryptocurrencies for transaction settlements.",
                      severity: "medium",
                      date: "3 weeks ago",
                    },
                  ].map((trend, index) => (
                    <div key={index} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            trend.severity === "high"
                              ? "bg-red-100 text-red-800"
                              : trend.severity === "medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium">{trend.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{trend.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant="outline"
                              className={`
                              ${
                                trend.severity === "high"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : trend.severity === "medium"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            `}
                            >
                              {trend.severity.charAt(0).toUpperCase() + trend.severity.slice(1)} Severity
                            </Badge>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {trend.date}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Trends
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
                <CardDescription>Long-term patterns in trafficking activities</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <div className="w-full h-full">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-sm font-medium">Monthly Drug Seizures</h3>
                      <p className="text-xs text-muted-foreground">Measured in kilograms</p>
                    </div>
                    <Select defaultValue="6m">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3m">3 Months</SelectItem>
                        <SelectItem value="6m">6 Months</SelectItem>
                        <SelectItem value="1y">1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="h-[300px] w-full relative">
                    {/* Visual chart representation */}
                    <div className="absolute bottom-0 left-0 right-0 h-[240px] flex items-end">
                      {[65, 42, 85, 72, 56, 92, 39, 68, 51, 75, 49, 80].map((value, i) => (
                        <div key={i} className="flex-1 mx-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-primary/80 rounded-t"
                            style={{ height: `${value * 2}px` }}
                          ></div>
                          <span className="text-xs mt-1">{`M${i+1}`}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Horizontal grid lines */}
                    <div className="absolute left-0 right-0 top-0 bottom-[20px] flex flex-col justify-between pointer-events-none">
                      {[0, 1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="border-t border-border w-full h-0"></div>
                      ))}
                    </div>
                    
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-[20px] w-[30px] flex flex-col justify-between items-end pr-2 text-xs text-muted-foreground">
                      {[100, 75, 50, 25, 0].map((value) => (
                        <div key={value}>{value}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Peak Period</div>
                      <div className="text-lg font-semibold mt-1">July 2024</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Growth Rate</div>
                      <div className="text-lg font-semibold mt-1 text-green-600">+12.4%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hotspots" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Hotspots</CardTitle>
                <CardDescription>Areas with high trafficking activity</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <MapHotspots />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MapHotspots() {
  const hotspots = [
    {
      id: "HS-1001",
      name: "Mumbai Central",
      coordinates: { lat: 19.076, lng: 72.8777 },
      suspectCount: 5,
    },
    {
      id: "HS-1002",
      name: "Delhi NCR Hub",
      coordinates: { lat: 28.7041, lng: 77.1025 },
      suspectCount: 3,
    },
    {
      id: "HS-1003",
      name: "Kolkata East",
      coordinates: { lat: 22.5726, lng: 88.3639 },
      suspectCount: 2,
    },
    {
      id: "HS-1004",
      name: "Bangalore Tech Park",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      suspectCount: 4,
    },
    {
      id: "HS-1005",
      name: "Chennai Harbor",
      coordinates: { lat: 13.0827, lng: 80.2707 },
      suspectCount: 2,
    },
  ]

  return (
    <div className="w-full h-full">
      <GoogleMapsComponent 
        locations={hotspots} 
        mapType="hotspots" 
        height="400px" 
      />
    </div>
  )
}

