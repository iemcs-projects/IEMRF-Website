"use client"

import { useMemo } from "react"
import { upcomingEvents } from "@/lib/events-data"
import Link from "next/link"

export function EventsListHome() {
  const items = useMemo(() => upcomingEvents.slice(0, 3), [])
  if (items.length === 0) return null
  return (
    <ul className="space-y-5">
      {items.map((e, index) => {
        const paletteIndex = index % 3
        const isBlue = paletteIndex === 0
        const isEmerald = paletteIndex === 1
        const isPurple = paletteIndex === 2
        const accent = isBlue ? "#3b82f6" : isEmerald ? "#10b981" : "#8b5cf6"
        const accentSoft = isBlue ? "#93c5fd" : isEmerald ? "#6ee7b7" : "#d8b4fe"
        const gradient = isBlue
          ? "linear-gradient(135deg, #ffffff 0%, #dbeafe 35%, #eff6ff 100%)"
          : isEmerald
          ? "linear-gradient(135deg, #ffffff 0%, #d1fae5 35%, #ecfeff 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #ede9fe 35%, #f5f3ff 100%)"
        return (
          <li key={e.id} className="relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg" style={{ background: gradient, borderLeft: `4px solid ${accent}` }}>
            <div className="pointer-events-none absolute inset-0 rounded-xl" style={{ boxShadow: `inset 0 0 0 1px ${accent}22` }} aria-hidden="true" />
            <div className="pointer-events-none absolute -inset-y-8 -left-1/2 w-1/2 rotate-12 bg-white/30 blur-xl animate-sheen" aria-hidden="true" />
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-600">
              <div className={`h-2 w-2 rounded-full ${isBlue ? "bg-blue-500" : isEmerald ? "bg-emerald-500" : "bg-purple-500"} animate-pulse`} />
              <span>{new Date(e.date).toDateString()}</span>
            </div>
            <h3 className="mb-1 text-base font-extrabold" style={{ backgroundImage: `linear-gradient(90deg, ${accent}, ${accentSoft})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              {e.title}
            </h3>
            <p className="text-sm text-gray-600">{e.summary}</p>
            <div className="mt-3 flex items-center gap-3">
              <Link href={`/events/${e.id}`} className="text-xs font-medium text-blue-700 hover:underline">Learn more →</Link>
              <Link href="/events" className="text-xs font-medium text-gray-700 hover:underline">All events</Link>
            </div>
          </li>
        )
      })}

      <style jsx>{`
        @keyframes sheen { 0% { transform: translateX(-120%) rotate(12deg); } 100% { transform: translateX(180%) rotate(12deg); } }
        .animate-sheen { animation: sheen 2.6s ease-in-out infinite; }
      `}</style>
    </ul>
  )
}


