"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  MessageSquare,
  ChevronRight,
  TextIcon as Telegram,
  PhoneIcon as WhatsAppIcon,
  Instagram,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChatThread } from "@/components/chat-thread"

export default function ChatAnalysisPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Chat Analysis</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Message Intelligence</h2>
            <p className="text-muted-foreground">Analyze and extract intelligence from messaging platforms</p>
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
              <Search className="mr-2 h-4 w-4" />
              New Scan
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Flagged Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">267</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Identified Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+12 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Linked Suspects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+7 new this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <Card className="md:col-span-8">
            <CardHeader>
              <CardTitle>Message Analysis</CardTitle>
              <CardDescription>Review and analyze suspicious conversations</CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search messages, keywords..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="telegram">Telegram</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recent">
                <TabsList className="mb-4">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="flagged">Flagged</TabsTrigger>
                  <TabsTrigger value="analyzed">Analyzed</TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="space-y-4">
                  {[
                    {
                      id: "chat-1",
                      platform: "telegram",
                      icon: <Telegram className="h-5 w-5 text-blue-500" />,
                      handle: "@crypto_dealer",
                      lastMessage: "I've got the special package ready for pickup. Same location as last time.",
                      time: "10:23 AM",
                      date: "Today",
                      flagged: true,
                      keywords: ["package", "pickup", "location"],
                    },
                    {
                      id: "chat-2",
                      platform: "whatsapp",
                      icon: <WhatsAppIcon className="h-5 w-5 text-green-500" />,
                      handle: "+91 98765 43210",
                      lastMessage: "The merchandise is high quality. My customers are very satisfied with the product.",
                      time: "Yesterday",
                      date: "9:45 PM",
                      flagged: true,
                      keywords: ["merchandise", "product", "customers"],
                    },
                    {
                      id: "chat-3",
                      platform: "instagram",
                      icon: <Instagram className="h-5 w-5 text-pink-500" />,
                      handle: "party_supplies_24x7",
                      lastMessage: "I can deliver the party favors tonight. Cash only, no digital transactions.",
                      time: "Yesterday",
                      date: "6:12 PM",
                      flagged: true,
                      keywords: ["party favors", "cash only", "deliver"],
                    },
                  ].map((chat) => (
                    <div key={chat.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                          {chat.icon}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{chat.handle}</h3>
                            {chat.flagged && (
                              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                Flagged
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{chat.lastMessage}</p>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {chat.keywords.map((keyword) => (
                              <Badge key={keyword} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>

                          <div className="text-xs text-muted-foreground mt-2">
                            {chat.time} · {chat.date}
                          </div>
                        </div>
                      </div>

                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="flagged">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Select a conversation</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Choose a flagged conversation from the list to view details
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="analyzed">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Select a conversation</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Choose an analyzed conversation from the list to view details
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Conversation Details</CardTitle>
              <CardDescription>Selected chat analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ChatThread />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

