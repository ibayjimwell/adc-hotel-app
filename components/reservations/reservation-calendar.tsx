"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { sampleReservations } from "@/lib/sample-data"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { StatusBadge } from "@/components/ui/status-badge"

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

interface CalendarEvent {
  id: string
  guestName: string
  rooms: string[]
  checkinDate: string
  checkoutDate: string
  status: string
}

export function ReservationCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)) // January 2025

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDay = (day: number): CalendarEvent[] => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    return sampleReservations.filter((reservation) => {
      const checkin = new Date(reservation.checkinDate).toISOString().split("T")[0]
      const checkout = new Date(reservation.checkoutDate).toISOString().split("T")[0]
      return dateStr >= checkin && dateStr <= checkout
    })
  }

  const getEventColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-primary text-primary-foreground"
      case "pending":
        return "bg-warning text-[#1a1a1a]"
      case "cancelled":
        return "bg-destructive/50 text-destructive-foreground line-through"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const days = []

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-24 bg-background/50" />)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const events = getEventsForDay(day)
    const isToday =
      day === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear()

    days.push(
      <div
        key={day}
        className={cn(
          "min-h-24 border-b border-r border-border p-1 transition-colors hover:bg-background",
          isToday && "bg-primary-light",
        )}
      >
        <div className={cn("mb-1 text-sm font-medium", isToday ? "text-primary" : "text-foreground")}>{day}</div>
        <div className="space-y-1">
          {events.slice(0, 3).map((event) => (
            <TooltipProvider key={event.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "cursor-pointer truncate rounded px-1.5 py-0.5 text-[10px] font-medium",
                      getEventColor(event.status),
                    )}
                  >
                    {event.guestName}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="w-64 p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{event.guestName}</span>
                      <StatusBadge status={event.status} />
                    </div>
                    <div className="text-sm">
                      <p>
                        <span className="text-muted-foreground">Rooms:</span> {event.rooms.join(", ")}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Check-in:</span>{" "}
                        {new Date(event.checkinDate).toLocaleDateString("en-PH")}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Check-out:</span>{" "}
                        {new Date(event.checkoutDate).toLocaleDateString("en-PH")}
                      </p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          {events.length > 3 && <div className="text-[10px] text-muted-foreground">+{events.length - 3} more</div>}
        </div>
      </div>,
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
            <ChevronLeft size={18} />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
            <ChevronRight size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Status Legend */}
        <div className="flex flex-wrap items-center gap-4 border-b border-border px-4 py-2">
          <span className="text-sm font-medium text-muted-foreground">Legend:</span>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-primary" />
            <span className="text-sm">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-warning" />
            <span className="text-sm">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-destructive/50" />
            <span className="text-sm">Cancelled</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {/* Day headers */}
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="border-b border-r border-border bg-background px-2 py-2 text-center text-sm font-semibold text-foreground"
            >
              {day}
            </div>
          ))}
          {/* Calendar days */}
          {days}
        </div>
      </CardContent>
    </Card>
  )
}
