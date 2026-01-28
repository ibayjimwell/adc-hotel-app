"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Users, Banknote, BedDouble } from "lucide-react"
import { sampleRoomTypes } from "@/lib/sample-data"
import { RoomTypeFormModal } from "@/components/rooms/room-type-form-modal"

interface RoomType {
  id: string
  name: string
  description: string
  basePrice: number
  capacity: number
  roomCount: number
}

export default function RoomTypesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const handleEdit = (roomType: RoomType) => {
    setSelectedRoomType(roomType)
    setIsEditModalOpen(true)
  }

  return (
    <MainLayout title="Room Types">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-muted-foreground">Manage room categories and pricing</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
          <Plus size={18} />
          Add Room Type
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleRoomTypes.map((roomType) => (
          <Card key={roomType.id} className="overflow-hidden transition-shadow hover:shadow-md">
            <CardContent className="p-0">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{roomType.name}</h3>
                    <p className="mt-1 text-sm text-primary-foreground/80">{roomType.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                    onClick={() => handleEdit(roomType)}
                  >
                    <Edit size={16} />
                  </Button>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Banknote size={16} />
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">{formatCurrency(roomType.basePrice)}</p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Users size={16} />
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">{roomType.capacity}</p>
                    <p className="text-xs text-muted-foreground">guests</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <BedDouble size={16} />
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">{roomType.roomCount}</p>
                    <p className="text-xs text-muted-foreground">rooms</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Room Type Modal */}
      <RoomTypeFormModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} mode="create" />

      {/* Edit Room Type Modal */}
      <RoomTypeFormModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedRoomType(null)
        }}
        mode="edit"
        roomType={selectedRoomType}
      />
    </MainLayout>
  )
}
