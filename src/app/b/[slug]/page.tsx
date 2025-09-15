import { BookingPageClient } from "./BookingPageClient"

const EVENTS: Record<string, { title: string; durationMins: number; description: string }> = {
  "intro-call": { title: "Let&apos;s Bloom", durationMins: 30, description: "A half hour to plant ideas, swap stories, and see what grows 🌱" },
  "coffee-chat": { title: "Coffee Chat", durationMins: 15, description: "Short, sweet, and caffeinated ☕ — a quick burst of connection" },
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
  
  return <BookingPageClient eventMeta={eventMeta} />
}