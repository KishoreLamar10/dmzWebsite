import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

const TIMELINE_ENTRIES = [
  { 
    year: '1945', 
    heading: 'Division', 
    description: "After Japan's surrender, Korea is divided into Soviet and U.S. occupation zones along the 38th parallel.",
    image: 'The 38th Parallel marker, 1945',
    src: '/history/history_1945.png'
  },
  { 
    year: '1953', 
    heading: 'Armistice', 
    description: 'The armistice creates a 4km-wide DMZ buffer zone and halts fighting, though no peace treaty is signed.',
    image: 'UN forces at the DMZ, 1953',
    src: '/history/history_1953.png'
  },
  { 
    year: '1972', 
    heading: 'Dialogue', 
    description: 'The July 4 South-North Joint Communiqué establishes principles for reunification and opens official inter-Korean dialogue.',
    image: 'Panmunjom Joint Security Area',
    src: '/history/history_1972.png'
  },
  { 
    year: '1991', 
    heading: 'Basic Agreement', 
    description: 'Both Koreas join the UN, then sign the Basic Agreement on reconciliation, non-aggression, exchange, and cooperation.',
    image: 'The border fence at sunset',
    src: '/history/history_1991.png'
  },
  { 
    year: '2000', 
    heading: 'First Summit', 
    description: 'President Kim Dae-jung and North Korean leader Kim Jong Il meet in Pyongyang for the first inter-Korean summit.',
    image: 'Wildlife in the DMZ buffer zone',
    src: '/history/history_dmz_nature.png'
  },
  { 
    year: '2018', 
    heading: 'Peace Zone', 
    description: 'The Panmunjom Declaration commits both sides to reduce military tension and transform the DMZ into a peace zone.',
    image: 'Inter-Korean summit, Panmunjom',
    src: '/history/history_2018.png'
  },
]

export function HistorySection() {
  return (
    <section id="history" className="bg-cream py-24 px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionLabel>History</SectionLabel>
        <h2 className="font-serif font-light text-4xl lg:text-[2.75rem] tracking-wide text-charcoal mb-14 leading-tight">
          The Korean DMZ — A Timeline of Conflict & Dialogue
        </h2>

        {/* Static Horizontal Timeline */}
        <div className="relative mt-16">
          {/* Main Timeline Line */}
          <div className="absolute top-[37px] left-4 right-4 h-px bg-gold/30 z-0 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-y-14 lg:gap-6 xl:gap-8">
            {TIMELINE_ENTRIES.map((entry) => (
              <div 
                key={entry.year} 
                className="flex flex-col items-start lg:items-center text-left lg:text-center group"
              >
                {/* Dot on the line */}
                <div className="relative z-10 w-full mb-7 lg:mb-9 flex flex-col items-start lg:items-center">
                  <span className="text-gold text-base font-semibold tracking-wider block mb-4">
                    {entry.year}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-gold border-[5px] border-cream shadow-[0_0_0_1px_rgba(200,181,96,0.25)] transition-transform group-hover:scale-125" />
                </div>
                
                {/* Content Card */}
                <div className="border-l lg:border-l-0 lg:border-t border-gold/10 pl-6 lg:pl-0 lg:pt-7 h-full transition-colors group-hover:border-gold/30">
                  <h3 className="font-serif font-light text-2xl lg:text-[1.35rem] xl:text-2xl text-charcoal mb-4">
                    {entry.heading}
                  </h3>
                  
                  {/* Embedded Imagery */}
                  <div className="mb-5 w-full aspect-[5/4] bg-sand rounded-sm flex items-center justify-center border border-warm-brown/5 group-hover:border-warm-brown/20 transition-all overflow-hidden relative shadow-lg shadow-charcoal/5">
                    <Image 
                      src={entry.src}
                      alt={entry.image}
                      fill
                      sizes="(min-width: 1280px) 180px, (min-width: 1024px) calc((100vw - 248px) / 6), (min-width: 768px) calc((100vw - 96px) / 2), calc(100vw - 64px)"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                    />
                  </div>

                  <p className="text-warm-brown text-sm lg:text-[13px] xl:text-sm leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
                    {entry.description}
                  </p>
                  
                  <p className="mt-4 text-[10px] text-warm-brown/45 uppercase tracking-widest leading-tight">
                    {entry.image}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
