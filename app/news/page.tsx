import React, { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import { NewsList } from "@/components/news-list"

export default function NewsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold">News & Events</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6">
            Updates from our programs, partnerships, and startup ecosystem.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <AnimatedSection>
          <Suspense fallback={<div className="p-6">Loading news…</div>}>
            <NewsList />
          </Suspense>
        </AnimatedSection>
      </section>
      <SiteFooter />
    </main>
  )
}
