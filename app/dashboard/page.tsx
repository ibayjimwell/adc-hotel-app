"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { KpiCard } from "@/components/ui/kpi-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BedDouble, DoorOpen, LogOut, Banknote, Calendar, Receipt, ArrowRight, Clock } from "lucide-react"
import { dashboardKpis, sampleReservations, sampleStays, sampleInvoices } from "@/lib/sample-data"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const occupancyData = [
  { day: "Mon", occupancy: 58 },
  { day: "Tue", occupancy: 62 },
  { day: "Wed", occupancy: 70 },
  { day: "Thu", occupancy: 65 },
  { day: "Fri", occupancy: 78 },
  { day: "Sat", occupancy: 85 },
  { day: "Sun", occupancy: 64 },
]

const revenueData = [
  { day: "Mon", revenue: 85000 },
  { day: "Tue", revenue: 92000 },
  { day: "Wed", revenue: 105000 },
  { day: "Thu", revenue: 98000 },
  { day: "Fri", revenue: 125000 },
  { day: "Sat", revenue: 145000 },
  { day: "Sun", revenue: 110000 },
]

const roomDistribution = [
  { name: "Standard", value: 20, color: "#0f62fe" },
  { name: "Deluxe", value: 15, color: "#8a3ffc" },
  { name: "Suite", value: 8, color: "#24a148" },
  { name: "Family", value: 10, color: "#f1c21b" },
  { name: "Presidential", value: 2, color: "#da1e28" },
]

export default function DashboardPage() {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-PH", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })

  return (
    <MainLayout title="Dashboard">
      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          title="Current Occupancy"
          value={`${dashboardKpis.currentOccupancy.percentage}%`}
          subtitle={`${dashboardKpis.currentOccupancy.count} of ${dashboardKpis.currentOccupancy.total} rooms`}
          icon={BedDouble}
          trend={{ value: 5, isPositive: true }}
        />
        <KpiCard
          title="Available Rooms"
          value={dashboardKpis.availableRooms}
          subtitle="Ready for check-in"
          icon={BedDouble}
        />
        <KpiCard
          title="Today's Check-ins"
          value={dashboardKpis.todayCheckins}
          subtitle="Expected arrivals"
          icon={DoorOpen}
        />
        <KpiCard
          title="Today's Check-outs"
          value={dashboardKpis.todayCheckouts}
          subtitle="Expected departures"
          icon={LogOut}
        />
        <KpiCard
          title="Revenue Today"
          value={formatCurrency(dashboardKpis.revenueToday)}
          icon={Banknote}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Occupancy Trend */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Occupancy Trend (7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={occupancyData}>
                <defs>
                  <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f62fe" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0f62fe" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#8d8d8d" />
                <YAxis tick={{ fontSize: 12 }} stroke="#8d8d8d" unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e0e0e0" }}
                  formatter={(value: number) => [`${value}%`, "Occupancy"]}
                />
                <Area
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#0f62fe"
                  fill="url(#occupancyGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Daily Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#8d8d8d" />
                <YAxis tick={{ fontSize: 12 }} stroke="#8d8d8d" tickFormatter={(v) => `₱${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e0e0e0" }}
                  formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#0f62fe" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Room Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Room Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={roomDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {roomDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e0e0e0" }}
                  formatter={(value: number, name: string) => [value, name]}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs text-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button className="gap-2">
          <Calendar size={18} />
          Create Reservation
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <DoorOpen size={18} />
          Check-in
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Receipt size={18} />
          Generate Invoice
        </Button>
      </div>

      {/* Lists Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upcoming Reservations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Upcoming Reservations</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              View all <ArrowRight size={14} />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleReservations
              .filter((r) => r.status !== "cancelled")
              .slice(0, 4)
              .map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{reservation.guestName}</p>
                    <p className="text-sm text-muted-foreground">Room {reservation.rooms.join(", ")}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                      <Clock size={12} />
                      {formatDate(reservation.checkinDate)}
                    </div>
                  </div>
                  <StatusBadge status={reservation.status} />
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Active Stays */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Active Stays</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              View all <ArrowRight size={14} />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleStays.map((stay) => (
              <div key={stay.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium text-foreground">{stay.guestName}</p>
                  <p className="text-sm text-muted-foreground">Room {stay.roomNumber}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <Clock size={12} />
                    Check-out: {formatDate(stay.expectedCheckout)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatCurrency(stay.charges)}</p>
                  <StatusBadge status="active" className="mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Recent Invoices</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              View all <ArrowRight size={14} />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium text-foreground">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">{invoice.guestName}</p>
                  <div className="mt-1 text-xs text-muted">{formatDate(invoice.createdAt)}</div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatCurrency(invoice.totalAmount)}</p>
                  <StatusBadge status={invoice.status} className="mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
