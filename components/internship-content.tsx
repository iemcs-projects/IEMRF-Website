"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { InternshipCharts } from "@/components/internship-charts"
import { InternshipProjectCard } from "@/components/internship-project-card"
import { CountUp } from "@/components/count-up"

type Project = {
  id: string
  title: string
  department: string
  domain: string
  description: string
  image?: string
  season?: "Summer" | "Winter"
  year?: number
  status?: "ongoing" | "completed"
} 

type ApiData = {
  summary: { totalInterns: number; teams: number; mentors: number; domains: number }
  domainCounts: { domain: string; interns: number }[]
  projects: Project[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())


export function InternshipContent() {
  const { data, error, isLoading } = useSWR<ApiData>("/api/internships", fetcher)
  const [query, setQuery] = useState("")
  const [domainFilter, setDomainFilter] = useState<string>("All")
  const [selectedSeason, setSelectedSeason] = useState<"Summer" | "Winter">("Summer")
  const [selectedYear, setSelectedYear] = useState<number>(2025)
  const [seasonOpen, setSeasonOpen] = useState<boolean>(false)

  const domains = ["All", ...(data?.domainCounts.map((d) => d.domain) || [])]

  const [statusFilter, setStatusFilter] = useState<"All" | "Ongoing">("All")

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (
      data?.projects.filter((p) => {
        const matchesQuery =
          q.length === 0 ||
          p.title.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.domain.toLowerCase().includes(q)
        const matchesDomain = domainFilter === "All" || p.domain === domainFilter
        const matchesSeason = p.season === selectedSeason
        const matchesYear = p.year === undefined || p.year === selectedYear
        const matchesStatus = statusFilter === "All" || (statusFilter === "Ongoing" && p.status === "ongoing")
        return matchesQuery && matchesDomain && matchesSeason && matchesYear && matchesStatus
      }) || []
    )
  }, [data, query, domainFilter, selectedSeason, selectedYear, statusFilter])

  // derive domain counts from filtered projects, but preserve original ordering
  const derivedDomainCounts = useMemo(() => {
    const order = data?.domainCounts.map((d) => d.domain) || []
    const counts = new Map<string, number>()
    order.forEach((d) => counts.set(d, 0))
    filteredProjects.forEach((p) => counts.set(p.domain, (counts.get(p.domain) || 0) + 1))
    return order.map((d) => ({ domain: d, interns: counts.get(d) || 0 }))
  }, [data, filteredProjects])

  const seasonCounts = useMemo(() => {
    const total = data?.projects.length || 0
    const summer = data?.projects.filter((p) => p.season === "Summer").length || 0
    const winter = data?.projects.filter((p) => p.season === "Winter").length || 0
    const summerPercent = total ? Math.round((summer / total) * 100) : 0
    const winterPercent = total ? Math.round((winter / total) * 100) : 0
    return { total, summer, winter, summerPercent, winterPercent }
  }, [data])


  if (error) {
    return <p className="mt-6 text-sm text-red-600">Failed to load internships.</p>
  }

  if (isLoading || !data) {
    return (
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <p className="h-3 w-24 rounded bg-muted" />
              <p className="mt-3 h-6 w-14 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{
          label: "Interns Completed",
          value: data.summary.totalInterns,
          suffix: "+",
          colors: ["#3b82f6", "#93c5fd"],
        }, {
          label: "Student Teams",
          value: data.summary.teams,
          suffix: "+",
          colors: ["#10b981", "#6ee7b7"],
        }, {
          label: "Mentors",
          value: data.summary.mentors,
          suffix: "+",
          colors: ["#8b5cf6", "#d8b4fe"],
        }, {
          label: "Domains",
          value: data.summary.domains,
          suffix: "+",
          colors: ["#f59e0b", "#fde68a"],
        }].map((kpi, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="relative p-4">
              <p className="text-xs text-gray-600">{kpi.label}</p>
              <p
                className="mt-1 text-3xl font-extrabold"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${kpi.colors[0]}, ${kpi.colors[1]})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                <CountUp value={kpi.value} />
                {kpi.suffix && <span className="ml-1 text-2xl">{kpi.suffix}</span>}
              </p>
              <span
                className="pointer-events-none absolute inset-0 rounded-lg"
                style={{ boxShadow: `inset 0 0 0 2px ${kpi.colors[0]}22` }}
                aria-hidden="true"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Season selector and collapsible filters */}
      <div className="mt-6">
        <div className="flex items-center gap-4">
          <div className="inline-flex rounded-lg bg-gray-100 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => {
                if (selectedSeason === "Summer") setSeasonOpen((s) => !s)
                else {
                  setSelectedSeason("Summer")
                  setSeasonOpen(true)
                }
              }}
              aria-expanded={selectedSeason === "Summer" && seasonOpen}
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedSeason === "Summer" ? (seasonOpen ? "bg-blue-700 text-white" : "bg-white text-gray-800") : "text-gray-700"}`}
            >
              Summer Internship
            </button>
            <button
              type="button"
              onClick={() => {
                if (selectedSeason === "Winter") setSeasonOpen((s) => !s)
                else {
                  setSelectedSeason("Winter")
                  setSeasonOpen(true)
                }
              }}
              aria-expanded={selectedSeason === "Winter" && seasonOpen}
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedSeason === "Winter" ? (seasonOpen ? "bg-blue-700 text-white" : "bg-white text-gray-800") : "text-gray-700"}`}
            >
              Winter Internship
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="year" className="text-xs text-gray-600">Year</label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded-md border px-3 py-2 text-sm outline-none"
            >
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </div>
        </div>

        {seasonOpen && (
          <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by project, department, or domain"
                aria-label="Search projects"
                className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-chart-2)]"
              />

              <div className="flex items-center gap-2">
                <label htmlFor="domain" className="text-xs text-gray-600">Filter by domain</label>
                <select
                  id="domain"
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value)}
                  className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-chart-3)]"
                >
                  {domains.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button type="button" onClick={() => setSeasonOpen(false)} className="text-sm text-gray-500">Hide filters</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="mt-8">
        <InternshipCharts
          domainCounts={data.domainCounts}
          totalInterns={data.summary.totalInterns}
        />
      </div>

      {/* Season controls: Pill-style segmented controls (All / Ongoing) */}
      <div className="mt-6">
        <p className="text-sm text-gray-600">View by season</p>
        <div className="mt-3 space-y-4">
          {/* Summer */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Summer Internship</div>
              <div className="text-xs text-gray-600">{seasonCounts.summer} projects</div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="relative inline-flex items-center rounded-full bg-gray-100 p-1 text-sm"
                role="group"
                aria-label="Summer status filter"
              >
                <div
                  className="absolute left-1 top-1 bottom-1 w-1/2 rounded-full bg-white shadow transition-transform"
                  style={{ transform: statusFilter === "Ongoing" ? "translateX(100%)" : "translateX(0%)" }}
                  aria-hidden
                />
                <button
                  type="button"
                  className={`relative z-10 px-3 py-1 rounded-full ${statusFilter === "All" ? "text-black" : "text-gray-600"}`}
                  onClick={() => { setStatusFilter("All"); setSelectedSeason("Summer"); setSeasonOpen(true) }}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`relative z-10 px-3 py-1 rounded-full ${statusFilter === "Ongoing" ? "text-black" : "text-gray-600"}`}
                  onClick={() => { setStatusFilter("Ongoing"); setSelectedSeason("Summer"); setSeasonOpen(true) }}
                >
                  Ongoing
                </button>
              </div>
            </div>
          </div>

          {/* Winter */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Winter Internship</div>
              <div className="text-xs text-gray-600">{seasonCounts.winter} projects</div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="relative inline-flex items-center rounded-full bg-gray-100 p-1 text-sm"
                role="group"
                aria-label="Winter status filter"
              >
                <div
                  className="absolute left-1 top-1 bottom-1 w-1/2 rounded-full bg-white shadow transition-transform"
                  style={{ transform: statusFilter === "Ongoing" ? "translateX(100%)" : "translateX(0%)" }}
                  aria-hidden
                />
                <button
                  type="button"
                  className={`relative z-10 px-3 py-1 rounded-full ${statusFilter === "All" ? "text-black" : "text-gray-600"}`}
                  onClick={() => { setStatusFilter("All"); setSelectedSeason("Winter"); setSeasonOpen(true) }}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`relative z-10 px-3 py-1 rounded-full ${statusFilter === "Ongoing" ? "text-black" : "text-gray-600"}`}
                  onClick={() => { setStatusFilter("Ongoing"); setSelectedSeason("Winter"); setSeasonOpen(true) }}
                >
                  Ongoing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mt-10">
        <h2 className="text-pretty text-2xl font-semibold text-gray-900">{selectedSeason} Internship</h2>
        {filteredProjects.length === 0 ? (
          <p className="mt-4 text-sm text-gray-600">No projects match your filters for {selectedYear}.</p>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredProjects.map((proj) => (
              <InternshipProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
