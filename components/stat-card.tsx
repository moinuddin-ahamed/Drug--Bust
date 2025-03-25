import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  description: string
  icon: React.ReactNode
}

export function StatCard({ title, value, change, trend, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{title}</span>
          <div className="p-2 bg-primary/10 rounded-full text-primary">{icon}</div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold">{value}</div>
          <div className="flex items-center mt-1 text-sm">
            <div
              className={`flex items-center ${
                trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
              }`}
            >
              {trend === "up" ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : trend === "down" ? (
                <ArrowDown className="h-4 w-4 mr-1" />
              ) : null}
              {change}
            </div>
            <div className="text-muted-foreground ml-2">{description}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

