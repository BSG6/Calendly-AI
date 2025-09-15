"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { BookingHeader } from "@/components/BookingHeader"
import { DatePickerCard } from "@/components/DatePickerCard"
import { SlotList } from "@/components/SlotList"
import { ConfirmDialog } from "@/components/ConfirmDialog"

interface EventMeta {
  title: string
  durationMins: number
  description: string
}

interface BookingPageClientProps {
  eventMeta: EventMeta
}

export function BookingPageClient({ eventMeta }: BookingPageClientProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedSlot, setSelectedSlot] = useState<string>()
  const [dialogOpen, setDialogOpen] = useState(false)

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Generate fixed slots for selected date
  const generateSlots = (date: Date): string[] => {
    const slots = ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30"]
    return slots.map((time) => {
      const [hours, minutes] = time.split(":").map(Number)
      const slotDate = new Date(date)
      slotDate.setHours(hours, minutes, 0, 0)
      return slotDate.toISOString()
    })
  }

  const availableSlots = selectedDate ? generateSlots(selectedDate) : []

  const handleSlotSelect = (slotIso: string) => {
    setSelectedSlot(slotIso)
    setDialogOpen(true)
  }

  const handleConfirm = async () => {
    if (!selectedSlot) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const startDate = new Date(selectedSlot)
    const endDate = new Date(startDate.getTime() + eventMeta.durationMins * 60 * 1000)

    const params = new URLSearchParams({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      title: eventMeta.title,
      duration: eventMeta.durationMins.toString(),
    })

    router.push(`/book/confirm?${params.toString()}`)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, color-mix(in srgb, #645986 10%, transparent), color-mix(in srgb, #801A86 5%, transparent))' }}>
      {/* Main Content Card */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
          {/* Back to Homepage Button */}
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-brand-accent-purple transition-colors underline-offset-4 hover:underline"
            >
              ← Back to vibes
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Event Details & Host Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Host Avatar & Info */}
              <div className="flex items-center gap-4">
                <Image
                  src="/avatar.png"
                  alt="Brie"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold text-brand-primary">Brie</h2>
                  <p className="text-muted-foreground">Let&apos;s make some magic ✨</p>
                </div>
              </div>

              <BookingHeader
                title={eventMeta.title}
                durationMins={eventMeta.durationMins}
                description={eventMeta.description}
                timezone={timezone}
              />
              
              {/* Additional Event Info */}
              <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-brand-primary">What to expect:</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📅</span>
                    <span>{eventMeta.durationMins} minute session</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🌐</span>
                    <span>Web conferencing details provided upon confirmation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🕒</span>
                    <span>Times displayed in {timezone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Calendar & Time Slots */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Unified Calendar & Time Slots Card */}
                <div className="bg-white border rounded-2xl shadow-lg overflow-hidden">
                  {/* Calendar Section */}
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-brand-primary mb-4">Select a Date</h3>
                    <DatePickerCard selectedDate={selectedDate} onChange={setSelectedDate} daysAhead={30} />
                  </div>

                  {/* Time Slots Section */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-brand-primary">
                        {selectedDate ? "Available Times" : "Pick a date first"}
                      </h3>
                      {selectedDate && (
                        <span className="text-sm text-muted-foreground">
                          {selectedDate.toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      )}
                    </div>
                    
                    {/* Enhanced Slot List Container */}
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {selectedDate ? (
                        <SlotList slots={availableSlots} onSelect={handleSlotSelect} loading={false} />
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <div className="text-4xl mb-2">📅</div>
                          <p className="text-sm">Select a date to view available times</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog open={dialogOpen} onOpenChange={setDialogOpen} slotIso={selectedSlot} onConfirm={handleConfirm} />
    </div>
  )
}
