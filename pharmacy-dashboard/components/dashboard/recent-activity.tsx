import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

const activities = [
  {
    user: "Dr. Sarah Johnson",
    action: "Dispensed prescription RX-001 for John Smith",
    time: "5 minutes ago",
    type: "prescription",
  },
  {
    user: "Mike Chen",
    action: "Updated inventory for Amoxicillin 500mg",
    time: "15 minutes ago",
    type: "inventory",
  },
  {
    user: "Dr. Sarah Johnson",
    action: "Added new customer Mary Wilson",
    time: "1 hour ago",
    type: "customer",
  },
  {
    user: "System",
    action: "Low stock alert for Ibuprofen 200mg",
    time: "2 hours ago",
    type: "alert",
  },
  {
    user: "Lisa Rodriguez",
    action: "Processed payment for prescription RX-045",
    time: "3 hours ago",
    type: "payment",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-500" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest actions in your pharmacy system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=${activity.user}`} />
              <AvatarFallback>
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{activity.time}</span>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    activity.type === "prescription"
                      ? "text-blue-700 bg-blue-50 border-blue-200"
                      : activity.type === "inventory"
                        ? "text-purple-700 bg-purple-50 border-purple-200"
                        : activity.type === "customer"
                          ? "text-green-700 bg-green-50 border-green-200"
                          : activity.type === "alert"
                            ? "text-red-700 bg-red-50 border-red-200"
                            : "text-orange-700 bg-orange-50 border-orange-200"
                  }`}
                >
                  {activity.type}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
