"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Plus,
  Server,
  HardDrive,
  RefreshCw,
  TableIcon,
  FileText,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const tables = [
    {
      id: "TBL-1001",
      name: "suspects",
      category: "core",
      records: 128,
      lastUpdated: "2023-03-15 14:30:22",
      size: "42 MB",
    },
    {
      id: "TBL-1002",
      name: "cases",
      category: "core",
      records: 42,
      lastUpdated: "2023-03-18 09:15:45",
      size: "28 MB",
    },
    {
      id: "TBL-1003",
      name: "surveillance_points",
      category: "surveillance",
      records: 56,
      lastUpdated: "2023-03-17 16:22:10",
      size: "35 MB",
    },
    {
      id: "TBL-1004",
      name: "chat_logs",
      category: "intelligence",
      records: 1248,
      lastUpdated: "2023-03-20 11:05:33",
      size: "156 MB",
    },
    {
      id: "TBL-1005",
      name: "reports",
      category: "reports",
      records: 42,
      lastUpdated: "2023-03-19 13:40:18",
      size: "64 MB",
    },
    {
      id: "TBL-1006",
      name: "evidence",
      category: "core",
      records: 215,
      lastUpdated: "2023-03-16 10:12:55",
      size: "320 MB",
    },
    {
      id: "TBL-1007",
      name: "locations",
      category: "surveillance",
      records: 89,
      lastUpdated: "2023-03-18 15:30:42",
      size: "48 MB",
    },
    {
      id: "TBL-1008",
      name: "keywords",
      category: "intelligence",
      records: 312,
      lastUpdated: "2023-03-15 09:25:17",
      size: "18 MB",
    },
  ]

  const filteredTables =
    selectedCategory === "all" ? tables : tables.filter((table) => table.category === selectedCategory)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Database</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Database Management</h2>
            <p className="text-muted-foreground">Manage and query the intelligence database</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Export Schema
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Query
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Tables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Across 4 categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,132</div>
              <p className="text-xs text-muted-foreground">+215 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Database Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">711 MB</div>
              <p className="text-xs text-muted-foreground">42% of allocated space</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today</div>
              <p className="text-xs text-muted-foreground">08:00 AM</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tables, fields..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="core">Core</SelectItem>
                <SelectItem value="surveillance">Surveillance</SelectItem>
                <SelectItem value="intelligence">Intelligence</SelectItem>
                <SelectItem value="reports">Reports</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="tables">
          <TabsList>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="queries">Saved Queries</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Table Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTables.map((table) => (
                      <TableRow key={table.id}>
                        <TableCell className="font-mono text-sm">{table.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{table.name}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              table.category === "core"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : table.category === "surveillance"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : table.category === "intelligence"
                                    ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                                    : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            }
                          `}
                          >
                            {table.category.charAt(0).toUpperCase() + table.category.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{table.records.toLocaleString()}</TableCell>
                        <TableCell>{table.lastUpdated}</TableCell>
                        <TableCell>{table.size}</TableCell>
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
                                View Structure
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <TableIcon className="mr-2 h-4 w-4" />
                                Query Table
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Export Data
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modify Structure
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

          <TabsContent value="queries" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Queries</CardTitle>
                <CardDescription>Frequently used database queries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "Q-1001",
                      name: "High Risk Suspects",
                      description: "Retrieves all suspects with high risk rating",
                      lastRun: "Today, 09:15 AM",
                      createdBy: "Rajesh Kumar",
                    },
                    {
                      id: "Q-1002",
                      name: "Recent Chat Analysis",
                      description: "Analyzes chat logs from the last 7 days",
                      lastRun: "Yesterday, 04:30 PM",
                      createdBy: "Priya Sharma",
                    },
                    {
                      id: "Q-1003",
                      name: "Mumbai Surveillance Points",
                      description: "Lists all active surveillance points in Mumbai",
                      lastRun: "2 days ago",
                      createdBy: "Vikram Singh",
                    },
                  ].map((query) => (
                    <div key={query.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <h3 className="font-medium">{query.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{query.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>ID: {query.id}</span>
                          <span>Last Run: {query.lastRun}</span>
                          <span>By: {query.createdBy}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="default" size="sm">
                          <TableIcon className="mr-2 h-4 w-4" />
                          Run
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Queries
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="backups" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Backups</CardTitle>
                <CardDescription>Automated and manual database backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "BKP-1001",
                      date: "2023-03-20",
                      time: "08:00 AM",
                      type: "Automated",
                      size: "711 MB",
                      status: "completed",
                    },
                    {
                      id: "BKP-1002",
                      date: "2023-03-19",
                      time: "08:00 AM",
                      type: "Automated",
                      size: "708 MB",
                      status: "completed",
                    },
                    {
                      id: "BKP-1003",
                      date: "2023-03-18",
                      time: "14:30 PM",
                      type: "Manual",
                      size: "705 MB",
                      status: "completed",
                    },
                    {
                      id: "BKP-1004",
                      date: "2023-03-18",
                      time: "08:00 AM",
                      type: "Automated",
                      size: "705 MB",
                      status: "completed",
                    },
                  ].map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full text-primary">
                          <HardDrive className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{backup.id}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {backup.date} at {backup.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <div>{backup.type}</div>
                          <div className="text-muted-foreground">{backup.size}</div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Completed
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Server className="mr-2 h-4 w-4" />
                              Restore
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Backup
                </Button>
                <Button variant="outline">
                  View All Backups
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

