"use client"

import { useState, useMemo } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const WARDS = [
  "Tất cả", "An Đông", "An Hội Đông", "An Hội Tây", "An Khánh", "An Lạc", "An Long", "An Nhơn", 
  "An Nhơn Tây", "An Phú", "An Phú Đông", "An Thời Đông", "Bà Điểm", "Bà Rịa", "Bắc Tân Uyên", 
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
  "Tân Thời Hiệp", "Tân Thuận", "Tân Uyên", "Tân Vĩnh Lộc", "Tăng Nhơn Phú", "Tây Nam", "Tây Thạnh", 
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

const LEGAL_STATUS_OPTIONS = [
  "Tất cả", "Sổ hồng riêng", "Đang chờ sổ", "Sổ chung", "Không rõ"
]

const FURNITURE_OPTIONS = [
  "Tất cả", "Cơ bản", "Đầy đủ", "Cao cấp", "Không nội thất"
]

const DIRECTIONS = [
  "Tất cả", "Tây - Nam", "Đông - Nam", "Bắc", "Nam", "Đông - Bắc", "Tây - Bắc", "Tây", "Đông", "Không rõ"
]

const AMENITY_MAPPING: { [key: string]: string } = {
  "Hồ bơi": "pool",
  "Gym": "gym",
  "Khuôn viên": "park",
  "BBQ": "bbq",
  "Khu vui chơi trẻ em": "kids_playground",
  "Sân thể thao": "sports_court",
  "An ninh 24h": "security_24h",
  "Lễ tân": "reception",
  "Thang máy": "elevator",
  "Bãi đậu xe": "parking",
  "Gần Metro": "near_metro",
  "Gần Bus": "near_bus",
  "Gần cao tốc": "near_highway",
  "Gần trường": "near_school",
  "Gần bệnh viện": "near_hospital",
  "Gần siêu thị": "near_mall",
  "Gần chợ": "near_market",
  "Gần công viên": "near_park",
  "View sông": "river_view",
  "View công viên": "park_view",
  "View thành phố": "city_view",
  "Ban công": "balcony",
  "Vườn": "garden",
  "Garage": "garage",
  "Sân thượng": "terrace"
}

interface AdvancedFilterProps {
  onApplyFilters: (filters: any) => void
}

export function AdvancedFilter({ onApplyFilters }: AdvancedFilterProps) {
  const [wardSearch, setWardSearch] = useState("")
  const [selectedWards, setSelectedWards] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [minArea, setMinArea] = useState("")
  const [maxArea, setMaxArea] = useState("")
  const [selectedBedrooms, setSelectedBedrooms] = useState("")
  const [selectedBathrooms, setSelectedBathrooms] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  
  // Array states for 4 checkbox groups with true Select All behavior
  const [selectedLegalStatus, setSelectedLegalStatus] = useState<string[]>([])
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([])
  const [selectedHouseDirection, setSelectedHouseDirection] = useState<string[]>([])
  const [selectedBalconyDirection, setSelectedBalconyDirection] = useState<string[]>([])
  
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const filteredWards = useMemo(() => {
    if (!wardSearch) return WARDS
    return WARDS.filter(ward => 
      ward.toLowerCase().includes(wardSearch.toLowerCase())
    )
  }, [wardSearch])

  const handleWardChange = (ward: string, checked: boolean) => {
    if (ward === "Tất cả") {
      setSelectedWards(checked ? WARDS : [])
    } else {
      let newSelected: string[]
      if (checked) {
        newSelected = [...selectedWards, ward]
        if (newSelected.length === WARDS.length - 1) {
          newSelected = WARDS
        }
      } else {
        newSelected = selectedWards.filter(w => w !== ward && w !== "Tất cả")
      }
      setSelectedWards(newSelected)
    }
  }

  const handleCheckboxGroupChange = (
    item: string,
    checked: boolean,
    allOptions: string[],
    currentSelected: string[],
    setSelected: (items: string[]) => void
  ) => {
    const otherOptions = allOptions.filter(o => o !== "Tất cả")
    
    if (item === "Tất cả") {
      setSelected(checked ? otherOptions : [])
    } else {
      let newSelected: string[]
      if (checked) {
        newSelected = [...currentSelected, item]
      } else {
        newSelected = currentSelected.filter(i => i !== item)
      }
      
      // Auto-check "Tất cả" if all individual items are selected
      if (newSelected.length === otherOptions.length) {
        newSelected = otherOptions
      }
      
      setSelected(newSelected)
    }
  }

  const isAllChecked = (selected: string[], allOptions: string[]) => {
    const otherOptions = allOptions.filter(o => o !== "Tất cả")
    return selected.length === otherOptions.length
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (amenity === "Tất cả") {
      setSelectedAmenities(checked ? AMENITIES : [])
    } else {
      if (checked) {
        const newSelected = [...selectedAmenities, amenity]
        if (newSelected.length === AMENITIES.length - 1) {
          setSelectedAmenities(AMENITIES)
        } else {
          setSelectedAmenities(newSelected)
        }
      } else {
        setSelectedAmenities(selectedAmenities.filter(a => a !== amenity && a !== "Tất cả"))
      }
    }
  }

  const handleApplyFilters = () => {
    const filters: any = {}

    if (minPrice) filters.min_price = parseFloat(minPrice)
    if (maxPrice) filters.max_price = parseFloat(maxPrice)
    if (minArea) filters.min_area = parseFloat(minArea)
    if (maxArea) filters.max_area = parseFloat(maxArea)
    if (selectedBedrooms) filters.bedrooms = parseInt(selectedBedrooms)
    if (selectedBathrooms) filters.bathrooms = parseInt(selectedBathrooms)

    // Legal status - join as comma-separated string
    if (selectedLegalStatus.length > 0) {
      const statusMap: { [key: string]: string } = {
        "Sổ hồng riêng": "own_certificate",
        "Đang chờ sổ": "pending",
        "Sổ chung": "shared",
        "Không rõ": "unknown"
      }
      const mappedStatuses = selectedLegalStatus.map(s => statusMap[s]).filter(Boolean)
      if (mappedStatuses.length > 0) {
        filters.legal_status = mappedStatuses.join(",")
      }
    }

    // Furniture - join as comma-separated string
    if (selectedFurniture.length > 0) {
      const furnitureMap: { [key: string]: string } = {
        "Cơ bản": "basic",
        "Đầy đủ": "full",
        "Cao cấp": "luxury",
        "Không nội thất": "none"
      }
      const mappedFurniture = selectedFurniture.map(f => furnitureMap[f]).filter(Boolean)
      if (mappedFurniture.length > 0) {
        filters.furniture = mappedFurniture.join(",")
      }
    }

    // House direction - join as comma-separated string
    if (selectedHouseDirection.length > 0) {
      const directionMap: { [key: string]: string } = {
        "Tây - Nam": "southwest",
        "Đông - Nam": "southeast",
        "Bắc": "north",
        "Nam": "south",
        "Đông - Bắc": "northeast",
        "Tây - Bắc": "northwest",
        "Tây": "west",
        "Đông": "east",
        "Không rõ": "unknown"
      }
      const mappedDirections = selectedHouseDirection.map(d => directionMap[d]).filter(Boolean)
      if (mappedDirections.length > 0) {
        filters.house_direction = mappedDirections.join(",")
      }
    }

    // Balcony direction - join as comma-separated string
    if (selectedBalconyDirection.length > 0) {
      const directionMap: { [key: string]: string } = {
        "Tây - Nam": "southwest",
        "Đông - Nam": "southeast",
        "Bắc": "north",
        "Nam": "south",
        "Đông - Bắc": "northeast",
        "Tây - Bắc": "northwest",
        "Tây": "west",
        "Đông": "east",
        "Không rõ": "unknown"
      }
      const mappedDirections = selectedBalconyDirection.map(d => directionMap[d]).filter(Boolean)
      if (mappedDirections.length > 0) {
        filters.balcony_direction = mappedDirections.join(",")
      }
    }

    // Amenities
    const amenitiesWithoutAll = selectedAmenities.filter(a => a !== "Tất cả")
    if (amenitiesWithoutAll.length > 0) {
      amenitiesWithoutAll.forEach(amenity => {
        const apiParam = AMENITY_MAPPING[amenity]
        if (apiParam) {
          filters[apiParam] = true
        }
      })
    }

    onApplyFilters(filters)
  }

  return (
    <Card className="bg-card border border-border rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      <div className="border-b border-border bg-background p-4 flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-[#E03C31]" />
        <h2 className="font-semibold text-foreground">Bộ lọc chi tiết</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Vị trí */}
        <div>
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

        {/* Loại BĐS */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Loại BĐS
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
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

        {/* Khoảng giá */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Khoảng giá (VNĐ)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input 
              placeholder="Từ" 
              className="h-10" 
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input 
              placeholder="Đến" 
              className="h-10" 
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Diện tích */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Diện tích (m²)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input 
              placeholder="Từ" 
              className="h-10"
              type="number"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
            />
            <Input 
              placeholder="Đến" 
              className="h-10"
              type="number"
              value={maxArea}
              onChange={(e) => setMaxArea(e.target.value)}
            />
          </div>
        </div>

        {/* Số phòng ngủ & phòng tắm */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Số phòng ngủ
            </label>
            <Input 
              placeholder="Tất cả" 
              className="h-10"
              type="number"
              value={selectedBedrooms}
              onChange={(e) => setSelectedBedrooms(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Số phòng tắm
            </label>
            <Input 
              placeholder="Tất cả" 
              className="h-10"
              type="number"
              value={selectedBathrooms}
              onChange={(e) => setSelectedBathrooms(e.target.value)}
            />
          </div>
        </div>

        {/* Pháp lý - Checkbox group with Select All */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Pháp lý
          </label>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 border border-border rounded-md p-3 max-h-40 overflow-y-auto">
            {LEGAL_STATUS_OPTIONS.map((option) => (
              <label 
                key={option} 
                className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={option === "Tất cả" ? isAllChecked(selectedLegalStatus, LEGAL_STATUS_OPTIONS) : selectedLegalStatus.includes(option)}
                  onCheckedChange={(checked) => handleCheckboxGroupChange(
                    option,
                    checked as boolean,
                    LEGAL_STATUS_OPTIONS,
                    selectedLegalStatus,
                    setSelectedLegalStatus
                  )}
                />
                <span className={option === "Tất cả" ? "font-medium" : ""}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nội thất - Checkbox group with Select All */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Nội thất
          </label>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 border border-border rounded-md p-3 max-h-40 overflow-y-auto">
            {FURNITURE_OPTIONS.map((option) => (
              <label 
                key={option} 
                className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={option === "Tất cả" ? isAllChecked(selectedFurniture, FURNITURE_OPTIONS) : selectedFurniture.includes(option)}
                  onCheckedChange={(checked) => handleCheckboxGroupChange(
                    option,
                    checked as boolean,
                    FURNITURE_OPTIONS,
                    selectedFurniture,
                    setSelectedFurniture
                  )}
                />
                <span className={option === "Tất cả" ? "font-medium" : ""}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hướng nhà - Checkbox group with Select All */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Hướng nhà
          </label>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 border border-border rounded-md p-3 max-h-40 overflow-y-auto">
            {DIRECTIONS.map((option) => (
              <label 
                key={option} 
                className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={option === "Tất cả" ? isAllChecked(selectedHouseDirection, DIRECTIONS) : selectedHouseDirection.includes(option)}
                  onCheckedChange={(checked) => handleCheckboxGroupChange(
                    option,
                    checked as boolean,
                    DIRECTIONS,
                    selectedHouseDirection,
                    setSelectedHouseDirection
                  )}
                />
                <span className={option === "Tất cả" ? "font-medium" : ""}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hướng ban công - Checkbox group with Select All */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Hướng ban công
          </label>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 border border-border rounded-md p-3 max-h-40 overflow-y-auto">
            {DIRECTIONS.map((option) => (
              <label 
                key={option} 
                className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded cursor-pointer text-sm"
              >
                <Checkbox 
                  checked={option === "Tất cả" ? isAllChecked(selectedBalconyDirection, DIRECTIONS) : selectedBalconyDirection.includes(option)}
                  onCheckedChange={(checked) => handleCheckboxGroupChange(
                    option,
                    checked as boolean,
                    DIRECTIONS,
                    selectedBalconyDirection,
                    setSelectedBalconyDirection
                  )}
                />
                <span className={option === "Tất cả" ? "font-medium" : ""}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tiện ích */}
        <div>
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
      </div>

      <div className="border-t border-border bg-white p-4">
        <Button 
          onClick={handleApplyFilters}
          className="w-full bg-[#E03C31] hover:bg-[#c43428] text-white h-12 text-base font-medium"
        >
          Áp dụng bộ lọc
        </Button>
      </div>
    </Card>
  )
}
