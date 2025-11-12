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
          <div className="grid items-center justify-items-center gap-10 sm:grid-cols-2 md:grid-cols-4">
            {partners.map((p) => (
              <div
                key={p.name}
                className="group relative flex h-36 w-36 items-center justify-center rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:h-40 md:w-40"
              >
                <img
                  src={p.image || "/placeholder.svg"}
                  alt={`${p.name} logo`}
                  className="max-h-24 max-w-28 object-contain md:max-h-28 md:max-w-32"
                  title={p.name}
                />
                <span className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-md bg-blue-700/95 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>
      <SiteFooter />
    </main>
  )
}
