"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import StartupsContent from "@/components/startups-content"
import { Button } from "@/components/ui/button"

export default function StartupsPage() {
  const router = useRouter()
  const [overlayVisible, setOverlayVisible] = useState(true)

  return (
    <main className="relative min-h-screen">
      <SiteHeader />
      <div className={`${overlayVisible ? "blur-sm lg:blur" : ""}`}>
        <section className="bg-blue-700 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-3xl font-semibold">Startups</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6">
              A growing portfolio of visionary teams building high-impact businesses.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <AnimatedSection>
            <StartupsContent />
          </AnimatedSection>
        </section>
        <SiteFooter />
      </div>

      {overlayVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md px-6">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%)]" />
            <div className="absolute -right-24 -top-24 h-48 w-48 animate-spin-slow rounded-full border-4 border-white/10" />
            <div className="absolute -left-24 -bottom-24 h-52 w-52 animate-pulse rounded-full border-4 border-emerald-400/30" />
            <div className="relative grid gap-8 px-8 py-10 text-white md:grid-cols-[1.2fr_1fr] md:px-12 md:py-14">
              <div className="space-y-5 md:space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200 ring-1 ring-white/20">
                  Startup Space
                </span>
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  Under Incubation — Where Imagination Meets Execution
                </h2>
                <p className="text-sm leading-relaxed text-slate-200 md:text-base">
                  Our next generation of startups is currently in stealth mode. Teams are prototyping, iterating, and
                  preparing for launch. Stay tuned as we unveil the ventures transforming ideas into impact.
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    🚀 Innovation in progress
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    💡 Concepts to MVP
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    🤝 Mentor Collaboration
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/20"
                    onClick={() => router.push("/contact")}
                  >
                    Contact Innovation Desk
                  </Button>
                  <Button
                    variant="default"
                    className="bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => router.push("/internship")}
                  >
                    Join Our Startup Labs
                  </Button>
                </div>
              </div>

              <div className="relative hidden h-full w-full rounded-2xl bg-white/5 p-6 shadow-inner md:flex md:flex-col md:items-center md:justify-center">
                <div className="absolute inset-3 rounded-2xl border border-white/10" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/80 text-4xl shadow-lg">
                  🔧
                </div>
                <p className="mt-4 text-center text-sm text-slate-200">
                  Engineers brainstorming, components assembling, and ideas coming to life.
                </p>
                <div className="mt-6 h-24 w-full overflow-hidden rounded-xl bg-black/40">
                  <div className="h-full w-full animate-[pulse_3s_ease-in-out_infinite] bg-[url('/abstract-tech.png')] bg-cover bg-center opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
