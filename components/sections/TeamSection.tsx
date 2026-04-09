import { SectionLabel } from '@/components/ui/SectionLabel'

const TEAM = [
  {
    name: 'Kaviya',
    role: 'Lead Designer · Year 4 Architecture',
    bio: 'Specializing in conflict-zone urbanism and symbolic architectural interventions.'
  },
  {
    name: 'Nusrat',
    role: 'Research & Graphics · Year 4 Architecture',
    bio: 'Focusing on the intersection of digital media, spatial memories, and public space.'
  },
  {
    name: 'Sherin',
    role: 'Technical Strategy · Year 4 Architecture',
    bio: 'Developing structural solutions for transparency and shared sightline experiences.'
  }
]

export function TeamSection() {
  return (
    <section id="team" className="bg-sand py-24 px-8 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>About the Team</SectionLabel>

        <div className="grid md:grid-cols-3 gap-12 mt-12 mb-20">
          {TEAM.map(member => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-full bg-cream border border-warm-brown/20 mb-6 flex items-center justify-center overflow-hidden">
                <div className="w-12 h-12 border-2 border-warm-brown/20 rounded-full" />
              </div>
              <h3 className="font-serif font-light text-2xl text-charcoal mb-1">{member.name}</h3>
              <p className="text-gold text-[10px] tracking-[0.2em] uppercase mb-4 font-bold">{member.role}</p>
              <p className="text-warm-brown text-sm leading-relaxed max-w-xs">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
