import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

const DETAIL_CARDS = [
  {
    title: 'Glass Wall',
    description: 'A structural achievement in transparency, allowing both North and South Korea to witness performances without physical barriers.'
  },
  {
    title: 'Shared Sightlines',
    description: 'Architecturally aligned to provide identical views from both sides, fostering a sense of shared experience and mutual understanding.'
  },
  {
    title: 'Dual Access',
    description: 'Independent entry points for both nations, ensuring security while maintaining the symbolic unity of the central space.'
  },
  {
    title: 'Digital News Display',
    description: 'When no events are scheduled, the glass walls transform into digital screens displaying global news and cultural information.'
  }
]

export function MapSection() {
  return (
    <section id="map" className="bg-cream py-24 px-8 lg:px-24 border-t border-warm-brown/10">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Interactive Map · Our Proposal</SectionLabel>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-12 mb-20">
          <div className="relative aspect-video rounded-sm overflow-hidden border border-warm-brown/20 shadow-2xl">
            <Image
              src="/proposal_concept.png"
              alt="Architectural Proposal - Seeing Without Touching"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/10" />
          </div>
          
          <div className="flex flex-col gap-6">
            <blockquote className="font-serif font-light text-5xl text-charcoal leading-tight">
              &ldquo;Seeing Without <span className="text-gold italic">Touching</span>&rdquo;
            </blockquote>
            <p className="text-warm-brown text-lg leading-relaxed">
              Our proposal envisions a glass-walled amphitheater situated directly on the border. 
              It is a space designed for cultural exchange where the physical barrier of the 38th parallel 
              is replaced by a transparent bridge of shared sightlines.
            </p>
            <p className="text-warm-brown text-lg leading-relaxed">
              When live performances are not in session, the structure acts as a digital beacon, 
              streaming global news and art visible to people on both sides of the divide.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DETAIL_CARDS.map(card => (
            <div key={card.title} className="p-6 bg-sand/50 border border-warm-brown/10 rounded-sm hover:border-warm-brown/30 transition-all group">
              <h4 className="font-serif text-lg text-charcoal mb-3 group-hover:text-gold transition-colors">{card.title}</h4>
              <p className="text-warm-brown text-xs leading-relaxed opacity-80">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
