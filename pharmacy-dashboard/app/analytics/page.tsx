"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { PrescriptionVolumeChart } from "@/components/analytics/prescription-volume-chart"
import { TopMedicationsChart } from "@/components/analytics/top-medications-chart"
import { CustomerDemographicsChart } from "@/components/analytics/customer-demographics-chart"
import { InventoryTurnoverChart } from "@/components/analytics/inventory-turnover-chart"
import { AnalyticsKPIs } from "@/components/analytics/analytics-kpis"
import { Download, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Insights and performance metrics for your pharmacy</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <AnalyticsKPIs timeRange={timeRange} />

          <Tabs defaultValue="revenue" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart timeRange={timeRange} />
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                    <CardDescription>Revenue sources for the selected period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Prescription Sales</span>
                        <span className="font-medium">$18,450 (75%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">OTC Products</span>
                        <span className="font-medium">$4,920 (20%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Consultation Fees</span>
                        <span className="font-medium">$1,210 (5%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PrescriptionVolumeChart timeRange={timeRange} />
                <Card>
                  <CardHeader>
                    <CardTitle>Prescription Metrics</CardTitle>
                    <CardDescription>Key prescription statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Average Processing Time</span>
                        <span className="font-medium">12 minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Same-Day Fulfillment</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                        <span className="font-medium">4.8/5.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InventoryTurnoverChart timeRange={timeRange} />
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Health</CardTitle>
                    <CardDescription>Current inventory status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Items in Stock</span>
                        <span className="font-medium">1,247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Low Stock Items</span>
                        <span className="font-medium text-orange-600">23</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Expiring Soon</span>
                        <span className="font-medium text-red-600">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Avg. Turnover Rate</span>
                        <span className="font-medium">6.2x/year</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CustomerDemographicsChart timeRange={timeRange} />
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Insights</CardTitle>
                    <CardDescription>Customer behavior and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Customers</span>
                        <span className="font-medium">2,847</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">New This Month</span>
                        <span className="font-medium text-green-600">127</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Retention Rate</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Avg. Prescriptions/Customer</span>
                        <span className="font-medium">8.4</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="medications" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopMedicationsChart timeRange={timeRange} />
                <Card>
                  <CardHeader>
                    <CardTitle>Medication Trends</CardTitle>
                    <CardDescription>Popular medications and categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Most Prescribed</span>
                        <span className="font-medium">Metformin (156 Rx)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Fastest Growing</span>
                        <span className="font-medium">Ozempic (+45%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Top Category</span>
                        <span className="font-medium">Diabetes (28%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
