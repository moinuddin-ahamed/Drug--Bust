"use client"

import { useState } from "react"
import { Search, Filter, Download, Plus, FileText, MoreHorizontal, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define a type for the report object
type Report = {
  id: string;
  title: string;
  type: string;
  status: string;
  date: string;
  author: string;
  authorAvatar: string;
  summary: string;
}

// Define a type for the new report (without id and date)
type NewReport = Omit<Report, 'id' | 'date'>;

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [reports, setReports] = useState<Report[]>([
    {
      id: "RPT-1001",
      title: "Mumbai Drug Trafficking Network Analysis",
      type: "Intelligence",
      status: "completed",
      date: "2023-03-15",
      author: "Rajesh Kumar",
      authorAvatar: "RK",
      summary: "Comprehensive analysis of drug trafficking networks operating in Mumbai metropolitan area.",
    },
    {
      id: "RPT-1002",
      title: "Delhi NCR Suspect Profiles",
      type: "Suspect",
      status: "in-progress",
      date: "2023-03-18",
      author: "Priya Sharma",
      authorAvatar: "PS",
      summary: "Detailed profiles of suspected drug traffickers operating in Delhi NCR region.",
    },
    {
      id: "RPT-1003",
      title: "Bangalore Tech Park Surveillance Report",
      type: "Surveillance",
      status: "completed",
      date: "2023-03-10",
      author: "Vikram Singh",
      authorAvatar: "VS",
      summary: "Results of surveillance operation conducted at Bangalore Tech Park area.",
    },
    {
      id: "RPT-1004",
      title: "Kolkata East Distribution Network",
      type: "Intelligence",
      status: "draft",
      date: "2023-03-20",
      author: "Amit Patel",
      authorAvatar: "AP",
      summary: "Draft report on distribution networks identified in Eastern Kolkata.",
    },
    {
      id: "RPT-1005",
      title: "Chennai Harbor Entry Points",
      type: "Surveillance",
      status: "completed",
      date: "2023-03-05",
      author: "Neha Gupta",
      authorAvatar: "NG",
      summary: "Analysis of potential drug entry points at Chennai Harbor.",
    },
    {
      id: "RPT-1006",
      title: "Hyderabad Central Suspect Activities",
      type: "Suspect",
      status: "in-progress",
      date: "2023-03-17",
      author: "Sanjay Verma",
      authorAvatar: "SV",
      summary: "Ongoing monitoring of suspect activities in central Hyderabad.",
    },
    {
      id: "RPT-1007",
      title: "Pune Social Media Trafficking Analysis",
      type: "Intelligence",
      status: "draft",
      date: "2023-03-22",
      author: "Ananya Reddy",
      authorAvatar: "AR",
      summary: "Analysis of drug trafficking activities conducted through social media in Pune.",
    },
  ])

  const [newReport, setNewReport] = useState<NewReport>({
    title: "",
    type: "Intelligence",
    status: "draft",
    summary: "",
    author: "Current User",
    authorAvatar: "CU",
  })

  const generateReportId = () => {
    const lastId = reports.length > 0 ? parseInt(reports[0].id.split("-")[1]) : 1000
    return `RPT-${lastId + 1}`
  }

  const handleInputChange = (field: keyof NewReport, value: string) => {
    setNewReport({
      ...newReport,
      [field]: value,
    })
  }

  const handleSubmit = () => {
    const today = new Date().toISOString().split("T")[0]

    const reportToAdd: Report = {
      ...newReport,
      id: generateReportId(),
      date: today,
    }

    setReports([reportToAdd, ...reports])
    setDialogOpen(false)

    setNewReport({
      title: "",
      type: "Intelligence",
      status: "draft",
      summary: "",
      author: "Current User",
      authorAvatar: "CU",
    })
  }

  const filteredReports =
    selectedStatus === "all" ? reports : reports.filter((report) => report.status === selectedStatus)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Reports</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Report Management</h2>
            <p className="text-muted-foreground">Create, view, and manage intelligence reports</p>
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

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create New Report</DialogTitle>
                  <DialogDescription>
                    Fill out the details below to create a new intelligence report.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Report title"
                      className="col-span-3"
                      value={newReport.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select value={newReport.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Intelligence">Intelligence</SelectItem>
                        <SelectItem value="Surveillance">Surveillance</SelectItem>
                        <SelectItem value="Suspect">Suspect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select value={newReport.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">
                      Author
                    </Label>
                    <Input
                      id="author"
                      value={newReport.author}
                      className="col-span-3"
                      onChange={(e) => handleInputChange("author", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="summary" className="text-right">
                      Summary
                    </Label>
                    <Textarea
                      id="summary"
                      placeholder="Brief summary of the report"
                      className="col-span-3"
                      value={newReport.summary}
                      onChange={(e) => handleInputChange("summary", e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleSubmit} disabled={!newReport.title}>
                    Create Report
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+8 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">28</div>
              <p className="text-xs text-muted-foreground">67% completion rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">10</div>
              <p className="text-xs text-muted-foreground">24% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">4</div>
              <p className="text-xs text-muted-foreground">9% of total</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reports by title, ID, author..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-mono text-sm">{report.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{report.summary}</div>
                        </TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${
                              report.status === "completed"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : report.status === "in-progress"
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            }`}
                          >
                            {report.status === "completed"
                              ? "Completed"
                              : report.status === "in-progress"
                              ? "In Progress"
                              : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`/placeholder.svg?height=24&width=24&text=${report.authorAvatar}`} />
                              <AvatarFallback>{report.authorAvatar}</AvatarFallback>
                            </Avatar>
                            <span>{report.author}</span>
                          </div>
                        </TableCell>
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
                                View Report
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Edit Report
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant="outline"
                        className={`${
                          report.status === "completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : report.status === "in-progress"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }`}
                      >
                        {report.status === "completed"
                          ? "Completed"
                          : report.status === "in-progress"
                          ? "In Progress"
                          : "Draft"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Report</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Edit Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{report.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID:</span>
                        <span className="font-mono">{report.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span>{report.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={`/placeholder.svg?height=24&width=24&text=${report.authorAvatar}`} />
                          <AvatarFallback>{report.authorAvatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{report.author}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
