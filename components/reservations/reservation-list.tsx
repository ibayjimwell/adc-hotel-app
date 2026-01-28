"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, CheckCircle, XCircle, DoorOpen } from "lucide-react"
import { sampleReservations } from "@/lib/sample-data"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { useToast } from "@/hooks/use-toast"

interface Reservation {
  id: string
  guestId: string
  guestName: string
  rooms: string[]
  checkinDate: string
  checkoutDate: string
  status: string
  createdAt: string
}

export function ReservationList() {
  const { toast } = useToast()
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })

  const columns = [
    { key: "id", header: "ID" },
    {
      key: "guestName",
      header: "Guest",
      render: (reservation: Reservation) => <span className="font-medium">{reservation.guestName}</span>,
    },
    {
      key: "rooms",
      header: "Rooms",
      render: (reservation: Reservation) => reservation.rooms.join(", "),
    },
    {
      key: "checkinDate",
      header: "Check-in",
      render: (reservation: Reservation) => formatDate(reservation.checkinDate),
    },
    {
      key: "checkoutDate",
      header: "Check-out",
      render: (reservation: Reservation) => formatDate(reservation.checkoutDate),
    },
    {
      key: "status",
      header: "Status",
      render: (reservation: Reservation) => <StatusBadge status={reservation.status} />,
    },
    {
      key: "createdAt",
      header: "Created",
      render: (reservation: Reservation) => formatDate(reservation.createdAt),
    },
  ]

  const handleConfirm = (reservation: Reservation) => {
    toast({
      title: "Reservation Confirmed",
      description: `Reservation ${reservation.id} has been confirmed.`,
    })
  }

  const handleCancel = () => {
    if (selectedReservation) {
      toast({
        title: "Reservation Cancelled",
        description: `Reservation ${selectedReservation.id} has been cancelled.`,
        variant: "destructive",
      })
      setCancelDialogOpen(false)
      setSelectedReservation(null)
    }
  }

  const handleCheckIn = (reservation: Reservation) => {
    toast({
      title: "Check-in Initiated",
      description: `Starting check-in process for ${reservation.guestName}.`,
    })
  }

  const renderActions = (reservation: Reservation) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2">
          <Eye size={16} />
          View Details
        </DropdownMenuItem>
        {reservation.status === "pending" && (
          <DropdownMenuItem className="gap-2" onClick={() => handleConfirm(reservation)}>
            <CheckCircle size={16} />
            Confirm
          </DropdownMenuItem>
        )}
        {reservation.status === "confirmed" && (
          <DropdownMenuItem className="gap-2" onClick={() => handleCheckIn(reservation)}>
            <DoorOpen size={16} />
            Convert to Check-in
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {reservation.status !== "cancelled" && (
          <DropdownMenuItem
            className="gap-2 text-destructive"
            onClick={() => {
              setSelectedReservation(reservation)
              setCancelDialogOpen(true)
            }}
          >
            <XCircle size={16} />
            Cancel Reservation
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={sampleReservations}
        searchPlaceholder="Search reservations..."
        actions={renderActions}
      />

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        open={cancelDialogOpen}
        onClose={() => {
          setCancelDialogOpen(false)
          setSelectedReservation(null)
        }}
        onConfirm={handleCancel}
        title="Cancel Reservation"
        description={`Are you sure you want to cancel reservation ${selectedReservation?.id}? This action cannot be undone.`}
        confirmLabel="Cancel Reservation"
        variant="destructive"
      />
    </>
  )
}
