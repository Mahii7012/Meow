"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Plus, Minus } from "lucide-react"

// Mock inventory data
const mockInventory = [
  {
    id: "MED-001",
    name: "Amoxicillin",
    strength: "500mg",
    form: "Capsule",
    manufacturer: "Pfizer",
    currentStock: 150,
    minStock: 50,
    maxStock: 500,
    unitPrice: 0.85,
    expiryDate: "2025-08-15",
    batchNumber: "AMX2024001",
    location: "A1-B2",
  },
  {
    id: "MED-002",
    name: "Ibuprofen",
    strength: "200mg",
    form: "Tablet",
    manufacturer: "Johnson & Johnson",
    currentStock: 28,
    minStock: 100,
    maxStock: 300,
    unitPrice: 0.12,
    expiryDate: "2024-12-20",
    batchNumber: "IBU2024002",
    location: "A2-C1",
  },
  {
    id: "MED-003",
    name: "Metformin",
    strength: "850mg",
    form: "Tablet",
    manufacturer: "Teva",
    currentStock: 245,
    minStock: 75,
    maxStock: 400,
    unitPrice: 0.35,
    expiryDate: "2025-06-10",
    batchNumber: "MET2024003",
    location: "B1-A3",
  },
  {
    id: "MED-004",
    name: "Lisinopril",
    strength: "10mg",
    form: "Tablet",
    manufacturer: "Novartis",
    currentStock: 8,
    minStock: 40,
    maxStock: 200,
    unitPrice: 0.45,
    expiryDate: "2024-11-30",
    batchNumber: "LIS2024004",
    location: "B2-D1",
  },
  {
    id: "MED-005",
    name: "Omeprazole",
    strength: "20mg",
    form: "Capsule",
    manufacturer: "AstraZeneca",
    currentStock: 180,
    minStock: 60,
    maxStock: 300,
    unitPrice: 0.75,
    expiryDate: "2025-04-25",
    batchNumber: "OME2024005",
    location: "C1-B2",
  },
]

interface InventoryTableProps {
  searchTerm: string
}

export function InventoryTable({ searchTerm }: InventoryTableProps) {
  const [inventory, setInventory] = useState(mockInventory)

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStockStatus = (current: number, min: number) => {
    if (current <= min * 0.5) return { label: "Critical", color: "text-red-700 bg-red-50 border-red-200" }
    if (current <= min) return { label: "Low", color: "text-orange-700 bg-orange-50 border-orange-200" }
    return { label: "Good", color: "text-green-700 bg-green-50 border-green-200" }
  }

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 90 // Expiring within 90 days
  }

  const adjustStock = (id: string, adjustment: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, currentStock: Math.max(0, item.currentStock + adjustment) } : item,
      ),
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Medication</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Stock Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.map((item) => {
            const stockStatus = getStockStatus(item.currentStock, item.minStock)
            const expiringSoon = isExpiringSoon(item.expiryDate)

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.strength} {item.form}
                    </p>
                    <p className="text-xs text-muted-foreground">Batch: {item.batchNumber}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.manufacturer}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustStock(item.id, -1)}
                      className="h-6 w-6 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-medium min-w-[3rem] text-center">{item.currentStock}</span>
                    <Button variant="outline" size="sm" onClick={() => adjustStock(item.id, 1)} className="h-6 w-6 p-0">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Min: {item.minStock} | Max: {item.maxStock}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={stockStatus.color}>
                    {stockStatus.label}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">${item.unitPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className={expiringSoon ? "text-red-600 font-medium" : "text-foreground"}>
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </span>
                    {expiringSoon && (
                      <Badge variant="outline" className="text-red-700 bg-red-50 border-red-200 text-xs">
                        Expiring Soon
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.location}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
