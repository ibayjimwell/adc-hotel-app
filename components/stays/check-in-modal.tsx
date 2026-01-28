"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { sampleGuests, sampleRooms } from "@/lib/sample-data"
import { Search, Plus, CheckCircle2 } from "lucide-react"

interface CheckInModalProps {
  open: boolean
  onClose: () => void
}

export function CheckInModal({ open, onClose }: CheckInModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    guestId: "",
    roomId: "",
    checkinAt: new Date().toISOString().slice(0, 16),
    notes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [guestSearch, setGuestSearch] = useState("")
  const [showGuestSearch, setShowGuestSearch] = useState(false)

  const availableRooms = sampleRooms.filter((room) => room.status === "available")
  const filteredGuests = sampleGuests.filter(
    (guest) =>
      guest.firstName.toLowerCase().includes(guestSearch.toLowerCase()) ||
      guest.lastName.toLowerCase().includes(guestSearch.toLowerCase()) ||
      guest.phone.includes(guestSearch),
  )

  const selectedGuest = sampleGuests.find((g) => g.id === formData.guestId)
  const selectedRoom = sampleRooms.find((r) => r.id === formData.roomId)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  useEffect(() => {
    if (!open) {
      setFormData({
        guestId: "",
        roomId: "",
        checkinAt: new Date().toISOString().slice(0, 16),
        notes: "",
      })
      setErrors({})
      setGuestSearch("")
      setShowGuestSearch(false)
    }
  }, [open])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.guestId) newErrors.guestId = "Guest is required"
    if (!formData.roomId) newErrors.roomId = "Room is required"
    if (!formData.checkinAt) newErrors.checkinAt = "Check-in time is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    toast({
      title: "Check-in Successful",
      description: `${selectedGuest?.firstName} ${selectedGuest?.lastName} has been checked into Room ${selectedRoom?.roomNumber}.`,
    })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Walk-in Check-in"
      description="Check in a guest without a prior reservation"
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Complete Check-in</Button>
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
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium">
                      {selectedGuest.firstName} {selectedGuest.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{selectedGuest.phone}</p>
                  </div>
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
                  placeholder="Search guest by name or phone..."
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
          <Label htmlFor="roomId">
            Room <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.roomId} onValueChange={(value) => setFormData({ ...formData, roomId: value })}>
            <SelectTrigger id="roomId">
              <SelectValue placeholder="Select an available room" />
            </SelectTrigger>
            <SelectContent>
              {availableRooms.map((room) => (
                <SelectItem key={room.id} value={room.id}>
                  Room {room.roomNumber} - {room.typeName} ({formatCurrency(room.price)}/night)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.roomId && <p className="text-xs text-destructive">{errors.roomId}</p>}
        </div>

        {/* Check-in Time */}
        <div className="space-y-2">
          <Label htmlFor="checkinAt">
            Check-in Time <span className="text-destructive">*</span>
          </Label>
          <Input
            id="checkinAt"
            type="datetime-local"
            value={formData.checkinAt}
            onChange={(e) => setFormData({ ...formData, checkinAt: e.target.value })}
          />
          {errors.checkinAt && <p className="text-xs text-destructive">{errors.checkinAt}</p>}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Initial Notes (Optional)</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Any special requests or notes..."
            rows={3}
          />
        </div>

        {/* Summary */}
        {selectedGuest && selectedRoom && (
          <Card className="border-success/50 bg-success-light">
            <CardContent className="p-4">
              <h4 className="mb-2 font-semibold text-success">Check-in Summary</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Guest:</span> {selectedGuest.firstName}{" "}
                  {selectedGuest.lastName}
                </p>
                <p>
                  <span className="text-muted-foreground">Room:</span> {selectedRoom.roomNumber} (
                  {selectedRoom.typeName})
                </p>
                <p>
                  <span className="text-muted-foreground">Rate:</span> {formatCurrency(selectedRoom.price)}/night
                </p>
                <p>
                  <span className="text-muted-foreground">Room status will change to:</span>{" "}
                  <span className="font-medium text-[#8a3ffc]">Occupied</span>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Modal>
  )
}
