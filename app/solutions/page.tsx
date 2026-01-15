"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import SolutionsContent from "@/components/solutions-content"

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen">
      <SiteHeader />
      
      <section className="bg-gradient-to-r from-purple-700 to-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold">IEM Solutions</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6">
            A comprehensive catalog of innovative solutions designed to support startups, research commercialization, enterprise innovation, talent development, and social impact ventures.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <AnimatedSection>
          <SolutionsContent />
        </AnimatedSection>
      </section>
      
      <SiteFooter />
    </main>
  )
}
