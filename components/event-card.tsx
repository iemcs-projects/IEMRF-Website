import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { EventItem } from "@/lib/events-data"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DownloadButton from "@/components/download-button"
import { getProjectDownloadUrl } from "@/lib/downloads"
import { findPersonByName } from "@/lib/people"

export function EventCard({ event, isUpcoming = false }: { event: EventItem; isUpcoming?: boolean }) {
  const date = new Date(event.date)
  const dateStr = date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
  const resolvedMentor = findPersonByName((event as any).mentor)
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <img src={event.image || "/placeholder.jpg"} alt={event.title} className="h-48 w-full object-cover" />
        {resolvedMentor ? (
          <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={resolvedMentor?.image} alt={resolvedMentor?.name || "Mentor"} />
              <AvatarFallback>{(resolvedMentor?.name || "").split(" ").map((p) => p[0]).slice(0,2).join("")}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-800">{resolvedMentor?.name}</span>
          </div>
        ) : null}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700">{event.category}</span>
            <span className="text-xs text-gray-600">{dateStr}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{event.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{event.summary}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link href={`/events/${event.id}`} className="text-sm font-medium text-blue-700 hover:underline">
              Learn more →
            </Link>
            {isUpcoming && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-8 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white">Register</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Register: {event.title}</DialogTitle>
                    <DialogDescription>Fill your details to register for this event.</DialogDescription>
                  </DialogHeader>
                  <form className="grid grid-cols-1 gap-3" onSubmit={(e) => e.preventDefault()}>
                    <Input placeholder="Full name" required />
                    <Input type="email" placeholder="Email" required />
                    <Input placeholder="Organization (optional)" />
                    <Textarea rows={4} placeholder="What interests you about this event?" />
                    <div className="flex items-center justify-end gap-2">
                      <Button type="button" variant="ghost">Cancel</Button>
                      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Submit</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            <div className="w-full mt-2">
              <DownloadButton href={getProjectDownloadUrl("event", event.id)} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


