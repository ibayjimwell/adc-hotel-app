"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: string
  name: string
  price: number
}

interface ServiceFormModalProps {
  open: boolean
  onClose: () => void
  mode: "create" | "edit"
  service?: Service | null
}

export function ServiceFormModal({ open, onClose, mode, service }: ServiceFormModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (service && mode === "edit") {
      setFormData({
        name: service.name,
        price: service.price.toString(),
      })
    } else {
      setFormData({ name: "", price: "" })
    }
    setErrors({})
  }, [service, mode, open])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Service name is required"
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Valid price is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    toast({
      title: mode === "create" ? "Service Created" : "Service Updated",
      description: `${formData.name} has been ${mode === "create" ? "added" : "updated"} successfully.`,
    })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? "Add Service" : "Edit Service"}
      description={mode === "create" ? "Add a new service to the catalog" : "Update service details"}
      size="sm"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Create Service" : "Save Changes"}</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Service Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Room Service - Breakfast"
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">
            Price (PHP) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="0.00"
          />
          {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
        </div>
      </div>
    </Modal>
  )
}
