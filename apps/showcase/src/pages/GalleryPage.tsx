import { useState } from "react"
import { Link } from "react-router-dom"
import { Bell, Calendar, Download, Music, Sparkles, Video } from "lucide-react"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { Badge } from "@dhara/ui/badge"
import { Button } from "@dhara/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@dhara/ui/card"
import { Input } from "@dhara/ui/input"
import { Switch } from "@dhara/ui/switch"
import {
  BookingSummaryCard,
  LiveBadge,
  PanditCard,
  PlayerBar,
  ProductCard,
  QuickActionTile,
  TempleLiveCard,
} from "@dhara/blocks"
import {
  MobileChipRow,
  MobileEmptyState,
  MobileFilterChip,
  MobileListItem,
  MobileSearchBar,
  MobileSegmentedControl,
  MobileStatCard,
  MobileTopBar,
} from "@dhara/mobile"

import { GallerySection } from "@/components/GallerySection"
import { placeholderImage } from "@/lib/placeholder-image"

const templeImage = placeholderImage("#be5339", "#271611")
const productImage = placeholderImage("#d3932f", "#271611")
const artwork = placeholderImage("#271611", "#be5339")

export function GalleryPage() {
  const [chip, setChip] = useState("Offline Pandit")
  const [format, setFormat] = useState("darshan")
  const [switchOn, setSwitchOn] = useState(true)

  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col gap-12 overflow-y-auto px-6 py-10">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Viratdhara</p>
        <h1 className="text-3xl font-semibold text-foreground">Design System</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Component library built from the Viratdhara Figma design — one consistent shell and component
          set shared by the temple/pandit booking flow and the bhajan player.
        </p>
        <nav className="mt-2 flex flex-wrap gap-2">
          {[
            ["Home screen", "/screens/home"],
            ["Login screen", "/screens/login"],
            ["Pandit booking", "/screens/pandit-booking"],
            ["Music player", "/screens/player"],
          ].map(([label, href]) => (
            <Link key={href} to={href}>
              <Button variant="outline" size="sm">
                {label}
              </Button>
            </Link>
          ))}
        </nav>
      </header>

      <GallerySection title="Buttons">
        <Button>Book Now</Button>
        <Button variant="gold">Buy Now</Button>
        <Button variant="outline">Continue</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Cancel Booking</Button>
        <Button variant="link">View details</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </GallerySection>

      <GallerySection title="Badges">
        <Badge>Default</Badge>
        <Badge variant="gold">Confirmed</Badge>
        <LiveBadge />
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Draft</Badge>
      </GallerySection>

      <GallerySection title="Card, Input, Avatar, Switch">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Satsang Live</CardTitle>
            <CardDescription>Evening aarti from Kashi Vishwanath</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">23k watching live</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="w-full">
              Watch Live
            </Button>
          </CardFooter>
        </Card>

        <div className="flex w-64 flex-col gap-3">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <div className="flex items-center gap-3">
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
            <span className="text-sm text-muted-foreground">Remember me</span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>GG</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </GallerySection>

      <GallerySection title="Mobile chrome">
        <div className="w-full overflow-hidden rounded-2xl ring-1 ring-border/60">
          <MobileTopBar
            title="Temple Live"
            subtitle="Currently Live"
            trailing={
              <>
                <Bell className="size-5 text-muted-foreground" />
                <Avatar size="sm">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </>
            }
          />
        </div>

        <div className="flex w-full flex-col gap-3">
          <MobileSearchBar placeholder="Search temples, poojas, pandits" />
          <MobileChipRow
            options={["Offline Pandit", "Online Pandit", "Live Tracking"]}
            value={chip}
            onChange={setChip}
          />
          <MobileFilterChip label="Popular" active />
          <MobileSegmentedControl
            options={[
              { value: "darshan", label: "Suno Dekho" },
              { value: "live", label: "Live Darshan" },
              { value: "booking", label: "Booking" },
            ]}
            value={format}
            onChange={setFormat}
          />
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          <MobileStatCard icon={Sparkles} title="Temple Live" subtitle="Watch live darshan" />
          <MobileStatCard icon={Calendar} title="Events" subtitle="Explore spiritual events" />
          <MobileStatCard icon={Video} title="Pooja & Aarti" subtitle="Live aartis" />
          <MobileStatCard icon={Music} title="Bhajans" subtitle="Listen & sing along" />
        </div>

        <div className="flex w-full max-w-sm flex-col rounded-2xl ring-1 ring-border/60">
          <MobileListItem icon={Download} title="Downloads" subtitle="12 tracks · 84 MB" />
          <MobileListItem icon={Bell} title="Notifications" subtitle="Manage alerts" />
        </div>

        <MobileEmptyState
          icon={Sparkles}
          title="No items yet"
          description="Replaces the placeholder '<Pooja Name>' cards left in the source design."
        />
      </GallerySection>

      <GallerySection title="Domain blocks (@dhara/blocks)">
        <TempleLiveCard image={templeImage} title="Experience the Divine Darshan" viewers="23k" className="w-48" />
        <QuickActionTile icon={Sparkles} title="Special Moments" subtitle="Snippets from past livestreams" />
        <PanditCard
          name="Pandit Ramesh Sharma Ji"
          rating={4.9}
          reviewCount={120}
          distanceKm={2.3}
          languages="Hindi, Sanskrit"
          specialties="Satyanarayan Katha, Griha Pravesh Havan"
          className="w-80"
        />
        <ProductCard image={productImage} name="Yantra Pendants" price={150} className="w-48" />
        <BookingSummaryCard
          className="w-80"
          status="Confirmed"
          rows={[
            { label: "Ritual", value: "Satyanarayan Katha" },
            { label: "Date & Time", value: "10th Oct, 4:00 PM" },
            { label: "Payment", value: "Online (UPI)" },
          ]}
        />
      </GallerySection>

      <GallerySection title="Player bar">
        <div className="w-full max-w-sm overflow-hidden rounded-2xl ring-1 ring-border/60">
          <PlayerBar artwork={artwork} title="Hanuman Chalisa" artist="moody." />
        </div>
      </GallerySection>
    </div>
  )
}
