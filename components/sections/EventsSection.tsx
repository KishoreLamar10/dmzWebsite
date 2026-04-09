'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { EventModal } from '@/components/EventModal'

const EVENTS = [
  {
    title: 'Echoes of Peace Orchestra',
    date: 'August 15, 2026',
    description: 'A collaborative performance featuring musicians from both Koreas and the international community, performing works of reconciliation in the shared amphitheater.',
    image: '/events/orchestra.png'
  },
  {
    title: 'DMZ Wildlife Photo Exhibition',
    date: 'September 02, 2026',
    description: 'An immersive showcase of the unique biodiversity found within the demilitarized zone, capturing rare species in habitats untouched by humans for decades.',
    image: '/events/wildlife.png'
  },
  {
    title: 'Voices Without Borders: Poetry Night',
    date: 'September 20, 2026',
    description: 'Poets and spoken word artists share stories of family, distance, and the hope of reunification, under the stars of the shared border space.',
    image: '/events/poetry.png'
  },
  {
    title: 'Global News Forum: Future of Borders',
    date: 'October 12, 2026',
    description: 'International journalists, architects, and thinkers discuss the symbolic and physical transformation of the 38th parallel into a space of cooperation.',
    image: '/events/news.png'
  }
]

export function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[0] | null>(null)

  return (
    <section id="events" className="bg-sand py-24 px-8 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Events</SectionLabel>
        <h2 className="font-serif font-light text-4xl tracking-wide text-charcoal mb-16">
          Upcoming Events
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENTS.map(event => (
            <div 
              key={event.title} 
              onClick={() => setSelectedEvent(event)}
              className="relative aspect-[4/5] overflow-hidden group cursor-pointer rounded-sm"
            >
              {/* Image Background */}
              <Image 
                src={event.image}
                alt={event.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="font-serif font-light text-2xl text-cream leading-tight">
                  {event.title}
                </h3>
                <div className="w-8 h-px bg-gold/50 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-gold text-[9px] tracking-[0.3em] uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </section>
  )
}
