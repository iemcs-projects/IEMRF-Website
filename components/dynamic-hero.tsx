"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const IMAGES = [
  "/images/hero-research.jpg",
  "/images/hero-startups.jpg",
  "/images/hero-mentorship.jpg",
  "/images/hero-innovation.jpg",
  "/images/hero-collaboration.jpg",
  "/images/hero-technology.jpg",
]

export default function DynamicHero() {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const timerRef = useRef<number | null>(null)
  const [posterState, setPosterState] = useState<"open" | "closing" | "closed">("open")
  const closeTimeoutRef = useRef<number | null>(null)
  const router = useRouter()

  const current = useMemo(() => IMAGES[index % IMAGES.length], [index])
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  const handleClosePoster = () => {
    if (posterState !== "open") return
    setPosterState("closing")
    closeTimeoutRef.current = window.setTimeout(() => {
      setPosterState("closed")
    }, 550)
  }

  const handleApplyClick = () => {
    router.push("/internship?highlight=apply")
  }

  const handleIdeaSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const bodyLines = [
      `Full Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Designation: ${data.get("designation") || ""}`,
      `Area of Interest: ${data.get("interests") || ""}`,
      "",
      "Idea Description:",
      `${data.get("description") || ""}`,
      "",
      `Website/Deck: ${data.get("website") || "Not provided"}`,
    ]
    const subject = encodeURIComponent("Visionary Idea Submission - IEMRF")
    const body = encodeURIComponent(bodyLines.join("\n"))
    window.location.href = `mailto:iem.industryconsulting@gmail.com?subject=${subject}&body=${body}`
    form.reset()
  }

  useEffect(() => {
    setMounted(true)
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length)
    }, 4000)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  const containerRef = useRef<HTMLDivElement | null>(null)
  const onMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8 // -4..4
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8 // -4..4
    el.style.setProperty("--tilt-x", `${y.toFixed(2)}deg`)
    el.style.setProperty("--tilt-y", `${x.toFixed(2)}deg`)
  }

  const onMouseLeave = () => {
    const el = containerRef.current
    if (!el) return
    el.style.setProperty("--tilt-x", "0deg")
    el.style.setProperty("--tilt-y", "0deg")
  }

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Winter Internship Poster Popup */}
      {posterState !== "closed" && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm px-4">
          <div
            className={`relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 ease-out ${
              posterState === "closing" ? "translate-x-[60vw] scale-50 opacity-0" : "translate-x-0 scale-100 opacity-100"
            }`}
          >
            <button
              type="button"
              onClick={handleClosePoster}
              aria-label="Close winter internship poster"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-md transition hover:bg-white"
            >
              ×
            </button>
            <div className="grid gap-6 bg-gradient-to-br from-blue-700 via-blue-500 to-emerald-500 px-6 pb-8 pt-12 md:grid-cols-[1.2fr_1fr] md:px-10 md:pb-12 md:pt-16">
              <div className="space-y-5 text-white">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow ring-1 ring-white/40">
                  ❄ Winter Internship 2025
                </span>
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  Winter Internship 2025 – Applications Open Now!
                </h2>
                <p className="max-w-xl text-sm leading-6 text-white/90 md:text-base">
                  Gain hands-on industrial experience, work with expert mentors, and kickstart your professional journey
                  with real-world research and product challenges.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-white/80">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                    🚀 Industry Projects
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                    🧠 Expert Mentors
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                    📍 Hybrid & Onsite
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleApplyClick}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  Click Here to Apply
                </button>
              </div>
              <div className="relative hidden h-full w-full rounded-2xl bg-white/10 shadow-inner md:block">
                <div className="absolute inset-2 rounded-2xl overflow-hidden">
                  <img
                    src="/images/hero-technology.jpg"
                    alt="Students collaborating during winter internship"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex gap-3 rounded-xl bg-white/90 p-4 shadow-lg">
                  <img
                    src="/images/hero-innovation.jpg"
                    alt="Innovation lab"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="text-xs text-slate-700">
                    <p className="font-semibold text-blue-700">Hands-on Lab Immersion</p>
                    <p>Experience industry workflows, mentor roundtables, and rapid prototyping sprints.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 -z-10">
        {IMAGES.map((image, i) => (
          <div
            key={image}
            className={cn(
              "absolute inset-0 bg-center bg-cover transition-all duration-1000 ease-in-out will-change-transform",
              i === index ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
            style={{
              backgroundImage: `url(${image})`,
              filter: i === index ? "brightness(0.7) contrast(1.1)" : "brightness(0.5) contrast(1)",
            }}
            aria-hidden="true"
          />
        ))}
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 -z-5 overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="mx-auto max-w-7xl px-4 py-24 sm:py-28 md:py-32 transition-transform duration-300 ease-out"
        style={{
          transform: "perspective(1000px) rotateX(var(--tilt-x, 0)) rotateY(var(--tilt-y, 0))",
          transformStyle: "preserve-3d",
        }}
      >
        <div className={cn("max-w-3xl text-white", mounted ? "animate-pop-in" : "opacity-0")}>
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm border border-emerald-400/30">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
            Empowering Research, Startups, and Innovation
          </p>
          <h1
            id="hero-heading"
            className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            IEM Research Foundation
          </h1>
          <p
            className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/95 sm:text-xl"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
          >
            Catalyzing world-class research, entrepreneurship, and mentorship—turning ideas into impactful products and
            ventures that shape the future.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/programs"
              className="group inline-flex h-12 items-center justify-center rounded-lg bg-blue-700 px-6 text-base font-semibold text-white shadow-xl hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 transition-all duration-200 will-change-transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200">Explore Programs</span>
            </Link>
            <Link
              href="/startups"
              className="group inline-flex h-12 items-center justify-center rounded-lg border-2 border-white/70 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 transition-all duration-200 will-change-transform hover:scale-105"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200">See Startups</span>
            </Link>
            <Link
              href="/research"
              className="group inline-flex h-12 items-center justify-center rounded-lg border-2 border-emerald-400/90 bg-emerald-500/90 px-6 text-base font-semibold text-white shadow-xl hover:bg-emerald-600 hover:border-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 transition-all duration-200 will-change-transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200">Research & Innovation</span>
            </Link>
          </div>
        </div>

        {/* Partnership Highlights - Top Right */}
        <div className="absolute top-6 right-6 lg:right-10 z-10 flex flex-col items-end gap-3">
          <div className="flex flex-wrap justify-end gap-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-white/20 animate-pulse-slow">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">Startup India</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Recognized Partner</p>
            </div>
            <div
              className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-white/20 animate-pulse-slow flex-shrink-0"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">IIT Kharagpur</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Strategic Academic Partner</p>
            </div>
            {posterState === "closed" && (
              <button
                type="button"
                onClick={handleApplyClick}
                className="group flex items-center gap-2 rounded-lg border border-emerald-400 bg-white/95 px-4 py-3 text-left shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/90 text-white">
                  💼
                  <span className="pointer-events-none absolute inset-0 rounded-full border border-white/70 animate-[pulse_1.2s_ease-in-out_infinite]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Winter Internship</span>
                  <span className="text-xs text-gray-600 group-hover:text-emerald-600">Click Here to Apply</span>
                </div>
              </button>
            )}
          </div>
          <div
            className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-white/20 animate-pulse-slow flex-shrink-0"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-800">MSME</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Government Partner</p>
          </div>
        </div>

        {/* Right-side Visionary CTA */}
        <aside
          className="pointer-events-auto mt-8 md:mt-0 md:absolute md:top-48 md:right-6 lg:right-10 md:flex md:items-start"
          aria-label="Have a visionary idea"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="relative w-full max-w-xs rounded-2xl border-2 border-amber-400/80 bg-white px-4 py-4 shadow-[0_10px_40px_rgba(251,191,36,0.35)] backdrop-blur-md text-gray-900 md:px-5 md:py-5" role="region">
            {/* Stronger sparkles and rings */}
            <div className="pointer-events-none absolute -top-3 -right-3 h-3.5 w-3.5 rounded-full bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,1)] animate-spark" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-3 -left-3 h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.95)] animate-spark-delayed" aria-hidden="true" />
            <span className="pointer-events-none absolute -inset-1 rounded-2xl ring-2 ring-amber-400/30 animate-pulse-slow" aria-hidden="true" />

            {/* Popping badge */}
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700 shadow-sm animate-pop-badge">
              New
            </span>

            <h3 className="mt-2 text-base font-bold leading-6 text-gray-900">Have a visionary idea?</h3>
            <p className="mt-1 text-sm text-gray-700">Join our ecosystem to turn research into high-impact ventures.</p>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="mt-3 bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-500/40 transition-all duration-200 hover:scale-105"
                  aria-label="Apply or partner with IEMRF"
                >
                  Apply or Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Submit your visionary idea</DialogTitle>
                  <DialogDescription>
                    Share a brief about your concept. We’ll review and get back shortly.
                  </DialogDescription>
                </DialogHeader>
                <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleIdeaSubmit}>
                  <div className="sm:col-span-1">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" name="name" required placeholder="Jane Doe" autoComplete="name" />
                  </div>
                  <div className="sm:col-span-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="jane@company.com" autoComplete="email" />
                  </div>
                  <div className="sm:col-span-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+1 555 000 0000" autoComplete="tel" />
                  </div>
                  <div className="sm:col-span-1">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" name="designation" placeholder="Founder, Student, Researcher" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="interests">Area of interest</Label>
                    <Input id="interests" name="interests" placeholder="AI in healthcare, Green energy, FinTech…" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="description">Idea description</Label>
                    <Textarea id="description" name="description" required rows={5} placeholder="Describe the problem, your solution, current stage, and what support you need." />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="attachments">Attachments</Label>
                    <Input id="attachments" name="attachments" type="file" multiple />
                    <p className="mt-1 text-xs text-muted-foreground">You can attach presentations or PDFs (max ~10MB each).</p>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="website">Website or deck link (optional)</Label>
                    <Input id="website" name="website" type="url" placeholder="https://…" />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
                    <Button type="button" variant="ghost">Cancel</Button>
                    <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white">Send</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Decorative bursts */}
            <svg className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 h-12 w-12 text-amber-400 opacity-80 animate-burst" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <svg className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 h-10 w-10 text-amber-300 opacity-70 animate-burst-delayed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        </aside>

        <ul className="pointer-events-none relative mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
          {[
            { label: "Research Labs", color: "bg-white/95 text-gray-900 border-emerald-500/50", delay: "0s" },
            { label: "Mentorship", color: "bg-white/90 text-gray-900 border-blue-700/50", delay: "0.2s" },
            { label: "Innovation Grants", color: "bg-white/90 text-gray-900 border-emerald-500/50", delay: "0.4s" },
            { label: "Startup Incubation", color: "bg-white/95 text-gray-900 border-blue-700/50", delay: "0.6s" },
          ].map((c, i) => (
            <li
              key={c.label}
              className={cn(
                "pointer-events-auto inline-flex items-center justify-center rounded-xl border-2 px-4 py-3 text-sm font-semibold shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer",
                c.color,
                "animate-float-enhanced",
              )}
              style={{
                animationDelay: c.delay,
                transform: "translateZ(20px)",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
              aria-label={c.label}
            >
              {c.label}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        @keyframes pop-in {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        .animate-pop-in {
          animation: pop-in 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes float-enhanced {
          0%, 100% { 
            transform: translateY(0px) translateZ(20px) rotateX(0deg); 
          }
          50% { 
            transform: translateY(-8px) translateZ(25px) rotateX(2deg); 
          }
        }
        .animate-float-enhanced {
          animation: float-enhanced 5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes spark {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.4); opacity: 1; }
        }
        .animate-spark { animation: spark 1.8s ease-in-out infinite; }
        .animate-spark-delayed { animation: spark 2.2s ease-in-out infinite; animation-delay: 0.6s; }
        @keyframes pop-badge {
          0% { transform: scale(0.9); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-pop-badge { animation: pop-badge 900ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes burst {
          0% { transform: translateX(-50%) scale(0.8); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateX(-50%) scale(1); opacity: 0.8; }
        }
        .animate-burst { animation: burst 1200ms ease-out 1; }
        .animate-burst-delayed { animation: burst 1400ms ease-out 1; animation-delay: 0.25s; }
        @keyframes pulse-slow { 0%,100% { opacity: .6 } 50% { opacity: 1 } }
        .animate-pulse-slow { animation: pulse-slow 2.4s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
