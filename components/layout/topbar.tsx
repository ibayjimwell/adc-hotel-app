"use client"

import { useState } from "react"
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  Calendar,
  Users,
  Receipt,
  DoorOpen,
  LogOut,
  Settings,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface TopbarProps {
  title: string
}

const quickActions = [
  { label: "New Reservation", icon: Calendar, href: "/reservations/new" },
  { label: "New Guest", icon: Users, href: "/guests/new" },
  { label: "Check-in", icon: DoorOpen, href: "/stays/checkin" },
  { label: "New Invoice", icon: Receipt, href: "/invoices/new" },
]

const notifications = [
  { id: 1, title: "Check-in Required", message: "Room 101 - John Doe", time: "5 min ago", type: "warning" },
  { id: 2, title: "New Reservation", message: "Maria Santos - 2 nights", time: "15 min ago", type: "info" },
  { id: 3, title: "Check-out Pending", message: "Room 205 - James Cruz", time: "1 hour ago", type: "warning" },
]

export function Topbar({ title }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
      {/* Left: Page Title */}
      <div className="flex items-center gap-4">
        <h1 className="ml-12 text-xl font-semibold text-foreground lg:ml-0">{title}</h1>
      </div>

      {/* Center: Search */}
      <div className="hidden max-w-md flex-1 px-8 md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            type="search"
            placeholder="Search guests, rooms, invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Quick Create */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus size={16} />
              <span className="hidden sm:inline">Quick Create</span>
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {quickActions.map((action) => (
              <DropdownMenuItem key={action.label} className="gap-2">
                <action.icon size={16} />
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-3 py-2">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full items-center justify-between">
                  <span className="font-medium">{notification.title}</span>
                  <Badge variant={notification.type === "warning" ? "destructive" : "secondary"} className="text-xs">
                    {notification.type}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{notification.message}</span>
                <span className="text-xs text-muted">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/professional-staff-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium">Juan Dela Cruz</p>
                <p className="text-xs text-muted">Receptionist</p>
              </div>
              <ChevronDown size={14} className="hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2">
              <User size={16} />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Settings size={16} />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive">
              <LogOut size={16} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
