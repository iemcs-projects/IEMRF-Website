import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import { getEventById, pastEvents, upcomingEvents } from "@/lib/events-data"
import { EventRegisterForm } from "@/components/event-register"

export default function EventDetailPage({ params, searchParams }: { params: { id: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
  const event = getEventById(params.id)
  const wantsRegister = typeof searchParams?.register !== "undefined"
  const isUpcoming = upcomingEvents.some((e) => e.id === params.id)
  if (!event) notFound()
  const dateStr = new Date(event.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <AnimatedSection>
          <div className="mb-6">
            <Link href="/events" className="inline-flex items-center text-sm font-medium text-blue-700 hover:underline">
              ← Back to Events
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <img src={event.image || "/placeholder.jpg"} alt={event.title} className="w-full rounded-xl border object-cover" />
            </div>
            <div>
              <h1 className="text-pretty text-3xl font-bold text-gray-900">{event.title}</h1>
              <p className="mt-2 text-sm text-gray-600">{dateStr} · {event.location} · {event.category}</p>
              {event.speaker && <p className="mt-1 text-sm text-gray-600">Speaker: {event.speaker}</p>}
              <p className="mt-4 text-gray-700 leading-relaxed">{event.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {isUpcoming && (
                  <a href="#register" className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">{wantsRegister ? 'Complete Registration' : 'Register'}</a>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {isUpcoming && (
          <AnimatedSection className="mt-12" id="register">
            <h2 className="text-lg font-semibold text-gray-900">Register for this event</h2>
            <EventRegisterForm />
          </AnimatedSection>
        )}
      </section>
      <SiteFooter />
    </main>
  )
}


