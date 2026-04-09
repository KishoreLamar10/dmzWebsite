# Korean DMZ Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page scrolling showcase website for the Korean DMZ featuring 7 sections, a persistent sticky navbar with active-section tracking, the Warm Stone design system, and a Prisma/Supabase database schema ready for Phase 2 ticket booking.

**Architecture:** All content lives in a single `app/page.tsx` composed of 7 section components. A sticky `Navbar` uses `IntersectionObserver` (via `useActiveSection` hook) to highlight the active section as the user scrolls. No client-side routing — anchor links with smooth scroll.

**Tech Stack:** Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, Prisma, Supabase (PostgreSQL), Zod, Vitest, Vercel deployment.

---

## File Map

```
app/
  layout.tsx                        — root layout: Inter font, Navbar, Footer, children
  page.tsx                          — assembles all 7 sections in order
  globals.css                       — Tailwind directives + html smooth-scroll
  api/
    tickets/route.ts                — Phase 2 stub (returns 501)
    auth/route.ts                   — Phase 2 stub (returns 501)

components/
  Navbar.tsx                        — sticky nav, active section highlight
  Footer.tsx                        — thin charcoal footer strip
  ui/
    SectionLabel.tsx                — reusable uppercase label (warm-brown or gold)
  sections/
    HomeSection.tsx                 — full-viewport video/gradient hero
    HistorySection.tsx              — vertical timeline + photo cards
    StoriesSection.tsx              — story card grid
    MapSection.tsx                  — map placeholder + proposal detail cards
    EventsSection.tsx               — event cards with disabled Book button
    ArchivesSection.tsx             — dark bg testimony video card grid
    TeamSection.tsx                 — team profile cards

lib/
  prisma.ts                         — Prisma client singleton
  hooks/
    useActiveSection.ts             — IntersectionObserver hook
    useActiveSection.test.ts        — vitest unit tests

prisma/
  schema.prisma                     — User, Event, Ticket models

tailwind.config.ts                  — Warm Stone color tokens
vitest.config.ts                    — vitest + jsdom
.env.local.example                  — env var template (committed)
.gitignore                          — excludes .env.local, .superpowers/, node_modules
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: project root (scaffold in-place)

- [ ] **Step 1: Run create-next-app in the project directory**

```bash
cd "C:/Users/balak/Documents/Projects/dmzWebsite"
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted "The directory contains files that could conflict" → answer **Yes** to proceed. Accept all other defaults.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install prisma @prisma/client zod
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/dom jsdom
```

- [ ] **Step 3: Verify the scaffold**

```bash
npm run dev
```

Expected: Next.js dev server starts on `http://localhost:3000`. Open it — default Next.js page should appear.

Stop the server with `Ctrl+C`.

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 14 project with TypeScript and Tailwind"
```

---

## Task 2: Tailwind Design System + Global Styles + Vitest Config

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Create: `vitest.config.ts`
- Modify: `package.json`

- [ ] **Step 1: Configure Tailwind with Warm Stone tokens**

Replace the contents of `tailwind.config.ts` with:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5f0e8',
        sand: '#ede5d8',
        'warm-brown': '#8b7355',
        charcoal: '#2c2416',
        gold: '#c8b560',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Update globals.css**

Replace the contents of `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #f5f0e8;
  color: #2c2416;
}
```

- [ ] **Step 3: Create vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 4: Add test script to package.json**

Open `package.json` and add `"test": "vitest run"` and `"test:watch": "vitest"` to the `scripts` section:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 5: Verify Tailwind tokens work**

Open `app/page.tsx` and temporarily add a `className="bg-charcoal text-gold"` to the outer div. Run `npm run dev`, confirm the page shows the dark charcoal background. Revert the test change.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.ts app/globals.css vitest.config.ts package.json
git commit -m "feat: configure Warm Stone design system and vitest"
```

---

## Task 3: Prisma Schema + Environment Setup

**Files:**
- Create: `prisma/schema.prisma`
- Create: `lib/prisma.ts`
- Create: `.env.local.example`

- [ ] **Step 1: Initialize Prisma**

```bash
npx prisma init
```

This creates `prisma/schema.prisma` and `.env`.

- [ ] **Step 2: Write the schema**

Replace the contents of `prisma/schema.prisma` with:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

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

- [ ] **Step 3: Create the Prisma client singleton**

Create `lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

- [ ] **Step 4: Create .env.local.example**

Create `.env.local.example`:

```bash
# Supabase — Transaction pooler URL (used by Prisma at runtime)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase — Direct connection URL (used by Prisma for migrations)
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

- [ ] **Step 5: Rename .env to .env.local**

```bash
mv .env .env.local
```

Then edit `.env.local` and fill in your actual Supabase credentials (get them from Supabase dashboard → Project Settings → Database → Connection string → select "Prisma").

- [ ] **Step 6: Generate Prisma client**

```bash
npx prisma generate
```

Expected: `✔ Generated Prisma Client`

- [ ] **Step 7: Commit (without .env.local)**

```bash
git add prisma/schema.prisma lib/prisma.ts .env.local.example
git commit -m "feat: add Prisma schema (User, Event, Ticket) and Supabase setup"
```

---

## Task 4: useActiveSection Hook (TDD)

**Files:**
- Create: `lib/hooks/useActiveSection.ts`
- Create: `lib/hooks/useActiveSection.test.ts`

- [ ] **Step 1: Write the failing tests first**

Create `lib/hooks/useActiveSection.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useActiveSection } from './useActiveSection'

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
  })))
  vi.spyOn(document, 'getElementById').mockReturnValue(null)
})

describe('useActiveSection', () => {
  it('returns the first section id as the default', () => {
    const { result } = renderHook(() =>
      useActiveSection(['home', 'history', 'stories'])
    )
    expect(result.current).toBe('home')
  })

  it('returns empty string when given an empty array', () => {
    const { result } = renderHook(() => useActiveSection([]))
    expect(result.current).toBe('')
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test
```

Expected: 2 failing tests — `useActiveSection` not found.

- [ ] **Step 3: Implement the hook**

Create `lib/hooks/useActiveSection.ts`:

```typescript
'use client'
import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [sectionIds])

  return activeSection
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test
```

Expected: 2 passing tests.

- [ ] **Step 5: Commit**

```bash
git add lib/hooks/useActiveSection.ts lib/hooks/useActiveSection.test.ts
git commit -m "feat: add useActiveSection hook with IntersectionObserver"
```

---

## Task 5: SectionLabel UI Component

**Files:**
- Create: `components/ui/SectionLabel.tsx`

- [ ] **Step 1: Create the component**

Create `components/ui/SectionLabel.tsx`:

```typescript
type SectionLabelProps = {
  children: React.ReactNode
  light?: boolean
}

export function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <p
      className={`text-xs tracking-[0.4em] uppercase mb-3 font-sans ${
        light ? 'text-gold' : 'text-warm-brown'
      }`}
    >
      {children}
    </p>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/SectionLabel.tsx
git commit -m "feat: add reusable SectionLabel component"
```

---

## Task 6: Navbar + Footer

**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Navbar.tsx**

Create `components/Navbar.tsx`:

```typescript
'use client'
import { useActiveSection } from '@/lib/hooks/useActiveSection'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'history', label: 'History' },
  { id: 'stories', label: 'Stories' },
  { id: 'map', label: 'Map' },
  { id: 'events', label: 'Events' },
  { id: 'archives', label: 'Archives' },
  { id: 'team', label: 'Team' },
]

export function Navbar() {
  const activeSection = useActiveSection(SECTIONS.map(s => s.id))

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal h-14 flex items-center justify-between px-8">
      <span className="text-cream text-xs tracking-[0.4em] uppercase font-semibold">
        DMZ Project
      </span>
      <ul className="flex items-center gap-6">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${
                activeSection === id
                  ? 'text-gold border-b border-gold pb-0.5'
                  : 'text-[#a09080] hover:text-cream'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

- [ ] **Step 2: Create Footer.tsx**

Create `components/Footer.tsx`:

```typescript
export function Footer() {
  return (
    <footer className="bg-charcoal h-12 flex items-center justify-between px-8">
      <span className="text-warm-brown text-xs tracking-[0.2em] uppercase">
        DMZ Project · 2026
      </span>
      <span className="text-[#6a5a4a] text-xs">
        An Architecture Proposal
      </span>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx components/Footer.tsx
git commit -m "feat: add Navbar with active section tracking and Footer"
```

---

## Task 7: Root Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update app/layout.tsx**

Replace the contents of `app/layout.tsx` with:

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Korean DMZ Project',
  description: 'A journey through the Korean Demilitarized Zone — an architecture proposal for shared space.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-cream text-charcoal`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify layout renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm the dark navbar appears at the top and the footer at the bottom.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure root layout with Navbar and Footer"
```

---

## Task 8: Home Section

**Files:**
- Create: `components/sections/HomeSection.tsx`

- [ ] **Step 1: Create HomeSection.tsx**

Create `components/sections/HomeSection.tsx`:

```typescript
export function HomeSection() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Placeholder background — replace outer div with <video> when real footage available */}
      <div className="absolute inset-0 bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#3a3028] to-[#5a4a38]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,181,96,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,181,96,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center gap-4 px-4">
        <span className="text-gold text-xs tracking-[0.5em] uppercase">
          38th Parallel North
        </span>
        <h1 className="text-cream font-serif font-light text-7xl tracking-[0.15em] mt-2">
          KOREAN DMZ
        </h1>
        <p className="text-cream/80 text-xl tracking-[0.25em] mt-2">
          Journey through the DMZ
        </p>
        <a
          href="#history"
          className="mt-12 text-gold text-sm tracking-[0.3em] hover:opacity-60 transition-opacity"
        >
          ↓ Scroll to explore
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/HomeSection.tsx
git commit -m "feat: add Home section with full-viewport hero"
```

---

## Task 9: History Section

**Files:**
- Create: `components/sections/HistorySection.tsx`

- [ ] **Step 1: Create HistorySection.tsx**

Create `components/sections/HistorySection.tsx`:

```typescript
import { SectionLabel } from '@/components/ui/SectionLabel'

const TIMELINE_ENTRIES = [
  {
    year: '1945',
    heading: 'Division at the 38th Parallel',
    description:
      'Following Japan\'s surrender in World War II, Korea is divided along the 38th parallel. The Soviet Union occupies the north, the United States the south.',
  },
  {
    year: '1950',
    heading: 'The Korean War Begins',
    description:
      'North Korea invades South Korea on June 25, triggering a three-year conflict that draws in the United Nations and China.',
  },
  {
    year: '1953',
    heading: 'Armistice Agreement',
    description:
      'An armistice is signed on July 27, establishing the Demilitarized Zone — a 4km-wide, 250km-long buffer zone — as a ceasefire line. The war is paused, not ended.',
  },
  {
    year: '1972',
    heading: 'Joint Communiqué',
    description:
      'North and South Korea issue a joint statement agreeing to seek peaceful reunification independently of outside forces — the first inter-Korean dialogue.',
  },
  {
    year: '1991',
    heading: 'Basic Agreement',
    description:
      'Both Koreas sign an agreement on reconciliation, non-aggression, and exchanges, renewing hope for eventual reunification.',
  },
  {
    year: '2018',
    heading: 'Panmunjom Declaration',
    description:
      'Leaders Kim Jong-un and Moon Jae-in meet at the border and sign a declaration pledging to work toward denuclearisation and permanent peace.',
  },
  {
    year: 'Today',
    heading: 'A Line Still Drawn',
    description:
      'The DMZ remains one of the most heavily fortified borders in the world, yet has paradoxically become a rare wildlife sanctuary, largely untouched by humans.',
  },
]

const PHOTO_CARDS = [
  { caption: 'The 38th Parallel marker, 1945', date: '1945' },
  { caption: 'UN forces at the DMZ, 1953', date: '1953' },
  { caption: 'Panmunjom Joint Security Area', date: '1976' },
  { caption: 'The border fence at sunset', date: '2010' },
  { caption: 'Wildlife in the DMZ buffer zone', date: '2020' },
  { caption: 'Inter-Korean summit, Panmunjom', date: '2018' },
]

export function HistorySection() {
  return (
    <section id="history" className="bg-cream py-24 px-8 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>History</SectionLabel>
        <h2 className="font-serif font-light text-4xl tracking-wide text-charcoal mb-16">
          The Korean DMZ — 1945 to Present
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gold line */}
          <div className="absolute left-[60px] top-0 bottom-0 w-px bg-gold/40" />

          <div className="flex flex-col gap-12">
            {TIMELINE_ENTRIES.map(entry => (
              <div key={entry.year} className="flex gap-8 items-start">
                <span className="text-gold text-sm font-semibold tracking-wider min-w-[60px] text-right pt-0.5">
                  {entry.year}
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-gold mt-1.5 flex-shrink-0 relative z-10" />
                <div className="flex-1">
                  <h3 className="font-serif font-light text-xl text-charcoal mb-2">
                    {entry.heading}
                  </h3>
                  <p className="text-warm-brown text-sm leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo cards */}
        <div className="mt-20 grid grid-cols-3 gap-6">
          {PHOTO_CARDS.map(card => (
            <div key={card.caption} className="group">
              {/* Placeholder image */}
              <div className="w-full h-40 bg-sand rounded-sm flex items-center justify-center border border-warm-brown/20 group-hover:border-warm-brown/40 transition-colors">
                <span className="text-warm-brown/40 text-xs tracking-widest uppercase">
                  Photo
                </span>
              </div>
              <p className="mt-2 text-xs text-warm-brown leading-snug">{card.caption}</p>
              <p className="text-xs text-warm-brown/50 mt-0.5">{card.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/HistorySection.tsx
git commit -m "feat: add History section with timeline and photo cards"
```

---

## Task 10: Stories Section

**Files:**
- Create: `components/sections/StoriesSection.tsx`

- [ ] **Step 1: Create StoriesSection.tsx**

Create `components/sections/StoriesSection.tsx`:

```typescript
import { SectionLabel } from '@/components/ui/SectionLabel'

const STORIES = [
  {
    title: 'A Family Divided',
    category: 'Personal Narrative',
    excerpt:
      'For over seven decades, millions of Korean families have lived on opposite sides of a line they never chose. This is one family\'s story of separation and longing.',
  },
  {
    title: 'The Silent Border',
    category: 'Photo Essay',
    excerpt:
      'A photographic journey along the 250-kilometre demilitarized zone — watchtowers, barbed wire, and the eerie stillness of a land frozen in conflict.',
  },
  {
    title: 'Wildlife Reclaims the Zone',
    category: 'Nature',
    excerpt:
      'Untouched for 70 years, the DMZ has become one of Asia\'s most biodiverse ecosystems. Amur leopard cats, Asiatic black bears, and red-crowned cranes roam freely.',
  },
  {
    title: 'The Soldiers Who Wait',
    category: 'Reportage',
    excerpt:
      'Thousands of soldiers on both sides stand guard along the same border every day, decades after the guns fell silent. What do they think about?',
  },
  {
    title: 'Tourism at the Edge',
    category: 'Feature',
    excerpt:
      'Every year, tourists peer across the world\'s most dangerous border from observation decks. The DMZ has become an unlikely destination — part memorial, part curiosity.',
  },
  {
    title: 'Letters Never Sent',
    category: 'Personal Narrative',
    excerpt:
      'A collection of letters written by separated families to relatives they may never see again — words that crossed no border but carry the weight of decades.',
  },
]

export function StoriesSection() {
  return (
    <section id="stories" className="bg-sand py-24 px-8 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Stories</SectionLabel>
        <h2 className="font-serif font-light text-4xl tracking-wide text-charcoal mb-12">
          Voices from the Divide
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {STORIES.map(story => (
            <article key={story.title} className="group cursor-pointer">
              {/* Placeholder image */}
              <div className="w-full h-44 bg-cream rounded-sm flex items-center justify-center border border-warm-brown/20 group-hover:border-warm-brown/50 transition-colors mb-4">
                <span className="text-warm-brown/30 text-xs tracking-widest uppercase">
                  Image
                </span>
              </div>
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase">
                {story.category}
              </span>
              <h3 className="font-serif font-light text-xl text-charcoal mt-1.5 mb-2 group-hover:text-warm-brown transition-colors">
                {story.title}
              </h3>
              <p className="text-warm-brown text-sm leading-relaxed line-clamp-3">
                {story.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/StoriesSection.tsx
git commit -m "feat: add Stories section with narrative card grid"
```

---

## Task 11: Interactive Map / Proposal Section

**Files:**
- Create: `components/sections/MapSection.tsx`

- [ ] **Step 1: Create MapSection.tsx**

Create `components/sections/MapSection.tsx`:

```typescript
import { SectionLabel } from '@/components/ui/SectionLabel'

const DETAIL_CARDS = [
  {
    title: 'The Glass Wall',
    description:
      'A floor-to-ceiling glass partition divides the amphitheater along the exact line of the 38th parallel. Both audiences share sight, sound, and experience — separated only by glass.',
  },
  {
    title: 'Shared Sightlines',
    description:
      'The seating arrangement on both sides mirrors the other. Every seat has an unobstructed view of the stage and of the audience across the divide.',
  },
  {
    title: 'Dual Access',
    description:
      'Two independent entrances — one from the south, one from the north — allow each side to enter and exit without crossing the border.',
  },
  {
    title: 'Digital News Display',
    description:
      'When no events are scheduled, the glass wall becomes a screen broadcasting global and local news visible to both sides — a shared window on the world.',
  },
]

export function MapSection() {
  return (
    <section id="map" className="bg-cream py-24 px-8 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Interactive Map · Our Proposal</SectionLabel>
        <h2 className="font-serif font-light text-4xl tracking-wide text-charcoal mb-12">
          An Amphitheater at the 38th Parallel
        </h2>

        {/* Map + concept split */}
        <div className="flex gap-12 items-start mb-16">
          {/* Map placeholder */}
          <div className="flex-1 min-h-72 bg-sand rounded-sm border border-warm-brown/20 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-px bg-warm-brown/30" />
            <span className="text-warm-brown/40 text-xs tracking-widest uppercase">
              DMZ Map — 38th Parallel
            </span>
            <span className="text-warm-brown/25 text-[10px]">
              Interactive map coming in Phase 2
            </span>
            <div className="w-16 h-px bg-warm-brown/30" />
          </div>

          {/* Concept text */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            <blockquote className="font-serif font-light text-3xl text-charcoal tracking-wide leading-snug border-l-2 border-gold pl-6">
              "Seeing Without Touching"
            </blockquote>
            <p className="text-warm-brown leading-relaxed">
              A glass-walled amphitheater positioned directly on the 38th parallel — the dividing line between North and South Korea. Both sides of the divide can attend the same performance, watch the same film, hear the same music. The glass separates, but it also connects.
            </p>
            <p className="text-warm-brown leading-relaxed">
              When the stage is empty, the glass becomes a display surface — broadcasting global news, shared history, or live feeds visible to citizens on both sides.
            </p>
          </div>
        </div>

        {/* Detail cards */}
        <div className="grid grid-cols-4 gap-6">
          {DETAIL_CARDS.map(card => (
            <div
              key={card.title}
              className="bg-sand rounded-sm p-5 border border-warm-brown/15 hover:border-warm-brown/35 transition-colors"
            >
              <h3 className="font-serif font-light text-lg text-charcoal mb-3">
                {card.title}
              </h3>
              <p className="text-warm-brown text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/MapSection.tsx
git commit -m "feat: add Interactive Map/Proposal section with concept and detail cards"
```

---

## Task 12: Events Section

**Files:**
- Create: `components/sections/EventsSection.tsx`

- [ ] **Step 1: Create EventsSection.tsx**

Create `components/sections/EventsSection.tsx`:

```typescript
import { SectionLabel } from '@/components/ui/SectionLabel'

const PLACEHOLDER_EVENTS = [
  {
    title: 'Peace Through Music',
    date: 'June 15, 2026',
    description:
      'An orchestral performance featuring musicians from both South Korea and international ensembles, performed simultaneously for audiences on both sides of the DMZ.',
  },
  {
    title: 'Cultural Exchange Forum',
    date: 'August 22, 2026',
    description:
      'A joint symposium on Korean heritage, architecture, and culture — open to academics, artists, and the public from all nations.',
  },
  {
    title: 'Cinema Across the Line',
    date: 'October 10, 2026',
    description:
      'A film screening of Korean cinema — both North and South — projected on the glass wall for simultaneous viewing from either side.',
  },
  {
    title: 'New Year at the Parallel',
    date: 'December 31, 2026',
    description:
      'A shared New Year's countdown — the first joint celebration at the 38th parallel, broadcast live worldwide.',
  },
]

export function EventsSection() {
  return (
    <section id="events" className="bg-sand py-24 px-8 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Events</SectionLabel>
        <h2 className="font-serif font-light text-4xl tracking-wide text-charcoal mb-12">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {PLACEHOLDER_EVENTS.map(event => (
            <div
              key={event.title}
              className="bg-cream rounded-sm p-6 border border-warm-brown/20 flex flex-col gap-4"
            >
              <div>
                <span className="text-gold text-[10px] tracking-[0.35em] uppercase">
                  {event.date}
                </span>
                <h3 className="font-serif font-light text-2xl text-charcoal mt-1.5">
                  {event.title}
                </h3>
              </div>
              <p className="text-warm-brown text-sm leading-relaxed flex-1">
                {event.description}
              </p>
              <div className="relative group/btn inline-block self-start">
                <button
                  disabled
                  className="bg-charcoal text-cream text-xs tracking-[0.2em] uppercase px-5 py-2.5 opacity-40 cursor-not-allowed"
                >
                  Book Tickets
                </button>
                {/* Tooltip */}
                <span className="absolute -top-8 left-0 bg-charcoal text-cream text-[10px] px-2 py-1 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Coming soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/EventsSection.tsx
git commit -m "feat: add Events section with placeholder event cards and disabled booking"
```

---

## Task 13: Archives Section

**Files:**
- Create: `components/sections/ArchivesSection.tsx`

- [ ] **Step 1: Create ArchivesSection.tsx**

Create `components/sections/ArchivesSection.tsx`:

```typescript
import { SectionLabel } from '@/components/ui/SectionLabel'

const TESTIMONIES = [
  {
    title: 'Park Sung-jin, 84',
    subtitle: 'Last saw his brother in 1952',
  },
  {
    title: 'Lee Myung-hee, 79',
    subtitle: 'Separated from her mother at age 7',
  },
  {
    title: 'Kim Jae-won, 91',
    subtitle: 'A soldier who never went home',
  },
  {
    title: 'Choi Young-sook, 76',
    subtitle: 'Waiting for news of her father',
  },
  {
    title: 'Oh Sung-woo, 88',
    subtitle: 'Born in Pyongyang, now in Seoul',
  },
  {
    title: 'Jung Hae-rim, 82',
    subtitle: 'A teacher divided from her students',
  },
]

export function ArchivesSection() {
  return (
    <section id="archives" className="bg-charcoal py-24 px-8 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <SectionLabel light>Archives</SectionLabel>
        <h2 className="font-serif font-light text-4xl tracking-wide text-cream mb-3">
          Testimonies
        </h2>
        <p className="text-warm-brown text-sm tracking-wide mb-12">
          Stories of families still waiting to be reunited
        </p>

        <div className="grid grid-cols-3 gap-6">
          {TESTIMONIES.map(testimony => (
            <div
              key={testimony.title}
              className="group bg-[#1e1810] rounded-sm border border-warm-brown/20 hover:border-warm-brown/40 transition-colors overflow-hidden cursor-pointer"
            >
              {/* Thumbnail placeholder */}
              <div className="w-full h-36 bg-[#2a2018] flex items-center justify-center relative">
                {/* Play button */}
                <div className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all">
                  <span className="text-gold text-sm ml-0.5">▶</span>
                </div>
                <span className="absolute bottom-2 right-3 text-[10px] text-warm-brown/50 tracking-wider uppercase">
                  Video
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-cream text-sm font-medium">{testimony.title}</p>
                <p className="text-warm-brown text-xs mt-1 leading-snug">
                  {testimony.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ArchivesSection.tsx
git commit -m "feat: add Archives section with testimony video cards"
```

---

## Task 14: About the Team Section

**Files:**
- Create: `components/sections/TeamSection.tsx`

- [ ] **Step 1: Create TeamSection.tsx**

Create `components/sections/TeamSection.tsx`:

```typescript
import { SectionLabel } from '@/components/ui/SectionLabel'

const TEAM = [
  {
    name: 'Student Name 1',
    role: 'Architecture Student',
    year: 'Year 4',
    bio: 'Focused on the intersection of political geography and built form. This project explores the architecture of division and the possibility of shared civic space.',
  },
  {
    name: 'Student Name 2',
    role: 'Architecture Student',
    year: 'Year 4',
    bio: 'Interested in how borders are constructed — physically, politically, and spatially. The DMZ proposal asks: what would it mean to build for connection across a line?',
  },
]

export function TeamSection() {
  return (
    <section id="team" className="bg-sand py-24 px-8 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>About the Team</SectionLabel>
        <h2 className="font-serif font-light text-4xl tracking-wide text-charcoal mb-12">
          The Architects
        </h2>

        {/* Profile cards */}
        <div className="flex gap-12 mb-16">
          {TEAM.map(member => (
            <div key={member.name} className="flex-1 flex flex-col items-start gap-4">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-full bg-warm-brown/20 border-2 border-warm-brown/30 flex items-center justify-center">
                <span className="text-warm-brown/40 text-xs tracking-widest uppercase">
                  Photo
                </span>
              </div>
              <div>
                <h3 className="font-serif font-light text-xl text-charcoal">
                  {member.name}
                </h3>
                <p className="text-gold text-xs tracking-[0.25em] uppercase mt-0.5">
                  {member.role} · {member.year}
                </p>
              </div>
              <p className="text-warm-brown text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Project context */}
        <div className="border-t border-warm-brown/20 pt-10">
          <p className="text-warm-brown text-sm leading-relaxed max-w-2xl">
            This project was developed as part of an architecture studio exploring borders, division, and the
            possibility of shared civic space. The Korean DMZ — one of the last Cold War frontiers — became
            the site for a speculative proposal: an amphitheater that lets two nations witness the same
            moment, separated only by glass.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/TeamSection.tsx
git commit -m "feat: add About the Team section with profile cards"
```

---

## Task 15: Assemble page.tsx + API Stubs

**Files:**
- Modify: `app/page.tsx`
- Create: `app/api/tickets/route.ts`
- Create: `app/api/auth/route.ts`

- [ ] **Step 1: Assemble page.tsx**

Replace the contents of `app/page.tsx` with:

```typescript
import { HomeSection } from '@/components/sections/HomeSection'
import { HistorySection } from '@/components/sections/HistorySection'
import { StoriesSection } from '@/components/sections/StoriesSection'
import { MapSection } from '@/components/sections/MapSection'
import { EventsSection } from '@/components/sections/EventsSection'
import { ArchivesSection } from '@/components/sections/ArchivesSection'
import { TeamSection } from '@/components/sections/TeamSection'

export default function Home() {
  return (
    <>
      <HomeSection />
      <HistorySection />
      <StoriesSection />
      <MapSection />
      <EventsSection />
      <ArchivesSection />
      <TeamSection />
    </>
  )
}
```

- [ ] **Step 2: Create tickets API stub**

Create `app/api/tickets/route.ts`:

```typescript
import { NextResponse } from 'next/server'

// Phase 2: implement ticket booking
export function GET() {
  return NextResponse.json({ message: 'Ticket booking coming in Phase 2.' }, { status: 501 })
}

export function POST() {
  return NextResponse.json({ message: 'Ticket booking coming in Phase 2.' }, { status: 501 })
}
```

- [ ] **Step 3: Create auth API stub**

Create `app/api/auth/route.ts`:

```typescript
import { NextResponse } from 'next/server'

// Phase 2: implement NextAuth
export function GET() {
  return NextResponse.json({ message: 'Authentication coming in Phase 2.' }, { status: 501 })
}

export function POST() {
  return NextResponse.json({ message: 'Authentication coming in Phase 2.' }, { status: 501 })
}
```

- [ ] **Step 4: Verify the full page**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll through all 7 sections. Confirm:
- Navbar is sticky and visible throughout
- Active nav link highlights as you scroll between sections
- All sections render without errors
- Footer appears at the bottom

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/api/tickets/route.ts app/api/auth/route.ts
git commit -m "feat: assemble full single-page site with all sections and API stubs"
```

---

## Task 16: .gitignore + Vercel Setup

**Files:**
- Modify: `.gitignore`
- Create: `.env.local` is already excluded — verify

- [ ] **Step 1: Update .gitignore**

Open `.gitignore` (create-next-app generates one). Confirm these lines exist, add any that are missing:

```
# Dependencies
node_modules/

# Next.js
.next/
out/

# Environment variables
.env
.env.local
.env.*.local

# Prisma
prisma/migrations/*.sql   # only if you don't want to commit migrations

# Superpowers brainstorm files
.superpowers/

# OS
.DS_Store
Thumbs.db
```

- [ ] **Step 2: Run final lint and type check**

```bash
npm run lint
npx tsc --noEmit
```

Expected: no errors. Fix any type errors before continuing.

- [ ] **Step 3: Run tests**

```bash
npm test
```

Expected: 2 passing tests (useActiveSection).

- [ ] **Step 4: Final commit**

```bash
git add .gitignore
git commit -m "chore: update .gitignore and verify lint + types pass"
```

- [ ] **Step 5: Push to GitHub and deploy to Vercel**

```bash
git remote add origin https://github.com/<your-username>/dmz-website.git
git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com) → New Project → Import the GitHub repo
2. Add environment variables in Vercel dashboard: `DATABASE_URL` and `DIRECT_URL` from your Supabase project
3. Deploy

- [ ] **Step 6: Run Prisma migration against Supabase**

Once `.env.local` has valid Supabase credentials:

```bash
npx prisma migrate dev --name init
```

Expected: migration applied, tables `User`, `Event`, `Ticket` created in Supabase.

---

## Completion Checklist

- [ ] All 7 sections render on a single scrolling page
- [ ] Sticky navbar highlights active section on scroll
- [ ] Warm Stone design system applied consistently (cream, sand, charcoal, gold, warm-brown)
- [ ] Home hero reads "Journey through the DMZ"
- [ ] Book Tickets button is visible but disabled with "Coming soon" tooltip
- [ ] Prisma schema migrated to Supabase
- [ ] `npm run lint` passes with no errors
- [ ] `npx tsc --noEmit` passes with no errors
- [ ] `npm test` passes (2 tests)
- [ ] Site deployed to Vercel
