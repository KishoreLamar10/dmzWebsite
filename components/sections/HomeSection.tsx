'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

export function HomeSection() {
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Show sound control after the hero text fades and video reveals
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Background Video - Fades in faster */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Hero Text - Improved Centering & Responsiveness */}
      <div className="relative z-10 w-full text-center px-6">
        <motion.h1 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-gold font-serif font-light text-2xl md:text-3xl lg:text-4xl tracking-[0.6em] pr-[0.6em] uppercase mx-auto"
        >
          Journey through the DMZ
        </motion.h1>
      </div>

      {/* Sound Toggle - Reveals after hero animation */}
      <AnimatePresence>
        {showControls && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={toggleMute}
            className="absolute bottom-12 right-12 z-20 p-4 rounded-full bg-charcoal/40 backdrop-blur-md border border-gold/20 text-gold hover:bg-charcoal/60 transition-all group"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            ) : (
              <Volume2 size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            )}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 text-[9px] tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none">
              {isMuted ? "Sound Off" : "Sound On"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Subtle overlay to keep content readable throughout the site */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/40" />
    </section>
  )
}
