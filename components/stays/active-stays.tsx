"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, LogOut, ConciergeBell, Receipt, Clock, BedDouble, User, DoorOpen } from "lucide-react"
import { sampleStays } from "@/lib/sample-data"
import { CheckOutModal } from "./check-out-modal"
import { AddServiceModal } from "./add-service-modal"
import { StayDetailModal } from "./stay-detail-modal"

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

export function ActiveStays() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [addServiceModalOpen, setAddServiceModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null)

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

  const handleCheckout = (stay: Stay) => {
    setSelectedStay(stay)
    setCheckoutModalOpen(true)
  }

  const handleAddService = (stay: Stay) => {
    setSelectedStay(stay)
    setAddServiceModalOpen(true)
  }

  const handleViewDetail = (stay: Stay) => {
    setSelectedStay(stay)
    setDetailModalOpen(true)
  }

  return (
    <>
      {sampleStays.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sampleStays.map((stay) => (
            <Card key={stay.id} className="overflow-hidden">
              <CardHeader className="border-b border-border bg-background pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <BedDouble size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Room {stay.roomNumber}</CardTitle>
                      <p className="text-sm text-muted-foreground">{stay.id}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetail(stay)} className="gap-2">
                        <Eye size={16} />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddService(stay)} className="gap-2">
                        <ConciergeBell size={16} />
                        Add Service
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Receipt size={16} />
                        View Invoice
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleCheckout(stay)} className="gap-2 text-destructive">
                        <LogOut size={16} />
                        Check-out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-muted-foreground" />
                    <span className="font-medium text-foreground">{stay.guestName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>Check-in: {formatDate(stay.checkinAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LogOut size={14} />
                    <span>Expected: {formatDate(stay.expectedCheckout)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-background p-3">
                    <span className="text-sm text-muted-foreground">Current Charges</span>
                    <span className="text-lg font-bold text-foreground">{formatCurrency(stay.charges)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2 bg-transparent"
                      onClick={() => handleAddService(stay)}
                    >
                      <ConciergeBell size={16} />
                      Add Service
                    </Button>
                    <Button variant="default" className="flex-1 gap-2" onClick={() => handleCheckout(stay)}>
                      <LogOut size={16} />
                      Checkout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <DoorOpen className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No Active Stays</h3>
            <p className="text-muted-foreground">There are no guests currently checked in.</p>
          </CardContent>
        </Card>
      )}

      {/* Checkout Modal */}
      <CheckOutModal
        open={checkoutModalOpen}
        onClose={() => {
          setCheckoutModalOpen(false)
          setSelectedStay(null)
        }}
        stay={selectedStay}
      />

      {/* Add Service Modal */}
      <AddServiceModal
        open={addServiceModalOpen}
        onClose={() => {
          setAddServiceModalOpen(false)
          setSelectedStay(null)
        }}
        stay={selectedStay}
      />

      {/* Stay Detail Modal */}
      <StayDetailModal
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false)
          setSelectedStay(null)
        }}
        stay={selectedStay}
      />
    </>
  )
}
