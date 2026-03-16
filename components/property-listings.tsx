"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PropertyCard } from "@/components/property-card"

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
  posted_date: string
}

const SKELETON_COUNT = 5

function PropertyCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row">
        {/* Image Skeleton */}
        <div className="w-full md:w-[280px] lg:w-[320px] h-[200px] md:min-h-[220px] bg-muted flex-shrink-0" />
        
        {/* Content Skeleton */}
        <div className="flex-1 p-4 flex flex-col space-y-3">
          <div className="h-6 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-4 bg-muted rounded w-2/3" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="mt-auto h-10 bg-muted rounded w-full" />
        </div>
      </div>
    </div>
  )
}

export function PropertyListings() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch("/api/properties")
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`)
        }

        const data = await response.json()
        console.log("[v0] API Response:", data)
        
        const fetchedProperties = data.data?.properties || []
        setProperties(fetchedProperties)
        setTotalCount(fetchedProperties.length)
      } catch (err) {
        console.error("[v0] Fetch error:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch properties")
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Mua bán nhà đất trên toàn quốc
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Hiển thị {totalCount} bất động sản đã xác thực
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

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
          <p>Không thể tải bất động sản: {error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && properties.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không có bất động sản nào</p>
        </div>
      )}

      {/* Property Cards */}
      {!loading && properties.length > 0 && (
        <div className="space-y-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && properties.length > 0 && (
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
      )}
    </div>
  )
}
