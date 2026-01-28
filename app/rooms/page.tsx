"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/components/ui/status-badge"
import { Plus, Search, DoorOpen, Wrench, Eye, Grid3X3, List } from "lucide-react"
import { sampleRooms, sampleRoomTypes } from "@/lib/sample-data"
import { RoomFormModal } from "@/components/rooms/room-form-modal"
import { RoomDetailSheet } from "@/components/rooms/room-detail-sheet"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "table"

interface Room {
  id: string
  roomNumber: string
  roomTypeId: string
  typeName: string
  floor: number
  status: string
  price: number
}

export default function RoomsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [floorFilter, setFloorFilter] = useState<string>("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const filteredRooms = sampleRooms.filter((room) => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    const matchesType = typeFilter === "all" || room.roomTypeId === typeFilter
    const matchesFloor = floorFilter === "all" || room.floor.toString() === floorFilter
    return matchesSearch && matchesStatus && matchesType && matchesFloor
  })

  const floors = [...new Set(sampleRooms.map((r) => r.floor))].sort()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <div className="h-3 w-3 rounded-full bg-success" />
      case "occupied":
        return <div className="h-3 w-3 rounded-full bg-[#8a3ffc]" />
      case "reserved":
        return <div className="h-3 w-3 rounded-full bg-primary" />
      case "cleaning":
        return <div className="h-3 w-3 rounded-full bg-warning" />
      case "maintenance":
        return <div className="h-3 w-3 rounded-full bg-destructive" />
      default:
        return null
    }
  }

  const handleViewRoom = (room: Room) => {
    setSelectedRoom(room)
    setIsDetailOpen(true)
  }

  return (
    <MainLayout title="Room List">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-muted-foreground">Manage hotel rooms and their status</p>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex rounded-lg border border-border bg-card p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="h-8 px-3"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 size={16} />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              className="h-8 px-3"
              onClick={() => setViewMode("table")}
            >
              <List size={16} />
            </Button>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
            <Plus size={18} />
            Add Room
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search room number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {sampleRoomTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={floorFilter} onValueChange={setFloorFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by floor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Floors</SelectItem>
            {floors.map((floor) => (
              <SelectItem key={floor} value={floor.toString()}>
                Floor {floor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status Legend */}
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-card p-3">
        <span className="text-sm font-medium text-muted-foreground">Status:</span>
        {["available", "reserved", "occupied", "cleaning", "maintenance"].map((status) => (
          <div key={status} className="flex items-center gap-2">
            {getStatusIcon(status)}
            <span className="text-sm capitalize text-foreground">{status}</span>
          </div>
        ))}
      </div>

      {/* Room Grid/Table */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              className={cn(
                "cursor-pointer overflow-hidden transition-all hover:shadow-md",
                room.status === "available" && "border-success/50",
                room.status === "occupied" && "border-[#8a3ffc]/50",
                room.status === "reserved" && "border-primary/50",
                room.status === "cleaning" && "border-warning/50",
                room.status === "maintenance" && "border-destructive/50",
              )}
              onClick={() => handleViewRoom(room)}
            >
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">{room.roomNumber}</h3>
                  {getStatusIcon(room.status)}
                </div>
                <p className="mb-2 text-sm text-muted-foreground">{room.typeName}</p>
                <p className="text-sm font-semibold text-primary">{formatCurrency(room.price)}/night</p>
                <div className="mt-3 flex gap-1">
                  {room.status === "available" && (
                    <Button size="sm" className="h-7 flex-1 gap-1 text-xs">
                      <DoorOpen size={12} />
                      Check-in
                    </Button>
                  )}
                  {room.status === "occupied" && (
                    <Button size="sm" variant="outline" className="h-7 flex-1 gap-1 text-xs bg-transparent">
                      <Eye size={12} />
                      View
                    </Button>
                  )}
                  {room.status === "cleaning" && (
                    <Button size="sm" variant="secondary" className="h-7 flex-1 gap-1 text-xs">
                      Mark Ready
                    </Button>
                  )}
                  {room.status === "maintenance" && (
                    <Button size="sm" variant="secondary" className="h-7 flex-1 gap-1 text-xs">
                      <Wrench size={12} />
                      Update
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Room</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Floor</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="border-b border-border last:border-0 hover:bg-background/50">
                  <td className="px-4 py-3 font-medium text-foreground">{room.roomNumber}</td>
                  <td className="px-4 py-3 text-muted-foreground">{room.typeName}</td>
                  <td className="px-4 py-3 text-muted-foreground">Floor {room.floor}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{formatCurrency(room.price)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={room.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-8" onClick={() => handleViewRoom(room)}>
                        <Eye size={14} />
                      </Button>
                      {room.status === "available" && (
                        <Button size="sm" className="h-8 gap-1">
                          <DoorOpen size={14} />
                          Check-in
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Room Modal */}
      <RoomFormModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

      {/* Room Detail Sheet */}
      <RoomDetailSheet
        open={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false)
          setSelectedRoom(null)
        }}
        room={selectedRoom}
      />
    </MainLayout>
  )
}
