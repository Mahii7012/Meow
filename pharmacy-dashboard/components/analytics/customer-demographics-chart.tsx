"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface CustomerDemographicsChartProps {
  timeRange: string
}

const demographicsData = [
  { name: "18-30", value: 15, color: "hsl(var(--chart-1))" },
  { name: "31-45", value: 25, color: "hsl(var(--chart-2))" },
  { name: "46-60", value: 35, color: "hsl(var(--chart-3))" },
  { name: "60+", value: 25, color: "hsl(var(--chart-4))" },
]

export function CustomerDemographicsChart({ timeRange }: CustomerDemographicsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Demographics</CardTitle>
        <CardDescription>Customer distribution by age group</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={demographicsData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {demographicsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
