import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"

const stats = [
  {
    title: "Total Prescriptions",
    value: "156",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Pending Review",
    value: "12",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Ready for Pickup",
    value: "8",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Urgent Orders",
    value: "3",
    icon: AlertCircle,
    color: "text-red-600",
  },
]

export function PrescriptionStats() {
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
