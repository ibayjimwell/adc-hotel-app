"use client"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { BedDouble, User, Clock, ConciergeBell, Receipt, Calendar } from "lucide-react"

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

interface StayDetailModalProps {
  open: boolean
  onClose: () => void
  stay: Stay | null
}

// Sample services for this stay
const stayServices = [
  { id: 1, name: "Room Service - Breakfast", quantity: 2, price: 450, addedAt: "2025-01-12T08:30" },
  { id: 2, name: "Laundry Service", quantity: 1, price: 350, addedAt: "2025-01-12T10:15" },
  { id: 3, name: "Mini Bar", quantity: 3, price: 500, addedAt: "2025-01-12T21:00" },
]

export function StayDetailModal({ open, onClose, stay }: StayDetailModalProps) {
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

  const serviceTotal = stayServices.reduce((total, s) => total + s.price * s.quantity, 0)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Stay Details"
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Receipt size={16} />
            View Invoice
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stay Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <BedDouble size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Room {stay.roomNumber}</h3>
                  <p className="text-muted-foreground">{stay.id}</p>
                </div>
              </div>
              <StatusBadge status={stay.status} />
            </div>
          </CardContent>
        </Card>

        {/* Guest Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <User size={16} className="text-primary" />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{stay.guestName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Guest ID</p>
              <p className="font-medium">{stay.guestId}</p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Calendar size={16} className="text-primary" />
              Stay Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-light">
                <Clock size={14} className="text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">Checked In</p>
                <p className="text-sm text-muted-foreground">{formatDate(stay.checkinAt)}</p>
              </div>
            </div>
            <div className="ml-4 h-8 border-l-2 border-dashed border-border" />
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning-light">
                <Clock size={14} className="text-[#b28600]" />
              </div>
              <div>
                <p className="font-medium text-foreground">Expected Check-out</p>
                <p className="text-sm text-muted-foreground">{formatDate(stay.expectedCheckout)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <ConciergeBell size={16} className="text-primary" />
              Services Added
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stayServices.length > 0 ? (
              <div className="space-y-2">
                {stayServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium text-foreground">{service.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {service.quantity} • Added: {formatDate(service.addedAt)}
                      </p>
                    </div>
                    <p className="font-semibold">{formatCurrency(service.price * service.quantity)}</p>
                  </div>
                ))}
                <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm">
                  <span className="text-muted-foreground">Total Services</span>
                  <span className="font-semibold">{formatCurrency(serviceTotal)}</span>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No services added yet</p>
            )}
          </CardContent>
        </Card>

        {/* Charges Summary */}
        <div className="rounded-lg bg-primary-light p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">Current Total Charges</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(stay.charges + serviceTotal)}</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
