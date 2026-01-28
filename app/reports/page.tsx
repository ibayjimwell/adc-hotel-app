"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { KpiCard } from "@/components/ui/kpi-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, TrendingDown, DollarSign, Bed, Users, Calendar, FileText, Printer } from "lucide-react"

const revenueData = [
  { month: "Jan", rooms: 125000, services: 28000, total: 153000 },
  { month: "Feb", rooms: 138000, services: 32000, total: 170000 },
  { month: "Mar", rooms: 145000, services: 35000, total: 180000 },
  { month: "Apr", rooms: 152000, services: 38000, total: 190000 },
  { month: "May", rooms: 168000, services: 42000, total: 210000 },
  { month: "Jun", rooms: 175000, services: 45000, total: 220000 },
]

const occupancyData = [
  { month: "Jan", occupancy: 68, adr: 3200 },
  { month: "Feb", occupancy: 72, adr: 3350 },
  { month: "Mar", occupancy: 78, adr: 3400 },
  { month: "Apr", occupancy: 82, adr: 3500 },
  { month: "May", occupancy: 85, adr: 3600 },
  { month: "Jun", occupancy: 88, adr: 3750 },
]

const roomTypeRevenue = [
  { name: "Deluxe King", value: 45000, color: "#0f62fe" },
  { name: "Deluxe Twin", value: 38000, color: "#6366f1" },
  { name: "Executive Suite", value: 52000, color: "#10b981" },
  { name: "Family Room", value: 28000, color: "#f59e0b" },
  { name: "Standard Room", value: 22000, color: "#64748b" },
]

const guestSourceData = [
  { source: "Direct Booking", count: 145 },
  { source: "OTA (Booking.com)", count: 98 },
  { source: "OTA (Agoda)", count: 76 },
  { source: "Corporate", count: 52 },
  { source: "Walk-in", count: 34 },
]

const topServices = [
  { name: "Room Service", revenue: 18500, count: 245 },
  { name: "Laundry", revenue: 8200, count: 156 },
  { name: "Mini Bar", revenue: 6800, count: 312 },
  { name: "Spa Services", revenue: 12400, count: 89 },
  { name: "Airport Transfer", revenue: 5600, count: 67 },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("this-month")
  const [reportType, setReportType] = useState("revenue")

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Revenue"
            value="₱1,123,000"
            change={12.5}
            changeLabel="vs last month"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <KpiCard
            title="Occupancy Rate"
            value="78.5%"
            change={5.2}
            changeLabel="vs last month"
            icon={<Bed className="h-5 w-5" />}
          />
          <KpiCard
            title="Total Guests"
            value="405"
            change={8.1}
            changeLabel="vs last month"
            icon={<Users className="h-5 w-5" />}
          />
          <KpiCard
            title="Avg. Daily Rate"
            value="₱3,450"
            change={-2.3}
            changeLabel="vs last month"
            icon={<Calendar className="h-5 w-5" />}
          />
        </div>

        <Tabs value={reportType} onValueChange={setReportType} className="space-y-4">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Revenue Breakdown</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Rooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">Services</span>
                    </div>
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickFormatter={(v) => `₱${v / 1000}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`₱${value.toLocaleString()}`, ""]}
                      />
                      <Bar dataKey="rooms" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="services" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">Revenue by Room Type</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roomTypeRevenue}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {roomTypeRevenue.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`₱${value.toLocaleString()}`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {roomTypeRevenue.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium text-foreground">₱{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Revenue Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Room Revenue</p>
                  <p className="text-xl font-semibold text-foreground">₱903,000</p>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>+14.2%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service Revenue</p>
                  <p className="text-xl font-semibold text-foreground">₱220,000</p>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>+8.7%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rev per Room</p>
                  <p className="text-xl font-semibold text-foreground">₱4,250</p>
                  <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
                    <TrendingDown className="h-3.5 w-3.5" />
                    <span>-1.8%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">RevPAR</p>
                  <p className="text-xl font-semibold text-foreground">₱2,710</p>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>+6.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="occupancy" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">Occupancy Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={occupancyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}%`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value}%`, "Occupancy"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="occupancy"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">Average Daily Rate (ADR)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={occupancyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₱${v}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`₱${value.toLocaleString()}`, "ADR"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="adr"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: "#10b981", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Room Status Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-semibold text-green-600">18</p>
                  <p className="text-sm text-muted-foreground">Occupied</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-semibold text-blue-600">12</p>
                  <p className="text-sm text-muted-foreground">Available</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-semibold text-amber-600">4</p>
                  <p className="text-sm text-muted-foreground">Reserved</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-semibold text-purple-600">3</p>
                  <p className="text-sm text-muted-foreground">Cleaning</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-semibold text-red-600">1</p>
                  <p className="text-sm text-muted-foreground">Maintenance</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guests" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">Guest Source Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={guestSourceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis
                        dataKey="source"
                        type="category"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        width={120}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">Guest Statistics</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">New Guests</p>
                      <p className="text-xl font-semibold text-foreground">287</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>+18.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Returning Guests</p>
                      <p className="text-xl font-semibold text-foreground">118</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>+5.7%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Stay Duration</p>
                      <p className="text-xl font-semibold text-foreground">2.4 nights</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <TrendingDown className="h-3.5 w-3.5" />
                      <span>-0.3</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Guest Satisfaction</p>
                      <p className="text-xl font-semibold text-foreground">4.6 / 5.0</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>+0.2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Top Guests by Revenue</h3>
              <div className="space-y-3">
                {[
                  { name: "ABC Corporation", revenue: 125000, stays: 12 },
                  { name: "XYZ Holdings", revenue: 98000, stays: 8 },
                  { name: "Juan dela Cruz", revenue: 45000, stays: 15 },
                  { name: "Maria Santos", revenue: 38000, stays: 10 },
                  { name: "Global Tech Inc.", revenue: 32000, stays: 5 },
                ].map((guest, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{guest.name}</p>
                        <p className="text-sm text-muted-foreground">{guest.stays} stays</p>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">₱{guest.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">Top Services by Revenue</h3>
                <div className="space-y-4">
                  {topServices.map((service, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{service.name}</span>
                        <span className="text-sm text-muted-foreground">₱{service.revenue.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(service.revenue / 18500) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">Service Usage Count</h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topServices}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={10}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Service Performance Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Total Service Revenue</p>
                  <p className="text-xl font-semibold text-foreground">₱51,500</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-xl font-semibold text-foreground">869</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                  <p className="text-xl font-semibold text-foreground">₱59.26</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service / Room Revenue</p>
                  <p className="text-xl font-semibold text-foreground">5.7%</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Quick Reports</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Daily Operations", icon: FileText },
              { name: "Night Audit", icon: FileText },
              { name: "Room Status", icon: Bed },
              { name: "Financial Summary", icon: DollarSign },
            ].map((report) => (
              <Button
                key={report.name}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
              >
                <report.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{report.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
