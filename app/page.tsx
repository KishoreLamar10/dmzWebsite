import { HomeSection } from '@/components/sections/HomeSection'
import { HistorySection } from '@/components/sections/HistorySection'
import { StoriesSection } from '@/components/sections/StoriesSection'
import { MapSection } from '@/components/sections/MapSection'
import { EventsSection } from '@/components/sections/EventsSection'
import { ArchivesSection } from '@/components/sections/ArchivesSection'

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeSection />
      <HistorySection />
      <StoriesSection />
      <MapSection />
      <EventsSection />
      <ArchivesSection />
    </div>
  )
}
