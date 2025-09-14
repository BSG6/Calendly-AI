"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface SuccessPanelProps {
  title: string
  start: string
  end: string
  duration: string
}

export function SuccessPanel({ title, start, end, duration }: SuccessPanelProps) {
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    })
  }

  // Build ICS download URL
  const icsUrl = `/api/ics?${new URLSearchParams({
    title,
    start,
    end,
    description: `${title} - Duration: ${duration} minutes`,
    location: "Online",
  }).toString()}`

  const copyDetails = async () => {
    const details = `${title}
Date: ${formatDateTime(start)}
Duration: ${duration}
End: ${formatDateTime(end)}`

    try {
      await navigator.clipboard.writeText(details)
      toast.success("Booking details copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy details")
    }
  }

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold sm:text-3xl">You're booked ✨</h1>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>{formatDateTime(start)}</p>
            <p>Duration: {duration}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild>
          <a href={icsUrl} className="inline-flex items-center">
            Add to Calendar (.ics)
          </a>
        </Button>
        <Button variant="outline" onClick={copyDetails}>
          Copy details
        </Button>
      </div>

      <div className="pt-4">
        <a
          href="/b/intro-call"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
        >
          ← Back to booking page
        </a>
      </div>
    </div>
  )
}
