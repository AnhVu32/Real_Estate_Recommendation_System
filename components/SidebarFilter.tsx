"use client"

import { useState, useMemo } from "react"
import { SlidersHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const WARDS = [
  "Tất cả", "An Đông", "An Hội Đông", "An Hội Tây", "An Khánh", "An Lạc", "An Long", "An Nhơn", 
  "An Nhơn Tây", "An Phú", "An Phú Đông", "An Thới Đông", "Bà Điểm", "Bà Rịa", "Bắc Tân Uyên", 
  "Bàn Cờ", "Bàu Bàng", "Bàu Lâm", "Bảy Hiền", "Bến Cát", "Bến Thành", "Bình Chánh", "Bình Châu", 
  "Bình Cơ", "Bình Đông", "Bình Dương", "Bình Giã", "Bình Hòa", "Bình Hưng", "Bình Hưng Hòa", 
  "Bình Khánh", "Bình Lợi", "Bình Lợi Trung", "Bình Mỹ", "Bình Phú", "Bình Quới", "Bình Tân", 
  "Bình Tây", "Bình Thạnh", "Bình Thời", "Bình Tiên", "Bình Trị Đông", "Bình Trưng", "Cần Giờ", 
  "Cát Lái", "Cầu Kiệu", "Cầu Ông Lãnh", "Chánh Hiệp", "Chánh Hưng", "Chánh Phú Hòa", "Châu Đức", 
  "Châu Pha", "Chợ Lớn", "Chợ Quán", "Côn Đảo", "Củ Chi", "Đất Đỏ", "Dầu Tiếng", "Dĩ An", 
  "Diên Hồng", "Đông Hòa", "Đông Hưng Thuận", "Đông Thạnh", "Đức Nhuận", "Gia Định", "Gò Vấp", 
  "Hạnh Thông", "Hiệp Bình", "Hiệp Phước", "Hồ Tràm", "Hòa Bình", "Hòa Hiệp", "Hòa Hội", 
  "Hòa Hưng", "Hòa Lợi", "Hóc Môn", "Hưng Long", "Khánh Hội", "Kim Long", "Lái Thiêu", 
  "Linh Xuân", "Long Bình", "Long Điền", "Long Hải", "Long Hòa", "Long Hương", "Long Nguyên", 
  "Long Phước", "Long Sơn", "Long Trường", "Minh Phụng", "Minh Thạnh", "Ngãi Giao", "Nghĩa Thành", 
  "Ngọc Hà", "Nhà Bè", "Nhiêu Lộc", "Nhuận Đức", "Phú An", "Phú Định", "Phú Giáo", "Phú Hòa Đông", 
  "Phú Lâm", "Phú Lợi", "Phú Mỹ", "Phú Nhuận", "Phú Thạnh", "Phú Thọ", "Phú Thọ Hòa", "Phú Thuận", 
  "Phước Hải", "Phước Hòa", "Phước Long", "Phước Thắng", "Phước Thành", "Rạch Dừa", "Sài Gòn", 
  "Tam Bình", "Tam Long", "Tam Thắng", "Tân An Hội", "Tân Bình", "Tân Định", "Tân Đông Hiệp", 
  "Tân Hải", "Tân Hiệp", "Tân Hòa", "Tân Hưng", "Tân Khánh", "Tân Mỹ", "Tân Nhựt", "Tân Phú", 
  "Tân Phước", "Tân Sơn", "Tân Sơn Hòa", "Tân Sơn Nhất", "Tân Sơn Nhì", "Tân Tạo", "Tân Thành", 
  "Tân Thới Hiệp", "Tân Thuận", "Tân Uyên", "Tân Vĩnh Lộc", "Tăng Nhơn Phú", "Tây Nam", "Tây Thạnh", 
  "Thái Mỹ", "Thạnh An", "Thanh An", "Thạnh Mỹ Tây", "Thời An", "Thời Hòa", "Thông Tây Hội", 
  "Thủ Đức", "Thuận An", "Thuận Giao", "Trà Vinh", "Trảng Bàng", "Trường Thọ", "Vĩnh Cửu", 
  "Vĩnh Lộc", "Vĩnh Phú", "Vũng Tàu", "Xuyên Mộc"
]

const AMENITIES = [
  "Tất cả", "Hồ bơi", "Gym", "Khuôn viên", "BBQ", "Khu vui chơi trẻ em", "Sân thể thao", 
  "An ninh 24h", "Lễ tân", "Thang máy", "Bãi đậu xe", "Gần Metro", "Gần Bus", "Gần cao tốc", 
  "Gần trường", "Gần bệnh viện", "Gần siêu thị", "Gần chợ", "Gần công viên", "View sông", 
  "View công viên", "View thành phố", "Ban công", "Vườn", "Garage", "Sân thượng"
]

const DIRECTIONS = [
  "Tất cả", "Tây - Nam", "Đông - Nam", "Bắc", "Nam", "Đông - Bắc", "Tây - Bắc", "Tây", "Đông", "Không rõ"
]

const LEGAL_OPTIONS = [
  "Tất cả", "Sổ hồng riêng", "Đang chờ sổ", "Sổ chung", "Không rõ"
]

const FURNITURE_OPTIONS = [
  "Tất cả", "Cơ bản", "Đầy đủ", "Cao cấp", "Không nội thất"
]

// Helper to get all items excluding "Tất cả"
const getOtherItems = (items: string[]) => items.filter(item => item !== "Tất cả")

interface SidebarFilterProps {
  showSupportCard?: boolean
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  minPrice: string
  maxPrice: string
  onMinPriceChange: (value: string) => void
  onMaxPriceChange: (value: string) => void
  minArea: string
  maxArea: string
  onMinAreaChange: (value: string) => void
  onMaxAreaChange: (value: string) => void
  bedrooms: string
  bathrooms: string
  onBedroomsChange: (value: string) => void
  onBathroomsChange: (value: string) => void
  propertyType: string
  onPropertyTypeChange: (value: string) => void
  selectedWards: string[]
  onWardsChange: (wards: string[]) => void
  selectedLegal: string[]
  onLegalChange: (legal: string[]) => void
  selectedFurniture: string[]
  onFurnitureChange: (furniture: string[]) => void
  selectedDirection: string[]
  onDirectionChange: (direction: string[]) => void
  selectedBalconyDirection: string[]
  onBalconyDirectionChange: (direction: string[]) => void
  selectedAmenities: string[]
  onAmenitiesChange: (amenities: string[]) => void
  onSearch: () => void
  isLoading?: boolean
}

export function SidebarFilter({ 
  showSupportCard = true,
  searchQuery = "",
  onSearchQueryChange = () => {},
  minPrice = "",
  maxPrice = "",
  onMinPriceChange = () => {},
  onMaxPriceChange = () => {},
  minArea = "",
  maxArea = "",
  onMinAreaChange = () => {},
  onMaxAreaChange = () => {},
  bedrooms = "",
  bathrooms = "",
  onBedroomsChange = () => {},
  onBathroomsChange = () => {},
  propertyType = "all",
  onPropertyTypeChange = () => {},
  selectedWards = WARDS,
  onWardsChange = () => {},
  selectedLegal = LEGAL_OPTIONS,
  onLegalChange = () => {},
  selectedFurniture = FURNITURE_OPTIONS,
  onFurnitureChange = () => {},
  selectedDirection = DIRECTIONS,
  onDirectionChange = () => {},
  selectedBalconyDirection = DIRECTIONS,
  onBalconyDirectionChange = () => {},
  selectedAmenities = AMENITIES,
  onAmenitiesChange = () => {},
  onSearch = () => {},
  isLoading = false,
}: SidebarFilterProps) {
  const [wardSearch, setWardSearch] = useState("")

  const filteredWards = useMemo(() => {
    if (!wardSearch) return WARDS
    return WARDS.filter(ward => 
      ward.toLowerCase().includes(wardSearch.toLowerCase())
    )
  }, [wardSearch])

  // Helper function to handle checkbox group changes with proper "Tất cả" logic
  // This is now handled inline in each checkbox
  
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
                      onCheckedChange={(checked) => {
                        const otherItems = getOtherItems(WARDS)
                        if (ward === "Tất cả") {
                          if (checked) {
                            onWardsChange(WARDS)
                          } else {
                            onWardsChange([])
                          }
                        } else {
                          let newSelected: string[] = checked as boolean 
                            ? [...selectedWards, ward]
                            : selectedWards.filter(i => i !== ward && i !== "Tất cả")
                          if (newSelected.length > 0 && getOtherItems(newSelected).length === otherItems.length) {
                            newSelected = WARDS
                          }
                          onWardsChange(newSelected)
                        }
                      }}
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
                      onCheckedChange={(checked) => {
                        const otherItems = getOtherItems(LEGAL_OPTIONS)
                        if (option === "Tất cả") {
                          if (checked) {
                            onLegalChange(LEGAL_OPTIONS)
                          } else {
                            onLegalChange([])
                          }
                        } else {
                          let newSelected: string[] = checked as boolean 
                            ? [...selectedLegal, option]
                            : selectedLegal.filter(i => i !== option && i !== "Tất cả")
                          if (newSelected.length > 0 && getOtherItems(newSelected).length === otherItems.length) {
                            newSelected = LEGAL_OPTIONS
                          }
                          onLegalChange(newSelected)
                        }
                      }}
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
                      onCheckedChange={(checked) => {
                        const otherItems = getOtherItems(FURNITURE_OPTIONS)
                        if (option === "Tất cả") {
                          if (checked) {
                            onFurnitureChange(FURNITURE_OPTIONS)
                          } else {
                            onFurnitureChange([])
                          }
                        } else {
                          let newSelected: string[] = checked as boolean 
                            ? [...selectedFurniture, option]
                            : selectedFurniture.filter(i => i !== option && i !== "Tất cả")
                          if (newSelected.length > 0 && getOtherItems(newSelected).length === otherItems.length) {
                            newSelected = FURNITURE_OPTIONS
                          }
                          onFurnitureChange(newSelected)
                        }
                      }}
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
                      onCheckedChange={(checked) => {
                        const otherItems = getOtherItems(DIRECTIONS)
                        if (direction === "Tất cả") {
                          if (checked) {
                            onDirectionChange(DIRECTIONS)
                          } else {
                            onDirectionChange([])
                          }
                        } else {
                          let newSelected: string[] = checked as boolean 
                            ? [...selectedDirection, direction]
                            : selectedDirection.filter(i => i !== direction && i !== "Tất cả")
                          if (newSelected.length > 0 && getOtherItems(newSelected).length === otherItems.length) {
                            newSelected = DIRECTIONS
                          }
                          onDirectionChange(newSelected)
                        }
                      }}
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
                      onCheckedChange={(checked) => {
                        const otherItems = getOtherItems(DIRECTIONS)
                        if (direction === "Tất cả") {
                          if (checked) {
                            onBalconyDirectionChange(DIRECTIONS)
                          } else {
                            onBalconyDirectionChange([])
                          }
                        } else {
                          let newSelected: string[] = checked as boolean 
                            ? [...selectedBalconyDirection, direction]
                            : selectedBalconyDirection.filter(i => i !== direction && i !== "Tất cả")
                          if (newSelected.length > 0 && getOtherItems(newSelected).length === otherItems.length) {
                            newSelected = DIRECTIONS
                          }
                          onBalconyDirectionChange(newSelected)
                        }
                      }}
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
                      onCheckedChange={(checked) => {
                        const otherItems = getOtherItems(AMENITIES)
                        if (amenity === "Tất cả") {
                          if (checked) {
                            onAmenitiesChange(AMENITIES)
                          } else {
                            onAmenitiesChange([])
                          }
                        } else {
                          let newSelected: string[] = checked as boolean 
                            ? [...selectedAmenities, amenity]
                            : selectedAmenities.filter(i => i !== amenity && i !== "Tất cả")
                          if (newSelected.length > 0 && getOtherItems(newSelected).length === otherItems.length) {
                            newSelected = AMENITIES
                          }
                          onAmenitiesChange(newSelected)
                        }
                      }}
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
          {/* 0. TÌM KIẾM - Search Query Input */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Tìm kiếm
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Nhập từ khóa tìm kiếm..." 
                className="h-10 pl-9" 
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
              />
            </div>
          </div>

          {/* 1. LOẠI BĐS - Property Type Select */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Loại bđs
            </label>
            <Select value={propertyType} onValueChange={onPropertyTypeChange}>
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
              <Input 
                placeholder="Từ" 
                className="h-10" 
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
              />
              <span className="text-muted-foreground">-</span>
              <Input 
                placeholder="Đến" 
                className="h-10" 
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
              />
            </div>
          </div>

          {/* 4. DIỆN TÍCH */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Diện tích (m²)
            </label>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Từ" 
                className="h-10" 
                value={minArea}
                onChange={(e) => onMinAreaChange(e.target.value)}
              />
              <span className="text-muted-foreground">-</span>
              <Input 
                placeholder="Đến" 
                className="h-10" 
                value={maxArea}
                onChange={(e) => onMaxAreaChange(e.target.value)}
              />
            </div>
          </div>

          {/* 5. SỐ PHÒNG NGỦ & SỐ PHÒNG TẮM - side by side inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
                Số phòng ngủ
              </label>
              <Input 
                placeholder="Tất cả" 
                className="h-10" 
                value={bedrooms}
                onChange={(e) => onBedroomsChange(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
                Số phòng tắm
              </label>
              <Input 
                placeholder="Tất cả" 
                className="h-10" 
                value={bathrooms}
                onChange={(e) => onBathroomsChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Apply Filter Button */}
        <Button 
          onClick={onSearch}
          disabled={isLoading}
          className="w-full bg-[#E03C31] hover:bg-[#c43428] text-white h-11 mt-6"
        >
          {isLoading ? 'Đang tìm kiếm...' : 'Áp dụng bộ lọc'}
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
