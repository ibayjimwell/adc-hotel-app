"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Banknote, CreditCard, Smartphone, Wallet, Download } from "lucide-react"

const samplePayments = [
  {
    id: "PAY001",
    invoiceId: "INV001",
    guestName: "Juan Dela Cruz",
    amount: 5000,
    method: "Cash",
    date: "2025-01-12T14:30",
    note: "Partial payment",
  },
  {
    id: "PAY002",
    invoiceId: "INV002",
    guestName: "Maria Santos",
    amount: 10000,
    method: "GCash",
    date: "2025-01-11T16:45",
    note: "Initial deposit",
  },
  {
    id: "PAY003",
    invoiceId: "INV003",
    guestName: "Jose Rizal",
    amount: 50500,
    method: "Credit Card",
    date: "2025-01-10T18:00",
    note: "Full payment - Visa",
  },
  {
    id: "PAY004",
    invoiceId: "INV002",
    guestName: "Maria Santos",
    amount: 4850,
    method: "Cash",
    date: "2025-01-13T09:15",
    note: "Final payment",
  },
]

interface Payment {
  id: string
  invoiceId: string
  guestName: string
  amount: number
  method: string
  date: string
  note: string
}

export default function PaymentsPage() {
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

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "cash":
        return <Banknote size={16} className="text-success" />
      case "credit card":
      case "debit card":
        return <CreditCard size={16} className="text-primary" />
      case "gcash":
        return <Smartphone size={16} className="text-[#007bff]" />
      default:
        return <Wallet size={16} className="text-muted-foreground" />
    }
  }

  const todayPayments = samplePayments.reduce((sum, p) => sum + p.amount, 0)
  const cashPayments = samplePayments.filter((p) => p.method === "Cash").reduce((sum, p) => sum + p.amount, 0)
  const cardPayments = samplePayments.filter((p) => p.method === "Credit Card").reduce((sum, p) => sum + p.amount, 0)
  const gcashPayments = samplePayments.filter((p) => p.method === "GCash").reduce((sum, p) => sum + p.amount, 0)

  const columns = [
    { key: "id", header: "Payment ID" },
    { key: "invoiceId", header: "Invoice" },
    {
      key: "guestName",
      header: "Guest",
      render: (payment: Payment) => <span className="font-medium">{payment.guestName}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      render: (payment: Payment) => (
        <span className="font-semibold text-success">{formatCurrency(payment.amount)}</span>
      ),
    },
    {
      key: "method",
      header: "Method",
      render: (payment: Payment) => (
        <div className="flex items-center gap-2">
          {getMethodIcon(payment.method)}
          <span>{payment.method}</span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (payment: Payment) => formatDate(payment.date),
    },
    {
      key: "note",
      header: "Note",
      render: (payment: Payment) => <span className="text-muted-foreground">{payment.note || "-"}</span>,
    },
  ]

  return (
    <MainLayout title="Payments">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-muted-foreground">View and track all payment transactions</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download size={18} />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-light">
                <Banknote size={20} className="text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Today</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(todayPayments)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-light">
                <Banknote size={20} className="text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cash</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(cashPayments)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light">
                <CreditCard size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Card</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(cardPayments)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f0ff]">
                <Smartphone size={20} className="text-[#007bff]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">GCash</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(gcashPayments)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable columns={columns} data={samplePayments} searchPlaceholder="Search payments..." />
    </MainLayout>
  )
}
