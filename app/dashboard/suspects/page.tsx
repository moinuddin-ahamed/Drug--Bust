"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, MapPin, AlertTriangle, Shield, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GoogleMapsComponent from "@/components/google-maps"

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SuspectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRisk, setSelectedRisk] = useState("all")
  const [isAddSuspectOpen, setIsAddSuspectOpen] = useState(false)
  const [newSuspect, setNewSuspect] = useState({
    id: `S-${Math.floor(1000 + Math.random() * 9000)}`,
    name: "",
    alias: "",
    risk: "medium",
    status: "monitoring",
    lastSeen: "Just added",
    location: "",
    platforms: [],
    cases: 0
  })

  // Function to handle adding a new suspect
  const handleAddSuspect = () => {
    // In a real app, you would add API call here
    console.log("New suspect data:", newSuspect)
    // Close the dialog
    setIsAddSuspectOpen(false)
    // Reset form (in real app, you would add the new suspect to the list)
    setNewSuspect({
      id: `S-${Math.floor(1000 + Math.random() * 9000)}`,
      name: "",
      alias: "",
      risk: "medium",
      status: "monitoring",
      lastSeen: "Just added",
      location: "",
      platforms: [],
      cases: 0
    })
  }

  const suspects = [
    {
      id: "S-1032",
      name: "Rajesh Kumar",
      alias: "@crypto_dealer",
      risk: "high",
      status: "active",
      lastSeen: "2 hours ago",
      location: "Mumbai",
      platforms: ["telegram", "whatsapp"],
      cases: 3,
    },
    {
      id: "S-1045",
      name: "Vikram Singh",
      alias: "@dealer_9",
      risk: "medium",
      status: "active",
      lastSeen: "5 hours ago",
      location: "Delhi",
      platforms: ["whatsapp"],
      cases: 2,
    },
    {
      id: "S-1067",
      name: "Priya Sharma",
      alias: "@crypto_plug",
      risk: "high",
      status: "active",
      lastSeen: "1 day ago",
      location: "Kolkata",
      platforms: ["instagram", "telegram"],
      cases: 4,
    },
    {
      id: "S-1078",
      name: "Amit Patel",
      alias: "@party_supplies",
      risk: "medium",
      status: "monitoring",
      lastSeen: "3 days ago",
      location: "Bangalore",
      platforms: ["whatsapp"],
      cases: 1,
    },
    {
      id: "S-1092",
      name: "Neha Gupta",
      alias: "@meds_connect",
      risk: "low",
      status: "monitoring",
      lastSeen: "1 week ago",
      location: "Chennai",
      platforms: ["telegram"],
      cases: 1,
    },
    {
      id: "S-1103",
      name: "Sanjay Verma",
      alias: "@quick_delivery",
      risk: "high",
      status: "active",
      lastSeen: "12 hours ago",
      location: "Hyderabad",
      platforms: ["whatsapp", "instagram"],
      cases: 3,
    },
    {
      id: "S-1118",
      name: "Ananya Reddy",
      alias: "@premium_stuff",
      risk: "medium",
      status: "monitoring",
      lastSeen: "2 days ago",
      location: "Pune",
      platforms: ["telegram"],
      cases: 2,
    },
  ]

  const filteredSuspects =
    selectedRisk === "all" ? suspects : suspects.filter((suspect) => suspect.risk === selectedRisk)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Suspects</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Suspect Management</h2>
            <p className="text-muted-foreground">Track and monitor individuals of interest</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setIsAddSuspectOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Suspect
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Suspects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">+8 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">42</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Identifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search suspects by name, alias, location..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={selectedRisk} onValueChange={setSelectedRisk}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Suspect</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Cases</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuspects.map((suspect) => (
                      <TableRow key={suspect.id}>
                        <TableCell className="font-mono text-sm">{suspect.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${suspect.name.charAt(0)}`} />
                              <AvatarFallback>{suspect.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{suspect.name}</div>
                              <div className="text-sm text-muted-foreground">{suspect.alias}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              suspect.risk === "high"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : suspect.risk === "medium"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          `}
                          >
                            {suspect.risk.charAt(0).toUpperCase() + suspect.risk.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              suspect.status === "active"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                            }
                          `}
                          >
                            {suspect.status.charAt(0).toUpperCase() + suspect.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{suspect.lastSeen}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            {suspect.location}
                          </div>
                        </TableCell>
                        <TableCell>{suspect.cases}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MapPin className="mr-2 h-4 w-4" />
                                Track Location
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Flag as High Risk
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                Assign to Case
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grid" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSuspects.map((suspect) => (
                <Card key={suspect.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant="outline"
                        className={`
                        ${
                          suspect.risk === "high"
                            ? "bg-red-100 text-red-800 hover:bg-red-100"
                            : suspect.risk === "medium"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : "bg-green-100 text-green-800 hover:bg-green-100"
                        }
                      `}
                      >
                        {suspect.risk.charAt(0).toUpperCase() + suspect.risk.slice(1)} Risk
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Track Location</DropdownMenuItem>
                          <DropdownMenuItem>Flag as High Risk</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Assign to Case</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="h-20 w-20 mb-2">
                        <AvatarImage src={`/placeholder.svg?height=80&width=80&text=${suspect.name.charAt(0)}`} />
                        <AvatarFallback className="text-2xl">{suspect.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium text-lg">{suspect.name}</h3>
                      <p className="text-sm text-muted-foreground">{suspect.alias}</p>

                      <div className="flex gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className={`
                          ${
                            suspect.status === "active"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                          }
                        `}
                        >
                          {suspect.status.charAt(0).toUpperCase() + suspect.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID:</span>
                        <span className="font-mono">{suspect.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{suspect.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Seen:</span>
                        <span>{suspect.lastSeen}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cases:</span>
                        <span>{suspect.cases}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Suspect Locations</CardTitle>
                <CardDescription>Geographic distribution of suspects</CardDescription>
              </CardHeader>
              <CardContent className="p-0 aspect-video">
                <div className="w-full h-full">
                  <SuspectMapView suspects={filteredSuspects} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      
        {/* Add Suspect Dialog */}
        <Dialog open={isAddSuspectOpen} onOpenChange={setIsAddSuspectOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Suspect</DialogTitle>
              <DialogDescription>
                Enter details about the new suspect to add them to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="suspectId" className="text-right">
                  ID
                </Label>
                <Input
                  id="suspectId"
                  value={newSuspect.id}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newSuspect.name}
                  onChange={(e) => setNewSuspect({...newSuspect, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="alias" className="text-right">
                  Alias
                </Label>
                <Input
                  id="alias"
                  placeholder="@username"
                  value={newSuspect.alias}
                  onChange={(e) => setNewSuspect({...newSuspect, alias: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="risk" className="text-right">
                  Risk Level
                </Label>
                <Select 
                  value={newSuspect.risk} 
                  onValueChange={(value) => setNewSuspect({...newSuspect, risk: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select 
                  value={newSuspect.status} 
                  onValueChange={(value) => setNewSuspect({...newSuspect, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="monitoring">Monitoring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newSuspect.location}
                  onChange={(e) => setNewSuspect({...newSuspect, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cases" className="text-right">
                  Cases
                </Label>
                <Input
                  id="cases"
                  type="number"
                  min="0"
                  value={newSuspect.cases}
                  onChange={(e) => setNewSuspect({...newSuspect, cases: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddSuspectOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleAddSuspect}>
                Add Suspect
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function SuspectMapView({ suspects }: { suspects: any[] }) {
  // Convert suspects to locations format for GoogleMapsComponent
  const locations = suspects.map((suspect) => ({
    id: suspect.id,
    name: suspect.name,
    coordinates: {
      // These are placeholder coordinates - in a real app, you'd use actual coordinates
      lat:
        suspect.location === "Mumbai"
          ? 19.076
          : suspect.location === "Delhi"
            ? 28.7041
            : suspect.location === "Kolkata"
              ? 22.5726
              : suspect.location === "Bangalore"
                ? 12.9716
                : suspect.location === "Chennai"
                  ? 13.0827
                  : suspect.location === "Hyderabad"
                    ? 17.385
                    : suspect.location === "Pune"
                      ? 18.5204
                      : 20.5937,
      lng:
        suspect.location === "Mumbai"
          ? 72.8777
          : suspect.location === "Delhi"
            ? 77.1025
            : suspect.location === "Kolkata"
              ? 88.3639
              : suspect.location === "Bangalore"
                ? 77.5946
                : suspect.location === "Chennai"
                  ? 80.2707
                  : suspect.location === "Hyderabad"
                    ? 78.4867
                    : suspect.location === "Pune"
                      ? 73.8567
                      : 78.9629,
    },
    suspectCount: 1,
  }))

  return (
    <div className="w-full h-full">
      <GoogleMapsComponent locations={locations} mapType="suspects" height="500px" />
    </div>
  )
}