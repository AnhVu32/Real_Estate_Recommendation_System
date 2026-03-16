"use client"

import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AdvancedFilter } from "@/components/advanced-filter"

interface SidebarFilterProps {
  onApplyFilters?: (filters: any) => void
  showSupportCard?: boolean
}

export function SidebarFilter({ onApplyFilters, showSupportCard = true }: SidebarFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleApplyFilters = (filters: any) => {
    console.log("[v0] SidebarFilter received filters:", filters)
    onApplyFilters?.(filters)
    setIsOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Filter Card */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="h-5 w-5 text-[#E03C31]" />
          <h2 className="font-semibold text-foreground">Bộ lọc chi tiết</h2>
        </div>

        {/* Open Advanced Filter Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#E03C31] hover:bg-[#c43428] text-white h-11">
              Tùy chỉnh bộ lọc
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tìm kiếm chuyên sâu</DialogTitle>
            </DialogHeader>
            <AdvancedFilter onApplyFilters={handleApplyFilters} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Support CTA Card - Conditional rendering */}
      {showSupportCard && (
        <div className="bg-[#FFF5F4] border border-[#E03C31]/20 rounded-lg p-5">
          <h3 className="font-semibold text-[#E03C31] mb-2">
            Bạn cần hỗ trợ chuyên nghiệp?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Các chuyên viên của chúng tôi luôn sẵn sàng hỗ trợ bạn tìm thấy ngôi nhà mơ ước.
          </p>
          <Button className="w-full bg-[#E03C31] hover:bg-[#c43428] text-white h-11">
            Tìm môi giới
          </Button>
        </div>
      )}
    </div>
  )
}
