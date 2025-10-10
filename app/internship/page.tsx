import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import { InternshipContent } from "@/components/internship-content"
import { Button } from "@/components/ui/button"
import { InternshipApply } from "@/components/internship-apply"
import { InternshipBenefits } from "@/components/internship-benefits"
import { InternshipProcess } from "@/components/internship-process"
import { InternshipTestimonials } from "@/components/internship-testimonials"

export default function InternshipPage() {
  return (
    <main>
      <SiteHeader />
      {/* Vibrant hero section */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-emerald-500 to-purple-600" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_40%),_radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_40%)]" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16 md:py-20">
          <AnimatedSection>
            <header className="max-w-3xl text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium shadow ring-1 ring-white/30 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" aria-hidden="true" />
                Paid research & product internships
              </p>
              <h1 className="mt-4 text-pretty text-4xl font-bold leading-tight sm:text-5xl">
                Internships at IEMRF
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90">
                Build real-world solutions with mentors and partner organizations. 70+ interns have already completed
                their summer internships through this program.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#apply" className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
                  View Application
                </a>
                <a href="#projects" className="inline-flex h-11 items-center justify-center rounded-lg border-2 border-white/70 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
                  Explore Projects
                </a>
              </div>
            </header>
          </AnimatedSection>
        </div>

        {/* subtle decorative bubbles */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white/25 animate-pulse"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 100}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <AnimatedSection>
          <InternshipContent />
        </AnimatedSection>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <AnimatedSection>
          <InternshipBenefits />
        </AnimatedSection>
      </section>

      {/* Process Section */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <AnimatedSection>
          <InternshipProcess />
        </AnimatedSection>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <AnimatedSection>
          <InternshipTestimonials />
        </AnimatedSection>
      </section>

      {/* Apply for Internship */}
      <section id="apply" className="mx-auto max-w-6xl px-4 pb-14">
        <AnimatedSection>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-pretty text-2xl font-semibold text-gray-900">Apply for Internship</h2>
                <p className="mt-1 text-sm text-gray-600">Tell us about yourself and your interests. We will reach out soon.</p>
              </div>
              <InternshipApply />
            </div>
          </div>
        </AnimatedSection>
      </section>
      <SiteFooter />
    </main>
  )
}
