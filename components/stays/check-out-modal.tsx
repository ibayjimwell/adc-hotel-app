"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Receipt, BedDouble, ConciergeBell } from "lucide-react"

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

interface CheckOutModalProps {
  open: boolean
  onClose: () => void
  stay: Stay | null
}

export function CheckOutModal({ open, onClose, stay }: CheckOutModalProps) {
  const { toast } = useToast()
  const [checkoutAt, setCheckoutAt] = useState(new Date().toISOString().slice(0, 16))
  const [autoGenerateInvoice, setAutoGenerateInvoice] = useState(true)

  if (!stay) return null

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })

  // Calculate nights and charges
  const checkinDate = new Date(stay.checkinAt)
  const checkoutDate = new Date(checkoutAt)
  const nights = Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24))
  const roomRate = 4000 // Sample rate
  const roomCharges = nights * roomRate

  // Sample services added during stay
  const stayServices = [
    { name: "Room Service - Breakfast", quantity: 2, price: 450 },
    { name: "Laundry Service", quantity: 1, price: 350 },
  ]
  const serviceCharges = stayServices.reduce((total, s) => total + s.price * s.quantity, 0)
  const totalAmount = roomCharges + serviceCharges

  const handleCheckout = () => {
    toast({
      title: "Check-out Successful",
      description: `${stay.guestName} has been checked out from Room ${stay.roomNumber}.${autoGenerateInvoice ? " Invoice generated." : ""}`,
    })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Check-out"
      description={`Process check-out for ${stay.guestName}`}
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCheckout}>Confirm Check-out</Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stay Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BedDouble size={18} className="text-primary" />
              Stay Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guest</span>
              <span className="font-medium">{stay.guestName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Room</span>
              <span className="font-medium">Room {stay.roomNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-in</span>
              <span>{formatDate(stay.checkinAt)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Check-out Time */}
        <div className="space-y-2">
          <Label htmlFor="checkoutAt">Check-out Time</Label>
          <Input
            id="checkoutAt"
            type="datetime-local"
            value={checkoutAt}
            onChange={(e) => setCheckoutAt(e.target.value)}
          />
        </div>

        {/* Invoice Preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Receipt size={18} className="text-primary" />
              Invoice Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Room Charges */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Room Charges</h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Deluxe Room ({nights} nights × {formatCurrency(roomRate)})
                </span>
                <span>{formatCurrency(roomCharges)}</span>
              </div>
            </div>

            {/* Service Charges */}
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-medium text-foreground">
                <ConciergeBell size={14} />
                Service Charges
              </h4>
              {stayServices.map((service, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {service.name} × {service.quantity}
                  </span>
                  <span>{formatCurrency(service.price * service.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-primary">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auto Generate Invoice */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="autoInvoice"
            checked={autoGenerateInvoice}
            onCheckedChange={(checked) => setAutoGenerateInvoice(checked as boolean)}
          />
          <Label htmlFor="autoInvoice" className="font-normal">
            Automatically generate invoice on check-out
          </Label>
        </div>

        {/* Status Change Notice */}
        <div className="rounded-lg bg-warning-light p-3 text-sm">
          <p>
            <span className="font-medium">Note:</span> Room status will change to{" "}
            <span className="font-medium text-[#b28600]">Cleaning</span> after check-out.
          </p>
        </div>
      </div>
    </Modal>
  )
}
