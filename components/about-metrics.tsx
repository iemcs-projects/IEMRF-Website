"use client"

import AnimatedSection from "@/components/animated-section"
import CountUp from "@/components/count-up"

export function AboutMetrics() {
  const items = [
    { label: "Interns", value: 70, accent: "text-emerald-500" },
    { label: "Research Projects", value: 25, accent: "text-blue-700" },
    { label: "Startups", value: 11, accent: "text-gray-900" },
  ]
  return (
    <AnimatedSection as="section" className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.label} className="rounded-lg border bg-background p-6 text-center shadow-sm">
            <div className={`text-4xl font-bold ${i.accent}`} aria-live="polite">
              <CountUp end={i.value} duration={1200} />
              <span className="ml-1 align-top text-sm">+</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{i.label}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  )
}
