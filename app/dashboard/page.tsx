"use client"

import { useState, useEffect } from "react"
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
  RefreshCw,
  Filter,
  Download,
  MapPin,
  LogOut
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RecentActivityCard } from "@/components/recent-activity-card"
import { UpcomingScheduleCard } from "@/components/upcoming-schedule-card"
import { StatCard } from "@/components/stat-card"
import { GoogleMapsComponent } from "@/components/google-maps-component"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

// Define types
type SurveillanceLocation = {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  type: string;
  status: string;
  suspectCount: number;
};

type Notification = {
  id: number;
  title: string;
  time: string;
};

type Report = {
  id: string;
  handle: string;
  risk: number;
  platform: string;
  icon: React.ReactNode;
  lastActive: string;
  location: string;
  flagged: boolean;
};

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [mapFilter, setMapFilter] = useState("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "New high-risk suspect identified", time: "5 min ago" },
    { id: 2, title: "Operation Bluebird scheduled", time: "1 hour ago" },
    { id: 3, title: "New surveillance data available", time: "Today, 9:45 AM" }
  ])
  const router = useRouter()

  // Mock data for locations
  const [surveillanceLocations, setSurveillanceLocations] = useState<SurveillanceLocation[]>([
    {
      id: "loc-001",
      name: "Mumbai Central",
      coordinates: { lat: 18.971, lng: 72.819 },
      type: "hotspot",
      status: "active",
      suspectCount: 3
    },
    {
      id: "loc-002",
      name: "Delhi NCR",
      coordinates: { lat: 28.613, lng: 77.209 },
      type: "surveillance",
      status: "active",
      suspectCount: 2
    },
    {
      id: "loc-003",
      name: "Bangalore Tech Park",
      coordinates: { lat: 12.972, lng: 77.594 },
      type: "suspects",
      status: "monitoring",
      suspectCount: 1
    },
  ])

  // Mock reports data with filtering
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1032810",
      handle: "@suspect_1",
      risk: 87,
      platform: "telegram",
      icon: <Telegram className="h-5 w-5 text-blue-500" />,
      lastActive: "10 min ago",
      location: "Mumbai",
      flagged: false
    },
    {
      id: "1018297",
      handle: "@dealer_9",
      risk: 62,
      platform: "whatsapp",
      icon: <MessageCircle className="h-5 w-5 text-green-500" />,
      lastActive: "2 hours ago",
      location: "Delhi",
      flagged: false
    },
    {
      id: "1022431",
      handle: "@crypto_plug",
      risk: 91,
      platform: "instagram",
      icon: <Instagram className="h-5 w-5 text-pink-500" />,
      lastActive: "5 min ago",
      location: "Bangalore",
      flagged: true
    },
  ])

  // Initialize data on component mount
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredReports = reports.filter(report => {
    if (riskFilter === "high" && report.risk < 80) return false;
    if (riskFilter === "medium" && (report.risk >= 80 || report.risk < 60)) return false;
    if (searchQuery) {
      return report.handle.toLowerCase().includes(searchQuery.toLowerCase()) || 
             report.location.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const filteredLocations = surveillanceLocations.filter(location => {
    if (mapFilter !== "all" && location.type !== mapFilter) return false;
    return true;
  });

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      // Update the risk values randomly to simulate dynamic data
      const updatedReports = reports.map(report => ({
        ...report,
        risk: Math.max(50, Math.min(99, report.risk + Math.floor(Math.random() * 11) - 5))
      }));
      
      setReports(updatedReports);
      setIsRefreshing(false);
      setLastUpdated(new Date());
      toast({
        title: "Dashboard refreshed",
        description: "All data has been updated with latest information"
      });
    }, 1500);
  };

  const handleMapMarkerClick = (location: SurveillanceLocation) => {
    toast({
      title: location.name,
      description: `${location.status.toUpperCase()}: ${location.suspectCount} suspects tracked at this location`,
      variant: location.type === "hotspot" ? "destructive" : "default"
    });
  };

  const handleFlagReport = (id: string) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, flagged: !report.flagged } : report
    ));
    
    const report = reports.find(r => r.id === id);
    if (report) {
      toast({
        title: report.flagged ? "Report unflagged" : "Report flagged",
        description: `${report.handle} has been ${report.flagged ? "removed from" : "added to"} priority watchlist`
      });
    }
  };

  const handleViewDetailedMap = () => {
    router.push("/dashboard/surveillance");
  };

  const handleAssignAgent = (reportId: string) => {
    toast({
      title: "Agent assignment",
      description: `Opened assignment dialog for report #${reportId}`
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Export started",
      description: "Your report is being prepared for download"
    });
    // Simulate download preparation
    setTimeout(() => {
      toast({
        title: "Export ready",
        description: "Your report has been downloaded"
      });
    }, 2000);
  };

  const handleClearNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You will be redirected to the login page"
    });
    // Simulate logout process
    setTimeout(() => router.push("/login"), 1500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <span className="text-xs text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={refreshData}
              disabled={isRefreshing}
              title="Refresh dashboard data"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <h3 className="font-medium">Notifications</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setNotifications([])}
                    disabled={notifications.length === 0}
                  >
                    Clear all
                  </Button>
                </div>
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div key={notification.id} className="px-4 py-3 border-b last:border-0 flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => handleClearNotification(notification.id)}
                      >
                        ×
                      </Button>
                    </div>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

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
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
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
            onClick={() => router.push("/dashboard/cases")}
          />
          <StatCard
            title="Suspects Identified"
            value="128"
            change="+8%"
            trend="up"
            description="From last month"
            icon={<User className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/suspects")}
          />
          <StatCard
            title="High Risk Alerts"
            value="17"
            change="-3%"
            trend="down"
            description="From last month"
            icon={<AlertTriangle className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/alerts")}
          />
          <StatCard
            title="Scheduled Operations"
            value="8"
            change="+2"
            trend="up"
            description="For this week"
            icon={<Calendar className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/operations")}
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
              <Tabs defaultValue="all" onValueChange={setRiskFilter}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="high">High Risk</TabsTrigger>
                  <TabsTrigger value="medium">Medium Risk</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    No reports match your current filters
                  </div>
                ) : (
                  filteredReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="font-mono text-sm text-muted-foreground">#{report.id}</div>
                        <div>
                          <div className="font-medium">{report.handle}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {report.location} • {report.lastActive}
                          </div>
                        </div>
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

                        <Button 
                          variant="outline" 
                          size="icon"
                          className={report.flagged ? "bg-red-100 hover:bg-red-100" : ""}
                          onClick={() => handleFlagReport(report.id)}
                        >
                          <Flag className={`h-4 w-4 ${report.flagged ? "text-red-500" : "text-muted-foreground"}`} />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/reports/${report.id}`)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssignAgent(report.id)}>
                              Assign Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Export Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <Button variant="outline" size="sm" onClick={handleExportReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" onClick={() => router.push("/dashboard/reports")}>
                  View All Reports
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
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
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setMapFilter("all")}>
                      All Locations
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMapFilter("hotspot")}>
                      Hotspots Only
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMapFilter("suspects")}>
                      Suspect Locations
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMapFilter("surveillance")}>
                      Surveillance Points
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    // Open in fullscreen
                    const mapElement = document.querySelector('.map-container');
                    if (mapElement && document.fullscreenEnabled) {
                      mapElement.requestFullscreen().catch(err => {
                        console.error("Error attempting to enable fullscreen:", err);
                      });
                    }
                  }}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 aspect-video map-container">
              <GoogleMapsComponent 
                locations={filteredLocations}
                onMarkerClick={handleMapMarkerClick}
                mapType="surveillance"
              />
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">{filteredLocations.length}</span> active locations
              </div>
              <Button variant="link" size="sm" onClick={handleViewDetailedMap}>
                View detailed map
              </Button>
            </CardFooter>
          </Card>

          <UpcomingScheduleCard />
        </div>
      </div>
    </div>
  )
}