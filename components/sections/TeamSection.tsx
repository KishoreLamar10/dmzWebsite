import { SectionLabel } from '@/components/ui/SectionLabel'

const TEAM = [
  {
    name: 'Kaviya Murugavelu'
  },
  {
    name: 'Nusrat Reza'
  },
  {
    name: 'Sherin Abigail Rathnakumar'
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
