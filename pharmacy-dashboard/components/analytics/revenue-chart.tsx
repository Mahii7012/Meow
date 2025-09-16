"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RevenueChartProps {
  timeRange: string
}

const revenueData = [
  { date: "Jan 1", revenue: 2400, prescriptions: 45 },
  { date: "Jan 8", revenue: 1398, prescriptions: 32 },
  { date: "Jan 15", revenue: 9800, prescriptions: 78 },
  { date: "Jan 22", revenue: 3908, prescriptions: 56 },
  { date: "Jan 29", revenue: 4800, prescriptions: 67 },
  { date: "Feb 5", revenue: 3800, prescriptions: 54 },
  { date: "Feb 12", revenue: 4300, prescriptions: 61 },
]

export function RevenueChart({ timeRange }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        <CardDescription>Daily revenue over the selected period</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                name === "revenue" ? `$${value}` : value,
                name === "revenue" ? "Revenue" : "Prescriptions",
              ]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-1))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
