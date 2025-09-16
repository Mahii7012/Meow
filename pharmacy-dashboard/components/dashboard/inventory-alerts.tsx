import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Package } from "lucide-react"

const lowStockItems = [
  { name: "Amoxicillin 500mg", current: 12, minimum: 50, status: "critical" },
  { name: "Ibuprofen 200mg", current: 28, minimum: 100, status: "low" },
  { name: "Metformin 850mg", current: 45, minimum: 75, status: "low" },
  { name: "Lisinopril 10mg", current: 8, minimum: 40, status: "critical" },
]

export function InventoryAlerts() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Inventory Alerts
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowStockItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.current} units remaining</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={
                item.status === "critical"
                  ? "text-red-700 bg-red-50 border-red-200"
                  : "text-orange-700 bg-orange-50 border-orange-200"
              }
            >
              {item.status === "critical" ? "Critical" : "Low Stock"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
