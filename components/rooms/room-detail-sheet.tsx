"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DoorOpen, Wrench, Calendar, History, Banknote, Users } from "lucide-react"
import { sampleStays, sampleReservations, sampleRoomTypes } from "@/lib/sample-data"
import { useToast } from "@/hooks/use-toast"

interface Room {
  id: string
  roomNumber: string
  roomTypeId: string
  typeName: string
  floor: number
  status: string
  price: number
}

interface RoomDetailSheetProps {
  open: boolean
  onClose: () => void
  room: Room | null
}

export function RoomDetailSheet({ open, onClose, room }: RoomDetailSheetProps) {
  const { toast } = useToast()

  if (!room) return null

  const roomType = sampleRoomTypes.find((t) => t.id === room.roomTypeId)
  const roomStays = sampleStays.filter((s) => s.roomNumber === room.roomNumber)
  const roomReservations = sampleReservations.filter((r) => r.rooms.includes(room.roomNumber))

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  const handleStatusChange = (newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Room ${room.roomNumber} status changed to ${newStatus}.`,
    })
  }

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl">Room {room.roomNumber}</SheetTitle>
            <StatusBadge status={room.status} />
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Room Info */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground">{room.typeName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Floor</p>
                  <p className="font-medium text-foreground">Floor {room.floor}</p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Banknote size={14} />
                    Price
                  </p>
                  <p className="font-medium text-foreground">{formatCurrency(room.price)}/night</p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users size={14} />
                    Capacity
                  </p>
                  <p className="font-medium text-foreground">{roomType?.capacity || 2} guests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            {room.status === "available" && (
              <Button className="w-full gap-2">
                <DoorOpen size={18} />
                Check-in Guest
              </Button>
            )}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Change Status</p>
              <Select value={room.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Wrench size={18} />
              Report Maintenance Issue
            </Button>
          </div>

          {/* Upcoming Reservations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Calendar size={16} className="text-primary" />
                Upcoming Reservations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {roomReservations.filter((r) => r.status !== "cancelled").length > 0 ? (
                roomReservations
                  .filter((r) => r.status !== "cancelled")
                  .map((reservation) => (
                    <div key={reservation.id} className="rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{reservation.guestName}</p>
                        <StatusBadge status={reservation.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(reservation.checkinDate)} - {formatDate(reservation.checkoutDate)}
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-center text-sm text-muted-foreground">No upcoming reservations</p>
              )}
            </CardContent>
          </Card>

          {/* Past Stays */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <History size={16} className="text-primary" />
                Recent Stays
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {roomStays.length > 0 ? (
                roomStays.map((stay) => (
                  <div key={stay.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{stay.guestName}</p>
                      <p className="text-sm font-semibold text-primary">{formatCurrency(stay.charges)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(stay.checkinAt)} - {formatDate(stay.expectedCheckout)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground">No recent stays</p>
              )}
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
