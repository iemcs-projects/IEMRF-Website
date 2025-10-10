import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import ProgramsContent from "@/components/programs-content"

export default function ProgramsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold">Programs & Initiatives</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6">
            Structured programs to accelerate research translation, entrepreneurship, and impact.
          </p>
        </div>
      </section>

      <ProgramsContent />

      <SiteFooter />
    </main>
  )
}
