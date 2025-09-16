"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Edit, Printer, CheckCircle, Clock, AlertTriangle } from "lucide-react"

// Mock prescription data
const mockPrescriptions = [
  {
    id: "RX-001",
    patientName: "John Smith",
    patientDOB: "1985-03-15",
    doctorName: "Dr. Emily Johnson",
    medication: "Amoxicillin 500mg",
    dosage: "1 capsule 3 times daily",
    quantity: 21,
    refills: 2,
    status: "pending",
    priority: "normal",
    dateReceived: "2024-01-15T10:30:00",
    insurance: "Blue Cross",
  },
  {
    id: "RX-002",
    patientName: "Mary Wilson",
    patientDOB: "1972-08-22",
    doctorName: "Dr. Michael Brown",
    medication: "Metformin 850mg",
    dosage: "1 tablet twice daily",
    quantity: 60,
    refills: 5,
    status: "processing",
    priority: "normal",
    dateReceived: "2024-01-15T09:15:00",
    insurance: "Aetna",
  },
  {
    id: "RX-003",
    patientName: "Robert Davis",
    patientDOB: "1990-12-05",
    doctorName: "Dr. Sarah Lee",
    medication: "Lisinopril 10mg",
    dosage: "1 tablet daily",
    quantity: 30,
    refills: 3,
    status: "ready",
    priority: "urgent",
    dateReceived: "2024-01-14T16:45:00",
    insurance: "Medicare",
  },
  {
    id: "RX-004",
    patientName: "Lisa Johnson",
    patientDOB: "1988-06-18",
    doctorName: "Dr. David Wilson",
    medication: "Ibuprofen 200mg",
    dosage: "1-2 tablets as needed",
    quantity: 100,
    refills: 1,
    status: "dispensed",
    priority: "normal",
    dateReceived: "2024-01-14T14:20:00",
    insurance: "Cigna",
  },
  {
    id: "RX-005",
    patientName: "James Brown",
    patientDOB: "1965-11-30",
    doctorName: "Dr. Jennifer Davis",
    medication: "Omeprazole 20mg",
    dosage: "1 capsule daily",
    quantity: 30,
    refills: 2,
    status: "pending",
    priority: "urgent",
    dateReceived: "2024-01-15T11:00:00",
    insurance: "United Healthcare",
  },
]

interface PrescriptionTableProps {
  searchTerm: string
  status: string
}

export function PrescriptionTable({ searchTerm, status }: PrescriptionTableProps) {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions)

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = status === "all" || prescription.status === status

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string, priority: string) => {
    const baseClasses = "flex items-center gap-1"

    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className={`${baseClasses} text-orange-700 bg-orange-50 border-orange-200`}>
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className={`${baseClasses} text-blue-700 bg-blue-50 border-blue-200`}>
            <AlertTriangle className="h-3 w-3" />
            Processing
          </Badge>
        )
      case "ready":
        return (
          <Badge variant="outline" className={`${baseClasses} text-green-700 bg-green-50 border-green-200`}>
            <CheckCircle className="h-3 w-3" />
            Ready
          </Badge>
        )
      case "dispensed":
        return (
          <Badge variant="outline" className={`${baseClasses} text-gray-700 bg-gray-50 border-gray-200`}>
            <CheckCircle className="h-3 w-3" />
            Dispensed
          </Badge>
        )
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    if (priority === "urgent") {
      return (
        <Badge variant="outline" className="text-red-700 bg-red-50 border-red-200 text-xs">
          Urgent
        </Badge>
      )
    }
    return null
  }

  const updateStatus = (id: string, newStatus: string) => {
    setPrescriptions((prev) =>
      prev.map((prescription) => (prescription.id === id ? { ...prescription, status: newStatus } : prescription)),
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Prescription Details</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Insurance</TableHead>
            <TableHead>Date Received</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPrescriptions.map((prescription) => (
            <TableRow key={prescription.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`/ceholder-svg-key-patient-.jpg?key=patient-${prescription.id}&height=32&width=32&query=${prescription.patientName}`}
                    />
                    <AvatarFallback>
                      {prescription.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{prescription.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      DOB: {new Date(prescription.patientDOB).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">ID: {prescription.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{prescription.medication}</p>
                  <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {prescription.quantity} | Refills: {prescription.refills}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{prescription.doctorName}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {getStatusBadge(prescription.status, prescription.priority)}
                  {getPriorityBadge(prescription.priority)}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{prescription.insurance}</TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(prescription.dateReceived).toLocaleDateString()}
                <br />
                <span className="text-xs">{new Date(prescription.dateReceived).toLocaleTimeString()}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" title="View Details">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Edit">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Print Label">
                    <Printer className="h-4 w-4" />
                  </Button>
                  {prescription.status === "pending" && (
                    <Button variant="outline" size="sm" onClick={() => updateStatus(prescription.id, "processing")}>
                      Process
                    </Button>
                  )}
                  {prescription.status === "processing" && (
                    <Button variant="outline" size="sm" onClick={() => updateStatus(prescription.id, "ready")}>
                      Mark Ready
                    </Button>
                  )}
                  {prescription.status === "ready" && (
                    <Button variant="outline" size="sm" onClick={() => updateStatus(prescription.id, "dispensed")}>
                      Dispense
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
