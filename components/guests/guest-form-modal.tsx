"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Guest {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  idType: string
  idNumber: string
  lastStayDate: string
}

interface GuestFormModalProps {
  open: boolean
  onClose: () => void
  mode: "create" | "edit"
  guest?: Guest | null
}

const idTypes = [
  "Philippine Passport",
  "Driver's License",
  "Philippine ID",
  "Passport",
  "UMID",
  "SSS ID",
  "PhilHealth ID",
]

export function GuestFormModal({ open, onClose, mode, guest }: GuestFormModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    idType: "",
    idNumber: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (guest && mode === "edit") {
      setFormData({
        firstName: guest.firstName,
        lastName: guest.lastName,
        phone: guest.phone,
        email: guest.email,
        idType: guest.idType,
        idNumber: guest.idNumber,
      })
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        idType: "",
        idNumber: "",
      })
    }
    setErrors({})
  }, [guest, mode, open])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.idType) newErrors.idType = "ID type is required"
    if (!formData.idNumber.trim()) newErrors.idNumber = "ID number is required"
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    // Simulate API call
    toast({
      title: mode === "create" ? "Guest Created" : "Guest Updated",
      description: `${formData.firstName} ${formData.lastName} has been ${mode === "create" ? "added" : "updated"} successfully.`,
    })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? "Add New Guest" : "Edit Guest"}
      description={mode === "create" ? "Enter the guest's information below" : "Update the guest's information"}
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Create Guest" : "Save Changes"}</Button>
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Enter first name"
          />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Enter last name"
          />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone (Optional)</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+63 XXX XXX XXXX"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="guest@email.com"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="idType">
            ID Type <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.idType} onValueChange={(value) => setFormData({ ...formData, idType: value })}>
            <SelectTrigger id="idType">
              <SelectValue placeholder="Select ID type" />
            </SelectTrigger>
            <SelectContent>
              {idTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.idType && <p className="text-xs text-destructive">{errors.idType}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="idNumber">
            ID Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="idNumber"
            value={formData.idNumber}
            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
            placeholder="Enter ID number"
          />
          {errors.idNumber && <p className="text-xs text-destructive">{errors.idNumber}</p>}
        </div>
      </div>
    </Modal>
  )
}
