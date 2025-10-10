"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { useState } from "react"

type DomainDatum = { domain: string; interns: number }

export function InternshipCharts({
  domainCounts,
  totalInterns,
}: {
  domainCounts: DomainDatum[]
  totalInterns: number
}) {
  const pieData = [
    { name: "Completed", value: totalInterns },
    { name: "Ongoing", value: 0 },
  ]

  // Domain-specific color mapping
  const domainColors: Record<string, string> = {
    "AI/ML": "#3b82f6", // Blue
    "Web": "#10b981", // Emerald
    "IoT": "#8b5cf6", // Purple
    "BusinessAnalytics": "#f59e0b", // Amber
    "HealthTech": "#ef4444", // Red
    "Data Science": "#06b6d4", // Cyan
    "FinTech": "#84cc16", // Lime
  }

  const getDomainColor = (domain: string): string => {
    return domainColors[domain] || "#6b7280" // Gray fallback
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="h-72 rounded border bg-card p-4">
        <h3 className="text-sm font-medium text-gray-900">Interns by Domain</h3>
        <div className="mt-2 h-[85%]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={domainCounts} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <defs>
                {domainCounts.map((d, i) => {
                  const base = getDomainColor(d.domain)
                  return (
                    <>
                      <linearGradient id={`grad-${i}`} key={`g-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={base} stopOpacity={0.95} />
                        <stop offset="100%" stopColor={base} stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id={`grad-${i}-dim`} key={`gd-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={base} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={base} stopOpacity={0.25} />
                      </linearGradient>
                    </>
                  )
                })}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="domain" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip cursor={{ fill: "rgba(59,130,246,0.05)" }} formatter={(value: any, _name, props: any) => [value, props?.payload?.domain]} />
              <Legend />
              <InteractiveBars data={domainCounts} getDomainColor={getDomainColor} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="h-72 rounded border bg-card p-4">
        <h3 className="text-sm font-medium text-gray-900">Completion Status</h3>
        <div className="mt-2 h-[85%]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                innerRadius={45}
                stroke="transparent"
                isAnimationActive
                animationDuration={800}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? "#3b82f6" : "#10b981"} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function InteractiveBars({
  data,
  getDomainColor,
}: {
  data: { domain: string; interns: number }[]
  getDomainColor: (domain: string) => string
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <Bar
      dataKey="interns"
      name="Interns"
      radius={[8, 8, 0, 0]}
      isAnimationActive
      animationDuration={800}
      onMouseLeave={() => setActiveIndex(null)}
      label={{ position: "top", fill: "#111827", fontSize: 12 }}
    >
      {data.map((d, i) => {
        const isDim = activeIndex !== null && activeIndex !== i
        const fill = `url(#grad-${i}${isDim ? "-dim" : ""})`
        const stroke = activeIndex === i ? getDomainColor(d.domain) : "transparent"
        const strokeWidth = activeIndex === i ? 2 : 0
        return (
          <Cell
            key={i}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            onMouseEnter={() => setActiveIndex(i)}
            cursor="pointer"
          />
        )
      })}
    </Bar>
  )
}
