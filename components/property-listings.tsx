"use client"

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PropertyCard } from "@/components/property-card"

const properties = [
  {
    id: "1",
    title: "Căn hộ Penthouse Sang trọng với Tầm nhìn Toàn cảnh Thành phố",
    price: "12.5 Tỷ VNĐ",
    area: "120 m²",
    location: "District 1, Ho Chi Minh City",
    description: "This premium penthouse offers world-class amenities, private elevator access, and a 360-degree view of the skyline. Fully furnished with high-end Italian...",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    imageCount: 12,
    badge: "VIP" as const,
    agent: {
      name: "Alex Nguyen",
      title: "Premium Agent",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  },
  {
    id: "2",
    title: "Nhà phố Sân vườn Rộng rãi cho Gia đình",
    price: "4.2 Tỷ VNĐ",
    area: "85 m²",
    location: "Thu Duc City, Ho Chi Minh City",
    description: "Perfect for growing families. This house features 3 bedrooms, 2 bathrooms, and a spacious backyard for children. Located in a quiet and secure neighborhood.",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    imageCount: 8,
    badge: "DEAL" as const,
    agent: {
      name: "Sophia Le",
      title: "Local Expert",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
  },
  {
    id: "3",
    title: "Căn hộ Studio Hiện đại Gần Trung tâm",
    price: "2.8 Tỷ VNĐ",
    area: "45 m²",
    location: "Binh Thanh District, Ho Chi Minh City",
    description: "Modern studio apartment with smart home features, perfect for young professionals. Walking distance to shopping centers and public transportation.",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    imageCount: 6,
    badge: null,
    agent: {
      name: "Michael Tran",
      title: "Senior Consultant",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
  },
  {
    id: "4",
    title: "Biệt thự Compound Cao cấp Khu An Ninh",
    price: "25 Tỷ VNĐ",
    area: "350 m²",
    location: "District 2, Ho Chi Minh City",
    description: "Luxury villa in a gated community with 24/7 security. Features include private pool, garden, and modern European design with 5 bedrooms.",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    imageCount: 15,
    badge: "VIP" as const,
    agent: {
      name: "Linda Pham",
      title: "Luxury Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  },
]

export function PropertyListings() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Mua bán nhà đất trên toàn quốc
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Hiển thị 1,284 bất động sản đã xác thực
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sắp xếp:</span>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Tin mới nhất</SelectItem>
              <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
              <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
              <SelectItem value="area-asc">Diện tích nhỏ đến lớn</SelectItem>
              <SelectItem value="area-desc">Diện tích lớn đến nhỏ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Property Cards */}
      <div className="space-y-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button variant="outline" size="icon" className="h-10 w-10">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button className="h-10 w-10 bg-[#E03C31] hover:bg-[#c43428] text-white">
          1
        </Button>
        <Button variant="outline" className="h-10 w-10">
          2
        </Button>
        <Button variant="outline" className="h-10 w-10">
          3
        </Button>
        <span className="px-2 text-muted-foreground">...</span>
        <Button variant="outline" className="h-10 w-10">
          12
        </Button>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
