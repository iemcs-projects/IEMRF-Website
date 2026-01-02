import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import DynamicHero from "@/components/dynamic-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Metrics } from "@/components/metrics"
import { programs, partners } from "@/lib/data"
import ImpactCards from "@/components/impact-cards"
import ScrollingBanner from "@/components/scrolling-banner"
import PartnersMarquee from "@/components/partners-marquee"

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <DynamicHero />
      <ScrollingBanner
        text="Explore Research, Startups & Programs — Discover collaboration opportunities, mentorship, and resources at IEMRF."
        speedSeconds={24}
        href="/news"
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-pretty text-2xl font-semibold text-gray-900">About IEMRF</h2>
            <p className="mt-2 max-w-4xl mx-auto text-sm leading-6 text-gray-600 text-justify">
              IEM Research Foundation (IEMRF), the first academic institute-based research foundation in Eastern India, is a Section 8 not for profit company founded by IEM Trust. Conceived by Prof. Satyajit Chakrabarti, Director at Institute of Engineering & Management (IEM), IEM Research Foundation intends to foster innovation, entrepreneurship and societal benefit.

              Serving as a dynamic ecosystem, it supports startups by helping them turn their visionary ideas into successful, high-impact businesses. IEMRF also collaborates with different government and private agencies to strategically leverage their expertise and resources in implementing emerging entrepreneurial development initiatives.IEMRF partners with corporate entities to foster innovation and entrepreneurship across states. IEMRF provides startups and innovators with holistic support services. This includes mentorship from IEM alumni, faculty and seasoned entrepreneurs offering critical guidance on business strategy and technology commercialization.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <div className="text-center">
            <Metrics
              items={[
                { label: "Programs & Initiatives", value: 5, suffix: "+" },
                { label: "Research Projects", value: 10, suffix: "+" },
                { label: "Partners", value: 5, suffix: "+" },
                { label: "Interns", value: 70, suffix: "+" },
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
            <div className="mx-auto max-w-6xl">
              <PartnersMarquee speedSeconds={20} logoSize={140} />
            </div>
          </div>
        </AnimatedSection>


        {/* CTA moved into DynamicHero right-side card */}
      </section>

      <SiteFooter />
    </main>
  )
}
