# Korean DMZ Website — Design Spec

**Date:** 2026-04-08  
**Project:** Architecture student showcase website for the Korean DMZ  
**Authors:** Two architecture students (unnamed)  
**Audience:** Professor presentation

---

## Overview

A single-page scrolling showcase website presenting the history of the Korean DMZ and an architectural proposal for a shared amphitheater/event space. The central concept is **"Seeing Without Touching"** — a glass-walled performance venue where both North and South Korea can witness events simultaneously without physical contact. When no events are running, the space displays digital/global news visible to both sides.

The site is built for a professor review but is architected to grow into a publicly accessible platform with ticket booking.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Validation | Zod (API boundaries) |
| Auth | NextAuth.js (Phase 2) |
| Deployment | Vercel (auto-deploy from GitHub) |
| Secrets | `.env.local` — never committed |

---

## Design System — Warm Stone

### Colors

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#f5f0e8` | Page background (odd sections) |
| `sand` | `#ede5d8` | Alternate section background (even sections) |
| `warm-brown` | `#8b7355` | Accents, borders, secondary text |
| `charcoal` | `#2c2416` | Primary text, nav, dark sections |
| `gold` | `#c8b560` | Active nav state, highlights, year labels |

### Typography

- **Headings**: Georgia (serif), light weight (200–300), wide letter-spacing
- **Body**: Inter (sans-serif), regular weight
- **Labels**: Inter, uppercase, letter-spacing 4px, `warm-brown`

---

## Site Structure

### Architecture

Single `app/page.tsx` containing all sections as stacked full-width components. Navigation uses anchor links (`#history`, `#stories`, etc.) with smooth scrolling. No client-side routing between sections — this is a scrolling single-page site.

```
app/
  layout.tsx          — persistent nav + footer wrapper
  page.tsx            — all sections in scroll order
  api/
    tickets/route.ts  — POST/GET tickets (Phase 2)
    auth/route.ts     — user auth (Phase 2)
lib/
  prisma.ts           — Prisma client singleton
prisma/
  schema.prisma       — data models
```

### Navigation (Persistent)

- Dark slim top bar (`charcoal`) fixed/sticky to top of viewport at all times
- Left: site name in cream, wide-tracked uppercase — `DMZ PROJECT`
- Right: anchor links — `HOME · HISTORY · STORIES · MAP · EVENTS · ARCHIVES · TEAM`
- Active section link highlighted in `gold` (updated via Intersection Observer as user scrolls)
- Smooth scroll behavior on click

### Footer

- Thin footer strip in `charcoal` at the very bottom of the page
- Left: `DMZ Project · 2026`
- Right: `An Architecture Proposal · [Author Names]`

---

## Sections (in scroll order)

### 1. Home (`#home`)

**Full viewport-height section with background video**

- Background: autoplay, muted, looping video of the DMZ (placeholder: dark gradient with faint grid overlay)
- Centered overlay content:
  - Small gold label: `38TH PARALLEL NORTH`
  - Large heading: `KOREAN DMZ` in Georgia, light weight, cream
  - Tagline: `Journey through the DMZ` in cream
  - Scroll prompt: `↓ Scroll to explore` in gold
- Dark overlay on video to ensure text is readable

---

### 2. History (`#history`)

**Cream background · Vertical timeline**

- Section label: `HISTORY` in warm-brown uppercase
- Section heading: `The Korean DMZ — 1945 to Present` in Georgia
- Vertical timeline component — left gold line, entries on the right:
  - Each entry: year in gold, heading, short description (2–3 sentences)
  - Placeholder entries: 1945, 1950, 1953, 1972, 1991, 2018, present
- Photo cards grid below timeline (3-column, placeholder images with captions)

---

### 3. Stories (`#stories`)

**Sand background · Story cards**

- Section label: `STORIES` in warm-brown uppercase
- Section heading in Georgia
- Card grid (3-column): each card has a placeholder image, story title, category tag (Personal Narrative / Photo Essay / Nature), and short excerpt
- Placeholder stories: family separation, life along the border, wildlife in the DMZ

---

### 4. Interactive Map (`#map`)

**Cream background · Proposal showcase**

- Section label: `INTERACTIVE MAP · OUR PROPOSAL` in warm-brown uppercase
- Left: interactive or static DMZ map (placeholder image) showing the 38th parallel and proposed amphitheater location
- Right: concept description
  - Pull-quote: `"Seeing Without Touching"`
  - 2–3 sentences describing the glass-walled amphitheater concept
- Below map: detail cards (3-column) — Glass Wall, Shared Sightlines, Dual Access, Digital News Display

---

### 5. Events (`#events`)

**Sand background · Event cards with booking**

- Section label: `EVENTS` in warm-brown uppercase
- Section heading: `Upcoming Events` in Georgia
- Event cards grid (2-column): each card shows event name, date, short description, and a `Book Tickets` button
  - Phase 1: button is visible but disabled with a "Coming Soon" tooltip
  - Phase 2: button opens booking modal/flow
- Prisma schema and API routes scaffolded from day one

---

### 6. Archives (`#archives`)

**Charcoal background · Testimony videos**

- Section label: `ARCHIVES` in gold uppercase (on dark background)
- Section heading: `Testimonies` in cream Georgia
- Subheading: `Stories of families still waiting to be reunited`
- Video card grid (3-column): each card dark, has a play button, thumbnail placeholder, and testimony title
- Phase 1: placeholder video cards with static thumbnails
- Phase 2: embed real testimony videos

---

### 7. About the Team (`#team`)

**Sand background · Team profiles**

- Section label: `ABOUT THE TEAM` in warm-brown uppercase
- Two profile cards side by side: circular avatar placeholder, name, role/year
- Below profiles: a short paragraph about the project context (architecture studio, proposal intent)

---

## Data Models (Prisma)

```prisma
model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
  tickets      Ticket[]
}

model Event {
  id          String   @id @default(cuid())
  title       String
  description String
  date        DateTime
  capacity    Int
  createdAt   DateTime @default(now())
  tickets     Ticket[]
}

model Ticket {
  id        String   @id @default(cuid())
  userId    String
  eventId   String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  event     Event    @relation(fields: [eventId], references: [id])
}
```

---

## Phased Delivery

### Phase 1 — Build Now

- All 7 sections on a single scrolling page
- Persistent sticky navbar with active section tracking (Intersection Observer)
- Warm Stone design system
- Background video placeholder on Home section
- Placeholder images and text throughout
- Prisma schema defined and migrated to Supabase
- Vercel + Supabase project connected
- `.env.local` with `DATABASE_URL`

### Phase 2 — Later

- Real DMZ video, photos, and architectural renders swapped in
- NextAuth.js user authentication
- Ticket booking flow on Events section
- Real testimony videos in Archives
- Interactive map (Mapbox or Leaflet)
- Digital news feed display

---

## What's Out of Scope

- Admin dashboard (Phase 2+)
- Payment processing (not required yet)
- Multi-language support (English only for professor presentation)
- Mobile-specific native features (responsive web is sufficient)
