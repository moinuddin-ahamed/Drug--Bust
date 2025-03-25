import { Flag, User, Bot, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function ChatThread() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-2">
          <User className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium">@crypto_dealer</h3>
        <p className="text-sm text-muted-foreground">Telegram</p>

        <div className="flex gap-2 mt-4">
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            High Risk
          </Badge>
          <Badge variant="outline">Active</Badge>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Conversation</h4>
          <Button variant="outline" size="sm">
            <Flag className="h-4 w-4 mr-2" />
            Flag
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
              <p className="text-sm">I've got the special package ready for pickup. Same location as last time.</p>
              <span className="text-xs text-muted-foreground mt-1 block">10:23 AM</span>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <div className="bg-primary p-3 rounded-lg rounded-tr-none max-w-[80%] text-primary-foreground">
              <p className="text-sm">Perfect. What's the price this time?</p>
              <span className="text-xs text-primary-foreground/70 mt-1 block">10:25 AM</span>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
              <p className="text-sm">Same as before. 5k per unit. Bulk discount available if you take more than 10.</p>
              <span className="text-xs text-muted-foreground mt-1 block">10:28 AM</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">AI Analysis</h4>

        <div className="bg-muted/50 p-4 rounded-lg border border-muted">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full text-primary flex-shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-medium text-sm">Analysis Report</h5>
              <p className="text-sm text-muted-foreground mt-1">
                This conversation contains multiple suspicious keywords and patterns consistent with drug trafficking.
                The terms "package," "pickup," "location," "price," "unit," and "bulk discount" are commonly used code
                words in narcotics transactions.
              </p>

              <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  Recommended action: Continue monitoring and gather additional evidence. Consider initiating formal
                  investigation based on pattern matching with previous cases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

