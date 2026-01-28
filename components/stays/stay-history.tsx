"use client"

import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

// Extended sample data for history
const stayHistory = [
  {
    id: "S004",
    guestName: "Andres Bonifacio",
    roomNumber: "301",
    checkinAt: "2025-01-05T14:30",
    checkoutAt: "2025-01-08T11:00",
    status: "completed",
    totalCharges: 24500,
  },
  {
    id: "S005",
    guestName: "Gabriela Silang",
    roomNumber: "201",
    checkinAt: "2025-01-02T15:00",
    checkoutAt: "2025-01-05T12:00",
    status: "completed",
    totalCharges: 15200,
  },
  {
    id: "S006",
    guestName: "Emilio Aguinaldo",
    roomNumber: "401",
    checkinAt: "2024-12-28T14:00",
    checkoutAt: "2025-01-02T11:30",
    status: "completed",
    totalCharges: 32000,
  },
  {
    id: "S007",
    guestName: "Apolinario Mabini",
    roomNumber: "102",
    checkinAt: "2024-12-25T16:00",
    checkoutAt: "2024-12-28T12:00",
    status: "completed",
    totalCharges: 8500,
  },
]

interface HistoryStay {
  id: string
  guestName: string
  roomNumber: string
  checkinAt: string
  checkoutAt: string
  status: string
  totalCharges: number
}

export function StayHistory() {
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

  const columns = [
    { key: "id", header: "Stay ID" },
    {
      key: "guestName",
      header: "Guest",
      render: (stay: HistoryStay) => <span className="font-medium">{stay.guestName}</span>,
    },
    {
      key: "roomNumber",
      header: "Room",
      render: (stay: HistoryStay) => <span>Room {stay.roomNumber}</span>,
    },
    {
      key: "checkinAt",
      header: "Check-in",
      render: (stay: HistoryStay) => formatDate(stay.checkinAt),
    },
    {
      key: "checkoutAt",
      header: "Check-out",
      render: (stay: HistoryStay) => formatDate(stay.checkoutAt),
    },
    {
      key: "totalCharges",
      header: "Total",
      render: (stay: HistoryStay) => <span className="font-semibold">{formatCurrency(stay.totalCharges)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (stay: HistoryStay) => <StatusBadge status={stay.status} />,
    },
  ]

  const renderActions = (stay: HistoryStay) => (
    <Button variant="ghost" size="sm" className="gap-2">
      <Eye size={14} />
      View
    </Button>
  )

  return (
    <DataTable
      columns={columns}
      data={stayHistory}
      searchPlaceholder="Search by guest name or room..."
      actions={renderActions}
    />
  )
}
