import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { SidebarFilter } from "@/components/SidebarFilter"
import { PropertyListings } from "@/components/property-listings"
import { Footer } from "@/components/footer"

export default function RealEstatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
        <Header />
        <SearchBar />
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Fixed 1/4 width */}
          <aside className="lg:col-span-1">
            <SidebarFilter />
          </aside>
          
          {/* Right Main Column - 3/4 width */}
          <section className="lg:col-span-3">
            <PropertyListings />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
