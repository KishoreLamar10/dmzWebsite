'use client'

import Image from 'next/image'
import { useEffect } from 'react'

type Story = {
  title: string
  category: string
  excerpt: string
  image: string
  videoId?: string
}

type StoryModalProps = {
  story: Story | null
  onClose: () => void
}

export function StoryModal({ story, onClose }: StoryModalProps) {
  useEffect(() => {
    if (story) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [story])

  if (!story) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-cream w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in zoom-in-95 duration-300 border border-gold/10">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 border border-charcoal/20 flex items-center justify-center rounded-full text-charcoal hover:bg-charcoal hover:text-cream transition-all group"
          aria-label="Close Modal"
        >
          <span className="text-xl font-light transform group-hover:rotate-90 transition-transform">✕</span>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Visual Side (Image or Video) */}
          <div className="lg:w-3/5 bg-black flex items-center justify-center relative min-h-[300px] lg:min-h-[500px]">
            {story.videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${story.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={story.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Image 
                src={story.image}
                alt={story.title}
                fill
                className="object-cover"
              />
            )}
            {!story.videoId && <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent lg:hidden" />}
          </div>

          {/* Details Side */}
          <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-cream">
            <span className="text-gold text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              {story.category}
            </span>
            <h2 className="font-serif font-light text-3xl lg:text-4xl text-charcoal leading-snug mb-6">
              {story.title}
            </h2>
            <div className="w-12 h-px bg-gold/30 mb-8" />
            <div className="max-w-md">
              <p className="text-warm-brown text-sm lg:text-base leading-[1.7] opacity-90">
                {story.excerpt}
              </p>
            </div>
            
            <div className="mt-10 pt-6 border-t border-warm-brown/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <p className="text-[9px] text-gold uppercase tracking-[0.2em] font-bold">
                {story.videoId ? 'Watching Narrative' : 'Archives Narrative'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
