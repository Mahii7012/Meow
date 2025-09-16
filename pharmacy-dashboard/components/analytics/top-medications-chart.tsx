"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TopMedicationsChartProps {
  timeRange: string
}

const medicationData = [
  { name: "Metformin", prescriptions: 156, revenue: 4680 },
  { name: "Lisinopril", prescriptions: 134, revenue: 3890 },
  { name: "Amoxicillin", prescriptions: 98, revenue: 2940 },
  { name: "Ibuprofen", prescriptions: 87, revenue: 1740 },
  { name: "Omeprazole", prescriptions: 76, revenue: 2280 },
]

export function TopMedicationsChart({ timeRange }: TopMedicationsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Medications</CardTitle>
        <CardDescription>Most prescribed medications by volume</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={medicationData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip formatter={(value) => [`${value} prescriptions`, "Volume"]} />
            <Bar dataKey="prescriptions" fill="hsl(var(--chart-3))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
