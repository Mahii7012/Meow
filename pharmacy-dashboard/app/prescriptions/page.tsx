"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { PrescriptionTable } from "@/components/prescriptions/prescription-table"
import { PrescriptionStats } from "@/components/prescriptions/prescription-stats"
import { NewPrescriptionDialog } from "@/components/prescriptions/new-prescription-dialog"
import { Search, Plus, Filter, FileText } from "lucide-react"

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Prescription Management</h1>
              <p className="text-muted-foreground">Process and track prescription orders</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Print Queue
              </Button>
              <Button onClick={() => setShowNewDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Prescription
              </Button>
            </div>
          </div>

          <PrescriptionStats />

          <Card>
            <CardHeader>
              <CardTitle>Prescription Orders</CardTitle>
              <CardDescription>Manage all prescription orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search prescriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="ready">Ready</TabsTrigger>
                  <TabsTrigger value="dispensed">Dispensed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <PrescriptionTable searchTerm={searchTerm} status="all" />
                </TabsContent>
                <TabsContent value="pending" className="mt-6">
                  <PrescriptionTable searchTerm={searchTerm} status="pending" />
                </TabsContent>
                <TabsContent value="processing" className="mt-6">
                  <PrescriptionTable searchTerm={searchTerm} status="processing" />
                </TabsContent>
                <TabsContent value="ready" className="mt-6">
                  <PrescriptionTable searchTerm={searchTerm} status="ready" />
                </TabsContent>
                <TabsContent value="dispensed" className="mt-6">
                  <PrescriptionTable searchTerm={searchTerm} status="dispensed" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>

      <NewPrescriptionDialog open={showNewDialog} onOpenChange={setShowNewDialog} />
    </div>
  )
}
