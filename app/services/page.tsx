"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Search, Banknote, ConciergeBell } from "lucide-react"
import { sampleServices } from "@/lib/sample-data"
import { ServiceFormModal } from "@/components/services/service-form-modal"

interface Service {
  id: string
  name: string
  price: number
}

export default function ServicesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const filteredServices = sampleServices.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    setIsEditModalOpen(true)
  }

  return (
    <MainLayout title="Services">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-muted-foreground">Manage hotel services and pricing</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
          <Plus size={18} />
          Add Service
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light">
                  <ConciergeBell size={20} className="text-primary" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(service)}>
                  <Edit size={16} />
                </Button>
              </div>
              <h3 className="mb-1 font-semibold text-foreground">{service.name}</h3>
              <div className="flex items-center gap-1 text-lg font-bold text-primary">
                <Banknote size={18} />
                {formatCurrency(service.price)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Service Modal */}
      <ServiceFormModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} mode="create" />

      {/* Edit Service Modal */}
      <ServiceFormModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedService(null)
        }}
        mode="edit"
        service={selectedService}
      />
    </MainLayout>
  )
}
