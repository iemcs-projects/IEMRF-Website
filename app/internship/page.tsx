"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import { InternshipContent } from "@/components/internship-content"
import { InternshipApply } from "@/components/internship-apply"
import { InternshipBenefits } from "@/components/internship-benefits"
import { InternshipProcess } from "@/components/internship-process"
import { InternshipTestimonials } from "@/components/internship-testimonials"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function InternshipContentWithParams() {
  const searchParams = useSearchParams()
  const [applyOptionsOpen, setApplyOptionsOpen] = useState(false)
  const [highlightApplyButton, setHighlightApplyButton] = useState(false)

  useEffect(() => {
    if (searchParams.get("highlight") === "apply") {
      setHighlightApplyButton(true)
      const timer = window.setTimeout(() => {
        setHighlightApplyButton(false)
      }, 6000)
      return () => window.clearTimeout(timer)
    }
  }, [searchParams])

  const topBannerClasses = useMemo(
    () =>
      `bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-white/20 transition ${
        highlightApplyButton
          ? "ring-2 ring-emerald-500 animate-[pulse_1.1s_ease-in-out_infinite]"
          : ""
      }`,
    [highlightApplyButton],
  )

  return (
    <main>
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative isolate">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-emerald-500 to-purple-600"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_40%),_radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_40%)]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16 md:py-20">
          {/* Apply Now Box */}
          <div className="absolute top-6 right-6 lg:right-10 z-10">
            <div className={topBannerClasses}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full bg-emerald-500 ${
                    highlightApplyButton
                      ? "animate-[pulse_0.9s_ease-in-out_infinite]"
                      : "animate-pulse"
                  }`}
                ></div>
                <span className="text-sm font-semibold text-gray-800">
                  Apply Now
                </span>
              </div>
              <button
                type="button"
                onClick={() => setApplyOptionsOpen(true)}
                className="mt-2 inline-flex h-8 items-center justify-center rounded-md bg-emerald-600 px-3 text-xs font-semibold text-white shadow transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80"
              >
                Apply for Internship
              </button>
            </div>
          </div>

          {/* Hero Text */}
          <AnimatedSection>
            <header className="max-w-3xl text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium shadow ring-1 ring-white/30 backdrop-blur">
                <span
                  className="h-2 w-2 animate-pulse rounded-full bg-emerald-300"
                  aria-hidden="true"
                />
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
                <a
                  href="#projects"
                  className="inline-flex h-11 items-center justify-center rounded-lg border-2 border-white/70 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  Explore Projects
                </a>
              </div>
            </header>
          </AnimatedSection>
        </div>

        {/* Floating Bubbles */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
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

      {/* Content Sections */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <AnimatedSection>
          <InternshipContent />
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <AnimatedSection>
          <InternshipBenefits />
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <AnimatedSection>
          <InternshipProcess />
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <AnimatedSection>
          <InternshipTestimonials />
        </AnimatedSection>
      </section>

      {/* Apply Section */}
      <section id="apply" className="mx-auto max-w-6xl px-4 pb-14">
        <AnimatedSection>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-pretty text-2xl font-semibold text-gray-900">
                  Apply for Internship
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Tell us about yourself and your interests. We will reach out soon.
                </p>
              </div>
              <InternshipApply />
            </div>
          </div>
        </AnimatedSection>
      </section>

      <SiteFooter />

      {/* Dialog */}
      <Dialog open={applyOptionsOpen} onOpenChange={setApplyOptionsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Choose an application track
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Pick the option that fits you best and submit your information. We’ll reach out shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-5 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                🌟 Super 30 Internship Program (For 3rd Year Students)
              </div>
              <p className="text-sm text-gray-700">
                Exclusive industrial internship program for top-performing students with intensive mentorship and live
                projects.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSee1TYmyNyAA8AVGYCLzghot_zmqL3shJkszxLwb450cNdejQ/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-xs font-semibold uppercase tracking-wide text-white shadow transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Click Here to Apply
              </a>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                💡 Have an Idea? Share Your CV
              </div>
              <p className="text-sm text-gray-700">
                Got an innovative project or idea? Submit your profile, and we’ll connect you with the right mentors to
                co-create.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScnmA8dpbEuuUwMVcUTLdWy7PLlWFuoWMZ9ZXfo97bMU-Ph0w/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-4 text-xs font-semibold uppercase tracking-wide text-white shadow transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Click Here to Apply
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default function InternshipPage() {
  return (
    <Suspense fallback={<div>Loading internship details...</div>}>
      <InternshipContentWithParams />
    </Suspense>
  )
}
