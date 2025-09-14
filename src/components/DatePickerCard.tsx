"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerCardProps {
  selectedDate?: Date
  onChange: (date: Date) => void
  daysAhead?: number
}

export function DatePickerCard({ selectedDate, onChange, daysAhead = 30 }: DatePickerCardProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + daysAhead)

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onChange(date)
    }
  }

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Select Date</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={(date) => {
            // Disable past dates (before today)
            if (date < today) return true
            // Disable dates beyond the window
            if (date > maxDate) return true
            return false
          }}
          initialFocus
        />
      </CardContent>
    </Card>
  )
}
