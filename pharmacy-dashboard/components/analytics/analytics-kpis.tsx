import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, FileText, Users, Package } from "lucide-react"

interface AnalyticsKPIsProps {
  timeRange: string
}

export function AnalyticsKPIs({ timeRange }: AnalyticsKPIsProps) {
  const kpis = [
    {
      title: "Total Revenue",
      value: "$24,580",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Prescriptions Filled",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Active Customers",
      value: "892",
      change: "+5.1%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Inventory Turnover",
      value: "6.2x",
      change: "-2.3%",
      trend: "down",
      icon: Package,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {kpi.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <Badge
                variant="outline"
                className={`text-xs ${
                  kpi.trend === "up"
                    ? "text-green-700 bg-green-50 border-green-200"
                    : "text-red-700 bg-red-50 border-red-200"
                }`}
              >
                {kpi.change}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
