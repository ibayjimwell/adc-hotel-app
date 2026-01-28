"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { sampleGuests, sampleRooms } from "@/lib/sample-data"
import { AlertCircle, CheckCircle2, Plus, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReservationFormModalProps {
  open: boolean
  onClose: () => void
}

export function ReservationFormModal({ open, onClose }: ReservationFormModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    guestId: "",
    roomIds: [] as string[],
    checkinDate: "",
    checkinTime: "14:00",
    checkoutDate: "",
    checkoutTime: "12:00",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [guestSearch, setGuestSearch] = useState("")
  const [showGuestSearch, setShowGuestSearch] = useState(false)

  const availableRooms = sampleRooms.filter((room) => room.status === "available")
  const filteredGuests = sampleGuests.filter(
    (guest) =>
      guest.firstName.toLowerCase().includes(guestSearch.toLowerCase()) ||
      guest.lastName.toLowerCase().includes(guestSearch.toLowerCase()) ||
      guest.phone.includes(guestSearch) ||
      guest.email.toLowerCase().includes(guestSearch.toLowerCase()),
  )

  const selectedGuest = sampleGuests.find((g) => g.id === formData.guestId)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  useEffect(() => {
    if (!open) {
      setFormData({
        guestId: "",
        roomIds: [],
        checkinDate: "",
        checkinTime: "14:00",
        checkoutDate: "",
        checkoutTime: "12:00",
      })
      setErrors({})
      setGuestSearch("")
      setShowGuestSearch(false)
    }
  }, [open])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.guestId) newErrors.guestId = "Guest is required"
    if (formData.roomIds.length === 0) newErrors.roomIds = "At least one room is required"
    if (!formData.checkinDate) newErrors.checkinDate = "Check-in date is required"
    if (!formData.checkoutDate) newErrors.checkoutDate = "Check-out date is required"

    if (formData.checkinDate && formData.checkoutDate) {
      const checkin = new Date(`${formData.checkinDate}T${formData.checkinTime}`)
      const checkout = new Date(`${formData.checkoutDate}T${formData.checkoutTime}`)
      if (checkin >= checkout) {
        newErrors.checkoutDate = "Check-out must be after check-in"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRoomToggle = (roomId: string) => {
    setFormData((prev) => ({
      ...prev,
      roomIds: prev.roomIds.includes(roomId) ? prev.roomIds.filter((id) => id !== roomId) : [...prev.roomIds, roomId],
    }))
  }

  const handleSubmit = () => {
    if (!validate()) return

    toast({
      title: "Reservation Created",
      description: `Reservation for ${selectedGuest?.firstName} ${selectedGuest?.lastName} has been created.`,
    })
    onClose()
  }

  const calculateNights = () => {
    if (!formData.checkinDate || !formData.checkoutDate) return 0
    const checkin = new Date(formData.checkinDate)
    const checkout = new Date(formData.checkoutDate)
    return Math.ceil((checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    return formData.roomIds.reduce((total, roomId) => {
      const room = sampleRooms.find((r) => r.id === roomId)
      return total + (room?.price || 0) * nights
    }, 0)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New Reservation"
      description="Create a new room reservation"
      size="xl"
      footer={
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {formData.roomIds.length > 0 && calculateNights() > 0 && (
              <span className="font-semibold text-foreground">
                Total: {formatCurrency(calculateTotal())} ({calculateNights()} nights)
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Create Reservation</Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Guest Selection */}
        <div className="space-y-2">
          <Label>
            Guest <span className="text-destructive">*</span>
          </Label>
          {selectedGuest ? (
            <Card>
              <CardContent className="flex items-center justify-between p-3">
                <div>
                  <p className="font-medium">
                    {selectedGuest.firstName} {selectedGuest.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedGuest.phone}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setFormData({ ...formData, guestId: "" })}>
                  Change
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <Input
                  placeholder="Search guest by name, phone, or email..."
                  value={guestSearch}
                  onChange={(e) => {
                    setGuestSearch(e.target.value)
                    setShowGuestSearch(true)
                  }}
                  onFocus={() => setShowGuestSearch(true)}
                  className="pl-10"
                />
              </div>
              {showGuestSearch && guestSearch && (
                <Card className="max-h-48 overflow-y-auto">
                  <CardContent className="p-2">
                    {filteredGuests.length > 0 ? (
                      filteredGuests.map((guest) => (
                        <button
                          key={guest.id}
                          className="w-full rounded-lg p-2 text-left transition-colors hover:bg-background"
                          onClick={() => {
                            setFormData({ ...formData, guestId: guest.id })
                            setShowGuestSearch(false)
                            setGuestSearch("")
                          }}
                        >
                          <p className="font-medium">
                            {guest.firstName} {guest.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">{guest.phone}</p>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-muted-foreground">No guests found</p>
                        <Button variant="link" className="mt-2 gap-1">
                          <Plus size={14} />
                          Create new guest
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          {errors.guestId && <p className="text-xs text-destructive">{errors.guestId}</p>}
        </div>

        {/* Room Selection */}
        <div className="space-y-2">
          <Label>
            Rooms <span className="text-destructive">*</span>
          </Label>
          <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-border p-3 sm:grid-cols-3">
            {availableRooms.map((room) => (
              <div
                key={room.id}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border p-2 transition-colors",
                  formData.roomIds.includes(room.id)
                    ? "border-primary bg-primary-light"
                    : "border-border hover:bg-background",
                )}
                onClick={() => handleRoomToggle(room.id)}
              >
                <Checkbox checked={formData.roomIds.includes(room.id)} />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{room.roomNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {room.typeName} - {formatCurrency(room.price)}
                  </p>
                </div>
                {formData.roomIds.includes(room.id) && <CheckCircle2 className="h-4 w-4 text-primary" />}
              </div>
            ))}
          </div>
          {errors.roomIds && <p className="text-xs text-destructive">{errors.roomIds}</p>}
        </div>

        {/* Date/Time Selection */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="checkinDate">
              Check-in Date <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="checkinDate"
                type="date"
                value={formData.checkinDate}
                onChange={(e) => setFormData({ ...formData, checkinDate: e.target.value })}
                className="flex-1"
              />
              <Select
                value={formData.checkinTime}
                onValueChange={(value) => setFormData({ ...formData, checkinTime: value })}
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = String(i).padStart(2, "0")
                    return (
                      <SelectItem key={hour} value={`${hour}:00`}>
                        {hour}:00
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            {errors.checkinDate && <p className="text-xs text-destructive">{errors.checkinDate}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkoutDate">
              Check-out Date <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="checkoutDate"
                type="date"
                value={formData.checkoutDate}
                onChange={(e) => setFormData({ ...formData, checkoutDate: e.target.value })}
                className="flex-1"
              />
              <Select
                value={formData.checkoutTime}
                onValueChange={(value) => setFormData({ ...formData, checkoutTime: value })}
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = String(i).padStart(2, "0")
                    return (
                      <SelectItem key={hour} value={`${hour}:00`}>
                        {hour}:00
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            {errors.checkoutDate && <p className="text-xs text-destructive">{errors.checkoutDate}</p>}
          </div>
        </div>

        {/* Validation Feedback */}
        {formData.checkinDate && formData.checkoutDate && !errors.checkoutDate && (
          <div className="flex items-center gap-2 rounded-lg bg-success-light p-3 text-sm text-success">
            <CheckCircle2 size={16} />
            <span>{calculateNights()} night(s) - All selected rooms are available for these dates</span>
          </div>
        )}

        {errors.checkoutDate && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive-light p-3 text-sm text-destructive">
            <AlertCircle size={16} />
            <span>{errors.checkoutDate}</span>
          </div>
        )}
      </div>
    </Modal>
  )
}
