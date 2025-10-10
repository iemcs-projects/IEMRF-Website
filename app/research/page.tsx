import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import ResearchContent from "@/components/research-content"

export const metadata = {
  title: "Products & Innovations | IEMRF",
  description:
    "Explore products and innovations emerging from IEMRF's research initiatives—discover active investigations, completed studies, and publications.",
}

export default function ResearchPage() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold">Products & Innovations</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6">
            A comprehensive view of our innovation portfolio — discover active investigations, completed studies, key
            insights, products, and peer-reviewed publications across our focus areas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <ResearchContent />
      </section>

      <SiteFooter />
    </main>
  )
}
