import { BookingPageClient } from "./BookingPageClient"

const EVENTS: Record<string, { title: string; durationMins: number; description: string }> = {
  "intro-call": { title: "30-min Intro Call", durationMins: 30, description: "Let's connect." },
  "coffee-chat": { title: "15-min Coffee Chat", durationMins: 15, description: "Quick virtual coffee." },
}

export default async function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const eventMeta = EVENTS[slug]
  
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
  
  return <BookingPageClient slug={slug} eventMeta={eventMeta} />
}