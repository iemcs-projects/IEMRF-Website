import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import { partners } from "@/lib/data"

export default function PartnersPage() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold">Partners</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6">
            We collaborate with government agencies and private entities to scale innovation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <AnimatedSection>
          <div className="grid items-center justify-items-center gap-8 sm:grid-cols-2 md:grid-cols-4">
            {partners.map((p) => (
              <div key={p.name} className="flex size-32 items-center justify-center rounded-xl border bg-white shadow-sm">
                <img src={p.image || "/placeholder.svg"} alt={`${p.name} logo`} className="max-h-20 max-w-20 object-contain" />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>
      <SiteFooter />
    </main>
  )
}
