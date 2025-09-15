"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
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
  slug: string
  eventMeta: EventMeta
}

export function BookingPageClient({ slug, eventMeta }: BookingPageClientProps) {
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

  const handleConfirm = async (_data: { name: string; email: string }) => {
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
          <BookingHeader
            title={eventMeta.title}
            durationMins={eventMeta.durationMins}
            description={eventMeta.description}
            timezone={timezone}
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Calendar Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select a Date</h3>
              <DatePickerCard selectedDate={selectedDate} onChange={setSelectedDate} daysAhead={30} />
            </div>

            {/* Time Slots Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {selectedDate ? "Available Times" : "Select a date to see available times"}
              </h3>
              <SlotList slots={availableSlots} onSelect={handleSlotSelect} loading={false} />
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog open={dialogOpen} onOpenChange={setDialogOpen} slotIso={selectedSlot} onConfirm={handleConfirm} />
    </div>
  )
}
