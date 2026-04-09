'use client'

import Image from 'next/image'
import { useEffect } from 'react'

type Event = {
  title: string
  date: string
  description: string
  image: string
}

type EventModalProps = {
  event: Event | null
  onClose: () => void
}

export function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [event])

  if (!event) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-cream w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in zoom-in-95 duration-300 border border-gold/10">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 border border-charcoal/20 flex items-center justify-center rounded-full text-charcoal hover:bg-charcoal hover:text-cream transition-all group"
          aria-label="Close Modal"
        >
          <span className="text-xl font-light transform group-hover:rotate-90 transition-transform">✕</span>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image Side */}
          <div className="lg:w-1/2 aspect-[4/5] lg:aspect-auto relative min-h-[400px]">
            <Image 
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Details Side */}
          <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
            <span className="text-gold text-[11px] tracking-[0.5em] uppercase font-black mb-6">
              {event.date}
            </span>
            <h2 className="font-serif font-light text-4xl lg:text-5xl text-charcoal leading-tight mb-8">
              {event.title}
            </h2>
            <div className="w-12 h-px bg-gold/30 mb-8" />
            <p className="text-warm-brown text-base lg:text-lg leading-relaxed mb-12 italic opacity-90">
              {event.description}
            </p>

            <div className="pt-8 border-t border-warm-brown/10">
              <div className="relative inline-block w-fit group/btn">
                <button 
                  disabled
                  className="px-10 py-4 border border-warm-brown/30 text-warm-brown/50 text-[10px] tracking-[0.3em] uppercase rounded-full cursor-not-allowed transition-all"
                >
                  Book Tickets
                </button>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-charcoal text-cream text-[10px] py-1.5 px-4 rounded whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none tracking-widest uppercase">
                  Reservations Opening Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
