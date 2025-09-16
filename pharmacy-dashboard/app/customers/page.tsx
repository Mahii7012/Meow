"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { CustomerTable } from "@/components/customers/customer-table"
import { CustomerStats } from "@/components/customers/customer-stats"
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog"
import { Search, Plus, Filter, Users } from "lucide-react"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
              <p className="text-muted-foreground">Manage customer profiles and prescription history</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Export List
              </Button>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>

          <CustomerStats />

          <Card>
            <CardHeader>
              <CardTitle>Customer Directory</CardTitle>
              <CardDescription>View and manage all registered customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search customers..."
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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Customers</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="new">New This Month</TabsTrigger>
                  <TabsTrigger value="vip">VIP</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <CustomerTable searchTerm={searchTerm} filter="all" />
                </TabsContent>
                <TabsContent value="active" className="mt-6">
                  <CustomerTable searchTerm={searchTerm} filter="active" />
                </TabsContent>
                <TabsContent value="new" className="mt-6">
                  <CustomerTable searchTerm={searchTerm} filter="new" />
                </TabsContent>
                <TabsContent value="vip" className="mt-6">
                  <CustomerTable searchTerm={searchTerm} filter="vip" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>

      <AddCustomerDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
