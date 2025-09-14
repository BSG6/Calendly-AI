// export default function BookingPage({ params }: { params: { slug: string } }) {
//     return (
//       <main className="p-6">
//         <h1 className="text-xl font-semibold">Booking page for: {params.slug}</h1>
//         <p>This is where the calendar and slots will show.</p>
//       </main>
//     )
//   }
  "use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookingHeader } from "@/src/components/BookingHeader"
import { DatePickerCard } from "@/src/components/DatePickerCard"
import { SlotList } from "@/src/components/SlotList"
import { ConfirmDialog } from "@/src/components/ConfirmDialog"

const EVENTS: Record<string, { title: string; durationMins: number; description: string }> = {
  "intro-call": { title: "30-min Intro Call", durationMins: 30, description: "Let's connect." },
  "coffee-chat": { title: "15-min Coffee Chat", durationMins: 15, description: "Quick virtual coffee." },
}

export default function BookingPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedSlot, setSelectedSlot] = useState<string>()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const eventMeta = EVENTS[params.slug]

  if (!eventMeta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Event Not Found</h1>
          <p className="text-muted-foreground">The requested booking event does not exist.</p>
        </div>
      </div>
    )
  }

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

  const handleConfirm = async (data: { name: string; email: string }) => {
    if (!selectedSlot) return

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const startDate = new Date(selectedSlot)
    const endDate = new Date(startDate.getTime() + eventMeta.durationMins * 60 * 1000)

    const params = new URLSearchParams({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      title: encodeURIComponent(eventMeta.title),
      duration: eventMeta.durationMins.toString(),
    })

    router.push(`/book/confirm?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BookingHeader
          title={eventMeta.title}
          durationMins={eventMeta.durationMins}
          description={eventMeta.description}
          timezone="America/New_York"
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

      <ConfirmDialog open={dialogOpen} onOpenChange={setDialogOpen} slotIso={selectedSlot} onConfirm={handleConfirm} />
    </div>
  )
}
