import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function RecentActivityCard() {
  return (
    <Card className="bg-slate-900 text-white">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-slate-400">10:40 AM, Today</div>
          <h3 className="text-xl font-bold mt-1">3 new suspects identified!</h3>
          <p className="text-sm text-slate-300 mt-2">
            Please review the identified suspects and ensure all findings are accurate.
          </p>
        </div>

        <div>
          <div className="text-sm text-slate-400">09:15 AM, Today</div>
          <h3 className="text-lg font-bold mt-1">New intelligence report</h3>
          <p className="text-sm text-slate-300 mt-2">Intelligence report #104421 has been submitted for review.</p>
        </div>

        <div>
          <div className="text-sm text-slate-400">Yesterday</div>
          <h3 className="text-lg font-bold mt-1">Operation "Silent Watch" completed</h3>
          <p className="text-sm text-slate-300 mt-2">All targets have been successfully monitored. Report available.</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          See All Activity
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

