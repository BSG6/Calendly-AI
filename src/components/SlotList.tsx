"use client"

import { Button } from "@/components/ui/button"

interface SlotListProps {
  slots: string[]
  onSelect: (iso: string) => void
  loading?: boolean
}

export function SlotList({ slots, onSelect, loading = false }: SlotListProps) {
  const formatTimeSlot = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 animate-pulse rounded-md bg-muted" />
        ))}
      </div>
    )
  }

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-sm text-muted-foreground">No available time slots for this date.</p>
        <p className="text-xs text-muted-foreground mt-1">Please select a different date.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {slots.map((slot) => (
        <Button 
          key={slot} 
          variant="outline" 
          onClick={() => onSelect(slot)} 
          className="w-full h-12 justify-start text-left font-medium hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-200"
        >
          {formatTimeSlot(slot)}
        </Button>
      ))}
    </div>
  )
}
