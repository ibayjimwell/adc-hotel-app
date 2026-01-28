"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, List } from "lucide-react"
import { ReservationCalendar } from "@/components/reservations/reservation-calendar"
import { ReservationList } from "@/components/reservations/reservation-list"
import { ReservationFormModal } from "@/components/reservations/reservation-form-modal"

export default function ReservationsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("calendar")

  return (
    <MainLayout title="Reservations">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-muted-foreground">Manage hotel reservations and bookings</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
          <Plus size={18} />
          New Reservation
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="calendar" className="gap-2">
            <Calendar size={16} />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-2">
            <List size={16} />
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <ReservationCalendar />
        </TabsContent>

        <TabsContent value="list">
          <ReservationList />
        </TabsContent>
      </Tabs>

      {/* Create Reservation Modal */}
      <ReservationFormModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </MainLayout>
  )
}
