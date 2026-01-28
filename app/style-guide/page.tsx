"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatusBadge } from "@/components/ui/status-badge"
import { KpiCard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Users, Bed, Calendar, Plus, Edit, Trash2, Check } from "lucide-react"

export default function StyleGuidePage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Style Guide</h1>
          <p className="text-muted-foreground">ADC Hotel Management System component library and design tokens</p>
        </div>

        <Tabs defaultValue="colors" className="space-y-6">
          <TabsList>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Colors</CardTitle>
                <CardDescription>Primary color palette used throughout the application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-20 bg-primary rounded-lg" />
                    <p className="text-sm font-medium">Primary</p>
                    <p className="text-xs text-muted-foreground">#0f62fe</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 bg-primary/80 rounded-lg" />
                    <p className="text-sm font-medium">Primary/80</p>
                    <p className="text-xs text-muted-foreground">80% opacity</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 bg-primary/20 rounded-lg" />
                    <p className="text-sm font-medium">Primary/20</p>
                    <p className="text-xs text-muted-foreground">20% opacity</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 bg-primary/10 rounded-lg" />
                    <p className="text-sm font-medium">Primary/10</p>
                    <p className="text-xs text-muted-foreground">10% opacity</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Semantic Colors</CardTitle>
                <CardDescription>Status and feedback colors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <div className="h-16 bg-green-500 rounded-lg" />
                    <p className="text-sm font-medium">Success</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-amber-500 rounded-lg" />
                    <p className="text-sm font-medium">Warning</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-red-500 rounded-lg" />
                    <p className="text-sm font-medium">Error</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-blue-500 rounded-lg" />
                    <p className="text-sm font-medium">Info</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-slate-500 rounded-lg" />
                    <p className="text-sm font-medium">Neutral</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Background Colors</CardTitle>
                <CardDescription>Surface and background variants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-16 bg-background border border-border rounded-lg" />
                    <p className="text-sm font-medium">Background</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-card border border-border rounded-lg" />
                    <p className="text-sm font-medium">Card</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-muted rounded-lg" />
                    <p className="text-sm font-medium">Muted</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-accent rounded-lg" />
                    <p className="text-sm font-medium">Accent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Headings</CardTitle>
                <CardDescription>Inter font family with various weights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground">Heading 1 - Bold 36px</h1>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-foreground">Heading 2 - Semibold 30px</h2>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">Heading 3 - Semibold 24px</h3>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-foreground">Heading 4 - Medium 20px</h4>
                </div>
                <div>
                  <h5 className="text-lg font-medium text-foreground">Heading 5 - Medium 18px</h5>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Body Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-base text-foreground">
                    Body text - Regular 16px. The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground">
                    Small text - Regular 14px. The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
                <div>
                  <p className="text-xs text-foreground">
                    Extra small - Regular 12px. The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
                <div>
                  <p className="text-base text-muted-foreground">Muted text - For secondary information</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buttons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Buttons with Icons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Button variant="ghost">
                    <Check className="h-4 w-4 mr-2" />
                    Confirm
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button States</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inputs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Text Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>Default Input</Label>
                  <Input placeholder="Enter text..." />
                </div>
                <div className="space-y-2">
                  <Label>Disabled Input</Label>
                  <Input placeholder="Disabled" disabled />
                </div>
                <div className="space-y-2">
                  <Label>With Value</Label>
                  <Input defaultValue="John Doe" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>Room Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deluxe">Deluxe King</SelectItem>
                      <SelectItem value="executive">Executive Suite</SelectItem>
                      <SelectItem value="family">Family Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Room Status Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <StatusBadge status="available" label="Available" />
                  <StatusBadge status="occupied" label="Occupied" />
                  <StatusBadge status="reserved" label="Reserved" />
                  <StatusBadge status="cleaning" label="Cleaning" />
                  <StatusBadge status="maintenance" label="Maintenance" />
                  <StatusBadge status="inactive" label="Out of Order" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reservation Status Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <StatusBadge status="pending" label="Pending" />
                  <StatusBadge status="confirmed" label="Confirmed" />
                  <StatusBadge status="checkedIn" label="Checked In" />
                  <StatusBadge status="checkedOut" label="Checked Out" />
                  <StatusBadge status="cancelled" label="Cancelled" />
                  <StatusBadge status="noShow" label="No Show" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Status Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <StatusBadge status="unpaid" label="Unpaid" />
                  <StatusBadge status="partial" label="Partial" />
                  <StatusBadge status="paid" label="Paid" />
                  <StatusBadge status="refunded" label="Refunded" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>KPI Cards</CardTitle>
                <CardDescription>Key performance indicator cards with trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <KpiCard
                    title="Total Revenue"
                    value="₱1,234,567"
                    change={12.5}
                    changeLabel="vs last month"
                    icon={<DollarSign className="h-5 w-5" />}
                  />
                  <KpiCard
                    title="Total Guests"
                    value="1,234"
                    change={-2.3}
                    changeLabel="vs last month"
                    icon={<Users className="h-5 w-5" />}
                  />
                  <KpiCard
                    title="Occupancy Rate"
                    value="78.5%"
                    change={5.2}
                    changeLabel="vs last month"
                    icon={<Bed className="h-5 w-5" />}
                  />
                  <KpiCard
                    title="Reservations"
                    value="45"
                    change={0}
                    changeLabel="no change"
                    icon={<Calendar className="h-5 w-5" />}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>Basic card component with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This is a standard card component that can contain any content. It uses the CardHeader for title and
                  description, and CardContent for the body.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
