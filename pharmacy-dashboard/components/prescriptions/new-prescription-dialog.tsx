"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface NewPrescriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewPrescriptionDialog({ open, onOpenChange }: NewPrescriptionDialogProps) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientDOB: "",
    patientPhone: "",
    doctorName: "",
    doctorNPI: "",
    medication: "",
    strength: "",
    dosage: "",
    quantity: "",
    refills: "",
    priority: "normal",
    insurance: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Adding prescription:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      patientName: "",
      patientDOB: "",
      patientPhone: "",
      doctorName: "",
      doctorNPI: "",
      medication: "",
      strength: "",
      dosage: "",
      quantity: "",
      refills: "",
      priority: "normal",
      insurance: "",
      notes: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Prescription Order</DialogTitle>
          <DialogDescription>Enter the prescription details to add a new order to the system.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Patient Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientDOB">Date of Birth</Label>
                <Input
                  id="patientDOB"
                  type="date"
                  value={formData.patientDOB}
                  onChange={(e) => handleInputChange("patientDOB", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientPhone">Phone Number</Label>
                <Input
                  id="patientPhone"
                  value={formData.patientPhone}
                  onChange={(e) => handleInputChange("patientPhone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance</Label>
                <Select value={formData.insurance} onValueChange={(value) => handleInputChange("insurance", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select insurance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                    <SelectItem value="aetna">Aetna</SelectItem>
                    <SelectItem value="cigna">Cigna</SelectItem>
                    <SelectItem value="medicare">Medicare</SelectItem>
                    <SelectItem value="medicaid">Medicaid</SelectItem>
                    <SelectItem value="united">United Healthcare</SelectItem>
                    <SelectItem value="cash">Cash Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Doctor Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Prescriber Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input
                  id="doctorName"
                  value={formData.doctorName}
                  onChange={(e) => handleInputChange("doctorName", e.target.value)}
                  placeholder="Dr. Emily Johnson"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctorNPI">NPI Number</Label>
                <Input
                  id="doctorNPI"
                  value={formData.doctorNPI}
                  onChange={(e) => handleInputChange("doctorNPI", e.target.value)}
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>
          </div>

          {/* Medication Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Medication Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medication">Medication Name</Label>
                <Input
                  id="medication"
                  value={formData.medication}
                  onChange={(e) => handleInputChange("medication", e.target.value)}
                  placeholder="Amoxicillin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="strength">Strength</Label>
                <Input
                  id="strength"
                  value={formData.strength}
                  onChange={(e) => handleInputChange("strength", e.target.value)}
                  placeholder="500mg"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage Instructions</Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => handleInputChange("dosage", e.target.value)}
                placeholder="Take 1 capsule 3 times daily with food"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="refills">Refills</Label>
                <Input
                  id="refills"
                  type="number"
                  value={formData.refills}
                  onChange={(e) => handleInputChange("refills", e.target.value)}
                  placeholder="2"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any special instructions or notes..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Prescription</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
