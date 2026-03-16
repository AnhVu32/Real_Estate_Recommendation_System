"use client"

import { useState } from "react"
import { Send, Plus, MoreVertical, MapPin, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Message {
  id: string
  type: "ai" | "user"
  content: string
  time: string
  property?: {
    image: string
    title: string
    location: string
    price: string
    area: string
    bedrooms: number
    isNew?: boolean
  }
}

const initialMessages: Message[] = [
  {
    id: "msg-1",
    type: "ai",
    content: "Xin chào! Tôi là trợ lý AI chuyên về bất động sản. Dựa trên các tiêu chí bạn đang nhập, tôi có thể giúp bạn tìm căn hộ hoặc nhà phố phù hợp nhất. Bạn có muốn tôi gợi ý các khu vực đang có thanh khoản tốt không?",
    time: "10:45 AM"
  },
  {
    id: "msg-2",
    type: "user",
    content: "Tôi đang tìm căn hộ khoảng 3-4 tỷ ở Quận 7, ưu tiên có sổ hồng và hướng Đông Nam.",
    time: "10:46 AM"
  },
  {
    id: "msg-3",
    type: "ai",
    content: "Tuyệt vời! Tại Quận 7 với mức giá 3.5 - 4 tỷ, tôi tìm thấy 3 dự án đáp ứng tiêu chí hướng Đông Nam và đã có sổ hồng:",
    time: "10:46 AM",
    property: {
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      title: "Căn hộ Sunrise City - Tháp V6",
      location: "Nguyễn Hữu Thọ, Quận 7",
      price: "3.85 Tỷ",
      area: "76m²",
      bedrooms: 2,
      isNew: true
    }
  }
]

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputValue.trim()) return

    const userMessageId = `user-${Date.now()}`
    const newMessage: Message = {
      id: userMessageId,
      type: "user",
      content: inputValue,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiMessageId = `ai-${Date.now()}`
      const aiResponse: Message = {
        id: aiMessageId,
        type: "ai",
        content: "Tôi đang tìm kiếm các bất động sản phù hợp với yêu cầu của bạn. Vui lòng đợi trong giây lát...",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Chat Header - Fixed at top */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-background border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E03C31]/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#E03C31]" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Assistant</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-emerald-600">Đang trực tuyến</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Chat Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            {message.type === "ai" && (
              <div className="w-8 h-8 rounded-full bg-[#E03C31]/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[#E03C31]" />
              </div>
            )}
            
            <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
              <div className={`rounded-2xl px-4 py-3 ${
                message.type === "user" 
                  ? "bg-[#E03C31] text-white rounded-tr-sm" 
                  : "bg-muted text-foreground rounded-tl-sm"
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              
              {/* Property Card inside chat */}
              {message.property && (
                <div className="mt-3 bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="relative">
                    <Image
                      src={message.property.image}
                      alt={message.property.title}
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    {message.property.isNew && (
                      <span className="absolute top-2 right-2 bg-[#E03C31] text-white text-xs font-medium px-2 py-1 rounded">
                        Mới đăng
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-foreground text-sm mb-1">{message.property.title}</h4>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{message.property.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#E03C31] font-bold">{message.property.price}</span>
                      <span className="text-xs text-muted-foreground">
                        {message.property.area} • {message.property.bedrooms}PN
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <p className={`text-[10px] mt-1 ${message.type === "user" ? "text-right text-muted-foreground" : "text-muted-foreground"}`}>
                {message.time}
              </p>
            </div>

            {message.type === "user" && (
              <div className="w-8 h-8 rounded-full bg-[#E03C31] flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input - Fixed at bottom */}
      <div className="shrink-0 border-t border-border p-4 bg-background">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0 text-muted-foreground hover:text-foreground">
            <Plus className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Hỏi AI bất cứ điều gì về nhà đất..."
            className="flex-1 h-10"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button 
            type="submit"
            size="icon" 
            className="h-10 w-10 bg-[#E03C31] hover:bg-[#c43428] flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
