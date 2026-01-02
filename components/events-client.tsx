"use client"

import { useMemo, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AnimatedSection } from "@/components/animated-section"
import { EventCard } from "@/components/event-card"
import { pastEvents, upcomingEvents, type EventItem } from "@/lib/events-data"

type SortKey = "date-asc" | "date-desc" | "title"

export default function EventsClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selected = searchParams?.get("selected")

  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("date-desc")
  const [tab, setTab] = useState<"all" | "upcoming" | "past">("all")

  useEffect(() => {
    if (selected) {
      // Redirect to event detail when ?selected=event-id is present
      router.push(`/events/${encodeURIComponent(selected)}`)
    }
  }, [selected, router])

  const filterSort = (items: EventItem[]) => {
    const q = query.trim().toLowerCase()
    let res = items.filter((e) =>
      q.length === 0 || e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
    )
    res = res.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title)
      const ad = +new Date(a.date)
      const bd = +new Date(b.date)
      return sort === "date-asc" ? ad - bd : bd - ad
    })
    return res
  }

  const filteredUpcoming = useMemo(() => filterSort(upcomingEvents), [query, sort])
  const filteredPast = useMemo(() => filterSort(pastEvents), [query, sort])

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <AnimatedSection>
        <div className="text-center">
          <h1 className="text-pretty text-3xl font-bold text-gray-900">Events</h1>
          <p className="mt-2 text-sm leading-6 text-gray-600 max-w-2xl mx-auto">
            Explore upcoming and past events at IEMRF. Search and sort to find what interests you.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events"
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600 sm:max-w-sm"
          />
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-xs text-gray-600">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="date-desc">Newest first</option>
              <option value="date-asc">Oldest first</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </AnimatedSection>

      {/* Slide-style switching */}
      <div className="relative mt-8 overflow-hidden">
        <div className={`transition-transform duration-500 ease-in-out flex w-[300%]`} style={{ transform: tab === 'all' ? 'translateX(0%)' : tab === 'upcoming' ? 'translateX(-33.3333%)' : 'translateX(-66.6666%)' }}>
          {/* All */}
          <section className="w-1/3 px-1">
            <h2 className="text-lg font-semibold text-gray-900">All Events</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[...filteredUpcoming, ...filteredPast].map((e) => (
                <EventCard key={e.id} event={e} isUpcoming={upcomingEvents.some(u => u.id === e.id)} />
              ))}
            </div>
          </section>
          {/* Upcoming */}
          <section className="w-1/3 px-1">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            {filteredUpcoming.length === 0 ? (
              <p className="mt-3 text-sm text-gray-600">No upcoming events match your search.</p>
            ) : (
              <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {filteredUpcoming.map((e) => (
                  <EventCard key={e.id} event={e} isUpcoming />
                ))}
              </div>
            )}
          </section>
          {/* Past */}
          <section className="w-1/3 px-1">
            <h2 className="text-lg font-semibold text-gray-900">Past Events</h2>
            {filteredPast.length === 0 ? (
              <p className="mt-3 text-sm text-gray-600">No past events match your search.</p>
            ) : (
              <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {filteredPast.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <AnimatedSection className="mt-12">
        <div className="rounded-xl border bg-white p-6 text-center">
          <p className="text-sm text-gray-700">Have any questions? <a href="/contact" className="font-semibold text-blue-700 hover:underline">Reach out</a></p>
        </div>
      </AnimatedSection>
    </section>
  )
}