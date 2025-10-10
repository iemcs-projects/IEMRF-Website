import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import AboutHero from "@/components/about-hero"
import { AboutValues } from "@/components/about-values"
import { AboutLeadership } from "@/components/about-leadership"
import { AboutTimeline } from "@/components/about-timeline"
import { AboutMetrics } from "@/components/about-metrics"

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      {/* Dynamic hero with rotating background images and floating badges */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <AboutHero />
      </div>

      {/* Comprehensive About content: values, leadership, timeline, metrics */}
      <section className="space-y-10 py-6">
        <AboutValues />
        <AboutLeadership />
        <AboutTimeline />
        <AboutMetrics />
      </section>

      <SiteFooter />
    </main>
  )
}
