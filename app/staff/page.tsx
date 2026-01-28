"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Key, Mail, Phone } from "lucide-react"
import { StaffFormModal } from "@/components/staff/staff-form-modal"

type StaffMember = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "admin" | "manager" | "receptionist" | "housekeeping" | "maintenance"
  status: "active" | "inactive"
  hireDate: string
  avatar?: string
}

const mockStaff: StaffMember[] = [
  {
    id: "STF001",
    firstName: "Maria",
    lastName: "Santos",
    email: "maria.santos@adchotel.com",
    phone: "+63 917 123 4567",
    role: "admin",
    status: "active",
    hireDate: "2020-03-15",
  },
  {
    id: "STF002",
    firstName: "Juan",
    lastName: "Cruz",
    email: "juan.cruz@adchotel.com",
    phone: "+63 918 234 5678",
    role: "manager",
    status: "active",
    hireDate: "2021-06-01",
  },
  {
    id: "STF003",
    firstName: "Anna",
    lastName: "Reyes",
    email: "anna.reyes@adchotel.com",
    phone: "+63 919 345 6789",
    role: "receptionist",
    status: "active",
    hireDate: "2022-01-10",
  },
  {
    id: "STF004",
    firstName: "Pedro",
    lastName: "Garcia",
    email: "pedro.garcia@adchotel.com",
    phone: "+63 920 456 7890",
    role: "housekeeping",
    status: "active",
    hireDate: "2022-04-20",
  },
  {
    id: "STF005",
    firstName: "Lisa",
    lastName: "Tan",
    email: "lisa.tan@adchotel.com",
    phone: "+63 921 567 8901",
    role: "maintenance",
    status: "inactive",
    hireDate: "2021-09-05",
  },
]

const roleColors: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700",
  manager: "bg-blue-100 text-blue-700",
  receptionist: "bg-green-100 text-green-700",
  housekeeping: "bg-amber-100 text-amber-700",
  maintenance: "bg-slate-100 text-slate-700",
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null)

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const columns = [
    {
      key: "name",
      header: "Staff Member",
      render: (row: StaffMember) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={row.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {row.firstName[0]}
              {row.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">
              {row.firstName} {row.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{row.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (row: StaffMember) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{row.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            <span>{row.phone}</span>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (row: StaffMember) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${roleColors[row.role]}`}
        >
          {row.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: StaffMember) => (
        <StatusBadge
          status={row.status === "active" ? "available" : "inactive"}
          label={row.status === "active" ? "Active" : "Inactive"}
        />
      ),
    },
    {
      key: "hireDate",
      header: "Hire Date",
      render: (row: StaffMember) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.hireDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row: StaffMember) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setEditingStaff(row)
                setShowFormModal(true)
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Key className="h-4 w-4 mr-2" />
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => setStaff(staff.filter((s) => s.id !== row.id))}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Staff Management</h1>
            <p className="text-muted-foreground">Manage hotel staff accounts and permissions</p>
          </div>
          <Button
            onClick={() => {
              setEditingStaff(null)
              setShowFormModal(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Staff</p>
            <p className="text-2xl font-semibold text-foreground">{staff.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-semibold text-green-600">{staff.filter((s) => s.status === "active").length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Managers</p>
            <p className="text-2xl font-semibold text-blue-600">
              {staff.filter((s) => s.role === "manager" || s.role === "admin").length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Front Desk</p>
            <p className="text-2xl font-semibold text-primary">
              {staff.filter((s) => s.role === "receptionist").length}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg">
          <div className="p-4 border-b border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DataTable columns={columns} data={filteredStaff} />
        </div>
      </div>

      <StaffFormModal
        open={showFormModal}
        onClose={() => {
          setShowFormModal(false)
          setEditingStaff(null)
        }}
        staff={editingStaff}
        onSave={(data) => {
          if (editingStaff) {
            setStaff(staff.map((s) => (s.id === editingStaff.id ? { ...s, ...data } : s)))
          } else {
            setStaff([...staff, { ...data, id: `STF${String(staff.length + 1).padStart(3, "0")}` } as StaffMember])
          }
          setShowFormModal(false)
          setEditingStaff(null)
        }}
      />
    </MainLayout>
  )
}
