"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SuccessPanel } from "@/src/components/SuccessPanel"
import Link from "next/link"

function ConfirmPageContent() {
  const searchParams = useSearchParams()

  const start = searchParams.get("start")
  const end = searchParams.get("end")
  const title = searchParams.get("title")
  const duration = searchParams.get("duration")

  // Check if any required params are missing
  if (!start || !end || !title || !duration) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Booking Information Missing</h1>
          <p className="text-muted-foreground">Some booking details are missing. Please start a new booking.</p>
          <Link
            href="/b/intro-call"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Start New Booking
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <SuccessPanel title={decodeURIComponent(title)} start={start} end={end} duration={duration} />
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <ConfirmPageContent />
    </Suspense>
  )
}
