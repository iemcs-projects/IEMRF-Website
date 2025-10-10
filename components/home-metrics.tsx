"use client"

import { homeMetrics } from "@/lib/home-data"
import CountUp from "@/components/count-up"

export default function HomeMetrics() {
  return (
    <section aria-label="Key metrics" className="bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {homeMetrics.map((m) => (
            <div key={m.label} className="rounded-lg border bg-background p-4 text-center">
              <div className="text-3xl font-semibold text-foreground">
                <CountUp end={m.value} duration={1.2} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
