export default function BookingPage({ params }: { params: { slug: string } }) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Booking page for: {params.slug}</h1>
        <p>This is where the calendar and slots will show.</p>
      </main>
    )
  }
  