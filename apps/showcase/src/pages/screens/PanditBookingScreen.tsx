import { useState } from "react"

import { PanditCard } from "@dhara/blocks"
import { MobileAppShell, MobileBottomNav, MobileChipRow, MobileMain, MobileTopBar, PageScroll } from "@dhara/mobile"

import { NAV_ITEMS } from "@/lib/nav-items"

const PANDITS = [
  {
    name: "Pandit Ramesh Sharma Ji",
    rating: 4.9,
    reviewCount: 120,
    distanceKm: 2.3,
    languages: "Hindi, Sanskrit",
    specialties: "Satyanarayan Katha, Griha Pravesh Havan",
  },
  {
    name: "Acharya Vikram Singh Ji",
    rating: 4.8,
    reviewCount: 150,
    distanceKm: 3.5,
    languages: "Hindi, Marathi",
    specialties: "Shanti Havan, Naming Ceremony Puja Services",
  },
  {
    name: "Guru Prakash Mishra Ji",
    rating: 4.7,
    reviewCount: 90,
    distanceKm: 1.8,
    languages: "Hindi, Gujarati",
    specialties: "Wedding Ceremony, Vastu Shanti Puja Services",
  },
]

/** Recreation of the "Book My Pandit" list screen — now on the shared nav shell. */
export function PanditBookingScreen() {
  const [tab, setTab] = useState("Offline Pandit")

  return (
    <MobileAppShell>
      <MobileTopBar title="Book My Pandit" />
      <MobileMain>
        <PageScroll>
          <MobileChipRow
            options={["Offline Pandit", "Online Pandit", "Live Tracking"]}
            value={tab}
            onChange={setTab}
          />
          <div className="flex flex-col gap-3">
            {PANDITS.map((pandit) => (
              <PanditCard key={pandit.name} {...pandit} onBook={() => {}} />
            ))}
          </div>
        </PageScroll>
      </MobileMain>
      <MobileBottomNav items={NAV_ITEMS} activeId="suno" />
    </MobileAppShell>
  )
}
