'use client'

import { useState } from 'react'
import { Header } from "@/components/header"
import { SidebarFilter } from "@/components/SidebarFilter"
import { AIChat } from "@/components/ai-chat"
import { PropertyCard } from "@/components/property-card"
import { Skeleton } from "@/components/ui/skeleton"

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

interface Property {
  id: string
  title: string
  price_range: string
  area: number | null
  address: string
  description: string
  images: string[]
  listing_type: string
  bedrooms: number | null
  bathrooms: number | null
  legal_status: string | null
  furnishing: string | null
  balcony_direction: string | null
  house_direction: string | null
  posted_date: string
  [key: string]: any
}

export default function AdvancedSearchPage() {
  // Search query
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filter states
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [minArea, setMinArea] = useState("")
  const [maxArea, setMaxArea] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [selectedWards, setSelectedWards] = useState<string[]>(WARDS)
  const [selectedLegal, setSelectedLegal] = useState<string[]>(LEGAL_OPTIONS)
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>(FURNITURE_OPTIONS)
  const [selectedDirection, setSelectedDirection] = useState<string[]>(DIRECTIONS)
  const [selectedBalconyDirection, setSelectedBalconyDirection] = useState<string[]>(DIRECTIONS)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(AMENITIES)
  
  // Results state
  const [searchResults, setSearchResults] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Filter out "Tất cả" from arrays and map amenities
      const amenitiesArray = selectedAmenities.filter(a => a !== "Tất cả")
      const legalArray = selectedLegal.filter(l => l !== "Tất cả")
      const furnishingArray = selectedFurniture.filter(f => f !== "Tất cả")
      const houseDirectionArray = selectedDirection.filter(d => d !== "Tất cả")
      const balconyDirectionArray = selectedBalconyDirection.filter(d => d !== "Tất cả")

      const payload = {
        query: searchQuery,
        location: "",
        property_type: propertyType === "all" ? "" : propertyType,
        price_min: minPrice ? parseInt(minPrice) : 0,
        price_max: maxPrice ? parseInt(maxPrice) : 0,
        area_min: minArea ? parseInt(minArea) : 0,
        area_max: maxArea ? parseInt(maxArea) : 0,
        bedrooms: bedrooms ? parseInt(bedrooms) : 0,
        bathrooms: bathrooms ? parseInt(bathrooms) : 0,
        legal_status: legalArray.join(','),
        furnishing: furnishingArray.join(','),
        house_direction: houseDirectionArray.join(','),
        balcony_direction: balconyDirectionArray.join(','),
        amenities: amenitiesArray,
        page: 1,
        limit: 10,
      }

      console.log("[v0] Sending search payload:", payload)

      const response = await fetch('/api/properties/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch search results')
      }

      const data = await response.json()
      console.log("[v0] Search results:", data)
      
      setSearchResults(data.results || data || [])
      setHasSearched(true)
    } catch (err) {
      console.error('Error searching:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-background">
      {/* Fixed height header */}
      <div className="shrink-0">
        <Header />
      </div>
      
      {/* Main content - grid layout */}
      <main className="flex-1 min-h-0 grid grid-cols-12 overflow-hidden">
        {/* Left Column - Filter (col-span-5) */}
        <aside className="col-span-12 lg:col-span-5 h-full min-h-0 overflow-y-auto border-r border-border p-6">
          <SidebarFilter
            showSupportCard={false}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            minArea={minArea}
            maxArea={maxArea}
            onMinAreaChange={setMinArea}
            onMaxAreaChange={setMaxArea}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            onBedroomsChange={setBedrooms}
            onBathroomsChange={setBathrooms}
            propertyType={propertyType}
            onPropertyTypeChange={setPropertyType}
            selectedWards={selectedWards}
            onWardsChange={setSelectedWards}
            selectedLegal={selectedLegal}
            onLegalChange={setSelectedLegal}
            selectedFurniture={selectedFurniture}
            onFurnitureChange={setSelectedFurniture}
            selectedDirection={selectedDirection}
            onDirectionChange={setSelectedDirection}
            selectedBalconyDirection={selectedBalconyDirection}
            onBalconyDirectionChange={setSelectedBalconyDirection}
            selectedAmenities={selectedAmenities}
            onAmenitiesChange={setSelectedAmenities}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </aside>
        
        {/* Right Column - Results (col-span-7) */}
        <section className="col-span-12 lg:col-span-7 h-full min-h-0 overflow-y-auto bg-muted/30 p-6">
          {!hasSearched ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Chưa có kết quả tìm kiếm</h2>
                <p className="text-muted-foreground">Hãy điều chỉnh bộ lọc và nhấn "Áp dụng bộ lọc" để bắt đầu tìm kiếm</p>
              </div>
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Lỗi tìm kiếm</h2>
                <p className="text-muted-foreground">{error}</p>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Không tìm thấy kết quả</h2>
                <p className="text-muted-foreground">Thử điều chỉnh bộ lọc để tìm kiếm lại</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Tìm thấy {searchResults.length} kết quả
              </h3>
              {searchResults.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
