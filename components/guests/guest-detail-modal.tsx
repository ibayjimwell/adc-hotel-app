"use client"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Phone, CreditCard, Calendar, DoorOpen, Receipt, Edit } from "lucide-react"
import { sampleStays, sampleReservations, sampleInvoices } from "@/lib/sample-data"

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

interface GuestDetailModalProps {
  open: boolean
  onClose: () => void
  guest: Guest | null
}

export function GuestDetailModal({ open, onClose, guest }: GuestDetailModalProps) {
  if (!guest) return null

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const guestStays = sampleStays.filter((s) => s.guestName.includes(guest.lastName))
  const guestReservations = sampleReservations.filter((r) => r.guestName.includes(guest.lastName))
  const guestInvoices = sampleInvoices.filter((i) => i.guestName.includes(guest.lastName))

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Guest Details"
      size="xl"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="gap-2">
            <Edit size={16} />
            Edit Guest
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                  {guest.firstName[0]}
                  {guest.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold">
                  {guest.firstName} {guest.lastName}
                </h3>
                <p className="text-muted-foreground">Guest ID: {guest.id}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-4 sm:justify-start">
                  {guest.phone && (
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone size={14} />
                      {guest.phone}
                    </span>
                  )}
                  {guest.email && (
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail size={14} />
                      {guest.email}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-muted-foreground">ID Document</p>
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-primary" />
                  <span className="font-medium">{guest.idType}</span>
                </div>
                <p className="text-sm text-muted-foreground">{guest.idNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stays History */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <DoorOpen size={18} className="text-primary" />
              Stay History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {guestStays.length > 0 ? (
              <div className="space-y-3">
                {guestStays.map((stay) => (
                  <div key={stay.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="font-medium">Room {stay.roomNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(stay.checkinAt)} - {formatDate(stay.expectedCheckout)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(stay.charges)}</p>
                      <StatusBadge status={stay.status} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No stay history available</p>
            )}
          </CardContent>
        </Card>

        {/* Reservations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar size={18} className="text-primary" />
              Reservations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {guestReservations.length > 0 ? (
              <div className="space-y-3">
                {guestReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium">Room {reservation.rooms.join(", ")}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(reservation.checkinDate)} - {formatDate(reservation.checkoutDate)}
                      </p>
                    </div>
                    <StatusBadge status={reservation.status} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No reservations available</p>
            )}
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Receipt size={18} className="text-primary" />
              Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            {guestInvoices.length > 0 ? (
              <div className="space-y-3">
                {guestInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(invoice.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(invoice.totalAmount)}</p>
                      <StatusBadge status={invoice.status} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No invoices available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </Modal>
  )
}
