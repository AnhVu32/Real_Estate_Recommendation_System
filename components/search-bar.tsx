"use client"

import { Search, Map } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  return (
    <div className="border-b border-border bg-background py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3">
          {/* Main Search Input with integrated button */}
          <div className="relative flex-1 flex items-center bg-muted/50 border border-border rounded-lg overflow-hidden">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Chung cư Vinhomes 2 ngủ"
              className="pl-12 pr-4 py-3 h-12 w-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="absolute right-2 bg-[#E03C31] hover:bg-[#c43428] text-white h-9 px-5 rounded-md">
              Tìm kiếm
            </Button>
          </div>

          {/* Map Button */}
          <Button className="bg-[#2A9D8F] hover:bg-[#238b7f] text-white h-12 px-5 flex items-center gap-2 rounded-lg shrink-0">
            <Map className="h-5 w-5" />
            <span>Xem bản đồ</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
