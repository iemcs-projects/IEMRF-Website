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

  const domains = ["All", ...(data?.domainCounts.map((d) => d.domain) || [])]

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
        return matchesQuery && matchesDomain
      }) || []
    )
  }, [data, query, domainFilter])

  // derive domain counts from filtered projects, but preserve original ordering
  const derivedDomainCounts = useMemo(() => {
    const order = data?.domainCounts.map((d) => d.domain) || []
    const counts = new Map<string, number>()
    order.forEach((d) => counts.set(d, 0))
    filteredProjects.forEach((p) => counts.set(p.domain, (counts.get(p.domain) || 0) + 1))
    return order.map((d) => ({ domain: d, interns: counts.get(d) || 0 }))
  }, [data, filteredProjects])


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
          colors: ["#3b82f6", "#93c5fd"],
        }, {
          label: "Student Teams",
          value: data.summary.teams,
          colors: ["#10b981", "#6ee7b7"],
        }, {
          label: "Mentors",
          value: data.summary.mentors,
          colors: ["#8b5cf6", "#d8b4fe"],
        }, {
          label: "Domains",
          value: data.summary.domains,
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

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-3 sm:max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by project, department, or domain"
            aria-label="Search projects"
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-chart-2)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="domain" className="text-xs text-gray-600">
            Filter by domain
          </label>
          <select
            id="domain"
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-chart-3)]"
          >
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-8">
        <InternshipCharts
          domainCounts={derivedDomainCounts}
          totalInterns={data.summary.totalInterns}
        />
        <p className="mt-2 text-xs text-gray-600">Charts reflect current filters.</p>
      </div>

      {/* Projects Grid */}
      <div className="mt-10">
        <h2 className="text-pretty text-2xl font-semibold text-gray-900">Projects by Student Teams</h2>
        {filteredProjects.length === 0 ? (
          <p className="mt-4 text-sm text-gray-600">No projects match your filters.</p>
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
