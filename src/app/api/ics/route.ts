import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get("title")
  const start = searchParams.get("start")
  const end = searchParams.get("end")
  const description = searchParams.get("description") || ""
  const location = searchParams.get("location") || "Online"

  // Validate required parameters
  if (!title || !start || !end) {
    return NextResponse.json({ error: "Missing required parameters: title, start, end" }, { status: 400 })
  }

  try {
    // Convert ISO strings to UTC format for ICS (YYYYMMDDTHHmmssZ)
    const formatDateForICS = (isoString: string): string => {
      const date = new Date(isoString)
      return date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "")
    }

    const dtStart = formatDateForICS(start)
    const dtEnd = formatDateForICS(end)

    // Generate unique ID
    const uid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@booking-app`

    // Create ICS content with CRLF line endings
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Booking App//Calendar Event//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${title}`,
      description ? `DESCRIPTION:${description}` : "",
      `LOCATION:${location}`,
      `DTSTAMP:${formatDateForICS(new Date().toISOString())}`,
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .filter(Boolean)
      .join("\r\n")

    // Create kebab-case filename
    const kebabTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${kebabTitle}.ics"`,
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate calendar file" }, { status: 500 })
  }
}
