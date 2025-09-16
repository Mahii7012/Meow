import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, Star, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Customers",
    value: "2,847",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "New This Month",
    value: "127",
    icon: UserPlus,
    color: "text-green-600",
  },
  {
    title: "VIP Customers",
    value: "89",
    icon: Star,
    color: "text-purple-600",
  },
  {
    title: "Active Customers",
    value: "1,892",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

export function CustomerStats() {
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
