'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function HomeSection() {
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

      {/* Hero Text - Fades out over 1.5 seconds */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-gold font-serif font-light text-xl md:text-3xl lg:text-4xl tracking-[0.6em] uppercase whitespace-nowrap"
        >
          Journey through the DMZ
        </motion.h1>
      </div>

      {/* Subtle overlay to keep content readable throughout the site */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/40" />
    </section>
  )
}
