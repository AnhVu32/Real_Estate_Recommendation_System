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

export function SidebarFilter({ showSupportCard = true }: SidebarFilterProps) {
  const [wardSearch, setWardSearch] = useState("")
  
  // Initialize all as selected (checked by default)
  const [selectedWards, setSelectedWards] = useState<string[]>(WARDS)
  const [selectedLegal, setSelectedLegal] = useState<string[]>(LEGAL_OPTIONS)
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>(FURNITURE_OPTIONS)
  const [selectedDirection, setSelectedDirection] = useState<string[]>(DIRECTIONS)
  const [selectedBalconyDirection, setSelectedBalconyDirection] = useState<string[]>(DIRECTIONS)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(AMENITIES)

  const filteredWards = useMemo(() => {
    if (!wardSearch) return WARDS
    return WARDS.filter(ward => 
      ward.toLowerCase().includes(wardSearch.toLowerCase())
    )
  }, [wardSearch])

  // Helper function to handle checkbox group changes with proper "Tất cả" logic
  const handleCheckboxChange = (
    item: string,
    checked: boolean,
    currentSelected: string[],
    setSelected: (items: string[]) => void,
    allItems: string[]
  ) => {
    const otherItems = getOtherItems(allItems)

    if (item === "Tất cả") {
      // Toggle "Tất cả"
      if (checked) {
        // Check all items
        setSelected(allItems)
      } else {
        // Uncheck all items
        setSelected([])
      }
    } else {
      // Toggle individual item
      let newSelected: string[]
      if (checked) {
        // Add item
        newSelected = [...currentSelected, item]
      } else {
        // Remove item and also remove "Tất cả"
        newSelected = currentSelected.filter(i => i !== item && i !== "Tất cả")
      }

      // Auto-check "Tất cả" if all other items are selected
      if (newSelected.length > 0 && getOtherItems(newSelected).length === otherItems.length) {
        newSelected = allItems
      }

      setSelected(newSelected)
    }
  }

  const getCheckedCount = (selected: string[], allItems: string[]) => {
    return selected.length === allItems.length ? "Tất cả" : `${selected.length}/${allItems.length}`
  }

  return (
    <div className="space-y-6">
      {/* Filter Card */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="h-5 w-5 text-[#E03C31]" />
          <h2 className="font-semibold text-foreground">Bộ lọc chi tiết</h2>
        </div>

        {/* Accordion for collapsible sections */}
        <Accordion type="multiple" defaultValue={["vi-tri"]} className="space-y-3">
          {/* 1. VỊ TRÍ - Accordion item */}
          <AccordionItem value="vi-tri" className="border border-border rounded-md px-3">
            <AccordionTrigger className="hover:no-underline py-3">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Vị trí
              </label>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-3">
              <div className="space-y-2">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Tìm phường/xã..." 
                    className="h-9 pl-9 text-sm"
                    value={wardSearch}
                    onChange={(e) => setWardSearch(e.target.value)}
                  />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {filteredWards.map((ward) => (
                    <label 
                      key={ward} 
                      className="flex items-center gap-2 py-1 px-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
                    >
                      <Checkbox 
                        checked={selectedWards.includes(ward)}
                        onCheckedChange={(checked) => handleCheckboxChange(ward, checked as boolean, selectedWards, setSelectedWards, WARDS)}
                      />
                      <span className={ward === "Tất cả" ? "font-medium" : ""}>{ward}</span>
                    </label>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 2. PHÁP LÝ - Accordion item */}
          <AccordionItem value="phap-ly" className="border border-border rounded-md px-3">
            <AccordionTrigger className="hover:no-underline py-3">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Pháp lý ({getCheckedCount(selectedLegal, LEGAL_OPTIONS)})
              </label>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 space-y-1">
                {LEGAL_OPTIONS.map((option) => (
                  <label 
                    key={option} 
                    className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
                  >
                    <Checkbox 
                      checked={selectedLegal.includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean, selectedLegal, setSelectedLegal, LEGAL_OPTIONS)}
                    />
                    <span className={option === "Tất cả" ? "font-medium" : ""}>{option}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 3. NỘI THẤT - Accordion item */}
          <AccordionItem value="noi-that" className="border border-border rounded-md px-3">
            <AccordionTrigger className="hover:no-underline py-3">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Nội thất ({getCheckedCount(selectedFurniture, FURNITURE_OPTIONS)})
              </label>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 space-y-1">
                {FURNITURE_OPTIONS.map((option) => (
                  <label 
                    key={option} 
                    className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
                  >
                    <Checkbox 
                      checked={selectedFurniture.includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean, selectedFurniture, setSelectedFurniture, FURNITURE_OPTIONS)}
                    />
                    <span className={option === "Tất cả" ? "font-medium" : ""}>{option}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 4. HƯỚNG NHÀ - Accordion item */}
          <AccordionItem value="huong-nha" className="border border-border rounded-md px-3">
            <AccordionTrigger className="hover:no-underline py-3">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Hướng nhà ({getCheckedCount(selectedDirection, DIRECTIONS)})
              </label>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 space-y-1">
                {DIRECTIONS.map((direction) => (
                  <label 
                    key={direction} 
                    className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
                  >
                    <Checkbox 
                      checked={selectedDirection.includes(direction)}
                      onCheckedChange={(checked) => handleCheckboxChange(direction, checked as boolean, selectedDirection, setSelectedDirection, DIRECTIONS)}
                    />
                    <span className={direction === "Tất cả" ? "font-medium" : ""}>{direction}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 5. HƯỚNG BAN CÔNG - Accordion item */}
          <AccordionItem value="huong-ban-cong" className="border border-border rounded-md px-3">
            <AccordionTrigger className="hover:no-underline py-3">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Hướng ban công ({getCheckedCount(selectedBalconyDirection, DIRECTIONS)})
              </label>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 space-y-1">
                {DIRECTIONS.map((direction) => (
                  <label 
                    key={direction} 
                    className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
                  >
                    <Checkbox 
                      checked={selectedBalconyDirection.includes(direction)}
                      onCheckedChange={(checked) => handleCheckboxChange(direction, checked as boolean, selectedBalconyDirection, setSelectedBalconyDirection, DIRECTIONS)}
                    />
                    <span className={direction === "Tất cả" ? "font-medium" : ""}>{direction}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 6. TIỆN ÍCH - Accordion item */}
          <AccordionItem value="tien-ich" className="border border-border rounded-md px-3">
            <AccordionTrigger className="hover:no-underline py-3">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Tiện ích ({getCheckedCount(selectedAmenities, AMENITIES)})
              </label>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 max-h-48 overflow-y-auto space-y-1">
                {AMENITIES.map((amenity) => (
                  <label 
                    key={amenity} 
                    className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
                  >
                    <Checkbox 
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={(checked) => handleCheckboxChange(amenity, checked as boolean, selectedAmenities, setSelectedAmenities, AMENITIES)}
                    />
                    <span className={amenity === "Tất cả" ? "font-medium" : ""}>{amenity}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Non-accordion sections - Always visible */}
        <div className="space-y-5 mt-6">
          {/* 2. LOẠI BĐS - Property Type Select */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Loại bđs
            </label>
            <Select>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="can-ho">Căn hộ</SelectItem>
                <SelectItem value="nha-dat">Nhà đất</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 3. KHOẢNG GIÁ */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Khoảng giá (VNĐ)
            </label>
            <div className="flex items-center gap-2">
              <Input placeholder="Từ" className="h-10" />
              <span className="text-muted-foreground">-</span>
              <Input placeholder="Đến" className="h-10" />
            </div>
          </div>

          {/* 4. BIẾN ĐỘNG TRONG 1 NĂM QUA */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Biến động trong 1 năm qua
            </label>
            <div className="flex items-center gap-2">
              <Input placeholder="Từ" className="h-10" />
              <span className="text-muted-foreground">-</span>
              <Input placeholder="Đến" className="h-10" />
            </div>
          </div>

          {/* 5. DIỆN TÍCH */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Diện tích (m²)
            </label>
            <Input placeholder="Ví dụ: 100" className="h-10" />
          </div>

          {/* 6. SỐ PHÒNG NGỦ & SỐ PHÒNG TẮM - side by side inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
                Số phòng ngủ
              </label>
              <Input placeholder="Tất cả" className="h-10" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
                Số phòng tắm
              </label>
              <Input placeholder="Tất cả" className="h-10" />
            </div>
          </div>
        </div>

        {/* Apply Filter Button */}
        <Button className="w-full bg-[#E03C31] hover:bg-[#c43428] text-white h-11 mt-6">
          Áp dụng bộ lọc
        </Button>
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
