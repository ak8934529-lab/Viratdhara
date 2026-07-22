import { Bell, Calendar, Sparkles, Video } from "lucide-react"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { QuickActionTile, TempleLiveCard } from "@dhara/blocks"
import { MobileAppShell, MobileBottomNav, MobileMain, MobileSectionHeading, MobileTopBar, PageScroll } from "@dhara/mobile"

import { NAV_ITEMS } from "@/lib/nav-items"
import { placeholderImage } from "@/lib/placeholder-image"

const templeImages = [
  placeholderImage("#be5339", "#271611"),
  placeholderImage("#d3932f", "#271611"),
  placeholderImage("#271611", "#be5339"),
]

/** Recreation of the "Currently Live" home screen — now on the shared nav shell. */
export function HomeScreen() {
  return (
    <MobileAppShell>
      <MobileTopBar
        title="Currently Live"
        trailing={
          <>
            <button type="button" aria-label="Notifications" className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted/50">
              <Bell className="size-5" />
            </button>
            <Avatar size="sm">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </>
        }
      />
      <MobileMain>
        <PageScroll>
          <MobileSectionHeading title="Currently Live" />
          <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4">
            {templeImages.map((image, i) => (
              <TempleLiveCard
                key={i}
                image={image}
                title={i === 0 ? "Experience the Divine Darshan" : "Sacred Somnath"}
                viewers={i === 0 ? "23k" : undefined}
                live={i === 0}
                className="w-40 shrink-0"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <QuickActionTile icon={Video} title="Temple Live" subtitle="Watch live darshan from temples" />
            <QuickActionTile icon={Calendar} title="Events" subtitle="Explore spiritual events" />
            <QuickActionTile icon={Bell} title="Pooja & Aarti" subtitle="View live aartis and poojas" />
            <QuickActionTile icon={Sparkles} title="Special Moments" subtitle="Snippets from past livestreams" />
          </div>
        </PageScroll>
      </MobileMain>
      <MobileBottomNav items={NAV_ITEMS} activeId="home" />
    </MobileAppShell>
  )
}
