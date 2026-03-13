"use client"

import Image from "next/image"
import { Heart, MapPin, Camera, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    price: string
    area: string
    location: string
    description: string
    imageUrl: string
    imageCount: number
    badge?: "VIP" | "DEAL" | null
    agent: {
      name: string
      title: string
      avatarUrl: string
    }
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Image Section - Left Side */}
        <div className="relative w-full md:w-[280px] lg:w-[320px] h-[200px] md:h-auto md:min-h-[220px] flex-shrink-0">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover"
          />
          
          {/* Badge */}
          {property.badge && (
            <div className="absolute top-3 left-3">
              {property.badge === "VIP" ? (
                <Badge className="bg-[#E03C31] hover:bg-[#E03C31] text-white text-xs font-medium px-2 py-1">
                  VIP KIM CƯƠNG
                </Badge>
              ) : (
                <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-xs font-medium px-2 py-1">
                  ƯU ĐÃI LỚN
                </Badge>
              )}
            </div>
          )}

          {/* Photo Count */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Camera className="h-3 w-3" />
            <span>{property.imageCount}</span>
          </div>
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Title & Favorite */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground line-clamp-2 flex-1">
              {property.title}
            </h3>
            <button className="p-1.5 hover:bg-muted rounded-full transition-colors flex-shrink-0">
              <Heart className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Price & Area */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg font-bold text-[#E03C31]">{property.price}</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">{property.area}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {property.description}
          </p>

          {/* Agent Info & Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={property.agent.avatarUrl} alt={property.agent.name} />
                <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{property.agent.name}</p>
                <p className="text-xs text-muted-foreground">{property.agent.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9 border-border">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button className="bg-[#E03C31] hover:bg-[#c43428] text-white h-9 px-4 text-sm">
                <Phone className="h-4 w-4 mr-1.5" />
                Liên hệ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
