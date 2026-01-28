"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, CreditCard, Printer, Download, FileText } from "lucide-react"
import { sampleInvoices } from "@/lib/sample-data"
import { InvoiceDetailModal } from "@/components/invoices/invoice-detail-modal"
import { PaymentModal } from "@/components/invoices/payment-modal"

interface Invoice {
  id: string
  stayId: string
  guestName: string
  roomCharges: number
  serviceCharges: number
  totalAmount: number
  status: string
  paidAmount?: number
  createdAt: string
}

export default function InvoicesPage() {
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  const columns = [
    { key: "id", header: "Invoice ID" },
    { key: "stayId", header: "Stay ID" },
    {
      key: "guestName",
      header: "Guest",
      render: (invoice: Invoice) => <span className="font-medium">{invoice.guestName}</span>,
    },
    {
      key: "roomCharges",
      header: "Room Charges",
      render: (invoice: Invoice) => formatCurrency(invoice.roomCharges),
    },
    {
      key: "serviceCharges",
      header: "Services",
      render: (invoice: Invoice) => formatCurrency(invoice.serviceCharges),
    },
    {
      key: "totalAmount",
      header: "Total",
      render: (invoice: Invoice) => <span className="font-semibold">{formatCurrency(invoice.totalAmount)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (invoice: Invoice) => <StatusBadge status={invoice.status} />,
    },
    {
      key: "createdAt",
      header: "Created",
      render: (invoice: Invoice) => formatDate(invoice.createdAt),
    },
  ]

  const handleViewDetail = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setDetailModalOpen(true)
  }

  const handlePayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setPaymentModalOpen(true)
  }

  const renderActions = (invoice: Invoice) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleViewDetail(invoice)} className="gap-2">
          <Eye size={16} />
          View Details
        </DropdownMenuItem>
        {invoice.status !== "paid" && (
          <DropdownMenuItem onClick={() => handlePayment(invoice)} className="gap-2">
            <CreditCard size={16} />
            Record Payment
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Printer size={16} />
          Print Invoice
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Download size={16} />
          Export PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <MainLayout title="Billing / Invoices">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-muted-foreground">Manage invoices and billing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download size={18} />
            Export CSV
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <FileText size={18} />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-destructive/30 bg-destructive-light p-4">
          <p className="text-sm text-muted-foreground">Unpaid Invoices</p>
          <p className="text-2xl font-bold text-destructive">
            {formatCurrency(
              sampleInvoices.filter((i) => i.status === "unpaid").reduce((sum, i) => sum + i.totalAmount, 0),
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {sampleInvoices.filter((i) => i.status === "unpaid").length} invoices
          </p>
        </div>
        <div className="rounded-lg border border-warning/30 bg-warning-light p-4">
          <p className="text-sm text-muted-foreground">Partial Payments</p>
          <p className="text-2xl font-bold text-[#b28600]">
            {formatCurrency(
              sampleInvoices
                .filter((i) => i.status === "partial")
                .reduce((sum, i) => sum + i.totalAmount - (i.paidAmount || 0), 0),
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {sampleInvoices.filter((i) => i.status === "partial").length} invoices
          </p>
        </div>
        <div className="rounded-lg border border-success/30 bg-success-light p-4">
          <p className="text-sm text-muted-foreground">Paid This Month</p>
          <p className="text-2xl font-bold text-success">
            {formatCurrency(
              sampleInvoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.totalAmount, 0),
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {sampleInvoices.filter((i) => i.status === "paid").length} invoices
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={sampleInvoices}
        searchPlaceholder="Search by invoice ID or guest name..."
        actions={renderActions}
      />

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false)
          setSelectedInvoice(null)
        }}
        invoice={selectedInvoice}
        onPayment={() => {
          setDetailModalOpen(false)
          setPaymentModalOpen(true)
        }}
      />

      {/* Payment Modal */}
      <PaymentModal
        open={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false)
          setSelectedInvoice(null)
        }}
        invoice={selectedInvoice}
      />
    </MainLayout>
  )
}
