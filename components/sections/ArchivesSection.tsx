import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

const TESTIMONIES = [
  {
    title: 'The Mapmaker of 1953',
    description: 'A retired surveyor recounts the atmospheric pressure and silence while drawing the boundaries of the DMZ.',
    duration: '12:45',
    image: '/archives/mapmaker-1953.png'
  },
  {
    title: 'Across the Wire',
    description: 'A former resident of the North shares memories of family celebrations and the day the border closed permanently.',
    duration: '18:20',
    image: '/archives/across-the-wire.png'
  },
  {
    title: 'Birds of the Buffer Zone',
    description: 'A field biologist documents the incredible resilience of nature within the most fortified border on Earth.',
    duration: '15:10',
    image: '/archives/birds-buffer-zone.png'
  },
  {
    title: 'The Village of Peace',
    description: 'Stories from the residents of Daeseong-dong, the only South Korean village located within the DMZ.',
    duration: '21:30',
    image: '/archives/village-of-peace.png'
  },
  {
    title: 'Letters from My Sister',
    description: 'A collection of unsent correspondence reflecting 70 years of longing and the hope for a future reunion.',
    duration: '10:05',
    image: '/archives/letters-from-sister.png'
  },
  {
    title: 'Soundscapes of the 38th',
    description: 'A sonic journey capturing the contrast between the wind in the trees and the stillness of the checkpoint.',
    duration: '09:40',
    image: '/archives/soundscapes-38th.png'
  }
]

export function ArchivesSection() {
  return (
    <section id="archives" className="bg-charcoal py-24 px-8 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <SectionLabel light>Archives</SectionLabel>
        <h2 className="font-serif font-light text-4xl tracking-wide text-cream mb-4">
          Testimonies
        </h2>
        <p className="text-gold/60 tracking-[0.2em] uppercase text-xs mb-16">
          Stories of families still waiting to be reunited
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIES.map(video => (
            <div key={video.title} className="group relative bg-[#1a1610] border border-gold/10 p-6 flex flex-col justify-between hover:border-gold/30 transition-all cursor-pointer">
              <div className="relative aspect-video bg-black/40 mb-6 flex items-center justify-center overflow-hidden border border-gold/5">
                <Image
                  src={video.image}
                  alt={`${video.title} testimony thumbnail`}
                  fill
                  sizes="(min-width: 1024px) calc((100vw - 256px) / 3), (min-width: 768px) calc((100vw - 96px) / 2), calc(100vw - 64px)"
                  className="object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                {/* Play Button Overlay */}
                <div className="relative z-10 w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center bg-charcoal/30 backdrop-blur-sm group-hover:bg-gold/10 transition-all">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gold border-b-[8px] border-b-transparent ml-1" />
                </div>
                <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 bg-black/60 text-gold text-[10px] tracking-widest">
                  {video.duration}
                </div>
              </div>
              
              <div>
                <h3 className="font-serif font-light text-xl text-cream mb-2 group-hover:text-gold transition-colors">
                  {video.title}
                </h3>
                <p className="text-[#8b7355] text-xs leading-relaxed line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
