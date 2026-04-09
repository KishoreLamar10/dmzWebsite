import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

const TIMELINE_ENTRIES = [
  { 
    year: '1945', 
    heading: 'Division', 
    description: "Post-WWII division along the 38th parallel establishes the North and South zones.",
    image: 'The 38th Parallel marker, 1945',
    src: '/history/history_1945.png'
  },
  { 
    year: '1953', 
    heading: 'Armistice', 
    description: 'The ceasefire agreement creates the 4km-wide DMZ as a permanent buffer zone.',
    image: 'UN forces at the DMZ, 1953',
    src: '/history/history_1953.png'
  },
  { 
    year: '1972', 
    heading: 'Dialogue', 
    description: 'The July 4 Joint Communiqué initiates the first independent inter-Korean peace talks.',
    image: 'Panmunjom Joint Security Area',
    src: '/history/history_1972.png'
  },
  { 
    year: '1991', 
    heading: 'Basic Agreement', 
    description: 'Both nations join the UN and sign a historic pact of non-aggression and exchange.',
    image: 'The border fence at sunset',
    src: '/history/history_1991.png'
  },
  { 
    year: '2000', 
    heading: 'First Summit', 
    description: 'President Kim Dae-jung and Chairman Kim Jong-il meet in Pyongyang for the first time.',
    image: 'Wildlife in the DMZ buffer zone',
    src: '/history/history_dmz_nature.png'
  },
  { 
    year: '2018', 
    heading: 'Peace Zone', 
    description: 'The Panmunjom Declaration pledges to transform the DMZ into a symbol of peace.',
    image: 'Inter-Korean summit, Panmunjom',
    src: '/history/history_2018.png'
  },
]

export function HistorySection() {
  return (
    <section id="history" className="bg-cream py-24 px-8 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>History</SectionLabel>
        <h2 className="font-serif font-light text-4xl tracking-wide text-charcoal mb-16">
          The Korean DMZ — A Timeline of Conflict & Dialogue
        </h2>

        {/* Static Horizontal Timeline */}
        <div className="relative mt-20">
          {/* Main Timeline Line */}
          <div className="absolute top-[34px] left-4 right-4 h-px bg-gold/30 z-0 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-y-16 lg:gap-8">
            {TIMELINE_ENTRIES.map((entry) => (
              <div 
                key={entry.year} 
                className="flex flex-col items-start lg:items-center text-left lg:text-center group"
              >
                {/* Dot on the line */}
                <div className="relative z-10 w-full mb-8 lg:mb-10 flex flex-col items-start lg:items-center">
                  <span className="text-gold text-sm font-semibold tracking-wider block mb-4">
                    {entry.year}
                  </span>
                  <div className="w-4 h-4 rounded-full bg-gold border-4 border-cream shadow-[0_0_0_1px_rgba(200,181,96,0.2)] transition-transform group-hover:scale-125" />
                </div>
                
                {/* Content Card */}
                <div className="border-l lg:border-l-0 lg:border-t border-gold/10 pl-6 lg:pl-0 lg:pt-8 h-full transition-colors group-hover:border-gold/30">
                  <h3 className="font-serif font-light text-xl text-charcoal mb-4">
                    {entry.heading}
                  </h3>
                  
                  {/* Embedded Imagery */}
                  <div className="mb-6 w-full aspect-video bg-sand rounded-sm flex items-center justify-center border border-warm-brown/5 group-hover:border-warm-brown/20 transition-all overflow-hidden relative">
                    <Image 
                      src={entry.src}
                      alt={entry.image}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                    />
                  </div>

                  <p className="text-warm-brown text-xs leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {entry.description}
                  </p>
                  
                  <p className="mt-4 text-[9px] text-warm-brown/40 uppercase tracking-widest leading-tight">
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
