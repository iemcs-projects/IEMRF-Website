import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import { mentors } from "@/lib/data"
import Link from "next/link"

export default function MentorshipPage() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold">Mentorship</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6">
            Mentors from IEM alumni, faculty, and entrepreneurs guide strategy and commercialization.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#mentor" className="rounded bg-white/15 px-3 py-1.5 text-sm font-medium hover:bg-white/20">I am a Mentor</a>
            <a href="#mentee" className="rounded bg-white/15 px-3 py-1.5 text-sm font-medium hover:bg-white/20">I am a Mentee</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <AnimatedSection>
          <div id="mentor" className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">For Mentors</h2>
            <p className="text-sm text-gray-600">Share your expertise and help shape the next generation of entrepreneurs.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {mentors.map((m) => (
              <article key={m.name} className="rounded border bg-white p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={m.image || "/placeholder.svg"}
                    alt={`${m.name}`}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{m.name}</h3>
                    <p className="text-sm text-gray-600">{m.bio}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <div id="mentee" className="grid gap-6 md:grid-cols-2">
            <div className="rounded border bg-white p-6">
              <h2 className="text-xl font-semibold text-gray-900">Become a Mentor</h2>
              <p className="mt-2 text-sm text-gray-600">
                Interested in mentoring IEMRF startups? Share your expertise and help shape the next generation of
                entrepreneurs.
              </p>
              <a
                href="/contact"
                className="mt-3 inline-block rounded bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
              >
                Express Interest
              </a>
            </div>
            <div className="rounded border bg-white p-6">
              <h2 className="text-xl font-semibold text-gray-900">Apply as a Mentee</h2>
              <p className="mt-2 text-sm text-gray-600">
                Looking for guidance? Apply to be matched with mentors who align with your goals and domain.
              </p>
              <a
                href="/contact"
                className="mt-3 inline-block rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
              >
                Request Mentorship
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>
      <SiteFooter />
    </main>
  )
}
