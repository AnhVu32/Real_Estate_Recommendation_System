"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarFilter } from "@/components/SidebarFilter"
import { AIChat } from "@/components/ai-chat"

export default function AdvancedSearchPage() {
  // State lifting: track filters from SidebarFilter and pass to AIChat
  const [currentFilters, setCurrentFilters] = useState<any>({})

  const handleApplyFilters = (filters: any) => {
    console.log("[v0] Page received filters:", filters)
    setCurrentFilters(filters)
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-background">
      {/* Fixed height header - only top navigation */}
      <div className="shrink-0">
        <Header />
      </div>
      
      {/* Main content - grid layout with independently scrollable columns */}
      <main className="flex-1 min-h-0 grid grid-cols-12 overflow-hidden">
        {/* Left Column - Complex Filter (col-span-5) */}
        <aside className="col-span-12 lg:col-span-5 h-full min-h-0 overflow-y-auto border-r border-border p-6">
          <SidebarFilter onApplyFilters={handleApplyFilters} showSupportCard={false} />
        </aside>
        
        {/* Right Column - AI Chat (col-span-7) */}
        <section className="col-span-12 lg:col-span-7 h-full min-h-0 overflow-hidden bg-muted/30">
          <AIChat filters={currentFilters} />
        </section>
      </main>
      
      {/* NO FOOTER */}
    </div>
  )
}
