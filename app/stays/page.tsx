"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DoorOpen, History, Plus } from "lucide-react"
import { ActiveStays } from "@/components/stays/active-stays"
import { StayHistory } from "@/components/stays/stay-history"
import { CheckInModal } from "@/components/stays/check-in-modal"

export default function StaysPage() {
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")

  return (
    <MainLayout title="Stays">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-muted-foreground">Manage guest check-ins and check-outs</p>
        </div>
        <Button onClick={() => setIsCheckInModalOpen(true)} className="gap-2">
          <Plus size={18} />
          Walk-in Check-in
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="active" className="gap-2">
            <DoorOpen size={16} />
            Active Stays
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History size={16} />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <ActiveStays />
        </TabsContent>

        <TabsContent value="history">
          <StayHistory />
        </TabsContent>
      </Tabs>

      {/* Check-in Modal */}
      <CheckInModal open={isCheckInModalOpen} onClose={() => setIsCheckInModalOpen(false)} />
    </MainLayout>
  )
}
