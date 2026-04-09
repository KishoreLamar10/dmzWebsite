type SectionLabelProps = {
  children: React.ReactNode
  light?: boolean
}

export function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <p
      className={`text-sm tracking-[0.5em] uppercase mb-6 font-sans font-black ${
        light ? 'text-gold' : 'text-warm-brown'
      }`}
    >
      {children}
    </p>
  )
}
