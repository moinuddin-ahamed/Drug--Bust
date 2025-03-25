import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, FileText, Users } from "lucide-react"

export function UpcomingScheduleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Schedule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Badge className="mb-2 bg-red-100 text-red-800 hover:bg-red-100">Priority</Badge>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Chat analysis for court submission</h3>
              <p className="text-sm text-muted-foreground mt-1">Today - 11:30 AM</p>
            </div>
          </div>
        </div>

        <div>
          <Badge className="mb-2 bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Review #104421 analysis results</h3>
              <p className="text-sm text-muted-foreground mt-1">Today - 2:00 PM</p>
            </div>
          </div>
        </div>

        <div>
          <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-100">Standard</Badge>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Team briefing on Operation "Dark Web"</h3>
              <p className="text-sm text-muted-foreground mt-1">Tomorrow - 9:00 AM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

