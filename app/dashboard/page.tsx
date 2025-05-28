"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import dynamic from "next/dynamic"
import {
  Bell, User, Search, Flag, AlertTriangle, Calendar, ChevronRight,
  Maximize, MoreVertical, Pin, TextIcon as Telegram, MessageCircle,
  Instagram, RefreshCw, Filter, Download, MapPin, LogOut,
  Briefcase, BarChart2, Clock, List, ChevronDown, FileText,
  Check
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
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Dynamically import the map component to reduce initial load time
const GoogleMapsComponent = dynamic(
  () => import("@/components/google-maps-component").then(mod => ({ default: mod.GoogleMapsComponent })),
  { ssr: false, loading: () => <MapSkeleton /> }
)

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
  description?: string;
  time: string;
  priority?: "high" | "medium" | "low";
  read: boolean;
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
  notes?: string;
  status: "active" | "resolved" | "pending";
  assignedTo?: string;
};

type DashboardStats = {
  activeCases: number;
  suspectsIdentified: number;
  highRiskAlerts: number;
  scheduledOperations: number;
  casesChange: number; 
  suspectsChange: number;
  alertsChange: number;
  operationsChange: number;
};

// Component for map loading state
function MapSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted/20 animate-pulse">
      <div className="flex flex-col items-center gap-2">
        <MapPin className="h-10 w-10 text-muted" />
        <p className="text-sm text-muted-foreground">Loading map data...</p>
      </div>
    </div>
  );
}

// Component for reports table to improve code organization
function ReportsTable({ 
  reports, 
  onFlagReport, 
  onAssignAgent, 
  onNavigate 
}: { 
  reports: Report[], 
  onFlagReport: (id: string) => void,
  onAssignAgent: (id: string) => void,
  onNavigate: (path: string) => void
}) {
  if (reports.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No reports match your current filters
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div 
          key={report.id} 
          className={cn(
            "flex items-center justify-between p-3 rounded-lg transition-colors",
            "hover:bg-accent/50 cursor-pointer",
            report.flagged ? "bg-red-50/50 dark:bg-red-900/10" : "bg-muted/50"
          )}
          onClick={() => onNavigate(`/dashboard/reports/${report.id}`)}
        >
          <div className="flex items-center gap-4">
            <div className="font-mono text-sm text-muted-foreground">#{report.id}</div>
            <div>
              <div className="font-medium group flex items-center gap-2">
                {report.handle}
                {report.status === 'resolved' && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                    Resolved
                  </span>
                )}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {report.location} • {report.lastActive}
                {report.assignedTo && (
                  <span className="ml-2 flex items-center gap-1">
                    • <User className="h-3 w-3" /> {report.assignedTo}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Progress 
                value={report.risk} 
                className="w-24 h-2" 
                indicatorClassName={cn(
                  report.risk > 80 ? "bg-red-500" : 
                  report.risk > 60 ? "bg-amber-500" : 
                  "bg-green-500"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  report.risk > 80 ? "text-red-500" : 
                  report.risk > 60 ? "text-amber-500" : 
                  "text-green-500"
                )}
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
              className={report.flagged ? "bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30" : ""}
              onClick={(e) => {
                e.stopPropagation();
                onFlagReport(report.id);
              }}
            >
              <Flag className={`h-4 w-4 ${report.flagged ? "text-red-500" : "text-muted-foreground"}`} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(`/dashboard/reports/${report.id}`);
                }}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onAssignAgent(report.id);
                }}>
                  <User className="h-4 w-4 mr-2" />
                  Assign Agent
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  <Clock className="h-4 w-4 mr-2" />
                  Update Status
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  // User preferences with localStorage persistence
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [mapFilter, setMapFilter] = useLocalStorage("dashboard-map-filter", "all")
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  
  // App state
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  
  // Data state
  const [stats, setStats] = useState<DashboardStats>({
    activeCases: 42,
    suspectsIdentified: 128,
    highRiskAlerts: 17,
    scheduledOperations: 8,
    casesChange: 12,
    suspectsChange: 8,
    alertsChange: -3,
    operationsChange: 25
  })
  
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "New high-risk suspect identified", description: "A new suspect with risk score 94% has been identified in Mumbai area", time: "5 min ago", priority: "high", read: false },
    { id: 2, title: "Operation Bluebird scheduled", description: "Scheduled for tomorrow at 0600 hours in Sector 7", time: "1 hour ago", priority: "medium", read: false },
    { id: 3, title: "New surveillance data available", description: "Fresh data from Delhi NCR surveillance points is ready for analysis", time: "Today, 9:45 AM", priority: "low", read: true }
  ])
  
  // Mock data for locations - in a real app, this would come from an API
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
    {
      id: "loc-004",
      name: "Chennai Harbor",
      coordinates: { lat: 13.083, lng: 80.282 },
      type: "hotspot",
      status: "active",
      suspectCount: 4
    },
    {
      id: "loc-005",
      name: "Kolkata East",
      coordinates: { lat: 22.567, lng: 88.367 },
      type: "surveillance",
      status: "monitoring",
      suspectCount: 2
    }
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
      flagged: false,
      status: "active",
      notes: "Suspected of coordinating distribution activities"
    },
    {
      id: "1018297",
      handle: "@dealer_9",
      risk: 62,
      platform: "whatsapp",
      icon: <MessageCircle className="h-5 w-5 text-green-500" />,
      lastActive: "2 hours ago",
      location: "Delhi",
      flagged: false,
      status: "pending",
      assignedTo: "Officer Kumar"
    },
    {
      id: "1022431",
      handle: "@crypto_plug",
      risk: 91,
      platform: "instagram",
      icon: <Instagram className="h-5 w-5 text-pink-500" />,
      lastActive: "5 min ago",
      location: "Bangalore",
      flagged: true,
      status: "active",
      notes: "Uses cryptocurrency for transactions"
    },
    {
      id: "1024587",
      handle: "@night_trader",
      risk: 74,
      platform: "telegram",
      icon: <Telegram className="h-5 w-5 text-blue-500" />,
      lastActive: "1 day ago",
      location: "Chennai",
      flagged: false,
      status: "resolved",
      assignedTo: "Officer Singh"
    },
    {
      id: "1025632",
      handle: "@eastside_connect",
      risk: 82,
      platform: "instagram",
      icon: <Instagram className="h-5 w-5 text-pink-500" />,
      lastActive: "3 hours ago",
      location: "Kolkata",
      flagged: true,
      status: "active"
    }
  ])

  const router = useRouter()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(true);
      }
      
      // F5 or Command/Ctrl + R to refresh data
      if (e.key === 'F5' || ((e.metaKey || e.ctrlKey) && e.key === 'r')) {
        e.preventDefault();
        refreshData();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initialize data on component mount
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filtered reports based on search and risk filter
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      if (riskFilter === "high" && report.risk < 80) return false;
      if (riskFilter === "medium" && (report.risk >= 80 || report.risk < 60)) return false;
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return report.handle.toLowerCase().includes(searchLower) || 
               report.location.toLowerCase().includes(searchLower) ||
               (report.notes?.toLowerCase().includes(searchLower) || false);
      }
      return true;
    });
  }, [reports, riskFilter, searchQuery]);

  // Filtered locations based on map filter
  const filteredLocations = useMemo(() => {
    return surveillanceLocations.filter(location => {
      if (mapFilter !== "all" && location.type !== mapFilter) return false;
      return true;
    });
  }, [surveillanceLocations, mapFilter]);

  // Count of unread notifications
  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // Function to refresh dashboard data
  const refreshData = useCallback(() => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      // Update the risk values randomly to simulate dynamic data
      const updatedReports = reports.map(report => ({
        ...report,
        risk: Math.max(50, Math.min(99, report.risk + Math.floor(Math.random() * 11) - 5))
      }));
      
      // Update stats with random variations
      setStats(prev => ({
        ...prev,
        activeCases: prev.activeCases + Math.floor(Math.random() * 5) - 2,
        highRiskAlerts: prev.highRiskAlerts + Math.floor(Math.random() * 3) - 1
      }));
      
      setReports(updatedReports);
      setIsRefreshing(false);
      setLastUpdated(new Date());
      toast({
        title: "Dashboard refreshed",
        description: "All data has been updated with latest information"
      });
    }, 1500);
  }, [isRefreshing, reports]);

  // Function handlers
  const handleMapMarkerClick = useCallback((location: SurveillanceLocation) => {
    toast({
      title: location.name,
      description: `${location.status.toUpperCase()}: ${location.suspectCount} suspects tracked at this location`,
      variant: location.type === "hotspot" ? "destructive" : "default"
    });
  }, []);

  const markerClickAdapter = useCallback((location: any) => {
    // Ensure the location has all required properties before passing it to the handler
    if (location && location.id && location.name && location.coordinates && location.type) {
      handleMapMarkerClick(location as SurveillanceLocation);
    }
  }, [handleMapMarkerClick]);

  const handleFlagReport = useCallback((id: string) => {
    setReports(prev => prev.map(report => 
      report.id === id ? { ...report, flagged: !report.flagged } : report
    ));
    
    const report = reports.find(r => r.id === id);
    if (report) {
      toast({
        title: report.flagged ? "Report unflagged" : "Report flagged",
        description: `${report.handle} has been ${report.flagged ? "removed from" : "added to"} priority watchlist`
      });
    }
  }, [reports]);

  const handleViewDetailedMap = useCallback(() => {
    router.push("/dashboard/surveillance");
  }, [router]);

  const handleAssignAgent = useCallback((reportId: string) => {
    toast({
      title: "Agent assignment",
      description: `Opened assignment dialog for report #${reportId}`
    });
  }, []);

  const handleExportReport = useCallback(() => {
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
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read"
    });
  }, []);

  const handleClearNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const handleLogout = useCallback(() => {
    toast({
      title: "Logging out",
      description: "You will be redirected to the login page"
    });
    // Simulate logout process
    setTimeout(() => router.push("/"), 1500);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-medium">Loading Dashboard</h3>
            <p className="text-sm text-muted-foreground">Fetching your latest intelligence data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Command palette for quick navigation */}
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <CommandInput placeholder="Search for reports, suspects, or commands..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => {
              refreshData();
              setIsCommandOpen(false);
            }}>
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Refresh Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              router.push("/dashboard/reports");
              setIsCommandOpen(false);
            }}>
              <FileText className="mr-2 h-4 w-4" />
              <span>View All Reports</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              router.push("/dashboard/suspects");
              setIsCommandOpen(false);
            }}>
              <User className="mr-2 h-4 w-4" />
              <span>Manage Suspects</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => {
              router.push("/dashboard/reports");
              setIsCommandOpen(false);
            }}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Reports</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              router.push("/dashboard/intelligence");
              setIsCommandOpen(false);
            }}>
              <BarChart2 className="mr-2 h-4 w-4" />
              <span>Intelligence</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              router.push("/dashboard/surveillance");
              setIsCommandOpen(false);
            }}>
              <MapPin className="mr-2 h-4 w-4" />
              <span>Surveillance</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              router.push("/dashboard/operations");
              setIsCommandOpen(false);
            }}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Operations</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              router.push("/dashboard/settings");
              setIsCommandOpen(false);
            }}>
              <User className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={refreshData}
                disabled={isRefreshing}
                title="Refresh dashboard data"
                className="ml-1"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => setIsCommandOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search</span>
              <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            
            <div className="relative md:w-full md:max-w-sm lg:max-w-md">
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
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {unreadNotificationCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <h3 className="font-medium">Notifications</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleMarkAllAsRead}
                      disabled={unreadNotificationCount === 0}
                    >
                      Mark all as read
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setNotifications([])}
                      disabled={notifications.length === 0}
                    >
                      Clear all
                    </Button>
                  </div>
                </div>
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    No new notifications
                  </div>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "px-4 py-3 border-b last:border-0 flex items-start justify-between",
                          !notification.read && "bg-accent/50"
                        )}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{notification.title}</p>
                            {notification.priority === "high" && (
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs rounded-full">
                                High Priority
                              </span>
                            )}
                          </div>
                          {notification.description && (
                            <p className="text-xs text-muted-foreground">{notification.description}</p>
                          )}
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 rounded-full"
                          onClick={() => handleClearNotification(notification.id)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
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
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>OP</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">Officer Patel</p>
                    <p className="text-xs text-muted-foreground">Senior Intelligence Officer</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
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
            value={stats.activeCases.toString()}
            change={`${stats.casesChange > 0 ? '+' : ''}${stats.casesChange}%`}
            trend={stats.casesChange >= 0 ? "up" : "down"}
            description="From last month"
            icon={<Flag className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/cases")}
          />
          <StatCard
            title="Suspects Identified"
            value={stats.suspectsIdentified.toString()}
            change={`${stats.suspectsChange > 0 ? '+' : ''}${stats.suspectsChange}%`}
            trend={stats.suspectsChange >= 0 ? "up" : "down"}
            description="From last month"
            icon={<User className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/suspects")}
          />
          <StatCard
            title="High Risk Alerts"
            value={stats.highRiskAlerts.toString()}
            change={`${stats.alertsChange > 0 ? '+' : ''}${stats.alertsChange}%`}
            trend={stats.alertsChange >= 0 ? "up" : "down"}
            description="From last month"
            icon={<AlertTriangle className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/alerts")}
          />
          <StatCard
            title="Scheduled Operations"
            value={stats.scheduledOperations.toString()}
            change={`${stats.operationsChange > 0 ? '+' : ''}${stats.operationsChange}%`}
            trend={stats.operationsChange >= 0 ? "up" : "down"}
            description="For this week"
            icon={<Calendar className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/operations")}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Pin className="h-5 w-5" />
                  Pinned Reports
                </CardTitle>
                <CardDescription>High priority cases requiring immediate attention</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="flex gap-1 h-8">
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filters</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-52 p-3">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Risk Level</h4>
                        <div className="grid grid-cols-1 gap-1">
                          <Button 
                            variant={riskFilter === "all" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setRiskFilter("all")}
                          >
                            All Risks
                          </Button>
                          <Button 
                            variant={riskFilter === "high" ? "default" : "outline"} 
                            size="sm"
                            className={riskFilter === "high" ? "" : "text-red-500"}
                            onClick={() => setRiskFilter("high")}
                          >
                            High Risk
                          </Button>
                          <Button 
                            variant={riskFilter === "medium" ? "default" : "outline"} 
                            size="sm"
                            className={riskFilter === "medium" ? "" : "text-amber-500"}
                            onClick={() => setRiskFilter("medium")}
                          >
                            Medium Risk
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Status</h4>
                        <div className="grid grid-cols-1 gap-1">
                          <Button variant="outline" size="sm">Active</Button>
                          <Button variant="outline" size="sm">Pending</Button>
                          <Button variant="outline" size="sm">Resolved</Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Tabs defaultValue="all" onValueChange={setRiskFilter}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="high">High Risk</TabsTrigger>
                    <TabsTrigger value="medium">Medium Risk</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ReportsTable 
                reports={filteredReports} 
                onFlagReport={handleFlagReport}
                onAssignAgent={handleAssignAgent}
                onNavigate={router.push}
              />

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
                    <DropdownMenuItem 
                      onClick={() => setMapFilter("all")}
                      className={mapFilter === "all" ? "bg-accent" : ""}
                    >
                      All Locations
                      {mapFilter === "all" && <Check className="ml-2 h-4 w-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setMapFilter("hotspot")}
                      className={mapFilter === "hotspot" ? "bg-accent" : ""}
                    >
                      Hotspots Only
                      {mapFilter === "hotspot" && <Check className="ml-2 h-4 w-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setMapFilter("suspects")}
                      className={mapFilter === "suspects" ? "bg-accent" : ""}
                    >
                      Suspect Locations
                      {mapFilter === "suspects" && <Check className="ml-2 h-4 w-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setMapFilter("surveillance")}
                      className={mapFilter === "surveillance" ? "bg-accent" : ""}
                    >
                      Surveillance Points
                      {mapFilter === "surveillance" && <Check className="ml-2 h-4 w-4" />}
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
                onMarkerClick={markerClickAdapter}
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