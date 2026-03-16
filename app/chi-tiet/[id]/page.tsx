'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PropertyDetailBreadcrumb } from '@/components/property-detail/breadcrumb'
import { ImageGallery } from '@/components/property-detail/image-gallery'
import { PropertyHeader } from '@/components/property-detail/property-header'
import { QuickSpecsGrid } from '@/components/property-detail/quick-specs-grid'
import { DescriptionSection } from '@/components/property-detail/description-section'
import { AmenitiesSection } from '@/components/property-detail/amenities-section'
import { LocationSection } from '@/components/property-detail/location-section'
import { SellerCard } from '@/components/property-detail/seller-card'
import { ContactForm } from '@/components/property-detail/contact-form'
import { SimilarProperties } from '@/components/property-detail/similar-properties'
import { Skeleton } from '@/components/ui/skeleton'

interface PropertyData {
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
  pool: boolean
  gym: boolean
  park: boolean
  bbq: boolean
  kids_playground: boolean
  sports_court: boolean
  security_24h: boolean
  reception: boolean
  elevator: boolean
  parking: boolean
  near_metro: boolean
  near_bus: boolean
  near_highway: boolean
  near_school: boolean
  near_hospital: boolean
  near_mall: boolean
  near_market: boolean
  near_park: boolean
  river_view: boolean
  park_view: boolean
  city_view: boolean
  balcony: boolean
  garden: boolean
  garage: boolean
  terrace: boolean
}

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [property, setProperty] = useState<PropertyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!resolvedParams?.id) return

    const fetchProperty = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/properties/${resolvedParams.id}`)

        if (!response.ok) {
          if (response.status === 404) {
            setError('not-found')
          } else {
            setError('Failed to fetch property')
          }
          return
        }

        const data = await response.json()

        if (!data || Object.keys(data).length === 0) {
          setError('not-found')
          return
        }

        setProperty(data)
      } catch (err) {
        console.error('Error fetching property:', err)
        setError('Failed to fetch property')
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [resolvedParams?.id])

  if (error === 'not-found') {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
        <Header />
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : property ? (
          <div className="space-y-6">
            {/* Breadcrumb */}
            <PropertyDetailBreadcrumb property={property} />

            {/* Main 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content (70%) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Image Gallery */}
                <ImageGallery images={property.images} title={property.title} />

                {/* Property Header Info */}
                <PropertyHeader property={property} />

                {/* Quick Specs Grid */}
                <QuickSpecsGrid property={property} />

                {/* Description Section */}
                <DescriptionSection description={property.description} />

                {/* Amenities Section */}
                <AmenitiesSection property={property} />

                {/* Location Map Section */}
                <LocationSection address={property.address} />

                {/* Similar Properties */}
                <SimilarProperties />
              </div>

              {/* Right Column - Sidebar (30%) */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="space-y-4">
                    {/* Seller Contact Card */}
                    <SellerCard />

                    {/* Contact Form */}
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">Lỗi tải dữ liệu</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  )
}
