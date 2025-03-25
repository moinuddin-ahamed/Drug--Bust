"use client"

import { useState } from "react"
import {
  Search,
  Send,
  HelpCircle,
  FileText,
  MessageSquare,
  ChevronRight,
  Book,
  Lightbulb,
  Headphones,
  Mail,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [issueType, setIssueType] = useState("technical")
  const [issueDescription, setIssueDescription] = useState("")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Support</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Help & Support</h2>
          <p className="text-muted-foreground">Get help with the system and report issues</p>
        </div>

        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for help articles, FAQs..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="help" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="help">Help Center</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="help" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-primary" />
                    User Guides
                  </CardTitle>
                  <CardDescription>Comprehensive system documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Getting Started Guide</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Dashboard Overview</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Suspect Management</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Intelligence Analysis</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Report Generation</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Guides
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Tutorials
                  </CardTitle>
                  <CardDescription>Step-by-step guides and videos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Setting Up Surveillance Points</span>
                      <Badge variant="outline">Video</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Chat Analysis Techniques</span>
                      <Badge variant="outline">Video</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Creating Custom Reports</span>
                      <Badge variant="outline">Guide</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Database Query Basics</span>
                      <Badge variant="outline">Guide</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Advanced Intelligence Gathering</span>
                      <Badge variant="outline">Video</Badge>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Tutorials
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Recent Updates
                  </CardTitle>
                  <CardDescription>Latest system changes and features</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <div>
                        <span className="block">Enhanced Chat Analysis</span>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <Badge>New</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <span className="block">Improved Map Integration</span>
                        <span className="text-xs text-muted-foreground">1 week ago</span>
                      </div>
                      <Badge>Update</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <span className="block">Database Performance</span>
                        <span className="text-xs text-muted-foreground">2 weeks ago</span>
                      </div>
                      <Badge>Fix</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <span className="block">New Report Templates</span>
                        <span className="text-xs text-muted-foreground">3 weeks ago</span>
                      </div>
                      <Badge>New</Badge>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Updates
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions and answers</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I add a new suspect to the system?</AccordionTrigger>
                    <AccordionContent>
                      To add a new suspect, navigate to the Suspects page and click the "Add Suspect" button in the top
                      right corner. Fill in the required information in the form and click "Save" to add the suspect to
                      the database.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How can I generate a report for a specific case?</AccordionTrigger>
                    <AccordionContent>
                      To generate a report, go to the Reports page and click "New Report". Select the case from the
                      dropdown menu, choose the report template, and fill in the required information. You can preview
                      the report before finalizing it.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I set up surveillance for a specific location?</AccordionTrigger>
                    <AccordionContent>
                      Navigate to the Surveillance page and click "Add Location". Enter the location details, select the
                      surveillance type, and assign personnel if needed. You can then monitor the location from the
                      surveillance map.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How can I analyze chat logs from messaging platforms?</AccordionTrigger>
                    <AccordionContent>
                      Go to the Chat Analysis page and click "New Scan". Upload the chat logs or connect to the platform
                      API, select the analysis parameters, and run the scan. The system will automatically flag
                      suspicious messages and patterns.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I backup the database?</AccordionTrigger>
                    <AccordionContent>
                      Navigate to the Database page and select the "Backups" tab. Click "Create Backup" to manually
                      initiate a backup. You can also configure automatic backups in the Settings page under the System
                      tab.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>How can I track a suspect's location in real-time?</AccordionTrigger>
                    <AccordionContent>
                      From the Suspects page, select the suspect and click "Track Location". This will open the
                      surveillance map with real-time tracking enabled. You can also set up alerts for specific location
                      boundaries.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                    <AccordionContent>
                      Go to the Settings page and select the Security tab. Under "Change Password", enter your current
                      password and the new password twice. Click "Save Changes" to update your password.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Submit a Support Ticket</CardTitle>
                  <CardDescription>Get help from our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="issueType">Issue Type</Label>
                      <Select value={issueType} onValueChange={setIssueType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="account">Account Problem</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="question">General Question</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Brief description of the issue" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Please provide details about your issue..."
                        rows={5}
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="attachments">Attachments (Optional)</Label>
                      <Input id="attachments" type="file" multiple />
                      <p className="text-xs text-muted-foreground mt-1">
                        You can attach screenshots or relevant files (max 5MB each)
                      </p>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Ticket
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="h-5 w-5 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h3 className="font-medium">Email Support</h3>
                          <p className="text-sm text-muted-foreground">support@drugbust.gov.in</p>
                          <p className="text-xs text-muted-foreground mt-1">Response time: Within 24 hours</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Headphones className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h3 className="font-medium">Phone Support</h3>
                          <p className="text-sm text-muted-foreground">+91 11 2345 6789</p>
                          <p className="text-xs text-muted-foreground mt-1">Available: Mon-Fri, 9:00 AM - 5:00 PM</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h3 className="font-medium">Live Chat</h3>
                          <p className="text-sm text-muted-foreground">Available for urgent issues</p>
                          <p className="text-xs text-muted-foreground mt-1">Available: 24/7 for critical issues</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Support Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">System Status</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Operational
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Ticket Status</span>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          No Active Tickets
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Response Time</span>
                        <span className="text-sm font-medium">4 hours</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

