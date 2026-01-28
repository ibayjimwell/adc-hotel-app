"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { sampleRoomTypes } from "@/lib/sample-data"

interface RoomFormModalProps {
  open: boolean
  onClose: () => void
}

export function RoomFormModal({ open, onClose }: RoomFormModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomTypeId: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.roomNumber.trim()) newErrors.roomNumber = "Room number is required"
    if (!formData.roomTypeId) newErrors.roomTypeId = "Room type is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    toast({
      title: "Room Created",
      description: `Room ${formData.roomNumber} has been added successfully.`,
    })
    setFormData({ roomNumber: "", roomTypeId: "" })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Room"
      description="Add a new room to the hotel"
      size="md"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Room</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="roomNumber">
            Room Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="roomNumber"
            value={formData.roomNumber}
            onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
            placeholder="e.g., 101"
          />
          {errors.roomNumber && <p className="text-xs text-destructive">{errors.roomNumber}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="roomTypeId">
            Room Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.roomTypeId}
            onValueChange={(value) => setFormData({ ...formData, roomTypeId: value })}
          >
            <SelectTrigger id="roomTypeId">
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              {sampleRoomTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name} -{" "}
                  {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(type.basePrice)}/night
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.roomTypeId && <p className="text-xs text-destructive">{errors.roomTypeId}</p>}
        </div>
      </div>
    </Modal>
  )
}
