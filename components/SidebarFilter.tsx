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

  const isTatCaChecked = (selected: string[]) => selected.includes("Tất cả")
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

export function SidebarFilter({ showSupportCard = true }: SidebarFilterProps) {
  const [wardSearch, setWardSearch] = useState("")
  const [selectedWards, setSelectedWards] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedLegal, setSelectedLegal] = useState<string[]>(["Tất cả"])
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>(["Tất cả"])
  const [selectedDirection, setSelectedDirection] = useState<string[]>(["Tất cả"])
  const [selectedBalconyDirection, setSelectedBalconyDirection] = useState<string[]>(["Tất cả"])

  const filteredWards = useMemo(() => {
    if (!wardSearch) return WARDS
    return WARDS.filter(ward => 
      ward.toLowerCase().includes(wardSearch.toLowerCase())
    )
  }, [wardSearch])

  // Helper function to handle checkbox group changes
  const handleCheckboxGroupChange = (
    item: string,
    checked: boolean,
    items: string[],
    setItems: (items: string[]) => void,
    allList: string[]
  ) => {
    if (item === "Tất cả") {
      if (checked) {
        setItems(allList)
      } else {
        setItems([])
      }
    } else {
      if (checked) {
        const newSelected = [...items.filter(i => i !== "Tất cả"), item]
        if (newSelected.length === allList.length - 1) {
          setItems(allList)
        } else {
          setItems(newSelected)
        }
      } else {
        setItems(items.filter(i => i !== item && i !== "Tất cả"))
      }
    }
  }

  const handleWardChange = (ward: string, checked: boolean) => {
    handleCheckboxGroupChange(ward, checked, selectedWards, setSelectedWards, WARDS)
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    handleCheckboxGroupChange(amenity, checked, selectedAmenities, setSelectedAmenities, AMENITIES)
  }

  const handleLegalChange = (item: string, checked: boolean) => {
    handleCheckboxGroupChange(item, checked, selectedLegal, setSelectedLegal, LEGAL_OPTIONS)
  }

  const handleFurnitureChange = (item: string, checked: boolean) => {
    handleCheckboxGroupChange(item, checked, selectedFurniture, setSelectedFurniture, FURNITURE_OPTIONS)
  }

  const handleDirectionChange = (item: string, checked: boolean) => {
    handleCheckboxGroupChange(item, checked, selectedDirection, setSelectedDirection, DIRECTIONS)
  }

  const handleBalconyDirectionChange = (item: string, checked: boolean) => {
    handleCheckboxGroupChange(item, checked, selectedBalconyDirection, setSelectedBalconyDirection, DIRECTIONS)
  }

  return (
    <div className="space-y-6">
      {/* Filter Card */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="h-5 w-5 text-[#E03C31]" />
          <h2 className="font-semibold text-foreground">Bộ lọc chi tiết</h2>
        </div>

        {/* 1. VỊ TRÍ - Checkbox list with search */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Vị trí
          </label>
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Tìm phường/xã..." 
              className="h-9 pl-9 text-sm"
              value={wardSearch}
              onChange={(e) => setWardSearch(e.target.value)}
            />
          </div>
          <div className="max-h-60 overflow-y-auto border border-border rounded-md p-2 space-y-1">
            {filteredWards.map((ward) => (
              <label 
                key={ward} 
                className="flex items-center gap-2 py-1 px-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={selectedWards.includes(ward)}
                  onCheckedChange={(checked) => handleWardChange(ward, checked as boolean)}
                />
                <span className={ward === "Tất cả" ? "font-medium" : ""}>{ward}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 2. LOẠI BĐS - Property Type Select */}
        <div className="mb-5">
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
        <div className="mb-5">
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
        <div className="mb-5">
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
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Diện tích (m²)
          </label>
          <Input placeholder="Ví dụ: 100" className="h-10" />
        </div>

        {/* 6. SỐ PHÒNG NGỦ & SỐ PHÒNG TẮM - side by side inputs */}
        <div className="grid grid-cols-2 gap-3 mb-5">
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

        {/* 7. PHÁP LÝ - Checkbox Grid */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Pháp lý
          </label>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 border border-border rounded-md p-3">
            {LEGAL_OPTIONS.map((option) => (
              <label 
                key={option} 
                className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={selectedLegal.includes(option)}
                  onCheckedChange={(checked) => handleLegalChange(option, checked as boolean)}
                />
                <span className={option === "Tất cả" ? "font-medium" : ""}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 8. NỘI THẤT - Checkbox Grid */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Nội thất
          </label>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 border border-border rounded-md p-3">
            {FURNITURE_OPTIONS.map((option) => (
              <label 
                key={option} 
                className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={selectedFurniture.includes(option)}
                  onCheckedChange={(checked) => handleFurnitureChange(option, checked as boolean)}
                />
                <span className={option === "Tất cả" ? "font-medium" : ""}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 9. HƯỚNG NHÀ - Checkbox Grid */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Hướng nhà
          </label>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 border border-border rounded-md p-3">
            {DIRECTIONS.map((direction) => (
              <label 
                key={direction} 
                className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={selectedDirection.includes(direction)}
                  onCheckedChange={(checked) => handleDirectionChange(direction, checked as boolean)}
                />
                <span className={direction === "Tất cả" ? "font-medium" : ""}>{direction}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 10. HƯỚNG BAN CÔNG - Checkbox Grid */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Hướng ban công
          </label>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 border border-border rounded-md p-3">
            {DIRECTIONS.map((direction) => (
              <label 
                key={direction} 
                className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={selectedBalconyDirection.includes(direction)}
                  onCheckedChange={(checked) => handleBalconyDirectionChange(direction, checked as boolean)}
                />
                <span className={direction === "Tất cả" ? "font-medium" : ""}>{direction}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 11. TIỆN ÍCH - Checkbox grid */}
        <div className="mb-6">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Tiện ích
          </label>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 border border-border rounded-md p-3 max-h-48 overflow-y-auto">
            {AMENITIES.map((amenity) => (
              <label 
                key={amenity} 
                className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <span className={amenity === "Tất cả" ? "font-medium" : ""}>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 12. Apply Filter Button */}
        <Button className="w-full bg-[#E03C31] hover:bg-[#c43428] text-white h-11">
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
