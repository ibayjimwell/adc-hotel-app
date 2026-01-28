"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  BedDouble,
  Calendar,
  DoorOpen,
  ConciergeBell,
  Receipt,
  CreditCard,
  UserCog,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Building2,
  List,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href?: string
  icon: React.ElementType
  children?: { label: string; href: string; icon: React.ElementType }[]
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Guests", href: "/guests", icon: Users },
  {
    label: "Rooms",
    icon: BedDouble,
    children: [
      { label: "Room Types", href: "/rooms/types", icon: Building2 },
      { label: "Room List", href: "/rooms", icon: List },
    ],
  },
  { label: "Reservations", href: "/reservations", icon: Calendar },
  { label: "Stays", href: "/stays", icon: DoorOpen },
  { label: "Services", href: "/services", icon: ConciergeBell },
  { label: "Billing / Invoices", href: "/invoices", icon: Receipt },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Staff", href: "/staff", icon: UserCog },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Rooms"])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  const isActive = (href: string) => pathname === href
  const isParentActive = (item: NavItem) => item.children?.some((child) => pathname === child.href)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-card p-2 shadow-md lg:hidden"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-border bg-card transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">ADC Hotel</h1>
            <p className="text-xs text-muted">Management System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isParentActive(item)
                          ? "bg-primary-light text-primary"
                          : "text-muted-foreground hover:bg-background hover:text-foreground",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon size={20} />
                        {item.label}
                      </span>
                      {expandedItems.includes(item.label) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {expandedItems.includes(item.label) && (
                      <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                isActive(child.href)
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-background hover:text-foreground",
                              )}
                            >
                              <child.icon size={18} />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(item.href!)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-background hover:text-foreground",
                    )}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted">© 2025 ADC Hotel</p>
        </div>
      </aside>
    </>
  )
}
