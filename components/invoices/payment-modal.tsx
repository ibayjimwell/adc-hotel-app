"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Banknote, CreditCard, Smartphone, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  invoice: Invoice | null
}

const paymentMethods = [
  { id: "cash", label: "Cash", icon: Banknote },
  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
  { id: "gcash", label: "GCash", icon: Smartphone },
  { id: "other", label: "Other", icon: Wallet },
]

export function PaymentModal({ open, onClose, invoice }: PaymentModalProps) {
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("")
  const [note, setNote] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!invoice) return null

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value)

  const remainingBalance = invoice.totalAmount - (invoice.paidAmount || 0)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!amount || Number(amount) <= 0) {
      newErrors.amount = "Valid amount is required"
    }
    if (Number(amount) > remainingBalance) {
      newErrors.amount = "Amount exceeds remaining balance"
    }
    if (!method) {
      newErrors.method = "Payment method is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    const isFullPayment = Number(amount) === remainingBalance
    toast({
      title: "Payment Recorded",
      description: `${formatCurrency(Number(amount))} payment for Invoice ${invoice.id} has been recorded.${isFullPayment ? " Invoice marked as paid." : ""}`,
    })
    setAmount("")
    setMethod("")
    setNote("")
    onClose()
  }

  const handleFullPayment = () => {
    setAmount(remainingBalance.toString())
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Record Payment"
      description={`Payment for Invoice ${invoice.id}`}
      size="md"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Record Payment</Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Invoice Summary */}
        <Card className="bg-background">
          <CardContent className="p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Guest</span>
              <span className="font-medium">{invoice.guestName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Invoice Total</span>
              <span>{formatCurrency(invoice.totalAmount)}</span>
            </div>
            {invoice.paidAmount && invoice.paidAmount > 0 && (
              <div className="flex justify-between text-sm text-success">
                <span>Already Paid</span>
                <span>{formatCurrency(invoice.paidAmount)}</span>
              </div>
            )}
            <div className="mt-2 flex justify-between border-t border-border pt-2 text-lg font-bold">
              <span>Remaining Balance</span>
              <span className="text-destructive">{formatCurrency(remainingBalance)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <div className="space-y-2">
          <Label>
            Payment Method <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {paymentMethods.map((pm) => (
              <button
                key={pm.id}
                type="button"
                onClick={() => setMethod(pm.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-3 transition-colors",
                  method === pm.id ? "border-primary bg-primary-light" : "border-border hover:bg-background",
                )}
              >
                <pm.icon size={18} className={method === pm.id ? "text-primary" : "text-muted-foreground"} />
                <span className={cn("text-sm font-medium", method === pm.id ? "text-primary" : "text-foreground")}>
                  {pm.label}
                </span>
              </button>
            ))}
          </div>
          {errors.method && <p className="text-xs text-destructive">{errors.method}</p>}
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="amount">
              Amount (PHP) <span className="text-destructive">*</span>
            </Label>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={handleFullPayment}>
              Pay Full Balance
            </Button>
          </div>
          <Input
            id="amount"
            type="number"
            min="0"
            max={remainingBalance}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
          {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
        </div>

        {/* Note */}
        <div className="space-y-2">
          <Label htmlFor="note">Note (Optional)</Label>
          <Textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Payment reference, receipt number, etc."
            rows={2}
          />
        </div>

        {/* Payment Preview */}
        {amount && Number(amount) > 0 && (
          <div className="rounded-lg bg-success-light p-3 text-sm">
            <div className="flex justify-between">
              <span>After this payment:</span>
              <span className="font-semibold">
                {Number(amount) >= remainingBalance ? (
                  <span className="text-success">Fully Paid</span>
                ) : (
                  <span className="text-[#b28600]">{formatCurrency(remainingBalance - Number(amount))} remaining</span>
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
