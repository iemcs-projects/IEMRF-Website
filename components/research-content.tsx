"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { ResearchCard } from "./research-card"
import { PublicationItem } from "./publication-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type ApiResponse = {
  stats: {
    totalProjects: number
    ongoingCount: number
    completedCount: number
    areasCount: { area: string; count: number }[]
  }
  areas: { id: string; name: string; description: string }[]
  projects: {
    ongoing: any[]
    completed: any[]
  }
  publications: any[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function ResearchContent() {
  const { data, isLoading } = useSWR<ApiResponse>("/api/research", fetcher)
  const [query, setQuery] = useState("")
  const [area, setArea] = useState<string>("all")

  const filterFn = (p: any) => {
    const matchesArea = area === "all" || p.area === area
    const q = query.trim().toLowerCase()
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.overview.toLowerCase().includes(q) ||
      p.guide.toLowerCase().includes(q) ||
      p.lead.toLowerCase().includes(q)
    return matchesArea && matchesQuery
  }

  const ongoing = useMemo(() => (data?.projects.ongoing || []).filter(filterFn), [data, query, area])
  const completed = useMemo(() => (data?.projects.completed || []).filter(filterFn), [data, query, area])

  return (
    <section className="space-y-10">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Projects</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{isLoading ? "—" : data?.stats.totalProjects}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Ongoing</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-emerald-600">
            {isLoading ? "—" : data?.stats.ongoingCount}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-blue-700">
            {isLoading ? "—" : data?.stats.completedCount}
          </CardContent>
        </Card>
      </div>

      {/* Research areas */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Research Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(data?.areas || []).map((a) => (
            <Card key={a.id} className="border-blue-100">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{a.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {data?.stats.areasCount.find((x) => x.area === a.name)?.count ?? 0} projects
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{a.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects (title, overview, guide, lead)"
            aria-label="Search projects"
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={area} onValueChange={setArea}>
            <SelectTrigger aria-label="Filter by research area">
              <SelectValue placeholder="All areas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All areas</SelectItem>
              {(data?.areas || []).map((a) => (
                <SelectItem key={a.id} value={a.name}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects */}
      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="grid grid-cols-2 w-full sm:w-auto">
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {ongoing.map((p: any) => (
              <ResearchCard key={p.id} project={p} />
            ))}
          </div>
          {!ongoing.length && <div className="text-sm text-muted-foreground mt-4">No ongoing projects found.</div>}
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {completed.map((p: any) => (
              <ResearchCard key={p.id} project={p} />
            ))}
          </div>
          {!completed.length && <div className="text-sm text-muted-foreground mt-4">No completed projects found.</div>}
        </TabsContent>
      </Tabs>

      {/* Publications */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Publications</h2>
        <ul className="divide-y rounded-md border">
          {(data?.publications || []).map((pub: any) => (
            <PublicationItem key={pub.id} pub={pub} />
          ))}
        </ul>
      </div>
    </section>
  )
}
