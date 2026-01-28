"use client"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Building2, User, BedDouble, ConciergeBell, CreditCard, Printer } from "lucide-react"

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

interface InvoiceDetailModalProps {
  open: boolean
  onClose: () => void
  invoice: Invoice | null
  onPayment: () => void
}

// Sample payment history
const paymentHistory = [{ id: 1, amount: 10000, method: "Cash", date: "2025-01-11T15:30", note: "Initial deposit" }]

// Sample service breakdown
const serviceBreakdown = [
  { name: "Room Service - Breakfast", quantity: 3, unitPrice: 450, total: 1350 },
  { name: "Laundry Service", quantity: 2, unitPrice: 350, total: 700 },
  { name: "Mini Bar", quantity: 4, unitPrice: 200, total: 800 },
]

export function InvoiceDetailModal({ open, onClose, invoice, onPayment }: InvoiceDetailModalProps) {
  if (!invoice) return null

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

  const remainingBalance = invoice.totalAmount - (invoice.paidAmount || 0)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Invoice ${invoice.id}`}
      size="xl"
      footer={
        <div className="flex justify-between">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Printer size={16} />
            Print Invoice
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {invoice.status !== "paid" && (
              <Button onClick={onPayment} className="gap-2">
                <CreditCard size={16} />
                Record Payment
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Invoice Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold">ADC Hotel</h2>
              <p className="text-sm text-muted-foreground">Invoice #{invoice.id}</p>
            </div>
          </div>
          <div className="text-right">
            <StatusBadge status={invoice.status} />
            <p className="mt-1 text-sm text-muted-foreground">Created: {formatDate(invoice.createdAt)}</p>
          </div>
        </div>

        {/* Guest & Stay Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <User size={14} className="text-primary" />
                Guest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{invoice.guestName}</p>
              <p className="text-sm text-muted-foreground">Stay ID: {invoice.stayId}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <BedDouble size={14} className="text-primary" />
                Room Charges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{formatCurrency(invoice.roomCharges)}</p>
              <p className="text-sm text-muted-foreground">3 nights × ₱4,000/night</p>
            </CardContent>
          </Card>
        </div>

        {/* Service Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <ConciergeBell size={14} className="text-primary" />
              Service Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Service</th>
                    <th className="pb-2 text-center font-medium text-muted-foreground">Qty</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Unit Price</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceBreakdown.map((item, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2 text-center">{item.quantity}</td>
                      <td className="py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                      <td className="py-2 text-right font-medium">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-2 text-right font-medium">
                      Total Services
                    </td>
                    <td className="pt-2 text-right font-semibold">{formatCurrency(invoice.serviceCharges)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Totals */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room Charges</span>
                  <span>{formatCurrency(invoice.roomCharges)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Charges</span>
                  <span>{formatCurrency(invoice.serviceCharges)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
                  <span>Total Amount</span>
                  <span>{formatCurrency(invoice.totalAmount)}</span>
                </div>
                {invoice.paidAmount && invoice.paidAmount > 0 && (
                  <>
                    <div className="flex justify-between text-success">
                      <span>Paid</span>
                      <span>-{formatCurrency(invoice.paidAmount)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-destructive">
                      <span>Balance Due</span>
                      <span>{formatCurrency(remainingBalance)}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <CreditCard size={14} className="text-primary" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {invoice.paidAmount && invoice.paidAmount > 0 ? (
                <div className="space-y-2">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="rounded-lg border border-border p-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{formatCurrency(payment.amount)}</span>
                        <span className="text-sm text-muted-foreground">{payment.method}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{formatDate(payment.date)}</p>
                      {payment.note && <p className="text-xs text-muted-foreground">{payment.note}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">No payments recorded</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Modal>
  )
}
