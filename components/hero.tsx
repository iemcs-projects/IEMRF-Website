import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "./animated-section"

export function Hero() {
  return (
    <section className="bg-blue-700 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <AnimatedSection>
          {/* Credibility badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs text-white/90">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Recognized center for innovation and entrepreneurship
          </div>
          <h1 className="text-pretty text-3xl font-semibold md:text-5xl">IEM Research Foundation</h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm md:text-base leading-6">
            The first academic institute-based research foundation in Eastern India, founded by IEM Trust and conceived
            by Prof. Satyajit Chakrabarti. We foster innovation, entrepreneurship, and societal benefit by supporting
            startups, partnering with industry, and enabling impactful outcomes.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150} className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-white text-blue-700 hover:bg-gray-100">
              <Link href="/programs">Explore Programs</Link>
            </Button>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
              <Link href="/contact">Partner with Us</Link>
            </Button>
            {/* Third CTA button */}
            <Button asChild variant="ghost" className="text-white hover:bg-white/10">
              <Link href="/startups">View Startups</Link>
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300} className="mt-10">
          {/* Subtle border for visual structure */}
          <div className="grid gap-4 sm:grid-cols-3">
            <CardStat title="Mentor Network" value="IEM Alumni & Leaders" />
            <CardStat title="Collaborations" value="Govt. & Private Agencies" />
            <CardStat title="Impact Focus" value="Societal Benefit" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function CardStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded border border-white/15 bg-white/10 p-4">
      <div className="text-sm opacity-90">{title}</div>
      <div className="mt-1 text-lg font-medium">{value}</div>
    </div>
  )
}
