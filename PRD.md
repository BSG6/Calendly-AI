# PRD — Calendly Lite ✅ COMPLETED

## Problem
Back-and-forth scheduling wastes time. We need a tiny, fast booking flow: share a link → pick a time → confirm → add to calendar. No heavy backend.

## Users
- Host (single owner for MVP)
- Guest (anyone with the public link)

## In-Scope (MVP) ✅ IMPLEMENTED
- **Two event types (public):**
  - `/b/intro-call` — **30-min Intro Call**, desc: "Let's connect."
  - `/b/coffee-chat` — **15-min Coffee Chat**, desc: "Quick virtual coffee."
- **Booking page (App Router):**
  - Header with title, duration badge, description, **auto-detected timezone**
  - Date picker (next 30 days, past dates disabled)
  - Slot list with **6 fixed daily slots**: 10:00, 10:30, 11:00, 11:30, 14:00, 14:30
  - Confirm dialog with name + email validation (Zod)
  - **Loading states** and **empty states** for better UX
- **Confirmation page:**
  - Show details (title, start, end, duration) with timezone
  - **Real .ics download** via `/api/ics` with proper CRLF formatting
  - Copy details to clipboard (Sonner toast notifications)
  - **Error handling** for missing booking parameters
- **Full A11y compliance**: WCAG guidelines, keyboard navigation, 44px touch targets
- **Mobile-first responsive UI** using shadcn/ui components

## Out of Scope (MVP)
- Auth, DB persistence, email notifications
- Buffers/blackouts, real calendar integrations  
- Multi-tenant admin
- Dynamic slot availability (uses fixed mock slots)

## Technical Implementation Details
- **Framework**: Next.js 15.5.3 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Form Handling**: react-hook-form + @hookform/resolvers + Zod validation
- **Calendar**: react-day-picker for date selection
- **Notifications**: Sonner for toast messages
- **Additional Dependencies Added**:
  - `@radix-ui/*` components (dialog, popover, dropdown-menu, slot)
  - `date-fns` for date manipulation
  - `react-day-picker` for calendar component
  - `axios` for potential future API calls
  - `class-variance-authority` for component variants

## Key Features Implemented
- **Auto-timezone detection**: Uses `Intl.DateTimeFormat().resolvedOptions().timeZone`
- **Proper ICS generation**: RFC-compliant calendar files with unique UIDs
- **Form validation**: Real-time inline error messages
- **Responsive design**: Mobile-first with desktop 2-column layout
- **Accessibility**: Screen reader support, keyboard navigation, focus management
- **Error boundaries**: Graceful handling of missing data and invalid routes
- **Loading states**: Skeleton placeholders during data loading
- **Toast notifications**: User feedback for copy actions and errors

## Success Criteria ✅ MET
- ✅ Guest can book from `/b/intro-call` or `/b/coffee-chat`
- ✅ Form validation with name + email requirements
- ✅ Download working `.ics` files that open in Google/Apple/Outlook Calendar
- ✅ Copy booking details to clipboard with toast confirmation
- ✅ Works without errors on desktop & mobile viewports
- ✅ Fully accessible and keyboard navigable
- ✅ **Bonus**: Auto-detected timezone display for better UX

## Deployment Ready
- **Local Development**: `npm run dev` → http://localhost:3000
- **Production Build**: `npm run build` → optimized for deployment
- **No Environment Variables Required**: Fully self-contained MVP
- **No Database Dependencies**: Stateless booking flow
