"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Plus, Eye, Edit, Calendar, DoorOpen, MoreHorizontal } from "lucide-react"
import { sampleGuests } from "@/lib/sample-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GuestFormModal } from "@/components/guests/guest-form-modal"
import { GuestDetailModal } from "@/components/guests/guest-detail-modal"

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

export default function GuestsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)

  const columns = [
    { key: "id", header: "ID" },
    {
      key: "name",
      header: "Full Name",
      render: (guest: Guest) => (
        <span className="font-medium">
          {guest.firstName} {guest.lastName}
        </span>
      ),
    },
    { key: "phone", header: "Phone" },
    { key: "email", header: "Email" },
    {
      key: "idType",
      header: "ID Type",
      render: (guest: Guest) => <StatusBadge status={guest.idType.toLowerCase()} />,
    },
    { key: "idNumber", header: "ID Number" },
    {
      key: "lastStayDate",
      header: "Last Stay",
      render: (guest: Guest) =>
        new Date(guest.lastStayDate).toLocaleDateString("en-PH", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
  ]

  const handleView = (guest: Guest) => {
    setSelectedGuest(guest)
    setIsDetailModalOpen(true)
  }

  const handleEdit = (guest: Guest) => {
    setSelectedGuest(guest)
    setIsEditModalOpen(true)
  }

  const renderActions = (guest: Guest) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleView(guest)} className="gap-2">
          <Eye size={16} />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEdit(guest)} className="gap-2">
          <Edit size={16} />
          Edit Guest
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Calendar size={16} />
          New Reservation
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <DoorOpen size={16} />
          New Stay
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <MainLayout title="Guests">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-muted-foreground">Manage hotel guests and their information</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
          <Plus size={18} />
          Add Guest
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={sampleGuests}
        searchPlaceholder="Search by name, phone, or email..."
        actions={renderActions}
      />

      {/* Create Guest Modal */}
      <GuestFormModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} mode="create" />

      {/* Edit Guest Modal */}
      <GuestFormModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedGuest(null)
        }}
        mode="edit"
        guest={selectedGuest}
      />

      {/* Guest Detail Modal */}
      <GuestDetailModal
        open={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedGuest(null)
        }}
        guest={selectedGuest}
      />
    </MainLayout>
  )
}
