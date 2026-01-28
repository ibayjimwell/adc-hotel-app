import { cn } from "@/lib/utils"

type RoomStatus = "available" | "reserved" | "occupied" | "cleaning" | "maintenance"
type ReservationStatus = "pending" | "confirmed" | "cancelled" | "checked-in"
type InvoiceStatus = "unpaid" | "partial" | "paid"

interface StatusBadgeProps {
  status: RoomStatus | ReservationStatus | InvoiceStatus | string
  className?: string
}

const statusStyles: Record<string, string> = {
  // Room statuses
  available: "bg-success-light text-success",
  reserved: "bg-primary-light text-primary",
  occupied: "bg-[#f1e3ff] text-[#8a3ffc]",
  cleaning: "bg-warning-light text-[#b28600]",
  maintenance: "bg-destructive-light text-destructive",
  // Reservation statuses
  pending: "bg-warning-light text-[#b28600]",
  confirmed: "bg-primary-light text-primary",
  cancelled: "bg-destructive-light text-destructive",
  "checked-in": "bg-success-light text-success",
  // Invoice statuses
  unpaid: "bg-destructive-light text-destructive",
  partial: "bg-warning-light text-[#b28600]",
  paid: "bg-success-light text-success",
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        statusStyles[status.toLowerCase()] || "bg-muted text-muted-foreground",
        className,
      )}
    >
      {status}
    </span>
  )
}
