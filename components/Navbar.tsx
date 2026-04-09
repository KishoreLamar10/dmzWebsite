'use client'
import { motion } from 'framer-motion'
import { useActiveSection } from '@/lib/hooks/useActiveSection'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'history', label: 'History' },
  { id: 'stories', label: 'Stories' },
  { id: 'map', label: 'Map' },
  { id: 'events', label: 'Events' },
  { id: 'archives', label: 'Archives' },
  { id: 'team', label: 'Team' },
]

export function Navbar() {
  const activeSection = useActiveSection(SECTIONS.map(s => s.id))

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal h-20 flex items-center justify-center px-8 border-b border-warm-brown/10">
      {/* Branding - Fades in after Hero animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute left-8 hidden lg:block"
      >
        <span className="text-gold font-serif font-light text-[11px] tracking-[0.4em] uppercase whitespace-nowrap">
          Journey through the DMZ
        </span>
      </motion.div>

      <ul className="flex items-center gap-6 lg:gap-10">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`text-[10px] lg:text-sm tracking-[0.25em] uppercase transition-all duration-300 ${
                activeSection === id
                  ? 'text-gold scale-110'
                  : 'text-[#a09080] hover:text-cream'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
