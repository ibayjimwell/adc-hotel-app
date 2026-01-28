"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface RoomType {
  id: string
  name: string
  description: string
  basePrice: number
  capacity: number
  roomCount: number
}

interface RoomTypeFormModalProps {
  open: boolean
  onClose: () => void
  mode: "create" | "edit"
  roomType?: RoomType | null
}

export function RoomTypeFormModal({ open, onClose, mode, roomType }: RoomTypeFormModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    capacity: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (roomType && mode === "edit") {
      setFormData({
        name: roomType.name,
        description: roomType.description,
        basePrice: roomType.basePrice.toString(),
        capacity: roomType.capacity.toString(),
      })
    } else {
      setFormData({
        name: "",
        description: "",
        basePrice: "",
        capacity: "",
      })
    }
    setErrors({})
  }, [roomType, mode, open])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.basePrice || Number(formData.basePrice) <= 0) {
      newErrors.basePrice = "Valid base price is required"
    }
    if (!formData.capacity || Number(formData.capacity) <= 0) {
      newErrors.capacity = "Valid capacity is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    toast({
      title: mode === "create" ? "Room Type Created" : "Room Type Updated",
      description: `${formData.name} has been ${mode === "create" ? "added" : "updated"} successfully.`,
    })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? "Add Room Type" : "Edit Room Type"}
      description={mode === "create" ? "Create a new room category" : "Update room type details"}
      size="md"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Create Room Type" : "Save Changes"}</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Deluxe Room"
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the room type..."
            rows={3}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="basePrice">
              Base Price (PHP) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="basePrice"
              type="number"
              min="0"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              placeholder="0.00"
            />
            {errors.basePrice && <p className="text-xs text-destructive">{errors.basePrice}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">
              Capacity (Guests) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              placeholder="2"
            />
            {errors.capacity && <p className="text-xs text-destructive">{errors.capacity}</p>}
          </div>
        </div>
      </div>
    </Modal>
  )
}
