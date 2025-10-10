import { cn } from "@/lib/utils"
import AnimatedSection from "@/components/animated-section"

type ValueCard = {
  title: string
  body: string
  accent?: "blue" | "emerald" | "slate"
}

const ACCENT_MAP = {
  blue: "bg-blue-700 text-white",
  emerald: "bg-emerald-500 text-white",
  slate: "bg-gray-900 text-white",
}

export function AboutValues() {
  const values: ValueCard[] = [
    {
      title: "Mission",
      body: "Enable students, researchers, and founders to turn ideas into impactful ventures through rigorous research and hands-on mentorship.",
      accent: "blue",
    },
    {
      title: "Vision",
      body: "Be a leading academic hub where innovation meets execution—spinning out startups and publishing research that matters.",
      accent: "emerald",
    },
    {
      title: "Values",
      body: "Integrity, curiosity, collaboration, and measurable impact. We prioritize learning-by-building and real-world outcomes.",
      accent: "slate",
    },
  ]
  return (
    <AnimatedSection as="section" className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {values.map((v) => (
          <article
            key={v.title}
            className="rounded-lg border bg-background p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span
              className={cn("inline-block rounded px-2 py-0.5 text-xs font-semibold", ACCENT_MAP[v.accent || "blue"])}
            >
              {v.title}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
          </article>
        ))}
      </div>
    </AnimatedSection>
  )
}
