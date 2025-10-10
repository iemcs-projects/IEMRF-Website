import AnimatedSection from "@/components/animated-section"

const milestones = [
  {
    year: "2021",
    title: "Foundation Established",
    desc: "Launched with a focus on research-driven entrepreneurship.",
  },
  {
    year: "2022",
    title: "First Startup Cohort",
    desc: "Ran mentorship-driven cohort with cross-domain student teams.",
  },
  {
    year: "2023",
    title: "Research Acceleration",
    desc: "Published key findings and expanded collaboration with industry.",
  },
  {
    year: "2024",
    title: "Innovation at Scale",
    desc: "70+ interns, 25+ projects, and multiple startup demos released.",
  },
]

export function AboutTimeline() {
  return (
    <AnimatedSection as="section" className="mx-auto max-w-6xl px-4">
      <div className="mb-4">
        <h2 className="text-pretty text-2xl font-semibold text-foreground">Our Journey</h2>
      </div>
      <ol className="relative border-l-2 border-blue-700/60 pl-6">
        {milestones.map((m) => (
          <li key={m.year} className="mb-6">
            <div
              className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-background"
              aria-hidden
            />
            <h3 className="text-lg font-semibold text-foreground">
              {m.year} — {m.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
          </li>
        ))}
      </ol>
    </AnimatedSection>
  )
}
