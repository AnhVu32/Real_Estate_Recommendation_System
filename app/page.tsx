"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { SidebarFilter } from "@/components/SidebarFilter"
import { PropertyListings } from "@/components/property-listings"
import { Footer } from "@/components/footer"

export default function RealEstatePage() {
  const [activeFilters, setActiveFilters] = useState<any>({})
  const [liveFilters, setLiveFilters] = useState<any>({})
  const [sortOption, setSortOption] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)

  const handleFilterChange = useCallback((draftFilters: any) => {
    console.log("[v0] Live filters updated:", draftFilters)
    // Track live/draft filters from the sidebar
    setLiveFilters(draftFilters)
  }, [])

  const handleApplyFilters = useCallback((filters: any) => {
    console.log("[v0] Filters applied:", filters)
    // Preserve the query when applying filters
    const currentQuery = activeFilters.query || ""
    const mergedFilters = {
      ...filters,
      ...(currentQuery && { query: currentQuery })
    }
    setActiveFilters(mergedFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }, [activeFilters])

  const handleSearch = useCallback((query: string) => {
    console.log("[v0] Search query:", query)
    // Merge live filters with the search query
    const mergedFilters = {
      ...liveFilters,
      query: query
    }
    setActiveFilters(mergedFilters)
    setCurrentPage(1) // Reset to first page when search query changes
  }, [liveFilters])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
        <Header />
        <SearchBar onSearch={handleSearch} />
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Sticky with independent scrolling */}
          <aside className="lg:col-span-1 sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <SidebarFilter 
              onApplyFilters={handleApplyFilters}
              onFilterChange={handleFilterChange}
            />
          </aside>
          
          {/* Right Main Column - 3/4 width */}
          <section className="lg:col-span-3">
            <PropertyListings 
              activeFilters={activeFilters}
              sortOption={sortOption}
              onSortChange={setSortOption}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
