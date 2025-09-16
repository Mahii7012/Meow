import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, FileText } from "lucide-react"

const prescriptions = [
  {
    id: "RX-001",
    patient: "John Smith",
    medication: "Metformin 850mg",
    status: "pending",
    time: "10 min ago",
  },
  {
    id: "RX-002",
    patient: "Mary Johnson",
    medication: "Lisinopril 10mg",
    status: "ready",
    time: "25 min ago",
  },
  {
    id: "RX-003",
    patient: "Robert Davis",
    medication: "Amoxicillin 500mg",
    status: "processing",
    time: "1 hour ago",
  },
  {
    id: "RX-004",
    patient: "Lisa Wilson",
    medication: "Ibuprofen 200mg",
    status: "ready",
    time: "2 hours ago",
  },
]

export function PrescriptionQueue() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Prescription Queue
            </CardTitle>
            <CardDescription>Recent prescription orders</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {prescriptions.map((rx) => (
          <div key={rx.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-foreground">{rx.patient}</p>
                <p className="text-sm text-muted-foreground">{rx.medication}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{rx.time}</span>
                </div>
              </div>
            </div>
            <Badge
              variant="outline"
              className={
                rx.status === "ready"
                  ? "text-green-700 bg-green-50 border-green-200"
                  : rx.status === "processing"
                    ? "text-blue-700 bg-blue-50 border-blue-200"
                    : "text-orange-700 bg-orange-50 border-orange-200"
              }
            >
              {rx.status.charAt(0).toUpperCase() + rx.status.slice(1)}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
