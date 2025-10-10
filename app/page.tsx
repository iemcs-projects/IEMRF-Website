import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import DynamicHero from "@/components/dynamic-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Metrics } from "@/components/metrics"
import { programs, partners } from "@/lib/data"
import { NewsList } from "@/components/news-list"
import { EventsListHome } from "@/components/events-list-home"
import ImpactCards from "@/components/impact-cards"
import ScrollingBanner from "@/components/scrolling-banner"

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <DynamicHero />
      <ScrollingBanner
        text="Over seventy IEMRF students successfully completed their summer internships—contributing to real-world research, building prototypes, and collaborating with mentors and startup founders to turn ideas into impact."
        speedSeconds={26}
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-pretty text-2xl font-semibold text-gray-900">About IEMRF</h2>
            <p className="mt-2 max-w-4xl mx-auto text-sm leading-6 text-gray-600">
              IEM Research Foundation (IEMRF), the first academic institute-based research foundation in Eastern India, is a Section 8 not for profit company founded by IEM Trust. Conceived by Prof. Satyajit Chakrabarti, Director at Institute of Engineering & Management (IEM), IEM Research Foundation intends to foster innovation, entrepreneurship and societal benefit.

              Serving as a dynamic ecosystem, it supports startups by helping them turn their visionary ideas into successful, high-impact businesses. IEMRF also collaborates with different government and private agencies to strategically leverage their expertise and resources in implementing emerging entrepreneurial development initiatives.IEMRF partners with corporate entities to foster innovation and entrepreneurship across states. IEMRF provides startups and innovators with holistic support services. This includes mentorship from IEM alumni, faculty and seasoned entrepreneurs offering critical guidance on business strategy and technology commercialization.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <div className="text-center">
            <Metrics
              items={[
                { label: "Programs & Initiatives", value: 12 },
                { label: "Startups Supported", value: 85, suffix: "+" },
                { label: "Partnerships", value: 25, suffix: "+" },
                { label: "Years of Impact", value: 10, suffix: "+" },
              ]}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <div className="text-center">
            <ImpactCards />
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <div className="text-center">
            <h2 className="text-pretty text-3xl font-bold text-gray-900 mb-2">Featured Programs</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Discover our comprehensive range of programs designed to foster innovation and entrepreneurship.</p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {programs.map((p) => (
                <article key={p.name} className="rounded-xl border bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full">
                  <img src={p.image || "/placeholder.svg"} alt={p.name} className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{p.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{p.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <a href="/programs" className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium">
                View all programs →
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <div className="text-center">
            <h2 className="text-pretty text-3xl font-bold text-gray-900 mb-2">Our Partners</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Collaborating with leading organizations to drive innovation and create impact.</p>
            <div className="grid items-center justify-items-center gap-8 sm:grid-cols-2 md:grid-cols-4">
              {partners.map((p) => (
                <div key={p.name} className="flex size-28 items-center justify-center rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <img src={p.image || "/placeholder.svg"} alt={`${p.name} logo`} className="max-h-16 max-w-16 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <div className="text-center">
            <h2 className="text-pretty text-3xl font-bold text-gray-900 mb-2">Latest News & Events</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Stay updated with the latest developments and upcoming events at IEMRF.</p>
            <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
              <div>
                <h3 className="mb-3 text-left text-lg font-semibold text-gray-900">News</h3>
                <NewsList />
              </div>
              <div>
                <h3 className="mb-3 text-left text-lg font-semibold text-gray-900">Events</h3>
                <EventsListHome />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA moved into DynamicHero right-side card */}
      </section>

      <SiteFooter />
    </main>
  )
}
