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
  // Tab state: All | Summer | Winter
  const [activeTab, setActiveTab] = useState<"All" | "Summer" | "Winter">("All")

  const domains = ["All", ...(data?.domainCounts.map((d) => d.domain) || [])]

  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)

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
        const matchesTab =
          activeTab === "All" ||
          (activeTab === "Summer" && p.season === "Summer" && p.year === 2025) ||
          (activeTab === "Winter" && p.season === "Winter" && (p.year === 2025 || p.year === 2026))
        return matchesQuery && matchesDomain && matchesTab
      }) || []
    )
  }, [data, query, domainFilter, activeTab])

  // Helper: determine a single primary domain label for a project based on patterns
  function primaryDomainForProject(p: Project) {
    const domainPatterns: Array<{pattern: RegExp; label: string}> = [
      { pattern: /\b(ai|machine learning|ml)\b/i, label: "AI/ML" },
      { pattern: /\b(iot|internet of things)\b/i, label: "IoT" },
      { pattern: /\b(fintech|financial)\b/i, label: "FinTech" },
      { pattern: /\b(blockchain|web3|xdc)\b/i, label: "Blockchain" },
      { pattern: /\b(healthcare|healthtech|medical|patient)\b/i, label: "HealthTech" },
      { pattern: /\b(web|website|web development)\b/i, label: "Web" },
      { pattern: /\b(analytics|data science|data)\b/i, label: "Analytics" },
      { pattern: /\b(edtech|education|naac|accreditation)\b/i, label: "EdTech" },
      { pattern: /\b(power|led|lighting|driver)\b/i, label: "Power Electronics" },
      { pattern: /\b(3d|3-d|printing|prototyping)\b/i, label: "3D Printing" },
      { pattern: /\b(brand|store|memorabilia|retail)\b/i, label: "Brand / Retail" },
      { pattern: /\b(product|design|prototype)\b/i, label: "Product Design" },
    ]
    const text = `${p.domain || ""} ${p.title || ""} ${p.description || ""}`
    for (const { pattern, label } of domainPatterns) {
      if (pattern.test(text)) return label
    }
    return "Other"
  }

  // Count primary domain per project (each project counted once)
  const derivedDomainCounts = useMemo(() => {
    const counts = new Map<string, number>()
    filteredProjects.forEach((p) => {
      const d = primaryDomainForProject(p)
      counts.set(d, (counts.get(d) || 0) + 1)
    })
    const arr = Array.from(counts.entries()).map(([domain, interns]) => ({ domain, interns }))
    arr.sort((a, b) => b.interns - a.interns || a.domain.localeCompare(b.domain))
    return arr
  }, [filteredProjects])

  // Projects to display in grid: respect chart selection if any
  const displayedProjects = useMemo(() => {
    if (!selectedDomain) return filteredProjects
    return filteredProjects.filter((p) => primaryDomainForProject(p) === selectedDomain)
  }, [filteredProjects, selectedDomain])



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

      {/* Tabs and filters (All / Summer / Winter) */}
      <div className="mt-6">
        <div className="flex items-center gap-4">
          <div className="flex gap-2" role="tablist" aria-label="Internship season tabs">
            <button
              role="tab"
              aria-selected={activeTab === 'All'}
              onClick={() => { setActiveTab('All'); setSelectedDomain(null) }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'All' ? 'border-2 border-gray-900 bg-white font-semibold shadow-sm' : 'text-gray-600 bg-gray-100'}`}
            >
              All
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'Summer'}
              onClick={() => { setActiveTab('Summer'); setSelectedDomain(null) }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'Summer' ? 'border-2 border-gray-900 bg-white font-semibold shadow-sm' : 'text-gray-600 bg-gray-100'}`}
            >
              Summer Internship 2025
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'Winter'}
              onClick={() => { setActiveTab('Winter'); setSelectedDomain(null) }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'Winter' ? 'border-2 border-emerald-500 bg-white font-semibold shadow-sm ring-2 ring-emerald-200 animate-[pulse_1.4s_ease-in-out_infinite]' : 'text-gray-600 bg-gray-100'}`}
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                <span>Winter Internship 2025–26</span>
              </span>
            </button>
          </div>

          <div className="ml-auto text-sm text-gray-600">
            {activeTab === 'All' ? `${seasonCounts.total} projects` : activeTab === 'Summer' ? `${seasonCounts.summer} projects` : `${seasonCounts.winter} projects`}
          </div>
        </div>

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
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-8">
        <InternshipCharts
          domainCounts={derivedDomainCounts}
          ongoingCount={displayedProjects.filter((p) => p.status === 'ongoing').length}
          completedCount={displayedProjects.filter((p) => p.status === 'completed').length}
          selectedDomain={selectedDomain}
          onSelectDomain={(d) => setSelectedDomain(d)}
        />
      </div>



      {/* Projects Grid */}
      <div className="mt-10">
        <h2 className="text-pretty text-2xl font-semibold text-gray-900">
          {activeTab === 'All' ? 'All Projects' : activeTab === 'Summer' ? 'Summer Internship 2025' : 'Winter Internship 2025–26'}
        </h2>

        {selectedDomain && (
          <div className="mt-3 inline-flex items-center gap-3 rounded-full border bg-white px-3 py-2 shadow-sm">
            <span className="text-xs text-gray-600">Filtering by</span>
            <strong className="text-sm">{selectedDomain}</strong>
            <span className="text-xs text-gray-500">({displayedProjects.length} project{displayedProjects.length !== 1 ? 's' : ''})</span>
            <button onClick={() => setSelectedDomain(null)} className="ml-3 rounded bg-gray-100 px-2 py-1 text-xs">Clear</button>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <p className="mt-4 text-sm text-gray-600">No projects match your filters for the selected tab.</p>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {displayedProjects.map((proj) => (
              <InternshipProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
