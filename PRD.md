# PRD — Calendly Lite

## Problem
Back-and-forth scheduling wastes time. We need a tiny, fast booking flow: share a link → pick a time → confirm → add to calendar. No heavy backend.

## Users
- Host (single owner for MVP)
- Guest (anyone with the public link)

## In-Scope (MVP)
- Two event types (public):
  - `/b/intro-call` — **30-min Intro Call**, desc: “Let’s connect.”
  - `/b/coffee-chat` — **15-min Coffee Chat**, desc: “Quick virtual coffee.”
- Booking page (App Router):
  - Header (title, duration badge, description, timezone note)
  - Date picker (next 30 days)
  - Slot list (mocked slots per day for now)
  - Confirm dialog (name + email)
- Confirmation page:
  - Show details (title, start, end, duration)
  - **Real .ics download** via `/api/ics`
  - Copy details (Sonner toast)
- A11y, mobile-first UI (shadcn/ui)

## Out of Scope (MVP)
- Auth, DB persistence, email notifications
- Buffers/blackouts, real calendar integrations
- Multi-tenant admin

## Non-Functional
- Next.js (App Router) + TS + Tailwind + shadcn/ui + Sonner
- Simple, readable code; accessible focus/labels

## Success Criteria
- Guest can book from `/b/intro-call` or `/b/coffee-chat`, confirm, download working `.ics`, and copy details without errors on desktop & mobile.
