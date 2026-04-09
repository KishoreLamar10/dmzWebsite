'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StoryModal } from '@/components/StoryModal'

const STORIES = [
  { 
    title: 'Lost Brother & Sister Recognizing each other', 
    category: 'Historical Archive', 
    excerpt: "A deeply emotional moment from the 1983 KBS special 'Finding Dispersed Families', where a brother and sister reunite after decades of separation caused by the Korean War.",
    image: '/stories/reunion_real.png',
    videoId: '9kk11wIkCB0'
  },
  { 
    title: 'Finding Dispersed Families, July 1983', 
    category: 'TV Special', 
    excerpt: 'Footage from the historic live broadcast that captivated a nation, helping thousands of families reconnect through the power of television and national solidarity.',
    image: '/stories/studio_1983_real.png',
    videoId: 'W6i13Vf2CFA'
  },
  { 
    title: 'Your real name is?', 
    category: 'Historical Archive', 
    excerpt: "Archival footage exploring the identity and memory of those separated from their kin, where even a name becomes a precious fragment of a lost past.",
    image: '/stories/identity_real.png',
    videoId: 'CW2OD9FW4Ng'
  },
  { 
    title: 'Wildlife Reclaims the Zone', 
    category: 'Nature', 
    excerpt: "Untouched for 70 years, the DMZ has become one of Asia's most biodiverse ecosystems, where nature flourishes in the absence of human interference.",
    image: '/stories/wildlife.png' 
  },
  { 
    title: 'The Soldiers Who Wait', 
    category: 'Reportage', 
    excerpt: 'A study in patience and persistence along the military demarcation line, documenting the daily lives of those who stand guard.',
    image: '/stories/soldiers.png' 
  },
  { 
    title: 'Tourism at the Edge', 
    category: 'Feature', 
    excerpt: "Exploring the unique phenomenon of DMZ tourism, where the world's most dangerous border is viewed through the lens of history and curiosity.",
    image: '/stories/tourism.png' 
  },
]

export function StoriesSection() {
  const [selectedStory, setSelectedStory] = useState<typeof STORIES[0] | null>(null)

  return (
    <section id="stories" className="bg-sand py-24 px-8 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Stories</SectionLabel>
        <h2 className="font-serif font-light text-4xl tracking-wide text-charcoal mb-16">
          Voices from the Divide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STORIES.map(story => (
            <article 
              key={story.title} 
              onClick={() => setSelectedStory(story)}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer rounded-sm"
            >
              {/* Image Background */}
              <Image 
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="font-serif font-light text-2xl text-cream leading-tight">
                  {story.title}
                </h3>
                <div className="w-8 h-px bg-gold/50 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-gold text-[9px] tracking-[0.3em] uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Full Story
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <StoryModal 
        story={selectedStory} 
        onClose={() => setSelectedStory(null)} 
      />
    </section>
  )
}
