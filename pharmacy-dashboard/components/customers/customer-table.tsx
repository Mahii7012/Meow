"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Edit, Phone, Mail, FileText, Star } from "lucide-react"

// Mock customer data
const mockCustomers = [
  {
    id: "CUST-001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-03-15",
    address: "123 Main St, Anytown, ST 12345",
    insurance: "Blue Cross Blue Shield",
    memberNumber: "BC123456789",
    registrationDate: "2023-01-15",
    lastVisit: "2024-01-10",
    totalPrescriptions: 24,
    status: "active",
    isVIP: false,
    allergies: ["Penicillin", "Sulfa"],
  },
  {
    id: "CUST-002",
    name: "Mary Johnson",
    email: "mary.johnson@email.com",
    phone: "(555) 234-5678",
    dateOfBirth: "1972-08-22",
    address: "456 Oak Ave, Somewhere, ST 67890",
    insurance: "Aetna",
    memberNumber: "AET987654321",
    registrationDate: "2022-06-20",
    lastVisit: "2024-01-14",
    totalPrescriptions: 67,
    status: "active",
    isVIP: true,
    allergies: ["Latex"],
  },
  {
    id: "CUST-003",
    name: "Robert Davis",
    email: "robert.davis@email.com",
    phone: "(555) 345-6789",
    dateOfBirth: "1990-12-05",
    address: "789 Pine Rd, Elsewhere, ST 13579",
    insurance: "Medicare",
    memberNumber: "MED456789123",
    registrationDate: "2024-01-01",
    lastVisit: "2024-01-12",
    totalPrescriptions: 3,
    status: "new",
    isVIP: false,
    allergies: [],
  },
  {
    id: "CUST-004",
    name: "Lisa Wilson",
    email: "lisa.wilson@email.com",
    phone: "(555) 456-7890",
    dateOfBirth: "1988-06-18",
    address: "321 Elm St, Nowhere, ST 24680",
    insurance: "Cigna",
    memberNumber: "CIG789123456",
    registrationDate: "2021-09-10",
    lastVisit: "2023-12-20",
    totalPrescriptions: 45,
    status: "inactive",
    isVIP: false,
    allergies: ["Aspirin", "Codeine"],
  },
  {
    id: "CUST-005",
    name: "James Brown",
    email: "james.brown@email.com",
    phone: "(555) 567-8901",
    dateOfBirth: "1965-11-30",
    address: "654 Maple Dr, Anywhere, ST 97531",
    insurance: "United Healthcare",
    memberNumber: "UHC321654987",
    registrationDate: "2020-03-25",
    lastVisit: "2024-01-13",
    totalPrescriptions: 89,
    status: "active",
    isVIP: true,
    allergies: ["Shellfish"],
  },
]

interface CustomerTableProps {
  searchTerm: string
  filter: string
}

export function CustomerTable({ searchTerm, filter }: CustomerTableProps) {
  const [customers] = useState(mockCustomers)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesFilter = true
    switch (filter) {
      case "active":
        matchesFilter = customer.status === "active"
        break
      case "new":
        const registrationDate = new Date(customer.registrationDate)
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        matchesFilter = registrationDate >= oneMonthAgo
        break
      case "vip":
        matchesFilter = customer.isVIP
        break
      default:
        matchesFilter = true
    }

    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="text-gray-700 bg-gray-50 border-gray-200">
            Inactive
          </Badge>
        )
      case "new":
        return (
          <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200">
            New
          </Badge>
        )
      default:
        return null
    }
  }

  const getLastVisitColor = (lastVisit: string) => {
    const visitDate = new Date(lastVisit)
    const today = new Date()
    const diffTime = today.getTime() - visitDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > 90) return "text-red-600"
    if (diffDays > 30) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Insurance</TableHead>
            <TableHead>Prescriptions</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`/ceholder-svg-key-customer-.jpg?key=customer-${customer.id}&height=40&width=40&query=${customer.name}`}
                    />
                    <AvatarFallback>
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{customer.name}</p>
                      {customer.isVIP && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      DOB: {new Date(customer.dateOfBirth).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{customer.phone}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{customer.address}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{customer.insurance}</p>
                  <p className="text-sm text-muted-foreground">{customer.memberNumber}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{customer.totalPrescriptions}</span>
                </div>
                {customer.allergies.length > 0 && (
                  <div className="mt-1">
                    <Badge variant="outline" className="text-red-700 bg-red-50 border-red-200 text-xs">
                      Allergies: {customer.allergies.length}
                    </Badge>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <span className={`text-sm font-medium ${getLastVisitColor(customer.lastVisit)}`}>
                  {new Date(customer.lastVisit).toLocaleDateString()}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {getStatusBadge(customer.status)}
                  {customer.isVIP && (
                    <Badge variant="outline" className="text-purple-700 bg-purple-50 border-purple-200 text-xs">
                      VIP
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" title="View Profile">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Edit Customer">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Call Customer">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="View Prescriptions">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
