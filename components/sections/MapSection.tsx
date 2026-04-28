'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

const GALLERY_IMAGES = [
  {
    src: '/gallery/proposal-gallery-main.jpeg',
    alt: 'Architectural proposal overview'
  },
  {
    src: '/gallery/proposal-gallery-1.jpeg',
    alt: 'Proposal gallery image 1'
  },
  {
    src: '/gallery/proposal-gallery-2.jpeg',
    alt: 'Proposal gallery image 2'
  },
  {
    src: '/gallery/proposal-gallery-3.jpeg',
    alt: 'Proposal gallery image 3'
  },
  {
    src: '/gallery/proposal-gallery-4.jpeg',
    alt: 'Proposal gallery image 4'
  }
]

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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const selectedImage =
    selectedImageIndex === null ? null : GALLERY_IMAGES[selectedImageIndex]

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  const showPreviousImage = () => {
    setSelectedImageIndex(currentIndex =>
      currentIndex === null
        ? 0
        : (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    )
  }

  const showNextImage = () => {
    setSelectedImageIndex(currentIndex =>
      currentIndex === null ? 0 : (currentIndex + 1) % GALLERY_IMAGES.length
    )
  }

  return (
    <section id="map" className="bg-cream py-24 px-8 lg:px-24 border-t border-warm-brown/10">
      <div className="max-w-7xl mx-auto">
        <SectionLabel>Interactive Map · Our Proposal</SectionLabel>
        
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-12 xl:gap-16 items-center mt-12 mb-20">
          <button
            type="button"
            onClick={() => setSelectedImageIndex(0)}
            className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-warm-brown/20 bg-charcoal text-left shadow-2xl shadow-charcoal/10 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_28px_80px_rgba(44,36,22,0.24)]"
            aria-label="Open proposal image gallery"
          >
            <Image
              src="/gallery/proposal-gallery-main.jpeg"
              alt="Architectural Proposal - Seeing Without Touching"
              fill
              sizes="(min-width: 1280px) 760px, (min-width: 1024px) calc((100vw - 240px) * 0.6), calc(100vw - 64px)"
              loading="eager"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/5 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">
                  Gallery
                </p>
                <p className="mt-2 font-serif text-2xl font-light text-cream">
                  View Proposal Images
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-charcoal/45 text-gold backdrop-blur-sm transition-all group-hover:bg-gold group-hover:text-charcoal">
                <Maximize2 size={18} />
              </span>
            </div>
          </button>
          
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

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 px-4 py-6 backdrop-blur-md lg:px-10">
          <button
            type="button"
            onClick={() => setSelectedImageIndex(null)}
            className="absolute inset-0 cursor-default"
            aria-label="Close gallery"
          />

          <div className="relative z-10 flex max-h-full w-full max-w-7xl flex-col">
            <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">
                  Seeing Without Touching
                </p>
                <h3 className="mt-2 font-serif text-2xl font-light text-cream lg:text-4xl">
                  Proposal Gallery
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-cream/5 text-cream transition-all hover:border-gold/60 hover:bg-gold hover:text-charcoal"
                aria-label="Close gallery"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              <div className="relative aspect-[16/10] w-full max-w-[min(100%,1200px)] max-h-[calc(100vh-190px)] overflow-hidden rounded-sm border border-gold/20 bg-black shadow-2xl">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="(min-width: 1280px) 1200px, calc(100vw - 32px)"
                  className="object-contain"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/20 bg-charcoal/70 text-gold backdrop-blur-sm transition-all hover:bg-gold hover:text-charcoal lg:left-4"
                aria-label="Show previous gallery image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/20 bg-charcoal/70 text-gold backdrop-blur-sm transition-all hover:bg-gold hover:text-charcoal lg:right-4"
                aria-label="Show next gallery image"
              >
                <ChevronRight size={24} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-gold/15 bg-charcoal/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold backdrop-blur-sm">
                {(selectedImageIndex ?? 0) + 1} / {GALLERY_IMAGES.length}
              </div>
            </div>

            <div className="mt-4 grid shrink-0 grid-cols-5 gap-2 lg:gap-4">
              {GALLERY_IMAGES.map((image, index) => (
                <button
                  type="button"
                  key={image.src}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-video overflow-hidden rounded-sm border transition-all ${
                    selectedImageIndex === index
                      ? 'border-gold opacity-100'
                      : 'border-gold/10 opacity-55 hover:border-gold/50 hover:opacity-100'
                  }`}
                  aria-label={`Show gallery image ${index + 1}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
