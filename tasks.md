# TASKS — Calendly Lite MVP

## 1) Public UI (Booking Flow)
1.1 Create pages & skeleton
- Create routes:
  - `src/app/b/[slug]/page.tsx`
  - `src/app/book/confirm/page.tsx`
- Show slug on booking page temporarily to verify routing.
**Acceptance:** `/b/intro-call` and `/b/coffee-chat` render without 404.

1.2 Components (reusable UI)
- `src/components/BookingHeader.tsx` (title, duration badge, desc, timezone)
- `src/components/DatePickerCard.tsx` (single month, next 30 days)
- `src/components/SlotList.tsx` (grid of times; loading & empty states)
- `src/components/ConfirmDialog.tsx` (name/email with zod validation)
**Acceptance:** All components render with mocked props, accessible labels.

1.3 Assemble booking page
- In `[slug]/page.tsx`: render Header + 2-column layout (calendar left, slots right; stacked on mobile).
- Mock slots for selected date: 10:00, 10:30, 11:00, 11:30, 14:00, 14:30 (local time).
- Clicking a slot opens ConfirmDialog.
**Acceptance:** Picking a date shows slots; clicking opens dialog.

## 2) Confirmation + ICS
2.1 Success panel
- `src/components/SuccessPanel.tsx`: “You’re booked ✨”, details, buttons:
  - “Add to Calendar (.ics)” (placeholder link for now)
  - “Copy details” (uses Sonner toast)
**Acceptance:** Displays values passed; toast fires on copy.

2.2 Real ICS endpoint
- `src/app/api/ics/route.ts`: `GET` returns valid `text/calendar` with CRLF, using query params (`title`, `start`, `end`, `description`, `location`).
**Acceptance:** Downloaded file opens in Google/Apple/Outlook Calendar with correct time/summary.

2.3 Wire success page to ICS
- `src/app/book/confirm/page.tsx` reads `start`, `end`, `title`, `duration` and passes to `SuccessPanel`.
- Build ICS link pointing to `/api/ics?...`.
**Acceptance:** From booking flow, confirmation page provides working ICS download.

## 3) Two Event Types
3.1 Support multiple slugs
- In `[slug]/page.tsx` define:
  ```ts
  const EVENTS: Record<string,{title:string; durationMins:number; description:string}> = {
    "intro-call": { title: "30-min Intro Call", durationMins: 30, description: "Let’s connect." },
    "coffee-chat": { title: "15-min Coffee Chat", durationMins: 15, description: "Quick virtual coffee." }
  }
## 4) Polish (UI & A11y)

4.1 Responsive layout
- Ensure booking page stacks vertically on mobile (<md) and switches to two-column on ≥md.
- Slot buttons have min-height 44px and comfortable padding.

4.2 Accessibility
- Visible focus styles on all interactive elements.
- ConfirmDialog traps focus, closes on Esc, labeled inputs with aria attributes.
- Decorative icons marked `aria-hidden="true"`.

4.3 Loading & Empty states
- Skeleton placeholders (animate-pulse) for calendar and slots while loading.
- Friendly empty state message if no slots available.

4.4 Error states
- Inline form errors (zod) for name/email.
- `/book/confirm` shows friendly error if params missing.
- Sonner toast for unexpected errors.

4.5 Visual consistency
- Consistent spacing (`space-y-4` etc.).
- Descriptions in `text-muted-foreground`.
- Use shadcn `Card`, `Separator`, `Badge` where helpful.

4.6 Timezone clarity
- BookingHeader shows “Times shown in {timezone}”.
- SuccessPanel formats start/end with `toLocaleString()` and includes timezone.

4.7 Keyboard navigation
- Verify full booking flow is keyboard-accessible (calendar → slots → dialog → submit).
- Fix any missing `tabIndex`/ARIA as needed.

**Acceptance:** Manual QA on desktop + mobile viewport. End-to-end booking flow works with keyboard. Responsive design, a11y, and polish issues addressed.
