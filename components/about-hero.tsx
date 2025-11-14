"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type AboutHeroProps = {
  title?: string
  subtitle?: string
  images?: string[]
}

export default function AboutHero({
  title = "About IEM Research Foundation",
  subtitle = "Driving research, innovation, and entrepreneurship with measurable impact.",
  images = ["/research-lab-team.png", "/innovation-workshop.png", "/mentorship-session.png"],
}: AboutHeroProps) {
  const [index, setIndex] = useState(0)
  // precompute next indices to avoid re-renders
  const total = images.length
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 5000)
    return () => clearInterval(id)
  }, [total])

  const chips = useMemo(
    () => [
      { label: "70+ Interns", color: "bg-emerald-500/90 text-white" },
      { label: "10+ Research Projects", color: "bg-blue-700/90 text-white" },
      { label: "2+ Startups", color: "bg-gray-900/90 text-white" },
    ],
    [],
  )

  return (
    <section className="relative overflow-hidden rounded-lg border bg-background">
      {/* Background images */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src || "/placeholder.svg"}
            alt="About page background"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {/* Solid overlay for readability (no gradients) */}
        <div aria-hidden className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-2 inline-block rounded px-2 py-1 text-xs font-medium text-white bg-blue-700">About IEMRF</p>
          <h1 className="text-pretty text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip.label}
                className={cn("rounded-full px-3 py-1 text-xs font-medium shadow-sm ring-1 ring-white/10", chip.color)}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-6 top-8 hidden animate-pulse rounded-md bg-emerald-500/80 px-2 py-1 text-xs text-white shadow-sm sm:block">
          Mentorship
        </div>
        <div className="absolute right-8 top-14 hidden animate-pulse rounded-md bg-blue-700/80 px-2 py-1 text-xs text-white shadow-sm sm:block [animation-delay:300ms]">
          Innovation
        </div>
        <div className="absolute bottom-10 right-10 hidden animate-pulse rounded-md bg-gray-900/80 px-2 py-1 text-xs text-white shadow-sm md:block [animation-delay:600ms]">
          Research
        </div>
      </div>
    </section>
  )
}
