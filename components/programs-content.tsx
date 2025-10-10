"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import ProgramCard from "@/components/program-card"
import type { Program, ProgramCategory, ProgramStatus } from "@/lib/programs-data"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const categories: ProgramCategory[] = ["Incubation", "Research", "Mentorship", "Workshop", "Event"]
const statusOptions: ProgramStatus[] = ["Open", "Closed"]

export default function ProgramsContent() {
  const { data } = useSWR<{ summary: any; programs: Program[] }>("/api/programs", fetcher, { revalidateOnFocus: false })
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ProgramCategory | "All">("All")
  const [activeStatus, setActiveStatus] = useState<ProgramStatus | "All">("All")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (data?.programs || []).filter((p) => {
      if (activeCategory !== "All" && p.category !== activeCategory) return false
      if (activeStatus !== "All" && p.status !== activeStatus) return false
      if (!q) return true
      const hay = [p.title, p.description, p.mentor, p.lead, ...(p.tags || [])].join(" ").toLowerCase()
      return hay.includes(q)
    })
  }, [data, query, activeCategory, activeStatus])

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      <header className="mb-6 md:mb-8">
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 md:p-8">
          <div
            className="pointer-events-none absolute -top-8 -left-8 h-24 w-24 rounded-full bg-emerald-500 opacity-20 blur-md"
            aria-hidden="true"
            style={{ animation: "float 10s ease-in-out infinite" }}
          />
          <div
            className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-blue-700 opacity-20 blur-md"
            aria-hidden="true"
            style={{ animation: "float 12s ease-in-out infinite", animationDelay: "600ms" }}
          />
          <h1 className="text-pretty text-2xl font-bold text-gray-900 md:text-3xl">Programs at IEMRF</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
            Explore our active programs across incubation, research, mentorship, workshops, and events.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <input
              aria-label="Search programs"
              placeholder="Search programs, mentors, tags..."
              className="w-full min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700 md:max-w-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <select
                aria-label="Filter by category"
                className="rounded-md border border-gray-200 bg-white px-2 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value as any)}
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                aria-label="Filter by status"
                className="rounded-md border border-gray-200 bg-white px-2 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
                value={activeStatus}
                onChange={(e) => setActiveStatus(e.target.value as any)}
              >
                <option value="All">All Status</option>
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setQuery("")
                  setActiveCategory("All")
                  setActiveStatus("All")
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {data?.summary ? (
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Kpi label="Total" value={data.summary.total} />
              <Kpi label="Open" value={data.summary.open} />
              {data.summary.categories.slice(0, 2).map((c: any) => (
                <Kpi key={c.name} label={c.name} value={c.count} />
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <div
            key={p.id}
            className="will-change-transform"
            style={{
              animation: "float 9s ease-in-out infinite",
              animationDelay: `${(i % 6) * 120}ms`,
            }}
          >
            <ProgramCard program={p} floatDelay={(i % 6) * 100} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  )
}

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-3">
      <div className="text-xs uppercase tracking-wide text-gray-600">{label}</div>
      <div className="text-xl font-semibold text-gray-900">{value}</div>
    </div>
  )
}
