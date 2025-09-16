"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PrescriptionVolumeChartProps {
  timeRange: string
}

const prescriptionData = [
  { day: "Mon", filled: 45, pending: 12 },
  { day: "Tue", filled: 52, pending: 8 },
  { day: "Wed", filled: 38, pending: 15 },
  { day: "Thu", filled: 61, pending: 9 },
  { day: "Fri", filled: 73, pending: 6 },
  { day: "Sat", filled: 29, pending: 4 },
  { day: "Sun", filled: 18, pending: 2 },
]

export function PrescriptionVolumeChart({ timeRange }: PrescriptionVolumeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescription Volume</CardTitle>
        <CardDescription>Daily prescription processing volume</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={prescriptionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="filled" fill="hsl(var(--chart-1))" name="Filled" />
            <Bar dataKey="pending" fill="hsl(var(--chart-2))" name="Pending" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
