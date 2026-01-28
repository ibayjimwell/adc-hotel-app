"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

interface MainLayoutProps {
  children: React.ReactNode
  title: string
}

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <Topbar title={title} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
