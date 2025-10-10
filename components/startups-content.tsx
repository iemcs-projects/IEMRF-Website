"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StartupCard } from "./startup-card"
import { Search, RotateCcw, RefreshCw } from "lucide-react"

type Startup = {
  id: string
  name: string
  status: "ongoing" | "established"
  ideaVision: string
  goal: string
  productOverview: string
  guide: string
  lead: string
  teamMembers: string[]
  tags: string[]
  progress?: number
  demoUrl?: string
  videoUrl?: string
  posterUrl?: string
  updatedAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function StartupsContent() {
  const { data, isLoading, error, mutate } = useSWR<{
    startups: Startup[]
    summary: { total: number; ongoing: number; established: number }
  }>("/api/startups", fetcher)
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState<"all" | "ongoing" | "established">("all")

  const filtered = useMemo(() => {
    if (!data?.startups) return []
    const q = query.trim().toLowerCase()
    return data.startups.filter((s) => {
      const passesTab = tab === "all" ? true : s.status === tab
      const hay = [s.name, s.ideaVision, s.goal, s.productOverview, s.guide, s.lead, ...(s.tags || [])]
        .join(" ")
        .toLowerCase()
      return passesTab && (q.length === 0 || hay.includes(q))
    })
  }, [data, query, tab])

  return (
    <div className="space-y-6">
      <style jsx global>{`
        @keyframes v0-pop-in {
          0% { transform: translateY(6px) scale(0.98); opacity: 0 }
          100% { transform: translateY(0) scale(1); opacity: 1 }
        }
        @keyframes v0-float {
          0% { transform: translateY(0) }
          50% { transform: translateY(-4px) }
          100% { transform: translateY(0) }
        }
        .motion-pop-float {
          animation-name: v0-pop-in, v0-float;
          animation-duration: 500ms, 8s;
          animation-timing-function: ease-out, ease-in-out;
          animation-fill-mode: both, none;
          animation-iteration-count: 1, infinite;
        }
      `}</style>
      <Card>
        <CardHeader className="space-y-4">
          <div>
            <CardTitle className="text-balance">Startups at IEMRF</CardTitle>
            <p className="text-sm text-muted-foreground">
              Ongoing teams and established startups. Explore ideas, goals, product overviews, and demos.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="all" className="text-sm">
                  All ({data?.summary.total || 0})
                </TabsTrigger>
                <TabsTrigger value="ongoing" className="text-sm">
                  Ongoing ({data?.summary.ongoing || 0})
                </TabsTrigger>
                <TabsTrigger value="established" className="text-sm">
                  Established ({data?.summary.established || 0})
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, tag, guide, or lead..."
                  className="pl-10 w-full"
                  aria-label="Search startups"
                />
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQuery("")
                    setTab("all")
                  }}
                  className="flex items-center gap-2 min-w-fit"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
                <Button
                  onClick={() => mutate()}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 min-w-fit"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </div>
            {query && (
              <div className="text-sm text-muted-foreground">
                Found {filtered.length} startup{filtered.length !== 1 ? "s" : ""} matching "{query}"
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-sm text-red-600 mb-4">Failed to load startups.</p>
              <Button onClick={() => mutate()} variant="outline" size="sm">
                Try Again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-lg border bg-gradient-to-r from-gray-100 to-gray-200"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s, idx) => (
                <div
                  key={s.id}
                  className="motion-pop-float"
                  style={{
                    animationDelay: `${idx * 80}ms, ${600 + idx * 60}ms`,
                  }}
                >
                  <StartupCard startup={s} />
                </div>
              ))}
              {filtered.length === 0 && !isLoading ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    {query ? `No startups match "${query}"` : "No startups found"}
                  </div>
                  {query && (
                    <Button variant="outline" size="sm" onClick={() => setQuery("")}>
                      Clear search
                    </Button>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
