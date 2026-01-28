"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { sampleServices } from "@/lib/sample-data"
import { Search } from "lucide-react"

interface Stay {
  id: string
  guestId: string
  guestName: string
  roomNumber: string
  checkinAt: string
  expectedCheckout: string
  status: string
  charges: number
}

interface AddServiceModalProps {
  open: boolean
  onClose: () => void
  stay: Stay | null
}

export function AddServiceModal({ open, onClose, stay }: AddServiceModalProps) {
  const { toast } = useToast()
  const [serviceId, setServiceId] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [searchQuery, setSearchQuery] = useState("")

  if (!stay) return null

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const selectedService = sampleServices.find((s) => s.id === serviceId)
  const subtotal = selectedService ? selectedService.price * Number(quantity) : 0

  const filteredServices = sampleServices.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmit = () => {
    if (!serviceId || Number(quantity) < 1) return

    toast({
      title: "Service Added",
      description: `${selectedService?.name} × ${quantity} added to ${stay.guestName}'s stay.`,
    })
    setServiceId("")
    setQuantity("1")
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Service"
      description={`Add a service to ${stay.guestName}'s stay (Room ${stay.roomNumber})`}
      size="md"
      footer={
        <div className="flex items-center justify-between">
          {subtotal > 0 && (
            <p className="text-sm">
              Subtotal: <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </p>
          )}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!serviceId}>
              Add Service
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Service Search & Select */}
        <div className="space-y-2">
          <Label>Service</Label>
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={serviceId} onValueChange={setServiceId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {filteredServices.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name} - {formatCurrency(service.price)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-32"
          />
        </div>

        {/* Price Preview */}
        {selectedService && (
          <div className="rounded-lg bg-background p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service</span>
              <span>{selectedService.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Unit Price</span>
              <span>{formatCurrency(selectedService.price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quantity</span>
              <span>× {quantity}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold">
              <span>Subtotal</span>
              <span className="text-primary">{formatCurrency(subtotal)}</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
