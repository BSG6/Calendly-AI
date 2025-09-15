"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SuccessPanel } from "@/components/SuccessPanel"
import Link from "next/link"

function ConfirmPageContent() {
  const searchParams = useSearchParams()
  const start = searchParams.get("start")
  const end = searchParams.get("end")
  const title = searchParams.get("title")
  const duration = searchParams.get("duration")

  if (!start || !end || !title || !duration) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, color-mix(in srgb, #645986 10%, transparent), color-mix(in srgb, #801A86 5%, transparent))' }}>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-semibold">Booking Information Missing</h1>
              <p className="text-muted-foreground">
                Some booking details are missing. Please start a new booking.
              </p>
              <Link 
                href="/b/intro-call" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Start New Booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, color-mix(in srgb, #645986 10%, transparent), color-mix(in srgb, #801A86 5%, transparent))' }}>
      {/* Main Content Card */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
          <SuccessPanel 
            title={decodeURIComponent(title)} 
            start={start} 
            end={end} 
            duration={duration} 
          />
        </div>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, color-mix(in srgb, #645986 10%, transparent), color-mix(in srgb, #801A86 5%, transparent))' }}>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </div>
    }>
      <ConfirmPageContent />
    </Suspense>
  )
}
