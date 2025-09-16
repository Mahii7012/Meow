import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, Calendar } from "lucide-react"

const stats = [
  {
    title: "Total Items",
    value: "1,247",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Low Stock Alerts",
    value: "23",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    title: "Expiring Soon",
    value: "8",
    icon: Calendar,
    color: "text-red-600",
  },
  {
    title: "Total Value",
    value: "$89,450",
    icon: TrendingUp,
    color: "text-green-600",
  },
]

export function InventoryStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
