"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface InventoryTurnoverChartProps {
  timeRange: string
}

const turnoverData = [
  { month: "Jan", turnover: 5.2, stockValue: 89000 },
  { month: "Feb", turnover: 5.8, stockValue: 87000 },
  { month: "Mar", turnover: 6.1, stockValue: 85000 },
  { month: "Apr", turnover: 6.4, stockValue: 88000 },
  { month: "May", turnover: 6.2, stockValue: 89500 },
  { month: "Jun", turnover: 6.7, stockValue: 86000 },
]

export function InventoryTurnoverChart({ timeRange }: InventoryTurnoverChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Turnover</CardTitle>
        <CardDescription>Monthly inventory turnover rate</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={turnoverData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}x`, "Turnover Rate"]} />
            <Line
              type="monotone"
              dataKey="turnover"
              stroke="hsl(var(--chart-5))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-5))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
