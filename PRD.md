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

# PRD — Calendly Lite (Phase 2: Homepage + Branding)

## Problem
Back-and-forth scheduling wastes time. Calendly set the blueprint for solving this, but we want to add a playful, vibrant spin that feels personal and true to the digitalflower vibe.

## Users
- Host (single owner for MVP)
- Guest (anyone with the public link)

## In-Scope (Phase 2)
- **Homepage at `/`**:
  - Inspired by Calendly's landing experience
  - Host identity section: round avatar (`public/avatar.png`), name "Brie", tagline "Grab a slot, let's make some magic"
  - CTA: *"Pick a vibe, not just a time ✨"*
  - Event cards:
    - **Let's Bloom (30 min)** — *"A half hour to plant ideas, swap stories, and see what grows 🌱."*
    - **Coffee Chat (15 min)** — *"Short, sweet, and caffeinated ☕ — a quick burst of connection."*
  - Each card uses **organic thought-bubble shapes** with colored dots and links to `/b/[slug]`
  - Hover effect: Enhanced shadows + micro-scale animation + brand color transitions

- **Branding & Visual Design**:
  - Bright + vibrant palette applied consistently across app:
    - Primary Purple (deep): `#4E0250`
    - Accent Purple (bright): `#801A86`
    - Muted Purple/Gray: `#645986`
    - Accent Green (fresh): `#8FE388`
    - Deep Green (contrast): `#58BC82`
  - **Elevated Card Design System**:
    - Main sections: Brand gradient background (`#645986` + `#801A86` at low opacity)
    - Inner sections: White elevated cards (`bg-white`, `rounded-2xl`, `shadow-md`)
    - Hover effects: Enhanced shadows (`shadow-xl`) + micro-interactions (`scale-[1.02]`)
    - Thought-bubble shapes: Organic border-radius with colored dots for event cards
  - **Professional Booking Pages**:
    - Calendly-inspired layout: Left column (host info + event details), right sidebar (calendar + time slots)
    - Sticky sidebar with unified card design for calendar and time slots
    - Clean calendar styling with brand colors and proper hover states
    - Vertical time slot list with full-width buttons and brand hover effects
    - Host avatar and tagline displayed on booking pages
    - "Back to vibes" navigation button with quirky copy
  - Buttons, badges, and highlights updated to reflect palette
  - Tone: playful, approachable, quirky (digitalflower style)

- **Footer**:
  - Text: *“Inspired by Calendly, built by me 💜 digitalflower”*
  - Social icons: LinkedIn, Portfolio, TikTok, Bluesky, Email, GitHub
  - Hover states in palette colors; accessible labels

## Out of Scope (Phase 2)
- Multi-tenant hosting (still single owner)
- Real calendar integrations beyond .ics
- Custom theme picker (palette fixed in Tailwind config)

## Technical Implementation Details
- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui (extended with custom palette via CSS variables)
- **Shapes**: Organic border-radius + CSS pseudo-elements for thought-bubble dots
- **Calendar**: Custom CSS overrides for shadcn Calendar component with brand styling
- **Layout**: CSS Grid + Flexbox for responsive Calendly-style booking pages
- **Hover Effects**: Tailwind transitions + brand color integration
- **Socials**: Lucide React icons with accessible labels

## Success Criteria
- ✅ Homepage at `/` loads with avatar, name "Brie", tagline, and CTA
- ✅ Event cards display in organic thought-bubble shapes with colored dots, animate on hover
- ✅ Clicking event card routes to correct booking flow
- ✅ Footer visible with correct text + working social links
- ✅ Palette applied consistently to homepage and booking flow
- ✅ Booking pages use professional Calendly-style layout with sticky sidebar
- ✅ Calendar styled with brand colors and clean, modern appearance
- ✅ Time slots display as vertical list with proper spacing and hover effects
- ✅ Host avatar and info displayed on booking pages
- ✅ Overall look/feel references Calendly but with a playful, vibrant twist
