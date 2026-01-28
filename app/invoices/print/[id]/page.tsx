"use client"

import { Building2, Phone, Mail, Globe } from "lucide-react"

// Print-friendly invoice template
export default function PrintInvoicePage() {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  // Sample invoice data
  const invoice = {
    id: "INV001",
    createdAt: "2025-01-12T14:35",
    guestName: "Juan Dela Cruz",
    guestPhone: "+63 912 345 6789",
    guestEmail: "juan.delacruz@email.com",
    stayId: "S001",
    roomNumber: "203",
    roomType: "Deluxe Room",
    checkinDate: "2025-01-12T14:30",
    checkoutDate: "2025-01-15T12:00",
    nights: 3,
    roomRate: 4000,
    roomCharges: 12000,
    services: [
      { name: "Room Service - Breakfast", quantity: 3, unitPrice: 450, total: 1350 },
      { name: "Laundry Service", quantity: 2, unitPrice: 350, total: 700 },
      { name: "Mini Bar", quantity: 4, unitPrice: 200, total: 800 },
    ],
    serviceCharges: 2850,
    totalAmount: 14850,
    paidAmount: 10000,
    balance: 4850,
    status: "partial",
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between border-b border-gray-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Building2 size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ADC Hotel</h1>
              <p className="text-sm text-gray-500">Premium Accommodation</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div className="flex items-center justify-end gap-2">
              <Phone size={14} />
              <span>+63 2 1234 5678</span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Mail size={14} />
              <span>info@adchotel.com</span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Globe size={14} />
              <span>www.adchotel.com</span>
            </div>
          </div>
        </div>

        {/* Invoice Title */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">INVOICE</h2>
          <p className="text-lg text-gray-600">#{invoice.id}</p>
        </div>

        {/* Invoice Details */}
        <div className="mb-8 grid grid-cols-2 gap-8">
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Bill To</h3>
            <p className="font-medium text-gray-900">{invoice.guestName}</p>
            <p className="text-sm text-gray-600">{invoice.guestPhone}</p>
            <p className="text-sm text-gray-600">{invoice.guestEmail}</p>
          </div>
          <div className="text-right">
            <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Invoice Details</h3>
            <p className="text-sm text-gray-600">Date: {formatDate(invoice.createdAt)}</p>
            <p className="text-sm text-gray-600">Stay ID: {invoice.stayId}</p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span
                className={`font-medium ${invoice.status === "paid" ? "text-green-600" : invoice.status === "partial" ? "text-yellow-600" : "text-red-600"}`}
              >
                {invoice.status.toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        {/* Stay Details */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <h3 className="mb-2 font-semibold text-gray-900">Stay Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Room:</span> {invoice.roomNumber} ({invoice.roomType})
            </div>
            <div>
              <span className="text-gray-500">Check-in:</span> {formatDate(invoice.checkinDate)}
            </div>
            <div>
              <span className="text-gray-500">Duration:</span> {invoice.nights} nights
            </div>
            <div>
              <span className="text-gray-500">Check-out:</span> {formatDate(invoice.checkoutDate)}
            </div>
          </div>
        </div>

        {/* Charges Table */}
        <table className="mb-6 w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-3 text-left text-sm font-semibold text-gray-600">Description</th>
              <th className="py-3 text-center text-sm font-semibold text-gray-600">Qty</th>
              <th className="py-3 text-right text-sm font-semibold text-gray-600">Unit Price</th>
              <th className="py-3 text-right text-sm font-semibold text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Room Charges */}
            <tr className="border-b border-gray-100">
              <td className="py-3 text-gray-900">
                {invoice.roomType} - Room {invoice.roomNumber}
              </td>
              <td className="py-3 text-center text-gray-600">{invoice.nights} nights</td>
              <td className="py-3 text-right text-gray-600">{formatCurrency(invoice.roomRate)}</td>
              <td className="py-3 text-right font-medium text-gray-900">{formatCurrency(invoice.roomCharges)}</td>
            </tr>
            {/* Services */}
            {invoice.services.map((service, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-gray-900">{service.name}</td>
                <td className="py-3 text-center text-gray-600">{service.quantity}</td>
                <td className="py-3 text-right text-gray-600">{formatCurrency(service.unitPrice)}</td>
                <td className="py-3 text-right font-medium text-gray-900">{formatCurrency(service.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mb-8 flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Room Charges:</span>
              <span>{formatCurrency(invoice.roomCharges)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Service Charges:</span>
              <span>{formatCurrency(invoice.serviceCharges)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold text-gray-900">
              <span>Total:</span>
              <span>{formatCurrency(invoice.totalAmount)}</span>
            </div>
            {invoice.paidAmount > 0 && (
              <>
                <div className="flex justify-between text-green-600">
                  <span>Paid:</span>
                  <span>-{formatCurrency(invoice.paidAmount)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-red-600">
                  <span>Balance Due:</span>
                  <span>{formatCurrency(invoice.balance)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>Thank you for staying with us!</p>
          <p>For inquiries, please contact our front desk.</p>
        </div>

        {/* Print Button - Hidden on print */}
        <div className="mt-8 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  )
}
