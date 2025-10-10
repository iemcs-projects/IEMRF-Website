import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import StartupsContent from "@/components/startups-content"

export default function StartupsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold">Startups</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6">
            A growing portfolio of visionary teams building high-impact businesses.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <AnimatedSection>
          <StartupsContent />
        </AnimatedSection>
      </section>
      <SiteFooter />
    </main>
  )
}
